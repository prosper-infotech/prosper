// End-to-end tests of the shop's server functions, run against the local JSON
// store. No network: Razorpay's API is replaced by a stub.  Run: npm test
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'shop-test-'))
Object.assign(process.env, {
  SHOP_LOCAL_DB_DIR: dir,
  SHOP_DISABLE_RATE_LIMIT: 'true',
  ADMIN_EMAILS: 'owner@example.com',
  SALES_NOTIFY_EMAIL: 'sales@example.com',
  RAZORPAY_KEY_ID: 'rzp_test_key',
  RAZORPAY_KEY_SECRET: 'rzp_test_secret',
  RAZORPAY_WEBHOOK_SECRET: 'whsec_test',
  SITE_URL: 'http://localhost:5173',
})
delete process.env.SUPABASE_URL
delete process.env.RESEND_API_KEY
delete process.env.VERCEL

let rzpCounter = 0
globalThis.fetch = async (url) => {
  if (String(url).startsWith('https://api.razorpay.com/v1/orders')) {
    return new Response(JSON.stringify({ id: `order_TEST${++rzpCounter}` }), { status: 200 })
  }
  throw new Error(`Unexpected network call in tests: ${url}`)
}

const { handle } = await import('../server/router.js')
const { createSessionToken } = await import('../server/lib/auth.js')
const { parseCsv, toCsv } = await import('../shared/csv.js')
const { priceCart, gstIncluded } = await import('../shared/pricing.js')

const staffCookie = `pi_staff=${createSessionToken('owner@example.com', 'staff')}`
async function api(method, url, body, headers = {}) {
  const res = await handle(
    new Request(`http://localhost${url}`, {
      method,
      headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...headers },
      body: body !== undefined ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
    })
  )
  const type = res.headers.get('content-type') || ''
  return { status: res.status, headers: res.headers, data: type.includes('json') ? await res.json() : await res.text() }
}
const admin = (method, url, body) => api(method, url, body, { Cookie: staffCookie })
const outbox = () => (fs.existsSync(path.join(dir, 'outbox')) ? fs.readdirSync(path.join(dir, 'outbox')).filter((f) => f.endsWith('.json')) : [])
const lastMail = (type) => {
  const file = outbox().filter((f) => f.includes(`-${type}.json`)).sort().pop()
  return file ? JSON.parse(fs.readFileSync(path.join(dir, 'outbox', file), 'utf8')) : null
}

const contact = { name: 'Asha Rao', email: 'asha@example.com', phone: '98765 43210', company: 'Rao Traders', gstin: '' }
const shipping = { line1: '12 MG Road', line2: '', city: 'Pune', state: 'Maharashtra', pincode: '411001' }
const order = (items, extra = {}) => ({ items, contact, shipping, billing_same: true, payment_method: 'bank_transfer', accept_terms: true, ...extra })

let products
let labels // priced product
let reader // second priced product
const product = async (slug) => (await api('GET', '/api/shop/catalogue')).data.products.find((p) => p.slug === slug)

before(async () => {
  products = (await api('GET', '/api/shop/catalogue')).data.products
})

test('catalogue: 19 placeholder products, none with a price', () => {
  assert.equal(products.length, 19)
  assert.ok(products.every((p) => p.price_paise === null))
})

test('a payment method is refused until it is set up', async () => {
  const res = await api('POST', '/api/checkout', order([{ id: products[0].id, qty: 2 }]))
  assert.equal(res.status, 400)
  const cfg = (await api('GET', '/api/shop/catalogue')).data.config
  assert.deepEqual([cfg.bank_payment, cfg.upi_payment, cfg.online_payment], [false, false, true])
  const current = (await admin('GET', '/api/admin/settings')).data.settings
  const saved = await admin('PUT', '/api/admin/settings', { ...current, upi_id: 'prosper@hdfc', bank: { account_name: 'Prosper Infotech', account_number: '50200012345678', ifsc: 'HDFC0001234', bank_name: 'HDFC Bank', branch: 'Pune' } })
  assert.equal(saved.status, 200)
})

test('checkout refuses products that have no price', async () => {
  const res = await api('POST', '/api/checkout', order([{ id: products[0].id, qty: 1 }]))
  assert.equal(res.status, 409)
  assert.equal(res.data.code, 'cart_changed')
})

