const PRIVYR_WEBHOOK_URL = import.meta.env.VITE_PRIVYR_WEBHOOK_URL

// Privyr is a secondary channel alongside email notifications — fire-and-forget
// so a Privyr outage never blocks or fails the primary form submission.
export function submitToPrivyr({ name, email, phone, message, source }) {
  if (!PRIVYR_WEBHOOK_URL || !name) return

  fetch(PRIVYR_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      phone_number: phone,
      message,
      lead_source_name: source,
    }),
  }).catch(() => {})
}
