import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import SectionTitle from './SectionTitle'

// A titled section of products: a grid on larger screens, a sideways scroll on phones.
export default function ProductRow({ title, subtitle, products, viewAllTo, limit = 5, minimum = 1 }) {
  if (products.length < minimum) return null
  return (
    <section aria-label={title}>
      <SectionTitle title={title} subtitle={subtitle} action={viewAllTo && <Link to={viewAllTo}>View all</Link>} />
      <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
        {products.slice(0, limit).map((product) => (
          <li key={product.id} className="w-[44%] shrink-0 snap-start sm:w-auto">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