test('admin API needs a staff session', async () => {
  assert.equal((await api('GET', '/api/admin/orders')).status, 401)
  const customerCookie = `pi_staff=${createSessionToken('owner@example.com', 'customer')}`
  assert.equal((await api('GET', '/api/admin/orders', undefined, { Cookie: customerCookie })).status, 401)
  const stranger = `pi_staff=${createSessionToken('stranger@example.com', 'staff')}`
  assert.equal((await api('GET', '/api/admin/orders', undefined, { Cookie: stranger })).status, 403)
  assert.equal((await admin('GET', '/api/admin/orders')).status, 200)
})

test('admin sets price and stock, product becomes orderable', async () => {
  const p = products.find((x) => x.slug === 'uhf-rfid-paper-labels')
  const bad = await admin('PUT', `/api/admin/products/${p.id}`, { price: '-5' })
  assert.equal(bad.status, 422)
  const res = await admin('PUT', `/api/admin/products/${p.id}`, { price: '1180', stock_qty: 10, min_order_qty: 2, hsn_code: '8523' })
  assert.equal(res.status, 200)
  const r = products.find((x) => x.slug === 'handheld-uhf-rfid-reader')
  assert.equal((await admin('PUT', `/api/admin/products/${r.id}`, { price: '59000', stock_qty: 3 })).status, 200)
  labels = await product('uhf-rfid-paper-labels')
  reader = await product('handheld-uhf-rfid-reader')
  assert.equal(labels.price_paise, 118000)
  assert.equal(labels.stock_qty, 10)
})

test('pricing: GST split, shipping rule and free-shipping threshold', () => {
  assert.equal(gstIncluded(118000, 18), 18000)
  const settings = { shipping_flat_paise: 15000, free_shipping_threshold_paise: 500000, shipping_gst_percent: 18 }
  const small = priceCart([{ product: labels, qty: 2 }], settings)
  assert.equal(small.subtotal_paise, 236000)
  assert.equal(small.shipping_paise, 15000)
  assert.equal(small.total_paise, 251000)
  assert.equal(small.gst_paise, 36000 + gstIncluded(15000, 18))
  const big = priceCart([{ product: reader, qty: 1 }], settings)
  assert.equal(big.shipping_paise, 0)
  assert.ok(big.free_shipping)
})

test('checkout enforces minimum quantity and stock', async () => {
  assert.equal((await api('POST', '/api/checkout', order([{ id: labels.id, qty: 1 }]))).status, 409)
  assert.equal((await api('POST', '/api/checkout', order([{ id: labels.id, qty: 11 }]))).status, 409)
  assert.equal((await api('POST', '/api/checkout', order([{ id: labels.id, qty: -3 }]))).status, 400)
})

test('checkout validates the form, terms and the bot trap', async () => {
  const noTerms = await api('POST', '/api/checkout', order([{ id: labels.id, qty: 2 }], { accept_terms: false }))
  assert.equal(noTerms.status, 400)
  const bot = await api('POST', '/api/checkout', order([{ id: labels.id, qty: 2 }], { website: 'http://spam' }))
  assert.equal(bot.status, 400)
  const badForm = await api('POST', '/api/checkout', order([{ id: labels.id, qty: 2 }], { contact: { ...contact, email: 'nope', phone: '123' }, shipping: { ...shipping, pincode: '12' } }))
  assert.equal(badForm.status, 422)
  assert.ok(badForm.data.fields['contact.email'] && badForm.data.fields['contact.phone'] && badForm.data.fields['shipping.pincode'])
})

let manualOrder
test('price tampering: the server charges its own total', async () => {
  const lied = await api('POST', '/api/checkout', order([{ id: labels.id, qty: 2 }], { expected_total_paise: 100 }))
  assert.equal(lied.status, 409)
  assert.equal(lied.data.total_paise, 251000)
  // Extra fields that pretend to set a price are ignored.
  const res = await api('POST', '/api/checkout', order([{ id: labels.id, qty: 2, price_paise: 1, unit_price_paise: 1 }], { total_paise: 1, subtotal_paise: 1 }))
  assert.equal(res.status, 201)
  assert.equal(res.data.total_paise, 251000)
  manualOrder = res.data
  const view = await api('GET', `/api/orders/${manualOrder.token}`)
  assert.equal(view.data.order.status, 'pending_payment')
  assert.equal(view.data.order.total_paise, 251000)
  assert.equal(view.data.order.items[0].unit_price_paise, 118000)
  assert.ok(view.data.order.payment_instructions)
  assert.match(manualOrder.order_number, /^PI-\d{4}-000001$/)
  assert.ok(lastMail('orderReceived').to.includes('asha@example.com'))
  assert.ok(lastMail('salesNewOrder').to.includes('sales@example.com'))
})

