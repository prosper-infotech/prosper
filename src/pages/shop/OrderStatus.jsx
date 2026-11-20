import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { AlertTriangle, Check, CheckCircle2, Copy, CreditCard, ExternalLink, FileText, Headset, Mail, MessageCircle, PackageSearch, Phone, Smartphone, Truck, XCircle } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { api } from '../../shop/api'
import { payWithRazorpay } from '../../shop/razorpay'
import { track } from '../../shop/track'
import { EmptyState, PageLoading, ProductImage, Spinner, StatusBadge } from '../../shop/components/ui'
import { btn, formatDate, inputClass, PAYMENT_LABEL } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'

const STEP_LABEL = { placed: 'Placed', paid: 'Paid', processing: 'Packed', shipped: 'Shipped', delivered: 'Delivered' }

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false)
  if (!value) return null
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked: the value is still visible to copy by hand
    }
  }
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <dt className="text-sm text-ink-600">{label}</dt>
      <dd className="flex items-center gap-2 text-right text-sm font-bold text-ink-900">
        <span className="break-all">{value}</span>
        <button type="button" onClick={copy} aria-label={`Copy ${label}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary transition-colors hover:bg-white">
          {copied ? <Check className="h-4 w-4 text-[#3f7a0c]" /> : <Copy className="h-4 w-4" />}
        </button>
      </dd>
    </div>
  )
}

function Timeline({ order }) {
  return (
    <ol className="grid grid-cols-5 gap-1" aria-label="Order progress">
      {order.timeline.map((step, i) => {
        const current = step.done && !order.timeline[i + 1]?.done
        return (
          <li key={step.step} className="relative flex flex-col items-center text-center" aria-current={current ? 'step' : undefined}>
            {i > 0 && <span className={`absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 ${step.done ? 'bg-gold-dark' : 'bg-ink-300'}`} aria-hidden="true" />}
            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step.done ? 'bg-gold text-primary shadow-md' : 'border-2 border-ink-300 bg-white text-ink-500'} ${current ? 'ring-4 ring-gold/30' : ''}`}>
              {step.done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className={`mt-2 text-xs font-bold sm:text-sm ${step.done ? 'text-primary' : 'text-ink-500'}`}>{STEP_LABEL[step.step]}</span>
            {step.at && <span className="mt-0.5 hidden text-[11px] text-ink-500 sm:block">{formatDate(step.at)}</span>}
          </li>
        )
      })}
    </ol>
  )
}

