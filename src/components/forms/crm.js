import { captureUtmParams } from '../../utils/attribution'

const CRM_WEBHOOK_URL = import.meta.env.VITE_CRM_WEBHOOK_URL

const AD_SOURCE_MAP = {
  google: 'Google',
  facebook: 'Facebook',
  fb: 'Facebook',
  linkedin: 'Linkedin',
  twitter: 'Twitter',
  x: 'Twitter',
}

// Click IDs are the most reliable signal (present whenever the platform's own
// tracking is on the link, even without UTM params); utm_source is the
// fallback for anything else.
function detectCrmSource() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('gclid')) return 'Google'
  if (params.get('fbclid')) return 'Facebook'
  if (params.get('li_fat_id')) return 'Linkedin'
  if (params.get('twclid')) return 'Twitter'

  const utm = captureUtmParams()
  if (utm.utm_source) {
    return AD_SOURCE_MAP[utm.utm_source.toLowerCase()] || 'Website'
  }
  return 'Website'
}

// Prosper CRM is a secondary channel alongside email/Privyr — fire-and-forget
// so a CRM outage never blocks or fails the primary form submission.
export function submitToCrm({ name, email, phone, company, product, campaign }) {
  if (!CRM_WEBHOOK_URL || !name) return

  fetch(CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      phone,
      company,
      product,
      campaign,
      source: detectCrmSource(),
    }),
  }).catch(() => {})
}
