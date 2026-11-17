import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import FloatingCallButton from './FloatingCallButton'
import useAnalyticsPageView from '../../hooks/useAnalyticsPageView'
import useScrollToHash from '../../hooks/useScrollToHash'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useCart } from '../../shop/shopContext'
import BottomNav from '../../shop/components/BottomNav'

// Loaded the first time the cart is opened, so other pages stay light.
const CartDrawer = lazy(() => import('../../shop/components/CartDrawer'))

export default function Layout() {
  const location = useLocation()
  const element = useOutlet()
  useAnalyticsPageView()
  useScrollToHash()
  useScrollToTop()
  const { drawerOpen } = useCart()
  const [drawerUsed, setDrawerUsed] = useState(false)
  useEffect(() => {
    if (drawerOpen) setDrawerUsed(true)
  }, [drawerOpen])

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f3f8] pb-[58px] lg:pb-0">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {element}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingCallButton />
      <BottomNav />
      {drawerUsed && (
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      )}
    </div>
  )
}
