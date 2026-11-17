import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Printer, Truck } from 'lucide-react'
import { api } from '../../shop/api'
import { Field, PageLoading, Spinner, StatusBadge } from '../../shop/components/ui'
import { btn, formatDate, inputClass, PAYMENT_LABEL, STATUS_LABEL } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'
import { Alert, Card } from './adminUi'
import { useLoad } from './useLoad'

const ACTION = {
  paid: { label: 'Mark payment received', style: btn.gold, confirm: 'Mark this order as paid? Stock is reduced, the invoice number is issued and the customer is emailed.' },
  processing: { label: 'Mark as being packed', style: btn.navy },
  delivered: { label: 'Mark as delivered', style: btn.gold, confirm: 'Mark as delivered? The customer is emailed.' },
  cancelled: { label: 'Cancel order', style: `${btn.ghost} !border-red-300 !text-red-700`, confirm: 'Cancel this order? The customer is emailed. If it was paid, refund the money separately.' },
  refunded: { label: 'Record refund', style: `${btn.ghost} !border-red-300 !text-red-700`, confirm: 'Record this order as refunded? Do the refund itself in Razorpay or your bank first. Stock is put back and the customer is emailed.' },
}

export default function AdminOrderDetail() {
  const { id } = useParams()
  const { data, error, reload } = useLoad(`/admin/orders/${id}`)
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState({ kind: 'error', text: '' })
  const [note, setNote] = useState('')
  const [reason, setReason] = useState('')
  const [ship, setShip] = useState(null)
  const [shipErrors, setShipErrors] = useState({})

  if (error && !data) return <Alert>{error}</Alert>
  if (!data) return <PageLoading />
  const { order, items, events, shipment, payments, allowed_next: next } = data
  const a = order.shipping_address
  const shipForm = ship || { courier: shipment?.courier || '', awb: shipment?.awb || '', tracking_url: shipment?.tracking_url || '' }
  const canShip = ['paid', 'processing', 'shipped'].includes(order.status)

  const run = async (key, fn, done) => {
    setBusy(key)
    setMessage({ kind: 'error', text: '' })
    try {
      await fn()
      await reload()
      setMessage({ kind: 'ok', text: done })
    } catch (err) {
      if (err.data?.fields) setShipErrors(err.data.fields)
      setMessage({ kind: 'error', text: err.message })
    } finally {
      setBusy('')
    }
  }
  const changeStatus = (status) => {
    const action = ACTION[status]
    if (action.confirm && !window.confirm(action.confirm)) return
    run(status, () => api(`/admin/orders/${id}/status`, { method: 'POST', body: { status, note: reason } }), `Order is now "${STATUS_LABEL[status]}".`).then(() => setReason(''))
  }
  const saveShipment = (e) => {
    e.preventDefault()
    setShipErrors({})
    run('ship', () => api(`/admin/orders/${id}/ship`, { method: 'POST', body: shipForm }), 'Shipping saved and the customer has been emailed the tracking details.').then(() => setShip(null))
  }
  const addNote = (e) => {
    e.preventDefault()
    run('note', () => api(`/admin/orders/${id}/note`, { method: 'POST', body: { note } }), 'Note added.').then(() => setNote(''))
  }

  return (
    <>
      <Link to="/admin/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline print:hidden">
        <ArrowLeft className="h-4 w-4" />
        All orders
      </Link>
      <div className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold md:text-3xl">{order.order_number}</h1>
          <p className="text-sm text-ink-600">
            {formatDate(order.created_at, true)} · {PAYMENT_LABEL[order.payment_method]}
            {order.invoice_number ? ` · Invoice ${order.invoice_number}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <StatusBadge status={order.status} />
          <button type="button" onClick={() => window.print()} className={`${btn.ghost} !py-2`}>
            <Printer className="h-4 w-4" />
            Packing slip
          </button>
          <Link to={`/order/${order.public_token}`} target="_blank" className={`${btn.ghost} !py-2`}>
            <ExternalLink className="h-4 w-4" />
            Customer view
          </Link>
        </div>
      </div>

      <div className="print:hidden">
        <Alert kind={message.kind}>{message.text}</Alert>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card title="Items">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="pb-2">Product</th>
                  <th className="pb-2 text-right">Qty</th>
                  <th className="pb-2 text-right print:hidden">Price</th>
                  <th className="pb-2 text-right print:hidden">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-300/50">
                {items.map((i) => (
                  <tr key={i.id}>
                    <td className="py-2.5">
                      <span className="font-semibold text-ink-900">{i.name}</span>
                      <span className="block text-xs text-ink-500">SKU {i.sku}{i.hsn_code ? ` · HSN ${i.hsn_code}` : ''}</span>
                    </td>
                    <td className="py-2.5 text-right font-bold">{i.qty}</td>
                    <td className="py-2.5 text-right print:hidden">{formatINR(i.unit_price_paise)}</td>
                    <td className="py-2.5 text-right font-semibold print:hidden">{formatINR(i.line_total_paise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className="mt-4 ml-auto flex max-w-xs flex-col gap-1.5 border-t border-ink-300/70 pt-3 text-sm print:hidden">
              <div className="flex justify-between"><dt className="text-ink-600">Subtotal (incl. GST)</dt><dd>{formatINR(order.subtotal_paise)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-600">Shipping</dt><dd>{order.shipping_paise ? formatINR(order.shipping_paise) : 'Free'}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-600">GST included</dt><dd>{formatINR(order.gst_paise)}</dd></div>
              <div className="flex justify-between font-heading text-lg font-extrabold text-primary"><dt>Total</dt><dd>{formatINR(order.total_paise)}</dd></div>
            </dl>
          </Card>

          <Card title="Next step" className="print:hidden">
            {next.length === 0 ? (
              <p className="text-sm text-ink-600">This order is closed. Nothing more to do.</p>
            ) : (
              <>
                {order.status === 'pending_payment' && order.payment_method !== 'razorpay' && (
                  <p className="mb-3 rounded-lg bg-surface-alt px-3 py-2 text-sm text-ink-900">
                    Check your bank for <strong>{formatINR(order.total_paise)}</strong> with reference <strong>{order.order_number}</strong>
                    {order.utr ? <> (customer's UTR: <strong>{order.utr}</strong>)</> : ''}, then mark the payment received.
                  </p>
                )}
                {order.status === 'pending_payment' && order.payment_method === 'razorpay' && (
                  <p className="mb-3 rounded-lg bg-surface-alt px-3 py-2 text-sm text-ink-900">Online payments are confirmed automatically by Razorpay. Only mark this paid by hand if you have checked the payment in the Razorpay dashboard.</p>
                )}
                <Field id="reason" label="Note for this change" optional hint="Included in the cancellation or refund email to the customer.">
                  <input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className={inputClass} />
                </Field>
                <div className="mt-4 flex flex-wrap gap-3">
                  {next.filter((s) => s !== 'shipped').map((s) => (
                    <button key={s} type="button" disabled={Boolean(busy)} onClick={() => changeStatus(s)} className={ACTION[s].style}>
                      {busy === s && <Spinner />}
                      {ACTION[s].label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </Card>

          {canShip && (
            <Card title={shipment ? 'Shipping details' : 'Ship this order'} className="print:hidden">
              <form onSubmit={saveShipment} className="grid gap-4 sm:grid-cols-2" noValidate>
                <Field id="courier" label="Courier" error={shipErrors.courier}>
                  <input id="courier" value={shipForm.courier} onChange={(e) => setShip({ ...shipForm, courier: e.target.value })} placeholder="Delhivery, Blue Dart..." className={inputClass} />
                </Field>
                <Field id="awb" label="Tracking number (AWB)" error={shipErrors.awb}>
                  <input id="awb" value={shipForm.awb} onChange={(e) => setShip({ ...shipForm, awb: e.target.value })} className={inputClass} />
                </Field>
                <Field id="tracking_url" label="Tracking link" optional error={shipErrors.tracking_url} className="sm:col-span-2">
                  <input id="tracking_url" type="url" value={shipForm.tracking_url} onChange={(e) => setShip({ ...shipForm, tracking_url: e.target.value })} placeholder="https://..." className={inputClass} />
                </Field>
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <button type="submit" disabled={Boolean(busy)} className={btn.gold}>
                    {busy === 'ship' ? <Spinner /> : <Truck className="h-4 w-4" />}
                    {shipment ? 'Update and email customer' : 'Mark shipped and email customer'}
                  </button>
                  {data.shiprocket && !shipment && (
                    <button type="button" disabled={Boolean(busy)} onClick={() => run('shiprocket', () => api(`/admin/orders/${id}/shiprocket`, { method: 'POST', body: {} }), 'Sent to Shiprocket.')} className={btn.ghost}>
                      {busy === 'shiprocket' && <Spinner />}
                      Create Shiprocket shipment
                    </button>
                  )}
                </div>
              </form>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Customer and delivery">
            <address className="text-sm not-italic leading-relaxed text-ink-900">
              <strong>{a.name}</strong>
              {order.contact.company ? `, ${order.contact.company}` : ''}
              <br />
              {a.line1}{a.line2 ? `, ${a.line2}` : ''}
              <br />
              {a.city}, {a.state} {a.pincode}
              <br />
              Phone: <a href={`tel:+91${a.phone}`} className="text-primary underline">{a.phone}</a>
            </address>
            <p className="mt-3 text-sm text-ink-900">
              <a href={`mailto:${order.contact.email}`} className="text-primary underline">{order.contact.email}</a>
              {order.gstin ? <span className="block">GSTIN: {order.gstin}</span> : null}
            </p>
            {order.notes && <p className="mt-3 rounded-lg bg-surface-alt px-3 py-2 text-sm text-ink-900"><strong>Customer note:</strong> {order.notes}</p>}
          </Card>

          {payments.length > 0 && (
            <Card title="Payment records" className="print:hidden">
              <ul className="flex flex-col divide-y divide-ink-300/50 text-sm">
                {payments.map((p) => (
                  <li key={p.id} className="py-2">
                    <span className="font-semibold text-ink-900">{p.status}</span>
                    {p.amount_paise ? ` · ${formatINR(p.amount_paise)}` : ''}
                    <span className="block break-all text-xs text-ink-500">{[p.provider_payment_id, p.provider_order_id].filter(Boolean).join(' · ')} · {formatDate(p.created_at, true)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card title="History and notes" className="print:hidden">
            <form onSubmit={addNote} className="mb-4 flex gap-2">
              <label htmlFor="note" className="sr-only">Add an internal note</label>
              <input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note" maxLength={1000} className={`${inputClass} !py-2 !text-sm`} />
              <button type="submit" disabled={!note.trim() || Boolean(busy)} className={`${btn.navy} shrink-0 !py-2`}>Add</button>
            </form>
            <ol className="flex flex-col gap-3">
              {events.map((e) => (
                <li key={e.id} className="border-l-2 border-gold-dark pl-3 text-sm">
                  <span className="font-semibold text-ink-900">{e.message}</span>
                  <span className="block text-xs text-ink-500">{e.type} · {e.created_by} · {formatDate(e.created_at, true)}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </>
  )
}
