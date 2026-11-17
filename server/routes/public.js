// Customer-facing API: catalogue, checkout, order page, payments, sign-in, account, feeds.
import { createHash } from 'node:crypto'
import { db, one, getSettings, addEvent, ConflictError } from '../lib/db.js'
import { HttpError, json, text, readJson, rateLimit, siteUrl, str, esc } from '../lib/http.js'
import { priceCart, isOrderable, formatINR } from '../../shared/pricing.js'
import { validateAddress, validateContact, EMAIL_RE } from '../../shared/india.js'
import { PAYMENT_METHODS, nextOrderNumber, newPublicToken, publicOrder, markPaid, changeStatus, notify, orderItems, shipOrder } from '../lib/orders.js'
import { razorpayConfigured, razorpayKeyId, createRazorpayOrder, verifyCheckoutSignature, verifyWebhookSignature } from '../lib/razorpay.js'
import { forwardOrderLead } from '../lib/crm.js'
import { sendEmail, templates } from '../lib/email.js'
import { createLoginCode, checkLoginCode, describeDevice, createSessionToken, sessionCookie, sessionFrom, requireCustomer, findStaff } from '../lib/auth.js'

const publicProduct = (p, categories) => ({
  id: p.id,
  sku: p.sku,
  slug: p.slug,
  name: p.name,
  brand: p.brand,
  category: categories.find((c) => c.id === p.category_id)?.slug || null,
  short_description: p.short_description,
  long_description: p.long_description,
  specs: p.specs || [],
  images: p.images || [],
  datasheet_url: p.datasheet_url,
  price_paise: p.quote_only ? null : p.price_paise,
  mrp_paise: p.quote_only ? null : p.mrp_paise,
  gst_percent: Number(p.gst_percent),
  hsn_code: p.hsn_code,
  stock_qty: p.stock_qty,
  min_order_qty: p.min_order_qty,
  is_active: p.is_active,
  is_featured: p.is_featured,
  quote_only: p.quote_only,
  seo_title: p.seo_title,
  seo_description: p.seo_description,
  updated_at: p.updated_at,
})

const bankReady = (s) => Boolean(s.bank?.account_number && s.bank?.ifsc)

// A payment method can only be chosen when we can actually take money that way.
function assertMethodAvailable(method, settings) {
  if (!PAYMENT_METHODS.includes(method)) throw new HttpError(400, 'Choose a payment method.')
  if (method === 'razorpay' && !razorpayConfigured()) throw new HttpError(400, 'Online payment is not available right now. Please choose another way to pay.')
  if (method === 'bank_transfer' && !bankReady(settings)) throw new HttpError(400, 'Bank transfer is not available right now. Please choose another way to pay.')
  if (method === 'upi_manual' && !settings.upi_id) throw new HttpError(400, 'UPI payment is not available right now. Please choose another way to pay.')
}

const publicConfig = (s) => ({
  shipping_flat_paise: s.shipping_flat_paise,
  free_shipping_threshold_paise: s.free_shipping_threshold_paise,
  shipping_gst_percent: s.shipping_gst_percent,
  delivery_days_min: s.delivery_days_min,
  delivery_days_max: s.delivery_days_max,
  support_email: s.support_email,
  support_phone: s.support_phone,
  whatsapp_number: s.whatsapp_number,
  online_payment: razorpayConfigured(),
  bank_payment: bankReady(s),
  upi_payment: Boolean(s.upi_id),
})

async function loadCatalogue() {
  const [categories, products, settings] = await Promise.all([
    db().select('categories', { order: 'sort_order.asc' }),
    db().select('products', { where: { is_active: true }, order: 'name.asc' }),
    getSettings(),
  ])
  return { categories, products, settings }
}

