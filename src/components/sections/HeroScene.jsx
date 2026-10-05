import { motion, useReducedMotion } from 'framer-motion'

// Coordinates are in the hero illustration's own 1536x1024 pixel space, so the
// SVG overlay scales with the image at every breakpoint.
const PRODUCTS = [
  { key: 'gate', x: 150, y: 632 },
  { key: 'yard', x: 683, y: 823 },
  { key: 'dock', x: 603, y: 380 },
  { key: 'container', x: 1303, y: 155 },
  { key: 'forklift', x: 1003, y: 910 },
]

const BEACONS = [
  { x: 960, y: 250 },
  { x: 1035, y: 380 },
  { x: 1297, y: 500 },
  { x: 540, y: 650 },
  { x: 915, y: 715 },
]

// Routes the data packets travel: every product feeds the central yard hub.
const ROUTES = [
  { d: 'M150 632 Q 380 800 683 823', dur: 3.6, begin: 0 },
  { d: 'M603 380 Q 560 620 683 823', dur: 3.2, begin: 0.6 },
  { d: 'M1303 155 Q 1180 560 683 823', dur: 4.4, begin: 1.2 },
  { d: 'M1003 910 Q 860 900 683 823', dur: 2.8, begin: 0.3 },
  { d: 'M960 250 Q 1040 330 1035 380', dur: 2.2, begin: 0.9 },
  { d: 'M540 650 Q 600 720 683 823', dur: 2.4, begin: 1.6 },
]

function Ping({ x, y, r = 18, delay = 0, color = '#e0a800' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r * 0.45} fill={color} stroke="#fff" strokeWidth="4" />
      <circle className="hc-scene-ping" r={r} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="6" style={{ animationDelay: `${delay}s` }} />
      <circle className="hc-scene-ping" r={r} fill="none" stroke={color} strokeWidth="4" style={{ animationDelay: `${delay + 1.2}s` }} />
    </g>
  )
}

export default function HeroScene({ src, alt }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="relative w-full"
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img src={src} alt={alt} className="w-full" fetchPriority="high" />

      {!reduce && (
        <svg
          viewBox="0 0 1536 1024"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hs-packet">
              <stop offset="0%" stopColor="#fff7a8" />
              <stop offset="60%" stopColor="#f7dd00" />
              <stop offset="100%" stopColor="#f7dd00" stopOpacity="0" />
            </radialGradient>
          </defs>

          {ROUTES.map((r, i) => (
            <path
              key={`line-${i}`}
              d={r.d}
              fill="none"
              stroke="#14346d"
              strokeOpacity="0.5"
              strokeWidth="5"
              strokeDasharray="10 18"
              strokeLinecap="round"
              className="hs-flow-line"
              style={{ animationDelay: `${r.begin}s` }}
            />
          ))}

          {BEACONS.map((b, i) => (
            <Ping key={`beacon-${i}`} x={b.x} y={b.y} r={20} delay={i * 0.45} color="#2f8fe8" />
          ))}

          {PRODUCTS.map((p, i) => (
            <Ping key={p.key} x={p.x} y={p.y} r={30} delay={i * 0.35} />
          ))}

          {ROUTES.map((r, i) => (
            <circle key={`packet-${i}`} r="15" fill="url(#hs-packet)" stroke="#14346d" strokeWidth="4">
              <animateMotion dur={`${r.dur}s`} begin={`${r.begin}s`} repeatCount="indefinite" path={r.d} />
            </circle>
          ))}
        </svg>
      )}
    </motion.div>
  )
}
