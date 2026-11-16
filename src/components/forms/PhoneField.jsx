import { useState } from 'react'
import { useController } from 'react-hook-form'
import {
  PHONE_COUNTRIES,
  detectDefaultCountry,
  formatPhone,
  getCountry,
  parseInternational,
  validatePhone,
} from './phone'

// Country-code dropdown + number box. The form value is "<code> <number>"
// (e.g. "+91 9876543210"); the optional field is '' when left empty.
export default function PhoneField({ control, name = 'phone', id, inputClasses }) {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: '',
    rules: { validate: validatePhone },
  })
  const [countryId, setCountryId] = useState(detectDefaultCountry)
  const [text, setText] = useState('')
  const country = getCountry(countryId)

  const update = (nextCountryId, nextText) => {
    setCountryId(nextCountryId)
    setText(nextText)
    field.onChange(formatPhone(nextCountryId, nextText))
  }

  const onNumberChange = (e) => {
    const raw = e.target.value
    const full = parseInternational(raw)
    if (full) {
      update(full.countryId, full.number)
    } else if (/^\s*(\+|00)/.test(raw)) {
      // A "+" with a code we don't offer — keep the text so the error can say why.
      update(countryId, raw)
    } else {
      update(countryId, raw.replace(/\D/g, ''))
    }
  }

  const error = fieldState.error?.message

  return (
    <div>
      <div className="flex gap-2">
        <select
          aria-label="Country code"
          value={countryId}
          onChange={(e) => update(e.target.value, text)}
          className={`${inputClasses} w-auto! shrink-0 pr-2`}
        >
          {PHONE_COUNTRIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className={`${inputClasses} min-w-0`}
          placeholder={country.placeholder}
          value={text}
          onChange={onNumberChange}
          onBlur={field.onBlur}
          ref={field.ref}
          aria-invalid={error ? 'true' : undefined}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
