export default function ProcessSteps({ steps }) {
  return (
    <div className="relative mt-5">
      <div className="lg:hidden absolute left-5 top-5 bottom-5 w-px bg-ink-300" />
      <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-5 h-px bg-ink-300" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center">
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-sm font-heading font-bold text-primary shadow-md">
              {i + 1}
            </span>
            <div className="flex-1 lg:mt-1">
              <h3 className="font-heading font-semibold text-sm text-primary">{step.title}</h3>
              <p className="mt-1.5 text-xs text-ink-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
