// Pricing rules shared by the browser (to show totals) and the server (which
// decides the real total). The server never trusts totals sent by the browser:
// it calls priceCart() itself with prices read from the database.
// All amounts are integers in paise. Prices include GST.

export function isOrderable(product) {
  if (!product || !product.is_active || product.quote_only) return false
  if (!Number.isInteger(product.price_paise) || product.price_paise <= 0) return false
  return product.stock_qty >= Math.max(1, product.min_order_qty || 1)
}

export function hasPrice(product) {
  return Boolean(product) && !product.quote_only && Number.isInteger(product.price_paise) && product.price_paise > 0
}

// GST contained inside a GST-inclusive amount.
export function gstIncluded(amountPaise, gstPercent) {
  const rate = Number(gstPercent) || 0
  if (rate <= 0) return 0
  return amountPaise - Math.round(amountPaise / (1 + rate / 100))
}

export function clampQty(product, qty) {
  const min = Math.max(1, product.min_order_qty || 1)
  const max = Math.max(0, product.stock_qty || 0)
  let q = Math.floor(Number(qty) || 0)
  if (q < min) q = min
  if (q > max) q = max
  return q
}

// lines: [{ product, qty }]. Returns priced lines, totals and any problems.
export function priceCart(lines, settings) {
  const items = []
  const problems = []
  for (const { product, qty } of lines) {
    if (!product || !product.is_active) {
      problems.push({ id: product?.id, code: 'unavailable', message: 'A product in your cart is no longer available.' })
      continue
    }
    if (!isOrderable(product)) {
      problems.push({
        id: product.id,
        code: hasPrice(product) ? 'out_of_stock' : 'quote_only',
        message: hasPrice(product) ? `${product.name} is out of stock.` : `${product.name} is sold by quote only.`,
      })
      continue
    }
    const min = Math.max(1, product.min_order_qty || 1)
    const q = Math.floor(Number(qty) || 0)
    if (q < min) {
      problems.push({ id: product.id, code: 'min_qty', message: `${product.name}: minimum order is ${min}.` })
      continue
    }
    if (q > product.stock_qty) {
      problems.push({ id: product.id, code: 'stock', message: `${product.name}: only ${product.stock_qty} in stock.` })
      continue
    }
    const lineTotal = product.price_paise * q
    items.push({
      product_id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      image: product.images?.[0] || null,
      hsn_code: product.hsn_code || '',
      unit_price_paise: product.price_paise,
      gst_percent: Number(product.gst_percent) || 0,
      qty: q,
      line_total_paise: lineTotal,
      line_gst_paise: gstIncluded(lineTotal, product.gst_percent),
    })
  }

  const subtotal = items.reduce((sum, i) => sum + i.line_total_paise, 0)
  const flat = Math.max(0, settings?.shipping_flat_paise || 0)
  const threshold = Math.max(0, settings?.free_shipping_threshold_paise || 0)
  const freeShipping = threshold > 0 && subtotal >= threshold
  const shipping = items.length === 0 || freeShipping ? 0 : flat
  const shippingGst = gstIncluded(shipping, settings?.shipping_gst_percent ?? 18)
  const gst = items.reduce((sum, i) => sum + i.line_gst_paise, 0) + shippingGst

  return {
    items,
    problems,
    subtotal_paise: subtotal,
    shipping_paise: shipping,
    gst_paise: gst,
    total_paise: subtotal + shipping,
    free_shipping: freeShipping,
    free_shipping_remaining_paise: threshold > 0 && !freeShipping ? threshold - subtotal : 0,
    item_count: items.reduce((sum, i) => sum + i.qty, 0),
  }
}

export function formatINR(paise, { decimals = 'auto' } = {}) {
  const rupees = (Number(paise) || 0) / 100
  const fraction = decimals === 'auto' ? (Number.isInteger(rupees) ? 0 : 2) : decimals
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(rupees)
}
