import { ExternalLink } from 'lucide-react'
import Reveal from '../motion/Reveal'
import { CLIENTS } from '../../data/clients'

const byName = (name) => CLIENTS.find((c) => c.name === name)

const COLUMNS = [
  ['Hirschbach Motor Lines', 'LA Photo Party'],
  ['Lazer Logistics', "Era's Bharti Hospital", 'Devam Projects'],
].map((names) => names.map(byName))

function ClientCard({ client, delay, fill }) {
  return (
    <Reveal delay={delay} y={16} className={fill ? 'flex-1' : ''}>
      <div
        className={`group relative flex ${
          fill ? 'h-full' : ''
        } flex-col gap-5 rounded-2xl border border-ink-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:flex-row sm:items-center`}
      >
        <a
          href={client.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${client.name} website`}
          className="absolute right-4 top-4 text-ink-500 transition-colors hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" />
        </a>

        <div className="flex shrink-0 items-center justify-center sm:w-36">
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            className={
              client.logoRound
                ? 'h-20 w-20 rounded-full object-cover shadow-sm'
                : 'max-h-16 w-auto max-w-full object-contain'
            }
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="pr-6 font-heading text-lg font-bold text-primary">{client.name}</h3>
          <span className="mt-1.5 mb-3 block h-0.5 w-10 bg-gold" />
          <div className="flex flex-wrap gap-2">
            {client.services.map((service) => (
              <span
                key={service.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium leading-none text-ink-600 ring-1 ring-inset ring-primary/10"
              >
                <service.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                {service.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function ClientShowcase() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {COLUMNS.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6">
          {column.map((client, i) => (
            <ClientCard
              key={client.name}
              client={client}
              delay={(colIndex + i * 2) * 0.08}
              fill={colIndex === 1}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
