import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, ShoppingCart, X } from 'lucide-react'
import { useCart } from '../shopContext'
import { CartLine, FreeShippingBar, Totals } from './CartLines'
import { Spinner } from './ui'
import { btn } from '../format'

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, priced, ready, count } = useCart()
  const { pathname } = useLocation()
  const panel = useRef(null)
  const lastPath = useRef(pathname)

  // Close when the visitor moves to another page.
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname
      closeDrawer()
    }
  }, [pathname, closeDrawer])

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    document.body.dataset.cartOpen = 'true'
    panel.current?.querySelector('button')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
      if (e.key !== 'Tab' || !panel.current) return
      const nodes = panel.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      delete document.body.dataset.cartOpen
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [drawerOpen, closeDrawer])

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-navy/60 backdrop-blur-sm"
          onClick={closeDrawer}
        >
          <motion.aside
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)]"
          >
            <header className="flex items-center justify-between border-b border-[#eaeaec] bg-white px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg">
                <ShoppingCart className="h-5 w-5" />
                Your cart {count > 0 && <span className="text-sm font-semibold text-ink-500">({count})</span>}
              </h2>
              <button type="button" onClick={closeDrawer} aria-label="Close cart" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-surface-alt hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </header>

            {!lines.length ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f6] text-primary">
                  <ShoppingCart className="h-7 w-7" />
                </div>
                <p className="font-heading text-xl font-bold text-primary">Your cart is empty</p>
                <p className="text-sm text-ink-600">Browse RFID tags, readers, barcode scanners and printers.</p>
                <Link to="/" onClick={closeDrawer} className={btn.gold}>
                  Go to the shop
                </Link>
              </div>
            ) : !ready ? (
              <div className="flex flex-1 items-center justify-center text-primary" role="status">
                <Spinner className="h-6 w-6" />
                <span className="sr-only">Loading your cart</span>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <FreeShippingBar />
                  <ul className="mt-5 flex flex-col gap-5">
                    {lines.map((line) => (
                      <CartLine key={line.id} line={line} compact onNavigate={closeDrawer} />
                    ))}
                  </ul>
                </div>
                <footer className="border-t border-[#eaeaec] bg-white px-5 pb-5 pt-4">
                  <Totals priced={priced} />
                  {priced.items.length > 0 && (
                    <Link to="/checkout" onClick={closeDrawer} className={`${btn.gold} mt-4 w-full !py-3.5 !text-base`}>
                      <Lock className="h-4 w-4" />
                      Checkout
                    </Link>
                  )}
                  <Link to="/cart" onClick={closeDrawer} className="mt-3 block text-center text-sm font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
                    View full cart
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
