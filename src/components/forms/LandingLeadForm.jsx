import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

async function submitLead(data) {
  if (!FORMSPREE_ID) {
    throw new Error('Formspree is not configured — set VITE_FORMSPREE_ID in .env')
  }

  const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Formspree submission failed')
  }
}

const inputClasses =
  'w-full rounded-md border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent'

export default function LandingLeadForm({
  campaign = 'AS400 Development Landing Page',
  submitLabel = 'Get a free consultation',
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [status, setStatus] = useState(null)

  const onSubmit = async (data) => {
    try {
      await submitLead({
        ...data,
        _subject: `New lead — ${campaign}`,
        source: campaign,
      })
      window.gtag?.('event', 'generate_lead', {
        event_category: campaign,
      })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lp-name" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Name
          </label>
          <input
            id="lp-name"
            type="text"
            className={inputClasses}
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="lp-email" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Email
          </label>
          <input
            id="lp-email"
            type="email"
            className={inputClasses}
            placeholder="you@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lp-company" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Company <span className="text-ink-500 font-normal">(optional)</span>
          </label>
          <input
            id="lp-company"
            type="text"
            className={inputClasses}
            placeholder="Company name"
            {...register('company')}
          />
        </div>

        <div>
          <label htmlFor="lp-phone" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Phone
          </label>
          <input
            id="lp-phone"
            type="tel"
            className={inputClasses}
            placeholder="+1 234 567 8900"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="lp-message" className="block text-sm font-semibold text-ink-900 mb-1.5">
          What do you need help with? <span className="text-ink-500 font-normal">(optional)</span>
        </label>
        <textarea
          id="lp-message"
          rows={3}
          className={inputClasses}
          placeholder="e.g. RPGLE support, modernization, ongoing 24x7 coverage..."
          {...register('message')}
        />
      </div>

      <Button
        type="submit"
        variant="primary-dark"
        disabled={isSubmitting}
        className="self-stretch sm:self-start disabled:opacity-60"
      >
        {isSubmitting ? 'Sending...' : submitLabel}
      </Button>

      {status === 'success' && (
        <p className="text-sm text-accent-green font-semibold">
          Thanks — our team will reach out shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 font-semibold">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
