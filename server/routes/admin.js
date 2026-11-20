// Staff admin API. Every handler is wrapped by the router with requireStaff(),
// so the role is checked on each call.
import { db, one, getSettings, saveSettings, addEvent, ConflictError } from '../lib/db.js'
import { HttpError, json, text, readJson, str } from '../lib/http.js'
import { STATUSES, allowedNext, changeStatus, shipOrder, orderItems } from '../lib/orders.js'
import { parseCsv, toCsv } from '../../shared/csv.js'
import { EMAIL_RE, GSTIN_RE } from '../../shared/india.js'
import { DEFAULT_SETTINGS, SEED_CATEGORIES, SEED_PRODUCTS } from '../../shared/catalogue.js'
import { shiprocketConfigured, createShiprocketOrder } from '../lib/shiprocket.js'
import { razorpayConfigured } from '../lib/razorpay.js'
import { leadForwardingOn } from '../lib/crm.js'
import { saveProductImage, readLocalUpload } from '../lib/storage.js'
import { RANGE_PHOTOS } from '../../shared/range-photos.js'
import { listSubscribers, removeSubscriber } from '../lib/subscribers.js'

export async function me(request, _params, staff) {
  return json({
    staff: { email: staff.email, name: staff.name, role: staff.role },
    integrations: {
      database: db().name,
      online_payment: razorpayConfigured(),
      email: Boolean(process.env.RESEND_API_KEY),
      sales_email: Boolean(process.env.SALES_NOTIFY_EMAIL),
      shiprocket: shiprocketConfigured(),
      lead_forwarding: leadForwardingOn(),
    },
  })
}

/* --------------------------------- Dashboard -------------------------------- */

const istDay = (iso) => new Date(new Date(iso).getTime() + 5.5 * 3600 * 1000).toISOString().slice(0, 10)

export async function dashboard() {
  const since = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()
  const [recent, open, products, settings] = await Promise.all([
    db().select('orders', { where: { created_at: { gte: since } }, order: 'created_at.desc', limit: 1000 }),
    db().select('orders', { where: { status: ['pending_payment', 'paid', 'processing'] }, order: 'created_at.desc', limit: 1000 }),
    db().select('products', { where: { is_active: true } }),
    getSettings(),
  ])
  const today = istDay(new Date().toISOString())
  const counted = (o) => !['pending_payment', 'cancelled', 'refunded'].includes(o.status)
  const days = []
  for (let i = 13; i >= 0; i--) {
    const day = istDay(new Date(Date.now() - i * 24 * 3600 * 1000).toISOString())
    const list = recent.filter((o) => counted(o) && istDay(o.paid_at || o.created_at) === day)
    days.push({ day, orders: list.length, revenue_paise: list.reduce((s, o) => s + o.total_paise, 0) })
  }
  const paid30 = recent.filter(counted)
  return json({
    today: {
      orders: recent.filter((o) => istDay(o.created_at) === today).length,
      revenue_paise: recent.filter((o) => counted(o) && istDay(o.paid_at || o.created_at) === today).reduce((s, o) => s + o.total_paise, 0),
    },
    last_30_days: { orders: paid30.length, revenue_paise: paid30.reduce((s, o) => s + o.total_paise, 0) },
    pending_payments: open.filter((o) => o.status === 'pending_payment').length,
    to_ship: open.filter((o) => ['paid', 'processing'].includes(o.status)).length,
    days,
    low_stock: products
      .filter((p) => !p.quote_only && p.price_paise > 0 && p.stock_qty <= (settings.low_stock_threshold ?? 5))
      .map((p) => ({ id: p.id, name: p.name, sku: p.sku, stock_qty: p.stock_qty })),
    recent_orders: recent.slice(0, 8).map(orderRow),
  })
}

/* ---------------------------------- Orders ---------------------------------- */

