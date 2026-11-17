// Staff admin: one activity timeline (sign-ins, accounts, orders, payments, shipping,
// emails) and the customer list. Built from records the shop already keeps, so
// nothing extra is stored about visitors.
import { db, one } from '../lib/db.js'
import { HttpError, json, str } from '../lib/http.js'

const DAY = 24 * 3600 * 1000
const PAGE = 50

// What each order history entry counts as on the timeline.
const EVENT_KIND = {
  placed: 'order',
  paid: 'payment',
  payment_authorized: 'payment',
  payment_failed: 'payment_failed',
  payment_mismatch: 'payment_failed',
  payment_after_close: 'payment_failed',
  payment_method: 'payment',
  utr: 'payment',
  refund_note: 'payment',
  refunded: 'status',
  cancelled: 'status',
  processing: 'shipping',
  shipped: 'shipping',
  courier_update: 'shipping',
  delivered: 'shipping',
  email_sent: 'email',
  email_failed: 'email_failed',
  note: 'note',
  crm: 'other',
}
const EVENT_TITLE = {
  placed: 'Order placed',
  paid: 'Payment received',
  payment_authorized: 'Online payment made, waiting for Razorpay confirmation',
  payment_failed: 'Payment failed',
  payment_mismatch: 'Payment amount did not match',
  payment_after_close: 'Payment arrived after the order was closed',
  payment_method: 'Payment method changed',
  utr: 'Customer sent a payment reference (UTR)',
  refund_note: 'Refund recorded',
  refunded: 'Order refunded',
  cancelled: 'Order cancelled',
  processing: 'Order being packed',
  shipped: 'Order shipped',
  courier_update: 'Courier update',
  delivered: 'Order delivered',
  email_sent: 'Email sent',
  email_failed: 'Email failed to send',
  note: 'Staff note',
  crm: 'Lead copied to CRM',
}

// Which filter button each kind belongs to.
export const ACTIVITY_GROUPS = {
  signins: ['signin', 'signin_staff', 'signin_failed'],
  accounts: ['account'],
  orders: ['order', 'status', 'note'],
  payments: ['payment', 'payment_failed'],
  shipping: ['shipping'],
  emails: ['email', 'email_failed'],
}

async function loadActivity({ since, until, email }) {
  const range = { gte: since, ...(until ? { lte: until } : {}) }
  const [events, orders, codes, customers] = await Promise.all([
    db().select('order_events', { where: { created_at: range }, order: 'created_at.desc', limit: 2000 }),
    db().select('orders', { where: { created_at: range }, order: 'created_at.desc', limit: 2000 }),
    db().select('login_codes', { where: { created_at: range, ...(email ? { email } : {}) }, order: 'created_at.desc', limit: 2000 }),
    db().select('customers', { where: { account_created_at: range, ...(email ? { email } : {}) }, order: 'account_created_at.desc', limit: 1000 }),
  ])

  // Events can belong to orders placed before the window, so fetch those orders too.
  const known = new Map(orders.map((o) => [o.id, o]))
  const missing = [...new Set(events.map((e) => e.order_id).filter((id) => !known.has(id)))]
  for (let i = 0; i < missing.length; i += 200) {
    for (const o of await db().select('orders', { where: { id: missing.slice(i, i + 200) } })) known.set(o.id, o)
  }

  const items = []
  for (const e of events) {
    const order = known.get(e.order_id)
    if (!order) continue
    const kind = EVENT_KIND[e.type] || 'other'
    items.push({
      id: `e:${e.id}`,
      at: e.created_at,
      kind,
      title: EVENT_TITLE[e.type] || e.type,
      detail: e.message,
      who: e.created_by === 'system' || e.created_by === 'customer' || e.created_by === 'razorpay' ? order.contact?.email : e.created_by,
      by: e.created_by,
      order: { id: order.id, number: order.order_number, total_paise: order.total_paise },
      customer_id: order.customer_id,
    })
  }
  for (const c of codes) {
    if (c.used_at) {
      items.push({
        id: `l:${c.id}`,
        at: c.used_at,
        kind: c.purpose === 'staff' ? 'signin_staff' : 'signin',
        title: c.purpose === 'staff' ? 'Staff signed in to admin' : 'Customer signed in',
        detail: c.device ? `From ${c.device}` : '',
        who: c.email,
      })
    } else if (c.attempts > 0) {
      items.push({
        id: `l:${c.id}`,
        at: c.created_at,
        kind: 'signin_failed',
        title: c.purpose === 'staff' ? 'Failed staff sign-in' : 'Failed sign-in',
        detail: `Wrong code entered ${c.attempts} time${c.attempts === 1 ? '' : 's'}`,
        who: c.email,
      })
    }
  }
  for (const c of customers) {
    items.push({ id: `c:${c.id}`, at: c.account_created_at, kind: 'account', title: 'New customer account', detail: c.name || '', who: c.email, customer_id: c.id })
  }
  return items.filter((i) => i.at >= since && (!until || i.at <= until)).sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0))
}

