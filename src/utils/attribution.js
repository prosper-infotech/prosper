const STORAGE_KEY = 'utm_attribution'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

// First-touch attribution: capture UTM params from the landing URL once per
// session, so they survive even if the visitor browses other pages before
// submitting a lead form.
export function captureUtmParams() {
  const params = new URLSearchParams(window.location.search)
  const utm = {}
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) utm[key] = value
  })

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
    return utm
  }

  const stored = sessionStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

// Appends channel info to a campaign label, e.g.
// "AS400 Development Landing Page" -> "AS400 Development Landing Page — twitter/cpc"
export function attributeSource(campaign) {
  const utm = captureUtmParams()
  if (!utm.utm_source) return campaign

  const channel = [utm.utm_source, utm.utm_medium].filter(Boolean).join('/')
  return `${campaign} — ${channel}`
}
