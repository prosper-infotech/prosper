import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Plus, Upload } from 'lucide-react'
import { api } from '../../shop/api'
import { PageLoading, Spinner } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'
import { Alert, Card, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

function State({ product }) {
  if (!product.is_active) return <span className="rounded-full bg-ink-300/50 px-2.5 py-1 text-xs font-bold text-ink-900">Hidden</span>
  if (isOrderable(product)) return <span className="rounded-full bg-accent-green/15 px-2.5 py-1 text-xs font-bold text-[#3f7a0c]">On sale</span>
  if (hasPrice(product)) return <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">Out of stock</span>
  return <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">Request price</span>
}

export default function AdminProducts() {
  const { data, error, reload } = useLoad('/admin/products')
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState({ kind: 'error', text: '' })
  const [problems, setProblems] = useState([])
  const file = useRef(null)

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return (data?.products || []).filter((p) => words.every((w) => `${p.name} ${p.sku}`.toLowerCase().includes(w)))
  }, [data, q])

  const missing = data?.catalogue_missing
  const loadCatalogue = async () => {
    if (!window.confirm(`Update the shop from the launch catalogue? This adds ${missing.products} product(s) and ${missing.categories} categor${missing.categories === 1 ? 'y' : 'ies'}, and fills in prices for ${missing.unpriced || 0} product(s) that have no price yet. Products you have priced yourself are not changed.`)) return
    setBusy(true)
    setMessage({ kind: 'error', text: '' })
    try {
      const done = await api('/admin/catalogue/load', { method: 'POST', body: {} })
      setMessage({ kind: 'ok', text: `Added ${done.products} product(s) and ${done.categories} categor${done.categories === 1 ? 'y' : 'ies'}, and priced ${done.priced || 0}. Check the prices and stock before you announce the shop.` })
      await reload()
    } catch (err) {
      setMessage({ kind: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  const [photoProgress, setPhotoProgress] = useState('')
  const copyPhotos = async () => {
    if (!window.confirm(`Copy photos from the SRK store for ${missing.photos} product(s)? Products that already have a photo are not changed. This can take a few minutes; keep this page open.`)) return
    setBusy(true)
    setMessage({ kind: 'error', text: '' })
    let total = 0
    let left = missing.photos
    try {
      for (;;) {
        const step = await api('/admin/catalogue/photos', { method: 'POST', body: { limit: 12 } })
        const progressed = step.left < left
        total += left - step.left
        left = step.left
        setPhotoProgress(`Copied photos for ${total} product(s), ${left} to go…`)
        if (!left || !progressed) break
      }
      setMessage({ kind: 'ok', text: left ? `Copied photos for ${total} product(s). ${left} could not be copied; try again later.` : `Copied photos for ${total} product(s).` })
      await reload()
    } catch (err) {
      setMessage({ kind: 'error', text: `${err.message} (${total} product(s) done before this; press the button again to continue.)` })
    } finally {
      setPhotoProgress('')
      setBusy(false)
    }
  }

  const importCsv = async (e) => {
    const picked = e.target.files?.[0]
    e.target.value = ''
    if (!picked) return
    setBusy(true)
    setProblems([])
    setMessage({ kind: 'error', text: '' })
    try {
      const csv = await picked.text()
      const check = await api('/admin/products/import', { method: 'POST', body: { csv, dry_run: true } })
      if (!window.confirm(`This file will add ${check.created} new product(s) and update ${check.updated}. Continue?`)) return
      const done = await api('/admin/products/import', { method: 'POST', body: { csv } })
      setMessage({ kind: 'ok', text: `Import finished: ${done.created} added, ${done.updated} updated.` })
      await reload()
    } catch (err) {
      setMessage({ kind: 'error', text: err.message })
      setProblems(err.data?.problems || [])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageTitle title="Products">
        <a href="/api/admin/products-export.csv" className={`${btn.ghost} !py-2`}>
          <Download className="h-4 w-4" />
          Export CSV
        </a>
        <button type="button" onClick={() => file.current?.click()} disabled={busy} className={`${btn.ghost} !py-2`}>
          {busy ? <Spinner /> : <Upload className="h-4 w-4" />}
          Import CSV
        </button>
        <input ref={file} type="file" accept=".csv,text/csv" onChange={importCsv} className="hidden" aria-label="Choose a CSV file to import" />
        <Link to="/admin/products/new" className={`${btn.gold} !py-2`}>
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </PageTitle>

      <Alert kind={message.kind}>{message.text}</Alert>
      {missing && (missing.products > 0 || missing.categories > 0 || missing.unpriced > 0) && (
        <Card className="mb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-900">
              The launch catalogue has updates:{' '}
              {missing.products > 0 && <><strong>{missing.products} new product(s)</strong>{missing.categories > 0 && <> in <strong>{missing.categories} new categor{missing.categories === 1 ? 'y' : 'ies'}</strong></>}, </>}
              {missing.unpriced > 0 && <><strong>prices for {missing.unpriced} product(s)</strong> that show "Request price" now. </>}
              Products you have priced yourself are not changed.
            </p>
            <button type="button" onClick={loadCatalogue} disabled={busy} className={`${btn.navy} shrink-0 !py-2`}>
              {busy ? <Spinner /> : <Plus className="h-4 w-4" />}
              Update shop
            </button>
          </div>
        </Card>
      )}
      {missing?.photos > 0 && (
        <Card className="mb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-900">
              {photoProgress || (
                <>
                  <strong>{missing.photos} product(s)</strong> have no photo yet, but photos are available on the SRK store. Copy them into the shop; illustrations stay as the backup for anything without a photo.
                </>
              )}
            </p>
            <button type="button" onClick={copyPhotos} disabled={busy} className={`${btn.navy} shrink-0 !py-2`}>
              {busy ? <Spinner /> : <Download className="h-4 w-4" />}
              Copy photos
            </button>
          </div>
        </Card>
      )}
      <Alert>{error}</Alert>
      {problems.length > 0 && (
        <Card title="Rows to fix" className="mb-5">
          <ul className="flex flex-col gap-1.5 text-sm text-red-800">
            {problems.map((p) => (
              <li key={p.line}>
                <strong>Line {p.line}</strong> ({p.sku || 'no SKU'}): {Object.values(p.errors).join('; ')}
              </li>
            ))}
          </ul>
        </Card>
      )}
      <p className="mb-4 text-sm text-ink-600">
        A product can be ordered online once it has a price and stock. Without a price it shows "Request price". To change many products at once, export the CSV, edit it in Excel and import it back (rows are matched by SKU).
      </p>

      <label htmlFor="product-search" className="sr-only">Search products</label>
      <input id="product-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or SKU" className={`${inputClass} mb-4 max-w-sm`} />

      {!data ? (
        <PageLoading />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-300/70 bg-white">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-ink-300/70 bg-surface text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Price (incl. GST)</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300/50">
              {list.map((p) => (
                <tr key={p.id} className="hover:bg-surface">
                  <td className="px-4 py-3">
                    <Link to={`/admin/products/${p.id}`} className="font-bold text-primary hover:underline">{p.name}</Link>
                    <span className="block text-xs text-ink-500">{p.sku}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{data.categories.find((c) => c.id === p.category_id)?.name}</td>
                  <td className="px-4 py-3 text-right font-semibold">{p.price_paise ? formatINR(p.price_paise) : <span className="text-ink-500">Not set</span>}</td>
                  <td className="px-4 py-3 text-right font-semibold">{p.stock_qty}</td>
                  <td className="px-4 py-3"><State product={p} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="px-4 py-6 text-sm text-ink-600">No products match.</p>}
        </div>
      )}
    </>
  )
}
