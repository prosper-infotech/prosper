import { useLayoutEffect, useRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { ScanEye, Boxes, DoorOpen, Warehouse, Truck } from 'lucide-react'

extend({ RoundedBoxGeometry })

const LOOP = 14
const ROAD_X0 = -13
const ROAD_X1 = 13
const NAVY = '#14346d'
const NAVY_LIGHT = '#2a5bb0'
const GOLD = '#f7dd00'
const GOLD_DARK = '#e6b800'
const BLUE = '#2f6fd1'
const RED = '#e5484d'
const WHITE = '#f6f8fc'
const CREAM = '#fff1bf'
const GLASS = '#86b6ea'

const STATIONS = [
  { key: 'gate', x: -8, label: 'Gate', icon: ScanEye },
  { key: 'yard', x: -4, label: 'Yard', icon: Boxes },
  { key: 'dock', x: 0, label: 'Dock', icon: DoorOpen },
  { key: 'warehouse', x: 4, label: 'Warehouse', icon: Warehouse },
  { key: 'fleet', x: 8, label: 'Fleet', icon: Truck },
].map((s) => ({ ...s, at: ((s.x - ROAD_X0) / (ROAD_X1 - ROAD_X0)) * LOOP }))

const truckX = (t) => ROAD_X0 + (ROAD_X1 - ROAD_X0) * ((t % LOOP) / LOOP)
const smooth = (v) => v * v * (3 - 2 * v)
const near = (t, sx) => smooth(Math.max(0, Math.min(1, 1 - Math.abs(truckX(t) - sx) / 2.4)))

// Rounded box: softly bevelled edges catch light the way real sheet-metal and moulded parts do.
function Box({ p = [0, 0, 0], s = [1, 1, 1], c = WHITE, r, rad, o = 1, metal = 0.05, rough = 0.5, gloss = 0, shadow = true, emissive, ei = 0, children, ...rest }) {
  const radius = rad ?? Math.min(0.09, Math.min(...s) / 3)
  return (
    <mesh position={p} rotation={r} castShadow={shadow} receiveShadow {...rest}>
      <roundedBoxGeometry args={[s[0], s[1], s[2], 3, radius]} />
      {gloss ? (
        <meshPhysicalMaterial color={c} metalness={metal} roughness={rough} clearcoat={gloss} clearcoatRoughness={0.15} transparent={o < 1} opacity={o} emissive={emissive} emissiveIntensity={ei} />
      ) : (
        <meshStandardMaterial color={c} metalness={metal} roughness={rough} transparent={o < 1} opacity={o} emissive={emissive} emissiveIntensity={ei} />
      )}
      {children}
    </mesh>
  )
}

function Cyl({ p, r = [0, 0, 0], a = [0.2, 0.2, 1, 20], c = NAVY, metal = 0.2, rough = 0.5, shadow = true }) {
  return (
    <mesh position={p} rotation={r} castShadow={shadow} receiveShadow>
      <cylinderGeometry args={a} />
      <meshStandardMaterial color={c} metalness={metal} roughness={rough} />
    </mesh>
  )
}

function Ball({ p, r = 0.2, c = GOLD, emissive, ei = 0, seg = 20, metal = 0.1, rough = 0.4 }) {
  return (
    <mesh position={p} castShadow>
      <sphereGeometry args={[r, seg, seg]} />
      <meshStandardMaterial color={c} emissive={emissive} emissiveIntensity={ei} metalness={metal} roughness={rough} toneMapped={!emissive} />
    </mesh>
  )
}

// A shipping container with corrugated side walls and door end.
function Container({ p, c = BLUE, s = [1.7, 0.7, 0.7] }) {
  const ridges = Math.round(s[0] / 0.13)
  return (
    <group position={p}>
      <Box s={s} c={c} rad={0.03} gloss={0.4} rough={0.45} metal={0.15} />
      {Array.from({ length: ridges }, (_, i) => {
        const x = -s[0] / 2 + 0.12 + (i * (s[0] - 0.24)) / (ridges - 1)
        return (
          <group key={i}>
            <Box p={[x, 0, s[2] / 2 + 0.012]} s={[0.04, s[1] - 0.12, 0.025]} c={c} rad={0.008} shadow={false} rough={0.5} />
            <Box p={[x, 0, -s[2] / 2 - 0.012]} s={[0.04, s[1] - 0.12, 0.025]} c={c} rad={0.008} shadow={false} rough={0.5} />
          </group>
        )
      })}
      <Box p={[s[0] / 2 - 0.02, 0, 0]} s={[0.05, s[1] - 0.08, s[2] - 0.08]} c="#0e2a5c" rad={0.01} shadow={false} metal={0.4} />
    </group>
  )
}

function Wheel({ p, spin, big }) {
  const ref = useRef()
  useFrame((_, d) => {
    if (spin && ref.current) ref.current.rotation.z -= d * 7
  })
  const R = big ? 0.42 : 0.36
  return (
    <group ref={ref} position={p}>
      <Cyl r={[Math.PI / 2, 0, 0]} a={[R, R, 0.32, 28]} c="#1a1d26" rough={0.9} metal={0} />
      <Cyl r={[Math.PI / 2, 0, 0]} a={[R * 0.6, R * 0.6, 0.34, 20]} c="#c9d2e3" metal={0.85} rough={0.25} shadow={false} />
      <Cyl r={[Math.PI / 2, 0, 0]} a={[R * 0.22, R * 0.22, 0.36, 12]} c={NAVY} shadow={false} />
    </group>
  )
}

function TruckModel({ animate }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.x = animate ? truckX(clock.elapsedTime) : 0
  })
  return (
    <group ref={ref} position={[0, 0.58, 2.35]}>
      <Box p={[0.1, 0.05, 0]} s={[5.4, 0.22, 1.1]} c="#1b2236" rad={0.04} metal={0.5} rough={0.5} />
      <Box p={[-1.0, 1.1, 0]} s={[3.3, 1.75, 1.5]} c={WHITE} rad={0.07} gloss={0.5} rough={0.35} metal={0.05} />
      {[-2.3, -1.7, -1.1, -0.5, 0.1, 0.5].map((x) => (
        <Box key={x} p={[x, 1.1, 0.77]} s={[0.04, 1.6, 0.03]} c="#d6dde9" rad={0.01} shadow={false} />
      ))}
      <Box p={[-1.0, 0.82, 0.775]} s={[3.1, 0.3, 0.03]} c={GOLD} rad={0.01} shadow={false} gloss={0.6} />
      <Box p={[-1.0, 0.82, -0.775]} s={[3.1, 0.3, 0.03]} c={GOLD} rad={0.01} shadow={false} gloss={0.6} />
      <Box p={[-2.67, 1.05, 0]} s={[0.05, 1.5, 1.3]} c="#c4cddd" rad={0.015} shadow={false} metal={0.4} />
      <Box p={[-2.72, 0.35, 0]} s={[0.08, 0.14, 1.4]} c={RED} rad={0.02} emissive={RED} ei={0.7} shadow={false} />
      <Box p={[1.55, 0.78, 0]} s={[1.5, 1.3, 1.45]} c={GOLD} rad={0.16} gloss={0.9} rough={0.25} metal={0.25} />
      <Box p={[1.62, 1.55, 0]} s={[0.95, 0.42, 1.35]} c={GOLD} rad={0.12} gloss={0.9} rough={0.25} shadow={false} />
      <Box p={[2.18, 1.02, 0]} s={[0.07, 0.5, 1.28]} c={GLASS} rad={0.03} metal={0.9} rough={0.08} r={[0, 0, -0.18]} shadow={false} />
      <Box p={[1.62, 1.02, 0.745]} s={[0.78, 0.46, 0.03]} c={GLASS} rad={0.03} metal={0.9} rough={0.08} shadow={false} />
      <Box p={[1.62, 1.02, -0.745]} s={[0.78, 0.46, 0.03]} c={GLASS} rad={0.03} metal={0.9} rough={0.08} shadow={false} />
      <Box p={[2.3, 0.34, 0]} s={[0.2, 0.34, 1.35]} c="#2b3350" rad={0.05} metal={0.7} rough={0.3} />
      <Box p={[2.32, 0.34, 0]} s={[0.05, 0.22, 0.9]} c="#c9d2e3" rad={0.02} metal={0.9} rough={0.2} shadow={false} />
      {[-0.52, 0.52].map((z) => (
        <Ball key={z} p={[2.36, 0.62, z]} r={0.1} c="#fff6c2" emissive="#fff3a0" ei={1.6} seg={14} />
      ))}
      {[-0.72, 0.72].map((z) => (
        <Cyl key={z} p={[0.88, 1.45, z * 0.95]} a={[0.05, 0.05, 1.4, 10]} c="#c9d2e3" metal={0.9} rough={0.2} />
      ))}
      {[-2.15, -1.2].map((x) => (
        <group key={x}>
          <Wheel p={[x, -0.16, 0.74]} spin={animate} big />
          <Wheel p={[x, -0.16, -0.74]} spin={animate} big />
        </group>
      ))}
      <Wheel p={[1.6, -0.16, 0.74]} spin={animate} big />
      <Wheel p={[1.6, -0.16, -0.74]} spin={animate} big />
    </group>
  )
}

