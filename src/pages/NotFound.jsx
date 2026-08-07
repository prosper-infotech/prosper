import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const QUICK_LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFound() {
  useDocumentTitle(
    'Page Not Found | Prosper Infotech',
    "The page you're looking for doesn't exist or has moved. Return to Prosper Infotech's homepage or explore our solutions, products, and services."
  )

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-primary to-primary-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <Reveal className="relative z-10 flex max-w-2xl flex-col items-center gap-6 px-6 py-28 mx-auto text-center md:py-36">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.2)]">
          <Compass className="h-8 w-8" />
        </div>
        <span className="text-7xl md:text-8xl font-heading font-bold text-white drop-shadow-md">
          404
        </span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">
          Looks like this page took a wrong turn
        </h1>
        <p className="max-w-md text-ink-300">
          The page you're looking for doesn't exist or has moved. Let's get you back on route.
        </p>
        <Button to="/" variant="primary">
          Back to home
        </Button>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-ink-300 transition-colors hover:border-gold/50 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
