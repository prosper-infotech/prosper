import { useEffect, useRef, useState } from 'react'
import { Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { OFFICES } from '../../data/offices'

export default function CallDropdown() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Call us"
        aria-expanded={open}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-primary shadow-md transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-40 mt-3 w-60 rounded-lg bg-gradient-to-b from-navy/95 to-primary-dark/95 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden"
          >
            {OFFICES.map((office) => (
              <a
                key={office.country}
                href={`tel:${office.phone.replace(/\s+/g, '')}`}
                onClick={() => {
                  window.gtag?.('event', 'click_to_call', {
                    event_category: 'Header',
                    event_label: office.country,
                  })
                  setOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 text-white transition-colors hover:bg-white/10 hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                    {office.country}
                  </span>
                  <span className="text-sm font-semibold">{office.phone}</span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
