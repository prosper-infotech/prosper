import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import logo from '../../assets/logo-light.png'
import { useCart } from '../../shop/shopContext'
import { COMPANY_URL } from '../../shop/site'

const HELP = [
  { label: 'My account and orders', path: '/account' },
  { label: 'Contact us', path: '/contact' },
  { label: 'Shipping', path: '/shipping-policy' },
  { label: 'Returns & Refunds', path: '/returns-refunds' },
  { label: 'Warranty', path: '/warranty' },
]
const LEGAL = [
  { label: 'Terms of Sale', path: '/terms-of-sale' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
]

export default function Footer() {
  const { categories, config } = useCart()
  const year = new Date().getFullYear()
  const link = 'text-sm text-[#696e79] hover:text-ink-900'
  return (
    <footer className="border-t border-[#eaeaec] bg-[#fafbfc]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src={logo} alt="Prosper Infotech" className="h-12 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-[#696e79]">
            RFID tags, readers, barcode scanners and printers, sold by the team that installs them. Prices include GST. Delivery across India.
          </p>
          <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-bold text-primary underline decoration-gold decoration-2 underline-offset-4">
            Prosper Infotech company website
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] !text-ink-900">Shop</h3>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link to="/c/all" className={link}>
                All products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/c/${c.slug}`} className={link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] !text-ink-900">Help</h3>
          <ul className="flex flex-col gap-2.5">
            {HELP.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] !text-ink-900">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#696e79]">
            {config.support_phone && (
              <li>
                <a href={`tel:${config.support_phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-ink-900">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {config.support_phone}
                </a>
              </li>
            )}
            {config.support_email && (
              <li>
                <a href={`mailto:${config.support_email}`} className="flex items-center gap-2 hover:text-ink-900">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {config.support_email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Ganesham A Commercial, Office No. 17-18, 3rd Floor, Pimple Saudagar, Pune 411027
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#eaeaec]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-[#94969f] sm:flex-row">
          <span>&copy; {year} Prosper Infotech. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {LEGAL.map((item) => (
              <Link key={item.path} to={item.path} className="transition-colors hover:text-ink-900">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
