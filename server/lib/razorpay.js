// Razorpay: create payment orders and verify signatures. Card details never touch our server.
import { createHmac, timingSafeEqual } from 'node:crypto'

export const razorpayConfigured = () => Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
export const razorpayKeyId = () => process.env.RAZORPAY_KEY_ID || null

function hmacMatches(secret, payload, signature) {
  if (!secret || !signature) return false
  const expected = Buffer.from(createHmac('sha256', secret).update(payload).digest('hex'))
  const given = Buffer.from(String(signature))
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export async function createRazorpayOrder({ amountPaise, receipt, notes }) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt, notes }),
    signal: AbortSignal.timeout(10000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.id) throw new Error(`Razorpay order failed: ${data?.error?.description || res.status}`)
  return data
}

// Signature the browser receives after a payment: HMAC(order_id|payment_id, key secret).
export function verifyCheckoutSignature({ orderId, paymentId, signature }) {
  return hmacMatches(process.env.RAZORPAY_KEY_SECRET, `${orderId}|${paymentId}`, signature)
}

// Signature on webhooks: HMAC(raw request body, webhook secret).
export function verifyWebhookSignature(rawBody, signature) {
  return hmacMatches(process.env.RAZORPAY_WEBHOOK_SECRET, rawBody, signature)
}
