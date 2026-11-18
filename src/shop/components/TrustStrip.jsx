import { FileText, Headset, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../shopContext'
import { formatINR } from '../../../shared/pricing.js'

// Four benefit boxes in one bordered strip.
export default function TrustStrip({ className = '' }) {
  const { config } = useCart()
  const items = [
    {
      icon: Truck,
      title: config.free_shipping_threshold_paise ? 'Free delivery' : 'Delivery across India',
      text: config.free_shipping_threshold_paise ? `On orders over ${formatINR(config.free_shipping_threshold_paise)}` : 'Tracked courier to your door',
    },
    { icon: FileText, title: 'GST invoice', text: 'Prices include GST, claim input credit' },
    { icon: ShieldCheck, title: 'Secure payment', text: 'Card, UPI, net banking or bank transfer' },
    { icon: Headset, title: 'Expert support', text: 'Help choosing, set-up and after-sales' },
  ]
  return (
    <ul className={`grid grid-cols-2 overflow-hidden rounded-lg border border-[#eaeaec] bg-white lg:grid-cols-4 ${className}`}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <li
          key={title}
          className={`flex items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4 md:px-6 md:py-5 ${i % 2 ? 'border-l border-[#eaeaec]' : ''} ${i > 1 ? 'border-t border-[#eaeaec] lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-alt sm:h-11 sm:w-11">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5] text-primary" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-bold leading-tight text-primary sm:text-sm">{title}</span>
            <span className="mt-0.5 hidden text-xs leading-snug text-[#696e79] sm:block">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
