import { useReducedMotion } from 'framer-motion'
import { ScanEye, Boxes, DoorOpen, Warehouse, Truck } from 'lucide-react'

const LOOP = 14 // seconds for one truck pass; every station animation is timed to it
const STATIONS = [
  { key: 'gate', x: 130, label: 'Gate', icon: ScanEye, at: 2.2 },
  { key: 'yard', x: 360, label: 'Yard', icon: Boxes, at: 4.4 },
  { key: 'dock', x: 600, label: 'Dock', icon: DoorOpen, at: 6.8 },
  { key: 'warehouse', x: 850, label: 'Warehouse', icon: Warehouse, at: 9.4 },
  { key: 'fleet', x: 1080, label: 'Fleet', icon: Truck, at: 11.6 },
]
const NAVY = '#14346d'
const GOLD = '#f7dd00'
const GOLD_DARK = '#e0c700'

const active = (at) => ({ animationDelay: `${Math.max(at - 0.5, 0)}s`, animationDuration: `${LOOP}s` })

function Truck2() {
  return (
    <g>
      <rect x="-86" y="-58" width="84" height="48" rx="4" fill="#fff" stroke={NAVY} strokeWidth="3" />
      <rect x="-76" y="-46" width="40" height="8" rx="2" fill={GOLD} />
      <path d="M0 -44 h24 l14 18 v16 h-38 z" fill={GOLD} stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
      <path d="M8 -38 h13 l9 12 h-22 z" fill="#d8ecff" stroke={NAVY} strokeWidth="2" />
      {[-62, -34, 14].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="-4" r="10" fill={NAVY} />
          <circle cx={cx} cy="-4" r="4" fill="#fff" />
        </g>
      ))}
    </g>
  )
}