test('order page: unknown token is 404 and hides internal data', async () => {
  assert.equal((await api('GET', '/api/orders/not-a-real-token-000000000000')).status, 404)
  const view = await api('GET', `/api/orders/${manualOrder.token}`)
  assert.equal(view.data.order.id, undefined)
  assert.equal(view.data.order.customer_id, undefined)
})

test('manual payment: UTR, staff marks paid once, stock and invoice follow', async () => {
  const utr = await api('POST', `/api/orders/${manualOrder.token}/utr`, { utr: 'UTR123456789' })
  assert.equal(utr.status, 200)
  const list = await admin('GET', '/api/admin/orders?status=pending_payment')
  const row = list.data.orders.find((o) => o.order_number === manualOrder.order_number)
  assert.equal(row.utr, 'UTR123456789')
  const paid = await admin('POST', `/api/admin/orders/${row.id}/status`, { status: 'paid' })
  assert.equal(paid.status, 200)
  assert.equal((await product('uhf-rfid-paper-labels')).stock_qty, 8)
  const again = await admin('POST', `/api/admin/orders/${row.id}/status`, { status: 'paid' })
  assert.equal(again.data.status, 'paid')
  assert.equal((await product('uhf-rfid-paper-labels')).stock_qty, 8)
  const view = (await api('GET', `/api/orders/${manualOrder.token}`)).data.order
  assert.match(view.invoice_number, /^PI\/\d\d-\d\d\/00001$/)
  assert.equal(view.payment_instructions, null)
  assert.ok(lastMail('paymentReceived'))
  manualOrder.id = row.id
})

test('staff runs the order from paid to delivered; bad jumps are refused', async () => {
  assert.equal((await admin('POST', `/api/admin/orders/${manualOrder.id}/status`, { status: 'delivered' })).status, 409)
  assert.equal((await admin('POST', `/api/admin/orders/${manualOrder.id}/ship`, { courier: '', awb: '' })).status, 422)
  const ship = await admin('POST', `/api/admin/orders/${manualOrder.id}/ship`, { courier: 'Delhivery', awb: 'AWB123', tracking_url: 'https://track.example/AWB123' })
  assert.equal(ship.status, 200)
  assert.ok(lastMail('shipped').text.includes('AWB123'))
  const done = await admin('POST', `/api/admin/orders/${manualOrder.id}/status`, { status: 'delivered' })
  assert.equal(done.status, 200)
  const view = (await api('GET', `/api/orders/${manualOrder.token}`)).data.order
  assert.equal(view.status, 'delivered')
  assert.ok(view.timeline.every((s) => s.done))
  assert.equal(view.shipment.awb, 'AWB123')
  assert.equal((await admin('POST', `/api/admin/orders/${manualOrder.id}/status`, { status: 'cancelled' })).status, 409)
})

test('refund puts stock back', async () => {
  const res = await admin('POST', `/api/admin/orders/${manualOrder.id}/status`, { status: 'refunded', note: 'Refunded in Razorpay dashboard' })
  assert.equal(res.status, 200)
  assert.equal((await product('uhf-rfid-paper-labels')).stock_qty, 10)
  assert.ok(lastMail('refunded'))
})

/* ------------------------------- Razorpay flow ------------------------------ */

const sign = (raw, secret = 'whsec_test') => createHmac('sha256', secret).update(raw).digest('hex')
const webhook = (event, { id = 'evt_1', secret } = {}) => {
  const raw = JSON.stringify(event)
  return api('POST', '/api/payments/razorpay-webhook', raw, { 'x-razorpay-signature': sign(raw, secret), 'x-razorpay-event-id': id })
}
const paymentEvent = (type, rzpOrderId, amount, paymentId = 'pay_1') => ({
  event: type,
  payload: { payment: { entity: { id: paymentId, order_id: rzpOrderId, amount, currency: 'INR', error_description: 'Card declined' } } },
})

