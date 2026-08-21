import { useEffect, useRef, useState } from 'react'
import { Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { OFFICES } from '../../data/offices'

const PANEL_WIDTH = 240
const VIEWPORT_MARGIN = 12

export default function CallDropdown({
  eventCategory = 'Header',
  align = 'right',
  triggerClassName = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-primary shadow-md transition-transform hover:scale-105',
  children,
}) {
  const [open, setOpen] = useState(false)
  const [panelPos, setPanelPos] = useState(null)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function positionPanel() {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()

      let left = align === 'right' ? rect.right - PANEL_WIDTH : rect.left
      left = Math.min(left, window.innerWidth - PANEL_WIDTH - VIEWPORT_MARGIN)
      left = Math.max(left, VIEWPORT_MARGIN)

      setPanelPos({ top: rect.bottom + 8, left })
    }

    positionPanel()
    window.addEventListener('resize', positionPanel)
    window.addEventListener('scroll', positionPanel, true)

    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('resize', positionPanel)
      window.removeEventListener('scroll', positionPanel, true)
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, align])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Call us"
        aria-expanded={open}
        className={triggerClassName}
      >
        {children ?? <Phone className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && panelPos && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'fixed', top: panelPos.top, left: panelPos.left, width: PANEL_WIDTH }}
            className="z-50 rounded-lg bg-gradient-to-b from-navy/95 to-primary-dark/95 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden"
          >
            {OFFICES.map((office) => (
              <a
                key={office.country}
                href={`tel:${office.phone.replace(/\s+/g, '')}`}
                onClick={() => {
                  window.gtag?.('event', 'click_to_call', {
                    event_category: eventCategory,
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
