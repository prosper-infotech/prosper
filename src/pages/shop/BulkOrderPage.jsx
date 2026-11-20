import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, ClipboardList, FileText, Plus, Trash2, Truck, Users } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { api } from '../../shop/api'
import { metaLead } from '../../shop/track'
import { btn } from '../../shop/format'
import { Spinner } from '../../shop/components/ui'
import { EMAIL_RE } from '../../../shared/india.js'
import { STATIC_PAGE_META } from '../../../shared/pages.js'

const STEPS = [
  { icon: ClipboardList, title: 'Send your list', text: 'Products, quantities and where they should go.' },
  { icon: FileText, title: 'Get a quotation', text: 'Price, GST and delivery time, usually within one business day.' },
  { icon: Truck, title: 'We deliver', text: 'To one site or many, with GST invoice and tracking.' },
]
const WHO = ['Retail chains and supermarkets', 'Warehouses and logistics', 'Factories and manufacturers', 'Hospitals and hotels', 'Schools, colleges and offices', 'System integrators and resellers']

const input =
  'w-full rounded-md border border-[#d4d5d9] bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15'
const label = 'mb-1.5 block text-sm font-semibold text-ink-900'

export default function BulkOrderPage() {
  const { products, config } = useShop()
  const [params] = useSearchParams()
  const meta = STATIC_PAGE_META['bulk-order']
  useDocumentTitle(meta.title, meta.description)

  const start = useMemo(() => {
    const p = products.find((x) => x.slug === params.get('product'))
    const qty = Math.floor(Number(params.get('qty')) || 0)
    return p ? [{ product: p.name, qty: qty > 0 ? qty : 50 }] : [{ product: '', qty: '' }]
  }, [products, params])
  const [items, setItems] = useState(null)
  const rows = items || start
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', gstin: '', city: '', needed_by: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const setRow = (i, key, value) => setItems(rows.map((r, j) => (j === i ? { ...r, [key]: value } : r)))
  const names = useMemo(() => products.map((p) => p.name), [products])

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) errs.phone = 'Please enter a phone number we can call.'
    const list = rows.filter((r) => r.product.trim())
    if (!list.length && !form.message.trim()) errs.items = 'Add at least one product, or describe what you need below.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    setServerError('')
    try {
      await api('/shop/enquiry', { method: 'POST', body: { ...form, items: list, product: list.length ? `${list[0].product}${list.length > 1 ? ` + ${list.length - 1} more` : ''}` : 'Bulk order', page: '/bulk-order' } })
      window.gtag?.('event', 'generate_lead', { event_category: 'Bulk order', event_label: list.map((r) => r.product).join(', ') })
      metaLead('Bulk order')
      setStatus('sent')
    } catch (err) {
      setServerError(err.message)
      setStatus('idle')
    }
  }

  return (
    <>
      <Breadcrumb title="Bulk order" h1="Bulk and corporate orders" description="Buying for a project, many sites or resale? Send your list and get one quotation with quantity pricing." />

      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex items-start gap-4 rounded-lg border border-[#eaeaec] bg-white p-5">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-alt">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">{i + 1}</span>
              </span>
              <span>
                <span className="block font-bold text-primary">{title}</span>
                <span className="mt-1 block text-sm text-[#535766]">{text}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <section aria-labelledby="bulk-form-title" className="rounded-lg border border-[#eaeaec] bg-white p-5 md:p-8">
            {status === 'sent' ? (
              <div className="flex flex-col items-center py-10 text-center" role="status">
                <CheckCircle2 className="h-14 w-14 text-[#0f8a5f]" aria-hidden="true" />
                <h2 id="bulk-form-title" className="mt-4 text-2xl font-extrabold">
                  Thank you, we have your list
                </h2>
                <p className="mt-2 max-w-md text-[#535766]">
                  Our sales team will email a quotation to <strong>{form.email}</strong>, usually within one business day. For anything urgent, call{' '}
                  {config.support_phone || 'us'}.
                </p>
                <Link to="/c/all" className={`${btn.navy} mt-6`}>
                  Continue shopping
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 id="bulk-form-title" className="text-xl font-extrabold">
                  Request a bulk quotation
                </h2>
                <p className="mt-1 text-sm text-[#535766]">Fields marked * are required.</p>

                <fieldset className="mt-6">
                  <legend className={label}>Products and quantities *</legend>
                  <datalist id="bulk-products">
                    {names.map((n) => (
                      <option key={n} value={n} />
                    ))}
                  </datalist>
                  <ul className="flex flex-col gap-2">
                    {rows.map((r, i) => (
                      <li key={i} className="grid grid-cols-[minmax(0,1fr)_88px_40px] gap-2">
                        <input
                          list="bulk-products"
                          value={r.product}
                          onChange={(e) => setRow(i, 'product', e.target.value)}
                          placeholder="Search or type a product or model"
                          aria-label={`Product ${i + 1}`}
                          className={input}
                        />
                        <input
                          type="number"
                          min="1"
                          inputMode="numeric"
                          value={r.qty}
                          onChange={(e) => setRow(i, 'qty', e.target.value)}
                          placeholder="Qty"
                          aria-label={`Quantity for product ${i + 1}`}
                          className={input}
                        />
                        <button
                          type="button"
                          onClick={() => setItems(rows.length > 1 ? rows.filter((_, j) => j !== i) : [{ product: '', qty: '' }])}
                          aria-label={`Remove product ${i + 1}`}
                          className="flex items-center justify-center rounded-md border border-[#d4d5d9] text-[#7e818c] hover:border-[#d6262f] hover:text-[#d6262f]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {rows.length < 30 && (
                    <button type="button" onClick={() => setItems([...rows, { product: '', qty: '' }])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                      <Plus className="h-4 w-4" />
                      Add another product
                    </button>
                  )}
                  {errors.items && <p className="mt-2 text-sm text-[#d6262f]">{errors.items}</p>}
                </fieldset>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field id="b-name" label="Your name *" error={errors.name}>
                    <input id="b-name" value={form.name} onChange={set('name')} autoComplete="name" className={input} />
                  </Field>
                  <Field id="b-company" label="Company">
                    <input id="b-company" value={form.company} onChange={set('company')} autoComplete="organization" className={input} />
                  </Field>
                  <Field id="b-email" label="Email *" error={errors.email}>
                    <input id="b-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" className={input} />
                  </Field>
                  <Field id="b-phone" label="Phone *" error={errors.phone}>
                    <input id="b-phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+91" className={input} />
                  </Field>
                  <Field id="b-gstin" label="GSTIN">
                    <input id="b-gstin" value={form.gstin} onChange={set('gstin')} maxLength={15} className={`${input} uppercase`} />
                  </Field>
                  <Field id="b-city" label="Delivery city">
                    <input id="b-city" value={form.city} onChange={set('city')} autoComplete="address-level2" className={input} />
                  </Field>
                  <Field id="b-date" label="Needed by">
                    <input id="b-date" type="date" value={form.needed_by} onChange={set('needed_by')} className={input} />
                  </Field>
                </div>

                <Field id="b-message" label="Anything else?" className="mt-4">
                  <textarea
                    id="b-message"
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Delivery to several sites, installation, a model you could not find, payment terms..."
                    className={input}
                  />
                </Field>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="b-website">Leave this empty</label>
                  <input id="b-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
                </div>

                {serverError && (
                  <p className="mt-4 rounded-md bg-[#fdecec] px-4 py-3 text-sm text-[#a31b23]" role="alert">
                    {serverError}
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className={`${btn.navy} mt-6 w-full !py-4 sm:w-auto`}>
                  {status === 'sending' && <Spinner />}
                  {status === 'sending' ? 'Sending' : 'Send for quotation'}
                </button>
              </form>
            )}
          </section>

          <aside className="flex flex-col gap-6">
            <div className="rounded-lg bg-primary p-6 text-white">
              <h2 className="flex items-center gap-2 text-lg font-extrabold !text-white">
                <Users className="h-5 w-5 text-gold" aria-hidden="true" />
                Who we supply
              </h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/90">
                {WHO.map((w) => (
                  <li key={w} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-gold bg-surface-alt p-6">
              <h2 className="text-lg font-extrabold">What you get</h2>
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-ink-900">
                <li>Quantity pricing on every line</li>
                <li>One GST invoice for the whole order</li>
                <li>Delivery to one or many sites</li>
                <li>Help choosing models and installation if needed</li>
              </ul>
            </div>
            <p className="text-sm text-[#535766]">
              Prefer to talk?{' '}
              {config.support_phone && (
                <a href={`tel:${config.support_phone.replace(/\s+/g, '')}`} className="font-bold text-primary hover:underline">
                  {config.support_phone}
                </a>
              )}
              {config.support_email && (
                <>
                  {' '}
                  or{' '}
                  <a href={`mailto:${config.support_email}`} className="font-bold text-primary hover:underline">
                    {config.support_email}
                  </a>
                </>
              )}
            </p>
          </aside>
        </div>
      </div>
    </>
  )
}

function Field({ id, label: text, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-[#d6262f]">{error}</p>}
    </div>
  )
}
