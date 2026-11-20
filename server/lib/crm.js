// Copies each order to Prosper CRM (leads) and Zoho as a lead. Never blocks or
// fails an order: every call is wrapped and time-limited. Only runs on the live
// site (or when SHOP_FORWARD_LEADS=true) so test orders do not create real leads.
import { formatINR } from '../../shared/pricing.js'

const ZOHO_URL = 'https://crm.zoho.in/crm/WebToLeadForm'
// Public form identifiers from Zoho's embed code (same as src/components/forms/zoho.js). Not secrets.
const ZOHO_FORM = {
  xnQsjsdp: '6d34d6f3dbb26a825e4e0aa15eae57a5eca24fefbc7ec7d91ef2013f432ec274',
  xmIwtLD: 'a79bf9311e53e15493c6135e9f8fe348fc0b57b0b2306899c04a7f1ca6b0c4feed14f8e60f308b86223d4deb9e0d097e',
  actionType: 'TGVhZHM=',
  returnURL: 'null',
}

export const leadForwardingOn = () =>
  process.env.SHOP_FORWARD_LEADS === 'true' ||
  (process.env.VERCEL_ENV === 'production' && process.env.SHOP_FORWARD_LEADS !== 'false')

const addressText = (a) => (a ? [a.name, a.line1, a.line2, `${a.city}, ${a.state} ${a.pincode}`, a.phone && `Phone: ${a.phone}`].filter(Boolean).join(', ') : '')

// Everything sales needs to call the customer back, as plain text.
export function orderLeadDetails(order, items, base = '') {
  const c = order.contact
  return [
    `New online shop order ${order.order_number} (sales team to call the customer)`,
    `Customer: ${c.name}${c.company ? `, ${c.company}` : ''}`,
    `Email: ${c.email}`,
    `Mobile: +91${c.phone}`,
    order.gstin && `GSTIN: ${order.gstin}`,
    '',
    'Products:',
    ...items.map((i) => `- ${i.name} (SKU ${i.sku}) x ${i.qty} @ ${formatINR(i.unit_price_paise)} = ${formatINR(i.line_total_paise)}`),
    '',
    `Subtotal: ${formatINR(order.subtotal_paise)}`,
    `Shipping: ${order.shipping_paise ? formatINR(order.shipping_paise) : 'Free'}`,
    `Total (incl. GST ${formatINR(order.gst_paise)}): ${formatINR(order.total_paise)}`,
    '',
    `Delivery address: ${addressText(order.shipping_address)}`,
    JSON.stringify(order.billing_address) !== JSON.stringify(order.shipping_address) && `Billing address: ${addressText(order.billing_address)}`,
    order.notes && `Customer notes: ${order.notes}`,
    base && `Order page: ${base}/order/${order.public_token}`,
    base && `Admin: ${base}/admin/orders/${order.id}`,
  ]
    .filter((line) => line !== false && line !== null && line !== undefined)
    .join('\n')
}

// The order as the CRM's Orders tab receives it (kept apart from leads there).
export function orderPayload(order, items, base = '') {
  const c = order.contact
  const a = order.shipping_address || {}
  return {
    order_number: order.order_number,
    placed_at: order.created_at,
    status: 'placed',
    name: c.name,
    email: c.email,
    phone: `+91${c.phone}`,
    company: c.company || '',
    gstin: order.gstin || '',
    items: items.map((i) => ({ sku: i.sku, name: i.name, qty: i.qty, unit_price: formatINR(i.unit_price_paise), line_total: formatINR(i.line_total_paise) })),
    subtotal: formatINR(order.subtotal_paise),
    shipping: order.shipping_paise ? formatINR(order.shipping_paise) : 'Free',
    gst: formatINR(order.gst_paise),
    total: formatINR(order.total_paise),
    total_paise: order.total_paise,
    address: addressText(a),
    city: a.city || '',
    state: a.state || '',
    pincode: a.pincode || '',
    notes: order.notes || '',
    order_page: base ? `${base}/order/${order.public_token}` : '',
    message: orderLeadDetails(order, items, base),
  }
}

