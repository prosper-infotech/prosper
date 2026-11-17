import { Link } from 'react-router-dom'
import { Trash2, Truck } from 'lucide-react'
import { useCart } from '../shopContext'
import { ProductImage, QtyStepper } from './ui'
import { formatINR, isOrderable } from '../../../shared/pricing.js'

export function FreeShippingBar() {
  const { priced, config } = useCart()
  const threshold = config.free_shipping_threshold_paise
  if (!threshold || !priced.items.length) return null
  const pct = Math.min(100, Math.round((priced.subtotal_paise / threshold) * 100))
  return (
    <div className="rounded-xl bg-surface-alt px-4 py-3">
      <p className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Truck className="h-4 w-4 shrink-0" />
        {priced.free_shipping ? 'You get free shipping on this order.' : `Add ${formatINR(priced.free_shipping_remaining_paise)} more for free shipping.`}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free shipping">
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function CartLine({ line, compact = false, onNavigate }) {
  const { setQty, remove } = useCart()
  const { product, qty } = line
  if (!product || !isOrderable(product)) {
    return (
      <li className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        <span>{product ? `${product.name} is no longer available to order.` : 'A product in your cart is no longer available.'}</span>
        <button type="button" onClick={() => remove(line.id)} className="shrink-0 font-bold underline">
          Remove
        </button>
      </li>
    )
  }
  const min = Math.max(1, product.min_order_qty || 1)
  return (
    <li className="flex gap-3 sm:gap-4">
      <Link to={`/p/${product.slug}`} onClick={onNavigate} className={`${compact ? 'w-20' : 'w-20 sm:w-28'} shrink-0 self-start overflow-hidden rounded-xl border border-ink-300/60`}>
        <ProductImage product={product} ratio="aspect-square" iconSize="h-10 w-10" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/p/${product.slug}`} onClick={onNavigate} className="font-heading text-[15px] font-bold leading-snug text-primary hover:underline">
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-ink-500">
              {formatINR(product.price_paise)} each, incl. GST{min > 1 ? ` · Min. ${min}` : ''}
            </p>
          </div>
          <p className="shrink-0 font-heading text-[15px] font-bold text-ink-900">{formatINR(product.price_paise * qty)}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <QtyStepper size="sm" value={qty} min={min} max={product.stock_qty} onChange={(n) => setQty(product, n)} label={`Quantity of ${product.name}`} />
          <button type="button" onClick={() => remove(product.id)} aria-label={`Remove ${product.name}`} className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm text-ink-500 transition-colors hover:bg-red-50 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
        {qty >= product.stock_qty && <p className="text-xs text-amber-800">That is all we have in stock.</p>}
      </div>
    </li>
  )
}

export function Totals({ priced, className = '' }) {
  return (
    <dl className={`flex flex-col gap-2 text-sm ${className}`}>
      <div className="flex justify-between">
        <dt className="text-ink-600">Subtotal (incl. GST)</dt>
        <dd className="font-semibold text-ink-900">{formatINR(priced.subtotal_paise)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-ink-600">Shipping</dt>
        <dd className="font-semibold text-ink-900">{priced.shipping_paise ? formatINR(priced.shipping_paise) : <span className="text-[#3f7a0c]">Free</span>}</dd>
      </div>
      <div className="mt-1 flex items-baseline justify-between border-t border-ink-300/70 pt-3">
        <dt className="font-heading text-base font-bold text-primary">Total</dt>
        <dd className="font-heading text-2xl font-extrabold text-primary">{formatINR(priced.total_paise)}</dd>
      </div>
      <p className="text-right text-xs text-ink-500">Includes GST of {formatINR(priced.gst_paise)}</p>
    </dl>
  )
}
