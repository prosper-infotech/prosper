import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FileText, LogOut, MapPin, Package, Pencil, Plus, RotateCcw, Trash2, User } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { api, ApiError } from '../../shop/api'
import { useShop } from '../../shop/shopContext'
import SignIn from '../../shop/components/SignIn'
import AddressFields from '../../shop/components/AddressFields'
import { Field, PageLoading, ProductImage, Spinner, StatusBadge } from '../../shop/components/ui'
import { btn, formatDate, inputClass } from '../../shop/format'
import { formatINR, isOrderable } from '../../../shared/pricing.js'

const TABS = [
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'profile', label: 'Profile', icon: User },
]

function Orders({ orders }) {
  const { products, add, openDrawer } = useShop()
  const [message, setMessage] = useState('')

  const reorder = (order) => {
    let added = 0
    for (const item of order.items) {
      const product = products.find((p) => p.id === item.product_id)
      if (product && isOrderable(product) && add(product, item.qty, { open: false })) added += 1
    }
    setMessage(added === order.items.length ? '' : added ? 'Some items are no longer available and were left out.' : 'These items are not available to order right now.')
    if (added) openDrawer()
  }

  if (!orders.length) {
    return (
      <div className="rounded-md border border-[#eaeaec] bg-white p-8 text-center">
        <p className="font-heading text-lg font-bold text-primary">No orders yet</p>
        <p className="mt-1 text-sm text-ink-600">Orders placed with this email address appear here, including ones placed without signing in.</p>
        <Link to="/" className={`${btn.gold} mt-5`}>
          Go to the shop
        </Link>
      </div>
    )
  }
  return (
    <>
      {message && <p role="status" className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
      <ul className="flex flex-col gap-4">
        {orders.map((order) => (
          <li key={order.token} className="rounded-md border border-[#eaeaec] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Link to={`/order/${order.token}`} className="font-heading text-lg font-bold text-primary hover:underline">
                  {order.order_number}
                </Link>
                <p className="text-sm text-ink-500">
                  {formatDate(order.created_at)} · {formatINR(order.total_paise)}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-3">
              {order.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-sm text-ink-900">
                  <span className="w-8 overflow-hidden rounded">
                    <ProductImage product={{ name: item.name, images: item.image ? [item.image] : [] }} ratio="aspect-square" iconSize="h-6 w-6" />
                  </span>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to={`/order/${order.token}`} className={`${btn.ghost} !py-2`}>
                View order
              </Link>
              {order.invoice_number && (
                <Link to={`/order/${order.token}/invoice`} target="_blank" className={`${btn.ghost} !py-2`}>
                  <FileText className="h-4 w-4" />
                  Invoice
                </Link>
              )}
              <button type="button" onClick={() => reorder(order)} className={`${btn.navy} !py-2`}>
                <RotateCcw className="h-4 w-4" />
                Order again
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function AddressForm({ address, onSaved, onCancel }) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { address: address || { name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' }, is_default: address?.is_default || false },
  })
  const [formError, setFormError] = useState('')
  const save = async (values) => {
    setFormError('')
    try {
      await api(address ? `/account/addresses/${address.id}` : '/account/addresses', { method: address ? 'PUT' : 'POST', body: { ...values.address, is_default: values.is_default } })
      onSaved()
    } catch (err) {
      if (err instanceof ApiError && err.data.fields) for (const [k, message] of Object.entries(err.data.fields)) setError(`address.${k}`, { message })
      setFormError(err.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(save)} noValidate className="rounded-md border border-gold-dark/50 bg-white p-5">
      <h3 className="mb-4 text-lg">{address ? 'Edit address' : 'New address'}</h3>
      <AddressFields register={register} errors={errors.address} prefix="address" withContact />
      <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink-900">
        <input type="checkbox" className="h-5 w-5 rounded accent-primary" {...register('is_default')} />
        Use as my default delivery address
      </label>
      {formError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{formError}</p>}
      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={isSubmitting} className={btn.gold}>
          {isSubmitting && <Spinner />}
          Save address
        </button>
        <button type="button" onClick={onCancel} className={btn.ghost}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function Addresses({ addresses, reload }) {
  const [editing, setEditing] = useState(null) // null | 'new' | address
  const remove = async (id) => {
    await api(`/account/addresses/${id}`, { method: 'DELETE' }).catch(() => {})
    reload()
  }
  if (editing) return <AddressForm address={editing === 'new' ? null : editing} onSaved={() => { setEditing(null); reload() }} onCancel={() => setEditing(null)} />
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <li key={a.id} className="rounded-md border border-[#eaeaec] bg-white p-5">
            {a.is_default && <span className="mb-2 inline-block rounded-full bg-gold/40 px-2.5 py-0.5 text-xs font-bold text-primary">Default</span>}
            <address className="text-sm not-italic leading-relaxed text-ink-900">
              <strong>{a.name}</strong>
              <br />
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ''}
              <br />
              {a.city}, {a.state} {a.pincode}
              <br />
              Phone: {a.phone}
            </address>
            <div className="mt-3 flex gap-4 text-sm">
              <button type="button" onClick={() => setEditing(a)} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button type="button" onClick={() => remove(a.id)} className="inline-flex items-center gap-1.5 font-semibold text-red-700 hover:underline">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!addresses.length && <p className="rounded-md border border-[#eaeaec] bg-white p-6 text-sm text-ink-600">No saved addresses yet. Save one to fill in checkout faster.</p>}
      <button type="button" onClick={() => setEditing('new')} className={`${btn.gold} mt-5`}>
        <Plus className="h-4 w-4" />
        Add an address
      </button>
    </>
  )
}

function Profile({ customer, reload, onDeleted }) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ defaultValues: customer })
  const [saved, setSaved] = useState(false)
  const [formError, setFormError] = useState('')
  const [confirming, setConfirming] = useState(false)
  const save = async (values) => {
    setSaved(false)
    setFormError('')
    try {
      await api('/account/profile', { method: 'PUT', body: values })
      setSaved(true)
      reload()
    } catch (err) {
      if (err instanceof ApiError && err.data.fields) for (const [k, message] of Object.entries(err.data.fields)) setError(k, { message })
      setFormError(err.message)
    }
  }
  const removeAccount = async () => {
    await api('/account', { method: 'DELETE' })
    onDeleted()
  }
  const input = (name, extra = {}) => ({ id: `profile-${name}`, className: inputClass, 'aria-invalid': errors[name] ? 'true' : undefined, ...register(name), ...extra })
  return (
    <>
      <form onSubmit={handleSubmit(save)} noValidate className="rounded-md border border-[#eaeaec] bg-white p-5 md:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="profile-email" label="Email" hint="Your sign-in email. Contact us to change it.">
            <input id="profile-email" value={customer.email} disabled className={`${inputClass} bg-surface text-ink-500`} />
          </Field>
          <Field id="profile-name" label="Full name" error={errors.name?.message}>
            <input type="text" autoComplete="name" {...input('name')} />
          </Field>
          <Field id="profile-phone" label="Mobile number" error={errors.phone?.message}>
            <input type="tel" autoComplete="tel" {...input('phone')} />
          </Field>
          <Field id="profile-company" label="Company name" optional>
            <input type="text" autoComplete="organization" {...input('company')} />
          </Field>
          <Field id="profile-gstin" label="GSTIN" optional error={errors.gstin?.message}>
            <input type="text" maxLength={15} {...input('gstin', { style: { textTransform: 'uppercase' } })} />
          </Field>
        </div>
        {formError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{formError}</p>}
        {saved && <p role="status" className="mt-3 text-sm font-semibold text-[#3f7a0c]">Saved.</p>}
        <button type="submit" disabled={isSubmitting} className={`${btn.gold} mt-5`}>
          {isSubmitting && <Spinner />}
          Save changes
        </button>
      </form>

      <div className="mt-6 rounded-md border border-red-200 bg-white p-5 md:p-7">
        <h3 className="text-lg !text-red-800">Delete my account</h3>
        <p className="mt-1 text-sm text-ink-600">
          This removes your profile and saved addresses. Records of past orders and invoices are kept, as tax law requires.
        </p>
        {confirming ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={removeAccount} className="rounded-lg bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800">
              Yes, delete my account
            </button>
            <button type="button" onClick={() => setConfirming(false)} className={btn.ghost}>
              Keep my account
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className="mt-4 text-sm font-bold text-red-700 underline">
            Delete my account
          </button>
        )}
      </div>
    </>
  )
}

export default function Account() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('orders')
  useShop()
  useDocumentTitle('My Account | Prosper Infotech Shop', 'Your orders, invoices and saved addresses.', null, { noindex: true })

  const load = useCallback(() => api('/account').then(setData).catch(() => setData({ signed_in: false })), [])
  useEffect(() => {
    load()
  }, [load])

  const signOut = async () => {
    await api('/auth/sign-out', { method: 'POST', body: { purpose: 'customer' } }).catch(() => {})
    setData({ signed_in: false })
  }

  if (!data) return <PageLoading label="Loading your account" />
  if (!data.signed_in) {
    return (
      <div className="px-4 py-14 sm:py-20">
        <SignIn title="Sign in to your account" text="See your orders, download invoices and save addresses. We email you a code, so there is no password to remember." onDone={load} />
        <p className="mt-6 text-center text-sm text-ink-600">
          Just want to buy? You can{' '}
          <Link to="/" className="font-semibold text-primary underline">
            check out without an account
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">My account</h1>
          <p className="mt-1 text-sm text-ink-600">{data.customer.email}</p>
        </div>
        <button type="button" onClick={signOut} className={`${btn.ghost} !py-2`}>
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <div role="tablist" aria-label="Account sections" className="mt-6 flex gap-2 overflow-x-auto border-b border-[#eaeaec]">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px flex shrink-0 items-center gap-2 border-b-[3px] px-4 py-3 text-sm font-bold transition-colors ${tab === t.key ? 'border-gold-dark text-primary' : 'border-transparent text-ink-500 hover:text-primary'}`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            {t.key === 'orders' && data.orders.length > 0 && <span className="rounded-full bg-primary/10 px-2 text-xs">{data.orders.length}</span>}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {tab === 'orders' && <Orders orders={data.orders} />}
        {tab === 'addresses' && <Addresses addresses={data.addresses} reload={load} />}
        {tab === 'profile' && <Profile customer={data.customer} reload={load} onDeleted={() => navigate('/')} />}
      </div>
    </div>
  )
}
