import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Mail, Menu, Phone, Search, ShoppingCart, User } from 'lucide-react'
import logo from '../../assets/logo-light.png'
import { CategoryIcon, ProductImage } from '../../shop/components/ui'
import { useCart, useShop } from '../../shop/shopContext'
import { formatINR, hasPrice } from '../../../shared/pricing.js'
import { matches as matchesSearch, searchWords } from '../../../shared/search.js'

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
    const words = searchWords(q)
    if (!words.length) return []
    return products.filter((p) => matchesSearch(p, words)).slice(0, 6)
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
      <form onSubmit={submit} role="search" className="flex items-center overflow-hidden rounded-md border border-[#d4d5d9] bg-white focus-within:border-primary">
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
          placeholder="Search products, brands and models"
          className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-white transition-colors hover:bg-primary-dark">
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
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

// Short names for the menu bar. The full list is under "Browse all categories".
const QUICK = [
  ['tags-labels', 'RFID Tags'],
  ['readers-antennas', 'RFID Readers'],
  ['barcode-scanners', 'Barcode Scanners'],
  ['printers-encoders', 'Label Printers'],
  ['pos-kiosks', 'POS'],
  ['security-access', 'Access Control'],
]

function OfferBar() {
  const { config } = useCart()
  const free = config.free_shipping_threshold_paise
  const items = [
    free ? `Free delivery on orders over ${formatINR(free)}` : 'Delivery across India',
    'Prices include GST · GST invoice with every order',
    'Bulk quantity? Get a quote within one business day',
  ]
  return (
    <div className="bg-primary-dark text-white">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-center gap-10 overflow-hidden px-4 text-xs font-semibold lg:justify-between lg:px-8">
        {items.map((t, i) => (
          <span key={t} className={`whitespace-nowrap ${i === 0 ? '' : 'hidden lg:inline'}`}>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function CartSummary() {
  const { count, priced, openDrawer } = useCart()
  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={count ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
      className="group flex shrink-0 items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-ink-900 hover:bg-[#f5f5f6]"
    >
      <span className="relative">
        <ShoppingCart className="h-7 w-7 stroke-[1.5] text-primary" aria-hidden="true" />
        <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-primary">
          {count > 99 ? '99+' : count}
        </span>
      </span>
      <span className="hidden leading-tight md:block">
        <span className="block text-xs text-ink-500">My cart</span>
        <span className="block text-sm font-bold text-primary">{formatINR(priced.subtotal_paise || 0)}</span>
      </span>
    </button>
  )
}

function AllCategories({ categories }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return undefined
    const away = (e) => !box.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])
  return (
    <div ref={box} className="relative h-full shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="all-categories"
        onClick={() => setOpen((o) => !o)}
        className="flex h-full items-center gap-2.5 bg-primary-dark px-4 text-[13px] font-bold uppercase tracking-wide text-white lg:w-64"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Browse all categories</span>
        <span className="sm:hidden">Categories</span>
        <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <ul id="all-categories" className="absolute left-0 top-full z-50 w-72 border border-[#eaeaec] bg-white py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/c/${c.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-ink-900 hover:bg-surface-alt hover:text-primary">
                <CategoryIcon category={c} className="h-[18px] w-[18px] shrink-0 text-primary" />
                {c.name}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-[#eaeaec] pt-1">
            <Link to="/c/all" className="block px-4 py-2.5 text-sm font-bold text-primary hover:bg-surface-alt">
              View all products
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default function Header() {
  const { categories, products, config } = useShop()
  const live = categories.filter((c) => products.some((p) => p.category === c.slug))
  const quick = QUICK.filter(([slug]) => live.some((c) => c.slug === slug))
  const link = ({ isActive }) =>
    `flex h-full items-center whitespace-nowrap border-b-[3px] px-3 pt-[3px] text-[13px] font-bold transition-colors ${isActive ? 'border-gold text-gold' : 'border-transparent text-white hover:text-gold'}`
  const phone = config.support_phone

  return (
    <header className="relative z-50 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] md:sticky md:-top-9">
      <OfferBar />
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:h-[76px] lg:gap-8 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Prosper Infotech Shop home">
          <img src={logo} alt="Prosper Infotech" className="h-8 w-auto md:h-10" />
          <span className="hidden border-l border-[#d4d5d9] pl-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark sm:inline">Shop</span>
        </Link>

        <SearchBar id="header-search" className="hidden flex-1 md:block" />

        <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-3">
          <Link to="/account" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-ink-900 hover:bg-[#f5f5f6]" aria-label="Account and orders">
            <User className="h-7 w-7 stroke-[1.5] text-primary" aria-hidden="true" />
            <span className="hidden leading-tight lg:block">
              <span className="block text-xs text-ink-500">Account</span>
              <span className="block text-sm font-bold text-primary">Log in</span>
            </span>
          </Link>
          <span className="hidden h-9 w-px bg-[#eaeaec] md:block" aria-hidden="true" />
          <CartSummary />
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar id="header-search-mobile" />
      </div>

      <div className="bg-primary">
        <div className="mx-auto flex h-11 max-w-[1400px] items-stretch lg:px-8">
          <AllCategories categories={live} />
          <nav aria-label="Popular categories" className="min-w-0 flex-1">
            <ul className="flex h-full items-stretch overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <li className="shrink-0">
                <NavLink to="/" end className={link}>
                  Home
                </NavLink>
              </li>
              {quick.map(([slug, label]) => (
                <li key={slug} className="shrink-0">
                  <NavLink to={`/c/${slug}`} className={link}>
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="shrink-0">
                <NavLink to="/bulk-order" className={link}>
                  Bulk order
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="hidden shrink-0 flex-col justify-center pl-4 text-right text-xs font-semibold leading-snug text-white xl:flex">
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center justify-end gap-1.5 hover:text-gold">
                <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {phone}
              </a>
            )}
            {config.support_email && (
              <a href={`mailto:${config.support_email}`} className="flex items-center justify-end gap-1.5 hover:text-gold">
                <Mail className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {config.support_email}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
