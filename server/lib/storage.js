// Product photo storage. On the live site photos go to Supabase Storage (a public
// "product-images" bucket in your own Supabase project). On a laptop with no
// Supabase settings they are saved in .shop-dev/uploads and served by /api/uploads.
import { randomBytes } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { HttpError } from './http.js'
import { NotConfiguredError } from './db.js'

export const BUCKET = 'product-images'
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024

// Recognise the file by its first bytes, not by its name, so only real photos are stored.
export function detectImage(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' }
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { ext: 'png', type: 'image/png' }
  if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return { ext: 'webp', type: 'image/webp' }
  return null
}

const localDir = () => path.join(process.env.SHOP_LOCAL_DB_DIR || path.resolve('.shop-dev'), 'uploads')

function supabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  const headers = { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}) }
  return { base: `${url.replace(/\/+$/, '')}/storage/v1`, headers }
}

// Creates the public bucket the first time it is needed, so there is nothing to set up by hand.
async function ensureBucket(sb) {
  const res = await fetch(`${sb.base}/bucket`, {
    method: 'POST',
    headers: { ...sb.headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, file_size_limit: MAX_IMAGE_BYTES, allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'] }),
  })
  if (!res.ok && res.status !== 409 && res.status !== 400) throw new Error(`Could not create the photo bucket (${res.status})`)
}

export async function saveProductImage(buf, nameHint = '') {
  if (buf.length > MAX_IMAGE_BYTES) throw new HttpError(413, 'This photo is too large. Please use one under 3 MB.')
  const kind = detectImage(buf)
  if (!kind) throw new HttpError(415, 'Please upload a JPG, PNG or WebP photo.')
  const slug = String(nameHint).toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'photo'
  const file = `${new Date().toISOString().slice(0, 7)}/${slug}-${randomBytes(6).toString('hex')}.${kind.ext}`

  const sb = supabase()
  if (sb) {
    const put = () =>
      fetch(`${sb.base}/object/${BUCKET}/${file}`, {
        method: 'POST',
        headers: { ...sb.headers, 'Content-Type': kind.type, 'Cache-Control': '31536000', 'x-upsert': 'false' },
        body: buf,
      })
    let res = await put()
    if (res.status === 404 || res.status === 400) {
      const text = await res.text()
      if (/bucket/i.test(text)) {
        await ensureBucket(sb)
        res = await put()
      } else {
        throw new Error(`Photo upload failed (${res.status}): ${text.slice(0, 200)}`)
      }
    }
    if (!res.ok) throw new Error(`Photo upload failed (${res.status}): ${(await res.text()).slice(0, 200)}`)
    return `${process.env.SUPABASE_URL.replace(/\/+$/, '')}/storage/v1/object/public/${BUCKET}/${file}`
  }
  if (process.env.VERCEL) throw new NotConfiguredError('Photo storage is not set up yet.')
  const target = path.join(localDir(), file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, buf)
  return `/api/uploads/${file}`
}

// Local development only: serve photos saved in .shop-dev/uploads.
export function readLocalUpload(file) {
  if (process.env.VERCEL || supabase()) return null
  if (!/^[0-9]{4}-[0-9]{2}\/[a-z0-9-]+\.(jpg|png|webp)$/.test(file)) return null
  const target = path.join(localDir(), file)
  if (!fs.existsSync(target)) return null
  const buf = fs.readFileSync(target)
  return { buf, type: detectImage(buf)?.type || 'application/octet-stream' }
}
