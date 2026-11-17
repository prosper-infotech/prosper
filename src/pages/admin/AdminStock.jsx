import { useState } from 'react'
import { api } from '../../shop/api'
import { PageLoading, Spinner } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { Alert, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

export default function AdminStock() {
  const { data, error, reload } = useLoad('/admin/products')
  const [edits, setEdits] = useState({})
  const [lowOnly, setLowOnly] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState({ kind: 'error', text: '' })

  if (error && !data) return <Alert>{error}</Alert>
  if (!data) return <PageLoading />

  const changed = Object.entries(edits).filter(([id, v]) => v !== '' && Number(v) !== data.products.find((p) => p.id === id)?.stock_qty)
  const list = data.products.filter((p) => p.is_active && (!lowOnly || p.stock_qty <= 5))

  const save = async () => {
    setBusy(true)
    setMessage({ kind: 'error', text: '' })
    try {
      await api('/admin/stock', { method: 'POST', body: { updates: changed.map(([id, v]) => ({ id, stock_qty: Number(v) })) } })
      setEdits({})
      await reload()
      setMessage({ kind: 'ok', text: `Stock updated for ${changed.length} product(s).` })
    } catch (err) {
      setMessage({ kind: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageTitle title="Stock">
        <button type="button" onClick={save} disabled={busy || !changed.length} className={`${btn.gold} !py-2`}>
          {busy && <Spinner />}
          Save {changed.length ? `${changed.length} change${changed.length === 1 ? '' : 's'}` : 'changes'}
        </button>
      </PageTitle>
      <Alert kind={message.kind}>{message.text}</Alert>
      <label className="mb-4 flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink-900">
        <input type="checkbox" checked={lowOnly} onChange={(e) => setLowOnly(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
        Show only low stock (5 or fewer)
      </label>
      <div className="overflow-x-auto rounded-2xl border border-ink-300/70 bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-ink-300/70 bg-surface text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 text-right">Now</th>
              <th className="px-4 py-3 text-right">New stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-300/50">
            {list.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-ink-900">{p.name}</span>
                  <span className="block text-xs text-ink-500">{p.sku}</span>
                </td>
                <td className={`px-4 py-2.5 text-right font-bold ${p.stock_qty === 0 ? 'text-red-700' : p.stock_qty <= 5 ? 'text-amber-700' : 'text-ink-900'}`}>{p.stock_qty}</td>
                <td className="px-4 py-2.5 text-right">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="1"
                    aria-label={`New stock for ${p.name}`}
                    value={edits[p.id] ?? ''}
                    placeholder={String(p.stock_qty)}
                    onChange={(e) => setEdits({ ...edits, [p.id]: e.target.value.replace(/\D/g, '') })}
                    className={`${inputClass} !w-28 !py-2 text-right`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="px-4 py-6 text-sm text-ink-600">Nothing to show.</p>}
      </div>
    </>
  )
}
