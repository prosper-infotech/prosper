import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col gap-4 rounded-lg border border-ink-300 bg-white p-7 overflow-hidden transition-colors duration-300 hover:border-transparent"
    >
      <div className="absolute inset-0 bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-white/10 group-hover:text-white transition-colors duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="relative z-10 font-heading font-semibold text-lg text-ink-900 group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="relative z-10 text-sm text-ink-600 group-hover:text-ink-300 transition-colors duration-300 line-clamp-2">
        {description}
      </p>
      <span className="relative z-10 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-white transition-colors duration-300">
        Learn more <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  )
}
