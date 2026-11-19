import { useMemo, useState } from 'react'
import { Download, Mail, MessageCircle, Phone, Trash2 } from 'lucide-react'
import { api } from '../../shop/api'
import { PageLoading } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { Alert, Card, PageTitle } from './adminUi'
import { useLoad } from './useLoad'

const when = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })

// Everyone who signed up through the shop's "Stay updated" pop-up.
export default function AdminSubscribers() {
  const { data, error, reload } = useLoad('/admin/subscribers')
  const [q, setQ] = useState('')
  const [message, setMessage] = useState({ kind: 'error', text: '' })

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return (data?.subscribers || []).filter((s) => words.every((w) => `${s.phone} ${s.email} ${s.page}`.toLowerCase().includes(w)))
  }, [data, q])

  if (error && !data) return <Alert>{error}</Alert>
  if (!data) return <PageLoading />

  const all = data.subscribers
  const week = all.filter((s) => Date.now() - new Date(s.created_at) < 7 * 86_400_000).length
  const remove = async (s) => {
    if (!window.confirm(`Remove ${s.phone || s.email} from the list? Do this when someone asks to unsubscribe.`)) return
    try {
      await api('/admin/subscribers/remove', { method: 'POST', body: { phone: s.phone, email: s.email } })
      setMessage({ kind: 'ok', text: `${s.phone || s.email} removed.` })
      await reload()
    } catch (err) {
      setMessage({ kind: 'error', text: err.message })
    }
  }

  return (
    <>
      <PageTitle title="Subscribers">
        <a href="/api/admin/subscribers.csv" className={`${btn.ghost} !py-2`}>
          <Download className="h-4 w-4" />
          Export CSV
        </a>
      </PageTitle>
      <p className="-mt-2 mb-5 text-sm text-ink-600">
        People who signed up through the &ldquo;Stay updated&rdquo; pop-up on the shop. <strong>{all.length}</strong> in total, <strong>{week}</strong> in the last 7 days.
      </p>
      <Alert kind={message.kind}>{message.text}</Alert>

      <Card>
        <label htmlFor="sub-search" className="sr-only">
          Search subscribers
        </label>
        <input id="sub-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by mobile or email" className={`${inputClass} mb-4 max-w-sm`} />
        {list.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-600">{all.length ? 'No subscriber matches that search.' : 'No sign-ups yet. They appear here as soon as someone subscribes.'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#eaeaec] text-xs uppercase tracking-wider text-ink-500">
                  <th className="py-2.5 pr-4 font-semibold">Signed up</th>
                  <th className="py-2.5 pr-4 font-semibold">Mobile</th>
                  <th className="py-2.5 pr-4 font-semibold">Email</th>
                  <th className="py-2.5 pr-4 font-semibold">Page</th>
                  <th className="py-2.5 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((s) => {
                  const wa = s.phone.replace(/\D/g, '')
                  return (
                    <tr key={`${s.phone}|${s.email}`} className="border-b border-[#f0f0f2] last:border-0">
                      <td className="whitespace-nowrap py-3 pr-4 text-ink-600">{when(s.created_at)}</td>
                      <td className="whitespace-nowrap py-3 pr-4">
                        {s.phone ? (
                          <span className="flex items-center gap-3">
                            <a href={`tel:${wa}`} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                              <Phone className="h-3.5 w-3.5" />
                              {s.phone}
                            </a>
                            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${s.phone}`} className="text-[#128C4A] hover:opacity-80">
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          </span>
                        ) : (
                          <span className="text-ink-500">-</span>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {s.email ? (
                          <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 break-all text-primary hover:underline">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            {s.email}
                          </a>
                        ) : (
                          <span className="text-ink-500">-</span>
                        )}
                      </td>
                      <td className="max-w-[220px] truncate py-3 pr-4 text-ink-600" title={s.page}>
                        {s.page || '-'}
                      </td>
                      <td className="py-3 text-right">
                        <button type="button" onClick={() => remove(s)} aria-label={`Remove ${s.phone || s.email}`} className="rounded-md p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}
