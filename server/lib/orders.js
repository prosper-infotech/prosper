// Order rules: creating orders, confirming payment, status changes and what the
// public order page is allowed to see.
import { randomBytes } from 'node:crypto'
import { db, one, getSettings, addEvent } from './db.js'
import { HttpError } from './http.js'
import { sendEmail, templates, salesRecipients } from './email.js'
import { razorpayConfigured, razorpayKeyId } from './razorpay.js'
import { sendOrderStatusToCrm } from './crm.js'

export const STATUSES = ['pending_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
export const PAYMENT_METHODS = ['razorpay', 'bank_transfer', 'upi_manual']
const TRANSITIONS = {
  pending_payment: ['paid', 'cancelled'],
  paid: ['processing', 'shipped', 'cancelled', 'refunded'],
  processing: ['shipped', 'cancelled', 'refunded'],
  shipped: ['delivered', 'refunded'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
}
export const allowedNext = (status) => TRANSITIONS[status] || []

// India time, used for order and invoice numbering.
function istParts(date = new Date()) {
  const d = new Date(date.getTime() + 5.5 * 3600 * 1000)
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 }
}

export async function nextOrderNumber() {
  const n = await db().rpc('next_counter', { p_name: 'order' })
  return `PI-${istParts().year}-${String(n).padStart(6, '0')}`
}

// Sequential within an Indian financial year (April to March), e.g. PI/26-27/00042.
async function nextInvoiceNumber(settings) {
  const { year, month } = istParts()
  const start = month >= 4 ? year : year - 1
  const fy = `${String(start).slice(2)}-${String(start + 1).slice(2)}`
  const n = await db().rpc('next_counter', { p_name: `invoice_${fy}` })
  return `${settings.invoice_prefix || ''}${fy}/${String(n).padStart(5, '0')}`
}

export const newPublicToken = () => randomBytes(24).toString('base64url')

export const orderItems = (orderId) => db().select('order_items', { where: { order_id: orderId }, order: 'created_at.asc' })

async function notify(order, builder, { toSales = false, extra } = {}) {
  const [items, settings] = await Promise.all([orderItems(order.id), getSettings()])
  const base = order.site_url || process.env.SITE_URL || 'https://shop.prosperinfotech.com'
  const mail = templates[builder](order, items, settings, base, extra)
  const to = toSales ? salesRecipients() : order.contact.email
  return sendEmail({ ...mail, to, replyTo: toSales ? order.contact.email : settings.support_email, orderId: order.id, type: builder })
}
export { notify }

// Marks an order paid exactly once. The conditional update means two webhooks
// arriving together cannot both win, so stock and emails happen a single time.
export async function markPaid(order, { by = 'system', note = '' } = {}) {
  const settings = await getSettings()
  const updated = await db().update(
    'orders',
    { id: order.id, status: 'pending_payment' },
    { status: 'paid', paid_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  )
  if (!updated.length) return null
  let paid = updated[0]

  const items = await orderItems(paid.id)
  await db().rpc('adjust_stock', { p_items: items.map((i) => ({ product_id: i.product_id, qty: i.qty })), p_sign: -1 })
  const invoiceNumber = await nextInvoiceNumber(settings)
  ;[paid] = await db().update('orders', { id: paid.id }, { stock_deducted: true, invoice_number: invoiceNumber, invoice_date: new Date().toISOString() })
  await addEvent(paid.id, 'paid', `Payment confirmed${note ? `: ${note}` : ''}. Invoice ${invoiceNumber}.`, by)

  await Promise.allSettled([notify(paid, 'paymentReceived'), notify(paid, 'salesPaid', { toSales: true }), lowStockAlert(items, settings, paid), sendOrderStatusToCrm(paid)])
  return paid
}

async function lowStockAlert(items, settings, order) {
  const ids = items.map((i) => i.product_id).filter(Boolean)
  if (!ids.length || !salesRecipients().length) return
  const products = await db().select('products', { where: { id: ids } })
  const low = products.filter((p) => p.stock_qty <= (settings.low_stock_threshold ?? 5))
  if (!low.length) return
  const base = order.site_url || process.env.SITE_URL || 'https://shop.prosperinfotech.com'
  await sendEmail({ ...templates.lowStock(low, settings, base), to: salesRecipients(), type: 'lowStock' })
}

export async function changeStatus(order, next, { by = 'staff', note = '' } = {}) {
  if (!STATUSES.includes(next)) throw new HttpError(400, 'Unknown status.')
  if (next === order.status) return order
  if (!allowedNext(order.status).includes(next)) {
    throw new HttpError(409, `An order that is "${order.status}" cannot be changed to "${next}".`)
  }
  if (next === 'paid') {
    const paid = await markPaid(order, { by, note: note || 'marked as paid by staff' })
    if (!paid) throw new HttpError(409, 'This order was already updated. Refresh and try again.')
    return paid
  }
  const patch = { status: next, updated_at: new Date().toISOString() }
  const updated = await db().update('orders', { id: order.id, status: order.status }, patch)
  if (!updated.length) throw new HttpError(409, 'This order was already updated. Refresh and try again.')
  let result = updated[0]

  if ((next === 'cancelled' || next === 'refunded') && result.stock_deducted) {
    const items = await orderItems(result.id)
    await db().rpc('adjust_stock', { p_items: items.map((i) => ({ product_id: i.product_id, qty: i.qty })), p_sign: 1 })
    ;[result] = await db().update('orders', { id: result.id }, { stock_deducted: false })
  }
  if (next === 'delivered') {
    await db().update('shipments', { order_id: result.id }, { delivered_at: new Date().toISOString() })
  }
  await addEvent(result.id, next, note || `Status changed to ${next}.`, by)
  const mail = { delivered: 'delivered', cancelled: 'cancelled', refunded: 'refunded' }[next]
  if (mail) await notify(result, mail, { extra: note })
  await sendOrderStatusToCrm(result)
  return result
}

export async function shipOrder(order, { courier, awb, tracking_url, by = 'staff', provider_shipment_id = null }) {
  if (!['paid', 'processing', 'shipped'].includes(order.status)) {
    throw new HttpError(409, 'Only paid orders can be shipped.')
  }
  const existing = await one('shipments', { order_id: order.id })
  const data = { courier, awb, tracking_url: tracking_url || null, provider_shipment_id }
  const shipment = existing
    ? (await db().update('shipments', { id: existing.id }, data))[0]
    : await db().insert('shipments', { order_id: order.id, ...data, shipped_at: new Date().toISOString(), delivered_at: null })
  let result = order
  if (order.status !== 'shipped') {
    const updated = await db().update('orders', { id: order.id, status: order.status }, { status: 'shipped', updated_at: new Date().toISOString() })
    if (!updated.length) throw new HttpError(409, 'This order was already updated. Refresh and try again.')
    result = updated[0]
  }
  await addEvent(order.id, 'shipped', `${existing ? 'Tracking updated' : 'Shipped'} with ${courier}${awb ? `, tracking ${awb}` : ''}.`, by)
  await notify(result, 'shipped', { extra: shipment })
  if (order.status !== 'shipped') await sendOrderStatusToCrm(result)
  return { order: result, shipment }
}

const TIMELINE = ['placed', 'paid', 'processing', 'shipped', 'delivered']
const RANK = { pending_payment: 0, paid: 1, processing: 2, shipped: 3, delivered: 4 }

// What the customer may see on /order/:token. No internal ids, notes or raw payment data.
export async function publicOrder(order) {
  const [items, shipment, events, settings] = await Promise.all([
    orderItems(order.id),
    one('shipments', { order_id: order.id }),
    db().select('order_events', { where: { order_id: order.id, type: ['placed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] }, order: 'created_at.asc' }),
    getSettings(),
  ])
  const when = Object.fromEntries(events.map((e) => [e.type, e.created_at]))
  const closed = ['cancelled', 'refunded'].includes(order.status)
  const manual = order.payment_method !== 'razorpay'
  const direct = settings.direct_orders !== false && order.payment_method !== 'razorpay'
  return {
    order_number: order.order_number,
    token: order.public_token,
    status: order.status,
    payment_method: order.payment_method,
    created_at: order.created_at,
    paid_at: order.paid_at || null,
    contact: order.contact,
    gstin: order.gstin || '',
    notes: order.notes || '',
    utr: order.utr || '',
    shipping_address: order.shipping_address,
    billing_address: order.billing_address,
    subtotal_paise: order.subtotal_paise,
    shipping_paise: order.shipping_paise,
    gst_paise: order.gst_paise,
    total_paise: order.total_paise,
    invoice_number: order.invoice_number || null,
    invoice_date: order.invoice_date || null,
    items: items.map((i) => ({ sku: i.sku, name: i.name, slug: i.slug, image: i.image, hsn_code: i.hsn_code, qty: i.qty, unit_price_paise: i.unit_price_paise, gst_percent: Number(i.gst_percent), line_total_paise: i.line_total_paise })),
    shipment: shipment ? { courier: shipment.courier, awb: shipment.awb, tracking_url: shipment.tracking_url, shipped_at: shipment.shipped_at, delivered_at: shipment.delivered_at } : null,
    timeline: TIMELINE.map((step, i) => ({
      step,
      done: !closed ? (step === 'placed' ? true : RANK[order.status] >= i) : Boolean(when[step]) || step === 'placed',
      at: step === 'placed' ? order.created_at : when[step] || null,
    })),
    closed_at: closed ? when[order.status] || order.updated_at : null,
    // Direct orders: the sales team calls about payment, so no payment details are shown.
    direct: direct && order.status === 'pending_payment',
    payment_instructions:
      order.status === 'pending_payment' && manual && !direct ? { bank: settings.bank, upi_id: settings.upi_id, reference: order.order_number } : null,
    can_pay_online: order.status === 'pending_payment' && !direct && razorpayConfigured(),
    can_pay_upi: order.status === 'pending_payment' && !direct && Boolean(settings.upi_id),
    can_pay_bank: order.status === 'pending_payment' && !direct && Boolean(settings.bank?.account_number && settings.bank?.ifsc),
    razorpay_key_id: order.status === 'pending_payment' && !direct ? razorpayKeyId() : null,
    seller: settings.seller,
    support: { email: settings.support_email, phone: settings.support_phone, whatsapp: settings.whatsapp_number },
  }
}
