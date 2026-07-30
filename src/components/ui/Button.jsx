import { Link } from 'react-router-dom'

const VARIANTS = {
  filled: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-primary-dark',
}

export default function Button({ to, href, variant = 'filled', children, className = '', ...rest }) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${VARIANTS[variant]} ${className}`

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
