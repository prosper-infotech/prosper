import { ShoppingBag } from 'lucide-react'
import { useCart } from '../shopContext'

// Header cart: icon with a small label underneath, opens the cart drawer.
export default function CartButton({ className = '' }) {
  const { count, openDrawer } = useCart()
  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={count ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
      className={`group flex shrink-0 flex-col items-center gap-0.5 px-2 text-ink-900 ${className}`}
    >
      <span className="relative">
        <ShoppingBag className="h-[22px] w-[22px] stroke-[1.6]" />
        {count > 0 && (
          <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
      <span className="hidden text-[11px] font-bold group-hover:text-primary md:block">Cart</span>
    </button>
  )
}
