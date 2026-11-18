import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import logo from '../../assets/logo-light.png'
import { useCart } from '../../shop/shopContext'
import { COMPANY_URL } from '../../shop/site'

// Popular searches, grouped by category. Each term opens a search of the whole shop.
const SEARCHES = {
  'tags-labels': ['UHF RFID tags', 'RFID labels', 'on-metal RFID tag', 'RFID wristband', 'laundry tag', 'jewellery tag', 'windshield tag'],
  'smart-cards-nfc': ['NFC cards', 'MIFARE card', 'proximity card', 'NFC sticker', 'NFC business card', 'smart card reader'],
  'readers-antennas': ['UHF RFID reader', 'handheld RFID reader', 'fixed RFID reader', 'RFID antenna', 'long range reader'],
  'barcode-scanners': ['barcode scanner', 'wireless barcode scanner', '2D scanner', 'Zebra scanner', 'Honeywell scanner', 'tabletop scanner'],
  'printers-encoders': ['barcode printer', 'label printer', 'Zebra printer', 'TSC printer', 'receipt printer', 'ID card printer'],
  'consumables-spares': ['wax ribbon', 'resin ribbon', 'barcode labels', 'thermal paper roll', 'print head'],
  'pos-kiosks': ['Android POS', 'Windows POS', 'handheld POS', 'cash drawer', 'self order kiosk'],
  'security-access': ['biometric attendance machine', 'access controller', 'EM lock', 'EAS tag', 'boom barrier', 'turnstile'],
  'office-equipment': ['paper shredder', 'note counting machine', 'laminator', 'electronic locker'],
}

const INFO = [
  { label: 'About us', path: '/about' },
  { label: 'Brands', path: '/brands' },
  { label: 'Bulk & corporate orders', path: '/bulk-order' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact us', path: '/contact' },
  { label: 'My account and orders', path: '/account' },
]
const POLICIES = [
  { label: 'Shipping policy', path: '/shipping-policy' },
  { label: 'Returns & refunds', path: '/returns-refunds' },
  { label: 'Warranty', path: '/warranty' },
  { label: 'Terms of sale', path: '/terms-of-sale' },
  { label: 'Privacy policy', path: '/privacy-policy' },
]

export default function Footer() {
  const { categories, config } = useCart()
  const year = new Date().getFullYear()
  const link = 'inline-block py-0.5 text-sm text-white/70 transition-colors hover:text-gold'
  const heading = 'mb-4 text-sm font-extrabold uppercase tracking-[0.12em] !text-white'
  const groups = categories.filter((c) => SEARCHES[c.slug])

  return (
    <footer>
      {groups.length > 0 && (
        <section aria-label="Popular searches" className="border-t border-[#eaeaec] bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">
            <h2 className="text-base font-extrabold">Popular searches</h2>
            <dl className="mt-4 flex flex-col gap-2.5 text-[13px] leading-relaxed">
              {groups.map((c) => (
                <div key={c.slug}>
                  <dt className="inline font-bold text-ink-900">
                    <Link to={`/c/${c.slug}`} className="hover:text-primary">
                      {c.name}
                    </Link>
                    :{' '}
                  </dt>
                  <dd className="inline text-[#696e79]">
                    {SEARCHES[c.slug].map((term, i) => (
                      <span key={term}>
                        {i > 0 && <span className="px-1.5 text-[#c3c4c9]">|</span>}
                        <Link to={`/c/all?q=${encodeURIComponent(term)}`} className="hover:text-primary hover:underline">
                          {term}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <div className="bg-primary-dark">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] lg:px-8">
          <div>
            <Link to="/" className="inline-flex rounded-md bg-white px-3 py-2">
              <img src={logo} alt="Prosper Infotech" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              RFID, barcode, POS and security hardware for Indian businesses, sold and supported by the team that installs it. Prices include GST.
            </p>
            <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-bold text-gold hover:underline">
              Prosper Infotech company website
            </a>
          </div>

          <nav aria-label="Shop categories">
            <h2 className={heading}>Shop</h2>
            <ul className="flex flex-col gap-1.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/c/${c.slug}`} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information">
            <h2 className={heading}>Information</h2>
            <ul className="flex flex-col gap-1.5">
              {INFO.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Policies">
            <h2 className={heading}>Policies</h2>
            <ul className="flex flex-col gap-1.5">
              {POLICIES.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              {config.support_phone && (
                <li>
                  <a href={`tel:${config.support_phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 hover:text-gold">
                    <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {config.support_phone}
                  </a>
                </li>
              )}
              {config.whatsapp_number && (
                <li>
                  <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-gold">
                    <MessageCircle className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    WhatsApp us
                  </a>
                </li>
              )}
              {config.support_email && (
                <li>
                  <a href={`mailto:${config.support_email}`} className="flex items-center gap-2.5 break-all hover:text-gold">
                    <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {config.support_email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                Ganesham A Commercial, Office No. 17-18, 3rd Floor, Pimple Saudagar, Pune 411027
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row lg:px-8">
            <span>&copy; {year} Prosper Infotech. All rights reserved.</span>
            <span>Pay by UPI, cards, net banking or bank transfer · GST invoice on every order</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
