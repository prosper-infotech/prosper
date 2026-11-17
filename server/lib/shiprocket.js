// Shiprocket automation (plan section 8, later phase). Only used when
// SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD are set. Until then staff type the
// courier and tracking number by hand in the admin screen.
const API = 'https://apiv2.shiprocket.in/v1/external'

export const shiprocketConfigured = () => Boolean(process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD)

async function token() {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD }),
    signal: AbortSignal.timeout(10000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.token) throw new Error(`Shiprocket sign-in failed (${res.status})`)
  return data.token
}

// Creates the order in Shiprocket. A courier and tracking number are assigned
// there (by its rules or by staff); the tracking webhook then updates our order.
export async function createShiprocketOrder(order, items, products) {
  const a = order.shipping_address
  const weightKg = Math.max(0.1, items.reduce((sum, i) => sum + ((products.find((p) => p.id === i.product_id)?.weight_grams || 500) * i.qty) / 1000, 0))
  const [first, ...rest] = a.name.split(' ')
  const res = await fetch(`${API}/orders/create/adhoc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await token()}` },
    body: JSON.stringify({
      order_id: order.order_number,
      order_date: new Date(order.created_at).toISOString().slice(0, 16).replace('T', ' '),
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
      billing_customer_name: first,
      billing_last_name: rest.join(' '),
      billing_address: a.line1,
      billing_address_2: a.line2 || '',
      billing_city: a.city,
      billing_pincode: a.pincode,
      billing_state: a.state,
      billing_country: 'India',
      billing_email: order.contact.email,
      billing_phone: a.phone,
      shipping_is_billing: true,
      order_items: items.map((i) => ({ name: i.name, sku: i.sku, units: i.qty, selling_price: i.unit_price_paise / 100, hsn: i.hsn_code || undefined })),
      payment_method: 'Prepaid',
      shipping_charges: order.shipping_paise / 100,
      sub_total: order.subtotal_paise / 100,
      length: 20,
      breadth: 15,
      height: 10,
      weight: Number(weightKg.toFixed(2)),
    }),
    signal: AbortSignal.timeout(15000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.shipment_id) throw new Error(`Shiprocket order failed: ${data?.message || res.status}`)
  return { shipment_id: String(data.shipment_id), awb: data.awb_code || '', courier: data.courier_name || 'Shiprocket' }
}
