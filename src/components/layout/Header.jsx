import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { NAV } from '../../data/navigation'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'
import Button from '../ui/Button'
import WhatsAppLink from './WhatsAppLink'
import CallDropdown from './CallDropdown'
import logo from '../../assets/logo-dark.png'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [location.pathname])

  const solid = scrolled || openMenu

  return (
    <header
      className={`sticky top-0 z-50 lg:top-9 backdrop-blur-md transition-all duration-300 border-b ${
        solid ? 'bg-navy/95 shadow-lg border-white/5' : 'bg-navy-overlay border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={logo}
              alt="Prosper Infotech"
              className="h-12 w-auto transition-opacity duration-200 hover:opacity-90 md:h-14"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.filter((item) => !item.hideFromNav).map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => item.children && setOpenMenu(null)}
              >
                <Link
                  to={item.path}
                  className="flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {item.children && openMenu === item.label && (
                    <MegaMenu item={item} onNavigate={() => setOpenMenu(null)} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="https://calendly.com/prosperinfotech-sales/30min"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={false}
              className="whitespace-nowrap"
            >
              Book a demo
            </Button>
            <WhatsAppLink
              eventCategory="Header"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-md transition-transform hover:scale-105"
              iconClassName="h-6 w-6"
            />
            <CallDropdown />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <CallDropdown />
            <button
              type="button"
              className="text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
