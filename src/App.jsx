import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import SoftwareDevelopment from './pages/SoftwareDevelopment'
import RFIDServices from './pages/RFIDServices'
import IBMiAS400 from './pages/IBMiAS400'
import ProductsSoftware from './pages/ProductsSoftware'
import ProductsHardware from './pages/ProductsHardware'
import Videos from './pages/Videos'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import PlaceholderPage from './pages/PlaceholderPage'
import NotFound from './pages/NotFound'
import CategoryOverviewTemplate from './components/templates/CategoryOverviewTemplate'
import DetailPageTemplate from './components/templates/DetailPageTemplate'
import SolutionDetailTemplate from './components/templates/SolutionDetailTemplate'
import TopicPageTemplate from './components/templates/TopicPageTemplate'
import { NAV } from './data/navigation'
import { SOLUTIONS_DETAIL } from './data/solutionsDetail'
import { INDUSTRIES_DETAIL } from './data/industriesDetail'

function childElement(item, child) {
  const siblings = item.children.filter((c) => c.path !== child.path)

  if (child.path === '/services/software-development') {
    return <SoftwareDevelopment />
  }

  if (child.path === '/services/rfid-services') {
    return <RFIDServices />
  }

  if (child.path === '/services/ibm-i-as400') {
    return <IBMiAS400 />
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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {NAV.filter((item) => item.path !== '/').map((item) => (
          <Route key={item.path} path={item.path}>
            <Route
              index
              element={
                item.path === '/contact' ? (
                  <Contact />
                ) : item.path === '/about' ? (
                  <About />
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
            {item.children?.map((child) => (
              <Route
                key={child.path}
                path={child.path.slice(item.path.length + 1)}
                element={childElement(item, child)}
              />
            ))}
          </Route>
        ))}
        <Route path="/resources/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
