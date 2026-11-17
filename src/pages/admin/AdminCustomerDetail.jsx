import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { PageLoading, StatusBadge } from '../../shop/components/ui'
import { formatDate, PAYMENT_LABEL } from '../../shop/format'
import { formatINR } from '../../../shared/pricing.js'
import { Alert, Card } from './adminUi'
import { useLoad } from './useLoad'
import ActivityList from './ActivityList'

export default function AdminCustomerDetail() {
  const { id } = useParams()
  const { data, error } = useLoad(`/admin/customers/${id}`)
  if (error && !data) return <Alert>{error}</Alert>
  if (!data) return <PageLoading />
  const { customer: c, orders, addresses, activity } = data

  return (
    <>
      <Link to="/admin/customers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        All customers
      </Link>
      <div className="mb-6 mt-3">
        <h1 className="text-2xl font-extrabold md:text-3xl">{c.name || c.email}</h1>
        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-600">
          <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
            <Mail className="h-4 w-4" />
            {c.email}
          </a>
          {c.phone && (
            <a href={`tel:+91${c.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
              <Phone className="h-4 w-4" />
              {c.phone}
            </a>
          )}
          {c.company && <span>{c.company}</span>}
          {c.gstin && <span>GSTIN {c.gstin}</span>}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Orders', c.orders],
          ['Spent', c.spent_paise ? formatINR(c.spent_paise) : '–'],
          ['Customer since', formatDate(c.created_at)],
          ['Last sign-in', c.last_sign_in_at ? formatDate(c.last_sign_in_at, true) : c.has_account ? 'Never' : 'Guest, no account'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#eaeaec] bg-white px-4 py-3">
            <p className="text-xs text-ink-600">{label}</p>
            <p className="mt-0.5 font-bold text-ink-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card title="Orders">
            {orders.length ? (
              <ul className="divide-y divide-[#eaeaec]">
                {orders.map((o) => (
                  <li key={o.id}>
                    <Link to={`/admin/orders/${o.id}`} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm hover:bg-[#fafbfc]">
                      <span className="font-bold text-primary">{o.order_number}</span>
                      <span className="text-ink-600">
                        {formatDate(o.created_at)} · {PAYMENT_LABEL[o.payment_method]}
                      </span>
                      <span className="font-semibold text-ink-900">{formatINR(o.total_paise)}</span>
                      <StatusBadge status={o.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-600">No orders yet.</p>
            )}
          </Card>

          <Card title="Activity">
            <ActivityList items={activity} showWho={false} />
          </Card>
        </div>

        <Card title="Saved addresses" className="self-start">
          {addresses.length ? (
            <ul className="flex flex-col gap-4">
              {addresses.map((a) => (
                <li key={a.id} className="text-sm leading-relaxed text-ink-900">
                  {a.is_default && <span className="mb-1 inline-block rounded bg-gold/40 px-2 py-0.5 text-xs font-bold text-primary">Default</span>}
                  <address className="not-italic">
                    <strong>{a.name}</strong>, {a.line1}
                    {a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} {a.pincode}
                    <br />
                    Phone: {a.phone}
                  </address>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-600">No saved addresses. Delivery addresses are on each order.</p>
          )}
        </Card>
      </div>
    </>
  )
}