const orderRow = (o) => ({
  id: o.id,
  order_number: o.order_number,
  status: o.status,
  payment_method: o.payment_method,
  total_paise: o.total_paise,
  created_at: o.created_at,
  customer_name: o.contact?.name,
  customer_email: o.contact?.email,
  city: o.shipping_address?.city,
  utr: o.utr || '',
})

function orderFilters(url) {
  const where = {}
  const status = url.searchParams.get('status')
  const payment = url.searchParams.get('payment')
  const q = str(url.searchParams.get('q'), 60)
  const from = url.searchParams.get('from')
  const to = url.searchParams.get('to')
  if (STATUSES.includes(status)) where.status = status
  if (payment) where.payment_method = payment
  if (q) where.order_number = { ilike: q }
  const range = {}
  if (/^\d{4}-\d{2}-\d{2}$/.test(from || '')) range.gte = new Date(`${from}T00:00:00+05:30`).toISOString()
  if (/^\d{4}-\d{2}-\d{2}$/.test(to || '')) range.lte = new Date(`${to}T23:59:59+05:30`).toISOString()
  if (Object.keys(range).length) where.created_at = range
  return where
}

export async function listOrders(request) {
  const url = new URL(request.url)
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
  const size = 25
  const { rows, total } = await db().select('orders', { where: orderFilters(url), order: 'created_at.desc', limit: size, offset: (page - 1) * size, count: true })
  return json({ orders: rows.map(orderRow), total, page, pages: Math.max(1, Math.ceil(total / size)) })
}

async function orderById(id) {
  const order = await one('orders', { id })
  if (!order) throw new HttpError(404, 'Order not found.')
  return order
}

export async function getOrder(request, { id }) {
  const order = await orderById(id)
  const [items, events, shipment, payments] = await Promise.all([
    orderItems(order.id),
    db().select('order_events', { where: { order_id: order.id }, order: 'created_at.desc' }),
    one('shipments', { order_id: order.id }),
    db().select('payments', { where: { order_id: order.id }, order: 'created_at.desc' }),
  ])
  return json({
    order,
    items,
    events,
    shipment,
    payments: payments.map(({ raw_event: _raw, ...p }) => p),
    allowed_next: allowedNext(order.status),
    shiprocket: shiprocketConfigured(),
  })
}

export async function setOrderStatus(request, { id }, staff) {
  const body = await readJson(request)
  const order = await orderById(id)
  const updated = await changeStatus(order, str(body.status, 30), { by: staff.email, note: str(body.note, 500) })
  return json({ ok: true, status: updated.status })
}

export async function addOrderNote(request, { id }, staff) {
  const note = str((await readJson(request)).note, 1000)
  if (!note) throw new HttpError(422, 'Write a note first.')
  const order = await orderById(id)
  await addEvent(order.id, 'note', note, staff.email)
  return json({ ok: true })
}

