import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// The base gtag config in index.html only tracks the first page load.
// Since this is a client-side-routed SPA, fire a page_view on every
// route change so subsequent navigations show up in GA4 too.
export default function useAnalyticsPageView() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [location.pathname, location.search])
}
