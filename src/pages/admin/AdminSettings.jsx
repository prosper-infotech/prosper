import { useEffect, useState } from 'react'
import { Check, Trash2, X } from 'lucide-react'
import { api } from '../../shop/api'
import { Field, PageLoading, Spinner } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { INDIAN_STATES } from '../../../shared/india.js'
import { Alert, Card, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

function Staff() {
  const { data, reload } = useLoad('/admin/staff')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const add = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api('/admin/staff', { method: 'POST', body: { email } })
      setEmail('')
      reload()
    } catch (err) {
      setError(err.message)
    }
  }
  const remove = async (id) => {
    setError('')
    try {
      await api(`/admin/staff/${id}`, { method: 'DELETE' })
      reload()
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <Card title="Staff who can sign in here">
      <Alert>{error}</Alert>
      <ul className="mb-4 flex flex-col divide-y divide-ink-300/50 text-sm">
        {(data?.owners || []).map((o) => (
          <li key={o} className="flex items-center justify-between py-2">
            <span>{o}</span>
            <span className="text-xs text-ink-500">Owner (set in Vercel)</span>
          </li>
        ))}
        {(data?.staff || []).filter((s) => s.is_active).map((s) => (
          <li key={s.id} className="flex items-center justify-between py-2">
            <span>{s.email}</span>
            <button type="button" onClick={() => remove(s.id)} aria-label={`Remove ${s.email}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-red-50 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="flex max-w-md gap-2">
        <label htmlFor="staff-email" className="sr-only">Staff email</label>
        <input id="staff-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@prosperinfotech.com" className={inputClass} />
        <button type="submit" disabled={!email.trim()} className={`${btn.navy} shrink-0`}>Add</button>
      </form>
    </Card>
  )
}

const LABELS = {
  database: ['Database (Supabase)', (v) => v === 'supabase'],
  email: ['Emails (Resend)', Boolean],
  sales_email: ['Sales team notifications', Boolean],
  online_payment: ['Online payment (Razorpay)', Boolean],
  shiprocket: ['Shiprocket automation', Boolean],
  lead_forwarding: ['Lead copy to Prosper CRM and Zoho', Boolean],
}

export default function AdminSettings({ integrations }) {
  const { data, error } = useLoad('/admin/settings')
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ kind: 'error', text: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      const s = data.settings
      setForm({ ...s, shipping_flat: String(s.shipping_flat_paise / 100), free_shipping_threshold: String(s.free_shipping_threshold_paise / 100) })
    }
  }, [data])

  if (error && !data) return <Alert>{error}</Alert>
  if (!form) return <PageLoading />

  const top = (key, extra = {}) => ({ id: key, value: form[key] ?? '', onChange: (e) => setForm({ ...form, [key]: e.target.value }), className: inputClass, 'aria-invalid': errors[key] ? 'true' : undefined, ...extra })
  const nested = (group, key, extra = {}) => ({
    id: `${group}-${key}`,
    value: form[group]?.[key] ?? '',
    onChange: (e) => setForm({ ...form, [group]: { ...form[group], [key]: e.target.value } }),
    className: inputClass,
    'aria-invalid': errors[`${group}.${key}`] ? 'true' : undefined,
    ...extra,
  })

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setMessage({ kind: 'error', text: '' })
    try {
      await api('/admin/settings', {
        method: 'PUT',
        body: {
          ...form,
          shipping_flat_paise: Math.round(Number(form.shipping_flat) * 100),
          free_shipping_threshold_paise: Math.round(Number(form.free_shipping_threshold) * 100),
          delivery_days_min: Number(form.delivery_days_min),
          delivery_days_max: Number(form.delivery_days_max),
          low_stock_threshold: Number(form.low_stock_threshold),
        },
      })
      setMessage({ kind: 'ok', text: 'Settings saved.' })
    } catch (err) {
      setErrors(err.data?.fields || {})
      setMessage({ kind: 'error', text: err.message })
    } finally {
      setSaving(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <form onSubmit={save} noValidate>
        <PageTitle title="Settings">
          <button type="submit" disabled={saving} className={`${btn.gold} !py-2`}>
            {saving && <Spinner />}
            Save settings
          </button>
        </PageTitle>
        <Alert kind={message.kind}>{message.text}</Alert>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="Shipping">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="shipping_flat" label="Shipping charge (₹, incl. GST)" error={errors.shipping_flat_paise}>
                <input type="number" inputMode="decimal" min="0" step="1" {...top('shipping_flat')} />
              </Field>
              <Field id="free_shipping_threshold" label="Free shipping above (₹)" error={errors.free_shipping_threshold_paise} hint="0 = never free.">
                <input type="number" inputMode="decimal" min="0" step="1" {...top('free_shipping_threshold')} />
              </Field>
              <Field id="delivery_days_min" label="Fastest delivery (days)" error={errors.delivery_days_min}>
                <input type="number" inputMode="numeric" min="0" {...top('delivery_days_min')} />
              </Field>
              <Field id="delivery_days_max" label="Slowest delivery (days)" error={errors.delivery_days_max}>
                <input type="number" inputMode="numeric" min="0" {...top('delivery_days_max')} />
              </Field>
              <Field id="low_stock_threshold" label="Low stock alert at" error={errors.low_stock_threshold} hint="Email the sales team when stock falls to this number.">
                <input type="number" inputMode="numeric" min="0" {...top('low_stock_threshold')} />
              </Field>
            </div>
          </Card>

          <Card title="Bank transfer and UPI">
            <p className="mb-4 text-sm text-ink-600">Shown to customers who choose bank transfer or UPI. Each option appears at checkout only when its details are filled in.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="bank-account_name" label="Account name">
                <input type="text" {...nested('bank', 'account_name')} />
              </Field>
              <Field id="bank-account_number" label="Account number">
                <input type="text" inputMode="numeric" autoComplete="off" {...nested('bank', 'account_number')} />
              </Field>
              <Field id="bank-ifsc" label="IFSC" error={errors['bank.ifsc']}>
                <input type="text" maxLength={11} {...nested('bank', 'ifsc', { style: { textTransform: 'uppercase' } })} />
              </Field>
              <Field id="bank-bank_name" label="Bank">
                <input type="text" {...nested('bank', 'bank_name')} />
              </Field>
              <Field id="bank-branch" label="Branch" optional>
                <input type="text" {...nested('bank', 'branch')} />
              </Field>
              <Field id="upi_id" label="UPI ID" optional error={errors.upi_id}>
                <input type="text" placeholder="name@bank" {...top('upi_id')} />
              </Field>
            </div>
          </Card>

          <Card title="Invoice details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="seller-legal_name" label="Legal business name" className="sm:col-span-2">
                <input type="text" {...nested('seller', 'legal_name')} />
              </Field>
              <Field id="seller-gstin" label="Your GSTIN" error={errors['seller.gstin']}>
                <input type="text" maxLength={15} {...nested('seller', 'gstin', { style: { textTransform: 'uppercase' } })} />
              </Field>
              <Field id="seller-state" label="State you bill from" hint="Decides CGST + SGST or IGST.">
                <select {...nested('seller', 'state')}>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field id="seller-address" label="Address on invoices" className="sm:col-span-2">
                <textarea rows={2} {...nested('seller', 'address')} />
              </Field>
              <Field id="invoice_prefix" label="Invoice number prefix" hint="Example: PI/ gives PI/26-27/00001.">
                <input type="text" maxLength={12} {...top('invoice_prefix')} />
              </Field>
            </div>
          </Card>

          <Card title="Support contacts">
            <p className="mb-4 text-sm text-ink-600">Shown on shop pages, order pages and in every email.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="support_email" label="Support email" error={errors.support_email}>
                <input type="email" {...top('support_email')} />
              </Field>
              <Field id="support_phone" label="Support phone">
                <input type="tel" {...top('support_phone')} />
              </Field>
              <Field id="whatsapp_number" label="WhatsApp number" hint="Digits only, with country code. Example: 919876543210.">
                <input type="tel" {...top('whatsapp_number')} />
              </Field>
            </div>
          </Card>
        </div>
      </form>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Staff />
        <Card title="Connected services">
          <ul className="flex flex-col gap-2 text-sm">
            {Object.entries(LABELS).map(([key, [label, on]]) => (
              <li key={key} className="flex items-center gap-2.5">
                {on(integrations[key]) ? <Check className="h-4 w-4 text-[#3f7a0c]" /> : <X className="h-4 w-4 text-ink-500" />}
                <span className={on(integrations[key]) ? 'font-semibold text-ink-900' : 'text-ink-600'}>{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-500">These are switched on by adding keys in Vercel. See docs/shop-setup.md.</p>
        </Card>
      </div>
    </>
  )
}
