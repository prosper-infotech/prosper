import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const QUICK_LINKS = [
  { label: 'All products', to: '/c/all' },
  { label: 'Tags & Labels', to: '/c/tags-labels' },
  { label: 'Readers & Antennas', to: '/c/readers-antennas' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFound() {
  useDocumentTitle(
    'Page Not Found | Prosper Infotech',
    "The page you're looking for doesn't exist or has moved. Go back to the Prosper Infotech shop.",
    null,
    { noindex: true }
  )

  return (
    <section className="relative overflow-hidden bg-white">

      <Reveal className="relative z-10 flex max-w-2xl flex-col items-center gap-6 px-6 py-28 mx-auto text-center md:py-36">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f6] text-primary">
          <Compass className="h-8 w-8" />
        </div>
        <span className="text-7xl md:text-8xl font-heading font-bold text-primary drop-shadow-sm">
          404
        </span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
          Looks like this page took a wrong turn
        </h1>
        <p className="max-w-md text-ink-600">
          The page you're looking for doesn't exist or has moved. Let's get you back on route.
        </p>
        <Button to="/" variant="primary">
          Back to the shop
        </Button>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-600 transition-colors hover:border-gold-dark hover:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