export async function catalogue() {
  const { categories, products, settings } = await loadCatalogue()
  return json(
    {
      categories: categories.map(({ id: _id, ...c }) => c),
      products: products.map((p) => publicProduct(p, categories)),
      config: publicConfig(settings),
    },
    200,
    { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=120', 'X-Robots-Tag': 'noindex' }
  )
}

/* --------------------------------- Checkout --------------------------------- */

async function upsertCustomer(contact) {
  const profile = { name: contact.name, phone: contact.phone, company: contact.company || null, gstin: contact.gstin || null }
  const existing = await one('customers', { email: contact.email })
  if (existing) return (await db().update('customers', { id: existing.id }, profile))[0]
  try {
    return await db().insert('customers', { email: contact.email, ...profile })
  } catch (err) {
    if (err instanceof ConflictError) return one('customers', { email: contact.email })
    throw err
  }
}

async function startRazorpay(order) {
  const rzp = await createRazorpayOrder({ amountPaise: order.total_paise, receipt: order.order_number, notes: { order_number: order.order_number } })
  await db().insert('payments', {
    order_id: order.id,
    provider: 'razorpay',
    provider_order_id: rzp.id,
    provider_payment_id: null,
    provider_event_id: null,
    amount_paise: order.total_paise,
    status: 'created',
    raw_event: null,
  })
  return {
    key_id: razorpayKeyId(),
    order_id: rzp.id,
    amount_paise: order.total_paise,
    name: 'Prosper Infotech',
    description: `Order ${order.order_number}`,
    prefill: { name: order.contact.name, email: order.contact.email, contact: `+91${order.contact.phone}` },
  }
}

export async function checkout(request) {
  rateLimit(request, 'checkout', 10, 10 * 60 * 1000)
  const body = await readJson(request)
  // Honeypot: real people never fill the hidden "website" field.
  if (str(body.website)) throw new HttpError(400, 'Your order could not be placed. Please call us.')
  if (body.accept_terms !== true) throw new HttpError(400, 'Please accept the terms of sale.', { fields: { accept_terms: 'Please accept the terms of sale' } })

  const method = str(body.payment_method, 30)
  assertMethodAvailable(method, await getSettings())

  const contact = validateContact(body.contact)
  const shipping = validateAddress({ ...body.shipping, name: body.shipping?.name || body.contact?.name, phone: body.shipping?.phone || body.contact?.phone })
  const billing = body.billing_same === false ? validateAddress(body.billing) : shipping
  const fields = {}
  for (const [k, v] of Object.entries(contact.errors)) fields[`contact.${k}`] = v
  for (const [k, v] of Object.entries(shipping.errors)) fields[`shipping.${k}`] = v
  if (body.billing_same === false) for (const [k, v] of Object.entries(billing.errors)) fields[`billing.${k}`] = v
  if (Object.keys(fields).length) throw new HttpError(422, 'Please check the highlighted fields.', { fields })

  const requested = Array.isArray(body.items) ? body.items.slice(0, 50) : []
  if (!requested.length) throw new HttpError(400, 'Your cart is empty.')
  const ids = [...new Set(requested.map((i) => str(i?.id, 60)).filter(Boolean))]
  const [products, settings] = await Promise.all([db().select('products', { where: { id: ids } }), getSettings()])

  // The server prices the cart from the database. Anything the browser says about prices is ignored.
  const merged = new Map()
  for (const item of requested) {
    const id = str(item?.id, 60)
    const qty = Math.floor(Number(item?.qty))
    if (!id || !Number.isFinite(qty) || qty < 1 || qty > 100000) throw new HttpError(400, 'Your cart has an invalid quantity.')
    merged.set(id, (merged.get(id) || 0) + qty)
  }
  const priced = priceCart([...merged].map(([id, qty]) => ({ product: products.find((p) => p.id === id) || null, qty })), settings)
  if (priced.problems.length || !priced.items.length) {
    throw new HttpError(409, priced.problems[0]?.message || 'Your cart has changed. Please review it.', { problems: priced.problems, code: 'cart_changed' })
  }
  if (body.expected_total_paise !== undefined && Number(body.expected_total_paise) !== priced.total_paise) {
    throw new HttpError(409, 'Prices or shipping have changed since you opened this page. Please review your order.', { code: 'total_changed', total_paise: priced.total_paise })
  }

  const customer = await upsertCustomer(contact.value)
  const order = await db().insert('orders', {
    order_number: await nextOrderNumber(),
    public_token: newPublicToken(),
    customer_id: customer.id,
    status: 'pending_payment',
    payment_method: method,
    subtotal_paise: priced.subtotal_paise,
    gst_paise: priced.gst_paise,
    shipping_paise: priced.shipping_paise,
    total_paise: priced.total_paise,
    contact: { name: contact.value.name, email: contact.value.email, phone: contact.value.phone, company: contact.value.company },
    billing_address: billing.value,
    shipping_address: shipping.value,
    gstin: contact.value.gstin || null,
    notes: str(body.notes, 1000) || null,
    utr: null,
    invoice_number: null,
    invoice_date: null,
    paid_at: null,
    stock_deducted: false,
    site_url: siteUrl(request),
  })
  try {
    await db().insert('order_items', priced.items.map((i, n) => ({
      order_id: order.id,
      product_id: i.product_id,
      sku: i.sku,
      slug: i.slug,
      name: i.name,
      image: i.image,
      hsn_code: i.hsn_code,
      unit_price_paise: i.unit_price_paise,
      gst_percent: i.gst_percent,
      qty: i.qty,
      line_total_paise: i.line_total_paise,
      created_at: new Date(Date.now() + n).toISOString(),
    })))
  } catch (err) {
    await db().remove('orders', { id: order.id })
    throw err
  }
  await addEvent(order.id, 'placed', `Order placed (${method}).`, 'customer')

  let razorpay = null
  let paymentError = null
  if (method === 'razorpay') {
    try {
      razorpay = await startRazorpay(order)
    } catch (err) {
      console.error('[shop] razorpay order failed', err)
      paymentError = 'We could not start the online payment. Your order is saved. You can try again from the order page.'
    }
  }

  const items = await orderItems(order.id)
  await Promise.allSettled([
    notify(order, 'orderReceived'),
    notify(order, 'salesNewOrder', { toSales: true }),
    forwardOrderLead(order, items).then((r) => (r.skipped ? null : addEvent(order.id, 'crm', `Lead copy sent (${r.sent} ok, ${r.failed} failed).`))),
  ])

  return json({ token: order.public_token, order_number: order.order_number, total_paise: order.total_paise, razorpay, payment_error: paymentError }, 201)
}

/* -------------------------------- Order page -------------------------------- */

async function orderByToken(token) {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token || '')) throw new HttpError(404, 'Order not found.')
  const order = await one('orders', { public_token: token })
  if (!order) throw new HttpError(404, 'Order not found.')
  return order
}

