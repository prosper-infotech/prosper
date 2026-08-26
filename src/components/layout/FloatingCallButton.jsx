import { Phone } from 'lucide-react'
import CallDropdown from './CallDropdown'

export default function FloatingCallButton() {
  return (
    <CallDropdown
      eventCategory="Floating Button"
      align="right"
      triggerClassName="fixed bottom-44 right-5 z-40 hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary shadow-lg transition-transform hover:scale-105"
    >
      <Phone className="h-7 w-7" />
    </CallDropdown>
  )
}
