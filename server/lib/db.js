// Data access for the shop. One small interface, two drivers:
//  - Supabase (Postgres over its REST API) when SUPABASE_URL is set. Used in production.
//  - A local JSON file for development and tests, so the whole shop can be run
//    and tested on a laptop with no accounts. Never used on Vercel.
//
// where: { col: value }            equals (null means IS NULL)
//        { col: [a, b] }           in
//        { col: { gte, lte, gt, lt, neq, ilike } }
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { SEED_CATEGORIES, SEED_PRODUCTS, DEFAULT_SETTINGS } from '../../shared/catalogue.js'

export class ConflictError extends Error {
  constructor(message = 'Already exists') {
    super(message)
    this.code = 'conflict'
  }
}
export class NotConfiguredError extends Error {
  constructor(message = 'The shop database is not set up yet.') {
    super(message)
    this.code = 'not_configured'
  }
}

/* ------------------------------ Supabase driver ----------------------------- */

function encodeFilter(value) {
  if (value === null) return 'is.null'
  if (Array.isArray(value)) {
    return `in.(${value.map((v) => `"${String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(',')})`
  }
  if (typeof value === 'object') {
    const out = []
    for (const [op, v] of Object.entries(value)) {
      if (op === 'ilike') out.push(`ilike.*${String(v).replace(/[*%(),"\\]/g, ' ')}*`)
      else if (op === 'neq' && v === null) out.push('not.is.null')
      else out.push(`${op}.${v}`)
    }
    return out
  }
  return `eq.${value}`
}

function buildQuery(where = {}, extra = {}) {
  const params = new URLSearchParams()
  for (const [col, value] of Object.entries(where)) {
    if (value === undefined) continue
    const encoded = encodeFilter(value)
    for (const f of [].concat(encoded)) params.append(col, f)
  }
  for (const [k, v] of Object.entries(extra)) if (v !== undefined && v !== null) params.set(k, String(v))
  return params.toString()
}