// Orders tab endpoint in Prosper CRM (separate from its leads). Needs both the
// address and the shared secret; the secret is never logged.
const ordersEndpoint = () => {
  const url = process.env.CRM_ORDERS_URL
  const secret = process.env.SHOP_ORDERS_SECRET
  return url && secret ? { url, secret, header: process.env.CRM_ORDERS_HEADER || 'x-shop-secret' } : null
}

export async function sendOrderToCrm(order, items, base = '') {
  const ep = ordersEndpoint()
  if (!ep) return { skipped: true }
  const res = await fetch(ep.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', [ep.header]: ep.secret },
    body: JSON.stringify(orderPayload(order, items, base)),
    signal: AbortSignal.timeout(6000),
  })
  if (!res.ok) throw new Error(`CRM orders endpoint answered ${res.status}`)
  return { ok: true }
}

export async function forwardOrderLead(order, items, base = '') {
  if (!leadForwardingOn()) return { skipped: true }
  const c = order.contact
  const products = items.map((i) => `${i.name} x ${i.qty}`).join(', ')
  const campaign = `Online Shop Order ${order.order_number}`
  const details = orderLeadDetails(order, items, base)
  const jobs = []

  // With the Orders endpoint set up, orders go there and never to the CRM's leads.
  if (ordersEndpoint()) jobs.push(sendOrderToCrm(order, items, base))
  const crmUrl = ordersEndpoint() ? null : process.env.CRM_WEBHOOK_URL || process.env.VITE_CRM_WEBHOOK_URL
  if (crmUrl) {
    jobs.push(
      fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: c.name,
          email: c.email,
          phone: `+91${c.phone}`,
          company: c.company,
          gstin: order.gstin || '',
          product: products,
          campaign,
          source: 'Website',
          order_number: order.order_number,
          total: formatINR(order.total_paise),
          total_paise: order.total_paise,
          city: order.shipping_address?.city || '',
          state: order.shipping_address?.state || '',
          pincode: order.shipping_address?.pincode || '',
          address: addressText(order.shipping_address),
          notes: order.notes || '',
          items: items.map((i) => ({ sku: i.sku, name: i.name, qty: i.qty, unit_price: formatINR(i.unit_price_paise), line_total: formatINR(i.line_total_paise) })),
          message: details,
        }),
        signal: AbortSignal.timeout(4000),
      })
    )
  }

  // Only the fields the Zoho web form already has; the full order goes in Description.
  const description = details.slice(0, 31000)
  jobs.push(
    fetch(ZOHO_URL, {
      method: 'POST',
      body: new URLSearchParams({
        ...ZOHO_FORM,
        'Last Name': c.name.slice(0, 80),
        Email: c.email.slice(0, 100),
        Company: (c.company || 'Not provided').slice(0, 200),
        Phone: `+91${c.phone}`,
        Description: description,
        'Lead Source': 'Website',
        aG9uZXlwb3Q: '',
      }),
      signal: AbortSignal.timeout(4000),
    })
  )

  const results = await Promise.allSettled(jobs)
  return { sent: results.filter((r) => r.status === 'fulfilled').length, failed: results.filter((r) => r.status === 'rejected').length }
}

// Keeps the CRM Orders tab in step when staff change an order's status.
const CRM_STATUS = { pending_payment: 'placed', paid: 'paid', processing: 'confirmed', shipped: 'shipped', delivered: 'delivered', cancelled: 'cancelled', refunded: 'cancelled' }

export async function sendOrderStatusToCrm(order) {
  const ep = ordersEndpoint()
  if (!ep || !leadForwardingOn() || !CRM_STATUS[order.status]) return { skipped: true }
  try {
    const res = await fetch(ep.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [ep.header]: ep.secret },
      body: JSON.stringify({ order_number: order.order_number, status: CRM_STATUS[order.status] }),
      signal: AbortSignal.timeout(6000),
    })
    return { ok: res.ok }
  } catch (err) {
    console.error('[shop] CRM status update failed', err.message)
    return { ok: false }
  }
}