let online
test('online order: created server-side, browser signature alone does not mark it paid', async () => {
  const res = await api('POST', '/api/checkout', order([{ id: reader.id, qty: 1 }], { payment_method: 'razorpay' }))
  assert.equal(res.status, 201)
  online = res.data
  assert.equal(online.razorpay.amount_paise, 5900000)
  assert.equal(online.razorpay.key_id, 'rzp_test_key')
  const badSig = await api('POST', '/api/payments/verify', { token: online.token, razorpay_order_id: online.razorpay.order_id, razorpay_payment_id: 'pay_1', razorpay_signature: 'forged' })
  assert.equal(badSig.status, 400)
  const goodSig = createHmac('sha256', 'rzp_test_secret').update(`${online.razorpay.order_id}|pay_1`).digest('hex')
  const ok = await api('POST', '/api/payments/verify', { token: online.token, razorpay_order_id: online.razorpay.order_id, razorpay_payment_id: 'pay_1', razorpay_signature: goodSig })
  assert.equal(ok.status, 200)
  assert.equal(ok.data.status, 'pending_payment')
})

test('webhook: bad signature is rejected and changes nothing', async () => {
  const res = await webhook(paymentEvent('payment.captured', online.razorpay.order_id, 5900000), { secret: 'wrong' })
  assert.equal(res.status, 400)
  assert.equal((await api('GET', `/api/orders/${online.token}`)).data.order.status, 'pending_payment')
})

test('webhook: failed payment emails a retry link, order stays open', async () => {
  const res = await webhook(paymentEvent('payment.failed', online.razorpay.order_id, 5900000, 'pay_0'), { id: 'evt_failed' })
  assert.equal(res.status, 200)
  assert.equal((await api('GET', `/api/orders/${online.token}`)).data.order.status, 'pending_payment')
  assert.ok(lastMail('paymentFailed'))
})

test('webhook: wrong amount is not accepted as payment', async () => {
  const res = await webhook(paymentEvent('payment.captured', online.razorpay.order_id, 100), { id: 'evt_short' })
  assert.equal(res.status, 200)
  assert.equal((await api('GET', `/api/orders/${online.token}`)).data.order.status, 'pending_payment')
})

test('webhook: captured payment marks the order paid, duplicates do nothing extra', async () => {
  const mailsBefore = outbox().length
  const first = await webhook(paymentEvent('payment.captured', online.razorpay.order_id, 5900000), { id: 'evt_cap' })
  assert.equal(first.status, 200)
  assert.equal((await api('GET', `/api/orders/${online.token}`)).data.order.status, 'paid')
  assert.equal((await product('handheld-uhf-rfid-reader')).stock_qty, 2)
  const mailsAfter = outbox().length
  assert.ok(mailsAfter > mailsBefore)

  const dup = await webhook(paymentEvent('payment.captured', online.razorpay.order_id, 5900000), { id: 'evt_cap' })
  assert.equal(dup.data.duplicate, true)
  // Same payment reported by a second event type (order.paid): still only paid once.
  const second = await webhook({ event: 'order.paid', payload: { payment: { entity: { id: 'pay_1', order_id: online.razorpay.order_id, amount: 5900000, currency: 'INR' } }, order: { entity: { id: online.razorpay.order_id, amount_paid: 5900000 } } } }, { id: 'evt_orderpaid' })
  assert.equal(second.status, 200)
  assert.equal((await product('handheld-uhf-rfid-reader')).stock_qty, 2)
  assert.equal(outbox().length, mailsAfter)
})

test('webhook: out-of-order "failed" after "captured" does not reopen the order', async () => {
  const mails = outbox().length
  const res = await webhook(paymentEvent('payment.failed', online.razorpay.order_id, 5900000, 'pay_0'), { id: 'evt_late_fail' })
  assert.equal(res.status, 200)
  assert.equal((await api('GET', `/api/orders/${online.token}`)).data.order.status, 'paid')
  assert.equal(outbox().length, mails)
})

test('webhook: unknown order is acknowledged and ignored', async () => {
  const res = await webhook(paymentEvent('payment.captured', 'order_UNKNOWN', 5900000), { id: 'evt_unknown' })
  assert.equal(res.status, 200)
  assert.ok(res.data.ignored)
})

