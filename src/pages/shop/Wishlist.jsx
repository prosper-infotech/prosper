import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import ProductCard from '../../shop/components/ProductCard'
import { EmptyState, PageLoading } from '../../shop/components/ui'
import { btn } from '../../shop/format'

export default function Wishlist() {
  const { ready, products, wishlist } = useShop()
  useDocumentTitle('Your Wishlist | Prosper Infotech Shop', 'Products you saved for later.', null, { noindex: true })
  if (!ready) return <PageLoading label="Loading your wishlist" />
  const saved = wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  if (!saved.length) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        text="Tap the heart on any product to save it here for later."
        action={
          <Link to="/c/all" className={btn.gold}>
            Browse products
          </Link>
        }
      />
    )
  }
  return (
    <div className="mx-auto max-w-[1400px] px-2 pb-10 pt-3 sm:px-4 sm:pt-4">
      <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(20,52,109,0.08)] sm:p-6">
        <h1 className="text-2xl font-extrabold md:text-3xl">
          Your wishlist <span className="text-base font-semibold text-ink-500">({saved.length})</span>
        </h1>
        <p className="mt-1 text-sm text-ink-600">Saved on this device.</p>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
