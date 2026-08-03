import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const VARIANTS = {
  filled:
    'bg-gradient-to-b from-gold to-gold-dark text-primary border border-gold-dark/30 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 active:shadow-md',
  outline:
    'bg-white/10 backdrop-blur-sm text-white border border-white/40 shadow-md hover:bg-white hover:text-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
  'outline-dark':
    'bg-primary/5 backdrop-blur-sm text-primary border border-primary/30 shadow-md hover:bg-primary hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
}

function Shine() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
      <span className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/40 -translate-x-[150%] transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />
    </span>
  )
}

export default function Button({
  to,
  href,
  variant = 'filled',
  children,
  className = '',
  icon = true,
  ...rest
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${VARIANTS[variant]} ${className}`

  const content = (
    <>
      <Shine />
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight className="relative z-10 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
