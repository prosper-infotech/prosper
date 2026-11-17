import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SITE_URL } from '../../shop/site'

export default function Breadcrumb({ title, parent, parentPath, description, h1 }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    ]
    // Every non-final ListItem requires an `item` URL, so only add the parent
    // crumb when we actually have a path for it — otherwise skip straight to
    // the current page rather than emitting an invalid entry.
    if (parent && parentPath) {
      itemListElement.push({
        '@type': 'ListItem',
        position: itemListElement.length + 1,
        name: parent,
        item: `${SITE_URL}${parentPath}`,
      })
    }
    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: title,
      item: `${SITE_URL}${pathname}`,
    })

    const schemaTag = document.createElement('script')
    schemaTag.type = 'application/ld+json'
    schemaTag.setAttribute('data-breadcrumb-schema', 'true')
    schemaTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    })
    document.head.appendChild(schemaTag)

    return () => schemaTag.remove()
  }, [title, parent, parentPath, pathname])

  return (
    <section className="relative border-b border-[#eaeaec] bg-[#fafbfc] px-6 py-12 text-center md:py-14">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto"
      >
        <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-ink-500">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          {parent && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
              {parentPath ? (
                <Link to={parentPath} className="transition-colors hover:text-primary">
                  {parent}
                </Link>
              ) : (
                <span>{parent}</span>
              )}
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
          <span className="font-medium text-ink-900">{title}</span>
        </nav>

        {parent && (
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-dark">{parent}</p>
        )}

        <h1 className="text-2xl md:text-3xl font-heading font-extrabold uppercase tracking-[0.1em] !text-ink-900">
          {h1 || title}
        </h1>

        <span className="mx-auto mt-4 block h-1 w-12 bg-gold" />

        {description && <p className="mt-5 text-lg text-ink-600">{description}</p>}
      </motion.div>
    </section>
  )
}
