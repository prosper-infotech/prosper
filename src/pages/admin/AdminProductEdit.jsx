import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Plus, Trash2 } from 'lucide-react'
import { api } from '../../shop/api'
import { Field, PageLoading, Spinner } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { Alert, Card } from './adminUi'
import PhotoManager from './PhotoManager'
import { useLoad } from './useLoad'

const BLANK = {
  name: '', sku: '', slug: '', brand: 'Prosper Infotech', category_id: '', short_description: '', long_description: '',
  price: '', mrp: '', gst_percent: 18, hsn_code: '', stock_qty: 0, min_order_qty: 1, weight_grams: '',
  is_active: true, is_featured: false, quote_only: false, images: '', datasheet_url: '', specs: [{ label: '', value: '' }],
  seo_title: '', seo_description: '',
}

const toForm = (p) => ({
  ...BLANK,
  ...Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v ?? ''])),
  price: p.price_paise ? String(p.price_paise / 100) : '',
  mrp: p.mrp_paise ? String(p.mrp_paise / 100) : '',
  images: (p.images || []).join('\n'),
  specs: p.specs?.length ? p.specs : [{ label: '', value: '' }],
})

export default function AdminProductEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, error } = useLoad('/admin/products')
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ kind: 'error', text: '' })
  const [saving, setSaving] = useState(false)

  const existing = id ? data?.products.find((p) => p.id === id) : null
  useEffect(() => {
    if (!data) return
    if (id) setForm(existing ? toForm(existing) : false)
    else setForm({ ...BLANK, category_id: data.categories[0]?.id || '' })
    // Reload the form only when a different product is opened.
  }, [id, Boolean(data)]) // eslint-disable-line

  if (error && !data) return <Alert>{error}</Alert>
  if (form === null) return <PageLoading />
  if (form === false) return <Alert>Product not found.</Alert>

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const text = (key, extra = {}) => ({ id: key, value: form[key], onChange: set(key), className: inputClass, 'aria-invalid': errors[key] ? 'true' : undefined, ...extra })
  const setSpec = (i, key, value) => setForm({ ...form, specs: form.specs.map((s, n) => (n === i ? { ...s, [key]: value } : s)) })

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setMessage({ kind: 'error', text: '' })
    const num = (v) => (v === '' || v === null ? null : Number(v))
    const body = {
      ...form,
      price: form.price === '' ? null : form.price,
      mrp: form.mrp === '' ? null : form.mrp,
      price_paise: undefined,
      mrp_paise: undefined,
      gst_percent: Number(form.gst_percent),
      stock_qty: Number(form.stock_qty),
      min_order_qty: Number(form.min_order_qty),
      weight_grams: num(form.weight_grams),
      images: form.images.split('\n').map((s) => s.trim()).filter(Boolean),
      specs: form.specs.filter((s) => s.label.trim() && s.value.trim()),
    }
    try {
      const res = await api(id ? `/admin/products/${id}` : '/admin/products', { method: id ? 'PUT' : 'POST', body })
      setMessage({ kind: 'ok', text: 'Saved. The shop shows the change within a minute.' })
      if (!id) navigate(`/admin/products/${res.product.id}`, { replace: true })
      else setForm(toForm(res.product))
    } catch (err) {
      setErrors(err.data?.fields || {})
      setMessage({ kind: 'error', text: err.message })
    } finally {
      setSaving(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const willSell = form.is_active && !form.quote_only && Number(form.price) > 0 && Number(form.stock_qty) >= Number(form.min_order_qty || 1)

  return (
    <form onSubmit={save} noValidate>
      <Link to="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        All products
      </Link>
      <div className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold md:text-3xl">{id ? form.name || 'Edit product' : 'Add product'}</h1>
        <div className="flex gap-2">
          {id && form.slug && (
            <Link to={`/p/${form.slug}`} target="_blank" className={`${btn.ghost} !py-2`}>
              <ExternalLink className="h-4 w-4" />
              View in shop
            </Link>
          )}
          <button type="submit" disabled={saving} className={`${btn.gold} !py-2`}>
            {saving && <Spinner />}
            Save
          </button>
        </div>
      </div>

      <Alert kind={message.kind}>{message.text}</Alert>
      <p className={`mb-5 rounded-xl px-4 py-3 text-sm font-semibold ${willSell ? 'bg-accent-green/10 text-[#2f5d09]' : 'bg-primary/5 text-primary'}`}>
        {willSell
          ? 'With these details, customers can add this product to the cart and buy it.'
          : !form.is_active
            ? 'This product is hidden from the shop.'
            : form.quote_only || !(Number(form.price) > 0)
              ? 'This product shows "Request price" and opens the quote form. Add a price and stock to sell it online.'
              : 'This product shows as out of stock. Add stock to sell it online.'}
      </p>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card title="Basics">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Product name" error={errors.name} className="sm:col-span-2">
                <input type="text" {...text('name')} />
              </Field>
              <Field id="sku" label="SKU" error={errors.sku} hint="Your stock code. Must be unique.">
                <input type="text" {...text('sku', { style: { textTransform: 'uppercase' } })} />
              </Field>
              <Field id="brand" label="Brand" optional>
                <input type="text" {...text('brand')} />
              </Field>
              <Field id="category_id" label="Category" error={errors.category}>
                <select {...text('category_id')}>
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>
              <Field id="slug" label="Web address name" optional error={errors.slug} hint="Leave empty to create it from the name.">
                <input type="text" {...text('slug')} />
              </Field>
              <Field id="short_description" label="Short description" hint="One or two lines shown under the name." className="sm:col-span-2">
                <textarea rows={2} maxLength={300} {...text('short_description')} />
              </Field>
              <Field id="long_description" label="Full description" optional className="sm:col-span-2">
                <textarea rows={6} {...text('long_description')} />
              </Field>
            </div>
          </Card>

          <Card title="Specifications" action={<button type="button" onClick={() => setForm({ ...form, specs: [...form.specs, { label: '', value: '' }] })} className="inline-flex items-center gap-1 text-sm font-bold text-primary underline"><Plus className="h-4 w-4" />Add row</button>}>
            <ul className="flex flex-col gap-2">
              {form.specs.map((spec, i) => (
                <li key={i} className="flex gap-2">
                  <input aria-label={`Specification ${i + 1} name`} value={spec.label} onChange={(e) => setSpec(i, 'label', e.target.value)} placeholder="Frequency" className={`${inputClass} !w-2/5`} />
                  <input aria-label={`Specification ${i + 1} value`} value={spec.value} onChange={(e) => setSpec(i, 'value', e.target.value)} placeholder="UHF 860-960 MHz" className={inputClass} />
                  <button type="button" onClick={() => setForm({ ...form, specs: form.specs.filter((_s, n) => n !== i) })} aria-label={`Remove specification ${i + 1}`} className="flex w-10 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Photos">
            <PhotoManager
              images={form.images.split('\n').map((x) => x.trim()).filter(Boolean)}
              onChange={(list) => setForm((f) => ({ ...f, images: list.join('\n') }))}
              error={errors.images}
            />
          </Card>

          <Card title="Datasheet">
            <Field id="datasheet_url" label="Datasheet PDF link" optional error={errors.datasheet_url}>
              <input type="url" placeholder="https://..." {...text('datasheet_url')} />
            </Field>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Price and tax">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="price" label="Price (₹, incl. GST)" error={errors.price} hint='Empty = "Request price".'>
                <input type="number" inputMode="decimal" min="0" step="0.01" {...text('price')} />
              </Field>
              <Field id="mrp" label="MRP (₹)" optional error={errors.mrp} hint="Shown struck through.">
                <input type="number" inputMode="decimal" min="0" step="0.01" {...text('mrp')} />
              </Field>
              <Field id="gst_percent" label="GST %" error={errors.gst_percent}>
                <input type="number" inputMode="decimal" min="0" max="40" step="0.01" {...text('gst_percent')} />
              </Field>
              <Field id="hsn_code" label="HSN code" optional error={errors.hsn_code}>
                <input type="text" inputMode="numeric" {...text('hsn_code')} />
              </Field>
            </div>
          </Card>

          <Card title="Stock and shipping">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="stock_qty" label="In stock" error={errors.stock_qty}>
                <input type="number" inputMode="numeric" min="0" step="1" {...text('stock_qty')} />
              </Field>
              <Field id="min_order_qty" label="Minimum order" error={errors.min_order_qty}>
                <input type="number" inputMode="numeric" min="1" step="1" {...text('min_order_qty')} />
              </Field>
              <Field id="weight_grams" label="Weight (grams)" optional error={errors.weight_grams} className="sm:col-span-2">
                <input type="number" inputMode="numeric" min="1" step="1" {...text('weight_grams')} />
              </Field>
            </div>
          </Card>

          <Card title="Visibility">
            <div className="flex flex-col gap-3 text-sm font-semibold text-ink-900">
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={form.is_active} onChange={set('is_active')} className="h-5 w-5 rounded accent-primary" />
                Show in the shop
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} className="h-5 w-5 rounded accent-primary" />
                Feature on the shop home page
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={form.quote_only} onChange={set('quote_only')} className="h-5 w-5 rounded accent-primary" />
                Quote only (never sold through the cart)
              </label>
            </div>
          </Card>

          <Card title="Search engines">
            <Field id="seo_title" label="Page title" optional hint="Leave empty to use the product name.">
              <input type="text" maxLength={120} {...text('seo_title')} />
            </Field>
            <Field id="seo_description" label="Search description" optional className="mt-4">
              <textarea rows={3} maxLength={300} {...text('seo_description')} />
            </Field>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" disabled={saving} className={btn.gold}>
          {saving && <Spinner />}
          Save product
        </button>
      </div>
    </form>
  )
}
