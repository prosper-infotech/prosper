import { useState } from 'react'
import { KeyRound, Mail } from 'lucide-react'
import { api } from '../api'
import { Field, Spinner } from './ui'
import { btn, inputClass } from '../format'

// Sign in with a 6-digit code sent by email. Used by customers and staff.
export default function SignIn({ purpose = 'customer', title, text, onDone }) {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const sendCode = async (e) => {
    e?.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('/auth/request-code', { method: 'POST', body: { email, purpose } })
      setStep('code')
      setCode('')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const verify = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('/auth/verify-code', { method: 'POST', body: { email, purpose, code } })
      onDone()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-ink-300/70 bg-white p-6 shadow-[0_24px_50px_-30px_rgba(20,52,109,0.45)] sm:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary">
        {step === 'email' ? <Mail className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
      </div>
      <h1 className="mt-4 text-2xl font-extrabold">{step === 'email' ? title : 'Enter your code'}</h1>
      <p className="mt-1.5 text-sm text-ink-600">
        {step === 'email' ? text : `If ${email} can sign in here, a 6-digit code is on its way. It works for 10 minutes.`}
      </p>

      {step === 'email' ? (
        <form onSubmit={sendCode} className="mt-6 flex flex-col gap-4" noValidate>
          <Field id="signin-email" label="Email address" error={error}>
            <input id="signin-email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} aria-invalid={error ? 'true' : undefined} />
          </Field>
          <button type="submit" disabled={busy || !email.trim()} className={`${btn.gold} w-full !py-3.5`}>
            {busy && <Spinner />}
            Email me a sign-in code
          </button>
          <p className="text-center text-xs text-ink-500">No password needed.</p>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-6 flex flex-col gap-4" noValidate>
          <Field id="signin-code" label="6-digit code" error={error}>
            <input
              id="signin-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className={`${inputClass} text-center !text-2xl font-bold tracking-[0.5em]`}
              aria-invalid={error ? 'true' : undefined}
            />
          </Field>
          <button type="submit" disabled={busy || code.length !== 6} className={`${btn.gold} w-full !py-3.5`}>
            {busy && <Spinner />}
            Sign in
          </button>
          <div className="flex justify-between text-sm">
            <button type="button" onClick={() => { setStep('email'); setError('') }} className="font-semibold text-primary underline">
              Use another email
            </button>
            <button type="button" onClick={sendCode} disabled={busy} className="font-semibold text-primary underline">
              Send a new code
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
