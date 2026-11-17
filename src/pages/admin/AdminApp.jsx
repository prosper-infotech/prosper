import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { Boxes, ExternalLink, History, LayoutDashboard, LogOut, Package, Settings, ShoppingBag, TriangleAlert, Users } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { api } from '../../shop/api'
import SignIn from '../../shop/components/SignIn'
import { PageLoading } from '../../shop/components/ui'
import logo from '../../assets/logo-light.png'

const Dashboard = lazy(() => import('./AdminDashboard'))
const Orders = lazy(() => import('./AdminOrders'))
const OrderDetail = lazy(() => import('./AdminOrderDetail'))
const Products = lazy(() => import('./AdminProducts'))
const ProductEdit = lazy(() => import('./AdminProductEdit'))
const Stock = lazy(() => import('./AdminStock'))
const Activity = lazy(() => import('./AdminActivity'))
const Customers = lazy(() => import('./AdminCustomers'))
const CustomerDetail = lazy(() => import('./AdminCustomerDetail'))
const SettingsPage = lazy(() => import('./AdminSettings'))

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/activity', label: 'Activity', icon: History },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/stock', label: 'Stock', icon: Boxes },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminApp() {
  const [me, setMe] = useState(undefined) // undefined = loading, null = signed out
  const [denied, setDenied] = useState(false)
  useDocumentTitle('Shop Admin | Prosper Infotech', 'Staff area.', null, { noindex: true, nofollow: true })

  const load = useCallback(
    () =>
      api('/admin/session')
        .then((d) => {
          setMe(d.staff ? d : null)
          setDenied(Boolean(d.denied))
        })
        .catch(() => setMe(null)),
    []
  )
  useEffect(() => {
    load()
  }, [load])

  const signOut = async () => {
    await api('/auth/sign-out', { method: 'POST', body: { purpose: 'staff' } }).catch(() => {})
    setMe(null)
  }

  if (me === undefined) return <PageLoading label="Loading admin" />
  if (!me) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-10">
        <img src={logo} alt="Prosper Infotech" className="mb-8 h-12 w-auto" />
        {denied && <p role="alert" className="mb-4 max-w-md rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">This account no longer has staff access.</p>}
        <SignIn purpose="staff" title="Staff sign-in" text="Enter your staff email. We send a sign-in code to staff addresses only." onDone={load} />
        <Link to="/" className="mt-6 text-sm font-semibold text-primary underline">
          Back to the shop
        </Link>
      </div>
    )
  }

  const i = me.integrations
  const warnings = [
    i.database === 'local' && 'Test mode: orders are saved on this computer only, not in Supabase.',
    !i.email && 'Emails are not being sent yet (RESEND_API_KEY is not set).',
    !i.sales_email && 'No sales team email is set (SALES_NOTIFY_EMAIL), so staff are not notified of new orders.',
    !i.online_payment && 'Online payment is off (Razorpay keys are not set). Customers can pay by bank transfer or UPI.',
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#f6f5ef] lg:grid lg:grid-cols-[240px_1fr] print:block print:bg-white">
      <aside className="bg-primary-dark text-white lg:min-h-screen print:hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block">
          <Link to="/admin" className="block">
            <span className="font-heading text-lg font-extrabold">Prosper Infotech</span>
            <span className="block text-xs font-semibold uppercase tracking-widest text-gold">Shop admin</span>
          </Link>
          <button type="button" onClick={signOut} className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white lg:hidden">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-gold text-primary' : 'text-white/85 hover:bg-white/10'}`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6 hidden border-t border-white/15 px-5 py-4 text-sm lg:block">
          <p className="truncate text-white/70">{me.staff.email}</p>
          <button type="button" onClick={signOut} className="mt-2 flex items-center gap-1.5 text-white/85 hover:text-white">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <Link to="/" target="_blank" className="mt-2 flex items-center gap-1.5 text-white/85 hover:text-white">
            <ExternalLink className="h-4 w-4" />
            View shop
          </Link>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
        {warnings.length > 0 && (
          <ul className="mb-6 flex flex-col gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {warnings.map((w) => (
              <li key={w} className="flex items-start gap-2">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        )}
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="activity" element={<Activity />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductEdit />} />
            <Route path="products/:id" element={<ProductEdit />} />
            <Route path="stock" element={<Stock />} />
            <Route path="settings" element={<SettingsPage integrations={i} />} />
            <Route path="*" element={<p className="text-ink-600">Page not found. <Link to="/admin" className="font-semibold text-primary underline">Go to the dashboard</Link></p>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
