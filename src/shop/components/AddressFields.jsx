import { Field } from './ui'
import { inputClass } from '../format'
import { INDIAN_STATES } from '../../../shared/india.js'

// Address inputs for react-hook-form. `prefix` is the form path, e.g. "shipping".
export default function AddressFields({ register, errors = {}, prefix, withContact = false }) {
  const id = (name) => `${prefix}-${name}`
  const props = (name, extra = {}) => ({
    id: id(name),
    className: inputClass,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
    ...register(`${prefix}.${name}`),
    ...extra,
  })
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {withContact && (
        <>
          <Field id={id('name')} label="Full name" error={errors.name?.message}>
            <input type="text" autoComplete="name" {...props('name')} />
          </Field>
          <Field id={id('phone')} label="Mobile number" error={errors.phone?.message}>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" {...props('phone')} />
          </Field>
        </>
      )}
      <Field id={id('line1')} label="Address" error={errors.line1?.message} className="sm:col-span-2">
        <input type="text" autoComplete="address-line1" placeholder="Building, street" {...props('line1')} />
      </Field>
      <Field id={id('line2')} label="Area or landmark" optional error={errors.line2?.message} className="sm:col-span-2">
        <input type="text" autoComplete="address-line2" {...props('line2')} />
      </Field>
      <Field id={id('pincode')} label="PIN code" error={errors.pincode?.message}>
        <input type="text" inputMode="numeric" maxLength={6} autoComplete="postal-code" {...props('pincode')} />
      </Field>
      <Field id={id('city')} label="City" error={errors.city?.message}>
        <input type="text" autoComplete="address-level2" {...props('city')} />
      </Field>
      <Field id={id('state')} label="State" error={errors.state?.message} className="sm:col-span-2">
        <select autoComplete="address-level1" {...props('state')}>
          <option value="">Choose a state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
    </div>
  )
}