export default function OrderStatus() {
  const { token } = useParams()
  const [params, setParams] = useSearchParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState('')
  const [utr, setUtr] = useState('')
  const polls = useRef(0)
  const pay = params.get('pay')

  useDocumentTitle(order ? `Order ${order.order_number} | Prosper Infotech Shop` : 'Your Order | Prosper Infotech Shop', 'Order status and tracking.', null, { noindex: true, nofollow: true })

  const load = useCallback(async () => {
    try {
      const data = await api(`/orders/${token}`)
      setOrder(data.order)
      setError('')
      return data.order
    } catch (err) {
      setError(err.status === 404 ? 'not-found' : err.message)
      return null
    }
  }, [token])

  useEffect(() => {
    load().then((o) => {
      if (!o) return
      // Fire the GA4 purchase event once, right after checkout.
      try {
        if (sessionStorage.getItem('pi_new_order') === token) {
          sessionStorage.removeItem('pi_new_order')
          track.purchase(o)
        }
      } catch {
        // storage unavailable: skip analytics
      }
    })
  }, [load, token])

  // After an online payment, wait for Razorpay's confirmation to reach the server.
  const waiting = pay === 'done' && order?.status === 'pending_payment'
  useEffect(() => {
    if (!waiting) return
    if (polls.current >= 40) return
    const timer = setTimeout(async () => {
      polls.current += 1
      await load()
    }, 2500)
    return () => clearTimeout(timer)
  }, [waiting, order, load])

  const startOnlinePayment = async () => {
    setBusy('online')
    setNotice('')
    try {
      const res = await api(`/orders/${token}/pay`, { method: 'POST', body: { payment_method: 'razorpay' } })
      setOrder(res.order)
      const result = await payWithRazorpay(res.razorpay, token)
      polls.current = 0
      setParams({ pay: result }, { replace: true })
      await load()
    } catch (err) {
      setNotice(err.message)
    } finally {
      setBusy('')
    }
  }

  const switchMethod = async (method) => {
    setBusy(method)
    setNotice('')
    try {
      const res = await api(`/orders/${token}/pay`, { method: 'POST', body: { payment_method: method } })
      setOrder(res.order)
      setParams({}, { replace: true })
    } catch (err) {
      setNotice(err.message)
    } finally {
      setBusy('')
    }
  }

  const submitUtr = async (e) => {
    e.preventDefault()
    setBusy('utr')
    setNotice('')
    try {
      const res = await api(`/orders/${token}/utr`, { method: 'POST', body: { utr } })
      setOrder(res.order)
      setUtr('')
    } catch (err) {
      setNotice(err.message)
    } finally {
      setBusy('')
    }
  }

  if (error === 'not-found') {
    return (
      <EmptyState
        icon={PackageSearch}
        title="We could not find that order"
        text="Check the link in your order email. If it still does not open, contact us with your order number."
        action={
          <Link to="/contact" className={btn.gold}>
            Contact us
          </Link>
        }
      />
    )
  }
  if (error) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="We could not load your order"
        text={error}
        action={
          <button type="button" onClick={load} className={btn.gold}>
            Try again
          </button>
        }
      />
    )
  }
  if (!order) return <PageLoading label="Loading your order" />

  const pending = order.status === 'pending_payment'
  const manual = order.payment_method !== 'razorpay'
  const closed = ['cancelled', 'refunded'].includes(order.status)
  const info = order.payment_instructions
  const upiLink = info?.upi_id
    ? `upi://pay?pa=${encodeURIComponent(info.upi_id)}&pn=${encodeURIComponent(order.seller?.legal_name || 'Prosper Infotech')}&am=${(order.total_paise / 100).toFixed(2)}&cu=INR&tn=${encodeURIComponent(order.order_number)}`
    : null
  const a = order.shipping_address

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6">
      <header className="rounded-md bg-primary px-6 py-8 text-white md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-gold">
              {closed ? <XCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
              {closed ? `Order ${order.status}` : order.direct ? 'Order placed successfully' : pending ? 'Order received' : 'Thank you for your order'}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold !text-white md:text-4xl">{order.order_number}</h1>
            <p className="mt-2 text-sm text-white/80">
              Placed on {formatDate(order.created_at, true)} · Confirmation sent to {order.contact.email}
            </p>
          </div>
          <StatusBadge status={order.status} label={order.direct ? 'Order placed' : undefined} />
        </div>
      </header>

      {order.direct && (
        <section className="mt-6 flex flex-col gap-4 rounded-md border border-[#bfe5cf] bg-[#effaf3] p-5 sm:flex-row sm:items-center md:p-7" role="status">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <CheckCircle2 className="h-8 w-8 text-[#0f8a5f]" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 className="text-xl !text-[#0b5e41]">Your order has been placed successfully</h2>
            <p className="mt-1 flex items-start gap-2 text-sm text-ink-900">
              <Headset className="mt-0.5 h-4 w-4 shrink-0 text-[#0f8a5f]" aria-hidden="true" />
              Our sales team will contact you shortly on {order.contact.phone ? `+91 ${order.contact.phone}` : 'your phone'} to confirm payment and delivery.
            </p>
          </div>
          {(order.support?.phone || order.support?.whatsapp) && (
            <div className="flex shrink-0 flex-wrap gap-2">
              {order.support.phone && (
                <a href={`tel:${order.support.phone.replace(/\s+/g, '')}`} className={`${btn.ghost} !py-2`}>
                  <Phone className="h-4 w-4" />
                  Call us
                </a>
              )}
              {order.support.whatsapp && (
                <a href={`https://wa.me/${order.support.whatsapp}?text=${encodeURIComponent(`Hi, about my order ${order.order_number}`)}`} target="_blank" rel="noopener noreferrer" className={`${btn.ghost} !py-2`}>
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
            </div>
          )}
        </section>
      )}

      {notice && (
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {notice}
        </p>
      )}

      {!closed && (
        <section className="mt-6 rounded-md border border-[#eaeaec] bg-white px-4 py-6 md:px-8" aria-label="Order progress">
          <Timeline order={order} />
        </section>
      )}

      {closed && (
        <p className="mt-6 rounded-md border border-[#eaeaec] bg-white px-5 py-4 text-sm text-ink-900">
          This order was {order.status}
          {order.closed_at ? ` on ${formatDate(order.closed_at)}` : ''}. {order.status === 'refunded' ? 'Refunds usually reach your account in 5 to 7 working days.' : 'If you paid for it, the refund is processed separately.'}
        </p>
      )}

      {/* Payment */}
      {pending && waiting && (
        <section className="mt-6 flex items-center gap-4 rounded-md border border-gold-dark/50 bg-surface-alt px-5 py-5" role="status">
          <Spinner className="h-6 w-6 shrink-0 text-primary" />
          <div>
            <p className="font-heading font-bold text-primary">Confirming your payment</p>
            <p className="text-sm text-ink-600">This usually takes a few seconds. You can leave this page: we will email you as soon as it is confirmed.</p>
          </div>
        </section>
      )}

      {pending && !waiting && !manual && (
        <section className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-5 md:p-7">
          <h2 className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
            {pay === 'cancelled' ? 'Payment not completed' : pay === 'error' ? 'We could not start the payment' : 'Payment pending'}
          </h2>
          <p className="mt-2 text-sm text-ink-900">
            No money has been taken. Your order and details are saved, so you can pay now or choose another way to pay.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {order.can_pay_online && (
              <button type="button" onClick={startOnlinePayment} disabled={Boolean(busy)} className={btn.gold}>
                {busy === 'online' ? <Spinner /> : <CreditCard className="h-4 w-4" />}
                Pay {formatINR(order.total_paise)} now
              </button>
            )}
            {order.can_pay_upi && (
              <button type="button" onClick={() => switchMethod('upi_manual')} disabled={Boolean(busy)} className={btn.ghost}>
                {busy === 'upi_manual' ? <Spinner /> : <Smartphone className="h-4 w-4" />}
                Pay by UPI instead
              </button>
            )}
            {order.can_pay_bank && (
              <button type="button" onClick={() => switchMethod('bank_transfer')} disabled={Boolean(busy)} className={btn.ghost}>
                {busy === 'bank_transfer' && <Spinner />}
                Pay by bank transfer
              </button>
            )}
          </div>
        </section>
      )}

      {pending && manual && info && (
        <section className="mt-6 rounded-md border border-gold-dark/50 bg-surface-alt p-5 md:p-7">
          <h2 className="text-xl">Pay {formatINR(order.total_paise)} to confirm your order</h2>
          <p className="mt-1 text-sm text-ink-600">
            Pay the exact amount and add the order number in the remarks. We confirm by email as soon as the payment arrives, then pack and ship.
          </p>
          <dl className="mt-4 divide-y divide-ink-300/60 rounded-xl bg-white/70 px-4">
            <CopyRow label="Amount" value={(order.total_paise / 100).toFixed(2)} />
            <CopyRow label="Payment remarks" value={info.reference} />
            {order.payment_method === 'upi_manual' || !info.bank?.account_number ? <CopyRow label="UPI ID" value={info.upi_id} /> : null}
            {(order.payment_method === 'bank_transfer' || !info.upi_id) && (
              <>
                <CopyRow label="Account name" value={info.bank?.account_name} />
                <CopyRow label="Account number" value={info.bank?.account_number} />
                <CopyRow label="IFSC" value={info.bank?.ifsc} />
                <CopyRow label="Bank" value={[info.bank?.bank_name, info.bank?.branch].filter(Boolean).join(', ')} />
              </>
            )}
          </dl>
          <div className="mt-5 flex flex-wrap gap-3">
            {upiLink && order.payment_method === 'upi_manual' && (
              <a href={upiLink} className={`${btn.gold} sm:hidden`}>
                <Smartphone className="h-4 w-4" />
                Open UPI app
              </a>
            )}
            {order.can_pay_online && (
              <button type="button" onClick={startOnlinePayment} disabled={Boolean(busy)} className={btn.navy}>
                {busy === 'online' ? <Spinner /> : <CreditCard className="h-4 w-4" />}
                Pay online instead
              </button>
            )}
          </div>

          <form onSubmit={submitUtr} className="mt-6 border-t border-[#eaeaec] pt-5">
            <label htmlFor="utr" className="block text-sm font-bold text-primary">
              Already paid? Tell us the UTR or transaction ID
            </label>
            <p className="mt-0.5 text-xs text-ink-600">Optional, but it helps us match your payment faster.</p>
            {order.utr && (
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#3f7a0c]">
                <Check className="h-4 w-4" />
                We have your reference: {order.utr}
              </p>
            )}
            <div className="mt-3 flex max-w-md gap-2">
              <input id="utr" value={utr} onChange={(e) => setUtr(e.target.value)} placeholder="UTR / transaction ID" maxLength={40} className={inputClass} />
              <button type="submit" disabled={busy === 'utr' || utr.trim().length < 6} className={`${btn.navy} shrink-0`}>
                {busy === 'utr' && <Spinner />}
                Send
              </button>
            </div>
          </form>
        </section>
      )}

      {order.shipment && (
        <section className="mt-6 rounded-md border border-[#eaeaec] bg-white p-5 md:p-7">
          <h2 className="flex items-center gap-2 text-xl">
            <Truck className="h-5 w-5" />
            Shipping
          </h2>
          <p className="mt-2 text-sm text-ink-900">
            {order.shipment.courier || 'Courier'}
            {order.shipment.awb ? ` · Tracking number ${order.shipment.awb}` : ''}
            {order.shipment.shipped_at ? ` · Shipped ${formatDate(order.shipment.shipped_at)}` : ''}
          </p>
          {order.shipment.tracking_url && (
            <a href={order.shipment.tracking_url} target="_blank" rel="noopener noreferrer" className={`${btn.gold} mt-4`}>
              Track your parcel
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </section>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-md border border-[#eaeaec] bg-white p-5 md:p-7">
          <h2 className="mb-5 text-xl">Items</h2>
          <ul className="flex flex-col gap-4">
            {order.items.map((item) => (
              <li key={item.sku} className="flex items-center gap-4">
                <div className="w-16 shrink-0 overflow-hidden rounded-lg border border-[#eaeaec]">
                  <ProductImage product={{ name: item.name, images: item.image ? [item.image] : [] }} ratio="aspect-square" iconSize="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  {item.slug ? (
                    <Link to={`/p/${item.slug}`} className="text-sm font-bold text-primary hover:underline">
                      {item.name}
                    </Link>
                  ) : (
                    <p className="text-sm font-bold text-primary">{item.name}</p>
                  )}
                  <p className="text-xs text-ink-500">
                    {item.sku} · {item.qty} × {formatINR(item.unit_price_paise)}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-ink-900">{formatINR(item.line_total_paise)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 flex flex-col gap-2 border-t border-[#eaeaec] pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-600">Subtotal (incl. GST)</dt>
              <dd className="font-semibold">{formatINR(order.subtotal_paise)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">Shipping</dt>
              <dd className="font-semibold">{order.shipping_paise ? formatINR(order.shipping_paise) : 'Free'}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-[#eaeaec] pt-3">
              <dt className="font-heading text-base font-bold text-primary">Total</dt>
              <dd className="font-heading text-2xl font-extrabold text-primary">{formatINR(order.total_paise)}</dd>
            </div>
            <p className="text-right text-xs text-ink-500">Includes GST of {formatINR(order.gst_paise)}</p>
          </dl>
          {order.invoice_number && (
            <Link to={`/order/${order.token}/invoice`} target="_blank" className={`${btn.ghost} mt-5`}>
              <FileText className="h-4 w-4" />
              View / download GST invoice
            </Link>
          )}
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-md border border-[#eaeaec] bg-white p-5 md:p-6">
            <h2 className="mb-3 text-lg">Delivery address</h2>
            <address className="text-sm not-italic leading-relaxed text-ink-900">
              <strong>{a.name}</strong>
              {order.contact.company ? `, ${order.contact.company}` : ''}
              <br />
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ''}
              <br />
              {a.city}, {a.state} {a.pincode}
              <br />
              Phone: {a.phone}
            </address>
            <p className="mt-3 text-sm text-ink-600">
              Payment: {order.direct ? "Our sales team will confirm with you" : PAYMENT_LABEL[order.payment_method]}
              {order.gstin ? ` · GSTIN ${order.gstin}` : ''}
            </p>
          </section>

          <section className="rounded-md border border-[#eaeaec] bg-white p-5 md:p-6">
            <h2 className="mb-3 text-lg">Need help with this order?</h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {order.support.phone && (
                <li>
                  <a href={`tel:${order.support.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Phone className="h-4 w-4 text-gold-dark" />
                    {order.support.phone}
                  </a>
                </li>
              )}
              {order.support.email && (
                <li>
                  <a href={`mailto:${order.support.email}?subject=${encodeURIComponent(`Order ${order.order_number}`)}`} className="flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Mail className="h-4 w-4 text-gold-dark" />
                    {order.support.email}
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-3 text-xs text-ink-500">Keep this page's link: it always shows the latest status of your order.</p>
          </section>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-sm font-bold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