function supabaseDriver(url, key) {
  const base = `${url.replace(/\/+$/, '')}/rest/v1`
  async function call(method, pathAndQuery, body, prefer) {
    const res = await fetch(`${base}/${pathAndQuery}`, {
      method,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    const text = await res.text()
    let data = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }
    if (!res.ok) {
      if (res.status === 409 || data?.code === '23505') throw new ConflictError(data?.message)
      const err = new Error(`Database error (${res.status}): ${data?.message || text}`)
      err.status = res.status
      throw err
    }
    return { data, headers: res.headers }
  }

  return {
    name: 'supabase',
    async select(table, { where, order, limit, offset, count } = {}) {
      const q = buildQuery(where, { select: '*', order: [].concat(order || []).join(',') || undefined, limit, offset })
      const { data, headers } = await call('GET', `${table}?${q}`, undefined, count ? 'count=exact' : undefined)
      if (!count) return data
      const total = Number((headers.get('content-range') || '').split('/')[1])
      return { rows: data, total: Number.isFinite(total) ? total : data.length }
    },
    async insert(table, rows) {
      const { data } = await call('POST', table, rows, 'return=representation')
      return Array.isArray(rows) ? data : data[0]
    },
    async update(table, where, patch) {
      const { data } = await call('PATCH', `${table}?${buildQuery(where)}`, patch, 'return=representation')
      return data
    },
    async remove(table, where) {
      const { data } = await call('DELETE', `${table}?${buildQuery(where)}`, undefined, 'return=representation')
      return data
    },
    async rpc(name, args = {}) {
      const { data } = await call('POST', `rpc/${name}`, args)
      return data
    },
  }
}

/* ------------------------------- Local driver ------------------------------- */

const UNIQUE = {
  categories: [['slug']],
  products: [['sku'], ['slug']],
  customers: [['email']],
  orders: [['order_number'], ['public_token']],
  payments: [['provider_event_id']],
  staff: [['email']],
  settings: [['key']],
}
const DEFAULTS = {
  products: { is_active: true, is_featured: false, quote_only: false, stock_qty: 0, min_order_qty: 1, gst_percent: 18, specs: [], images: [] },
  orders: { status: 'pending_payment', stock_deducted: false },
  login_codes: { attempts: 0 },
  staff: { is_active: true, role: 'admin' },
  addresses: { country: 'IN', is_default: false },
}
const TABLES = ['categories', 'products', 'customers', 'addresses', 'orders', 'order_items', 'payments', 'shipments', 'order_events', 'settings', 'staff', 'login_codes', 'counters']

function matches(row, where = {}) {
  for (const [col, cond] of Object.entries(where)) {
    if (cond === undefined) continue
    const v = row[col] ?? null
    if (cond === null) {
      if (v !== null) return false
    } else if (Array.isArray(cond)) {
      if (!cond.includes(v)) return false
    } else if (typeof cond === 'object') {
      for (const [op, x] of Object.entries(cond)) {
        if (op === 'gte' && !(v >= x)) return false
        if (op === 'lte' && !(v <= x)) return false
        if (op === 'gt' && !(v > x)) return false
        if (op === 'lt' && !(v < x)) return false
        if (op === 'neq' && v === x) return false
        if (op === 'ilike' && !String(v ?? '').toLowerCase().includes(String(x).toLowerCase())) return false
      }
    } else if (v !== cond) return false
  }
  return true
}

function seedLocal() {
  const now = new Date().toISOString()
  const data = Object.fromEntries(TABLES.map((t) => [t, []]))
  data.categories = SEED_CATEGORIES.map((c) => ({ id: randomUUID(), image: null, ...c }))
  data.products = SEED_PRODUCTS.map(({ category, ...p }) => ({
    id: randomUUID(),
    ...p,
    category_id: data.categories.find((c) => c.slug === category).id,
    seo_title: null,
    seo_description: null,
    created_at: now,
    updated_at: now,
  }))
  data.settings = [{ key: 'shop', value: DEFAULT_SETTINGS }]
  return data
}

function localDriver(dir) {
  const file = path.join(dir, 'db.json')
  let data
  const load = () => {
    if (data) return data
    if (fs.existsSync(file)) {
      data = JSON.parse(fs.readFileSync(file, 'utf8'))
      for (const t of TABLES) data[t] ||= []
    } else {
      data = seedLocal()
      save()
    }
    return data
  }
  const save = () => {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(file, JSON.stringify(data, null, 1))
  }
  const checkUnique = (table, row, selfId) => {
    for (const cols of UNIQUE[table] || []) {
      if (cols.some((c) => row[c] === null || row[c] === undefined)) continue
      const clash = load()[table].find((r) => r.id !== selfId && cols.every((c) => r[c] === row[c]))
      if (clash) throw new ConflictError(`${table}.${cols.join('+')} already exists`)
    }
  }
  const clone = (x) => JSON.parse(JSON.stringify(x))

  return {
    name: 'local',
    async select(table, { where, order, limit, offset, count } = {}) {
      let rows = load()[table].filter((r) => matches(r, where))
      for (const spec of [].concat(order || []).reverse()) {
        const [col, dir = 'asc'] = spec.split('.')
        rows = [...rows].sort((a, b) => {
          const x = a[col] ?? ''
          const y = b[col] ?? ''
          return (x > y ? 1 : x < y ? -1 : 0) * (dir === 'desc' ? -1 : 1)
        })
      }
      const total = rows.length
      if (offset) rows = rows.slice(offset)
      if (limit) rows = rows.slice(0, limit)
      return count ? { rows: clone(rows), total } : clone(rows)
    },
    async insert(table, rows) {
      const list = [].concat(rows).map((r) => {
        const now = new Date().toISOString()
        const row = { ...(DEFAULTS[table] || {}), ...r }
        if (table !== 'settings') row.id ||= randomUUID()
        row.created_at ||= now
        if (['products', 'orders'].includes(table)) row.updated_at ||= now
        checkUnique(table, row, row.id)
        return row
      })
      load()[table].push(...list)
      save()
      return Array.isArray(rows) ? clone(list) : clone(list[0])
    },
    async update(table, where, patch) {
      const hit = load()[table].filter((r) => matches(r, where))
      for (const row of hit) checkUnique(table, { ...row, ...patch }, row.id)
      for (const row of hit) Object.assign(row, patch)
      if (hit.length) save()
      return clone(hit)
    },
    async remove(table, where) {
      const all = load()[table]
      const hit = all.filter((r) => matches(r, where))
      data[table] = all.filter((r) => !hit.includes(r))
      if (hit.length) save()
      return clone(hit)
    },
    async rpc(name, args = {}) {
      const d = load()
      if (name === 'next_counter') {
        let row = d.counters.find((c) => c.name === args.p_name)
        if (!row) d.counters.push((row = { name: args.p_name, value: 0 }))
        row.value += 1
        save()
        return row.value
      }
      if (name === 'adjust_stock') {
        // p_items: [{ product_id, qty }], p_sign: -1 to deduct, +1 to restore
        for (const item of args.p_items) {
          const product = d.products.find((pr) => pr.id === item.product_id)
          if (product) product.stock_qty = Math.max(0, product.stock_qty + args.p_sign * item.qty)
        }
        save()
        return null
      }
      throw new Error(`Unknown rpc ${name}`)
    },
  }
}

/* --------------------------------- Selection -------------------------------- */

let driver
export function db() {
  if (driver) return driver
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) driver = supabaseDriver(url, key)
  else if (process.env.VERCEL) throw new NotConfiguredError()
  else driver = localDriver(process.env.SHOP_LOCAL_DB_DIR || path.resolve('.shop-dev'))
  return driver
}
export function resetDbForTests() {
  driver = undefined
}

export async function one(table, where) {
  const rows = await db().select(table, { where, limit: 1 })
  return rows[0] || null
}

export async function getSettings() {
  const row = await one('settings', { key: 'shop' })
  const value = row?.value || {}
  return {
    ...DEFAULT_SETTINGS,
    ...value,
    seller: { ...DEFAULT_SETTINGS.seller, ...(value.seller || {}) },
    bank: { ...DEFAULT_SETTINGS.bank, ...(value.bank || {}) },
  }
}

export async function saveSettings(value) {
  const existing = await one('settings', { key: 'shop' })
  if (existing) await db().update('settings', { key: 'shop' }, { value })
  else await db().insert('settings', { key: 'shop', value })
}

export async function addEvent(orderId, type, message, createdBy = 'system') {
  try {
    await db().insert('order_events', { order_id: orderId, type, message: String(message).slice(0, 1000), created_by: createdBy })
  } catch (err) {
    console.error('[shop] could not write order event', err)
  }
}
