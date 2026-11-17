import { FileText, Headset, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../shopContext'
import { formatINR } from '../../../shared/pricing.js'

export default function TrustStrip({ className = '' }) {
  const { config } = useCart()
  const items = [
    { icon: FileText, title: 'GST invoice', text: 'Prices include GST. Add your GSTIN at checkout.' },
    { icon: ShieldCheck, title: 'Secure payment', text: 'Pay online, by UPI or by bank transfer.' },
    {
      icon: Truck,
      title: 'Delivery across India',
      text: config.free_shipping_threshold_paise ? `Free shipping above ${formatINR(config.free_shipping_threshold_paise)}.` : 'Tracked courier delivery.',
    },
    { icon: Headset, title: 'Expert help', text: 'Our RFID team helps you pick the right product.' },
  ]
  return (
    <ul className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-start gap-3 rounded-xl border border-ink-300/60 bg-white p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-primary">{title}</span>
            <span className="mt-0.5 block text-xs leading-snug text-ink-600">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
