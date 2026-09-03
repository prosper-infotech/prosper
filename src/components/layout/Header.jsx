import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react'
import { NAV } from '../../data/navigation'
import logo from '../../assets/logo-light.png'

const NAV_ITEMS = NAV.filter((item) => !item.hideFromNav && item.path !== '/' && item.label !== 'Industries').map(
  (item) => (item.label === 'Resources' ? { ...item, label: 'Company' } : item)
)

function NavDropdown({ item, align }) {
  const groups = item.children
  const hasNestedGroups = groups.some((group) => group.children)

  return (
    <div
      className={`invisible absolute top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
        align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary-dark to-[#081a3d] p-8 shadow-[0_32px_64px_-16px_rgba(8,26,61,0.5)]">
        {hasNestedGroups ? (
          <div
            className="grid gap-x-14 gap-y-1"
            style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(190px, 1fr))` }}
          >
            {groups.map((group) => (
              <div key={group.path}>
                <Link
                  to={group.path}
                  className="mb-4 block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-gold"
                >
                  {group.label}
                </Link>
                <ul className="flex flex-col gap-3">
                  {(group.children ?? []).map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} className="block text-sm font-medium text-white/90 hover:text-gold">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid gap-x-10 gap-y-1"
            style={{
              gridTemplateColumns: `repeat(${groups.length > 8 ? 3 : groups.length > 4 ? 2 : 1}, minmax(200px, 1fr))`,
            }}
          >
            {groups.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                className="rounded-lg px-2 py-2 text-sm font-semibold text-white/90 hover:bg-white/5 hover:text-gold"
              >
                {child.label}
                {child.description && (
                  <span className="mt-0.5 block text-xs font-normal text-white/40">{child.description}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? 'bg-[#fffdf6]/90 backdrop-blur-md shadow-[0_1px_0_rgba(20,52,109,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
        <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Prosper Infotech" className="h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV_ITEMS.map((item, i) => (
            <div key={item.path} className="group relative">
              <Link
                to={item.path}
                className="relative flex items-center gap-1 whitespace-nowrap px-4 py-2 text-[15px] font-medium text-ink-900 transition-colors hover:text-primary"
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-4 w-4 text-ink-500 transition-transform group-hover:rotate-180" />
                )}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-gold-dark transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              {item.children && (
                <NavDropdown item={item} align={i >= NAV_ITEMS.length - 2 ? 'right' : 'center'} />
              )}
            </div>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-900/70 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary hover:text-white"
        >
          Book A Demo
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/20 text-ink-900 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto border-t border-ink-300/40 bg-[#fffdf6] px-6 py-4 lg:hidden">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="border-b border-ink-300/40 last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-[15px] font-medium text-ink-900"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setOpenAccordion((cur) => (cur === item.path ? null : item.path))}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="flex h-10 w-10 items-center justify-center text-ink-500"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openAccordion === item.path ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>
                {item.children && openAccordion === item.path && (
                  <ul className="flex flex-col gap-1 pb-3 pl-4">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-ink-600 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-full border border-ink-900/70 px-5 py-2.5 text-sm font-semibold text-ink-900"
          >
            Book A Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  )
}