function Ring({ y, radius = 1.1, color = GOLD, animate }) {
  const ref = useRef()
  useFrame(({ clock }, d) => {
    const m = ref.current
    if (!m) return
    const k = animate ? near(clock.elapsedTime, m.parent.position.x) : 0
    m.material.opacity += (0.85 * k - m.material.opacity) * Math.min(1, d * 8)
    m.scale.setScalar(0.9 + 0.3 * k)
  })
  return (
    <mesh ref={ref} position={[0, y, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.06, 12, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0} toneMapped={false} />
    </mesh>
  )
}

function Gate({ animate }) {
  const arm = useRef()
  const beam = useRef()
  useFrame(({ clock }) => {
    const k = animate ? near(clock.elapsedTime, -8) : 0
    if (arm.current) arm.current.rotation.x = -k * 1.3
    if (beam.current) beam.current.material.opacity = 0.32 * k
  })
  return (
    <group position={[-8, 0, 0]}>
      <Box p={[-1.35, 0.9, 0.3]} s={[1.3, 1.8, 1.3]} c={WHITE} rad={0.1} gloss={0.3} />
      <Box p={[-1.35, 1.9, 0.3]} s={[1.65, 0.22, 1.65]} c={NAVY} rad={0.08} gloss={0.5} />
      <Box p={[-1.35, 1.12, 0.96]} s={[0.85, 0.55, 0.03]} c={GLASS} rad={0.03} metal={0.9} rough={0.06} shadow={false} />
      <Box p={[-1.35, 0.45, 0.96]} s={[0.5, 0.7, 0.03]} c={NAVY_LIGHT} rad={0.03} shadow={false} />
      <Cyl p={[0.95, 1.5, 0.3]} a={[0.07, 0.09, 3, 14]} c={NAVY} metal={0.5} rough={0.35} />
      <Box p={[0.95, 3.05, 0.3]} s={[0.62, 0.38, 0.6]} c={NAVY} rad={0.1} gloss={0.7} metal={0.4} />
      <Ball p={[0.95, 3.02, 0.62]} r={0.12} c={GOLD} emissive={GOLD} ei={1.4} seg={14} />
      <mesh ref={beam} position={[0.95, 1.5, 0.3]}>
        <coneGeometry args={[1.5, 3, 32, 1, true]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
      </mesh>
      <group position={[0.15, 1.05, 1.0]}>
        <Cyl p={[0, -0.5, 0]} a={[0.16, 0.2, 1, 16]} c={NAVY} metal={0.4} />
        <group ref={arm}>
          <Box p={[0, 0, 1.35]} s={[0.14, 0.14, 2.7]} c={WHITE} rad={0.05} gloss={0.5} />
          {[0.35, 1.05, 1.75, 2.45].map((z, i) => (
            <Box key={z} p={[0, 0, z]} s={[0.155, 0.155, 0.32]} c={i % 2 ? WHITE : RED} rad={0.04} shadow={false} />
          ))}
        </group>
      </group>
      <Ring y={0.08} animate={animate} />
    </group>
  )
}

function Yard({ animate }) {
  const trolley = useRef()
  const spreader = useRef()
  const pin = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (trolley.current) trolley.current.position.x = animate ? Math.sin(t * 0.45) * 0.55 : 0
    if (spreader.current) spreader.current.position.y = animate ? -0.75 - (Math.sin(t * 0.9) * 0.5 + 0.5) * 1.0 : -1.1
    if (pin.current) pin.current.position.y = 4.35 + (animate ? Math.sin(t * 2) * 0.16 : 0)
  })
  return (
    <group position={[-4, 0, 0]}>
      <Container p={[-0.55, 0.36, -0.15]} c={BLUE} s={[1.5, 0.7, 0.66]} />
      <Container p={[0.65, 0.36, -0.15]} c={GOLD_DARK} s={[1.5, 0.7, 0.66]} />
      <Container p={[-0.05, 1.08, -0.15]} c={RED} s={[1.5, 0.7, 0.66]} />
      <Container p={[0.9, 1.08, -0.15]} c={NAVY_LIGHT} s={[1.1, 0.7, 0.66]} />
      {[-1.55, 1.55].flatMap((x) => [-0.78, 0.78].map((z) => (
        <Box key={`${x}${z}`} p={[x, 1.7, z]} s={[0.12, 3.4, 0.12]} c={NAVY} rad={0.04} metal={0.5} rough={0.35} />
      )))}
      {[-0.78, 0.78].map((z) => (
        <Box key={z} p={[0, 3.4, z]} s={[3.45, 0.24, 0.24]} c={NAVY} rad={0.06} metal={0.5} rough={0.35} />
      ))}
      <Box p={[-1.55, 2.0, 0]} s={[0.12, 0.12, 1.4]} c={NAVY} rad={0.04} shadow={false} />
      <Box p={[1.55, 2.0, 0]} s={[0.12, 0.12, 1.4]} c={NAVY} rad={0.04} shadow={false} />
      <group ref={trolley} position={[0, 3.4, 0]}>
        <Box p={[0, 0.02, 0]} s={[0.7, 0.28, 1.0]} c={GOLD} rad={0.07} gloss={0.8} />
        <group ref={spreader} position={[0, -0.75, 0]}>
          <Cyl p={[0, 0.5, 0.25]} a={[0.02, 0.02, 1.4, 6]} c="#222" shadow={false} />
          <Cyl p={[0, 0.5, -0.25]} a={[0.02, 0.02, 1.4, 6]} c="#222" shadow={false} />
          <Box p={[0, 0.38, 0]} s={[1.2, 0.1, 0.5]} c={NAVY} rad={0.03} metal={0.5} />
          <Container p={[0, 0, 0]} c={GOLD} s={[1.1, 0.7, 0.66]} />
        </group>
      </group>
      <group ref={pin} position={[0, 4.35, 0]}>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.27, 0]} castShadow>
          <coneGeometry args={[0.27, 0.6, 24]} />
          <meshStandardMaterial color={GOLD} metalness={0.2} roughness={0.3} />
        </mesh>
        <Ball p={[0, 0.14, 0]} r={0.33} c={GOLD} metal={0.2} rough={0.3} />
        <Ball p={[0, 0.14, 0.3]} r={0.12} c={NAVY} seg={12} />
      </group>
      <Ring y={0.08} radius={1.7} animate={animate} />
    </group>
  )
}

