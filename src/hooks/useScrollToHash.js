import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't scroll to #hash targets on route change like a
// native page load would — this restores that behavior for in-page anchors.
// Pages are lazy-loaded, so the target element often doesn't exist yet at
// the moment of navigation — poll briefly instead of a single fixed delay.
export default function useScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    let attempts = 0
    let frameId

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
      attempts += 1
      if (attempts < 100) {
        frameId = requestAnimationFrame(tryScroll)
      }
    }

    frameId = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(frameId)
  }, [location.pathname, location.hash])
}
