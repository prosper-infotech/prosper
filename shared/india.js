// Indian states and union territories, plus the form checks used by both the
// checkout page and the server.
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
]

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PINCODE_RE = /^[1-9][0-9]{5}$/
export const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

// Accepts "+91 98765 43210", "09876543210", "9876543210". Returns the 10 digits or null.
export function normalizeIndianPhone(value) {
  let digits = String(value ?? '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return /^[6-9][0-9]{9}$/.test(digits) ? digits : null
}

const clean = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

// Returns { value, errors }. `errors` is keyed by field name.
export function validateAddress(input = {}) {
  const value = {
    name: clean(input.name, 100),
    phone: normalizeIndianPhone(input.phone) || '',
    line1: clean(input.line1, 200),
    line2: clean(input.line2, 200),
    city: clean(input.city, 80),
    state: clean(input.state, 60),
    pincode: clean(input.pincode, 6),
    country: 'IN',
  }
  const errors = {}
  if (value.name.length < 2) errors.name = 'Enter the full name'
  if (!value.phone) errors.phone = 'Enter a 10-digit Indian mobile number'
  if (value.line1.length < 4) errors.line1 = 'Enter the address'
  if (value.city.length < 2) errors.city = 'Enter the city'
  if (!INDIAN_STATES.includes(value.state)) errors.state = 'Choose a state'
  if (!PINCODE_RE.test(value.pincode)) errors.pincode = 'Enter a 6-digit PIN code'
  return { value, errors }
}

export function validateContact(input = {}) {
  const value = {
    name: clean(input.name, 100),
    email: clean(input.email, 150).toLowerCase(),
    phone: normalizeIndianPhone(input.phone) || '',
    company: clean(input.company, 150),
    gstin: clean(input.gstin, 15).toUpperCase(),
  }
  const errors = {}
  if (value.name.length < 2) errors.name = 'Enter your name'
  if (!EMAIL_RE.test(value.email)) errors.email = 'Enter a valid email address'
  if (!value.phone) errors.phone = 'Enter a 10-digit Indian mobile number'
  if (value.gstin && !GSTIN_RE.test(value.gstin)) errors.gstin = 'This GSTIN does not look right'
  return { value, errors }
}

// Simple delivery estimate (plan section 8): a fixed range, a little longer for remote regions.
export function deliveryEstimate(pincode, settings) {
  if (!PINCODE_RE.test(String(pincode || ''))) return null
  const min = settings?.delivery_days_min ?? 3
  const max = settings?.delivery_days_max ?? 7
  const prefix = Number(String(pincode).slice(0, 2))
  const remote = [18, 19, 73, 74, 78, 79].includes(prefix) || String(pincode).startsWith('682555')
  return { min: min + (remote ? 2 : 0), max: max + (remote ? 3 : 0), remote }
}