function Dock({ animate }) {
  const doors = useRef([])
  const eye = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    doors.current.forEach((d, i) => {
      if (!d) return
      const open = animate ? Math.max(0, Math.sin(t * 0.8 + i * 1.4)) * 0.85 : 0
      const h = 1.2 * (1 - open)
      d.scale.y = Math.max(0.12, 1 - open)
      d.position.y = 1.4 - h / 2
    })
    if (eye.current) eye.current.rotation.y = animate ? Math.sin(t * 1.2) * 0.6 : 0
  })
  return (
    <group position={[0, 0, -0.2]}>
      <Box p={[0, 1.0, 0]} s={[3.5, 2.0, 1.8]} c={WHITE} rad={0.1} gloss={0.3} />
      <Box p={[0, 2.12, 0.05]} s={[3.85, 0.24, 2.05]} c={NAVY} rad={0.09} gloss={0.5} />
      <Box p={[0, 1.62, 0.93]} s={[3.5, 0.16, 0.06]} c={GOLD} rad={0.02} shadow={false} gloss={0.5} />
      {[-1.1, 0, 1.1].map((x, i) => (
        <group key={x}>
          <Box p={[x, 0.65, 0.9]} s={[0.92, 1.28, 0.05]} c="#dfe7f4" rad={0.02} shadow={false} />
          <Box p={[x, 0.1, 1.25]} s={[0.92, 0.1, 0.7]} c="#9aa6bd" rad={0.03} rough={0.6} />
          <mesh ref={(el) => (doors.current[i] = el)} position={[x, 0.8, 0.95]} castShadow>
            <roundedBoxGeometry args={[0.88, 1.2, 0.06, 2, 0.02]} />
            <meshStandardMaterial color={NAVY_LIGHT} metalness={0.5} roughness={0.35} />
          </mesh>
        </group>
      ))}
      <group ref={eye} position={[0, 2.78, 0.2]}>
        <Box s={[0.78, 0.52, 0.52]} c={NAVY} rad={0.12} gloss={0.7} metal={0.4} />
        <Ball p={[0, 0, 0.29]} r={0.17} c={GOLD} emissive={GOLD} ei={1.5} seg={16} />
      </group>
      <Ring y={0.08} radius={2} animate={animate} />
    </group>
  )
}

