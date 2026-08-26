import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { submitToPrivyr } from './privyr'
import { attributeSource, captureUtmParams } from '../../utils/attribution'

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

const DEFAULT_SERVICE_OPTIONS = [
  'AS400 Development (RPG/RPGLE)',
  'AS400 Support / Help Desk',
  'AS400 Modernization',
  'Migration / Cloud Integration',
  'Not sure — need guidance',
]

export default function LandingLeadForm({
  campaign = 'AS400 Development Landing Page',
  submitLabel = 'Get a free consultation',
  serviceLabel = 'What do you need help with?',
  serviceOptions = DEFAULT_SERVICE_OPTIONS,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const utm = captureUtmParams()
      const source = attributeSource(campaign)

      await submitLead({
        ...data,
        _subject: `New lead — ${campaign} (${data.service})`,
        source,
        ...utm,
      })
      submitToPrivyr({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: [
          data.service && `Interested in: ${data.service}`,
          data.company && `Company: ${data.company}`,
          data.message,
        ]
          .filter(Boolean)
          .join(' | '),
        source,
      })
      window.gtag?.('event', 'generate_lead', {
        event_category: campaign,
        event_label: data.service,
      })
      sessionStorage.setItem('lp_lead_submitted', campaign)
      navigate(`/lp/thank-you?campaign=${encodeURIComponent(campaign)}`)
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
            Phone <span className="text-ink-500 font-normal">(optional)</span>
          </label>
          <input
            id="lp-phone"
            type="tel"
            className={inputClasses}
            placeholder="+1 234 567 8900"
            {...register('phone')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="lp-service" className="block text-sm font-semibold text-ink-900 mb-1.5">
          {serviceLabel}
        </label>
        <select
          id="lp-service"
          className={inputClasses}
          defaultValue=""
          {...register('service', { required: 'Please select an option' })}
        >
          <option value="" disabled>
            Select an option
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="lp-message" className="block text-sm font-semibold text-ink-900 mb-1.5">
          Anything else we should know? <span className="text-ink-500 font-normal">(optional)</span>
        </label>
        <textarea
          id="lp-message"
          rows={2}
          className={inputClasses}
          placeholder="Add any extra detail about your environment or timeline..."
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

      {status === 'error' && (
        <p className="text-sm text-red-600 font-semibold">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
