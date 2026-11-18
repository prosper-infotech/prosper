import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../shopContext'
import { ProductImage } from './ui'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'

// Bordered store card: photo, brand, two-line name, price with GST note, one action.
export default function ProductCard({ product }) {
  const { add, requestQuote } = useCart()
  const orderable = isOrderable(product)
  const priced = hasPrice(product)
  const to = `/p/${product.slug}`
  const saving = priced && product.mrp_paise > product.price_paise ? Math.round((1 - product.price_paise / product.mrp_paise) * 100) : 0

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[#eaeaec] bg-white transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-[0_6px_20px_rgba(20,52,109,0.10)]">
      <div className="relative p-3 pb-0">
        <Link to={to} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-md">
          <ProductImage product={product} ratio="aspect-square" iconSize="h-14 w-14" />
        </Link>
        {saving > 0 && <span className="absolute left-3 top-3 rounded-br-md rounded-tl-md bg-[#d6262f] px-2 py-0.5 text-[11px] font-bold text-white">{saving}% off</span>}
        {priced && !orderable && (
          <span className="absolute inset-x-3 bottom-0 bg-white/90 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#535766]">Out of stock</span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <p className="truncate text-[11px] font-bold uppercase tracking-wider text-gold-dark">{product.brand || 'Prosper Infotech'}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-ink-900">
          <Link to={to} className="hover:text-primary focus-visible:underline focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2">
          {priced ? (
            <p className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-base font-extrabold text-primary">{formatINR(product.price_paise)}</span>
              {saving > 0 && <span className="text-xs text-[#7e818c] line-through">{formatINR(product.mrp_paise)}</span>}
            </p>
          ) : (
            <p className="text-sm font-extrabold text-primary">Price on request</p>
          )}
          <p className="text-[11px] text-[#7e818c]">
            {priced ? 'Incl. GST' : 'Quote within 1 business day'}
            {orderable && product.stock_qty <= 5 ? <span className="font-semibold text-[#d9480f]"> · Only {product.stock_qty} left</span> : null}
          </p>
        </div>

        <div className="mt-auto pt-3">
          {orderable ? (
            <button
              type="button"
              onClick={() => add(product, product.min_order_qty || 1)}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
            >
              <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => requestQuote(product.name)}
              className="w-full rounded-md border border-primary py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {priced ? 'Notify me' : 'Request price'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
