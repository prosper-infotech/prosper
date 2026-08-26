import { Phone } from 'lucide-react'
import CallDropdown from './CallDropdown'

export default function FloatingCallButton() {
  return (
    <CallDropdown
      eventCategory="Floating Button"
      align="right"
      triggerClassName="fixed bottom-[180px] right-5 z-40 hidden sm:flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gold text-primary shadow-lg transition-transform hover:scale-105"
    >
      <Phone className="h-8 w-8" />
    </CallDropdown>
  )
}
