import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BellRing, CheckCircle2, Gift, Lightbulb, Sparkles, X } from 'lucide-react'
import logo from '../../assets/logo-light.png'
import { useShop } from '../shopContext'
import { api } from '../api'
import { Spinner } from './ui'
import { EMAIL_RE } from '../../../shared/india.js'

const SEEN_KEY = 'shop_popup_seen'
const DONE_KEY = 'shop_popup_done'
const WAIT_MS = 8_000 // show after 8 seconds on the shop...
const EXIT_AFTER_MS = 4_000 // ...or sooner on a computer, when the mouse heads for the tab bar
const QUIET_DAYS = 7 // after "No, thanks" or closing, not again for a week
const SKIP = /^\/(checkout|cart|order|account)/ // never interrupt buying or account pages

const BENEFITS = [
  { icon: Gift, text: 'Exclusive offers' },
  { icon: Sparkles, text: 'New product updates' },
  { icon: Lightbulb, text: 'Expert insights' },
  { icon: BellRing, text: 'Early access & more' },
]

const store = (name) => {
  try {
    return window[name]
  } catch {
    return null
  }
}

// "Stay updated" sign-up pop-up: mobile number and/or email. Shown once to new
// visitors; sign-ups are emailed to the sales team.
export default function WelcomePopup() {
  const { pathname } = useLocation()
  const { drawerOpen } = useShop()
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
    const ls = store('localStorage')
    if (ls?.getItem(DONE_KEY) || store('sessionStorage')?.getItem('lp_lead_submitted')) return false
    return Date.now() - (Number(ls?.getItem(SEEN_KEY)) || 0) > QUIET_DAYS * 86_400_000
  }, [pathname])

  useEffect(() => {
    if (!allowed || shown || drawerOpen) return undefined
    const started = Date.now()
    const show = () => {
      setShown(true)
      setOpen(true)
      store('localStorage')?.setItem(SEEN_KEY, String(Date.now()))
    }
    const timer = setTimeout(show, WAIT_MS)
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
    first.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

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
      store('localStorage')?.setItem(DONE_KEY, '1')
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const field = 'h-11 w-full rounded-md border border-[#c9ced8] bg-white px-3 text-sm text-ink-900 placeholder:text-[#94969f] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15'

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0e2851]/55 p-4 animate-[fadeIn_.25s_ease-out]" onClick={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-[640px] overflow-hidden rounded-lg bg-white shadow-2xl sm:grid-cols-[0.95fr_1.05fr]"
      >
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#535766] hover:bg-[#f0f2f6] hover:text-primary">
          <X className="h-5 w-5" />
        </button>

        {/* Left: wave panel with what subscribers get */}
        <div className="relative hidden flex-col justify-end overflow-hidden bg-white p-6 sm:flex" aria-hidden="true">
          <svg viewBox="0 0 300 420" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 0H230C300 60 170 140 230 210C290 280 180 350 250 420H0Z" fill="#14346d" />
            <path d="M0 0H200C262 60 140 140 200 210C262 280 150 350 214 420H0Z" fill="#0e2851" opacity="0.55" />
          </svg>
          <div className="absolute left-6 top-6 grid grid-cols-5 gap-1.5">
            {Array.from({ length: 25 }, (_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-gold/80" />
            ))}
          </div>
          <ul className="relative flex flex-col gap-3.5 pb-6">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: the form */}
        <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center sm:px-8">
          <img src={logo} alt="Prosper Infotech" className="h-10 w-auto" />
          {status === 'done' ? (
            <div className="flex flex-col items-center py-8" role="status">
              <CheckCircle2 className="h-12 w-12 text-[#0f8a5f]" aria-hidden="true" />
              <h2 id="popup-title" className="mt-3 text-xl font-extrabold !text-primary">You are on the list</h2>
              <p className="mt-1 text-sm text-[#535766]">Thank you. We will keep you posted on new products and offers.</p>
              <button type="button" onClick={() => setOpen(false)} className="mt-5 rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
                Continue shopping
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-5 flex w-full flex-col gap-3">
              <h2 id="popup-title" className="text-xl font-extrabold leading-snug !text-ink-900 sm:text-[22px]">
                Stay updated with
                <br />
                Prosper Infotech
              </h2>
              <label className="sr-only" htmlFor="popup-phone">
                Mobile number
              </label>
              <div className="flex h-11 overflow-hidden rounded-md border border-[#c9ced8] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <span className="flex items-center gap-1.5 border-r border-[#e3e6ec] bg-[#f7f8fa] px-3 text-sm font-semibold text-ink-900">
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
                  placeholder="Mobile number"
                  className="min-w-0 flex-1 px-3 text-sm text-ink-900 placeholder:text-[#94969f] focus:outline-none"
                />
              </div>
              <label className="sr-only" htmlFor="popup-email">
                Email address
              </label>
              <input id="popup-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className={field} />
              <div className="hidden" aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              {error && (
                <p className="text-left text-sm text-[#d6262f]" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" disabled={status === 'sending'} className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-70">
                {status === 'sending' && <Spinner />}
                Subscribe
              </button>
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-bold text-primary hover:underline">
                No, thanks
              </button>
              <p className="text-xs leading-relaxed text-[#696e79]">You are signing up to receive messages by phone, WhatsApp or email. You can unsubscribe at any time.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
