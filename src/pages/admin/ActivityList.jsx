import { Link } from 'react-router-dom'
import { formatINR } from '../../../shared/pricing.js'
import { KIND, dayLabel, timeLabel } from './activityKinds'

// Timeline grouped by day. Used on the Activity page and on each customer's page.
export default function ActivityList({ items, showWho = true }) {
  if (!items.length) return <p className="py-6 text-sm text-ink-600">Nothing has happened in this period yet.</p>
  const days = []
  for (const item of items) {
    const label = dayLabel(item.at)
    if (days[days.length - 1]?.label !== label) days.push({ label, items: [] })
    days[days.length - 1].items.push(item)
  }
  return (
    <div className="flex flex-col gap-6">
      {days.map((day) => (
        <section key={day.label}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-500">{day.label}</h3>
          <ol className="divide-y divide-[#eaeaec] rounded-md border border-[#eaeaec] bg-white">
            {day.items.map((item) => {
              const kind = KIND[item.kind] || KIND.other
              const Icon = kind.icon
              return (
                <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${kind.tone}`} title={kind.label}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink-900">
                      {item.title}
                      {item.order && (
                        <>
                          {' · '}
                          <Link to={`/admin/orders/${item.order.id}`} className="text-primary hover:underline">
                            {item.order.number}
                          </Link>
                          {item.kind === 'order' && <span className="font-normal text-ink-600"> · {formatINR(item.order.total_paise)}</span>}
                        </>
                      )}
                    </p>
                    {item.detail && <p className="mt-0.5 break-words text-xs text-ink-600">{item.detail}</p>}
                    {showWho && item.who && (
                      <p className="mt-0.5 text-xs text-ink-500">
                        {item.customer_id ? (
                          <Link to={`/admin/customers/${item.customer_id}`} className="hover:text-primary hover:underline">
                            {item.who}
                          </Link>
                        ) : (
                          item.who
                        )}
                      </p>
                    )}
                  </div>
                  <time dateTime={item.at} className="shrink-0 text-xs text-ink-500">
                    {timeLabel(item.at)}
                  </time>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
