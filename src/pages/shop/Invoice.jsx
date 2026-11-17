import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Printer } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { api } from '../../shop/api'
import { PageLoading } from '../../shop/components/ui'
import { btn, formatDate } from '../../shop/format'
import { gstIncluded } from '../../../shared/pricing.js'
import logo from '../../assets/logo-light.png'

const money = (paise) => (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
const below100 = (n) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ''}`)
const below1000 = (n) => (n >= 100 ? `${ONES[Math.floor(n / 100)]} Hundred${n % 100 ? ` ${below100(n % 100)}` : ''}` : below100(n))
// Indian numbering: crore, lakh, thousand.
function rupeesInWords(paise) {
  const rupees = Math.floor(paise / 100)
  const ps = paise % 100
  const parts = []
  const crore = Math.floor(rupees / 10000000)
  const lakh = Math.floor((rupees % 10000000) / 100000)
  const thousand = Math.floor((rupees % 100000) / 1000)
  const rest = rupees % 1000
  if (crore) parts.push(`${below1000(crore)} Crore`)
  if (lakh) parts.push(`${below100(lakh)} Lakh`)
  if (thousand) parts.push(`${below100(thousand)} Thousand`)
  if (rest) parts.push(below1000(rest))
  return `Rupees ${parts.join(' ') || 'Zero'}${ps ? ` and ${below100(ps)} Paise` : ''} Only`
}

export default function Invoice() {
  const { token } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  useDocumentTitle(order?.invoice_number ? `Invoice ${order.invoice_number}` : 'Invoice', 'GST invoice.', null, { noindex: true, nofollow: true })

  useEffect(() => {
    api(`/orders/${token}`)
      .then((d) => setOrder(d.order))
      .catch((e) => setError(e.message))
  }, [token])

  if (error) return <p className="p-10 text-center text-red-700">{error}</p>
  if (!order) return <PageLoading label="Loading invoice" />
  if (!order.invoice_number) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-2xl">The invoice is not ready yet</h1>
        <p className="mt-2 text-ink-600">A GST invoice is issued once the payment for this order is received.</p>
        <Link to={`/order/${token}`} className={`${btn.gold} mt-6`}>
          Back to the order
        </Link>
      </div>
    )
  }

  const seller = order.seller || {}
  const bill = order.billing_address
  const ship = order.shipping_address
  // Same state as the seller: CGST + SGST. Different state: IGST.
  const sameState = seller.state && ship.state && seller.state.trim().toLowerCase() === ship.state.trim().toLowerCase()
  const rows = order.items.map((i) => {
    const gst = gstIncluded(i.line_total_paise, i.gst_percent)
    return { ...i, taxable: i.line_total_paise - gst, gst }
  })
  if (order.shipping_paise) {
    const gst = gstIncluded(order.shipping_paise, 18)
    rows.push({ sku: 'SHIPPING', name: 'Shipping and handling', hsn_code: '996812', qty: 1, gst_percent: 18, line_total_paise: order.shipping_paise, taxable: order.shipping_paise - gst, gst })
  }
  const taxable = rows.reduce((s, r) => s + r.taxable, 0)
  const gstTotal = rows.reduce((s, r) => s + r.gst, 0)
  const cell = 'border border-ink-300 px-2 py-1.5 align-top'

  return (
    <div className="min-h-screen bg-ink-300/30 py-6 print:bg-white print:py-0">
      <div className="mx-auto mb-4 flex max-w-[210mm] items-center justify-between px-4 print:hidden">
        <Link to={`/order/${token}`} className="text-sm font-semibold text-primary underline">
          Back to the order
        </Link>
        <button type="button" onClick={() => window.print()} className={btn.gold}>
          <Printer className="h-4 w-4" />
          Print or save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-[210mm] bg-white p-6 text-[12px] leading-snug text-ink-900 shadow-lg sm:p-10 print:max-w-none print:p-0 print:shadow-none">
        <header className="flex items-start justify-between gap-6 border-b-2 border-primary pb-4">
          <div>
            <img src={logo} alt="Prosper Infotech" className="h-12 w-auto" />
            <p className="mt-2 text-sm font-bold text-primary">{seller.legal_name || 'Prosper Infotech'}</p>
            <p className="max-w-xs text-ink-600">{seller.address}</p>
            {seller.gstin && <p className="mt-1 font-semibold">GSTIN: {seller.gstin}</p>}
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-extrabold uppercase tracking-wide">Tax Invoice</h1>
            <p className="mt-2">
              Invoice no: <strong>{order.invoice_number}</strong>
            </p>
            <p>Invoice date: {formatDate(order.invoice_date)}</p>
            <p>Order no: {order.order_number}</p>
            <p>Order date: {formatDate(order.created_at)}</p>
          </div>
        </header>

        <section className="mt-4 grid grid-cols-2 gap-6">
          <div>
            <h2 className="mb-1 text-[11px] font-bold uppercase tracking-wider text-ink-500">Bill to</h2>
            <p className="font-bold">{order.contact.company || bill.name}</p>
            {order.contact.company && <p>{bill.name}</p>}
            <p>
              {bill.line1}
              {bill.line2 ? `, ${bill.line2}` : ''}
            </p>
            <p>
              {bill.city}, {bill.state} {bill.pincode}
            </p>
            <p>Phone: {bill.phone}</p>
            {order.gstin && <p className="font-semibold">GSTIN: {order.gstin}</p>}
          </div>
          <div>
            <h2 className="mb-1 text-[11px] font-bold uppercase tracking-wider text-ink-500">Ship to</h2>
            <p className="font-bold">{ship.name}</p>
            <p>
              {ship.line1}
              {ship.line2 ? `, ${ship.line2}` : ''}
            </p>
            <p>
              {ship.city}, {ship.state} {ship.pincode}
            </p>
            <p>Place of supply: {ship.state}</p>
          </div>
        </section>

        <table className="mt-5 w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-primary text-left text-white">
              <th className={`${cell} border-primary`}>#</th>
              <th className={`${cell} border-primary`}>Description</th>
              <th className={`${cell} border-primary`}>HSN/SAC</th>
              <th className={`${cell} border-primary text-right`}>Qty</th>
              <th className={`${cell} border-primary text-right`}>Taxable value (₹)</th>
              {sameState ? (
                <>
                  <th className={`${cell} border-primary text-right`}>CGST (₹)</th>
                  <th className={`${cell} border-primary text-right`}>SGST (₹)</th>
                </>
              ) : (
                <th className={`${cell} border-primary text-right`}>IGST (₹)</th>
              )}
              <th className={`${cell} border-primary text-right`}>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const half = Math.floor(r.gst / 2)
              return (
                <tr key={r.sku}>
                  <td className={cell}>{i + 1}</td>
                  <td className={cell}>
                    <strong>{r.name}</strong>
                    {r.sku !== 'SHIPPING' && <span className="block text-ink-500">SKU {r.sku}</span>}
                  </td>
                  <td className={cell}>{r.hsn_code || '-'}</td>
                  <td className={`${cell} text-right`}>{r.qty}</td>
                  <td className={`${cell} text-right`}>{money(r.taxable)}</td>
                  {sameState ? (
                    <>
                      <td className={`${cell} text-right`}>
                        {money(half)}
                        <span className="block text-ink-500">{r.gst_percent / 2}%</span>
                      </td>
                      <td className={`${cell} text-right`}>
                        {money(r.gst - half)}
                        <span className="block text-ink-500">{r.gst_percent / 2}%</span>
                      </td>
                    </>
                  ) : (
                    <td className={`${cell} text-right`}>
                      {money(r.gst)}
                      <span className="block text-ink-500">{r.gst_percent}%</span>
                    </td>
                  )}
                  <td className={`${cell} text-right font-semibold`}>{money(r.line_total_paise)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className={cell} colSpan={4}>
                Total
              </td>
              <td className={`${cell} text-right`}>{money(taxable)}</td>
              {sameState ? (
                <>
                  <td className={`${cell} text-right`}>{money(rows.reduce((s, r) => s + Math.floor(r.gst / 2), 0))}</td>
                  <td className={`${cell} text-right`}>{money(rows.reduce((s, r) => s + r.gst - Math.floor(r.gst / 2), 0))}</td>
                </>
              ) : (
                <td className={`${cell} text-right`}>{money(gstTotal)}</td>
              )}
              <td className={`${cell} text-right`}>{money(order.total_paise)}</td>
            </tr>
          </tfoot>
        </table>

        <section className="mt-4 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Amount in words</p>
            <p className="font-semibold">{rupeesInWords(order.total_paise)}</p>
            <p className="mt-3 text-ink-600">
              Payment: {order.payment_method === 'razorpay' ? 'Online (Razorpay)' : order.payment_method === 'upi_manual' ? 'UPI' : 'Bank transfer'}
              {order.paid_at ? `, received ${formatDate(order.paid_at)}` : ''}
            </p>
          </div>
          <dl className="w-56">
            <div className="flex justify-between py-0.5">
              <dt>Taxable value</dt>
              <dd>₹{money(taxable)}</dd>
            </div>
            <div className="flex justify-between py-0.5">
              <dt>{sameState ? 'CGST + SGST' : 'IGST'}</dt>
              <dd>₹{money(gstTotal)}</dd>
            </div>
            <div className="mt-1 flex justify-between border-t-2 border-primary pt-1.5 text-sm font-extrabold text-primary">
              <dt>Invoice total</dt>
              <dd>₹{money(order.total_paise)}</dd>
            </div>
          </dl>
        </section>

        <footer className="mt-10 border-t border-ink-300 pt-3 text-[11px] text-ink-600">
          <p>This is a computer-generated invoice and does not need a signature.</p>
          <p>
            Questions about this invoice: {order.support?.email} · {order.support?.phone}
          </p>
        </footer>
      </article>
    </div>
  )
}
