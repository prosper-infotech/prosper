import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import PlaceholderPage from './pages/PlaceholderPage'
import NotFound from './pages/NotFound'
import CategoryOverviewTemplate from './components/templates/CategoryOverviewTemplate'
import DetailPageTemplate from './components/templates/DetailPageTemplate'
import TopicPageTemplate from './components/templates/TopicPageTemplate'
import { NAV } from './data/navigation'

function childElement(item, child) {
  const siblings = item.children.filter((c) => c.path !== child.path)

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
