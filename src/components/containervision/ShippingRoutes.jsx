export default function ShippingRoutes({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <g fill="none" stroke="#F7DD00" strokeWidth="1.5" strokeDasharray="1 8" strokeLinecap="round" opacity="0.35">
        <path d="M40 320 Q 320 120 600 260 T 1160 180">
          <animate attributeName="stroke-dashoffset" from="0" to="-72" dur="6s" repeatCount="indefinite" />
        </path>
        <path d="M100 80 Q 420 260 760 90 T 1180 300">
          <animate attributeName="stroke-dashoffset" from="0" to="-72" dur="8s" repeatCount="indefinite" />
        </path>
        <path d="M0 220 Q 260 40 560 150 T 1000 60">
          <animate attributeName="stroke-dashoffset" from="0" to="-72" dur="7s" repeatCount="indefinite" />
        </path>
      </g>
      <g fill="#F7DD00" opacity="0.55">
        <circle cx="40" cy="320" r="3.5" />
        <circle cx="600" cy="260" r="3.5" />
        <circle cx="1160" cy="180" r="3.5" />
        <circle cx="100" cy="80" r="3.5" />
        <circle cx="760" cy="90" r="3.5" />
        <circle cx="1180" cy="300" r="3.5" />
        <circle cx="560" cy="150" r="3.5" />
        <circle cx="1000" cy="60" r="3.5" />
      </g>
    </svg>
  )
}
