import { Check, ChevronRight, ChevronDown } from 'lucide-react'

export default function ConnectedSteps({ steps }) {
  return (
    <div className="relative mt-5">
      <div className="lg:hidden absolute left-5 top-5 bottom-5 w-px bg-ink-300" />
      <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-5 h-px bg-ink-300" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.title} className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-md">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1 lg:mt-1">
                <h5 className="font-heading font-semibold text-sm text-primary">{step.title}</h5>
                {step.status && (
                  <span className="mt-1 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {step.status}
                  </span>
                )}
                {step.description && <p className="mt-1.5 text-xs text-ink-600">{step.description}</p>}
                {step.items && (
                  <ul className="mt-2 flex flex-col gap-1 lg:items-start text-left">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-ink-600">
                        <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {i < steps.length - 1 && (
                <span className="pointer-events-none absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-surface text-gold-dark left-5 top-16 -translate-x-1/2 lg:left-full lg:top-5 lg:-translate-x-1/2 lg:-translate-y-1/2">
                  <ChevronDown className="h-4 w-4 lg:hidden" />
                  <ChevronRight className="hidden h-4 w-4 lg:block" />
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
