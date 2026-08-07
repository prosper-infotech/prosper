import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'
import useAnalyticsPageView from '../../hooks/useAnalyticsPageView'

export default function Layout() {
  const location = useLocation()
  const element = useOutlet()
  useAnalyticsPageView()

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
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
      <StickyMobileCTA />
    </div>
  )
}
