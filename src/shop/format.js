// Shared class names, labels and formatters for shop and admin pages.
export const btn = {
  gold: 'inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60',
  navy: 'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark disabled:pointer-events-none disabled:opacity-60',
  ghost: 'inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-white px-5 py-3 text-sm font-bold text-primary transition-all duration-200 hover:border-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60',
}

export const STATUS_LABEL = {
  pending_payment: 'Awaiting payment',
  paid: 'Paid',
  processing: 'Being packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}

export const PAYMENT_LABEL = { razorpay: 'Online payment', bank_transfer: 'Bank transfer', upi_manual: 'UPI' }

export const formatDate = (iso, withTime = false) =>
  iso
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}), timeZone: 'Asia/Kolkata' }).format(new Date(iso))
    : ''

export const inputClass =
  'w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-500/70 transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold aria-[invalid=true]:border-red-500'