export default function LogisticsFlow() {
  const reduce = useReducedMotion()

  return (
    <div className="lf-root w-full">
      <svg viewBox="0 0 1240 400" className="h-auto w-full" role="img" aria-label="Animated logistics flow: a truck moves through gate, yard, dock, warehouse and fleet stations, each monitored by the Prosper AI platform">
        <defs>
          <linearGradient id="lf-road" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1c4486" />
            <stop offset="100%" stopColor={NAVY} />
          </linearGradient>
        </defs>

        {/* AI platform bar + links down to every station */}
        <rect x="170" y="14" width="900" height="44" rx="22" fill={NAVY} />
        <circle cx="206" cy="36" r="7" fill={GOLD} className={reduce ? '' : 'lf-blink'} />
        <rect x="226" y="30" width="170" height="12" rx="6" fill="#fff" fillOpacity="0.9" />
        <rect x="408" y="30" width="90" height="12" rx="6" fill="#fff" fillOpacity="0.35" />
        {STATIONS.map((s) => (
          <g key={`link-${s.key}`}>
            <line x1={s.x} y1="58" x2={s.x} y2={s.key === 'fleet' ? 120 : 140} stroke={NAVY} strokeOpacity="0.35" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" className={reduce ? '' : 'lf-dash'} />
            {!reduce && (
              <circle r="6" fill={GOLD} stroke={NAVY} strokeWidth="2">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${(s.x % 7) / 10}s`} path={`M${s.x} 140 L${s.x} 62`} />
              </circle>
            )}
          </g>
        ))}

        {/* road */}
        <rect x="0" y="330" width="1240" height="40" rx="6" fill="url(#lf-road)" />
        <line x1="0" y1="350" x2="1240" y2="350" stroke={GOLD} strokeWidth="3" strokeDasharray="22 20" className={reduce ? '' : 'lf-road-dash'} />

        {/* GATE: booth, barrier, camera with scan beam */}
        <g transform="translate(130 330)">
          <rect x="-84" y="-92" width="56" height="92" rx="4" fill="#fff" stroke={NAVY} strokeWidth="3" />
          <rect x="-90" y="-102" width="68" height="12" rx="3" fill={NAVY} />
          <rect x="-74" y="-72" width="36" height="24" rx="3" fill="#d8ecff" stroke={NAVY} strokeWidth="2" />
          <rect x="38" y="-146" width="8" height="146" fill={NAVY} />
          <rect x="26" y="-152" width="34" height="20" rx="4" fill={NAVY} />
          <circle cx="34" cy="-142" r="5" fill={GOLD} />
          <polygon points="36,-130 4,0 76,0" fill={GOLD} className={reduce ? 'lf-off' : 'lf-station'} style={active(STATIONS[0].at)} />
          <g style={{ transformBox: 'fill-box', transformOrigin: '0% 50%' }} className={reduce ? '' : 'lf-barrier'}>
            <rect x="-28" y="-62" width="92" height="9" rx="4" fill="#fff" stroke={NAVY} strokeWidth="2" />
            <rect x="-14" y="-62" width="12" height="9" fill="#e5484d" />
            <rect x="14" y="-62" width="12" height="9" fill="#e5484d" />
          </g>
        </g>

        {/* YARD: stacked containers + gantry crane + GPS pin */}
        <g transform="translate(360 330)">
          {[
            { x: -90, y: -34, c: '#2f6fd1' },
            { x: -42, y: -34, c: GOLD_DARK },
            { x: 6, y: -34, c: '#e5484d' },
            { x: -66, y: -68, c: GOLD_DARK },
            { x: -18, y: -68, c: '#2f6fd1' },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width="44" height="32" rx="3" fill={b.c} stroke={NAVY} strokeWidth="2.5" />
          ))}
          <rect x="-110" y="-150" width="8" height="150" fill={NAVY} />
          <rect x="62" y="-150" width="8" height="150" fill={NAVY} />
          <rect x="-116" y="-160" width="192" height="14" rx="4" fill={NAVY} />
          <g className={reduce ? '' : 'lf-spreader'}>
            <line x1="-24" y1="-146" x2="-24" y2="-112" stroke={NAVY} strokeWidth="3" />
            <rect x="-46" y="-112" width="44" height="30" rx="3" fill={GOLD} stroke={NAVY} strokeWidth="2.5" />
          </g>
          <g transform="translate(0 -196)">
            <path d="M0 0 c-16 -22 -20 -44 0 -44 s16 22 0 44z" fill={GOLD} stroke={NAVY} strokeWidth="3" />
            <circle cy="-30" r="6" fill={NAVY} />
            <circle cy="-30" r="14" fill="none" stroke={GOLD_DARK} strokeWidth="3" className={reduce ? 'lf-off' : 'lf-ping'} />
          </g>
          <circle cx="-24" cy="-60" r="46" fill="none" stroke={GOLD_DARK} strokeWidth="3" className={reduce ? 'lf-off' : 'lf-station'} style={active(STATIONS[1].at)} />
        </g>

        {/* DOCK: building with doors, one opening, camera eye */}
        <g transform="translate(600 330)">
          <rect x="-100" y="-120" width="200" height="120" rx="4" fill="#fff" stroke={NAVY} strokeWidth="3" />
          <rect x="-108" y="-132" width="216" height="16" rx="3" fill={NAVY} />
          {[-76, -26, 24].map((x, i) => (
            <g key={x}>
              <rect x={x} y="-84" width="44" height="84" fill="#eef3fb" stroke={NAVY} strokeWidth="2.5" />
              <rect x={x} y="-84" width="44" height="84" fill={NAVY} fillOpacity="0.85" className={reduce ? '' : 'lf-door'} style={{ animationDelay: `${i * 1.3}s`, transformBox: 'fill-box', transformOrigin: '50% 0%' }} />
            </g>
          ))}
          <g transform="translate(0 -156)">
            <circle r="16" fill={NAVY} />
            <circle r="7" fill={GOLD} />
            <circle r="26" fill="none" stroke={GOLD_DARK} strokeWidth="3" className={reduce ? 'lf-off' : 'lf-station'} style={active(STATIONS[2].at)} />
          </g>
        </g>

        {/* WAREHOUSE: racks, moving forklift, RFID waves */}
        <g transform="translate(850 330)">
          <rect x="-96" y="-124" width="192" height="124" rx="4" fill="#fff" stroke={NAVY} strokeWidth="3" />
          {[-92, -58, -24].map((y) => (
            <line key={y} x1="-96" x2="96" y1={y + 28} y2={y + 28} stroke={NAVY} strokeWidth="2.5" />
          ))}
          {[
            [-84, -50, '#2f6fd1'], [-52, -50, GOLD_DARK], [-20, -50, '#2f6fd1'], [20, -84, GOLD_DARK], [52, -84, '#e5484d'],
            [-84, -84, '#e5484d'], [20, -50, '#2f6fd1'], [52, -50, GOLD_DARK],
          ].map(([x, y, c], i) => (
            <rect key={i} x={x} y={y} width="24" height="24" rx="2" fill={c} stroke={NAVY} strokeWidth="2" />
          ))}
          <g className={reduce ? '' : 'lf-forklift'}>
            <rect x="-14" y="-30" width="34" height="22" rx="3" fill={GOLD} stroke={NAVY} strokeWidth="2.5" />
            <rect x="20" y="-46" width="5" height="46" fill={NAVY} />
            <rect x="25" y="-16" width="16" height="5" fill={NAVY} />
            <circle cx="-4" cy="-6" r="6" fill={NAVY} />
            <circle cx="14" cy="-6" r="6" fill={NAVY} />
          </g>
          <g transform="translate(0 -148)">
            <circle r="9" fill={NAVY} />
            {[22, 38, 54].map((r, i) => (
              <circle key={r} r={r} fill="none" stroke={GOLD_DARK} strokeWidth="3" className={reduce ? 'lf-off' : 'lf-wave'} style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </g>
        </g>

        {/* FLEET: live dashboard + GPS pin */}
        <g transform="translate(1080 330)">
          <rect x="-84" y="-190" width="168" height="108" rx="10" fill="#fff" stroke={NAVY} strokeWidth="3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-62 + i * 28} y="-136" width="16" height="40" rx="3" fill={i % 2 ? GOLD_DARK : '#2f6fd1'} className={reduce ? '' : 'lf-bar'} style={{ animationDelay: `${i * 0.35}s`, transformBox: 'fill-box', transformOrigin: '50% 100%' }} />
          ))}
          <path d="M-62 -154 Q -30 -176 0 -156 T 62 -160" fill="none" stroke={NAVY} strokeWidth="3" strokeDasharray="5 7" strokeLinecap="round" />
          <g transform="translate(0 -62)">
            <path d="M0 0 c-14 -18 -18 -38 0 -38 s14 20 0 38z" fill="#e5484d" stroke={NAVY} strokeWidth="3" />
            <circle cy="-26" r="5" fill="#fff" />
            <circle cy="-26" r="14" fill="none" stroke="#e5484d" strokeWidth="3" className={reduce ? 'lf-off' : 'lf-ping'} />
          </g>
          <circle cx="0" cy="-48" r="52" fill="none" stroke={GOLD_DARK} strokeWidth="3" className={reduce ? 'lf-off' : 'lf-station'} style={active(STATIONS[4].at)} />
        </g>

        {/* the truck that ties it all together */}
        {!reduce && (
          <g transform="translate(0 330)">
            <g>
              <Truck2 />
              <animateMotion dur={`${LOOP}s`} repeatCount="indefinite" path="M-130 0 H 1340" />
            </g>
          </g>
        )}
        {reduce && (
          <g transform="translate(560 330)">
            <Truck2 />
          </g>
        )}
      </svg>

      <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {STATIONS.map((s) => (
          <span
            key={s.key}
            className={`inline-flex items-center gap-2 rounded-full border border-gold-dark/30 bg-white px-3.5 py-2 text-sm font-bold text-primary shadow-sm ${reduce ? '' : 'lf-chip'}`}
            style={reduce ? undefined : active(s.at)}
          >
            <s.icon className="h-4 w-4 text-gold-dark" />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
