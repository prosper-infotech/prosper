export default function Eyebrow({ children, dark = false, className = '' }) {
  return (
    <span className={`text-sm font-semibold uppercase tracking-widest ${dark ? 'text-gold' : 'text-primary'} ${className}`}>
      {children}
    </span>
  )
}
