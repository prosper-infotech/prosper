import { Link } from 'react-router-dom'

export default function Breadcrumb({ title, parent }) {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">{title}</h1>
        <nav className="mt-3 text-sm text-ink-300">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          {parent && (
            <>
              <span className="mx-2">/</span>
              <span>{parent}</span>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-white">{title}</span>
        </nav>
      </div>
    </section>
  )
}
