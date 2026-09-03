import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ title, parent, parentPath, description }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prosperinfotech.com/' },
    ]
    // Every non-final ListItem requires an `item` URL, so only add the parent
    // crumb when we actually have a path for it — otherwise skip straight to
    // the current page rather than emitting an invalid entry.
    if (parent && parentPath) {
      itemListElement.push({
        '@type': 'ListItem',
        position: itemListElement.length + 1,
        name: parent,
        item: `https://www.prosperinfotech.com${parentPath}`,
      })
    }
    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: title,
      item: `https://www.prosperinfotech.com${pathname}`,
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
    <section className="relative overflow-hidden bg-[#fffdf6] px-6 py-16 text-center md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,52,109,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(20,52,109,0.9) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

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

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-primary">
          {title}
        </h1>

        <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-gold to-gold-dark" />

        {description && <p className="mt-5 text-lg text-ink-600">{description}</p>}
      </motion.div>
    </section>
  )
}
