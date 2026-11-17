import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Search, User } from 'lucide-react'
import logo from '../../assets/logo-light.png'
import CartButton from '../../shop/components/CartButton'
import { ProductImage } from '../../shop/components/ui'
import { useShop } from '../../shop/shopContext'
import { formatINR, hasPrice } from '../../../shared/pricing.js'

function SearchBar({ id, className = '' }) {
  const { products } = useShop()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const box = useRef(null)

  useEffect(() => {
    setOpen(false)
    setActive(-1)
  }, [pathname, search])

  useEffect(() => {
    const away = (e) => !box.current?.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [])

  const matches = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return []
    return products.filter((p) => words.every((w) => `${p.name} ${p.sku} ${p.brand || ''}`.toLowerCase().includes(w))).slice(0, 6)
  }, [q, products])

  const submit = (e) => {
    e.preventDefault()
    if (active >= 0 && matches[active]) navigate(`/p/${matches[active].slug}`)
    else navigate(q.trim() ? `/c/all?q=${encodeURIComponent(q.trim())}` : '/c/all')
    setOpen(false)
  }
  const onKey = (e) => {
    if (e.key === 'Escape') setOpen(false)
    if (!matches.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((a) => (a + 1) % matches.length)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a <= 0 ? matches.length - 1 : a - 1))
    }
  }
  const listId = `${id}-list`
  const showList = open && q.trim().length > 0

  return (
    <div ref={box} className={`relative ${className}`}>
      <form onSubmit={submit} role="search" className="flex items-center rounded-md border border-transparent bg-[#f5f5f6] focus-within:border-[#d4d5d9] focus-within:bg-white">
        <Search className="ml-3.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
        <label htmlFor={id} className="sr-only">
          Search products
        </label>
        <input
          id={id}
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search for products"
          className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none"
        />
      </form>

      {showList && (
        <div id={listId} role="listbox" className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-[#eaeaec] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {matches.length ? (
            <>
              {matches.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/p/${p.slug}`}
                  role="option"
                  aria-selected={i === active}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 ${i === active ? 'bg-surface-alt' : 'hover:bg-surface'}`}
                >
                  <span className="w-10 shrink-0 overflow-hidden rounded">
                    <ProductImage product={p} ratio="aspect-square" iconSize="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-900">{p.name}</span>
                  <span className="shrink-0 text-sm font-bold text-primary">{hasPrice(p) ? formatINR(p.price_paise) : 'On quote'}</span>
                </Link>
              ))}
              <button type="button" onClick={submit} className="block w-full border-t border-[#eaeaec] bg-surface px-3 py-2.5 text-left text-sm font-bold text-primary hover:bg-surface-alt">
                See all results for "{q.trim()}"
              </button>
            </>
          ) : (
            <p className="px-4 py-3 text-sm text-ink-600">No products match "{q.trim()}". Press Enter to search everything.</p>
          )}
        </div>
      )}
    </div>
  )
}

const NAV_SHORT = {
  'tags-labels': 'Tags & Labels',
  'readers-antennas': 'Readers',
  'barcode-scanners': 'Scanners',
  'printers-encoders': 'Printers',
  'edge-iot': 'Edge & IoT',
}

function NavIcon({ to, label, icon: Icon, badge, className = '' }) {
  return (
    <Link to={to} className={`group flex shrink-0 flex-col items-center gap-0.5 px-2 text-ink-900 ${className}`} aria-label={badge ? `${label}, ${badge}` : label}>
      <span className="relative">
        <Icon className="h-[22px] w-[22px] stroke-[1.6]" />
        {badge > 0 && (
          <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">{badge}</span>
        )}
      </span>
      <span className="hidden text-[11px] font-bold group-hover:text-primary md:block">{label}</span>
    </Link>
  )
}

export default function Header() {
  const { categories, products, wishlist } = useShop()
  const links = categories.filter((c) => products.some((p) => p.category === c.slug))
  const link = ({ isActive }) =>
    `flex h-full items-center whitespace-nowrap border-b-4 px-3 pt-1 text-[13px] font-bold uppercase tracking-wide transition-colors ${isActive ? 'border-gold text-primary' : 'border-transparent text-ink-900 hover:border-gold'}`

  return (
    <header className="sticky top-0 z-50 border-b border-[#eaeaec] bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:h-20 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Prosper Infotech Shop home">
          <img src={logo} alt="Prosper Infotech" className="h-8 w-auto md:h-9" />
          <span className="hidden border-l border-[#d4d5d9] pl-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark sm:inline">Shop</span>
        </Link>

        <nav aria-label="Product categories" className="ml-4 hidden h-full xl:block">
          <ul className="flex h-full items-stretch">
            <li>
              <NavLink to="/c/all" className={link}>
                All
              </NavLink>
            </li>
            {links.map((c) => (
              <li key={c.slug}>
                <NavLink to={`/c/${c.slug}`} className={link}>
                  {NAV_SHORT[c.slug] || c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <SearchBar id="header-search" className="ml-auto hidden w-full max-w-[420px] md:block" />

        <div className="ml-auto flex items-center gap-1 md:ml-2 md:gap-2">
          <NavIcon to="/account" label="Profile" icon={User} className="hidden sm:flex" />
          <NavIcon to="/wishlist" label="Wishlist" icon={Heart} badge={wishlist.length} className="hidden sm:flex" />
          <CartButton />
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar id="header-search-mobile" />
      </div>

      <nav aria-label="Product categories" className="border-t border-[#eaeaec] xl:hidden">
        <ul className="mx-auto flex h-11 max-w-[1400px] items-stretch overflow-x-auto px-2 [scrollbar-width:none] lg:px-6 [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <NavLink to="/c/all" className={link}>
              All
            </NavLink>
          </li>
          {links.map((c) => (
            <li key={c.slug} className="shrink-0">
              <NavLink to={`/c/${c.slug}`} className={link}>
                {NAV_SHORT[c.slug] || c.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