function Waves({ animate }) {
  const rings = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    rings.current.forEach((m, i) => {
      if (!m) return
      const k = animate ? (t * 0.5 + i / 3) % 1 : 0.3
      m.scale.setScalar(0.4 + k * 2.4)
      m.material.opacity = animate ? (1 - k) * 0.8 : 0
    })
  })
  return (
    <group position={[0, 3.2, 0.3]}>
      <Ball p={[0, 0, 0]} r={0.17} c={NAVY} seg={16} />
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.035, 10, 48]} />
          <meshBasicMaterial color={GOLD_DARK} transparent opacity={0} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function WarehouseStation({ animate }) {
  const fork = useRef()
  useFrame(({ clock }) => {
    if (fork.current) fork.current.position.x = animate ? Math.sin(clock.elapsedTime * 0.8) * 1.05 : 0
  })
  const crates = [
    [-1.2, 0.34, BLUE], [-0.6, 0.34, GOLD_DARK], [0.6, 0.34, BLUE], [1.2, 0.34, RED],
    [-1.2, 0.92, RED], [-0.6, 0.92, BLUE], [0.6, 0.92, GOLD_DARK], [1.2, 0.92, BLUE],
  ]
  return (
    <group position={[4, 0, -0.2]}>
      <Box p={[0, 1.0, 0]} s={[3.7, 2.0, 1.95]} c={CREAM} rad={0.1} gloss={0.25} />
      <Box p={[0, 2.1, 0]} s={[4.0, 0.22, 2.2]} c={GOLD_DARK} rad={0.09} gloss={0.6} />
      {[-1.3, -0.45, 0.45, 1.3].map((x) => (
        <Box key={x} p={[x, 2.28, 0]} s={[0.55, 0.16, 2.0]} c={GOLD} rad={0.06} gloss={0.6} shadow={false} />
      ))}
      <Box p={[0, 1.0, 1.0]} s={[3.3, 1.7, 0.05]} c="#e9eff9" rad={0.02} shadow={false} />
      {[-1.65, 0, 1.65].map((x) => (
        <Box key={x} p={[x, 1.0, 1.02]} s={[0.06, 1.7, 0.06]} c={NAVY} rad={0.02} shadow={false} />
      ))}
      {crates.map(([x, y, c], i) => (
        <Box key={i} p={[x, y, 0.85]} s={[0.5, 0.5, 0.5]} c={c} rad={0.06} gloss={0.4} rough={0.5} />
      ))}
      <group ref={fork} position={[0, 0, 1.6]}>
        <Box p={[0, 0.5, 0]} s={[0.9, 0.5, 0.55]} c={GOLD} rad={0.1} gloss={0.9} />
        <Box p={[-0.1, 0.92, 0]} s={[0.55, 0.4, 0.5]} c={NAVY_LIGHT} rad={0.08} metal={0.5} />
        <Box p={[0.55, 0.78, 0]} s={[0.08, 1.2, 0.45]} c={NAVY} rad={0.03} metal={0.5} />
        <Box p={[0.8, 0.26, 0.14]} s={[0.46, 0.07, 0.08]} c="#9aa6bd" rad={0.02} metal={0.8} shadow={false} />
        <Box p={[0.8, 0.26, -0.14]} s={[0.46, 0.07, 0.08]} c="#9aa6bd" rad={0.02} metal={0.8} shadow={false} />
        {[-0.28, 0.28].map((x) => (
          <Cyl key={x} p={[x, 0.17, 0.29]} r={[Math.PI / 2, 0, 0]} a={[0.19, 0.19, 0.12, 16]} c="#1a1d26" rough={0.9} metal={0} />
        ))}
      </group>
      <Waves animate={animate} />
      <Ring y={0.08} radius={2.1} animate={animate} />
    </group>
  )
}

