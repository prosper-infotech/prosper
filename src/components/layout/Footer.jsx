import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { NAV } from '../../data/navigation'
import { OFFICES } from '../../data/offices'
import logo from '../../assets/logo-dark.png'

const FOOTER_COLUMNS = NAV.filter((item) => item.children).slice(0, 3)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img
              src={logo}
              alt="Prosper Infotech"
              className="h-12 w-auto transition-opacity duration-200 hover:opacity-90"
            />
          </Link>
          <p className="mt-4 text-sm text-ink-300">
            Efficient Yards, Accurate Mapping, Intelligent Solutions with IoT, RFID, GPS, and AI.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.path}>
            <h3 className="font-heading font-semibold text-white mb-4">{column.label}</h3>
            <ul className="flex flex-col gap-2">
              {column.children.slice(0, 6).map((child) => (
                <li key={child.path}>
                  <Link to={child.path} className="text-sm text-ink-300 hover:text-gold transition-colors">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
          <ul className="flex flex-col gap-4">
            {OFFICES.map((office) => (
              <li key={office.country} className="text-sm text-ink-300">
                <div className="text-white font-semibold">{office.country}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" />
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    {office.address}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-300">
          <span>&copy; {year} Prosper Infotech. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span>Dallas, TX &middot; Pune, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
