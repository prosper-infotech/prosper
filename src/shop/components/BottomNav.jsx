import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Heart, Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../shopContext'

// App-style navigation along the bottom of the screen on phones.
export default function BottomNav() {
  const { count, wishlist } = useCart()
  const { pathname } = useLocation()
  // Product pages show their own buy bar, and checkout should have no distractions.
  const hidden = pathname.startsWith('/p/') || pathname === '/checkout'

  useEffect(() => {
    if (hidden) return
    document.body.dataset.bottomNav = 'true'
    return () => {
      delete document.body.dataset.bottomNav
    }
  }, [hidden])

  if (hidden) return null
  const items = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/c/all', label: 'Categories', icon: LayoutGrid },
    { to: '/wishlist', label: 'Wishlist', icon: Heart, badge: wishlist.length },
    { to: '/account', label: 'Account', icon: User },
    { to: '/cart', label: 'Cart', icon: ShoppingCart, badge: count },
  ]
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-300/70 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_18px_-10px_rgba(20,52,109,0.35)] lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => `relative flex h-[58px] flex-col items-center justify-center gap-1 text-[11px] font-semibold ${isActive ? 'text-primary' : 'text-ink-600'}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute top-0 h-[3px] w-10 rounded-b-full bg-gold-dark" />}
                  <span className="relative">
                    <item.icon className="h-5 w-5" />
                    {item.badge > 0 && (
                      <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c62828] px-1 text-[10px] font-bold text-white">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
