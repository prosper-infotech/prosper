// GA4 ecommerce events (plan section 10). Safe to call when gtag is blocked.
const item = (p, qty = 1) => ({
  item_id: p.sku,
  item_name: p.name,
  item_brand: p.brand || 'Prosper Infotech',
  item_category: p.category || undefined,
  price: (p.price_paise ?? p.unit_price_paise) ? (p.price_paise ?? p.unit_price_paise) / 100 : undefined,
  quantity: qty,
})

// The same shop events for Meta (Facebook / Instagram ads), under Meta's standard names.
const META = { view_item: 'ViewContent', add_to_cart: 'AddToCart', begin_checkout: 'InitiateCheckout', purchase: 'Purchase' }
function meta(name, params) {
  const event = META[name]
  if (!event) return
  const items = params.items || []
  window.fbq?.('track', event, {
    currency: 'INR',
    value: params.value ?? 0,
    content_type: 'product',
    content_ids: items.map((i) => i.item_id),
    contents: items.map((i) => ({ id: i.item_id, quantity: i.quantity, item_price: i.price })),
    num_items: items.reduce((n, i) => n + (i.quantity || 1), 0),
    ...(items[0] && items.length === 1 ? { content_name: items[0].item_name } : {}),
  }, params.transaction_id ? { eventID: params.transaction_id } : undefined)
}

function send(name, params) {
  try {
    window.gtag?.('event', name, params)
    meta(name, params)
  } catch {
    // analytics must never break the shop
  }
}

// Meta "Lead": enquiry, bulk quote or pop-up sign-up sent.
export function metaLead(source, extra = {}) {
  try {
    window.fbq?.('track', 'Lead', { content_name: source, ...extra })
  } catch {
    // ignore
  }
}

export const track = {
  viewItemList: (name, products) => send('view_item_list', { item_list_name: name, items: products.slice(0, 30).map((p) => item(p)) }),
  viewItem: (p) => send('view_item', { currency: 'INR', value: p.price_paise ? p.price_paise / 100 : undefined, items: [item(p)] }),
  addToCart: (p, qty) => send('add_to_cart', { currency: 'INR', value: (p.price_paise * qty) / 100, items: [item(p, qty)] }),
  beginCheckout: (priced) => send('begin_checkout', { currency: 'INR', value: priced.total_paise / 100, items: priced.items.map((i) => item(i, i.qty)) }),
  addPaymentInfo: (priced, method) => send('add_payment_info', { currency: 'INR', value: priced.total_paise / 100, payment_type: method, items: priced.items.map((i) => item(i, i.qty)) }),
  purchase: (order) =>
    send('purchase', {
      transaction_id: order.order_number,
      currency: 'INR',
      value: order.total_paise / 100,
      tax: order.gst_paise / 100,
      shipping: order.shipping_paise / 100,
      items: order.items.map((i) => item(i, i.qty)),
    }),
  quote: (name) => send('request_quote', { event_category: 'Online Shop', event_label: name }),
}
