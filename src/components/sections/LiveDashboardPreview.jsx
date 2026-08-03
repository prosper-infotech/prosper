import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, MapPin, Package, Bell } from 'lucide-react'

const CATEGORIES = [
  { label: 'Equipment', pct: 40, color: 'bg-gold' },
  { label: 'Vehicles', pct: 25, color: 'bg-primary' },
  { label: 'Tools', pct: 20, color: 'bg-gold-dark' },
  { label: 'IT Assets', pct: 15, color: 'bg-primary-dark' },
]

const ACTIVITY_TEMPLATE = [
  { id: 'AP-1136', location: 'Main Yard', status: 'Checked Out' },
  { id: 'AP-0718', location: 'South Yard', status: 'Checked In' },
  { id: 'AP-6532', location: 'East Dock', status: 'In Transit' },
  { id: 'AP-2210', location: 'Warehouse 2', status: 'Checked In' },
]

const STATUS_COLOR = {
  'Checked Out': 'text-gold-dark bg-gold/15',
  'Checked In': 'text-accent-green bg-accent-green/15',
  'In Transit': 'text-primary bg-primary/10',
}

function useTicker(base, spread) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(base + Math.floor(Math.random() * spread * 2) - spread)
    }, 2400)
    return () => clearInterval(interval)
  }, [base, spread])
  return value
}

export default function LiveDashboardPreview() {
  const totalAssets = useTicker(1248, 6)
  const activeAssets = useTicker(1028, 8)
  const checkedIn = useTicker(146, 4)
  const [clockTick, setClockTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setClockTick((t) => t + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  const activity = ACTIVITY_TEMPLATE.map((row, i) => ({
    ...row,
    time: `${((clockTick + i) % 12) + 1}:${String((clockTick * 7 + i * 13) % 60).padStart(2, '0')} ${
      (clockTick + i) % 2 === 0 ? 'AM' : 'PM'
    }`,
  }))

  return (
    <div className="rounded-2xl border border-ink-300 bg-white shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink-300">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="font-heading font-semibold text-primary">Prosper Dashboard</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-accent-green/15 px-3 py-1 text-xs font-semibold text-accent-green">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent-green"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-ink-300 border-b border-ink-300">
        {[
          { label: 'Total Assets', value: totalAssets },
          { label: 'Active Assets', value: activeAssets },
          { label: 'Checked In', value: checkedIn },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-5 text-center">
            <motion.div
              key={stat.value}
              initial={{ opacity: 0.4, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-heading font-bold text-primary tabular-nums"
            >
              {stat.value.toLocaleString()}
            </motion.div>
            <div className="mt-1 text-xs text-ink-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 py-5 border-b border-ink-300">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">
          <Package className="h-3.5 w-3.5" />
          Asset Category
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-alt">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className={cat.color} style={{ width: `${cat.pct}%` }} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {CATEGORIES.map((cat) => (
            <span key={cat.label} className="flex items-center gap-1.5 text-xs text-ink-600">
              <span className={`h-2 w-2 rounded-full ${cat.color}`} />
              {cat.label} {cat.pct}%
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">
          <Bell className="h-3.5 w-3.5" />
          Recent Activity
        </div>
        <div className="flex flex-col gap-2">
          {activity.map((row) => (
            <div key={row.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-ink-900 font-medium">
                <MapPin className="h-3.5 w-3.5 text-ink-500 shrink-0" />
                {row.id}
                <span className="text-ink-500 font-normal hidden sm:inline">· {row.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR[row.status]}`}>
                  {row.status}
                </span>
                <span className="text-xs text-ink-500 w-16 text-right tabular-nums">{row.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
