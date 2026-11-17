import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { PageLoading } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { Alert, PageTitle } from './adminUi'
import { useLoad } from './useLoad'
import ActivityList from './ActivityList'
import { GROUPS } from './activityKinds'

const PERIODS = [
  { days: 1, label: 'Last 24 hours' },
  { days: 7, label: 'Last 7 days' },
  { days: 30, label: 'Last 30 days' },
  { days: 90, label: 'Last 90 days' },
  { days: 365, label: 'Last 12 months' },
]

export default function AdminActivity() {
  const [params, setParams] = useSearchParams()
  const type = params.get('type') || ''
  const days = params.get('days') || '7'
  const q = params.get('q') || ''
  const page = Number(params.get('page')) || 1
  const query = new URLSearchParams({ type, days, q, page: String(page) }).toString()
  const { data, error, reload } = useLoad(`/admin/activity?${query}`)

  // Keep the timeline current while the page is open.
  useEffect(() => {
    const timer = setInterval(reload, 60000)
    return () => clearInterval(timer)
  }, [reload])

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageTitle title="Activity">
        <button type="button" onClick={reload} className={`${btn.ghost} !py-2`}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </PageTitle>
      <p className="-mt-3 mb-5 text-sm text-ink-600">
        Everything that happens in the shop, newest first: sign-ins, new accounts, orders, payments, shipping and emails. Updates every minute.
      </p>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Show">
        {GROUPS.map((g) => {
          const on = type === g.key
          const count = g.key ? data?.counts?.[g.key] : null
          return (
            <button
              key={g.key || 'all'}
              type="button"
              onClick={() => set('type', g.key)}
              aria-pressed={on}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-primary bg-primary text-white' : 'border-[#d4d5d9] bg-white text-ink-900 hover:border-ink-900'}`}
            >
              {g.label}
              {count != null && <span className={`ml-1.5 text-xs ${on ? 'text-white/80' : 'text-ink-500'}`}>{count}</span>}
            </button>
          )
        })}
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="activity-period">
          Period
        </label>
        <select id="activity-period" value={days} onChange={(e) => set('days', e.target.value === '7' ? '' : e.target.value)} className={`${inputClass} !w-auto !py-2 !text-sm`}>
          {PERIODS.map((p) => (
            <option key={p.days} value={p.days}>
              {p.label}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="activity-search">
          Search activity
        </label>
        <input
          id="activity-search"
          type="search"
          value={q}
          onChange={(e) => set('q', e.target.value)}
          placeholder="Search by email or order number"
          className={`${inputClass} !w-72 !max-w-full !py-2 !text-sm`}
        />
      </div>

      <Alert>{error}</Alert>
      {!data ? (
        <PageLoading />
      ) : (
        <>
          <p className="mb-3 text-sm text-ink-600">
            {data.total} event{data.total === 1 ? '' : 's'}
          </p>
          <ActivityList items={data.items} />
          {data.pages > 1 && (
            <div className="mt-5 flex items-center justify-between text-sm text-ink-600">
              <button type="button" disabled={data.page <= 1} onClick={() => set('page', String(data.page - 1))} className="font-bold text-primary underline disabled:text-ink-300 disabled:no-underline">
                Newer
              </button>
              <span>
                Page {data.page} of {data.pages}
              </span>
              <button type="button" disabled={data.page >= data.pages} onClick={() => set('page', String(data.page + 1))} className="font-bold text-primary underline disabled:text-ink-300 disabled:no-underline">
                Older
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
