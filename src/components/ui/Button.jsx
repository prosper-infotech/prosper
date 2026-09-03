import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Primary is a flat solid gold fill — opaque, so it reads the same on
// dark and light sections. Both keys share one style; kept separate so
// call sites don't need to change if a light/dark split is needed later.
const PRIMARY_STYLE =
  'bg-gold text-primary shadow-md hover:bg-gold-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95'

const VARIANTS = {
  primary: PRIMARY_STYLE,
  'primary-dark': PRIMARY_STYLE,
  // Secondary ghost — subtle, for dark backgrounds
  outline:
    'bg-white/10 backdrop-blur-sm text-white border border-white/40 shadow-md hover:bg-white hover:text-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
  // Secondary ghost — subtle, for light/gold backgrounds
  'outline-dark':
    'bg-primary/5 backdrop-blur-sm text-primary border border-primary/30 shadow-md hover:bg-primary hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
  icon = true,
  ...rest
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${VARIANTS[variant]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
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
