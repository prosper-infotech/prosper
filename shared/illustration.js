// Picks a drawn illustration for products that have no photo yet, from the
// product name and category, plus a short spec line to print under it.
const RULES = [
  ['printhead', /print ?head/i],
  ['ribbon', /ribbon/i],
  ['paper-roll', /thermal paper|paper roll|receipt roll|printer rolls?|till roll|plain paper/i],
  ['cable', /\bcable\b(?![\s-]?tie)|connector|adapter|pigtail/i],
  ['card-printer', /card printer|\bid card printer|retransfer/i],
  ['mobile-printer', /mobile|portable/i, /printer/i],
  ['receipt-printer', /receipt|pos printer|billing printer|kot printer/i],
  ['industrial-printer', /industrial|\bZT\d|\bZT\b|T6000|T4000|\bPX\d|\bMH\d|\bMX\d|\bXD\d|\bTTP[\s-]?3\d\d|\bME\d{3}/i, /printer|encoder/i],
  ['label-printer', /printer|encoder/i],
  ['label-roll', /labels?\b|sticker roll|chromo|polyester|tag roll|jewellery label/i, null, 'consumables-spares'],
  ['shredder', /shredder/i],
  ['note-counter', /note count|currency|counting|counterfeit|fake note|value counter/i],
  ['laminator', /laminat/i],
  ['locker', /locker|safe\b|digital safe/i],
  ['turnstile', /turnstile|flap gate|swing gate|speed gate|tripod/i],
  ['boom-barrier', /boom|barrier/i],
  ['eas-gate', /eas.*(antenna|gate|system|pedestal)|security gate|pedestal|anti.?theft (gate|system|antenna)|detacher|deactivator/i],
  ['em-lock', /\block\b|\blocks\b|magnetic lock|maglock|strike|exit button|door bell/i],
  ['biometric', /fingerprint|biometric|face|attendance|finger/i],
  ['access-controller', /controller|access control|door access|keypad|power supply/i],
  ['cash-drawer', /cash drawer|cash box/i],
  ['kiosk', /kiosk|standee|self.?order|self.?service/i],
  ['pos-terminal', /windows pos|all.?in.?one|touch pos|pos system|pos terminal|dual screen|\bpos\b.*(core i|celeron|j1900|intel|inch)|customer display|monitor/i],
  ['android-pos', /\bpos\b|billing machine|smart pos|payment terminal/i],
  ['mobile-computer', /mobile computer|handheld computer|data collector|touch computer|\bpda\b|rugged (phone|tablet)|\btablet\b|android terminal/i],
  ['presentation-scanner', /scanner/i, /tabletop|table.?top|presentation|desktop|omni|hands.?free|fixed mount|counter|embedded|module/i],
  ['barcode-scanner', /scanner|scan engine|barcode reader/i],
  ['handheld-reader', /reader|sled/i, /handheld|hand.?held|portable|sled|bluetooth|android/i],
  ['integrated-reader', /reader/i, /integrated|long range|parking|vehicle|gate/i],
  ['antenna', /antenna/i],
  ['fixed-reader', /reader/i, /fixed|port\b|impinj r\d|\bR\d{3}\b|fx\d/i],
  ['desktop-reader', /reader|writer|encoder/i, /desktop|usb|card|nfc|smart|mini|\bhf\b|\blf\b|13\.56|125/i],
  ['fixed-reader', /reader/i],
  ['wristband', /wrist ?band|bracelet/i],
  ['key-fob', /key ?fob|key ?chain|key ?tag|keyfob|token/i],
  ['hard-tag', /hard tag|golf|pencil|eyelet|bottle tag|\beas\b|\bam\b.*tag|\brf\b.*tag|garment|clothing|apparel|ink tag|security tag/i],
  ['on-metal-tag', /metal|anti.?metal|on.?metal|ceramic|pcb tag|industrial tag/i],
  ['coin', /coin|disc\b|disk|round|sticker|nail|token/i],
  ['card', /card/i],
  ['label', /label|inlay|tag|seal/i],
  ['iot', /gateway|iot|edge|sensor|module|beacon/i],
]

const BY_CATEGORY = {
  'tags-labels': 'label', 'smart-cards-nfc': 'card', 'readers-antennas': 'fixed-reader', 'barcode-scanners': 'barcode-scanner',
  'mobile-computers': 'mobile-computer', 'printers-encoders': 'label-printer', 'consumables-spares': 'label-roll', 'pos-kiosks': 'pos-terminal',
  'security-access': 'access-controller', 'office-equipment': 'device', 'edge-iot': 'iot',
}

export function illustrationFor(product) {
  const name = product?.name || ''
  const category = product?.category || ''
  for (const [kind, rx, also, onlyIn] of RULES) {
    if (onlyIn && category !== onlyIn) continue
    if (rx.test(name) && (!also || also.test(name))) return kind
  }
  return BY_CATEGORY[category] || 'device'
}

const PREFERRED = ['Frequency', 'Size', 'Read range', 'Print width', 'Resolution', 'Display', 'Chip', 'Protection', 'Connectivity', 'Memory', 'Pack', 'Capacity']

// Up to two short spec values, e.g. "865-868 MHz · 105 x 26.5mm".
export function illustrationSpec(product) {
  const specs = product?.specs || []
  const out = []
  for (const label of PREFERRED) {
    const spec = specs.find((s) => s.label === label)
    const value = spec?.value?.split(',')[0].trim()
    if (value && value.length <= 22 && !out.includes(value)) out.push(value)
    if (out.length === 2) break
  }
  return out.join(' · ')
}