export async function shipOrderRoute(request, { id }, staff) {
  const body = await readJson(request)
  const order = await orderById(id)
  const courier = str(body.courier, 80)
  const awb = str(body.awb, 60)
  const trackingUrl = str(body.tracking_url, 500)
  const fields = {}
  if (!courier) fields.courier = 'Enter the courier name'
  if (!awb) fields.awb = 'Enter the tracking number'
  if (trackingUrl && !/^https?:\/\//i.test(trackingUrl)) fields.tracking_url = 'The tracking link must start with http:// or https://'
  if (Object.keys(fields).length) throw new HttpError(422, 'Please check the highlighted fields.', { fields })
  await shipOrder(order, { courier, awb, tracking_url: trackingUrl, by: staff.email })
  return json({ ok: true })
}

export async function shiprocketCreate(request, { id }, staff) {
  if (!shiprocketConfigured()) throw new HttpError(400, 'Shiprocket is not connected yet.')
  const order = await orderById(id)
  if (!['paid', 'processing'].includes(order.status)) throw new HttpError(409, 'Only paid orders can be sent to Shiprocket.')
  const items = await orderItems(order.id)
  const products = await db().select('products', { where: { id: items.map((i) => i.product_id).filter(Boolean) } })
  const result = await createShiprocketOrder(order, items, products)
  await db().insert('shipments', { order_id: order.id, courier: result.courier, awb: result.awb || null, tracking_url: result.awb ? `https://shiprocket.co/tracking/${result.awb}` : null, provider_shipment_id: result.shipment_id, shipped_at: null, delivered_at: null })
  if (order.status === 'paid') await changeStatus(order, 'processing', { by: staff.email, note: `Sent to Shiprocket (shipment ${result.shipment_id}).` })
  else await addEvent(order.id, 'note', `Sent to Shiprocket (shipment ${result.shipment_id}).`, staff.email)
  return json({ ok: true })
}

export async function exportOrders(request) {
  const url = new URL(request.url)
  const orders = await db().select('orders', { where: orderFilters(url), order: 'created_at.desc', limit: 5000 })
  const items = orders.length ? await db().select('order_items', { where: { order_id: orders.map((o) => o.id) } }) : []
  const rows = orders.map((o) => ({
    order_number: o.order_number,
    date: o.created_at,
    status: o.status,
    payment_method: o.payment_method,
    invoice_number: o.invoice_number || '',
    customer: o.contact?.name,
    email: o.contact?.email,
    phone: o.contact?.phone,
    company: o.contact?.company || '',
    gstin: o.gstin || '',
    items: items.filter((i) => i.order_id === o.id).map((i) => `${i.sku} x ${i.qty}`).join('; '),
    subtotal: (o.subtotal_paise / 100).toFixed(2),
    shipping: (o.shipping_paise / 100).toFixed(2),
    gst_included: (o.gst_paise / 100).toFixed(2),
    total: (o.total_paise / 100).toFixed(2),
    ship_to: [o.shipping_address?.line1, o.shipping_address?.line2, o.shipping_address?.city, o.shipping_address?.state, o.shipping_address?.pincode].filter(Boolean).join(', '),
    utr: o.utr || '',
  }))
  return text(toCsv(Object.keys(rows[0] || { order_number: '' }), rows), 'text/csv; charset=utf-8', 200, {
    'Content-Disposition': 'attachment; filename="orders.csv"',
    'Cache-Control': 'no-store',
  })
}

/* --------------------------------- Products --------------------------------- */

const slugify = (s) => String(s ?? '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

const toPaise = (v) => {
  if (v === null || v === undefined || v === '') return null
  const n = Math.round(Number(String(v).replace(/[₹,\s]/g, '')) * 100)
  return Number.isFinite(n) ? n : NaN
}
const toBool = (v, fallback) => {
  if (typeof v === 'boolean') return v
  if (v === undefined || v === null || v === '') return fallback
  return ['true', 'yes', '1', 'y'].includes(String(v).toLowerCase())
}
const safeUrl = (u) => /^(https?:\/\/|\/)[^\s"'<>]+$/i.test(u)

// Accepts admin form input or a CSV row. Returns { row, errors }.
function cleanProduct(input, categories, existing) {
  const errors = {}
  const base = existing || {}
  const pick = (k) => (input[k] !== undefined ? input[k] : base[k])
  const row = {}

  row.name = str(pick('name'), 160)
  if (row.name.length < 2) errors.name = 'Enter the product name'
  row.sku = str(pick('sku'), 60).toUpperCase()
  if (!/^[A-Z0-9][A-Z0-9._-]{1,59}$/.test(row.sku)) errors.sku = 'SKU needs 2 or more letters, numbers, dots or dashes'
  row.slug = slugify(pick('slug') || row.name)
  if (!row.slug) errors.slug = 'Enter a web address name'
  row.brand = str(pick('brand'), 80) || null

  const categoryKey = input.category !== undefined ? str(input.category, 80) : undefined
  const category = categoryKey !== undefined ? categories.find((c) => c.slug === categoryKey || c.name.toLowerCase() === categoryKey.toLowerCase()) : categories.find((c) => c.id === (input.category_id || base.category_id))
  if (!category) errors.category = 'Choose a category'
  else row.category_id = category.id

  row.short_description = str(pick('short_description'), 300)
  row.long_description = str(pick('long_description'), 8000)

  const price = input.price !== undefined ? toPaise(input.price) : input.price_paise !== undefined ? input.price_paise : (base.price_paise ?? null)
  if (price !== null && (!Number.isInteger(price) || price <= 0 || price > 100_000_000_00)) errors.price = 'Price must be more than zero, or empty for "Request price"'
  row.price_paise = price
  const mrp = input.mrp !== undefined ? toPaise(input.mrp) : input.mrp_paise !== undefined ? input.mrp_paise : (base.mrp_paise ?? null)
  if (mrp !== null && (!Number.isInteger(mrp) || mrp <= 0)) errors.mrp = 'MRP must be more than zero or empty'
  else if (mrp !== null && Number.isInteger(price) && mrp < price) errors.mrp = 'MRP cannot be lower than the price'
  row.mrp_paise = mrp

  const gst = Number(pick('gst_percent') ?? 18)
  if (!Number.isFinite(gst) || gst < 0 || gst > 40) errors.gst_percent = 'GST % must be between 0 and 40'
  row.gst_percent = gst
  row.hsn_code = str(pick('hsn_code'), 12)
  if (row.hsn_code && !/^[0-9]{4,8}$/.test(row.hsn_code)) errors.hsn_code = 'HSN code is 4 to 8 digits'

  const int = (k, min, fallback, label) => {
    const raw = pick(k)
    const n = raw === '' || raw === null || raw === undefined ? fallback : Number(raw)
    if (n !== null && (!Number.isInteger(n) || n < min || n > 10_000_000)) errors[k] = `${label} must be a whole number of ${min} or more`
    return n
  }
  row.stock_qty = int('stock_qty', 0, 0, 'Stock')
  row.min_order_qty = int('min_order_qty', 1, 1, 'Minimum order quantity')
  row.weight_grams = int('weight_grams', 1, null, 'Weight')

  row.is_active = toBool(pick('is_active'), true)
  row.is_featured = toBool(pick('is_featured'), false)
  row.quote_only = toBool(pick('quote_only'), false)

  let images = pick('images') ?? []
  if (typeof images === 'string') images = images.split('|')
  row.images = images.map((u) => str(u, 500)).filter(Boolean).slice(0, 8)
  if (row.images.some((u) => !safeUrl(u))) errors.images = 'Each image must be a link starting with https:// or /'
  row.datasheet_url = str(pick('datasheet_url'), 500) || null
  if (row.datasheet_url && !safeUrl(row.datasheet_url)) errors.datasheet_url = 'The datasheet must be a link starting with https:// or /'

  let specs = pick('specs') ?? []
  if (typeof specs === 'string') {
    specs = specs.split('|').map((s) => {
      const i = s.indexOf(':')
      return i > 0 ? { label: s.slice(0, i), value: s.slice(i + 1) } : null
    })
  }
  row.specs = (Array.isArray(specs) ? specs : [])
    .filter((s) => s && str(s.label) && str(s.value))
    .map((s) => ({ label: str(s.label, 60), value: str(s.value, 200) }))
    .slice(0, 30)

  row.seo_title = str(pick('seo_title'), 120) || null
  row.seo_description = str(pick('seo_description'), 300) || null
  return { row, errors }
}

export async function listProducts() {
  const [products, categories] = await Promise.all([db().select('products', { order: 'name.asc' }), db().select('categories', { order: 'sort_order.asc' })])
  return json({ products, categories, catalogue_missing: missingFromCatalogue(categories, products) })
}

// Launch catalogue rows (shared/catalogue.js) that are not in the database yet.
// Matched by category slug and product SKU or slug, so nothing already there is touched.
function missingFromCatalogue(categories, products) {
  const skus = new Set(products.map((p) => p.sku))
  const slugs = new Set(products.map((p) => p.slug))
  return {
    categories: SEED_CATEGORIES.filter((c) => !categories.some((x) => x.slug === c.slug)).length,
    products: SEED_PRODUCTS.filter((p) => !skus.has(p.sku) && !slugs.has(p.slug)).length,
    unpriced: unpricedFromCatalogue(products).length,
    photos: needPhotos(products).length,
  }
}

// Catalogue products with no photo yet that have photos on our second store.
function needPhotos(products) {
  return products.filter((p) => !(p.images || []).length && RANGE_PHOTOS[p.sku])
}

const PHOTO_HOST = 'https://cdn.shopify.com/'

// Copies photos from our second store into our own photo storage, a few products
// at a time so each call finishes well inside the server time limit. Call it
// again until "left" is 0. Products that already have a photo are not touched.
export async function copyCataloguePhotos(request, _params, staff) {
  const body = await readJson(request).catch(() => ({}))
  const limit = Math.min(Math.max(Number(body.limit) || 12, 1), 40)
  const started = Date.now()
  const todo = needPhotos(await db().select('products'))
  let done = 0
  const failed = []
  for (let i = 0; i < todo.length && done < limit && Date.now() - started < 40_000; i += 4) {
    await Promise.all(
      todo.slice(i, Math.min(i + 4, i + limit - done)).map(async (p) => {
        const urls = []
        for (const src of RANGE_PHOTOS[p.sku].slice(0, 6)) {
          if (!src.startsWith(PHOTO_HOST)) continue
          try {
            const res = await fetch(`${src}?width=1200`, { signal: AbortSignal.timeout(15_000) })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            urls.push(await saveProductImage(Buffer.from(await res.arrayBuffer()), p.slug))
          } catch (err) {
            failed.push(`${p.sku}: ${err.message}`)
          }
        }
        if (urls.length) await db().update('products', { id: p.id }, { images: urls, updated_at: new Date().toISOString() })
        done += 1
      })
    )
  }
  const left = needPhotos(await db().select('products')).length
  console.log(`[shop] ${staff?.email || 'staff'} copied photos for ${done} products, ${left} left${failed.length ? `, ${failed.length} failed` : ''}`)
  return json({ done, left, failed: failed.slice(0, 20) })
}

// Products still without a price whose launch-catalogue entry now has one.
// Anything you have priced yourself is never touched.
function unpricedFromCatalogue(products) {
  const bySku = new Map(SEED_PRODUCTS.filter((p) => Number.isInteger(p.price_paise)).map((p) => [p.sku, p]))
  return products.filter((p) => p.price_paise === null && bySku.has(p.sku)).map((p) => [p, bySku.get(p.sku)])
}

// Adds missing categories and products from the launch catalogue, fills in prices,
// stock and details for catalogue products that still have no price, and puts the
// categories in the catalogue's menu order.
export async function loadCatalogue(_request, _params, staff) {
  let categories = await db().select('categories')
  const newCats = SEED_CATEGORIES.filter((c) => !categories.some((x) => x.slug === c.slug))
  if (newCats.length) {
    await db().insert('categories', newCats.map((c) => ({ slug: c.slug, name: c.name, description: c.description || '', sort_order: c.sort_order, icon: c.icon || null })))
  }
  for (const c of SEED_CATEGORIES) {
    const have = categories.find((x) => x.slug === c.slug)
    if (have && have.sort_order !== c.sort_order) await db().update('categories', { id: have.id }, { sort_order: c.sort_order })
  }
  categories = await db().select('categories')
  const products = await db().select('products')
  const skus = new Set(products.map((p) => p.sku))
  const slugs = new Set(products.map((p) => p.slug))
  const rows = SEED_PRODUCTS.filter((p) => !skus.has(p.sku) && !slugs.has(p.slug)).map((p) => ({
    sku: p.sku,
    slug: p.slug,
    name: p.name,
    brand: p.brand || null,
    category_id: categories.find((c) => c.slug === p.category).id,
    short_description: p.short_description || '',
    long_description: p.long_description || '',
    specs: p.specs || [],
    images: p.images || [],
    price_paise: p.price_paise ?? null,
    mrp_paise: p.mrp_paise ?? null,
    gst_percent: p.gst_percent ?? 18,
    hsn_code: p.hsn_code || '',
    stock_qty: p.stock_qty ?? 0,
    min_order_qty: p.min_order_qty || 1,
    is_active: true,
    is_featured: Boolean(p.is_featured),
    quote_only: Boolean(p.quote_only),
    seo_title: p.seo_title || null,
    seo_description: p.seo_description || null,
  }))
  for (let i = 0; i < rows.length; i += 100) await db().insert('products', rows.slice(i, i + 100))

  const now = new Date().toISOString()
  const unpriced = unpricedFromCatalogue(products)
  for (const [have, seed] of unpriced) {
    await db().update('products', { id: have.id }, {
      name: seed.name,
      price_paise: seed.price_paise,
      mrp_paise: seed.mrp_paise ?? null,
      stock_qty: have.stock_qty > 0 ? have.stock_qty : (seed.stock_qty ?? 0),
      min_order_qty: seed.min_order_qty || 1,
      specs: seed.specs || [],
      long_description: seed.long_description || have.long_description || '',
      updated_at: now,
    })
  }
  console.log(`[shop] ${staff?.email || 'staff'} loaded the launch catalogue: ${newCats.length} categories, ${rows.length} products, ${unpriced.length} priced`)
  return json({ categories: newCats.length, products: rows.length, priced: unpriced.length })
}

export async function saveProduct(request, { id }) {
  const body = await readJson(request)
  const categories = await db().select('categories')
  const existing = id ? await one('products', { id }) : null
  if (id && !existing) throw new HttpError(404, 'Product not found.')
  const { row, errors } = cleanProduct(body, categories, existing)
  if (Object.keys(errors).length) throw new HttpError(422, 'Please check the highlighted fields.', { fields: errors })
  try {
    const saved = id
      ? (await db().update('products', { id }, { ...row, updated_at: new Date().toISOString() }))[0]
      : await db().insert('products', row)
    return json({ product: saved }, id ? 200 : 201)
  } catch (err) {
    if (err instanceof ConflictError) throw new HttpError(422, 'Another product already uses this SKU or web address name.', { fields: { sku: 'SKU or web address name already in use' } })
    throw err
  }
}

const CSV_COLUMNS = ['sku', 'name', 'slug', 'brand', 'category', 'short_description', 'long_description', 'price', 'mrp', 'gst_percent', 'hsn_code', 'stock_qty', 'min_order_qty', 'weight_grams', 'is_active', 'is_featured', 'quote_only', 'images', 'datasheet_url', 'specs', 'seo_title', 'seo_description']

export async function exportProducts() {
  const [products, categories] = await Promise.all([db().select('products', { order: 'sku.asc' }), db().select('categories')])
  const rows = products.map((p) => ({
    ...p,
    category: categories.find((c) => c.id === p.category_id)?.slug || '',
    price: p.price_paise ? (p.price_paise / 100).toFixed(2) : '',
    mrp: p.mrp_paise ? (p.mrp_paise / 100).toFixed(2) : '',
    images: (p.images || []).join('|'),
    specs: (p.specs || []).map((s) => `${s.label}: ${s.value}`).join(' | '),
  }))
  return text(toCsv(CSV_COLUMNS, rows), 'text/csv; charset=utf-8', 200, { 'Content-Disposition': 'attachment; filename="products.csv"', 'Cache-Control': 'no-store' })
}

// Rows are matched by SKU: existing products are updated, new SKUs are added.
// Nothing is saved unless every row is valid (or dry_run asks for a check only).
export async function importProducts(request) {
  const body = await readJson(request, 2_000_000)
  const rows = parseCsv(body.csv)
  if (!rows.length) throw new HttpError(422, 'The file has no rows. Keep the header line from the exported file.')
  if (rows.length > 2000) throw new HttpError(422, 'Import up to 2000 rows at a time.')
  const [categories, products] = await Promise.all([db().select('categories'), db().select('products')])
  const problems = []
  const plan = []
  const seen = new Set()
  rows.forEach((raw, i) => {
    const sku = str(raw.sku, 60).toUpperCase()
    const existing = products.find((p) => p.sku === sku) || null
    // Empty cells mean "leave as it is" for existing products.
    const input = Object.fromEntries(Object.entries(raw).filter(([k, v]) => CSV_COLUMNS.includes(k) && (v !== '' || !existing || ['price', 'mrp'].includes(k))))
    const { row, errors } = cleanProduct(input, categories, existing)
    if (seen.has(sku)) errors.sku = 'This SKU appears twice in the file'
    seen.add(sku)
    if (Object.keys(errors).length) problems.push({ line: i + 2, sku, errors })
    else plan.push({ existing, row })
  })
  if (problems.length) throw new HttpError(422, `${problems.length} row(s) have problems. Nothing was imported.`, { problems: problems.slice(0, 50) })
  const summary = { created: plan.filter((x) => !x.existing).length, updated: plan.filter((x) => x.existing).length }
  if (body.dry_run) return json({ ok: true, dry_run: true, ...summary })
  for (const { existing, row } of plan) {
    if (existing) await db().update('products', { id: existing.id }, { ...row, updated_at: new Date().toISOString() })
    else await db().insert('products', row)
  }
  return json({ ok: true, ...summary })
}

export async function updateStock(request) {
  const updates = (await readJson(request)).updates
  if (!Array.isArray(updates) || !updates.length || updates.length > 500) throw new HttpError(422, 'Nothing to update.')
  for (const u of updates) {
    if (!Number.isInteger(u?.stock_qty) || u.stock_qty < 0 || u.stock_qty > 10_000_000) throw new HttpError(422, 'Stock must be a whole number of 0 or more.')
  }
  for (const u of updates) await db().update('products', { id: str(u.id, 60) }, { stock_qty: u.stock_qty, updated_at: new Date().toISOString() })
  return json({ ok: true, updated: updates.length })
}

/* --------------------------------- Settings --------------------------------- */

export async function readSettings() {
  return json({ settings: await getSettings() })
}

export async function writeSettings(request) {
  const body = await readJson(request)
  const current = await getSettings()
  const errors = {}
  const money = (k, label) => {
    const n = Number(body[k])
    if (!Number.isInteger(n) || n < 0 || n > 10_000_000_00) errors[k] = `${label} must be zero or more`
    return n
  }
  const whole = (k, label, min, max) => {
    const n = Number(body[k])
    if (!Number.isInteger(n) || n < min || n > max) errors[k] = `${label} must be between ${min} and ${max}`
    return n
  }
  const next = {
    ...current,
    shipping_flat_paise: money('shipping_flat_paise', 'Shipping charge'),
    free_shipping_threshold_paise: money('free_shipping_threshold_paise', 'Free shipping value'),
    shipping_gst_percent: DEFAULT_SETTINGS.shipping_gst_percent,
    delivery_days_min: whole('delivery_days_min', 'Fastest delivery', 0, 60),
    delivery_days_max: whole('delivery_days_max', 'Slowest delivery', 0, 90),
    low_stock_threshold: whole('low_stock_threshold', 'Low stock level', 0, 100000),
    support_email: str(body.support_email, 150),
    support_phone: str(body.support_phone, 30),
    whatsapp_number: str(body.whatsapp_number, 20).replace(/\D/g, ''),
    invoice_prefix: str(body.invoice_prefix, 12),
    upi_id: str(body.upi_id, 80),
    direct_orders: body.direct_orders === undefined ? current.direct_orders !== false : body.direct_orders !== false,
    seller: {
      legal_name: str(body.seller?.legal_name, 150),
      gstin: str(body.seller?.gstin, 15).toUpperCase(),
      address: str(body.seller?.address, 300),
      state: str(body.seller?.state, 60),
    },
    bank: {
      account_name: str(body.bank?.account_name, 120),
      account_number: str(body.bank?.account_number, 30).replace(/\s/g, ''),
      ifsc: str(body.bank?.ifsc, 11).toUpperCase(),
      bank_name: str(body.bank?.bank_name, 80),
      branch: str(body.bank?.branch, 80),
    },
  }
  if (next.delivery_days_max < next.delivery_days_min) errors.delivery_days_max = 'Slowest delivery cannot be less than fastest'
  if (next.support_email && !EMAIL_RE.test(next.support_email)) errors.support_email = 'Enter a valid email'
  if (next.seller.gstin && !GSTIN_RE.test(next.seller.gstin)) errors['seller.gstin'] = 'This GSTIN does not look right'
  if (next.bank.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(next.bank.ifsc)) errors['bank.ifsc'] = 'IFSC is 11 characters, like HDFC0001234'
  if (next.upi_id && !/^[\w.-]{2,}@[A-Za-z]{2,}$/.test(next.upi_id)) errors.upi_id = 'UPI ID looks like name@bank'
  if (Object.keys(errors).length) throw new HttpError(422, 'Please check the highlighted fields.', { fields: errors })
  await saveSettings(next)
  return json({ settings: next })
}

/* ----------------------------------- Staff ---------------------------------- */

export async function listStaff() {
  const rows = await db().select('staff', { order: 'email.asc' })
  const env = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  return json({ staff: rows, owners: env })
}

export async function addStaff(request) {
  const body = await readJson(request)
  const email = str(body.email, 150).toLowerCase()
  if (!EMAIL_RE.test(email)) throw new HttpError(422, 'Enter a valid email address.')
  const existing = await one('staff', { email })
  if (existing) await db().update('staff', { id: existing.id }, { is_active: true, name: str(body.name, 100) || existing.name })
  else await db().insert('staff', { email, name: str(body.name, 100) || email.split('@')[0], role: 'admin', is_active: true })
  return json({ ok: true })
}

export async function removeStaff(request, { id }, staff) {
  const row = await one('staff', { id })
  if (!row) throw new HttpError(404, 'Not found.')
  if (row.email === staff.email) throw new HttpError(409, 'You cannot remove your own access.')
  await db().update('staff', { id }, { is_active: false })
  return json({ ok: true })
}

/* ---------------------------------- Photos ---------------------------------- */

// The admin screen shrinks photos in the browser first, then sends them here as base64.
export async function uploadImage(request) {
  const body = await readJson(request, 6_000_000)
  const data = String(body.data || '').replace(/^data:[^,]*,/, '')
  if (!data || !/^[A-Za-z0-9+/=\s]+$/.test(data)) throw new HttpError(422, 'No photo was received. Please try again.')
  const url = await saveProductImage(Buffer.from(data, 'base64'), str(body.name, 120))
  return json({ url }, 201)
}

export async function localUpload(request, { month, file }) {
  const found = readLocalUpload(`${month}/${file}`)
  if (!found) throw new HttpError(404, 'Not found.')
  return new Response(found.buf, { headers: { 'Content-Type': found.type, 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' } })
}

// Pop-up sign-ups ("Stay updated").
export async function subscribers() {
  return json({ subscribers: await listSubscribers() })
}

export async function exportSubscribers() {
  const rows = (await listSubscribers()).map((s) => ({ signed_up: s.created_at.slice(0, 10), mobile: s.phone, email: s.email, page: s.page }))
  return text(toCsv(['signed_up', 'mobile', 'email', 'page'], rows), 'text/csv; charset=utf-8', 200, { 'Content-Disposition': 'attachment; filename="subscribers.csv"', 'Cache-Control': 'no-store' })
}

export async function deleteSubscriber(request, _params, staff) {
  const body = await readJson(request)
  const removed = await removeSubscriber({ phone: str(body.phone, 30), email: str(body.email, 160).toLowerCase() })
  console.log(`[shop] ${staff?.email || 'staff'} removed ${removed} subscriber(s)`)
  return json({ removed })
}
