import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingLeadForm from './LandingLeadForm'

export default function LeadFormPopup({
  campaign,
  title = "Let's get you started",
  description = "Tell us a bit about what you need — we'll follow up within one business day.",
  submitLabel,
  serviceLabel,
  serviceOptions,
  delay = 6000,
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const seenKey = `lp_popup_seen_${campaign}`
    if (sessionStorage.getItem(seenKey) || sessionStorage.getItem('lp_lead_submitted')) return

    const timer = setTimeout(() => {
      sessionStorage.setItem(seenKey, '1')
      setOpen(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [campaign, delay])

  const close = () => setOpen(false)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg"
          >
            <motion.div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gold/20 blur-2xl"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative rounded-2xl bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] ring-2 ring-gold/50 max-h-[90vh] overflow-y-auto">
              <div className="h-2 rounded-t-2xl bg-gradient-to-r from-gold via-gold-dark to-gold" />

              <div className="p-6 sm:p-8">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-surface-alt hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-gold-dark" />
                  Limited availability
                </span>

                <h3 className="mt-3 pr-8 font-heading font-bold text-primary text-2xl">{title}</h3>
                <p className="text-sm text-ink-600 mt-1 mb-5">{description}</p>

                <LandingLeadForm
                  campaign={campaign}
                  submitLabel={submitLabel}
                  serviceLabel={serviceLabel}
                  serviceOptions={serviceOptions}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
