import { useEffect } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingLeadForm from '../forms/LandingLeadForm'

// Quote request popup. `product` is the product name to quote for, or null
// when closed. The product is passed to the lead form so it reaches the CRM.
export default function QuoteModal({
  product,
  options,
  campaign,
  onClose,
  title = 'Request a quote',
  intro = 'Tell us what you need and how many. We will reply with price and delivery time within one business day.',
  submitLabel = 'Request price',
  label,
}) {
  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={label || `Request a quote for ${product}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-md bg-white ring-2 ring-gold/50 max-h-[90vh] overflow-y-auto"
          >
            <div className="h-2 rounded-t-2xl bg-gold" />
            <div className="p-6 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-surface-alt hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="pr-8 font-heading font-bold text-primary text-2xl">{title}</h3>
              <p className="text-sm text-ink-600 mt-1 mb-5">{intro}</p>

              <LandingLeadForm
                campaign={campaign}
                product={product}
                defaultService={product}
                serviceLabel="Product"
                serviceOptions={options}
                submitLabel={submitLabel}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
