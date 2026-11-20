import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRight, BadgeCheck, BellRing, CheckCircle2, Lock, Mail, Sparkles, Tag, X } from 'lucide-react'
import logo from '../../assets/logo-light.png'
import { useShop } from '../shopContext'
import { api } from '../api'
import { metaLead } from '../track'
import { Spinner } from './ui'
import { EMAIL_RE } from '../../../shared/india.js'

const SEEN_KEY = 'shop_popup_seen'
const DONE_KEY = 'shop_popup_done'
const WAIT_MS = 8_000 // show after 8 seconds on the shop...
const EXIT_AFTER_MS = 4_000 // ...or sooner on a computer, when the mouse heads for the tab bar
const QUIET_DAYS = 7 // after "No, thanks" or closing, not again for a week
const SKIP = /^\/(checkout|cart|order|account)/ // never interrupt buying or account pages

const PERKS = [
  { icon: Sparkles, text: 'New arrivals before anyone else' },
  { icon: Tag, text: 'Member-only offers and price drops' },
  { icon: BadgeCheck, text: 'Buying tips from our RFID & barcode experts' },
]

// Browser storage can be missing or full (private mode); never let that break the page.
const get = (area, key) => {
  try {
    return window[area].getItem(key)
  } catch {
    return null
  }
}
const put = (key, value) => {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // ignore: it may simply show again next visit
  }
}

