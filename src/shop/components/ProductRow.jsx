import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

// A white panel with a heading and a sideways-scrolling row of products.
export default function ProductRow({ title, subtitle, products, viewAllTo, viewAllLabel = 'View all' }) {
  const scroller = useRef(null)
  if (!products.length) return null
  const move = (dir) => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.8, behavior: 'smooth' })
  const arrow =
    'absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg ring-1 ring-ink-300/70 transition-transform hover:scale-110 md:flex'
  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(20,52,109,0.08)] sm:p-5" aria-label={title}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-ink-600">{subtitle}</p>}
        </div>
        {viewAllTo && (
          <Link to={viewAllTo} className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark">
            {viewAllLabel}
          </Link>
        )}
      </div>
      <div className="relative">
        {products.length > 5 && (
          <button type="button" onClick={() => move(-1)} aria-label={`Scroll ${title} left`} className={`${arrow} -left-3`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <ul ref={scroller} className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <li key={product.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23.5%] lg:w-[18.9%]">
              <ProductCard product={product} compact />
            </li>
          ))}
        </ul>
        {products.length > 5 && (
          <button type="button" onClick={() => move(1)} aria-label={`Scroll ${title} right`} className={`${arrow} -right-3`}>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </section>
  )
}
