// One entry point for every /api request. Used by the Vercel function
// (api/index.js) and by the Vite dev server (vite.config.js).
import { HttpError, json } from './lib/http.js'
import { NotConfiguredError } from './lib/db.js'
import { requireStaff } from './lib/auth.js'
import * as pub from './routes/public.js'
import * as admin from './routes/admin.js'
import * as activity from './routes/activity.js'

const routes = []
const add = (method, pattern, handler, staffOnly = false) => {
  const names = []
  const regex = new RegExp(`^${pattern.replace(/:([a-z]+)/g, (_m, n) => (names.push(n), '([^/]+)'))}$`)
  routes.push({ method, regex, names, handler, staffOnly })
}

add('GET', '/shop/catalogue', pub.catalogue)
add('POST', '/checkout', pub.checkout)
add('GET', '/orders/:token', pub.getOrder)
add('POST', '/orders/:token/utr', pub.saveUtr)
add('POST', '/orders/:token/pay', pub.payOrder)
add('POST', '/payments/verify', pub.verifyPayment)
add('POST', '/payments/razorpay-webhook', pub.razorpayWebhook)
add('POST', '/shipping/shiprocket-webhook', pub.shiprocketWebhook)
add('POST', '/auth/request-code', pub.requestCode)
add('POST', '/auth/verify-code', pub.verifyCode)
add('POST', '/auth/sign-out', pub.signOut)
add('GET', '/account', pub.account)
add('PUT', '/account/profile', pub.saveProfile)
add('POST', '/account/addresses', pub.saveAddress)
add('PUT', '/account/addresses/:id', pub.saveAddress)
add('DELETE', '/account/addresses/:id', pub.deleteAddress)
add('DELETE', '/account', pub.deleteAccount)
add('GET', '/feeds/merchant.xml', pub.merchantFeed)
add('GET', '/sitemap-shop.xml', pub.shopSitemap)

// Used by the admin screen to ask "am I signed in?" without a 401 when the answer is no.
add('GET', '/admin/session', async (request) => {
  try {
    return await admin.me(request, {}, await requireStaff(request))
  } catch (err) {
    if (err instanceof HttpError && [401, 403].includes(err.status)) return json({ staff: null, denied: err.status === 403 })
    throw err
  }
})
add('GET', '/admin/me', admin.me, true)
add('GET', '/admin/dashboard', admin.dashboard, true)
add('GET', '/admin/activity', activity.activity, true)
add('GET', '/admin/customers', activity.listCustomers, true)
add('GET', '/admin/customers/:id', activity.getCustomer, true)
add('GET', '/admin/orders', admin.listOrders, true)
add('GET', '/admin/orders-export.csv', admin.exportOrders, true)
add('GET', '/admin/orders/:id', admin.getOrder, true)
add('POST', '/admin/orders/:id/status', admin.setOrderStatus, true)
add('POST', '/admin/orders/:id/note', admin.addOrderNote, true)
add('POST', '/admin/orders/:id/ship', admin.shipOrderRoute, true)
add('POST', '/admin/orders/:id/shiprocket', admin.shiprocketCreate, true)
add('GET', '/admin/products', admin.listProducts, true)
add('POST', '/admin/products', admin.saveProduct, true)
add('PUT', '/admin/products/:id', admin.saveProduct, true)
add('GET', '/admin/products-export.csv', admin.exportProducts, true)
add('POST', '/admin/products/import', admin.importProducts, true)
add('POST', '/admin/stock', admin.updateStock, true)
add('GET', '/admin/settings', admin.readSettings, true)
add('PUT', '/admin/settings', admin.writeSettings, true)
add('GET', '/admin/staff', admin.listStaff, true)
add('POST', '/admin/staff', admin.addStaff, true)
add('DELETE', '/admin/staff/:id', admin.removeStaff, true)

function routePath(request) {
  const url = new URL(request.url)
  // On Vercel every /api/* request is rewritten to this one function with the
  // original path in ?__path= (see vercel.json).
  const fromRewrite = url.searchParams.get('__path')
  const path = fromRewrite !== null ? `/${fromRewrite}` : url.pathname.replace(/^\/api/, '')
  return path.replace(/\/+$/, '') || '/'
}

export async function handle(request) {
  try {
    const path = routePath(request)
    const matching = routes.filter((r) => r.regex.test(path))
    if (!matching.length) throw new HttpError(404, 'Not found.')
    const route = matching.find((r) => r.method === request.method)
    if (!route) throw new HttpError(405, 'Method not allowed.')

    // Browsers only send a JSON content type cross-site after a CORS check that
    // we never approve, and cookies are SameSite=Lax. Also reject other origins outright.
    const origin = request.headers.get('origin')
    if (origin && request.method !== 'GET' && !path.endsWith('-webhook')) {
      const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
      let originHost = null
      try {
        originHost = new URL(origin).host
      } catch {
        originHost = null
      }
      if (originHost !== host) throw new HttpError(403, 'Not allowed.')
    }

    const values = route.regex.exec(path).slice(1).map(decodeURIComponent)
    const params = Object.fromEntries(route.names.map((n, i) => [n, values[i]]))
    const staff = route.staffOnly ? await requireStaff(request) : undefined
    return await route.handler(request, params, staff)
  } catch (err) {
    if (err instanceof HttpError) return json({ error: err.message, ...(err.extra || {}) }, err.status)
    if (err instanceof NotConfiguredError) return json({ error: err.message, code: 'not_configured' }, 503)
    console.error('[shop] unexpected error', err)
    return json({ error: 'Something went wrong on our side. Please try again.' }, 500)
  }
}
