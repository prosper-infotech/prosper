import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { NAV } from '../../data/navigation'
import { SOCIAL_LINKS } from '../../data/socialLinks'
import { OFFICES } from '../../data/offices'
import logo from '../../assets/logo-light.png'

const FOOTER_COLUMNS = NAV.filter((item) => item.children).slice(0, 3)

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-300/60">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src={logo} alt="Prosper Infotech" className="h-14 w-auto" />
          </Link>
          <p className="mt-4 text-sm font-semibold text-ink-900">
            Automating global logistics operations using AI.
          </p>
          <p className="mt-3 max-w-sm text-sm text-ink-500">
            Prosper Infotech engineers AI, computer vision, RFID, GPS and IoT platforms that bring real-time
            visibility and automation to warehouses, yards, fleets and container terminals.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-300 text-ink-600 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_COLUMNS.slice(0, 2).map((column, i) => (
            <div key={column.path} className={i === 1 ? 'flex flex-col gap-8' : undefined}>
              <div>
                <h3 className="mb-4 font-heading font-semibold text-primary">{column.label}</h3>
                <ul className="flex flex-col gap-2.5">
                  {column.children.slice(0, 7).map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} className="text-sm text-ink-600 hover:text-primary">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {i === 1 && FOOTER_COLUMNS[2] && (
                <div>
                  <h3 className="mb-4 font-heading font-semibold text-primary">{FOOTER_COLUMNS[2].label}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {FOOTER_COLUMNS[2].children.slice(0, 7).map((child) => (
                      <li key={child.path}>
                        <Link to={child.path} className="text-sm text-ink-600 hover:text-primary">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-heading font-semibold text-primary">Contact</h3>
            <ul className="flex flex-col gap-4">
              {OFFICES.map((office) => (
                <li key={office.country} className="text-sm text-ink-600">
                  <div className="font-semibold text-ink-900">{office.country}</div>
                  <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="mt-1 flex items-center gap-2 hover:text-primary">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{office.phone}</span>
                  </a>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-start gap-2 hover:text-primary"
                  >
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{office.address}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-300/60">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-ink-500 sm:flex-row">
          <span>&copy; {year} Prosper Infotech. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/about" className="transition-colors hover:text-primary">
              About Us
            </Link>
            <Link to="/privacy-policy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
