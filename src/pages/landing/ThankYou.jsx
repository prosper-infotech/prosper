import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, PhoneCall, Mail } from 'lucide-react'
import Button from '../../components/ui/Button'
import { OFFICES } from '../../data/offices'
import { SOCIAL_LINKS } from '../../data/socialLinks'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const usaPhone = OFFICES[0].phone

export default function ThankYou() {
  const navigate = useNavigate()

  useDocumentTitle(
    'Thank You | Prosper Infotech',
    'Thanks for reaching out to Prosper Infotech — our team will be in touch shortly.'
  )

  useEffect(() => {
    // Only reachable right after a real form submission (see LandingLeadForm) —
    // keeps this URL usable as a Google Ads "page load" conversion trigger
    // without counting direct visits/bookmarks as leads.
    if (!sessionStorage.getItem('lp_lead_submitted')) {
      navigate('/', { replace: true })
      return
    }

    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [navigate])

  return (
    <section className="relative bg-gradient-to-b from-primary-dark to-navy overflow-hidden min-h-[70vh] flex items-center">
      <div className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative max-w-2xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[0_0_60px_-8px_rgba(247,221,0,0.5)]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="text-white text-3xl md:text-4xl">You're all set!</h1>
        <p className="text-white/80 text-lg max-w-lg">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a
            href={`tel:${usaPhone.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/15 px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <PhoneCall className="h-4 w-4 text-gold" /> {usaPhone}
          </a>
          <a
            href="mailto:sales@prosperinfotech.com"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/15 px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <Mail className="h-4 w-4 text-gold" /> sales@prosperinfotech.com
          </a>
        </div>
        <Button to="/" variant="primary-dark" className="mt-4">
          Back to homepage
        </Button>

        <div className="flex flex-col items-center gap-3 mt-6 pt-6 border-t border-white/10 w-full max-w-xs">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Follow us
          </span>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/15 text-white/70 hover:text-gold hover:border-gold/40 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
