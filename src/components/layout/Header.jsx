import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Heart, LayoutGrid, MapPin, Search, User } from 'lucide-react'
import logo from '../../assets/logo-dark.png'
import CartButton from '../../shop/components/CartButton'
import { CategoryIcon, ProductImage } from '../../shop/components/ui'
import { useShop } from '../../shop/shopContext'
import { formatINR, hasPrice } from '../../../shared/pricing.js'
import { deliveryEstimate, PINCODE_RE } from '../../../shared/india.js'

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
      <form onSubmit={submit} role="search" className="flex overflow-hidden rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-gold">
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
          placeholder="Search RFID tags, readers, scanners, printers..."
          className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-ink-900 placeholder:text-ink-500 focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="flex h-11 w-14 shrink-0 items-center justify-center bg-gold text-primary transition-colors hover:bg-gold-dark">
          <Search className="h-5 w-5" />
        </button>
      </form>

      {showList && (
        <div id={listId} role="listbox" className="absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-ink-300/70 bg-white shadow-2xl">
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
                  <span className="w-10 shrink-0 overflow-hidden rounded-md border border-ink-300/60">
                    <ProductImage product={p} ratio="aspect-square" iconSize="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-900">{p.name}</span>
                  <span className="shrink-0 text-sm font-bold text-primary">{hasPrice(p) ? formatINR(p.price_paise) : 'On quote'}</span>
                </Link>
              ))}
              <button type="button" onClick={submit} className="block w-full border-t border-ink-300/60 bg-surface px-3 py-2.5 text-left text-sm font-bold text-primary hover:bg-surface-alt">
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

function DeliverTo() {
  const { pincode, setPincode, config } = useShop()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(pincode)
  const [error, setError] = useState('')
  const box = useRef(null)
  const estimate = deliveryEstimate(pincode, config)

  useEffect(() => {
    if (!open) return
    const away = (e) => !box.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const save = (e) => {
    e.preventDefault()
    if (!PINCODE_RE.test(value)) return setError('Enter a 6-digit PIN code.')
    setError('')
    setPincode(value)
    setOpen(false)
  }

  return (
    <div ref={box} className="relative hidden shrink-0 lg:block">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex h-11 items-center gap-2 rounded-lg px-2.5 text-left text-white transition-colors hover:bg-white/10">
        <MapPin className="h-5 w-5 text-gold" />
        <span className="leading-tight">
          <span className="block text-[11px] text-white/70">Deliver to</span>
          <span className="block text-sm font-bold">{pincode || 'Enter PIN code'}</span>
        </span>
      </button>
      {open && (
        <form onSubmit={save} className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-ink-300/70 bg-white p-4 shadow-2xl">
          <label htmlFor="deliver-pin" className="block text-sm font-bold text-primary">
            Where should we deliver?
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="deliver-pin"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/\D/g, ''))}
              placeholder="PIN code"
              className="h-10 min-w-0 flex-1 rounded-lg border border-ink-300 px-3 text-sm text-ink-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary-dark">
              Save
            </button>
          </div>
          {error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
          {estimate && !error && (
            <p className="mt-2 text-xs text-ink-600">
              Delivery to {pincode}: usually {estimate.min} to {estimate.max} working days after dispatch.
            </p>
          )}
        </form>
      )}
    </div>
  )
}

export default function Header() {
  const { categories, products, wishlist } = useShop()
  const links = categories.filter((c) => products.some((p) => p.category === c.slug))
  const action = 'relative flex h-11 shrink-0 items-center gap-2 rounded-lg px-2.5 text-white transition-colors hover:bg-white/10'

  return (
    <header className="sticky top-0 z-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.35)]">
      <div className="bg-primary-dark">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-5">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Prosper Infotech Shop home">
            <img src={logo} alt="Prosper Infotech" className="h-9 w-auto sm:h-10" />
            <span className="hidden rounded bg-gold px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-primary sm:inline">Shop</span>
          </Link>

          <DeliverTo />
          <SearchBar id="header-search" className="mx-1 hidden min-w-0 flex-1 md:block" />

          <div className="ml-auto flex items-center md:ml-0">
            <Link to="/account" className={action} aria-label="My account and orders">
              <User className="h-6 w-6" />
              <span className="hidden leading-tight xl:block">
                <span className="block text-[11px] text-white/70">Hello, sign in</span>
                <span className="block text-sm font-bold">Account &amp; orders</span>
              </span>
            </Link>
            <Link to="/wishlist" className={`${action} hidden sm:flex`} aria-label={`Wishlist, ${wishlist.length} item${wishlist.length === 1 ? '' : 's'}`}>
              <span className="relative">
                <Heart className="h-6 w-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-2.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-extrabold text-primary">{wishlist.length}</span>
                )}
              </span>
              <span className="hidden text-sm font-bold xl:inline">Wishlist</span>
            </Link>
            <CartButton />
          </div>
        </div>
        <div className="px-3 pb-2.5 md:hidden">
          <SearchBar id="header-search-mobile" />
        </div>
      </div>

      <nav aria-label="Product categories" className="bg-primary">
        <ul className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <NavLink to="/c/all" className={({ isActive }) => `flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[13px] font-bold ${isActive ? 'text-gold' : 'text-white hover:text-gold'}`}>
              <LayoutGrid className="h-4 w-4" />
              All products
            </NavLink>
          </li>
          {links.map((c) => (
            <li key={c.slug} className="shrink-0">
              <NavLink to={`/c/${c.slug}`} className={({ isActive }) => `flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[13px] font-semibold ${isActive ? 'text-gold' : 'text-white/90 hover:text-gold'}`}>
                <CategoryIcon category={c} className="h-4 w-4" />
                {c.name}
              </NavLink>
            </li>
          ))}
          <li className="ml-auto hidden shrink-0 lg:block">
            <Link to="/contact" className="block whitespace-nowrap px-3 py-2 text-[13px] font-semibold text-white/90 hover:text-gold">
              Bulk orders &amp; support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
