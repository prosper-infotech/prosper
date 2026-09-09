import { Phone } from 'lucide-react'
import CallDropdown from './CallDropdown'

export default function FloatingCallButton() {
  return (
    <CallDropdown
      eventCategory="Floating Button"
      align="right"
      triggerClassName="fixed bottom-36 right-5 z-40 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary shadow-md transition-transform hover:scale-105"
    >
      <Phone className="h-5 w-5" />
    </CallDropdown>
  )
}