export async function getOrder(request, { token }) {
  rateLimit(request, 'order-view', 120, 60 * 1000)
  return json({ order: await publicOrder(await orderByToken(token)) })
}

export async function saveUtr(request, { token }) {
  rateLimit(request, 'order-utr', 10, 10 * 60 * 1000)
  const order = await orderByToken(token)
  const utr = str((await readJson(request)).utr, 40).replace(/[^A-Za-z0-9]/g, '')
  if (utr.length < 6) throw new HttpError(422, 'Enter the UTR or transaction reference from your bank or UPI app.')
  if (order.status !== 'pending_payment') throw new HttpError(409, 'This order is no longer waiting for payment.')
  const [updated] = await db().update('orders', { id: order.id }, { utr })
  await addEvent(order.id, 'utr', `Customer entered payment reference ${utr}.`, 'customer')
  return json({ order: await publicOrder(updated) })
}

// Retry an online payment, or switch between online and bank transfer / UPI, without re-entering details.
export async function payOrder(request, { token }) {
  rateLimit(request, 'order-pay', 15, 10 * 60 * 1000)
  const order = await orderByToken(token)
  const method = str((await readJson(request)).payment_method, 30)
  assertMethodAvailable(method, await getSettings())
  if (order.status !== 'pending_payment') throw new HttpError(409, 'This order is no longer waiting for payment.')

  let current = order
  if (order.payment_method !== method) {
    ;[current] = await db().update('orders', { id: order.id, status: 'pending_payment' }, { payment_method: method, updated_at: new Date().toISOString() })
    if (!current) throw new HttpError(409, 'This order is no longer waiting for payment.')
    await addEvent(order.id, 'payment_method', `Payment method changed to ${method}.`, 'customer')
    if (method !== 'razorpay') await notify(current, 'orderReceived')
  }
  const razorpay = method === 'razorpay' ? await startRazorpay(current) : null
  return json({ order: await publicOrder(current), razorpay })
}

/* --------------------------------- Payments --------------------------------- */

