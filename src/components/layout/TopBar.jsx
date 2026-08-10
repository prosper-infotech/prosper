import { Mail, Phone } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/socialLinks'

export default function TopBar() {
  return (
    <div className="bg-primary-dark text-white text-xs md:text-sm lg:sticky lg:top-0 lg:z-50">
      <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/70 hover:text-gold transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="mailto:sales@prosperinfotech.com"
            className="flex items-center gap-1.5 text-white/80 hover:text-gold transition-colors"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">sales@prosperinfotech.com</span>
          </a>
          <a
            href="tel:+19407583271"
            className="flex items-center gap-1.5 text-white/80 hover:text-gold transition-colors"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>+1 940 758 3271</span>
          </a>
        </div>
      </div>
    </div>
  )
}
