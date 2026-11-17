import { Link } from 'react-router-dom'
import { Boxes, Clock, IndianRupee, PackageCheck, ShoppingBag } from 'lucide-react'
import { PageLoading, StatusBadge } from '../../shop/components/ui'
import { formatDate } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'
import { Alert, Card, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

function Stat({ icon: Icon, label, value, to, tone = 'text-primary' }) {
  const body = (
    <div className="flex h-full items-center gap-4 rounded-2xl border border-ink-300/70 bg-white p-5 transition-shadow hover:shadow-md">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm text-ink-600">{label}</span>
        <span className={`block font-heading text-2xl font-extrabold ${tone}`}>{value}</span>
      </span>
    </div>
  )
  return to ? <Link to={to}>{body}</Link> : body
}

export default function AdminDashboard() {
  const { data, error } = useLoad('/admin/dashboard')
  if (error) return <Alert>{error}</Alert>
  if (!data) return <PageLoading />
  const peak = Math.max(1, ...data.days.map((d) => d.revenue_paise))

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={ShoppingBag} label="Orders today" value={data.today.orders} to="/admin/orders" />
        <Stat icon={IndianRupee} label="Paid revenue today" value={formatINR(data.today.revenue_paise)} />
        <Stat icon={Clock} label="Waiting for payment" value={data.pending_payments} to="/admin/orders?status=pending_payment" tone={data.pending_payments ? 'text-amber-700' : 'text-primary'} />
        <Stat icon={PackageCheck} label="Orders to ship" value={data.to_ship} to="/admin/orders?status=paid" tone={data.to_ship ? 'text-[#3f7a0c]' : 'text-primary'} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card title="Paid revenue, last 14 days" action={<span className="text-sm text-ink-600">30 days: {formatINR(data.last_30_days.revenue_paise)} from {data.last_30_days.orders} orders</span>}>
          <div className="flex h-40 items-end gap-1.5" role="img" aria-label="Bar chart of paid revenue per day for the last 14 days">
            {data.days.map((d) => (
              <div key={d.day} className="group relative flex h-full flex-1 flex-col justify-end" title={`${d.day}: ${formatINR(d.revenue_paise)} (${d.orders} orders)`}>
                <div className="rounded-t bg-primary transition-colors group-hover:bg-gold-dark" style={{ height: `${Math.max(2, (d.revenue_paise / peak) * 100)}%`, opacity: d.revenue_paise ? 1 : 0.15 }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-ink-500">
            <span>{formatDate(data.days[0].day)}</span>
            <span>Today</span>
          </div>
        </Card>

        <Card title="Low stock" action={<Link to="/admin/stock" className="text-sm font-bold text-primary underline">Update stock</Link>}>
          {data.low_stock.length ? (
            <ul className="flex flex-col divide-y divide-ink-300/60">
              {data.low_stock.slice(0, 8).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <Link to={`/admin/products/${p.id}`} className="min-w-0 truncate font-semibold text-primary hover:underline">{p.name}</Link>
                  <span className={`shrink-0 font-bold ${p.stock_qty ? 'text-amber-700' : 'text-red-700'}`}>{p.stock_qty} left</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center gap-2 text-sm text-ink-600"><Boxes className="h-4 w-4" />Nothing is running low.</p>
          )}
        </Card>
      </div>

      <Card title="Latest orders" className="mt-6" action={<Link to="/admin/orders" className="text-sm font-bold text-primary underline">All orders</Link>}>
        {data.recent_orders.length ? (
          <ul className="flex flex-col divide-y divide-ink-300/60">
            {data.recent_orders.map((o) => (
              <li key={o.id}>
                <Link to={`/admin/orders/${o.id}`} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm hover:bg-surface">
                  <span className="font-bold text-primary">{o.order_number}</span>
                  <span className="min-w-0 flex-1 truncate text-ink-600">{o.customer_name} · {o.city}</span>
                  <span className="font-semibold text-ink-900">{formatINR(o.total_paise)}</span>
                  <StatusBadge status={o.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-600">No orders yet. They will appear here as soon as the first one is placed.</p>
        )}
      </Card>
    </>
  )
}