// Called by the browser right after Razorpay Checkout closes. It only checks the
// signature and records it. The order becomes "paid" when the webhook arrives.
export async function verifyPayment(request) {
  rateLimit(request, 'verify', 30, 10 * 60 * 1000)
  const body = await readJson(request)
  const order = await orderByToken(str(body.token, 80))
  const rzpOrderId = str(body.razorpay_order_id, 60)
  const paymentId = str(body.razorpay_payment_id, 60)
  const started = await one('payments', { order_id: order.id, provider: 'razorpay', provider_order_id: rzpOrderId, status: 'created' })
  if (!started || !verifyCheckoutSignature({ orderId: rzpOrderId, paymentId, signature: str(body.razorpay_signature, 200) })) {
    throw new HttpError(400, 'We could not verify this payment. If money was taken, it will be matched automatically or refunded.')
  }
  if (!started.provider_payment_id) {
    await db().update('payments', { id: started.id }, { provider_payment_id: paymentId })
    await addEvent(order.id, 'payment_authorized', `Payment ${paymentId} verified in the browser. Waiting for Razorpay confirmation.`, 'customer')
  }
  const fresh = await one('orders', { id: order.id })
  return json({ verified: true, status: fresh.status })
}

export async function razorpayWebhook(request) {
  const raw = await request.text()
  if (!verifyWebhookSignature(raw, request.headers.get('x-razorpay-signature'))) {
    throw new HttpError(400, 'Invalid signature.')
  }
  let event
  try {
    event = JSON.parse(raw)
  } catch {
    throw new HttpError(400, 'Invalid body.')
  }
  const eventId = request.headers.get('x-razorpay-event-id') || createHash('sha256').update(raw).digest('hex')
  const payment = event?.payload?.payment?.entity || null
  const refund = event?.payload?.refund?.entity || null
  const rzpOrderId = payment?.order_id || event?.payload?.order?.entity?.id || null
  const started = rzpOrderId ? await one('payments', { provider: 'razorpay', provider_order_id: rzpOrderId, status: 'created' }) : null
  const order = started ? await one('orders', { id: started.order_id }) : null

  // Idempotency: the event id is unique in the payments table. A repeat delivery stops here.
  let row
  try {
    row = await db().insert('payments', {
      order_id: order?.id || null,
      provider: 'razorpay',
      provider_order_id: rzpOrderId,
      provider_payment_id: payment?.id || refund?.payment_id || null,
      provider_event_id: eventId,
      amount_paise: payment?.amount ?? refund?.amount ?? null,
      status: str(event.event, 60),
      raw_event: event,
    })
  } catch (err) {
    if (err instanceof ConflictError) return json({ ok: true, duplicate: true })
    throw err
  }
  if (!order) return json({ ok: true, ignored: 'no matching order' })

  try {
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const amount = payment?.amount ?? event?.payload?.order?.entity?.amount_paid
      if (amount !== order.total_paise || (payment?.currency || 'INR') !== 'INR') {
        await addEvent(order.id, 'payment_mismatch', `Razorpay reported ${formatINR(amount)} but the order total is ${formatINR(order.total_paise)}. Not marked as paid. Check in the Razorpay dashboard.`)
      } else if (order.status === 'pending_payment') {
        await markPaid(order, { by: 'razorpay', note: `Razorpay payment ${payment?.id || ''}`.trim() })
      } else if (['cancelled', 'refunded'].includes(order.status)) {
        await addEvent(order.id, 'payment_after_close', `Payment ${payment?.id || ''} arrived after the order was ${order.status}. Refund it in the Razorpay dashboard.`)
      }
    } else if (event.event === 'payment.failed') {
      if (order.status === 'pending_payment') {
        await addEvent(order.id, 'payment_failed', `Payment failed: ${str(payment?.error_description, 200) || 'no reason given'}.`, 'razorpay')
        await notify(order, 'paymentFailed')
      }
    } else if (event.event === 'refund.processed') {
      if (refund?.amount === order.total_paise && ['paid', 'processing', 'shipped', 'delivered'].includes(order.status)) {
        await changeStatus(order, 'refunded', { by: 'razorpay', note: `Refund ${refund.id} processed by Razorpay.` })
      } else {
        await addEvent(order.id, 'refund_note', `Razorpay refund ${refund?.id || ''} of ${formatINR(refund?.amount)} processed.`, 'razorpay')
      }
    }
  } catch (err) {
    // Let Razorpay retry: forget this delivery so the retry is processed, not treated as a duplicate.
    await db().remove('payments', { id: row.id }).catch(() => {})
    throw err
  }
  return json({ ok: true })
}

