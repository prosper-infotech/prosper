import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, ShoppingCart } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { CartLine, FreeShippingBar, Totals } from '../../shop/components/CartLines'
import TrustStrip from '../../shop/components/TrustStrip'
import { EmptyState, PageLoading } from '../../shop/components/ui'
import { btn } from '../../shop/format'

export default function CartPage() {
  const { ready, lines, priced, clear } = useShop()
  useDocumentTitle('Your Cart | Prosper Infotech Shop', 'Review the products in your cart.', null, { noindex: true })

  if (!lines.length) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        text="Browse RFID tags, readers, barcode scanners and printers, then add what you need."
        action={
          <Link to="/" className={btn.gold}>
            Go to the shop
          </Link>
        }
      />
    )
  }
  if (!ready) return <PageLoading label="Loading your cart" />

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Continue shopping
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">Your cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <FreeShippingBar />
          <ul className="mt-6 flex flex-col gap-6 rounded-md border border-[#eaeaec] bg-white p-5 md:p-6">
            {lines.map((line) => (
              <CartLine key={line.id} line={line} />
            ))}
          </ul>
          <button type="button" onClick={clear} className="mt-4 text-sm text-ink-500 underline hover:text-red-700">
            Empty the cart
          </button>
        </div>

        <aside>
          <div className="sticky top-28 rounded-md border border-[#eaeaec] bg-white p-5 md:p-6">
            <h2 className="mb-4 text-lg">Order summary</h2>
            <Totals priced={priced} />
            {priced.items.length > 0 ? (
              <Link to="/checkout" className={`${btn.gold} mt-5 w-full !py-3.5 !text-base`}>
                <Lock className="h-4 w-4" />
                Continue to checkout
              </Link>
            ) : (
              <p className="mt-4 text-sm text-red-700">Remove the unavailable items to continue.</p>
            )}
            <p className="mt-3 text-center text-xs text-ink-500">No account needed. You can add your GSTIN at checkout.</p>
          </div>
        </aside>
      </div>

      <TrustStrip className="mt-12" />
    </div>
  )
}
