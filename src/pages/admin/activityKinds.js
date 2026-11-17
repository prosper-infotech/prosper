import { AlertTriangle, CreditCard, FileText, LogIn, Mail, MailWarning, ShieldCheck, ShoppingBag, StickyNote, Truck, UserPlus, XCircle } from 'lucide-react'

// Icon and colour for each kind of activity on the admin timeline.
export const KIND = {
  signin: { icon: LogIn, tone: 'bg-[#eef2f8] text-primary', label: 'Sign-in' },
  signin_staff: { icon: ShieldCheck, tone: 'bg-[#f1eefb] text-[#5b3fb5]', label: 'Staff sign-in' },
  signin_failed: { icon: AlertTriangle, tone: 'bg-[#fff1e8] text-[#c25416]', label: 'Failed sign-in' },
  account: { icon: UserPlus, tone: 'bg-[#eaf6ee] text-[#1f7a43]', label: 'New account' },
  order: { icon: ShoppingBag, tone: 'bg-[#fff7d1] text-[#7a5d00]', label: 'Order' },
  status: { icon: XCircle, tone: 'bg-[#fbeef0] text-[#b4234a]', label: 'Order status' },
  payment: { icon: CreditCard, tone: 'bg-[#eaf6ee] text-[#1f7a43]', label: 'Payment' },
  payment_failed: { icon: AlertTriangle, tone: 'bg-[#fbeef0] text-[#b4234a]', label: 'Payment problem' },
  shipping: { icon: Truck, tone: 'bg-[#e9f5f8] text-[#0d6e86]', label: 'Shipping' },
  email: { icon: Mail, tone: 'bg-[#f5f5f6] text-[#535766]', label: 'Email' },
  email_failed: { icon: MailWarning, tone: 'bg-[#fbeef0] text-[#b4234a]', label: 'Email failed' },
  note: { icon: StickyNote, tone: 'bg-[#f5f5f6] text-[#535766]', label: 'Note' },
  other: { icon: FileText, tone: 'bg-[#f5f5f6] text-[#535766]', label: 'Other' },
}

export const GROUPS = [
  { key: '', label: 'All activity' },
  { key: 'signins', label: 'Sign-ins' },
  { key: 'accounts', label: 'New accounts' },
  { key: 'orders', label: 'Orders' },
  { key: 'payments', label: 'Payments' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'emails', label: 'Emails' },
]

const IST = { timeZone: 'Asia/Kolkata' }
export const dayLabel = (iso) => {
  const day = (d) => new Intl.DateTimeFormat('en-CA', { ...IST, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
  const d = day(new Date(iso))
  if (d === day(new Date())) return 'Today'
  if (d === day(new Date(Date.now() - 864e5))) return 'Yesterday'
  return new Intl.DateTimeFormat('en-IN', { ...IST, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
}
export const timeLabel = (iso) => new Intl.DateTimeFormat('en-IN', { ...IST, hour: 'numeric', minute: '2-digit' }).format(new Date(iso))
