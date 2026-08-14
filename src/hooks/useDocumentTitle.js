import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useDocumentTitle(title, description) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://www.prosperinfotech.com${pathname}`
  }, [title, description, pathname])
}