// "Stay updated" sign-up pop-up: mobile number and/or email. Shown once to new
// visitors; sign-ups are emailed to the sales team.
export default function WelcomePopup() {
  const { pathname } = useLocation()
  const { drawerOpen, products } = useShop()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false) // at most once per visit
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // bots fill this hidden field
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const first = useRef(null)

  const allowed = useMemo(() => {
    if (SKIP.test(pathname)) return false
    if (get('localStorage', DONE_KEY) || get('sessionStorage', 'lp_lead_submitted')) return false
    return Date.now() - (Number(get('localStorage', SEEN_KEY)) || 0) > QUIET_DAYS * 86_400_000
  }, [pathname])

  useEffect(() => {
    if (!allowed || shown || drawerOpen) return undefined
    const started = Date.now()
    let timer
    const show = () => {
      // Another window is open (e.g. "Request price"): try again a little later.
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) {
        clearTimeout(timer)
        timer = setTimeout(show, 10_000)
        return
      }
      setShown(true)
      setOpen(true)
      put(SEEN_KEY, String(Date.now()))
    }
    timer = setTimeout(show, WAIT_MS)
    const onLeave = (e) => {
      if (!e.relatedTarget && e.clientY <= 0 && Date.now() - started > EXIT_AFTER_MS) show()
    }
    document.addEventListener('mouseout', onLeave)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [allowed, shown, drawerOpen])

  useEffect(() => {
    if (!open) return undefined
    // Focus the first box on computers only: on phones it would pop the keyboard up at once.
    if (window.matchMedia?.('(pointer: fine)').matches) first.current?.focus()
    document.body.dataset.popup = 'open' // hides the chat bubble while the pop-up is up (index.css)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // the page behind stays still
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      delete document.body.dataset.popup
      document.body.style.overflow = overflow
    }
  }, [open])

  // Three product photos from different categories for the showcase panel.
  const showcase = useMemo(() => {
    const out = []
    for (const p of products) {
      if (p.images?.length && p.brand !== 'Prosper Infotech' && !out.some((o) => o.category === p.category)) out.push(p)
      if (out.length === 3) break
    }
    return out
  }, [products])

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (!digits && !email.trim()) return setError('Please enter your mobile number or email.')
    if (digits && digits.length !== 10) return setError('Please enter a 10-digit mobile number.')
    if (email.trim() && !EMAIL_RE.test(email.trim())) return setError('Please enter a valid email address.')
    setError('')
    setStatus('sending')
    try {
      await api('/shop/enquiry', { method: 'POST', body: { kind: 'subscribe', phone: digits ? `+91 ${digits}` : '', email: email.trim(), website, page: pathname } })
      window.gtag?.('event', 'sign_up', { method: 'Shop pop-up' })
      metaLead('Shop pop-up sign-up')
      put(DONE_KEY, '1')
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const field =
    'h-12 w-full rounded-xl border border-[#dfe3ea] bg-[#f7f8fb] px-4 text-sm text-ink-900 placeholder:text-[#9aa0ad] transition focus:border-gold-dark focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/25'

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#071a3a]/70 p-0 backdrop-blur-[3px] animate-[fadeIn_.25s_ease-out] sm:items-center sm:p-4" onClick={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-t-3xl bg-white shadow-[0_30px_80px_-20px_rgba(7,26,58,0.6)] animate-[popIn_.45s_cubic-bezier(.2,.9,.3,1.2)] motion-reduce:animate-none sm:rounded-3xl md:grid-cols-[1.05fr_1fr]"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/25 md:bg-[#f0f2f6] md:text-[#535766] md:hover:bg-[#e4e7ee]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Showcase: navy panel, gold glow, floating product photos */}
        <div className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_0%_0%,#1f4a93_0%,#14346d_45%,#0b2147_100%)] px-6 pb-6 pt-7 text-white md:px-8 md:pb-8 md:pt-9">
          <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-[#4f7dd1]/30 blur-3xl" aria-hidden="true" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
            <defs>
              <pattern id="popup-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M22 0H0V22" fill="none" stroke="#fff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#popup-grid)" />
          </svg>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
              <BellRing className="h-3.5 w-3.5" />
              Prosper Insider
            </span>
            <h2 id="popup-title" className="mt-4 text-[26px] font-extrabold leading-[1.1] !text-white md:text-[32px]">
              Be the first to know about{' '}
              <span className="relative whitespace-nowrap text-gold">
                new hardware
                <svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-2.5 w-full" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9C50 3 150 2 198 7" fill="none" stroke="#f7dd00" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <ul className="mt-6 hidden flex-col gap-3 md:flex">
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-white/90">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                    <Icon className="h-4 w-4 text-gold" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {showcase.length === 3 && (
            <div className="relative mt-6 hidden h-[132px] md:block" aria-hidden="true">
              {showcase.map((p, i) => (
                <span
                  key={p.id}
                  className={`absolute flex h-[112px] w-[112px] items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.5)] ${
                    ['left-0 top-4 -rotate-6', 'left-[34%] top-0 z-10 rotate-2 scale-110', 'right-0 top-5 rotate-6'][i]
                  }`}
                >
                  <img src={p.images[0]} alt="" loading="lazy" className="h-full w-full object-contain" />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center px-6 pb-7 pt-6 md:px-8 md:py-9">
          {status === 'done' ? (
            <div className="flex flex-col items-center py-6 text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6ef]">
                <CheckCircle2 className="h-9 w-9 text-[#0f8a5f]" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xl font-extrabold text-primary">You&rsquo;re in!</p>
              <p className="mt-1.5 max-w-[260px] text-sm text-[#535766]">We&rsquo;ll send you new arrivals, offers and tips. Happy shopping.</p>
              <button type="button" onClick={() => setOpen(false)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark">
                Continue shopping
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
              <img src={logo} alt="Prosper Infotech" className="mb-1 hidden h-9 w-auto self-start md:block" />
              <p className="text-base font-bold text-ink-900">Get updates on WhatsApp or email</p>
              <p className="-mt-2 text-sm text-[#696e79]">Just one of them is enough.</p>

              <label className="sr-only" htmlFor="popup-phone">
                Mobile number
              </label>
              <div className="flex h-12 overflow-hidden rounded-xl border border-[#dfe3ea] bg-[#f7f8fb] transition focus-within:border-gold-dark focus-within:bg-white focus-within:ring-4 focus-within:ring-gold/25">
                <span className="flex items-center gap-1.5 pl-4 pr-2 text-sm font-bold text-ink-900">
                  <span aria-hidden="true">🇮🇳</span>+91
                </span>
                <input
                  ref={first}
                  id="popup-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d ]/g, ''))}
                  placeholder="WhatsApp number"
                  className="min-w-0 flex-1 bg-transparent pr-4 text-sm text-ink-900 placeholder:text-[#9aa0ad] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#b0b5c0]" aria-hidden="true">
                <span className="h-px flex-1 bg-[#e6e9ef]" />
                or
                <span className="h-px flex-1 bg-[#e6e9ef]" />
              </div>

              <label className="sr-only" htmlFor="popup-email">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa0ad]" aria-hidden="true" />
                <input id="popup-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className={`${field} pl-10`} />
              </div>

              <div className="hidden" aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              {error && (
                <p className="text-sm font-semibold text-[#d6262f]" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-gold text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_24px_-10px_rgba(224,199,0,0.9)] transition hover:-translate-y-0.5 hover:bg-gold-dark disabled:opacity-70"
              >
                {status === 'sending' ? <Spinner /> : null}
                Keep me updated
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-[#8a8f9c]">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                No spam. Unsubscribe any time.
              </p>
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold text-[#7e818c] underline-offset-4 hover:text-primary hover:underline">
                Maybe later
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
