import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Truck } from 'lucide-react'
import { useCart } from '../shopContext'
import { ProductImage } from './ui'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'

// Marketplace-style product tile: photo, name, price with the saving, and one clear button.
export default function ProductCard({ product, compact = false }) {
  const { add, requestQuote, wishlist, toggleWish, config } = useCart()
  const orderable = isOrderable(product)
  const priced = hasPrice(product)
  const wished = wishlist.includes(product.id)
  const to = `/p/${product.slug}`
  const saving = priced && product.mrp_paise > product.price_paise ? Math.round((1 - product.price_paise / product.mrp_paise) * 100) : 0
  const freeShip = orderable && config.free_shipping_threshold_paise > 0 && product.price_paise >= config.free_shipping_threshold_paise

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-300/60 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_14px_30px_-14px_rgba(20,52,109,0.45)]">
      <button
        type="button"
        onClick={() => toggleWish(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={wished}
        className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md ring-1 ring-ink-300/60 transition-transform hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${wished ? 'fill-red-500 text-red-500' : 'text-ink-600'}`} />
      </button>

      <div className="absolute left-0 top-3 z-10 flex flex-col items-start gap-1">
        {saving > 0 && <span className="rounded-r-md bg-[#c62828] px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">{saving}% off</span>}
        {priced && !orderable && <span className="rounded-r-md bg-ink-900 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Out of stock</span>}
        {!priced && <span className="rounded-r-md bg-primary px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-gold">On quote</span>}
      </div>

      <Link to={to} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <ProductImage product={product} ratio="aspect-square" iconSize="h-16 w-16" className="transition-transform duration-500 group-hover:scale-105" />
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? 'p-3' : 'p-3.5'}`}>
        {product.brand && <p className="truncate text-[11px] font-bold uppercase tracking-wider text-ink-500">{product.brand}</p>}
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.6em] text-[14px] font-semibold leading-snug">
          <Link to={to} className="text-ink-900 transition-colors hover:text-primary focus-visible:underline focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        {!compact && product.specs?.[0] && (
          <p className="mt-1 truncate text-xs text-ink-500">
            {product.specs[0].label}: {product.specs[0].value}
          </p>
        )}

        <div className="mt-2 min-h-[46px]">
          {priced ? (
            <>
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-heading text-lg font-extrabold text-ink-900">{formatINR(product.price_paise)}</span>
                {saving > 0 && <span className="text-xs text-ink-500 line-through">{formatINR(product.mrp_paise)}</span>}
                {saving > 0 && <span className="text-xs font-bold text-[#2e7d32]">{saving}% off</span>}
              </p>
              <p className="text-[11px] text-ink-500">Incl. GST{product.min_order_qty > 1 ? ` · Min. ${product.min_order_qty}` : ''}</p>
            </>
          ) : (
            <>
              <p className="font-heading text-[15px] font-bold text-primary">Price on request</p>
              <p className="text-[11px] text-ink-500">Quote in one business day</p>
            </>
          )}
        </div>

        <p className="mt-1.5 flex min-h-[18px] items-center gap-1 text-[11px] font-semibold">
          {freeShip ? (
            <span className="flex items-center gap-1 text-[#2e7d32]">
              <Truck className="h-3.5 w-3.5" />
              Free delivery
            </span>
          ) : orderable && product.stock_qty <= 5 ? (
            <span className="text-[#c62828]">Only {product.stock_qty} left</span>
          ) : orderable ? (
            <span className="text-[#2e7d32]">In stock</span>
          ) : null}
        </p>

        <div className="mt-auto pt-2.5">
          {orderable ? (
            <button
              type="button"
              onClick={() => add(product, product.min_order_qty || 1)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-3 py-2.5 text-[13px] font-bold text-primary transition-colors hover:bg-gold-dark active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => requestQuote(product.name)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 px-3 py-2.5 text-[13px] font-bold text-primary transition-colors hover:bg-primary hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {priced ? 'Ask when it is back' : 'Request price'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
