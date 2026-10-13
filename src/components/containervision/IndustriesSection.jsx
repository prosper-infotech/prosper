import { Container, Factory, Ship, Truck, Warehouse } from 'lucide-react'
import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'
import ShippingRoutes from './ShippingRoutes'

const INDUSTRIES = [
  { icon: Container, label: 'Container Freight Stations' },
  { icon: Ship, label: 'Container Terminals' },
  { icon: Warehouse, label: 'Bonded Warehouses' },
  { icon: Truck, label: '3PL / Logistics' },
  { icon: Factory, label: 'Import / Export Operations' },
]

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative overflow-hidden bg-gradient-to-b from-navy to-primary-dark">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <ShippingRoutes className="absolute inset-0 h-full w-full" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24 text-center">
        <Reveal>
          <Eyebrow dark>Who we help</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl text-white">Built for container operations</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {INDUSTRIES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-gold hover:text-primary hover:ring-gold"
              >
                <Icon className="h-4 w-4" /> {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
