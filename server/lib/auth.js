// Sign-in with a 6-digit email code, for customers and staff. Sessions are
// signed tokens kept in an httpOnly cookie, so page scripts can never read them.
import { createHash, createHmac, randomInt, timingSafeEqual } from 'node:crypto'
import { db, one } from './db.js'
import { HttpError, parseCookies } from './http.js'

const CODE_TTL_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 5
const MAX_CODES_PER_WINDOW = 5
const COOKIE = { customer: 'pi_session', staff: 'pi_staff' }
const SESSION_SECONDS = { customer: 30 * 24 * 3600, staff: 12 * 3600 }

function secret() {
  const s = process.env.SESSION_SECRET
  if (s && s.length >= 32) return s
  if (process.env.VERCEL) throw new HttpError(503, 'Sign-in is not set up yet.')
  return 'local-development-only-secret-not-for-production'
}

const b64 = (buf) => Buffer.from(buf).toString('base64url')
const sign = (payload) => b64(createHmac('sha256', secret()).update(payload).digest())
const hashCode = (email, purpose, code) => createHash('sha256').update(`${secret()}|${purpose}|${email}|${code}`).digest('hex')

function safeEqual(a, b) {
  const x = Buffer.from(String(a))
  const y = Buffer.from(String(b))
  return x.length === y.length && timingSafeEqual(x, y)
}

export function createSessionToken(email, role) {
  const payload = b64(JSON.stringify({ e: email, r: role, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS[role] }))
  return `${payload}.${sign(payload)}`
}

export function readSessionToken(token, role) {
  if (!token || typeof token !== 'string') return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (data.r !== role || data.exp < Math.floor(Date.now() / 1000)) return null
    return { email: data.e, role: data.r }
  } catch {
    return null
  }
}

export function sessionCookie(role, token) {
  const secure = process.env.VERCEL ? ' Secure;' : ''
  if (!token) return `${COOKIE[role]}=; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=0`
  return `${COOKIE[role]}=${token}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${SESSION_SECONDS[role]}`
}

export function sessionFrom(request, role) {
  return readSessionToken(parseCookies(request)[COOKIE[role]], role)
}

const envAdmins = () =>
  (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)

export async function findStaff(email) {
  const row = await one('staff', { email })
  if (row) return row.is_active ? row : null
  if (envAdmins().includes(email)) return { email, name: email.split('@')[0], role: 'admin', is_active: true }
  return null
}

// Every admin API call goes through this: valid staff cookie AND still an active staff member.
export async function requireStaff(request) {
  const session = sessionFrom(request, 'staff')
  if (!session) throw new HttpError(401, 'Please sign in.')
  const staff = await findStaff(session.email)
  if (!staff) throw new HttpError(403, 'This account does not have staff access.')
  return staff
}

export async function requireCustomer(request) {
  const session = sessionFrom(request, 'customer')
  if (!session) throw new HttpError(401, 'Please sign in.')
  return session
}

// Returns the code to email, or null when nothing should be sent (unknown staff email).
export async function createLoginCode(email, purpose) {
  if (purpose === 'staff' && !(await findStaff(email))) return null
  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString()
  const recent = await db().select('login_codes', { where: { email, purpose, created_at: { gte: since } } })
  if (recent.length >= MAX_CODES_PER_WINDOW) throw new HttpError(429, 'Too many codes requested. Please wait 15 minutes.')
  const code = String(randomInt(0, 1_000_000)).padStart(6, '0')
  await db().insert('login_codes', {
    email,
    purpose,
    code_hash: hashCode(email, purpose, code),
    attempts: 0,
    expires_at: new Date(Date.now() + CODE_TTL_MS).toISOString(),
    used_at: null,
  })
  return code
}

// "Chrome on Android" style summary of the browser. Nothing else about the device is kept.
export function describeDevice(userAgent = '') {
  const ua = String(userAgent)
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /SamsungBrowser/.test(ua) ? 'Samsung Internet' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : ''
  const os = /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iPhone/iPad' : /Windows/.test(ua) ? 'Windows' : /Mac OS X|Macintosh/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : ''
  return [browser, os].filter(Boolean).join(' on ') || ''
}

export async function checkLoginCode(email, purpose, code, device = '') {
  const rows = await db().select('login_codes', {
    where: { email, purpose, used_at: null, expires_at: { gte: new Date().toISOString() } },
    order: 'created_at.desc',
    limit: 1,
  })
  const row = rows[0]
  const fail = new HttpError(400, 'That code is not right or has expired. Please request a new one.')
  if (!row || row.attempts >= MAX_ATTEMPTS) throw fail
  if (!/^[0-9]{6}$/.test(String(code)) || !safeEqual(row.code_hash, hashCode(email, purpose, String(code)))) {
    await db().update('login_codes', { id: row.id }, { attempts: row.attempts + 1 })
    throw fail
  }
  // Conditional update so the same code cannot be used twice, even by two requests at once.
  const used = await db().update('login_codes', { id: row.id, used_at: null }, { used_at: new Date().toISOString(), device: device || null })
  if (!used.length) throw fail
  return true
}
