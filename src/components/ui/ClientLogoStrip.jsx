import Reveal from '../motion/Reveal'
import { CLIENTS } from '../../data/clients'

export default function ClientLogoStrip() {
  return (
    <Reveal className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {CLIENTS.map((client) => (
        <img
          key={client.name}
          src={client.logo}
          alt={client.name}
          title={client.name}
          className={
            client.logoRound
              ? 'h-14 w-14 rounded-full object-cover shadow-sm'
              : 'h-10 md:h-12 w-auto max-w-[160px] object-contain'
          }
        />
      ))}
    </Reveal>
  )
}
