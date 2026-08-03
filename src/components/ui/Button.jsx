import { Link } from 'react-router-dom'

const VARIANTS = {
  filled:
    'bg-gradient-to-b from-gold to-gold-dark text-primary border border-gold-dark/30 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 active:shadow-md',
  outline:
    'bg-white/10 backdrop-blur-sm text-white border border-white/40 shadow-md hover:bg-white hover:text-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
  'outline-dark':
    'bg-primary/5 backdrop-blur-sm text-primary border border-primary/30 shadow-md hover:bg-primary hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
}

export default function Button({ to, href, variant = 'filled', children, className = '', ...rest }) {
  const classes = `inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${VARIANTS[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
