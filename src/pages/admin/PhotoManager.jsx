import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ImagePlus, Link2, Trash2 } from 'lucide-react'
import { api } from '../../shop/api'
import { Spinner } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'

const MAX_PHOTOS = 8
const MAX_SIDE = 1600

// Shrinks a photo in the browser (longest side 1600 px) so uploads are quick and small.
async function shrink(file) {
  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) throw new Error(`${file.name}: this file could not be read as a photo.`)
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff' // transparent PNGs get a white background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close?.()
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.86))
  const out = blob && blob.type === 'image/webp' ? blob : await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.86))
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error(`${file.name}: could not be read.`))
    reader.readAsDataURL(out)
  })
  return { data, size: out.size }
}

// Photos for a product: upload from the computer (or drag and drop), reorder, remove, or add by link.
export default function PhotoManager({ images, onChange, error }) {
  const [busy, setBusy] = useState(0)
  const [problem, setProblem] = useState('')
  const [link, setLink] = useState('')
  const [dragging, setDragging] = useState(false)
  const picker = useRef(null)
  const room = MAX_PHOTOS - images.length

  const upload = async (fileList) => {
    setProblem('')
    const files = [...fileList].filter((f) => f.type.startsWith('image/'))
    if (!files.length) return setProblem('Please choose JPG, PNG or WebP photos.')
    if (files.length > room) setProblem(`A product can have up to ${MAX_PHOTOS} photos. Only the first ${Math.max(room, 0)} were added.`)
    let next = [...images]
    for (const file of files.slice(0, Math.max(room, 0))) {
      setBusy((n) => n + 1)
      try {
        const { data } = await shrink(file)
        const res = await api('/admin/uploads', { method: 'POST', body: { name: file.name, data } })
        next = [...next, res.url]
        onChange(next)
      } catch (err) {
        setProblem(err.message)
      } finally {
        setBusy((n) => n - 1)
      }
    }
  }

  const move = (i, dir) => {
    const next = [...images]
    const [item] = next.splice(i, 1)
    next.splice(i + dir, 0, item)
    onChange(next)
  }
  const addLink = () => {
    const url = link.trim()
    if (!/^https?:\/\/\S+$/i.test(url)) return setProblem('A photo link must start with https://')
    if (room <= 0) return setProblem(`A product can have up to ${MAX_PHOTOS} photos.`)
    onChange([...images, url])
    setLink('')
    setProblem('')
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (room > 0) upload(e.dataTransfer.files)
        }}
        className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-7 text-center transition-colors ${dragging ? 'border-primary bg-primary/5' : 'border-[#d4d5d9] bg-[#fafbfc]'}`}
      >
        <ImagePlus className="h-8 w-8 stroke-[1.4] text-primary" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-ink-900">Drag photos here, or</p>
        <button type="button" onClick={() => picker.current?.click()} disabled={room <= 0 || busy > 0} className={`${btn.navy} mt-2 !py-2`}>
          {busy > 0 ? <Spinner /> : null}
          {busy > 0 ? `Uploading ${busy}…` : 'Choose photos'}
        </button>
        <input
          ref={picker}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          aria-label="Choose product photos to upload"
          onChange={(e) => {
            upload(e.target.files)
            e.target.value = ''
          }}
        />
        <p className="mt-2 text-xs text-ink-500">
          JPG, PNG or WebP. Up to {MAX_PHOTOS} photos. Large photos are resized automatically. Square photos look best.
        </p>
      </div>

      {(problem || error) && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {problem || error}
        </p>
      )}

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((src, i) => (
            <li key={src} className="overflow-hidden rounded-md border border-[#eaeaec] bg-white">
              <div className="relative">
                <img src={src} alt={`Photo ${i + 1}`} className="aspect-square w-full object-cover" />
                {i === 0 && <span className="absolute left-1.5 top-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Main</span>}
              </div>
              <div className="flex items-center justify-between px-1 py-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move photo ${i + 1} left`} className="flex h-8 w-8 items-center justify-center rounded text-ink-600 hover:bg-[#f5f5f6] disabled:opacity-30">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onChange(images.filter((_, n) => n !== i))} aria-label={`Remove photo ${i + 1}`} className="flex h-8 w-8 items-center justify-center rounded text-ink-600 hover:bg-red-50 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} aria-label={`Move photo ${i + 1} right`} className="flex h-8 w-8 items-center justify-center rounded text-ink-600 hover:bg-[#f5f5f6] disabled:opacity-30">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {images.length > 1 && <p className="mt-2 text-xs text-ink-500">The first photo is the main one. Use the arrows to change the order.</p>}

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-primary">Add a photo by link instead</summary>
        <div className="mt-2 flex gap-2">
          <label htmlFor="photo-link" className="sr-only">
            Photo link
          </label>
          <input
            id="photo-link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addLink()
              }
            }}
            placeholder="https://..."
            className={`${inputClass} !py-2 !text-sm`}
          />
          <button type="button" onClick={addLink} className={`${btn.ghost} shrink-0 !py-2`}>
            <Link2 className="h-4 w-4" />
            Add
          </button>
        </div>
      </details>
    </div>
  )
}
