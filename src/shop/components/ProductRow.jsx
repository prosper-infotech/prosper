import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import SectionTitle from './SectionTitle'

// A titled carousel of products: swipe on phones, arrow buttons on larger screens.
export default function ProductRow({ title, subtitle, products, viewAllTo, limit = 12, minimum = 1 }) {
  const track = useRef(null)
  if (products.length < minimum) return null
  const scroll = (dir) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }
  const items = products.slice(0, limit)
  const arrow =
    'absolute top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4d5d9] bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white md:flex'
  return (
    <section aria-label={title}>
      <SectionTitle title={title} subtitle={subtitle} action={viewAllTo && <Link to={viewAllTo}>View all</Link>} />
      <div className="relative">
        {items.length > 5 && (
          <button type="button" onClick={() => scroll(-1)} aria-label={`Previous ${title}`} className={`${arrow} -left-4`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <ul ref={track} className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {items.map((product) => (
            <li key={product.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc((100%-4rem)/5)]">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        {items.length > 5 && (
          <button type="button" onClick={() => scroll(1)} aria-label={`Next ${title}`} className={`${arrow} -right-4`}>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </section>
  )
}
