import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'

// TODO: wire up a real submission endpoint (Formspree or EmailJS per MASTER_PLAN.md
// Section 3) once the user has an account/API key for one of those services.
async function submitEnquiry(data) {
  console.info('Contact form submission (no backend wired yet):', data)
  await new Promise((resolve) => setTimeout(resolve, 400))
}

const inputClasses =
  'w-full rounded-md border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [status, setStatus] = useState(null)

  const onSubmit = async (data) => {
    try {
      await submitEnquiry(data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Email
          </label>
          <input
            id="email"
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Company <span className="text-ink-500 font-normal">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            className={inputClasses}
            placeholder="Company name"
            {...register('company')}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink-900 mb-1.5">
            Phone <span className="text-ink-500 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            placeholder="+1 234 567 8900"
            {...register('phone')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink-900 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClasses}
          placeholder="Tell us about your project"
          {...register('message', { required: 'Please add a short message' })}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary-dark" disabled={isSubmitting} className="self-start disabled:opacity-60">
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>

      {status === 'success' && (
        <p className="text-sm text-accent-green font-semibold">
          Thanks — we'll get back to you shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 font-semibold">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
