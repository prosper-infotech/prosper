import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink-500 hover:text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-heading font-bold text-primary text-2xl pr-8 mb-1">{title}</h3>
            <p className="text-sm text-ink-600 mb-5">{description}</p>
            <LandingLeadForm
              campaign={campaign}
              submitLabel={submitLabel}
              serviceLabel={serviceLabel}
              serviceOptions={serviceOptions}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
