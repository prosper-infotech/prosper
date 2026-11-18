import { Link } from 'react-router-dom'
import {
  Briefcase, CreditCard, Cpu, Layers, Loader2, Minus, Monitor, Plus, Printer, Radio, ScanBarcode, ShieldCheck, Smartphone, Tag,
} from 'lucide-react'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'
import { STATUS_LABEL } from '../format'
import Illustration from './Illustration'

const ICONS = { tag: Tag, radio: Radio, scan: ScanBarcode, printer: Printer, cpu: Cpu, card: CreditCard, smartphone: Smartphone, layers: Layers, monitor: Monitor, shield: ShieldCheck, briefcase: Briefcase }
const BY_SLUG = {
  'tags-labels': Tag, 'smart-cards-nfc': CreditCard, 'readers-antennas': Radio, 'barcode-scanners': ScanBarcode, 'mobile-computers': Smartphone,
  'printers-encoders': Printer, 'consumables-spares': Layers, 'pos-kiosks': Monitor, 'security-access': ShieldCheck, 'office-equipment': Briefcase, 'edge-iot': Cpu,
}
export function CategoryIcon({ category, className }) {
  const Icon = ICONS[category?.icon] || BY_SLUG[category?.slug || category] || Tag
  return <Icon className={className} aria-hidden="true" />
}

// Fixed aspect ratio so the page never jumps while images load.
export function ProductImage({ product, src, className = '', ratio = 'aspect-[4/3]', eager = false }) {
  const image = src ?? product.images?.[0]
  return (
    <div className={`${ratio} w-full overflow-hidden bg-surface-alt ${className}`}>
      {image ? (
        <img src={image} alt={product.name} loading={eager ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover" />
      ) : (
        <Illustration product={product} />
      )}
    </div>
  )
}

export function Price({ product, size = 'md' }) {
  const big = size === 'lg'
  if (!hasPrice(product)) {
    return <p className={`font-heading font-bold text-primary ${big ? 'text-2xl' : 'text-base'}`}>Price on request</p>
  }
  const saving = product.mrp_paise > product.price_paise ? Math.round((1 - product.price_paise / product.mrp_paise) * 100) : 0
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={`font-heading font-extrabold text-primary ${big ? 'text-3xl' : 'text-xl'}`}>{formatINR(product.price_paise)}</span>
        {saving > 0 && (
          <>
            <span className={`text-ink-500 line-through ${big ? 'text-base' : 'text-sm'}`}>{formatINR(product.mrp_paise)}</span>
            <span className="rounded-full bg-accent-green/15 px-2 py-0.5 text-xs font-bold text-[#3f7a0c]">{saving}% off</span>
          </>
        )}
      </div>
      <p className="text-xs text-ink-500">Incl. GST{product.min_order_qty > 1 ? ` · Min. order ${product.min_order_qty}` : ''}</p>
    </div>
  )
}

export function StockBadge({ product }) {
  if (!hasPrice(product)) {
    return <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">Quote only</span>
  }
  if (!isOrderable(product)) {
    return <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">Out of stock</span>
  }
  if (product.stock_qty <= 5) {
    return <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">Only {product.stock_qty} left</span>
  }
  return <span className="rounded-full bg-accent-green/15 px-2.5 py-1 text-xs font-semibold text-[#3f7a0c]">In stock</span>
}

export function QtyStepper({ value, min = 1, max = 9999, onChange, size = 'md', label = 'Quantity' }) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const set = (n) => onChange(Math.min(max, Math.max(min, Math.floor(Number(n)) || min)))
  return (
    <div className="inline-flex items-center rounded-lg border border-ink-300 bg-white" role="group" aria-label={label}>
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min} aria-label="Decrease quantity" className={`${box} flex items-center justify-center rounded-l-lg text-primary transition-colors hover:bg-surface-alt disabled:text-ink-300 disabled:hover:bg-transparent`}>
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(e) => set(e.target.value)}
        aria-label={label}
        className={`${size === 'sm' ? 'h-9 w-11' : 'h-11 w-14'} border-x border-ink-300 text-center text-sm font-semibold text-ink-900 [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} aria-label="Increase quantity" className={`${box} flex items-center justify-center rounded-r-lg text-primary transition-colors hover:bg-surface-alt disabled:text-ink-300 disabled:hover:bg-transparent`}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export function Spinner({ className = 'h-4 w-4' }) {
  return <Loader2 className={`animate-spin ${className}`} aria-hidden="true" />
}

export function PageLoading({ label = 'Loading' }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-primary" role="status">
      <Spinner className="h-7 w-7" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// `as="h1"` when the empty state is the whole page (one main heading per page).
export function EmptyState({ icon: Icon, title, text, action, as: Heading = 'h1' }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      {Icon && (
        <Icon className="h-14 w-14 stroke-[1.25] text-primary" aria-hidden="true" />
      )}
      <Heading className="mt-5 text-2xl">{title}</Heading>
      {text && <p className="mt-2 text-ink-600">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

// Small breadcrumb trail for shop pages (the big Breadcrumb banner is too tall here).
export function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-ink-300">/</span>}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink-900" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}

const STATUS_STYLE = {
  pending_payment: 'bg-amber-50 text-amber-800 ring-amber-200',
  paid: 'bg-accent-green/15 text-[#3f7a0c] ring-accent-green/30',
  processing: 'bg-primary/10 text-primary ring-primary/20',
  shipped: 'bg-primary/10 text-primary ring-primary/20',
  delivered: 'bg-accent-green/15 text-[#3f7a0c] ring-accent-green/30',
  cancelled: 'bg-red-50 text-red-700 ring-red-200',
  refunded: 'bg-ink-300/40 text-ink-900 ring-ink-300',
}
export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${STATUS_STYLE[status] || STATUS_STYLE.refunded}`}>
      {STATUS_LABEL[status] || status}
    </span>
  )
}

export function Field({ id, label, error, hint, optional, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label} {optional && <span className="font-normal text-ink-500">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