// Shiprocket tracking updates (later phase). Protected by a shared token header.
export async function shiprocketWebhook(request) {
  const expected = process.env.SHIPROCKET_WEBHOOK_TOKEN
  if (!expected || request.headers.get('x-api-key') !== expected) throw new HttpError(401, 'Not allowed.')
  const body = await readJson(request)
  const awb = str(body.awb, 60)
  const status = str(body.current_status, 60).toLowerCase()
  const shipment = awb ? await one('shipments', { awb }) : null
  const order = shipment ? await one('orders', { id: shipment.order_id }) : null
  if (!order) return json({ ok: true, ignored: true })
  if (status === 'delivered' && order.status === 'shipped') await changeStatus(order, 'delivered', { by: 'shiprocket', note: 'Delivered (courier update).' })
  else if (['shipped', 'in transit', 'picked up'].includes(status) && ['paid', 'processing'].includes(order.status)) {
    await shipOrder(order, { courier: shipment.courier, awb, tracking_url: shipment.tracking_url, by: 'shiprocket' })
  } else await addEvent(order.id, 'courier_update', `Courier status: ${status || 'unknown'}.`, 'shiprocket')
  return json({ ok: true })
}

/* ---------------------------------- Sign-in --------------------------------- */

const purposeOf = (v) => (v === 'staff' ? 'staff' : 'customer')

export async function requestCode(request) {
  rateLimit(request, 'code', 8, 15 * 60 * 1000)
  const body = await readJson(request)
  const email = str(body.email, 150).toLowerCase()
  const purpose = purposeOf(body.purpose)
  if (!EMAIL_RE.test(email)) throw new HttpError(422, 'Enter a valid email address.')
  const code = await createLoginCode(email, purpose)
  // Same answer whether or not the email is a staff account, so it cannot be used to find staff emails.
  if (code) await sendEmail({ ...templates.signInCode(code, purpose, await getSettings()), to: email, type: 'signInCode' })
  return json({ ok: true })
}

export async function verifyCode(request) {
  rateLimit(request, 'code-verify', 20, 15 * 60 * 1000)
  const body = await readJson(request)
  const email = str(body.email, 150).toLowerCase()
  const purpose = purposeOf(body.purpose)
  if (!EMAIL_RE.test(email)) throw new HttpError(422, 'Enter a valid email address.')
  await checkLoginCode(email, purpose, str(body.code, 6), describeDevice(request.headers.get('user-agent')))
  if (purpose === 'staff') {
    const staff = await findStaff(email)
    if (!staff) throw new HttpError(403, 'This account does not have staff access.')
  } else {
    const existing = await one('customers', { email })
    if (!existing) {
      await db().insert('customers', { email, name: '', phone: null, company: null, gstin: null }).catch(() => {})
      await sendEmail({ ...templates.accountCreated(email, await getSettings(), siteUrl(request)), to: email, type: 'accountCreated' })
    } else if (!existing.account_created_at) {
      await sendEmail({ ...templates.accountCreated(email, await getSettings(), siteUrl(request)), to: email, type: 'accountCreated' })
    }
    await db().update('customers', { email, account_created_at: null }, { account_created_at: new Date().toISOString() })
  }
  return json({ ok: true, email }, 200, { 'Set-Cookie': sessionCookie(purpose, createSessionToken(email, purpose)) })
}

export async function signOut(request) {
  const body = await readJson(request)
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(purposeOf(body.purpose), null) })
}

/* ---------------------------------- Account --------------------------------- */

export async function account(request) {
  const session = sessionFrom(request, 'customer')
  if (!session) return json({ signed_in: false })
  const customer = await one('customers', { email: session.email })
  if (!customer) return json({ signed_in: false }, 200, { 'Set-Cookie': sessionCookie('customer', null) })
  // Orders are linked by email, so guest orders placed earlier with this email show up here too.
  const [orders, addresses] = await Promise.all([
    db().select('orders', { where: { customer_id: customer.id }, order: 'created_at.desc', limit: 100 }),
    db().select('addresses', { where: { customer_id: customer.id }, order: 'created_at.desc' }),
  ])
  const items = orders.length ? await db().select('order_items', { where: { order_id: orders.map((o) => o.id) } }) : []
  return json({
    signed_in: true,
    customer: { email: customer.email, name: customer.name || '', phone: customer.phone || '', company: customer.company || '', gstin: customer.gstin || '' },
    addresses: addresses.map(({ customer_id: _c, ...a }) => a),
    orders: orders.map((o) => ({
      order_number: o.order_number,
      token: o.public_token,
      status: o.status,
      created_at: o.created_at,
      total_paise: o.total_paise,
      invoice_number: o.invoice_number,
      items: items.filter((i) => i.order_id === o.id).map((i) => ({ product_id: i.product_id, name: i.name, qty: i.qty, image: i.image })),
    })),
  })
}

