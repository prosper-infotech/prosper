import { Phone } from 'lucide-react'
import { useOutlet } from 'react-router-dom'
import logo from '../../assets/logo-dark.png'
import { OFFICES } from '../../data/offices'

const usaPhone = OFFICES[0].phone

export default function LandingLayout() {
  const element = useOutlet()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <img src={logo} alt="Prosper Infotech" className="h-11 w-auto" />
          <a
            href={`tel:${usaPhone.replace(/\s+/g, '')}`}
            onClick={() =>
              window.gtag?.('event', 'click_to_call', { event_category: 'AS400 Landing Page' })
            }
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs sm:text-sm font-semibold text-primary shadow-sm hover:bg-gold-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">On-Call Support:</span> {usaPhone}
          </a>
        </div>
      </header>

      <main className="flex-1">{element}</main>

      <footer className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-300">
          <span>&copy; {new Date().getFullYear()} Prosper Infotech. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="mailto:sales@prosperinfotech.com" className="hover:text-gold transition-colors">
              sales@prosperinfotech.com
            </a>
            <a href={`tel:${usaPhone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">
              {usaPhone}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