function Fleet({ animate }) {
  const bars = useRef([])
  const pin = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    bars.current.forEach((b, i) => {
      if (!b) return
      const h = animate ? 0.3 + (Math.sin(t * 1.6 + i * 0.9) * 0.5 + 0.5) * 0.7 : 0.7
      b.scale.y = h
      b.position.y = -0.5 + (0.8 * h) / 2
    })
    if (pin.current) pin.current.position.y = 0.6 + (animate ? Math.sin(t * 2.2) * 0.12 : 0)
  })
  return (
    <group position={[8, 0, -0.2]}>
      <Cyl p={[0, 0.95, 0]} a={[0.08, 0.1, 1.9, 14]} c={NAVY} metal={0.5} rough={0.35} />
      <group position={[0, 2.6, 0]} rotation={[0, -0.22, 0]}>
        <Box s={[3.1, 2.0, 0.16]} c={NAVY} rad={0.08} gloss={0.6} metal={0.3} />
        <Box p={[0, 0, 0.09]} s={[2.9, 1.8, 0.03]} c="#f4f7fd" rad={0.04} shadow={false} />
        <Box p={[0, 0.72, 0.115]} s={[2.6, 0.12, 0.02]} c={NAVY} rad={0.02} shadow={false} />
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} ref={(el) => (bars.current[i] = el)} position={[-1 + i * 0.5, -0.1, 0.13]} castShadow>
            <roundedBoxGeometry args={[0.3, 0.8, 0.07, 2, 0.03]} />
            <meshStandardMaterial color={i % 2 ? GOLD_DARK : BLUE} metalness={0.1} roughness={0.4} />
          </mesh>
        ))}
        <Ball p={[1.25, 0.72, 0.13]} r={0.07} c={RED} emissive={RED} ei={1.2} seg={10} />
      </group>
      <group ref={pin} position={[0, 0.6, 1.1]}>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.25, 0]} castShadow>
          <coneGeometry args={[0.25, 0.55, 24]} />
          <meshStandardMaterial color={RED} metalness={0.2} roughness={0.3} />
        </mesh>
        <Ball p={[0, 0.12, 0]} r={0.3} c={RED} metal={0.2} rough={0.3} />
        <Ball p={[0, 0.12, 0.26]} r={0.11} c={WHITE} seg={12} />
      </group>
      <Ring y={0.08} radius={1.6} animate={animate} />
    </group>
  )
}

