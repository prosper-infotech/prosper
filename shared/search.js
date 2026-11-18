// Simple, forgiving product search shared by the header box and the listing page.
// "Table-top scanners" finds "Tabletop Barcode Scanner": hyphens and spaces are
// ignored inside words and a plural "s" is dropped.
const norm = (s) => String(s || '').toLowerCase().replace(/[-_/]+/g, ' ')
const stem = (w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w)

export function searchWords(q) {
  return norm(q).split(/\s+/).filter(Boolean).map(stem)
}

export function productHaystack(p) {
  const text = norm(`${p.name} ${p.sku} ${p.brand || ''} ${p.short_description || ''} ${(p.specs || []).map((s) => s.value).join(' ')}`)
  return `${text} ${text.replace(/\s+/g, '')}`
}

export function matches(p, words) {
  if (!words.length) return true
  const hay = productHaystack(p)
  return words.every((w) => hay.includes(w))
}
