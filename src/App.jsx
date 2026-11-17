import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PageLoader from './components/ui/PageLoader'
import ShopHome from './pages/shop/ShopHome'
import ShopListing from './pages/shop/ShopListing'
import ProductPage from './pages/shop/ProductPage'

// The whole site is the online hardware shop (docs/commercial-website-plan.md).
// Home, category and product pages load with the app (no loading flash); the rest load on demand.
const CartPage = lazy(() => import('./pages/shop/CartPage'))
const Checkout = lazy(() => import('./pages/shop/Checkout'))
const OrderStatus = lazy(() => import('./pages/shop/OrderStatus'))
const Invoice = lazy(() => import('./pages/shop/Invoice'))
const Account = lazy(() => import('./pages/shop/Account'))
const PolicyPage = lazy(() => import('./pages/shop/PolicyPage'))
const Contact = lazy(() => import('./pages/shop/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const ThankYou = lazy(() => import('./pages/landing/ThankYou'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

// Old /shop/... addresses keep working.
function OldShopLink({ to }) {
  const params = useParams()
  return <Navigate to={to(params)} replace />
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/order/:token/invoice" element={<Invoice />} />
        <Route path="/lp/thank-you" element={<ThankYou />} />
        <Route element={<Layout />}>
          <Route path="/" element={<ShopHome />} />
          <Route path="/c/:category" element={<ShopListing />} />
          <Route path="/p/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:token" element={<OrderStatus />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping-policy" element={<PolicyPage slug="shipping-policy" />} />
          <Route path="/returns-refunds" element={<PolicyPage slug="returns-refunds" />} />
          <Route path="/warranty" element={<PolicyPage slug="warranty" />} />
          <Route path="/terms-of-sale" element={<PolicyPage slug="terms-of-sale" />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shop" element={<Navigate to="/" replace />} />
          <Route path="/shop/p/:slug" element={<OldShopLink to={(p) => `/p/${p.slug}`} />} />
          <Route path="/shop/:category" element={<OldShopLink to={(p) => `/c/${p.category}`} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
