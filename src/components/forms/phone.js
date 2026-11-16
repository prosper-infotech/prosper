// Countries the forms accept. `digits` is the exact length of the national
// number (no country code, no leading 0) — checked on submit.
export const PHONE_COUNTRIES = [
  { id: 'US', label: 'US +1', dial: '+1', digits: 10, placeholder: '234 567 8900', name: 'US' },
  { id: 'IN', label: 'IND +91', dial: '+91', digits: 10, placeholder: '98765 43210', name: 'Indian' },
  { id: 'AE', label: 'UAE +971', dial: '+971', digits: 9, placeholder: '50 123 4567', name: 'UAE' },
]

export const getCountry = (id) => PHONE_COUNTRIES.find((c) => c.id === id) ?? PHONE_COUNTRIES[0]

// India and the UAE are the only places we pre-select from the visitor's
// timezone; everyone else starts on US. ("Asia/Calcutta" is the older name
// some browsers still report for Asia/Kolkata.)
export function defaultCountryFromTimezone(timeZone) {
  if (timeZone === 'Asia/Kolkata' || timeZone === 'Asia/Calcutta') return 'IN'
  if (timeZone === 'Asia/Dubai') return 'AE'
  return 'US'
}

export function detectDefaultCountry() {
  try {
    return defaultCountryFromTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  } catch {
    return 'US'
  }
}

/**
 * If the text starts like a full international number ("+91 98765 43210",
 * "0091 98765…"), returns the matching country and what follows the code —
 * so typing or pasting a full number switches the dropdown by itself. Returns
 * null for anything else, including a "+" with a code we don't offer.
 */
export function parseInternational(text) {
  const trimmed = text.trim()
  let rest
  if (trimmed.startsWith('+')) rest = trimmed.slice(1)
  else if (trimmed.startsWith('00')) rest = trimmed.slice(2)
  else return null

  const digits = rest.replace(/\D/g, '')
  // Longest code first so +971 is never read as +9…
  const match = [...PHONE_COUNTRIES]
    .sort((a, b) => b.dial.length - a.dial.length)
    .find((c) => digits.startsWith(c.dial.slice(1)))
  if (!match) return null
  return { countryId: match.id, number: digits.slice(match.dial.length - 1) }
}

/**
 * The form's phone value is "<code> <number>" (e.g. "+91 9876543210"), or ''
 * when the visitor left the optional field empty. Returns an error message, or
 * true when the value is fine — the shape react-hook-form's `validate` wants.
 */
export function validatePhone(value) {
  if (!value) return true
  const space = value.indexOf(' ')
  const dial = value.slice(0, space)
  const number = value.slice(space + 1)
  if (!number) return true

  const country = PHONE_COUNTRIES.find((c) => c.dial === dial)
  if (!country) return 'Choose US +1, IND +91 or UAE +971'
  // Typed "+44…" or "00…": a country code we don't offer.
  if (/^\s*(\+|00)/.test(number)) return 'We only take US +1, IND +91 or UAE +971 numbers here'
  if (!/^\d+$/.test(number)) return 'Enter digits only'
  if (number.length !== country.digits) {
    return `Enter a ${country.digits}-digit ${country.name} number (${number.length} entered)`
  }
  return true
}

export const formatPhone = (countryId, number) => (number ? `${getCountry(countryId).dial} ${number}` : '')
