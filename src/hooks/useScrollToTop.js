import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation doesn't reset scroll position like a full page
// load does, so a page can open already-scrolled if the previous page
// wasn't at the top. Restore that behavior, except for in-page anchors
// (useScrollToHash handles those).
export default function useScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) return
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
}
