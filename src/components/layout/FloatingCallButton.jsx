import { Phone } from 'lucide-react'
import { useCart } from '../../shop/shopContext'

// Calls the shop's support number (Admin → Settings → Support phone).
export default function FloatingCallButton() {
  const { config } = useCart()
  if (!config.support_phone) return null
  return (
    <a
      href={`tel:${config.support_phone.replace(/[^+\d]/g, '')}`}
      aria-label={`Call us on ${config.support_phone}`}
      onClick={() => window.gtag?.('event', 'click_call', { event_category: 'Floating Button' })}
      className="fixed bottom-36 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary shadow-md transition-transform hover:scale-105"
    >
      <Phone className="h-5 w-5" />
    </a>
  )
}
