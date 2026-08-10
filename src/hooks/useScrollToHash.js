import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't scroll to #hash targets on route change like a
// native page load would — this restores that behavior for in-page anchors.
export default function useScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 200)

    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])
}