test('failed online payment can switch to bank transfer without re-entering details', async () => {
  const res = await api('POST', '/api/checkout', order([{ id: reader.id, qty: 1 }], { payment_method: 'razorpay' }))
  const swap = await api('POST', `/api/orders/${res.data.token}/pay`, { payment_method: 'bank_transfer' })
  assert.equal(swap.status, 200)
  assert.equal(swap.data.order.payment_method, 'bank_transfer')
  assert.ok(swap.data.order.payment_instructions)
  const retry = await api('POST', `/api/orders/${res.data.token}/pay`, { payment_method: 'razorpay' })
  assert.ok(retry.data.razorpay.order_id)
})

/* ---------------------------------- Sign-in --------------------------------- */

test('email code sign-in: wrong code fails, right code works once, guest orders are attached', async () => {
  assert.equal((await api('POST', '/api/auth/request-code', { email: 'asha@example.com' })).status, 200)
  const code = lastMail('signInCode').subject.slice(0, 6)
  assert.equal((await api('POST', '/api/auth/verify-code', { email: 'asha@example.com', code: '000000' === code ? '111111' : '000000' })).status, 400)
  const ok = await api('POST', '/api/auth/verify-code', { email: 'asha@example.com', code })
  assert.equal(ok.status, 200)
  const cookie = ok.headers.getSetCookie()[0].split(';')[0]
  assert.match(ok.headers.getSetCookie()[0], /HttpOnly/)
  assert.equal((await api('POST', '/api/auth/verify-code', { email: 'asha@example.com', code })).status, 400)
  const acct = await api('GET', '/api/account', undefined, { Cookie: cookie })
  assert.equal(acct.data.signed_in, true)
  assert.ok(acct.data.orders.length >= 3)
  assert.ok(lastMail('accountCreated'))
  const addr = await api('POST', '/api/account/addresses', { name: 'Asha Rao', phone: '9876543210', ...shipping, is_default: true }, { Cookie: cookie })
  assert.equal(addr.status, 200)
  assert.equal((await api('GET', '/api/account', undefined, { Cookie: cookie })).data.addresses.length, 1)
  assert.equal((await api('GET', '/api/account')).data.signed_in, false)
})

test('staff code is only sent to staff, with the same public answer', async () => {
  const before = outbox().length
  assert.equal((await api('POST', '/api/auth/request-code', { email: 'stranger@example.com', purpose: 'staff' })).status, 200)
  assert.equal(outbox().length, before)
  assert.equal((await api('POST', '/api/auth/request-code', { email: 'owner@example.com', purpose: 'staff' })).status, 200)
  assert.equal(outbox().length, before + 1)
})

test('cross-site POSTs are refused', async () => {
  const res = await api('POST', '/api/auth/sign-out', { purpose: 'customer' }, { Origin: 'https://evil.example', Host: 'localhost' })
  assert.equal(res.status, 403)
})

/* ------------------------------------ CSV ----------------------------------- */

test('CSV: quotes, commas and new lines survive a round trip', () => {
  const rows = [{ sku: 'A-1', name: 'Tag, "large"', note: 'line one\nline two' }]
  assert.deepEqual(parseCsv(toCsv(['sku', 'name', 'note'], rows)), rows)
})

test('product CSV: export, edit, dry run and import; bad rows block the whole file', async () => {
  const csv = (await admin('GET', '/api/admin/products-export.csv')).data
  const rows = parseCsv(csv)
  assert.equal(rows.length, 19)
  const edited = rows.map((r) => (r.sku === 'PI-TAG-002' ? { ...r, price: '250.50', stock_qty: '40' } : r))
  edited.push({ ...rows[0], sku: 'PI-NEW-001', slug: 'new-test-product', name: 'New Test Product', price: '99', stock_qty: '5' })
  const out = toCsv(Object.keys(rows[0]), edited)
  const dry = await admin('POST', '/api/admin/products/import', { csv: out, dry_run: true })
  assert.deepEqual([dry.data.created, dry.data.updated], [1, 19])
  assert.equal((await product('on-metal-rfid-tags')).price_paise, null)
  assert.equal((await admin('POST', '/api/admin/products/import', { csv: out })).status, 200)
  assert.equal((await product('on-metal-rfid-tags')).price_paise, 25050)
  assert.equal((await product('new-test-product')).stock_qty, 5)
  const broken = toCsv(Object.keys(rows[0]), [{ ...rows[1], gst_percent: '99' }])
  const bad = await admin('POST', '/api/admin/products/import', { csv: broken })
  assert.equal(bad.status, 422)
  assert.equal(bad.data.problems[0].line, 2)
})

