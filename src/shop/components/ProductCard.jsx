import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useCart } from '../shopContext'
import { ProductImage } from './ui'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'

// Flat product tile: photo, brand, name, price line, one small action. No borders or shadows at rest.
export default function ProductCard({ product }) {
  const { add, requestQuote, wishlist, toggleWish } = useCart()
  const orderable = isOrderable(product)
  const priced = hasPrice(product)
  const wished = wishlist.includes(product.id)
  const to = `/p/${product.slug}`
  const saving = priced && product.mrp_paise > product.price_paise ? Math.round((1 - product.price_paise / product.mrp_paise) * 100) : 0

  return (
    <article className="group relative flex h-full flex-col bg-white transition-shadow duration-200 hover:shadow-[0_2px_16px_4px_rgba(40,44,63,0.07)]">
      <div className="relative">
        <Link to={to} tabIndex={-1} aria-hidden="true" className="block">
          <ProductImage product={product} ratio="aspect-[4/5]" iconSize="h-14 w-14" />
        </Link>
        {priced && !orderable && (
          <span className="absolute inset-x-0 bottom-0 bg-white/90 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#535766]">Out of stock</span>
        )}
        {!priced && <span className="absolute left-2 top-2 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">On quote</span>}
        <button
          type="button"
          onClick={() => toggleWish(product.id)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-900"
        >
          <Heart className={`h-4 w-4 stroke-[1.8] ${wished ? 'fill-[#ff3f6c] text-[#ff3f6c]' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-2.5">
        <p className="truncate text-[15px] font-bold text-ink-900">{product.brand || 'Prosper Infotech'}</p>
        <h3 className="truncate text-sm text-[#535766]">
          <Link to={to} className="hover:text-ink-900 focus-visible:underline focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm">
          {priced ? (
            <>
              <span className="font-bold text-ink-900">{formatINR(product.price_paise)}</span>
              {saving > 0 && <span className="text-xs text-[#7e818c] line-through">{formatINR(product.mrp_paise)}</span>}
              {saving > 0 && <span className="text-xs font-semibold text-[#ff905a]">({saving}% OFF)</span>}
            </>
          ) : (
            <span className="font-bold text-ink-900">Price on request</span>
          )}
        </p>
        <p className="mt-0.5 text-[11px] text-[#7e818c]">
          {priced ? 'Incl. GST' : 'Quote in 1 business day'}
          {orderable && product.stock_qty <= 5 ? <span className="font-semibold text-[#ff905a]"> · Only {product.stock_qty} left</span> : null}
        </p>

        <div className="mt-auto pt-3">
          {orderable ? (
            <button
              type="button"
              onClick={() => add(product, product.min_order_qty || 1)}
              className="w-full rounded-md border border-[#d4d5d9] py-2 text-xs font-bold uppercase tracking-wider text-ink-900 transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => requestQuote(product.name)}
              className="w-full rounded-md border border-[#d4d5d9] py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:border-primary"
            >
              {priced ? 'Notify me' : 'Request price'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