export async function activity(request) {
  const url = new URL(request.url)
  const days = Math.min(365, Math.max(1, Number(url.searchParams.get('days')) || 7))
  const group = url.searchParams.get('type') || ''
  const q = str(url.searchParams.get('q'), 100).toLowerCase()
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
  const since = new Date(Date.now() - days * DAY).toISOString()

  let items = await loadActivity({ since })
  const counts = Object.fromEntries(Object.entries(ACTIVITY_GROUPS).map(([g, kinds]) => [g, items.filter((i) => kinds.includes(i.kind)).length]))
  if (group && ACTIVITY_GROUPS[group]) items = items.filter((i) => ACTIVITY_GROUPS[group].includes(i.kind))
  if (q) items = items.filter((i) => `${i.who || ''} ${i.order?.number || ''} ${i.title} ${i.detail || ''}`.toLowerCase().includes(q))

  // Link each entry to its customer where we can.
  const emails = [...new Set(items.slice((page - 1) * PAGE, page * PAGE).map((i) => i.who).filter((w) => w && w.includes('@')))]
  const customers = emails.length ? await db().select('customers', { where: { email: emails } }) : []
  const pageItems = items.slice((page - 1) * PAGE, page * PAGE).map((i) => ({
    ...i,
    customer_id: i.customer_id || customers.find((c) => c.email === i.who)?.id || null,
  }))
  return json({ items: pageItems, total: items.length, page, pages: Math.max(1, Math.ceil(items.length / PAGE)), counts, days })
}

/* --------------------------------- Customers -------------------------------- */

const PAID = ['paid', 'processing', 'shipped', 'delivered']

function summarise(customer, orders, lastSignIn) {
  const mine = orders.filter((o) => o.customer_id === customer.id)
  const paid = mine.filter((o) => PAID.includes(o.status))
  return {
    id: customer.id,
    email: customer.email,
    name: customer.name || mine[0]?.contact?.name || '',
    phone: customer.phone || mine[0]?.contact?.phone || '',
    company: customer.company || '',
    gstin: customer.gstin || '',
    has_account: Boolean(customer.account_created_at),
    account_created_at: customer.account_created_at || null,
    created_at: customer.created_at,
    orders: mine.length,
    paid_orders: paid.length,
    spent_paise: paid.reduce((s, o) => s + o.total_paise, 0),
    awaiting_payment: mine.filter((o) => o.status === 'pending_payment').length,
    last_order_at: mine[0]?.created_at || null,
    last_sign_in_at: lastSignIn || null,
  }
}

export async function listCustomers(request) {
  const url = new URL(request.url)
  const q = str(url.searchParams.get('q'), 100).toLowerCase()
  const filter = url.searchParams.get('filter') || ''
  const sort = url.searchParams.get('sort') || 'recent'
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)

  const [customers, orders, signIns] = await Promise.all([
    db().select('customers', { order: 'created_at.desc', limit: 5000 }),
    db().select('orders', { order: 'created_at.desc', limit: 10000 }),
    db().select('login_codes', { where: { purpose: 'customer', used_at: { neq: null } }, order: 'used_at.desc', limit: 10000 }),
  ])
  const lastSignIn = new Map()
  for (const s of signIns) if (!lastSignIn.has(s.email)) lastSignIn.set(s.email, s.used_at)

  let rows = customers.map((c) => summarise(c, orders, lastSignIn.get(c.email)))
  if (q) rows = rows.filter((r) => `${r.name} ${r.email} ${r.phone} ${r.company} ${r.gstin}`.toLowerCase().includes(q))
  if (filter === 'accounts') rows = rows.filter((r) => r.has_account)
  if (filter === 'guests') rows = rows.filter((r) => !r.has_account)
  if (filter === 'buyers') rows = rows.filter((r) => r.paid_orders > 0)
  if (filter === 'unpaid') rows = rows.filter((r) => r.awaiting_payment > 0)
  const latest = (r) => [r.last_order_at, r.last_sign_in_at, r.created_at].filter(Boolean).sort().pop() || ''
  const sorters = {
    recent: (a, b) => (latest(a) < latest(b) ? 1 : -1),
    spent: (a, b) => b.spent_paise - a.spent_paise,
    orders: (a, b) => b.orders - a.orders,
    name: (a, b) => (a.name || a.email).localeCompare(b.name || b.email),
  }
  rows.sort(sorters[sort] || sorters.recent)

  const totals = {
    customers: customers.length,
    accounts: customers.filter((c) => c.account_created_at).length,
    buyers: new Set(orders.filter((o) => PAID.includes(o.status)).map((o) => o.customer_id)).size,
  }
  return json({ customers: rows.slice((page - 1) * PAGE, page * PAGE), total: rows.length, page, pages: Math.max(1, Math.ceil(rows.length / PAGE)), totals })
}

export async function getCustomer(request, { id }) {
  const customer = await one('customers', { id })
  if (!customer) throw new HttpError(404, 'Customer not found.')
  const [orders, addresses, signIns] = await Promise.all([
    db().select('orders', { where: { customer_id: id }, order: 'created_at.desc', limit: 500 }),
    db().select('addresses', { where: { customer_id: id }, order: 'created_at.desc' }),
    db().select('login_codes', { where: { email: customer.email, purpose: 'customer' }, order: 'created_at.desc', limit: 200 }),
  ])
  const lastSignIn = signIns.find((s) => s.used_at)?.used_at
  const since = new Date(Date.now() - 365 * DAY).toISOString()
  const ids = new Set(orders.map((o) => o.id))
  const timeline = (await loadActivity({ since, email: customer.email })).filter(
    (i) => (i.order ? ids.has(i.order.id) : i.who === customer.email) && i.kind !== 'signin_staff'
  )
  return json({
    customer: summarise(customer, orders, lastSignIn),
    addresses,
    orders: orders.map((o) => ({ id: o.id, order_number: o.order_number, status: o.status, payment_method: o.payment_method, total_paise: o.total_paise, created_at: o.created_at })),
    activity: timeline.slice(0, 100),
  })
}
