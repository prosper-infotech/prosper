import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function setMeta(attr, key, content) {
  let meta = document.querySelector(`meta[${attr}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, key)
    document.head.appendChild(meta)
  }
  meta.content = content
}

export default function useDocumentTitle(title, description, jsonLd) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (title) {
      document.title = title
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    const url = `https://www.prosperinfotech.com${pathname}`

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
    setMeta('property', 'og:url', url)

    let schemaTag = document.querySelector('script[data-page-schema]')
    if (jsonLd) {
      if (!schemaTag) {
        schemaTag = document.createElement('script')
        schemaTag.type = 'application/ld+json'
        schemaTag.setAttribute('data-page-schema', 'true')
        document.head.appendChild(schemaTag)
      }
      schemaTag.textContent = JSON.stringify(jsonLd)
    } else if (schemaTag) {
      schemaTag.remove()
    }

    return () => {
      document.querySelector('script[data-page-schema]')?.remove()
    }
  }, [title, description, jsonLd, pathname])
}