test('settings: validation and save; feeds list only orderable products', async () => {
  const current = (await admin('GET', '/api/admin/settings')).data.settings
  const bad = await admin('PUT', '/api/admin/settings', { ...current, upi_id: 'not a upi', shipping_flat_paise: -1 })
  assert.equal(bad.status, 422)
  const ok = await admin('PUT', '/api/admin/settings', { ...current, shipping_flat_paise: 9900, upi_id: 'prosper@hdfc' })
  assert.equal(ok.status, 200)
  assert.equal((await api('GET', '/api/shop/catalogue')).data.config.shipping_flat_paise, 9900)
  const feed = (await api('GET', '/api/feeds/merchant.xml')).data
  assert.ok(feed.includes('PI-TAG-001') && !feed.includes('PI-EDG-001'))
  assert.ok((await api('GET', '/api/sitemap-shop.xml')).data.includes('/p/ai-edge-box'))
  const dash = await admin('GET', '/api/admin/dashboard')
  assert.equal(dash.status, 200)
  assert.ok(dash.data.to_ship >= 1)
})

/* ------------------------------ Activity & customers ------------------------------ */

test('activity: shows sign-ins (with browser), failed sign-ins, accounts, orders, payments, shipping and emails', async () => {
  // a failed customer sign-in for a new email
  await api('POST', '/api/auth/request-code', { email: 'ravi@example.com' })
  await api('POST', '/api/auth/verify-code', { email: 'ravi@example.com', code: '999999' === lastMail('signInCode').subject.slice(0, 6) ? '888888' : '999999' })
  // a successful one from an Android phone
  await api('POST', '/api/auth/request-code', { email: 'ravi@example.com' })
  const code = lastMail('signInCode').subject.slice(0, 6)
  const ok = await api('POST', '/api/auth/verify-code', { email: 'ravi@example.com', code }, { 'User-Agent': 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/131.0 Mobile Safari/537.36' })
  assert.equal(ok.status, 200)

  const all = (await admin('GET', '/api/admin/activity?days=7')).data
  const kinds = new Set(all.items.map((i) => i.kind))
  for (const k of ['signin', 'signin_failed', 'account', 'order', 'payment', 'shipping', 'email']) assert.ok(kinds.has(k), `missing ${k}`)
  const signin = all.items.find((i) => i.kind === 'signin' && i.who === 'ravi@example.com')
  assert.equal(signin.detail, 'From Chrome on Android')
  assert.ok(all.items.every((a, i, arr) => i === 0 || arr[i - 1].at >= a.at), 'newest first')

  const signins = (await admin('GET', '/api/admin/activity?type=signins')).data
  assert.ok(signins.items.length > 0 && signins.items.every((i) => i.kind.startsWith('signin')))
  const search = (await admin('GET', `/api/admin/activity?q=${manualOrder.order_number}`)).data
  assert.ok(search.items.length > 0 && search.items.every((i) => i.order?.number === manualOrder.order_number))
  assert.equal((await api('GET', '/api/admin/activity')).status, 401)
})

test('customers: list with orders, spend and last sign-in; detail with orders and activity', async () => {
  const list = (await admin('GET', '/api/admin/customers')).data
  const asha = list.customers.find((c) => c.email === 'asha@example.com')
  assert.ok(asha.orders >= 3)
  assert.equal(asha.has_account, true)
  assert.ok(asha.last_sign_in_at)
  assert.ok(asha.spent_paise > 0)
  assert.ok(list.totals.customers >= 2)
  assert.ok((await admin('GET', '/api/admin/customers?filter=guests')).data.customers.every((c) => !c.has_account))
  assert.equal((await admin('GET', '/api/admin/customers?q=nobody-matches-this')).data.total, 0)

  const detail = (await admin('GET', `/api/admin/customers/${asha.id}`)).data
  assert.equal(detail.customer.email, 'asha@example.com')
  assert.equal(detail.orders.length, asha.orders)
  assert.ok(detail.activity.some((i) => i.kind === 'signin'))
  assert.ok(detail.activity.every((i) => !i.who || i.who === 'asha@example.com' || i.order))
  assert.equal((await admin('GET', '/api/admin/customers/not-a-real-id')).status, 404)
  assert.equal((await api('GET', '/api/admin/customers')).status, 401)
})