function PlatformLinks({ animate }) {
  const packets = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    packets.current.forEach((m, i) => {
      if (!m) return
      const k = animate ? (t * 0.45 + i * 0.23) % 1 : 0.5
      m.position.y = 5.1 - k * 2.4
    })
  })
  return (
    <group>
      <Box p={[0, 5.55, -0.4]} s={[18.2, 0.6, 0.95]} c={NAVY} rad={0.26} gloss={0.9} rough={0.2} metal={0.3} />
      <Ball p={[-8.3, 5.55, 0.1]} r={0.13} c={GOLD} emissive={GOLD} ei={1.6} seg={14} />
      <Box p={[-6.4, 5.55, 0.1]} s={[3.2, 0.15, 0.04]} c="#fff" rad={0.06} shadow={false} />
      <Box p={[-3.9, 5.55, 0.1]} s={[1.6, 0.15, 0.04]} c="#9fb4da" rad={0.06} shadow={false} />
      {STATIONS.map((s, i) => (
        <group key={s.key} position={[s.x, 0, -0.4]}>
          <mesh position={[0, 3.9, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 3.3, 8]} />
            <meshBasicMaterial color={NAVY} transparent opacity={0.3} />
          </mesh>
          <mesh ref={(el) => (packets.current[i] = el)} position={[0, 5.1, 0.1]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Tree({ p, s = 1 }) {
  return (
    <group position={p} scale={s}>
      <Cyl p={[0, 0.3, 0]} a={[0.07, 0.1, 0.6, 8]} c="#7a5230" metal={0} rough={0.9} />
      <mesh position={[0, 0.95, 0]} castShadow>
        <icosahedronGeometry args={[0.46, 1]} />
        <meshStandardMaterial color="#5fb36a" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0.14, 1.28, 0.05]} castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#79c97f" roughness={0.8} flatShading />
      </mesh>
    </group>
  )
}

function Lamp({ p }) {
  return (
    <group position={p}>
      <Cyl p={[0, 0.8, 0]} a={[0.04, 0.05, 1.6, 10]} c={NAVY} metal={0.6} rough={0.3} />
      <Box p={[0.18, 1.62, 0]} s={[0.4, 0.06, 0.12]} c={NAVY} rad={0.02} shadow={false} />
      <Ball p={[0.34, 1.57, 0]} r={0.07} c="#fff6c2" emissive="#fff3a0" ei={2} seg={10} />
    </group>
  )
}

function World({ animate }) {
  const dashes = useRef()
  useFrame(({ clock }) => {
    if (dashes.current && animate) dashes.current.position.x = -((clock.elapsedTime * 3.2) % 1.6)
  })
  return (
    <group>
      <Box p={[0, -0.3, 0.4]} s={[27.2, 0.6, 8.8]} c={CREAM} rad={0.28} rough={0.8} shadow={false} />
      <Box p={[0, -0.72, 0.4]} s={[27.6, 0.3, 9.2]} c={NAVY_LIGHT} rad={0.16} gloss={0.6} rough={0.4} shadow={false} />
      {Array.from({ length: 13 }, (_, i) => (
        <Box key={i} p={[-12 + i * 2, 0.005, -1.7]} s={[0.025, 0.01, 2.6]} c="#ead9a0" rad={0.004} shadow={false} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.4]} receiveShadow>
        <planeGeometry args={[27, 8.6]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      <Box p={[0, 0.02, 2.35]} s={[26.4, 0.1, 2.0]} c="#1c2c52" rad={0.04} rough={0.85} metal={0} />
      <Box p={[0, 0.07, 3.38]} s={[26.4, 0.04, 0.07]} c="#e9edf5" rad={0.01} shadow={false} />
      <Box p={[0, 0.07, 1.32]} s={[26.4, 0.04, 0.07]} c="#e9edf5" rad={0.01} shadow={false} />
      <group ref={dashes} position={[0, 0.075, 2.35]}>
        {Array.from({ length: 26 }, (_, i) => (
          <Box key={i} p={[-18 + i * 1.6, 0, 0]} s={[0.8, 0.02, 0.12]} c={GOLD} rad={0.008} shadow={false} />
        ))}
      </group>
      {[-10, -5.5, 5.5, 10].map((x, i) => (
        <Lamp key={x} p={[x, 0.07, 3.6 + (i % 2) * 0.1]} />
      ))}
      <Tree p={[-11.8, 0, -1.2]} s={1.1} />
      <Tree p={[-10.7, 0, -2.3]} s={0.8} />
      <Tree p={[11.8, 0, -1.4]} s={1.15} />
      <Tree p={[10.8, 0, -2.4]} s={0.85} />
      <Tree p={[-6, 0, -2.8]} s={0.7} />
      <Tree p={[6, 0, -2.9]} s={0.75} />
      <Gate animate={animate} />
      <Yard animate={animate} />
      <Dock animate={animate} />
      <WarehouseStation animate={animate} />
      <Fleet animate={animate} />
      <PlatformLinks animate={animate} />
      <TruckModel animate={animate} />
    </group>
  )
}

// Soft studio-style reflections so glossy paint, glass and metal read as real materials.
function Environment() {
  const { gl, scene } = useThree()
  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.85
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

function CameraRig() {
  const { camera, pointer } = useThree()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    camera.position.x += (pointer.x * 3 + Math.sin(t * 0.22) * 1.2 - camera.position.x) * 0.04
    camera.position.y += (8.2 + pointer.y * 0.9 - camera.position.y) * 0.04
    camera.lookAt(0, 1.7, 0.4)
  })
  return null
}

function StationChips({ reduce }) {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-2.5 sm:gap-3">
      {STATIONS.map((s) => (
        <span
          key={s.key}
          className={`inline-flex items-center gap-2 rounded-full border border-gold-dark/30 bg-white px-3.5 py-2 text-sm font-bold text-primary shadow-sm ${reduce ? '' : 'lf-chip'}`}
          style={reduce ? undefined : { animationDelay: `${Math.max(s.at - 0.5, 0)}s` }}
        >
          <s.icon className="h-4 w-4 text-gold-dark" />
          {s.label}
        </span>
      ))}
    </div>
  )
}

export default function Logistics3D() {
  const reduce = useReducedMotion()
  const animate = !reduce

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-[16/8] w-full sm:aspect-[16/7]">
        <Canvas
          shadows="soft"
          dpr={[1, 2]}
          camera={{ position: [0, 8.2, 20.5], fov: 30, near: 0.5, far: 90 }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          aria-label="Interactive 3D logistics scene: a truck moves through gate, yard, dock, warehouse and fleet stations, linked to the Prosper AI platform"
        >
          <fog attach="fog" args={['#fff8dc', 38, 70]} />
          <ambientLight intensity={0.35} />
          <hemisphereLight args={['#ffffff', '#ffe9a6', 0.6]} />
          <directionalLight
            position={[9, 15, 10]}
            intensity={2.6}
            color="#fff4dc"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-radius={5}
            shadow-camera-left={-16}
            shadow-camera-right={16}
            shadow-camera-top={9}
            shadow-camera-bottom={-6}
            shadow-bias={-0.0003}
          />
          <directionalLight position={[-10, 6, 6]} intensity={0.7} color="#cfe0ff" />
          <Environment />
          <CameraRig />
          <World animate={animate} />
        </Canvas>
      </div>
      <StationChips reduce={reduce} />
    </div>
  )
}
