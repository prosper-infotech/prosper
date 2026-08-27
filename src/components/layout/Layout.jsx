import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import FloatingCallButton from './FloatingCallButton'
import useAnalyticsPageView from '../../hooks/useAnalyticsPageView'
import useScrollToHash from '../../hooks/useScrollToHash'

export default function Layout() {
  const location = useLocation()
  const element = useOutlet()
  useAnalyticsPageView()
  useScrollToHash()

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
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
      <WhatsAppButton tight={location.pathname === '/'} />
      <FloatingCallButton />
    </div>
  )
}
