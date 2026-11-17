export function Card({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-ink-300/70 bg-white p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="text-lg">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function PageTitle({ title, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function Alert({ kind = 'error', children }) {
  if (!children) return null
  const style = kind === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-accent-green/40 bg-accent-green/10 text-[#2f5d09]'
  return (
    <p role={kind === 'error' ? 'alert' : 'status'} className={`mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${style}`}>
      {children}
    </p>
  )
}
