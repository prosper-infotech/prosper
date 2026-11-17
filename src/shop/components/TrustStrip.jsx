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
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-6 border-y border-[#eaeaec] py-8 lg:grid-cols-4 ${className}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-start gap-3">
          <Icon className="mt-0.5 h-7 w-7 shrink-0 stroke-[1.4] text-primary" aria-hidden="true" />
          <span>
            <span className="block text-sm font-bold text-ink-900">{title}</span>
            <span className="mt-0.5 block text-xs leading-snug text-[#696e79]">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
