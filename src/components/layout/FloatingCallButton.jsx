import { Phone } from 'lucide-react'
import CallDropdown from './CallDropdown'

export default function FloatingCallButton() {
  return (
    <CallDropdown
      eventCategory="Floating Button"
      align="right"
      triggerClassName="fixed bottom-44 right-5 z-40 hidden sm:flex h-16 w-16 items-center justify-center rounded-full bg-gold text-primary shadow-md transition-transform hover:scale-105"
    >
      <Phone className="h-8 w-8" />
    </CallDropdown>
  )
}
