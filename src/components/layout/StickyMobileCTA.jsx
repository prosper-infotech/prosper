import { useLocation } from 'react-router-dom'
import Button from '../ui/Button'

export default function StickyMobileCTA() {
  const location = useLocation()

  if (location.pathname === '/contact') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md lg:hidden">
      <Button to="/contact" variant="filled" className="w-full">
        Book a demo
      </Button>
    </div>
  )
}
