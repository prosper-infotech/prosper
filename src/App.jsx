import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingLayout from './components/layout/LandingLayout'
import Home from './pages/Home'
import PageLoader from './components/ui/PageLoader'
import { NAV } from './data/navigation'
import { SOLUTIONS_DETAIL } from './data/solutionsDetail'
import { INDUSTRIES_DETAIL } from './data/industriesDetail'
import { SOLUTION_ICONS } from './data/solutionIcons'
import { INDUSTRY_ICONS } from './data/industryIcons'
import { AI_SERVICES_DETAIL } from './data/aiServicesDetail'

const About = lazy(() => import('./pages/About'))
const SolutionsOverview = lazy(() => import('./pages/SolutionsOverview'))
const ProductsOverview = lazy(() => import('./pages/ProductsOverview'))
const ServicesOverview = lazy(() => import('./pages/ServicesOverview'))
const IndustriesOverview = lazy(() => import('./pages/IndustriesOverview'))
const ResourcesOverview = lazy(() => import('./pages/ResourcesOverview'))
const Contact = lazy(() => import('./pages/Contact'))
const AIServicesHub = lazy(() => import('./pages/AIServicesHub'))
const RFIDServices = lazy(() => import('./pages/RFIDServices'))
const IndustrialIoTServices = lazy(() => import('./pages/IndustrialIoTServices'))
const IBMiAS400 = lazy(() => import('./pages/IBMiAS400'))
const ProductsSoftware = lazy(() => import('./pages/ProductsSoftware'))
const ProductsHardware = lazy(() => import('./pages/ProductsHardware'))
const Videos = lazy(() => import('./pages/Videos'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const AS400Development = lazy(() => import('./pages/landing/AS400Development'))
const AssetTracking = lazy(() => import('./pages/landing/AssetTracking'))
const TechOutsourcing = lazy(() => import('./pages/landing/TechOutsourcing'))
const WMS = lazy(() => import('./pages/landing/WMS'))
const AIPoweredCFS = lazy(() => import('./pages/landing/AIPoweredCFS'))
const ForkliftVisionAI = lazy(() => import('./pages/landing/ForkliftVisionAI'))
const ThankYou = lazy(() => import('./pages/landing/ThankYou'))
const CategoryOverviewTemplate = lazy(() => import('./components/templates/CategoryOverviewTemplate'))
const DetailPageTemplate = lazy(() => import('./components/templates/DetailPageTemplate'))
const SolutionDetailTemplate = lazy(() => import('./components/templates/SolutionDetailTemplate'))
const TopicPageTemplate = lazy(() => import('./components/templates/TopicPageTemplate'))
const AIServiceDetailTemplate = lazy(() => import('./components/templates/AIServiceDetailTemplate'))

function childElement(item, child) {
  const siblings = item.children.filter((c) => c.path !== child.path)

  if (child.path === '/services/ai-software-development') {
    return <AIServicesHub />
  }

  if (child.path === '/services/rfid-services') {
    return <RFIDServices />
  }

  if (child.path === '/services/industrial-iot-services') {
    return <IndustrialIoTServices />
  }

  if (child.path === '/products/software') {
    return <ProductsSoftware />
  }

  if (child.path === '/products/hardware') {
    return <ProductsHardware />
  }

  if (child.path === '/resources/videos') {
    return <Videos />
  }

  if (child.path === '/resources/faqs') {
    return <FAQ />
  }

  if (child.path === '/resources/blog') {
    return <Blog />
  }

  if (item.path === '/solutions' && SOLUTIONS_DETAIL[child.path]) {
    return (
      <SolutionDetailTemplate
        title={child.label}
        parentLabel={item.label}
        parentPath={item.path}
        siblings={siblings}
        detail={SOLUTIONS_DETAIL[child.path]}
        path={child.path}
        icons={SOLUTION_ICONS}
      />
    )
  }

  if (item.path === '/industries' && INDUSTRIES_DETAIL[child.path]) {
    return (
      <SolutionDetailTemplate
        title={child.label}
        parentLabel={item.label}
        parentPath={item.path}
        siblings={siblings}
        detail={INDUSTRIES_DETAIL[child.path]}
        path={child.path}
        icons={INDUSTRY_ICONS}
      />
    )
  }

  if (item.templateGroup === 'detail') {
    return (
      <DetailPageTemplate
        title={child.label}
        description={child.description}
        parentLabel={item.label}
        parentPath={item.path}
        siblings={siblings}
      />
    )
  }

  return (
    <TopicPageTemplate
      title={child.label}
      parentLabel={item.label}
      parentPath={item.path}
      siblings={siblings}
    />
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/lp/thank-you" element={<ThankYou />} />
        <Route path="/" element={<Home />} />
        <Route element={<LandingLayout />}>
          <Route path="/lp/as400-development" element={<AS400Development />} />
          <Route path="/lp/asset-tracking" element={<AssetTracking />} />
          <Route path="/lp/tech-outsourcing" element={<TechOutsourcing />} />
          <Route path="/lp/wms" element={<WMS />} />
          <Route path="/lp/ai-powered-cfs" element={<AIPoweredCFS />} />
          <Route path="/lp/forklift-vision-ai" element={<ForkliftVisionAI />} />
        </Route>
        <Route element={<Layout />}>
          {NAV.filter((item) => item.path !== '/').map((item) => (
            <Route key={item.path} path={item.path}>
              <Route
                index
                element={
                  item.path === '/contact' ? (
                    <Contact />
                  ) : item.path === '/about' ? (
                    <About />
                  ) : item.path === '/ibm-i-as400' ? (
                    <IBMiAS400 />
                  ) : item.path === '/solutions' ? (
                    <SolutionsOverview />
                  ) : item.path === '/products' ? (
                    <ProductsOverview />
                  ) : item.path === '/services' ? (
                    <ServicesOverview />
                  ) : item.path === '/industries' ? (
                    <IndustriesOverview />
                  ) : item.path === '/resources' ? (
                    <ResourcesOverview />
                  ) : item.children ? (
                    <CategoryOverviewTemplate
                      title={item.label}
                      description={item.description}
                      items={item.children}
                    />
                  ) : (
                    <PlaceholderPage title={item.label} description={item.description} />
                  )
                }
              />
              {item.children?.map((child) => {
                const detailGrandchildren = (child.children ?? []).filter(
                  (gc) => AI_SERVICES_DETAIL[gc.path]
                )
                if (detailGrandchildren.length > 0) {
                  return (
                    <Route key={child.path} path={child.path.slice(item.path.length + 1)}>
                      <Route index element={childElement(item, child)} />
                      {detailGrandchildren.map((gc) => (
                        <Route
                          key={gc.path}
                          path={gc.path.slice(child.path.length + 1)}
                          element={<AIServiceDetailTemplate detail={AI_SERVICES_DETAIL[gc.path]} />}
                        />
                      ))}
                    </Route>
                  )
                }
                return (
                  <Route
                    key={child.path}
                    path={child.path.slice(item.path.length + 1)}
                    element={childElement(item, child)}
                  />
                )
              })}
            </Route>
          ))}
          <Route path="/resources/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/24x7-help-desk" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
