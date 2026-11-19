// "Stay updated" sign-ups from the shop pop-up. Kept in the settings table under
// the key "subscribers", so no extra database table is needed. Newest first; a
// repeat sign-up with the same mobile or email updates the existing entry.
import { db, one } from './db.js'

const KEY = 'subscribers'
const MAX = 20_000

const digits = (s) => String(s || '').replace(/\D/g, '').slice(-10)

export async function listSubscribers() {
  const row = await one('settings', { key: KEY })
  return Array.isArray(row?.value?.list) ? row.value.list : []
}

async function save(list) {
  const value = { list: list.slice(0, MAX) }
  const existing = await one('settings', { key: KEY })
  if (existing) await db().update('settings', { key: KEY }, { value })
  else await db().insert('settings', { key: KEY, value })
}

export async function addSubscriber({ phone = '', email = '', page = '' }) {
  const list = await listSubscribers()
  const now = new Date().toISOString()
  const same = (s) => (phone && digits(s.phone) === digits(phone)) || (email && s.email === email)
  const old = list.find(same)
  const entry = {
    phone: phone || old?.phone || '',
    email: email || old?.email || '',
    page: page || old?.page || '',
    created_at: old?.created_at || now,
    updated_at: now,
  }
  await save([entry, ...list.filter((s) => !same(s))])
  return { entry, repeat: Boolean(old) }
}

export async function removeSubscriber({ phone = '', email = '' }) {
  const list = await listSubscribers()
  const keep = list.filter((s) => !((phone && digits(s.phone) === digits(phone)) || (email && s.email === email)))
  await save(keep)
  return list.length - keep.length
}