async function currentCustomer(request) {
  const session = await requireCustomer(request)
  const customer = await one('customers', { email: session.email })
  if (!customer) throw new HttpError(401, 'Please sign in.')
  return customer
}

export async function saveProfile(request) {
  const customer = await currentCustomer(request)
  const body = await readJson(request)
  const { value, errors } = validateContact({ ...body, email: customer.email })
  if (Object.keys(errors).length) throw new HttpError(422, 'Please check the highlighted fields.', { fields: errors })
  await db().update('customers', { id: customer.id }, { name: value.name, phone: value.phone, company: value.company || null, gstin: value.gstin || null })
  return json({ ok: true })
}

export async function saveAddress(request, { id }) {
  const customer = await currentCustomer(request)
  const body = await readJson(request)
  const { value, errors } = validateAddress(body)
  if (Object.keys(errors).length) throw new HttpError(422, 'Please check the highlighted fields.', { fields: errors })
  const row = { ...value, label: str(body.label, 40) || null, is_default: body.is_default === true }
  if (row.is_default) await db().update('addresses', { customer_id: customer.id, is_default: true }, { is_default: false })
  if (id) {
    const updated = await db().update('addresses', { id, customer_id: customer.id }, row)
    if (!updated.length) throw new HttpError(404, 'Address not found.')
  } else {
    const count = (await db().select('addresses', { where: { customer_id: customer.id } })).length
    if (count >= 20) throw new HttpError(409, 'You can save up to 20 addresses.')
    await db().insert('addresses', { customer_id: customer.id, ...row })
  }
  return json({ ok: true })
}

export async function deleteAddress(request, { id }) {
  const customer = await currentCustomer(request)
  await db().remove('addresses', { id, customer_id: customer.id })
  return json({ ok: true })
}

// Account deletion (DPDP Act): removes the profile and saved addresses. Order
// and invoice records are kept because tax law requires them.
export async function deleteAccount(request) {
  const customer = await currentCustomer(request)
  await db().remove('addresses', { customer_id: customer.id })
  await db().update('orders', { customer_id: customer.id }, { customer_id: null })
  await db().remove('customers', { id: customer.id })
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie('customer', null) })
}

/* ----------------------------------- Feeds ---------------------------------- */

const SITE = (process.env.SITE_URL || 'https://shop.prosperinfotech.com').replace(/\/+$/, '')

export async function merchantFeed() {
  const { categories, products } = await loadCatalogue()
  const items = products.filter(isOrderable).map((p) => {
    const image = p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : SITE + p.images[0]) : ''
    return `<item><g:id>${esc(p.sku)}</g:id><g:title>${esc(p.name)}</g:title><g:description>${esc(p.short_description || p.name)}</g:description><g:link>${SITE}/p/${esc(p.slug)}</g:link>${image ? `<g:image_link>${esc(image)}</g:image_link>` : ''}<g:availability>in_stock</g:availability><g:price>${(p.price_paise / 100).toFixed(2)} INR</g:price><g:brand>${esc(p.brand || 'Prosper Infotech')}</g:brand><g:condition>new</g:condition><g:mpn>${esc(p.sku)}</g:mpn><g:product_type>${esc(categories.find((c) => c.id === p.category_id)?.name || '')}</g:product_type></item>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>Prosper Infotech Shop</title><link>${SITE}/</link><description>RFID and barcode hardware</description>${items.join('')}</channel></rss>`
  return text(xml, 'application/xml; charset=utf-8', 200, { 'Cache-Control': 'public, max-age=0, s-maxage=3600' })
}

export async function shopSitemap() {
  const { categories, products } = await loadCatalogue()
  const url = (loc, lastmod) => `<url><loc>${SITE}${loc}</loc>${lastmod ? `<lastmod>${String(lastmod).slice(0, 10)}</lastmod>` : ''}</url>`
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url('/')}${categories.map((c) => url(`/c/${c.slug}`)).join('')}${products.map((p) => url(`/p/${p.slug}`, p.updated_at)).join('')}</urlset>`
  return text(xml, 'application/xml; charset=utf-8', 200, { 'Cache-Control': 'public, max-age=0, s-maxage=3600' })
}
