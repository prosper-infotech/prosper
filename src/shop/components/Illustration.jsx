import { illustrationFor, illustrationSpec } from '../../../shared/illustration.js'

// Drawn stand-ins for products that have no photo yet: one picture per kind of
// product, in the shop's navy and gold. They are labelled "Illustration" so
// nobody mistakes them for a photo of the exact model.
const N = '#14346d'
const D = '#0e2851'
const G = '#f7dd00'
const GD = '#d9bf00'
const L = '#dfe6f3'
const S = '#8fa3c8'
const W = '#ffffff'

const line = { fill: 'none', stroke: N, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }
const barcode = (x, y, h, n = 14, color = N) =>
  Array.from({ length: n }, (_, i) => <rect key={i} x={x + i * 3} y={y} width={i % 3 === 0 ? 2 : 1} height={h} fill={color} />)
const waves = (x, y, color = W) => (
  <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d={`M${x} ${y - 6}a8 8 0 0 1 0 12`} />
    <path d={`M${x + 5} ${y - 11}a15 15 0 0 1 0 22`} />
    <path d={`M${x + 10} ${y - 16}a22 22 0 0 1 0 32`} />
  </g>
)

const ART = {
  label: (
    <g transform="rotate(-8 100 82)">
      <rect x="40" y="48" width="120" height="68" rx="6" fill={W} stroke={N} strokeWidth="3" />
      <path d="M54 82h14v-16h12v32h12v-16h4M146 82h-14v-16h-12v32h-12v-16h-4" {...line} strokeWidth="2.5" />
      <rect x="96" y="78" width="8" height="8" rx="1" fill={G} stroke={D} strokeWidth="1.5" />
    </g>
  ),
  'on-metal-tag': (
    <g>
      <rect x="38" y="56" width="124" height="48" rx="10" fill={N} />
      <rect x="44" y="62" width="112" height="36" rx="6" fill={D} />
      <circle cx="56" cy="80" r="6" fill={L} />
      <circle cx="144" cy="80" r="6" fill={L} />
      <rect x="72" y="72" width="56" height="16" rx="3" fill={G} />
      {barcode(78, 75, 10, 17, D)}
    </g>
  ),
  'hard-tag': (
    <g>
      <circle cx="96" cy="80" r="40" fill={W} stroke={N} strokeWidth="3" />
      <circle cx="96" cy="80" r="26" fill={L} />
      <circle cx="96" cy="80" r="10" fill={N} />
      <circle cx="96" cy="80" r="3.5" fill={G} />
      <path d="M136 80h26" stroke={S} strokeWidth="5" strokeLinecap="round" />
      <circle cx="164" cy="80" r="5" fill={N} />
    </g>
  ),
  wristband: (
    <g>
      <ellipse cx="100" cy="84" rx="62" ry="34" fill="none" stroke={N} strokeWidth="14" />
      <ellipse cx="100" cy="84" rx="62" ry="34" fill="none" stroke={D} strokeWidth="2" strokeDasharray="2 10" />
      <rect x="82" y="104" width="36" height="22" rx="6" fill={G} stroke={D} strokeWidth="2" />
      {waves(96, 115, D)}
    </g>
  ),
  card: (
    <g>
      <rect x="44" y="40" width="112" height="72" rx="8" fill={S} transform="rotate(-6 100 76)" />
      <rect x="48" y="48" width="112" height="72" rx="8" fill={N} />
      <rect x="62" y="66" width="22" height="17" rx="3" fill={G} />
      <path d="M62 74.5h22M73 66v17" stroke={GD} strokeWidth="1.5" />
      {waves(126, 75)}
      <rect x="62" y="98" width="58" height="5" rx="2.5" fill={L} />
      <rect x="62" y="107" width="34" height="4" rx="2" fill={S} />
    </g>
  ),
  coin: (
    <g>
      <circle cx="100" cy="80" r="44" fill={W} stroke={N} strokeWidth="3" />
      <circle cx="100" cy="80" r="34" fill="none" stroke={N} strokeWidth="2" strokeDasharray="5 4" />
      <rect x="94" y="74" width="12" height="12" rx="2" fill={G} stroke={D} strokeWidth="1.5" />
      {waves(112, 80, N)}
    </g>
  ),
  'key-fob': (
    <g>
      <circle cx="100" cy="36" r="13" fill="none" stroke={S} strokeWidth="5" />
      <path d="M100 48c-26 0-38 18-38 40 0 22 17 36 38 36s38-14 38-36c0-22-12-40-38-40z" fill={N} />
      <circle cx="100" cy="58" r="6" fill={L} />
      <rect x="86" y="84" width="28" height="22" rx="5" fill={G} />
      {waves(96, 95, D)}
    </g>
  ),
  'handheld-reader': (
    <g>
      <path d="M88 86l-12 50a6 6 0 0 0 6 7h18a6 6 0 0 0 6-5l9-52z" fill={D} />
      <rect x="40" y="34" width="112" height="56" rx="12" fill={N} />
      <rect x="52" y="44" width="56" height="36" rx="4" fill={L} />
      <rect x="58" y="50" width="28" height="4" rx="2" fill={S} />
      <rect x="58" y="58" width="40" height="4" rx="2" fill={S} />
      <rect x="58" y="66" width="20" height="4" rx="2" fill={G} />
      <rect x="140" y="26" width="26" height="72" rx="5" fill={G} stroke={D} strokeWidth="2" />
      {waves(172, 62, N)}
      <rect x="114" y="52" width="16" height="16" rx="3" fill={D} />
    </g>
  ),
  'fixed-reader': (
    <g>
      <rect x="52" y="30" width="96" height="92" rx="10" fill={W} stroke={N} strokeWidth="3" />
      <rect x="52" y="30" width="96" height="22" rx="10" fill={N} />
      <rect x="52" y="44" width="96" height="8" fill={N} />
      <circle cx="66" cy="41" r="3" fill={G} />
      <circle cx="76" cy="41" r="3" fill="#7bd389" />
      <rect x="66" y="66" width="68" height="34" rx="4" fill={L} />
      <text x="100" y="88" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill={N}>RFID</text>
      {[64, 84, 104, 124].map((x) => (
        <g key={x}>
          <rect x={x} y="122" width="12" height="10" rx="2" fill={D} />
          <rect x={x + 3} y="132" width="6" height="8" fill={GD} />
        </g>
      ))}
    </g>
  ),
  'integrated-reader': (
    <g>
      <rect x="44" y="26" width="112" height="108" rx="12" fill={W} stroke={N} strokeWidth="3" />
      <rect x="56" y="38" width="88" height="84" rx="8" fill={L} />
      <circle cx="100" cy="80" r="30" fill="none" stroke={N} strokeWidth="3" />
      <circle cx="100" cy="80" r="18" fill="none" stroke={S} strokeWidth="3" />
      <circle cx="100" cy="80" r="6" fill={G} />
      <circle cx="134" cy="44" r="3" fill={G} />
      <path d="M100 134v14" stroke={D} strokeWidth="6" />
    </g>
  ),
  'desktop-reader': (
    <g>
      <rect x="66" y="22" width="68" height="46" rx="5" fill={G} stroke={D} strokeWidth="2" transform="rotate(-10 100 45)" />
      <path d="M44 88c0-8 6-14 14-14h84c8 0 14 6 14 14v28c0 5-4 9-9 9H53c-5 0-9-4-9-9z" fill={N} />
      <rect x="58" y="84" width="84" height="8" rx="4" fill={D} />
      {waves(96, 108)}
      <circle cx="140" cy="112" r="3.5" fill={G} />
      <path d="M156 110c14 0 14 18 26 18" fill="none" stroke={S} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  antenna: (
    <g>
      <rect x="50" y="24" width="100" height="100" rx="10" fill={W} stroke={N} strokeWidth="3" />
      <rect x="64" y="38" width="72" height="72" rx="6" fill="none" stroke={S} strokeWidth="3" />
      <rect x="78" y="52" width="44" height="44" rx="4" fill="none" stroke={N} strokeWidth="3" />
      <rect x="92" y="66" width="16" height="16" rx="2" fill={G} />
      <path d="M100 124v10c0 8 8 10 18 10h30" fill="none" stroke={D} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  'barcode-scanner': (
    <g>
      <path d="M58 62l40-10 10 40-26 7-12 42h-20l10-44z" fill={N} />
      <path d="M58 62l40-10 10 40-26 7z" fill={D} />
      <rect x="96" y="50" width="10" height="44" rx="3" transform="rotate(-14 101 72)" fill={G} />
      <path d="M110 58l60-18M112 70l60 0M112 82l60 18" stroke={G} strokeWidth="2" strokeDasharray="4 3" opacity="0.9" />
      <rect x="76" y="100" width="6" height="12" rx="2" fill={G} />
      <rect x="150" y="56" width="30" height="30" rx="3" fill={W} stroke={S} />
      {barcode(154, 62, 18, 8)}
    </g>
  ),
  'presentation-scanner': (
    <g>
      <ellipse cx="100" cy="128" rx="46" ry="10" fill={D} />
      <path d="M86 126l6-46h16l6 46z" fill={N} />
      <rect x="62" y="32" width="76" height="56" rx="12" fill={N} />
      <rect x="72" y="42" width="56" height="36" rx="6" fill={D} />
      <rect x="78" y="48" width="44" height="24" rx="3" fill={G} opacity="0.9" />
      <path d="M100 78l-34 40M100 78l34 40" stroke={G} strokeWidth="2" strokeDasharray="4 3" />
    </g>
  ),
  'mobile-computer': (
    <g>
      <rect x="70" y="18" width="60" height="124" rx="12" fill={N} />
      <rect x="84" y="12" width="32" height="10" rx="3" fill={G} />
      <rect x="78" y="30" width="44" height="58" rx="4" fill={L} />
      <rect x="84" y="38" width="32" height="5" rx="2" fill={S} />
      <rect x="84" y="48" width="22" height="5" rx="2" fill={S} />
      {barcode(84, 62, 16, 11)}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={80 + c * 14} y={96 + r * 12} width="12" height="8" rx="2" fill={c === 1 && r === 0 ? G : D} />))}
    </g>
  ),
  'label-printer': (
    <g>
      <path d="M48 64c0-14 10-24 24-24h56c14 0 24 10 24 24v52H48z" fill={N} />
      <path d="M52 64c0-12 9-20 20-20h56c11 0 20 8 20 20z" fill={D} />
      <rect x="48" y="112" width="104" height="14" rx="4" fill={D} />
      <rect x="66" y="104" width="68" height="6" rx="2" fill={D} />
      <rect x="70" y="106" width="60" height="38" rx="3" fill={W} stroke={S} strokeWidth="1.5" />
      {barcode(78, 114, 18, 15)}
      <circle cx="136" cy="94" r="4" fill={G} />
    </g>
  ),
  'industrial-printer': (
    <g>
      <rect x="40" y="26" width="120" height="108" rx="8" fill={N} />
      <rect x="40" y="26" width="58" height="108" rx="8" fill={D} />
      <rect x="50" y="38" width="40" height="40" rx="4" fill={L} opacity="0.35" />
      <circle cx="70" cy="58" r="12" fill="none" stroke={L} strokeWidth="3" />
      <rect x="110" y="40" width="38" height="22" rx="3" fill={L} />
      <rect x="114" y="68" width="8" height="8" rx="2" fill={G} />
      <rect x="126" y="68" width="8" height="8" rx="2" fill={S} />
      <rect x="138" y="68" width="8" height="8" rx="2" fill={S} />
      <rect x="64" y="110" width="72" height="34" rx="3" fill={W} stroke={S} />
      {barcode(72, 116, 16, 18)}
    </g>
  ),
  'receipt-printer': (
    <g>
      <path d="M74 20h52v52H74z" fill={W} stroke={S} strokeWidth="1.5" />
      {[30, 38, 46, 54].map((y, i) => <rect key={y} x="82" y={y} width={i % 2 ? 24 : 36} height="3" rx="1.5" fill={S} />)}
      <rect x="44" y="64" width="112" height="70" rx="14" fill={N} />
      <rect x="62" y="64" width="76" height="10" rx="3" fill={D} />
      <circle cx="140" cy="118" r="4" fill={G} />
      <rect x="56" y="112" width="40" height="6" rx="3" fill={D} />
    </g>
  ),
  'mobile-printer': (
    <g>
      <rect x="80" y="24" width="40" height="34" fill={W} stroke={S} strokeWidth="1.5" />
      {barcode(86, 32, 16, 10)}
      <rect x="58" y="50" width="84" height="88" rx="16" fill={N} />
      <rect x="70" y="50" width="60" height="10" rx="3" fill={D} />
      <rect x="72" y="72" width="56" height="26" rx="4" fill={L} />
      <circle cx="84" cy="114" r="6" fill={G} />
      <circle cx="104" cy="114" r="6" fill={D} />
      <path d="M142 70h10c6 0 8 4 8 10v30c0 6-2 10-8 10h-10" fill="none" stroke={S} strokeWidth="5" />
    </g>
  ),
  'card-printer': (
    <g>
      <path d="M40 60c0-10 8-18 18-18h84c10 0 18 8 18 18v58H40z" fill={N} />
      <rect x="40" y="110" width="120" height="16" rx="5" fill={D} />
      <rect x="62" y="56" width="76" height="8" rx="3" fill={D} />
      <rect x="66" y="22" width="68" height="40" rx="5" fill={W} stroke={S} strokeWidth="1.5" />
      <rect x="72" y="28" width="16" height="20" rx="2" fill={L} />
      <rect x="94" y="30" width="32" height="4" rx="2" fill={S} />
      <rect x="94" y="38" width="22" height="4" rx="2" fill={S} />
      <rect x="66" y="118" width="68" height="26" rx="4" fill={G} stroke={GD} />
      <circle cx="146" cy="80" r="4" fill={G} />
    </g>
  ),
  ribbon: (
    <g>
      <rect x="38" y="62" width="124" height="36" fill="#2a2f3a" />
      <ellipse cx="38" cy="80" rx="12" ry="26" fill="#2a2f3a" />
      <ellipse cx="162" cy="80" rx="12" ry="26" fill="#3a404d" />
      <ellipse cx="162" cy="80" rx="7" ry="15" fill={G} />
      <ellipse cx="162" cy="80" rx="3" ry="7" fill={D} />
      <path d="M150 100c0 18-20 30-50 30" fill="none" stroke="#2a2f3a" strokeWidth="10" />
      <rect x="60" y="70" width="70" height="4" rx="2" fill="#4b5263" />
    </g>
  ),
  'label-roll': (
    <g>
      <path d="M100 118h56v20h-56" fill={W} stroke={S} strokeWidth="1.5" />
      <rect x="112" y="121" width="16" height="14" rx="2" fill={L} />
      <rect x="134" y="121" width="16" height="14" rx="2" fill={L} />
      <circle cx="90" cy="76" r="54" fill={W} stroke={N} strokeWidth="3" />
      <circle cx="90" cy="76" r="44" fill="none" stroke={L} strokeWidth="2" />
      <circle cx="90" cy="76" r="34" fill="none" stroke={L} strokeWidth="2" />
      <circle cx="90" cy="76" r="20" fill={G} stroke={GD} strokeWidth="2" />
      <circle cx="90" cy="76" r="12" fill={W} />
    </g>
  ),
  'paper-roll': (
    <g>
      <path d="M96 126c30 0 58 0 66 8s-6 12-40 12" fill={W} stroke={S} strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 26 - 26} ${i % 2 ? -8 : 4})`}>
          <circle cx="96" cy="80" r="30" fill={W} stroke={N} strokeWidth="3" />
          <circle cx="96" cy="80" r="22" fill="none" stroke={L} strokeWidth="2" />
          <circle cx="96" cy="80" r="8" fill={L} stroke={S} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  ),
  printhead: (
    <g>
      <rect x="28" y="62" width="144" height="30" rx="5" fill={D} />
      <rect x="34" y="68" width="132" height="6" rx="3" fill="#3a404d" />
      <rect x="34" y="80" width="132" height="3" fill={G} />
      <rect x="78" y="92" width="44" height="18" rx="3" fill={N} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={82 + i * 5} y="96" width="2.5" height="10" fill={G} />)}
      <circle cx="40" cy="56" r="5" fill={S} />
      <circle cx="160" cy="56" r="5" fill={S} />
    </g>
  ),
  cable: (
    <g>
      <path d="M40 112c0-30 30-30 30-50s-26-22-26 2 46 26 66 6 34-30 50-14" fill="none" stroke={D} strokeWidth="8" strokeLinecap="round" />
      <rect x="20" y="104" width="34" height="18" rx="4" fill={N} />
      <rect x="10" y="108" width="12" height="10" rx="2" fill={G} />
      <rect x="146" y="40" width="34" height="20" rx="4" fill={N} transform="rotate(30 163 50)" />
    </g>
  ),
  'pos-terminal': (
    <g>
      <rect x="34" y="20" width="132" height="88" rx="8" fill={N} />
      <rect x="42" y="28" width="116" height="72" rx="3" fill={L} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={50 + c * 20} y={36 + r * 20} width="16" height="16" rx="3" fill={(r + c) % 3 ? W : G} />))}
      <rect x="132" y="36" width="20" height="56" rx="3" fill={W} />
      <rect x="135" y="42" width="14" height="3" fill={S} />
      <rect x="135" y="50" width="10" height="3" fill={S} />
      <rect x="135" y="82" width="14" height="6" rx="2" fill={N} />
      <path d="M88 108h24l8 22H80z" fill={D} />
      <rect x="60" y="128" width="80" height="10" rx="5" fill={D} />
    </g>
  ),
  'android-pos': (
    <g>
      <rect x="88" y="14" width="34" height="30" fill={W} stroke={S} strokeWidth="1.5" />
      {[20, 27, 34].map((y) => <rect key={y} x="94" y={y} width="22" height="3" rx="1.5" fill={S} />)}
      <rect x="62" y="34" width="86" height="112" rx="14" fill={N} />
      <rect x="70" y="40" width="70" height="8" rx="3" fill={D} />
      <rect x="72" y="56" width="66" height="66" rx="4" fill={L} />
      <rect x="80" y="64" width="22" height="22" rx="4" fill={G} />
      <rect x="108" y="64" width="22" height="22" rx="4" fill={W} />
      <rect x="80" y="92" width="22" height="22" rx="4" fill={W} />
      <rect x="108" y="92" width="22" height="22" rx="4" fill={S} />
      <rect x="94" y="130" width="22" height="5" rx="2.5" fill={D} />
    </g>
  ),
  kiosk: (
    <g>
      <rect x="64" y="10" width="72" height="116" rx="8" fill={N} />
      <rect x="71" y="18" width="58" height="86" rx="3" fill={L} />
      <rect x="77" y="24" width="46" height="18" rx="3" fill={G} />
      {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={77 + c * 25} y={48 + r * 26} width="21" height="22" rx="3" fill={W} />))}
      <rect x="86" y="110" width="28" height="6" rx="2" fill={D} />
      <rect x="92" y="126" width="16" height="16" fill={D} />
      <rect x="70" y="142" width="60" height="8" rx="4" fill={D} />
    </g>
  ),
  'cash-drawer': (
    <g>
      <path d="M34 66l20-20h92l20 20v52H34z" fill={N} />
      <path d="M54 46h92l20 20H34z" fill={D} />
      <rect x="28" y="96" width="144" height="34" rx="4" fill={N} stroke={D} strokeWidth="2" />
      <rect x="84" y="108" width="32" height="8" rx="4" fill={G} />
      <circle cx="150" cy="112" r="5" fill={S} />
      {[50, 72, 94, 116, 138].map((x) => <rect key={x} x={x} y="56" width="14" height="8" rx="2" fill="#3c8f5a" />)}
    </g>
  ),
  biometric: (
    <g>
      <rect x="56" y="16" width="88" height="128" rx="14" fill={N} />
      <rect x="66" y="28" width="68" height="48" rx="4" fill={L} />
      <rect x="72" y="34" width="34" height="5" rx="2" fill={S} />
      <rect x="72" y="44" width="50" height="5" rx="2" fill={S} />
      <rect x="72" y="62" width="24" height="7" rx="2" fill={G} />
      <rect x="80" y="88" width="40" height="42" rx="10" fill={D} />
      <g fill="none" stroke={G} strokeWidth="2" strokeLinecap="round">
        <path d="M92 118v-12a8 8 0 0 1 16 0v12" />
        <path d="M100 120v-14" />
        <path d="M87 114v-8a13 13 0 0 1 26 0v6" />
      </g>
    </g>
  ),
  'access-controller': (
    <g>
      <rect x="40" y="26" width="120" height="104" rx="8" fill={W} stroke={N} strokeWidth="3" />
      <rect x="40" y="26" width="120" height="24" rx="8" fill={N} />
      <rect x="40" y="42" width="120" height="8" fill={N} />
      {[58, 74, 90].map((x, i) => <circle key={x} cx={x} cy="38" r="4" fill={i === 0 ? '#7bd389' : i === 1 ? G : L} />)}
      <rect x="54" y="62" width="92" height="30" rx="4" fill={L} />
      <rect x="62" y="70" width="36" height="14" rx="2" fill={D} />
      <rect x="104" y="70" width="34" height="5" rx="2" fill={S} />
      <rect x="104" y="79" width="22" height="5" rx="2" fill={S} />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={52 + i * 10} y="104" width="7" height="14" rx="1.5" fill={i % 2 ? G : D} />)}
    </g>
  ),
  'em-lock': (
    <g>
      <rect x="28" y="54" width="120" height="34" rx="5" fill={N} />
      <rect x="34" y="60" width="108" height="22" rx="3" fill="#b7c2d6" />
      <rect x="34" y="68" width="108" height="6" fill={S} />
      <circle cx="132" cy="62" r="3" fill="#ff5a5a" />
      <rect x="40" y="100" width="96" height="22" rx="4" fill="#b7c2d6" stroke={N} strokeWidth="2" />
      <path d="M150 66h20v40h-20" fill="none" stroke={G} strokeWidth="4" />
      <path d="M88 92v4M76 92v4M100 92v4" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  'eas-gate': (
    <g>
      {[50, 120].map((x) => (
        <g key={x}>
          <rect x={x} y="18" width="30" height="120" rx="15" fill={W} stroke={N} strokeWidth="3" />
          <rect x={x + 8} y="30" width="14" height="96" rx="7" fill="none" stroke={S} strokeWidth="2" />
          <rect x={x - 4} y="136" width="38" height="8" rx="3" fill={D} />
        </g>
      ))}
      <circle cx="65" cy="30" r="4" fill={G} />
      <circle cx="135" cy="30" r="4" fill={G} />
      <path d="M86 70c8 6 20 6 28 0M86 86c8 6 20 6 28 0" fill="none" stroke={G} strokeWidth="2.5" strokeDasharray="3 3" />
    </g>
  ),
  'boom-barrier': (
    <g>
      <rect x="22" y="58" width="36" height="84" rx="4" fill={N} />
      <rect x="28" y="66" width="24" height="12" rx="2" fill={D} />
      <circle cx="40" cy="100" r="5" fill={G} />
      <rect x="16" y="140" width="48" height="6" rx="2" fill={D} />
      <g transform="rotate(-6 50 64)">
        <rect x="50" y="58" width="134" height="12" rx="6" fill={W} stroke={N} strokeWidth="2" />
        {[66, 98, 130, 162].map((x) => <rect key={x} x={x} y="59" width="16" height="10" fill="#e5484d" />)}
      </g>
      <circle cx="44" cy="64" r="8" fill={D} />
    </g>
  ),
  turnstile: (
    <g>
      <rect x="58" y="40" width="84" height="104" rx="10" fill={N} />
      <rect x="64" y="40" width="72" height="16" rx="6" fill={D} />
      <rect x="72" y="62" width="20" height="14" rx="3" fill={L} />
      <circle cx="82" cy="69" r="3" fill="#7bd389" />
      <circle cx="120" cy="92" r="10" fill={S} stroke={D} strokeWidth="2" />
      <path d="M120 92l50-6M120 92l34 30M120 92l40-38" stroke="#b7c2d6" strokeWidth="7" strokeLinecap="round" />
      <circle cx="120" cy="92" r="4" fill={G} />
    </g>
  ),
  shredder: (
    <g>
      <rect x="82" y="8" width="36" height="38" fill={W} stroke={S} strokeWidth="1.5" />
      {[16, 23, 30].map((y) => <rect key={y} x="88" y={y} width="24" height="3" rx="1.5" fill={L} />)}
      <rect x="44" y="40" width="112" height="26" rx="6" fill={N} />
      <rect x="74" y="46" width="52" height="5" rx="2.5" fill={D} />
      <circle cx="140" cy="53" r="4" fill={G} />
      <path d="M50 66h100l-8 78H58z" fill={D} />
      <rect x="70" y="80" width="60" height="44" rx="4" fill="#33507f" />
      {[78, 88, 98, 108, 118].map((x) => <path key={x} d={`M${x} 84v34`} stroke={L} strokeWidth="2" strokeDasharray="5 3" />)}
    </g>
  ),
  'note-counter': (
    <g>
      <path d="M40 74c0-10 8-18 18-18h84c10 0 18 8 18 18v52H40z" fill={N} />
      <rect x="40" y="118" width="120" height="16" rx="5" fill={D} />
      <rect x="58" y="34" width="84" height="26" rx="3" fill="#9fd3a3" stroke="#3c8f5a" strokeWidth="1.5" transform="rotate(-8 100 47)" />
      <circle cx="100" cy="47" r="7" fill="none" stroke="#3c8f5a" strokeWidth="1.5" />
      <rect x="54" y="74" width="54" height="22" rx="3" fill={D} />
      <text x="81" y="90" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="700" fontSize="15" fill={G}>0500</text>
      <circle cx="126" cy="80" r="5" fill={G} />
      <circle cx="142" cy="80" r="5" fill={S} />
      <rect x="64" y="104" width="72" height="6" rx="3" fill={D} />
    </g>
  ),
  laminator: (
    <g>
      <rect x="62" y="22" width="76" height="52" fill={W} stroke={S} strokeWidth="1.5" />
      <rect x="70" y="30" width="30" height="20" rx="2" fill={L} />
      <rect x="106" y="32" width="24" height="4" rx="2" fill={S} />
      <rect x="106" y="40" width="18" height="4" rx="2" fill={S} />
      <rect x="28" y="70" width="144" height="40" rx="18" fill={N} />
      <rect x="44" y="70" width="112" height="8" rx="3" fill={D} />
      <circle cx="146" cy="92" r="5" fill={G} />
      <circle cx="130" cy="92" r="5" fill="#ff5a5a" />
      <rect x="52" y="104" width="96" height="8" rx="3" fill={D} />
    </g>
  ),
  locker: (
    <g>
      <rect x="44" y="18" width="112" height="124" rx="8" fill={N} />
      <rect x="54" y="28" width="92" height="104" rx="5" fill={D} />
      <rect x="66" y="44" width="34" height="44" rx="4" fill={L} />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={70 + c * 10} y={50 + r * 11} width="7" height="7" rx="1.5" fill={N} />))}
      <circle cx="124" cy="70" r="14" fill="#b7c2d6" stroke={G} strokeWidth="3" />
      <path d="M124 60v10l7 5" stroke={N} strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="138" y="58" width="6" height="26" rx="3" fill={G} />
    </g>
  ),
  iot: (
    <g>
      <path d="M68 46l-8-30M132 46l8-30" stroke={D} strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="14" r="5" fill={G} />
      <circle cx="140" cy="14" r="5" fill={G} />
      <rect x="40" y="44" width="120" height="84" rx="12" fill={N} />
      {Array.from({ length: 7 }, (_, i) => <rect key={i} x={52 + i * 14} y="54" width="8" height="34" rx="2" fill={D} />)}
      <circle cx="58" cy="108" r="4" fill="#7bd389" />
      <circle cx="72" cy="108" r="4" fill={G} />
      {[100, 116, 132].map((x) => <rect key={x} x={x} y="102" width="12" height="12" rx="2" fill={L} />)}
    </g>
  ),
  device: (
    <g>
      <rect x="40" y="36" width="120" height="92" rx="12" fill={N} />
      <rect x="52" y="48" width="96" height="44" rx="4" fill={L} />
      <rect x="60" y="56" width="44" height="6" rx="3" fill={S} />
      <rect x="60" y="68" width="62" height="6" rx="3" fill={S} />
      <circle cx="64" cy="110" r="6" fill={G} />
      <rect x="80" y="104" width="64" height="12" rx="6" fill={D} />
    </g>
  ),
}

export default function Illustration({ product }) {
  const kind = illustrationFor(product)
  const spec = illustrationSpec(product)
  return (
    <div
      className="@container relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#f7f9fc] to-[#eef2f8]"
      role="img"
      aria-label={`${product.name}: illustration, photo coming soon`}
      data-illustration={kind}
    >
      <svg viewBox="0 0 200 160" className="h-[72%] w-[80%] max-w-[340px]" aria-hidden="true" focusable="false">
        <circle cx="100" cy="82" r="70" fill="#e3e9f4" />
        {ART[kind] || ART.device}
      </svg>
      {spec && (
        <p className="absolute inset-x-2 bottom-[7%] hidden justify-center @[150px]:flex">
          <span className="max-w-full truncate rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-primary shadow-sm ring-1 ring-[#dfe6f3] @[320px]:text-xs">{spec}</span>
        </p>
      )}
      <span className="absolute right-2 top-2 hidden rounded bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#7e818c] @[150px]:block">
        Illustration
      </span>
    </div>
  )
}
