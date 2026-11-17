// Copies each order to Prosper CRM (leads) and Zoho as a lead. Never blocks or
// fails an order: every call is wrapped and time-limited. Only runs on the live
// site (or when SHOP_FORWARD_LEADS=true) so test orders do not create real leads.
import { formatINR } from '../../shared/pricing.js'

const ZOHO_URL = 'https://crm.zoho.in/crm/WebToLeadForm'
// Public form identifiers from Zoho's embed code (same as src/components/forms/zoho.js). Not secrets.
const ZOHO_FORM = {
  xnQsjsdp: '6d34d6f3dbb26a825e4e0aa15eae57a5eca24fefbc7ec7d91ef2013f432ec274',
  xmIwtLD: 'a79bf9311e53e15493c6135e9f8fe348fc0b57b0b2306899c04a7f1ca6b0c4feed14f8e60f308b86223d4deb9e0d097e',
  actionType: 'TGVhZHM=',
  returnURL: 'null',
}

export const leadForwardingOn = () =>
  process.env.SHOP_FORWARD_LEADS === 'true' ||
  (process.env.VERCEL_ENV === 'production' && process.env.SHOP_FORWARD_LEADS !== 'false')

export async function forwardOrderLead(order, items) {
  if (!leadForwardingOn()) return { skipped: true }
  const c = order.contact
  const products = items.map((i) => `${i.name} x ${i.qty}`).join(', ')
  const campaign = `Online Shop Order ${order.order_number}`
  const jobs = []

  const crmUrl = process.env.CRM_WEBHOOK_URL || process.env.VITE_CRM_WEBHOOK_URL
  if (crmUrl) {
    jobs.push(
      fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: c.name, email: c.email, phone: `+91${c.phone}`, company: c.company, product: products, campaign, source: 'Website' }),
        signal: AbortSignal.timeout(4000),
      })
    )
  }

  const description = [
    `Campaign: ${campaign}`,
    `Products: ${products}`,
    `Order total: ${formatINR(order.total_paise)}`,
    `Payment: ${order.payment_method}`,
  ].join('\n')
  jobs.push(
    fetch(ZOHO_URL, {
      method: 'POST',
      body: new URLSearchParams({
        ...ZOHO_FORM,
        'Last Name': c.name.slice(0, 80),
        Email: c.email.slice(0, 100),
        Company: (c.company || 'Not provided').slice(0, 200),
        Phone: `+91${c.phone}`,
        Description: description,
        'Lead Source': 'Website',
        aG9uZXlwb3Q: '',
      }),
      signal: AbortSignal.timeout(4000),
    })
  )

  const results = await Promise.allSettled(jobs)
  return { sent: results.filter((r) => r.status === 'fulfilled').length, failed: results.filter((r) => r.status === 'rejected').length }
}
