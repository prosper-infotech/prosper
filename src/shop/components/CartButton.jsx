import { ShoppingCart } from 'lucide-react'
import { useCart } from '../shopContext'

export default function CartButton({ className = '' }) {
  const { count, openDrawer } = useCart()
  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={count ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
      className={`relative flex h-11 shrink-0 items-center gap-2 rounded-lg px-2.5 text-white transition-colors hover:bg-white/10 ${className}`}
    >
      <span className="relative">
        <ShoppingCart className="h-6 w-6" />
        {count > 0 && (
          <span className="absolute -right-2.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-extrabold text-primary">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
      <span className="hidden text-sm font-bold lg:inline">Cart</span>
    </button>
  )
}
