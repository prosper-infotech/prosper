// Opens Razorpay Checkout. Card details are typed into Razorpay's window, never into our pages.
import { api } from './api'

let scriptPromise
function loadScript() {
  if (window.Razorpay) return Promise.resolve()
  scriptPromise ||= new Promise((resolve, reject) => {
    const tag = document.createElement('script')
    tag.src = 'https://checkout.razorpay.com/v1/checkout.js'
    tag.onload = resolve
    tag.onerror = () => {
      scriptPromise = null
      reject(new Error('The payment window could not be loaded. Check your connection and try again.'))
    }
    document.head.appendChild(tag)
  })
  return scriptPromise
}

// Resolves to 'done' (payment made and signature verified) or 'cancelled' (window closed).
// The order itself is only marked paid by the server when Razorpay's webhook arrives.
export async function payWithRazorpay(params, token) {
  await loadScript()
  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: params.key_id,
      order_id: params.order_id,
      amount: params.amount_paise,
      currency: 'INR',
      name: params.name,
      description: params.description,
      prefill: params.prefill,
      theme: { color: '#14346d' },
      handler: async (response) => {
        try {
          await api('/payments/verify', { method: 'POST', body: { token, ...response } })
          resolve('done')
        } catch (err) {
          reject(err)
        }
      },
      modal: { ondismiss: () => resolve('cancelled') },
    })
    checkout.open()
  })
}
