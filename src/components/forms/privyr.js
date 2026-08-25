const PRIVYR_WEBHOOK_URL = import.meta.env.VITE_PRIVYR_WEBHOOK_URL

// Privyr is a secondary channel alongside email notifications — fire-and-forget
// so a Privyr outage never blocks or fails the primary form submission.
export function submitToPrivyr({ name, email, phone, message, source }) {
  if (!PRIVYR_WEBHOOK_URL || !name) return

  // `lead_source_name` may or may not surface prominently in Privyr's UI
  // depending on account setup, so also stamp the source at the top of the
  // message itself — that's guaranteed visible on every lead card.
  const fullMessage = [source && `Source: ${source}`, message].filter(Boolean).join('\n')

  fetch(PRIVYR_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      phone_number: phone,
      message: fullMessage,
      lead_source_name: source,
    }),
  }).catch(() => {})
}
