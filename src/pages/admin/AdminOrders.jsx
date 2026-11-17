import { Link, useSearchParams } from 'react-router-dom'
import { Download } from 'lucide-react'
import { PageLoading, StatusBadge } from '../../shop/components/ui'
import { btn, formatDate, inputClass, PAYMENT_LABEL, STATUS_LABEL } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'
import { Alert, Card, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

export default function AdminOrders() {
  const [params, setParams] = useSearchParams()
  const query = params.toString()
  const { data, error } = useLoad(`/admin/orders${query ? `?${query}` : ''}`)
  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next, { replace: true })
  }
  const small = `${inputClass} !w-auto !py-2 !text-sm`

  return (
    <>
      <PageTitle title="Orders">
        <a href={`/api/admin/orders-export.csv${query ? `?${query}` : ''}`} className={`${btn.ghost} !py-2`}>
          <Download className="h-4 w-4" />
          Export CSV
        </a>
      </PageTitle>

      <Card className="mb-5">
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
            Status
            <select value={params.get('status') || ''} onChange={(e) => set('status', e.target.value)} className={`${small} mt-1 block`}>
              <option value="">All</option>
              {Object.entries(STATUS_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
            Payment
            <select value={params.get('payment') || ''} onChange={(e) => set('payment', e.target.value)} className={`${small} mt-1 block`}>
              <option value="">All</option>
              {Object.entries(PAYMENT_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
            From
            <input type="date" value={params.get('from') || ''} onChange={(e) => set('from', e.target.value)} className={`${small} mt-1 block`} />
          </label>
          <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
            To
            <input type="date" value={params.get('to') || ''} onChange={(e) => set('to', e.target.value)} className={`${small} mt-1 block`} />
          </label>
          <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
            Order number
            <input type="search" value={params.get('q') || ''} onChange={(e) => set('q', e.target.value)} placeholder="PI-2026-..." className={`${small} mt-1 block`} />
          </label>
          {query && (
            <button type="button" onClick={() => setParams({}, { replace: true })} className="pb-2 text-sm font-bold text-primary underline">
              Clear
            </button>
          )}
        </div>
      </Card>

      <Alert>{error}</Alert>
      {!data ? (
        <PageLoading />
      ) : data.orders.length === 0 ? (
        <Card><p className="text-sm text-ink-600">No orders match these filters.</p></Card>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-ink-300/70 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-ink-300/70 bg-surface text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-300/50">
                {data.orders.map((o) => (
                  <tr key={o.id} className="hover:bg-surface">
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${o.id}`} className="font-bold text-primary hover:underline">{o.order_number}</Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-600">{formatDate(o.created_at, true)}</td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-ink-900">{o.customer_name}</span>
                      <span className="block text-xs text-ink-500">{o.city}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-600">
                      {PAYMENT_LABEL[o.payment_method]}
                      {o.utr && <span className="block text-xs font-semibold text-[#3f7a0c]">UTR {o.utr}</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-ink-900">{formatINR(o.total_paise)}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-ink-600">
            <span>{data.total} order{data.total === 1 ? '' : 's'}</span>
            {data.pages > 1 && (
              <span className="flex items-center gap-3">
                <button type="button" disabled={data.page <= 1} onClick={() => set('page', String(data.page - 1))} className="font-bold text-primary underline disabled:text-ink-300 disabled:no-underline">Previous</button>
                Page {data.page} of {data.pages}
                <button type="button" disabled={data.page >= data.pages} onClick={() => set('page', String(data.page + 1))} className="font-bold text-primary underline disabled:text-ink-300 disabled:no-underline">Next</button>
              </span>
            )}
          </div>
        </>
      )}
    </>
  )
}
