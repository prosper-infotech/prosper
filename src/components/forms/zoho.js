import { detectCrmSource } from './crm'

// Zoho CRM "Web-to-Lead" form (Leads module, Zoho India data centre). The ids below are the public
// form identifiers Zoho puts in its embed code, not secrets.
const ZOHO_URL = 'https://crm.zoho.in/crm/WebToLeadForm'
const ZOHO_FORM = {
  xnQsjsdp: '6d34d6f3dbb26a825e4e0aa15eae57a5eca24fefbc7ec7d91ef2013f432ec274',
  xmIwtLD: 'a79bf9311e53e15493c6135e9f8fe348fc0b57b0b2306899c04a7f1ca6b0c4feed14f8e60f308b86223d4deb9e0d097e',
  actionType: 'TGVhZHM=',
  returnURL: 'null',
}

// Must match the options in Zoho's "Lead Source" picklist exactly.
const ZOHO_LEAD_SOURCE = {
  Google: 'Google Ads',
  Facebook: 'Facebook',
  Linkedin: 'LinkedIn',
  Twitter: 'X (Twitter)',
}

const clip = (value, max) => String(value ?? '').trim().slice(0, max)

// Builds the form body Zoho expects. Exported separately so it can be checked without sending anything.
export function buildZohoLead({ name, email, phone, company, product, campaign, service, message }) {
  const params = new URLSearchParams(window.location.search)
  const description = [
    campaign && `Campaign: ${campaign}`,
    product && `Product: ${product}`,
    service && `Interested in: ${service}`,
    message && `Message: ${message}`,
    `Page: ${window.location.href}`,
  ]
    .filter(Boolean)
    .join('\n')

  const body = new URLSearchParams({
    ...ZOHO_FORM,
    zc_gad: params.get('gclid') || '', // Google Ads click id, lets Zoho attribute the lead
    'Last Name': clip(name, 80),
    Email: clip(email, 100),
    // Company is mandatory in this Zoho form, so a form without one still has to send something.
    Company: clip(company, 200) || 'Not provided',
    Phone: clip(phone, 30),
    Description: description,
    'Lead Source': ZOHO_LEAD_SOURCE[detectCrmSource()] || 'Website',
    aG9uZXlwb3Q: '', // Zoho's honeypot field, must stay empty
  })
  return body
}

// Zoho is a secondary channel alongside email/Privyr/Prosper CRM — fire-and-forget so a Zoho outage
// never blocks or fails the primary form submission. Zoho's endpoint sends no CORS headers, so the
// request is sent with no-cors (the response can't be read, but Zoho still receives the lead).
// Local development is skipped unless VITE_ZOHO_IN_DEV=true, so testing the forms doesn't create real leads.
export function submitToZoho(lead) {
  if (!lead?.name) return
  if (import.meta.env.DEV && import.meta.env.VITE_ZOHO_IN_DEV !== 'true') return

  try {
    fetch(ZOHO_URL, { method: 'POST', mode: 'no-cors', keepalive: true, body: buildZohoLead(lead) }).catch(() => {})
  } catch {
    // never let Zoho affect the visitor's form
  }
}
