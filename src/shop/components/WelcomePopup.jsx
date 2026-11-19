import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useShop } from '../shopContext'

const QuoteModal = lazy(() => import('../../components/ui/QuoteModal'))

const SEEN_KEY = 'shop_popup_seen'
const WAIT_MS = 20_000 // show after 20 seconds on the shop...
const EXIT_AFTER_MS = 6_000 // ...or sooner on a computer, when the mouse heads for the tab bar
const QUIET_DAYS = 7 // once shown, not again for a week
const SKIP = /^\/(checkout|cart|order|account)/ // never interrupt buying or account pages

const read = (store, key) => {
  try {
    return window[store].getItem(key)
  } catch {
    return null
  }
}

// An enquiry pop-up shown once to new visitors. It uses the same form as
// "Request price", so leads reach the sales email and the CRM the same way.
export default function WelcomePopup() {
  const { pathname } = useLocation()
  const { products, drawerOpen } = useShop()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false) // at most once per visit

  const allowed = useMemo(() => {
    if (SKIP.test(pathname)) return false
    if (read('sessionStorage', 'lp_lead_submitted')) return false
    const seen = Number(read('localStorage', SEEN_KEY)) || 0
    return Date.now() - seen > QUIET_DAYS * 86_400_000
  }, [pathname])

  useEffect(() => {
    if (!allowed || shown || drawerOpen) return undefined
    const started = Date.now()
    const show = () => {
      setShown(true)
      setOpen(true)
      try {
        localStorage.setItem(SEEN_KEY, String(Date.now()))
      } catch {
        // private browsing: it may show again next visit, which is fine
      }
    }
    const timer = setTimeout(show, WAIT_MS)
    const onLeave = (e) => {
      if (!e.relatedTarget && e.clientY <= 0 && Date.now() - started > EXIT_AFTER_MS) show()
    }
    document.addEventListener('mouseout', onLeave)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [allowed, shown, drawerOpen])

  const options = useMemo(() => ['Not sure, need guidance', 'Bulk order', ...products.map((p) => p.name)], [products])
  if (!open) return null
  return (
    <Suspense fallback={null}>
      <QuoteModal
        product="Not sure, need guidance"
        options={options}
        campaign="Shop pop-up"
        onClose={() => setOpen(false)}
        label="Get the best price"
        title="Looking for the right hardware?"
        intro="Tell us what you need. Our team will call you back with the best price and delivery time, usually within one business day."
        submitLabel="Get the best price"
      />
    </Suspense>
  )
}
