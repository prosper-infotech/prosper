// Small helpers for the Web-standard Request/Response handlers.
export class HttpError extends Error {
  constructor(status, message, extra) {
    super(message)
    this.status = status
    this.extra = extra
  }
}

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex',
}

export function json(data, status = 200, headers = {}) {
  const h = new Headers({ 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS })
  for (const [k, v] of Object.entries(headers)) {
    if (Array.isArray(v)) v.forEach((x) => h.append(k, x))
    else h.set(k, v)
  }
  return new Response(JSON.stringify(data), { status, headers: h })
}

export function text(body, contentType, status = 200, headers = {}) {
  return new Response(body, { status, headers: { 'Content-Type': contentType, 'X-Content-Type-Options': 'nosniff', ...headers } })
}

export async function readJson(request, maxBytes = 200_000) {
  const type = request.headers.get('content-type') || ''
  if (!type.includes('application/json')) throw new HttpError(415, 'Send JSON.')
  const raw = await request.text()
  if (raw.length > maxBytes) throw new HttpError(413, 'Request is too large.')
  try {
    const body = raw ? JSON.parse(raw) : {}
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object')
    return body
  } catch {
    throw new HttpError(400, 'The request could not be read.')
  }
}

export function clientIp(request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'local'
}

// Best-effort rate limit. Each serverless instance keeps its own counters, so
// this slows bots down rather than being a hard guarantee. Sign-in codes are
// also limited in the database (see auth.js).
const buckets = new Map()
export function rateLimit(request, name, limit, windowMs) {
  if (process.env.SHOP_DISABLE_RATE_LIMIT === 'true') return
  const key = `${name}:${clientIp(request)}`
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    if (buckets.size > 5000) for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k)
    return
  }
  bucket.count += 1
  if (bucket.count > limit) throw new HttpError(429, 'Too many attempts. Please wait a few minutes and try again.')
}

export function parseCookies(request) {
  const out = {}
  for (const part of (request.headers.get('cookie') || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim())
  }
  return out
}

export function siteUrl(request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '')
  const u = new URL(request.url)
  const proto = request.headers.get('x-forwarded-proto') || u.protocol.replace(':', '')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || u.host
  return `${proto}://${host}`
}

export const str = (v, max = 500) => String(v ?? '').trim().slice(0, max)
export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
