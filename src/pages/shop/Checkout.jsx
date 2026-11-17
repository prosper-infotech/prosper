import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Banknote, ChevronDown, CreditCard, Lock, ShieldCheck, ShoppingCart, Smartphone } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { api, ApiError } from '../../shop/api'
import { payWithRazorpay } from '../../shop/razorpay'
import { track } from '../../shop/track'
import AddressFields from '../../shop/components/AddressFields'
import { Totals } from '../../shop/components/CartLines'
import { EmptyState, Field, PageLoading, ProductImage, Spinner } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'
import { validateAddress, validateContact } from '../../../shared/india.js'

const DRAFT_KEY = 'pi_checkout_draft'
const BLANK_ADDRESS = { line1: '', line2: '', city: '', state: '', pincode: '' }
const DEFAULTS = {
  contact: { name: '', email: '', phone: '', company: '', gstin: '' },
  shipping: BLANK_ADDRESS,
  billing_same: true,
  billing: { name: '', phone: '', ...BLANK_ADDRESS },
  notes: '',
  payment_method: '',
  accept_terms: false,
  website: '',
}

function readDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null')
    return draft ? { ...DEFAULTS, ...draft, accept_terms: false, website: '' } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

function Section({ step, title, children }) {
  return (
    <section className="rounded-2xl border border-ink-300/70 bg-white p-5 md:p-7">
      <h2 className="mb-5 flex items-center gap-3 text-xl">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Summary({ priced }) {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {priced.items.map((item) => (
          <li key={item.product_id} className="flex items-center gap-3">
            <div className="relative w-14 shrink-0">
              <div className="overflow-hidden rounded-lg border border-ink-300/60">
                <ProductImage product={{ name: item.name, images: item.image ? [item.image] : [] }} ratio="aspect-square" iconSize="h-8 w-8" />
              </div>
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">{item.qty}</span>
            </div>
            <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-ink-900">{item.name}</p>
            <p className="shrink-0 text-sm font-bold text-ink-900">{formatINR(item.line_total_paise)}</p>
          </li>
        ))}
      </ul>
      <Totals priced={priced} className="mt-5 border-t border-ink-300/70 pt-4" />
    </>
  )
}

export default function Checkout() {
  const { ready, lines, priced, config, clear, refreshCatalogue } = useShop()
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')
  const [placing, setPlacing] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const errorRef = useRef(null)
  const tracked = useRef(false)
  const prefilled = useRef(false)

  useDocumentTitle('Checkout | Prosper Infotech Shop', 'Enter your delivery details and place your order.', null, { noindex: true })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: readDraft() })

  const billingSame = watch('billing_same')
  const method = watch('payment_method')

  const methods = [
    config.online_payment && { value: 'razorpay', icon: CreditCard, title: 'Pay online', text: 'Card, UPI, net banking or wallet. Confirmed in seconds.' },
    config.upi_payment && { value: 'upi_manual', icon: Smartphone, title: 'UPI transfer', text: 'Pay to our UPI ID from any UPI app. We confirm once it arrives.' },
    config.bank_payment && { value: 'bank_transfer', icon: Banknote, title: 'Bank transfer', text: 'NEFT, RTGS or IMPS. Good for company payments and purchase orders.' },
  ].filter(Boolean)
  const firstMethod = methods[0]?.value

  useEffect(() => {
    if (firstMethod && !methods.some((m) => m.value === getValues('payment_method'))) setValue('payment_method', firstMethod)
  }, [firstMethod]) // eslint-disable-line

  // Keep what the customer typed if the page is refreshed.
  useEffect(() => {
    const sub = watch((values) => {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...values, accept_terms: false, website: '' }))
      } catch {
        // storage unavailable: nothing to do
      }
    })
    return () => sub.unsubscribe()
  }, [watch])

  // Signed-in customers get their saved details filled in (only into an empty form).
  useEffect(() => {
    if (prefilled.current) return
    prefilled.current = true
    api('/account')
      .then((acct) => {
        if (!acct.signed_in || getValues('contact.email')) return
        const address = acct.addresses.find((a) => a.is_default) || acct.addresses[0]
        reset({
          ...getValues(),
          contact: { ...acct.customer, email: acct.customer.email },
          shipping: address ? { line1: address.line1, line2: address.line2 || '', city: address.city, state: address.state, pincode: address.pincode } : getValues('shipping'),
        })
      })
      .catch(() => {})
  }, [getValues, reset])

  const hasItems = priced.items.length > 0
  useEffect(() => {
    if (ready && hasItems && !tracked.current) {
      tracked.current = true
      track.beginCheckout(priced)
    }
  }, [ready, hasItems, priced])

  const fail = (message) => {
    setFormError(message)
    // Take the customer to the first field that needs fixing (or to the message if there is none).
    requestAnimationFrame(() => {
      const field = document.querySelector('#checkout-form [aria-invalid="true"]')
      const target = field || errorRef.current
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      field?.focus({ preventScroll: true })
    })
  }

  const onSubmit = async (values) => {
    setFormError('')
    // Same checks the server runs, so mistakes show up straight away.
    const contact = validateContact(values.contact)
    const shipping = validateAddress({ ...values.shipping, name: values.contact.name, phone: values.contact.phone })
    const billing = values.billing_same ? { errors: {} } : validateAddress(values.billing)
    let bad = false
    const mark = (prefix, errs, skip = []) => {
      for (const [k, message] of Object.entries(errs)) {
        if (skip.includes(k)) continue
        bad = true
        setError(`${prefix}.${k}`, { message })
      }
    }
    mark('contact', contact.errors)
    mark('shipping', shipping.errors, ['name', 'phone'])
    mark('billing', billing.errors)
    if (!values.accept_terms) {
      bad = true
      setError('accept_terms', { message: 'Please accept the terms to place your order' })
    }
    if (!values.payment_method) return fail('Choose how you want to pay.')
    if (bad) return fail('Please check the highlighted fields.')

    setPlacing(true)
    try {
      track.addPaymentInfo(priced, values.payment_method)
      const res = await api('/checkout', {
        method: 'POST',
        body: {
          items: priced.items.map((i) => ({ id: i.product_id, qty: i.qty })),
          contact: values.contact,
          shipping: values.shipping,
          billing_same: values.billing_same,
          billing: values.billing_same ? undefined : values.billing,
          notes: values.notes,
          payment_method: values.payment_method,
          accept_terms: true,
          website: values.website,
          expected_total_paise: priced.total_paise,
        },
      })
      clear()
      try {
        sessionStorage.removeItem(DRAFT_KEY)
        sessionStorage.setItem('pi_new_order', res.token)
      } catch {
        // storage unavailable: nothing to do
      }
      let pay = ''
      if (res.razorpay) {
        try {
          pay = `?pay=${await payWithRazorpay(res.razorpay, res.token)}`
        } catch {
          pay = '?pay=error'
        }
      } else if (res.payment_error) pay = '?pay=error'
      navigate(`/order/${res.token}${pay}`, { replace: true })
    } catch (err) {
      setPlacing(false)
      if (err instanceof ApiError && err.data.fields) {
        for (const [name, message] of Object.entries(err.data.fields)) setError(name, { message })
        return fail(err.message)
      }
      if (err instanceof ApiError && err.status === 409) {
        await refreshCatalogue()
        return fail(`${err.message} Your cart has been updated with the latest prices and stock.`)
      }
      fail(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (!lines.length && !placing) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        text="Add a product to your cart before checking out."
        action={
          <Link to="/" className={btn.gold}>
            Go to the shop
          </Link>
        }
      />
    )
  }
  if (!ready) return <PageLoading label="Loading checkout" />
  if (!hasItems && !placing) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Some items are no longer available"
        text="Please review your cart before checking out."
        action={
          <Link to="/cart" className={btn.gold}>
            Review cart
          </Link>
        }
      />
    )
  }

  const input = (name, extra = {}) => {
    const error = name.split('.').reduce((o, k) => o?.[k], errors)
    const id = name.replace('.', '-')
    return { id, className: inputClass, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': error ? `${id}-error` : undefined, ...register(name), ...extra }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold md:text-4xl">Checkout</h1>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-[#3f7a0c]">
          <ShieldCheck className="h-4 w-4" />
          Secure checkout
        </p>
      </div>

      {/* Order summary, folded away on phones */}
      <div className="mt-5 rounded-2xl border border-ink-300/70 bg-white lg:hidden">
        <button type="button" onClick={() => setSummaryOpen((v) => !v)} aria-expanded={summaryOpen} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
          <span className="flex items-center gap-2 text-sm font-bold text-primary">
            <ShoppingCart className="h-4 w-4" />
            {summaryOpen ? 'Hide' : 'Show'} order summary
            <ChevronDown className={`h-4 w-4 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
          </span>
          <span className="font-heading text-lg font-extrabold text-primary">{formatINR(priced.total_paise)}</span>
        </button>
        {summaryOpen && (
          <div className="border-t border-ink-300/70 p-5">
            <Summary priced={priced} />
          </div>
        )}
      </div>

      <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          {formError && (
            <p ref={errorRef} role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              {formError}
            </p>
          )}

          <Section step={1} title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="contact-name" label="Full name" error={errors.contact?.name?.message} className="sm:col-span-2">
                <input type="text" autoComplete="name" {...input('contact.name')} />
              </Field>
              <Field id="contact-email" label="Email" hint="Your order confirmation and tracking link go here." error={errors.contact?.email?.message}>
                <input type="email" inputMode="email" autoComplete="email" {...input('contact.email')} />
              </Field>
              <Field id="contact-phone" label="Mobile number" hint="For delivery updates." error={errors.contact?.phone?.message}>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" {...input('contact.phone')} />
              </Field>
              <Field id="contact-company" label="Company name" optional error={errors.contact?.company?.message}>
                <input type="text" autoComplete="organization" {...input('contact.company')} />
              </Field>
              <Field id="contact-gstin" label="GSTIN" optional hint="Shown on your GST invoice." error={errors.contact?.gstin?.message}>
                <input type="text" autoCapitalize="characters" maxLength={15} placeholder="15 characters" {...input('contact.gstin', { style: { textTransform: 'uppercase' } })} />
              </Field>
            </div>
          </Section>

          <Section step={2} title="Delivery address">
            <AddressFields register={register} errors={errors.shipping} prefix="shipping" />
            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink-900">
              <input type="checkbox" className="h-5 w-5 rounded accent-primary" {...register('billing_same')} />
              Billing address is the same as delivery
            </label>
            {!billingSame && (
              <div className="mt-5 border-t border-ink-300/60 pt-5">
                <h3 className="mb-4 text-base">Billing address</h3>
                <AddressFields register={register} errors={errors.billing} prefix="billing" withContact />
              </div>
            )}
            <Field id="notes" label="Order notes" optional className="mt-5">
              <textarea rows={2} maxLength={1000} placeholder="Delivery instructions, purchase order number..." {...input('notes')} />
            </Field>
          </Section>

          <Section step={3} title="Payment">
            {methods.length === 0 ? (
              <p className="rounded-xl bg-surface-alt px-4 py-3 text-sm text-ink-900">
                Online ordering is being set up. Please{' '}
                <Link to="/contact" className="font-bold text-primary underline">
                  contact us
                </Link>{' '}
                and we will take your order directly.
              </p>
            ) : (
              <fieldset>
                <legend className="sr-only">Choose how to pay</legend>
                <div className="flex flex-col gap-3">
                  {methods.map((m) => (
                    <label
                      key={m.value}
                      className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-colors ${method === m.value ? 'border-gold-dark bg-surface-alt/60' : 'border-ink-300/70 hover:border-primary/40'}`}
                    >
                      <input type="radio" value={m.value} className="mt-1 h-5 w-5 accent-primary" {...register('payment_method')} />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 font-heading text-base font-bold text-primary">
                          <m.icon className="h-5 w-5" />
                          {m.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-600">{m.text}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {method && method !== 'razorpay' && (
                  <p className="mt-3 text-sm text-ink-600">You will see the payment details on the next page and in your email. Your order ships once the payment arrives.</p>
                )}
              </fieldset>
            )}
          </Section>

          {/* Bot trap: hidden from people, tempting to bots. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
          </div>

          <div className="rounded-2xl border border-ink-300/70 bg-white p-5 md:p-7">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-900">
              <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded accent-primary" aria-invalid={errors.accept_terms ? 'true' : undefined} {...register('accept_terms')} />
              <span>
                I agree to the{' '}
                <Link to="/terms-of-sale" target="_blank" className="font-semibold text-primary underline">Terms of Sale</Link>,{' '}
                <Link to="/returns-refunds" target="_blank" className="font-semibold text-primary underline">Returns &amp; Refunds</Link> and{' '}
                <Link to="/privacy-policy" target="_blank" className="font-semibold text-primary underline">Privacy Policy</Link>.
              </span>
            </label>
            {errors.accept_terms && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {errors.accept_terms.message}
              </p>
            )}
            <button type="submit" disabled={placing || methods.length === 0} className={`${btn.gold} mt-5 w-full !py-4 !text-base`}>
              {placing ? <Spinner className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              {placing ? 'Placing your order...' : method === 'razorpay' ? `Pay ${formatINR(priced.total_paise)}` : `Place order · ${formatINR(priced.total_paise)}`}
            </button>
            <p className="mt-3 text-center text-xs text-ink-500">Prices include GST. A GST invoice is issued once payment is received.</p>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-ink-300/70 bg-white p-6 shadow-[0_24px_50px_-30px_rgba(20,52,109,0.45)]">
            <h2 className="mb-5 text-lg">Order summary</h2>
            <Summary priced={priced} />
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface-alt px-3.5 py-3 text-xs leading-snug text-ink-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3f7a0c]" />
              {config.online_payment
                ? "Card details are entered on Razorpay's secure page. We never see or store them."
                : 'Your details are sent over a secure connection and used only for this order.'}
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}
