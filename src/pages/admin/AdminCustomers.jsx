import { Link, useSearchParams } from 'react-router-dom'
import { PageLoading } from '../../shop/components/ui'
import { formatDate, inputClass } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'
import { Alert, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

const FILTERS = [
  { key: '', label: 'All' },
  { key: 'buyers', label: 'Have paid' },
  { key: 'unpaid', label: 'Awaiting payment' },
  { key: 'accounts', label: 'With account' },
  { key: 'guests', label: 'Guests' },
]
const SORTS = [
  { key: 'recent', label: 'Most recent' },
  { key: 'spent', label: 'Spent most' },
  { key: 'orders', label: 'Most orders' },
  { key: 'name', label: 'Name A to Z' },
]

export default function AdminCustomers() {
  const [params, setParams] = useSearchParams()
  const query = params.toString()
  const { data, error } = useLoad(`/admin/customers${query ? `?${query}` : ''}`)
  const filter = params.get('filter') || ''
  const sort = params.get('sort') || 'recent'
  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageTitle title="Customers" />
      {data && (
        <div className="mb-5 grid grid-cols-3 gap-3 sm:max-w-xl">
          {[
            ['Customers', data.totals.customers],
            ['Have paid', data.totals.buyers],
            ['With account', data.totals.accounts],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-[#eaeaec] bg-white px-4 py-3">
              <p className="text-xs text-ink-600">{label}</p>
              <p className="font-heading text-2xl font-extrabold text-ink-900">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Show">
        {FILTERS.map((f) => (
          <button
            key={f.key || 'all'}
            type="button"
            onClick={() => set('filter', f.key)}
            aria-pressed={filter === f.key}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${filter === f.key ? 'border-primary bg-primary text-white' : 'border-[#d4d5d9] bg-white text-ink-900 hover:border-ink-900'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-3">
        <label htmlFor="customer-search" className="sr-only">
          Search customers
        </label>
        <input
          id="customer-search"
          type="search"
          value={params.get('q') || ''}
          onChange={(e) => set('q', e.target.value)}
          placeholder="Search name, email, phone, company or GSTIN"
          className={`${inputClass} !w-80 !max-w-full !py-2 !text-sm`}
        />
        <label htmlFor="customer-sort" className="sr-only">
          Sort customers
        </label>
        <select id="customer-sort" value={sort} onChange={(e) => set('sort', e.target.value === 'recent' ? '' : e.target.value)} className={`${inputClass} !w-auto !py-2 !text-sm`}>
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <Alert>{error}</Alert>
      {!data ? (
        <PageLoading />
      ) : data.customers.length === 0 ? (
        <p className="rounded-md border border-[#eaeaec] bg-white px-4 py-6 text-sm text-ink-600">
          {query ? 'No customers match.' : 'No customers yet. Everyone who places an order or creates an account appears here.'}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border border-[#eaeaec] bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-[#eaeaec] bg-[#fafbfc] text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 text-right">Orders</th>
                  <th className="px-4 py-3 text-right">Spent</th>
                  <th className="px-4 py-3">Last order</th>
                  <th className="px-4 py-3">Last sign-in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeaec]">
                {data.customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fafbfc]">
                    <td className="px-4 py-3">
                      <Link to={`/admin/customers/${c.id}`} className="font-bold text-primary hover:underline">
                        {c.name || c.email}
                      </Link>
                      <span className="block text-xs text-ink-500">
                        {c.email}
                        {c.company ? ` · ${c.company}` : ''}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{c.phone || '–'}</td>
                    <td className="px-4 py-3 text-right">
                      {c.orders}
                      {c.awaiting_payment > 0 && <span className="block text-xs font-semibold text-amber-700">{c.awaiting_payment} unpaid</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-ink-900">{c.spent_paise ? formatINR(c.spent_paise) : '–'}</td>
                    <td className="px-4 py-3 text-ink-600">{c.last_order_at ? formatDate(c.last_order_at) : '–'}</td>
                    <td className="px-4 py-3 text-ink-600">
                      {c.last_sign_in_at ? formatDate(c.last_sign_in_at, true) : c.has_account ? '–' : <span className="text-xs text-ink-500">Guest, no account</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-ink-600">
            <span>
              {data.total} customer{data.total === 1 ? '' : 's'}
            </span>
            {data.pages > 1 && (
              <span className="flex items-center gap-3">
                <button type="button" disabled={data.page <= 1} onClick={() => set('page', String(data.page - 1))} className="font-bold text-primary underline disabled:text-ink-300 disabled:no-underline">
                  Previous
                </button>
                Page {data.page} of {data.pages}
                <button type="button" disabled={data.page >= data.pages} onClick={() => set('page', String(data.page + 1))} className="font-bold text-primary underline disabled:text-ink-300 disabled:no-underline">
                  Next
                </button>
              </span>
            )}
          </div>
        </>
      )}
    </>
  )
}
