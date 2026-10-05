import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { ScanEye, Boxes, DoorOpen, Warehouse, Truck } from 'lucide-react'

const LOOP = 14
const ROAD_X0 = -13
const ROAD_X1 = 13
const NAVY = '#14346d'
const NAVY_LIGHT = '#1f4a96'
const GOLD = '#f7dd00'
const GOLD_DARK = '#e0c700'
const BLUE = '#2f6fd1'
const RED = '#e5484d'
const WHITE = '#ffffff'
const CREAM = '#fff4c9'

const STATIONS = [
  { key: 'gate', x: -8, label: 'Gate', icon: ScanEye },
  { key: 'yard', x: -4, label: 'Yard', icon: Boxes },
  { key: 'dock', x: 0, label: 'Dock', icon: DoorOpen },
  { key: 'warehouse', x: 4, label: 'Warehouse', icon: Warehouse },
  { key: 'fleet', x: 8, label: 'Fleet', icon: Truck },
].map((s) => ({ ...s, at: ((s.x - ROAD_X0) / (ROAD_X1 - ROAD_X0)) * LOOP }))

const truckX = (t) => ROAD_X0 + (ROAD_X1 - ROAD_X0) * ((t % LOOP) / LOOP)
const smooth = (v) => v * v * (3 - 2 * v)
// 0..1: how close the truck is to a station (1 when passing it)
const near = (t, sx) => smooth(Math.max(0, Math.min(1, 1 - Math.abs(truckX(t) - sx) / 2.4)))

function Box({ p = [0, 0, 0], s = [1, 1, 1], c = WHITE, r, o = 1, shadow = true, children, ...rest }) {
  return (
    <mesh position={p} rotation={r} castShadow={shadow} receiveShadow {...rest}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} flatShading transparent={o < 1} opacity={o} roughness={0.7} />
      {children}
    </mesh>
  )
}

function Wheel({ p, spin }) {
  const ref = useRef()
  useFrame((_, d) => {
    if (spin && ref.current) ref.current.rotation.z -= d * 7
  })
  return (
    <group ref={ref} position={p}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.3, 14]} />
        <meshStandardMaterial color={NAVY} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.32, 10]} />
        <meshStandardMaterial color={WHITE} flatShading />
      </mesh>
    </group>
  )
}

function TruckModel({ animate }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.x = animate ? truckX(clock.elapsedTime) : 0
  })
  return (
    <group ref={ref} position={[0, 0.5, 2.3]}>
      <Box p={[-0.9, 0.95, 0]} s={[3, 1.6, 1.45]} c={WHITE} />
      <Box p={[-0.9, 0.9, 0.74]} s={[2.6, 0.22, 0.04]} c={GOLD} shadow={false} />
      <Box p={[-0.9, 0.9, -0.74]} s={[2.6, 0.22, 0.04]} c={GOLD} shadow={false} />
      <Box p={[1.1, 0.7, 0]} s={[1.3, 1.2, 1.4]} c={GOLD} />
      <Box p={[1.45, 1.02, 0]} s={[0.55, 0.5, 1.3]} c="#cfe6ff" shadow={false} />
      <Box p={[1.78, 0.35, 0]} s={[0.12, 0.2, 1.3]} c={NAVY} shadow={false} />
      <Box p={[0.1, 0.1, 0]} s={[4.9, 0.18, 1.2]} c={NAVY} shadow={false} />
      {[-1.9, -0.9, 1.2].map((x) => (
        <group key={x}>
          <Wheel p={[x, 0, 0.72]} spin={animate} />
          <Wheel p={[x, 0, -0.72]} spin={animate} />
        </group>
      ))}
    </group>
  )
}

function Ring({ sx, y, radius = 1.1, color = GOLD_DARK, animate }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const k = animate ? near(clock.elapsedTime, sx) : 0
    ref.current.material.opacity = 0.75 * k
    ref.current.scale.setScalar(0.85 + 0.35 * k)
  })
  return (
    <mesh ref={ref} position={[sx, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.07, 8, 40]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  )
}

function Gate({ animate }) {
  const arm = useRef()
  const beam = useRef()
  useFrame(({ clock }) => {
    const k = animate ? near(clock.elapsedTime, -8) : 0
    if (arm.current) arm.current.rotation.x = -k * 1.25
    if (beam.current) beam.current.material.opacity = 0.35 * k
  })
  return (
    <group position={[-8, 0, 0]}>
      <Box p={[-1.3, 0.85, 0.2]} s={[1.3, 1.7, 1.3]} c={WHITE} />
      <Box p={[-1.3, 1.8, 0.2]} s={[1.6, 0.2, 1.6]} c={NAVY} />
      <Box p={[-1.3, 1.05, 0.88]} s={[0.8, 0.5, 0.04]} c="#cfe6ff" shadow={false} />
      <Box p={[0.9, 1.4, 0.2]} s={[0.14, 2.8, 0.14]} c={NAVY} />
      <Box p={[0.9, 2.85, 0.2]} s={[0.5, 0.34, 0.5]} c={NAVY} />
      <mesh ref={beam} position={[0.9, 1.35, 0.2]}>
        <coneGeometry args={[1.5, 2.6, 24, 1, true]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0} side={2} depthWrite={false} />
      </mesh>
      <group position={[0.1, 0.95, 1.0]}>
        <group ref={arm}>
          <Box p={[0, 0, 1.3]} s={[0.14, 0.14, 2.6]} c={WHITE} />
          {[0.4, 1.3, 2.2].map((z) => (
            <Box key={z} p={[0, 0, z]} s={[0.16, 0.16, 0.34]} c={RED} shadow={false} />
          ))}
        </group>
        <Box p={[0, -0.45, 0]} s={[0.3, 0.9, 0.3]} c={NAVY} />
      </group>
      <Ring sx={0} y={0.07} animate={animate} />
    </group>
  )
}

function Yard({ animate }) {
  const spreader = useRef()
  const pin = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (spreader.current && animate) {
      spreader.current.position.y = 2.55 - (Math.sin(t * 0.9) * 0.5 + 0.5) * 1.15
      spreader.current.position.x = Math.sin(t * 0.45) * 0.5
    }
    if (pin.current) pin.current.position.y = 4.1 + (animate ? Math.sin(t * 2) * 0.18 : 0)
  })
  const stack = [
    [-0.9, 0.35, -0.1, BLUE], [0, 0.35, -0.1, GOLD_DARK], [0.9, 0.35, -0.1, RED],
    [-0.45, 1.05, -0.1, GOLD_DARK], [0.45, 1.05, -0.1, BLUE],
  ]
  return (
    <group position={[-4, 0, 0]}>
      {stack.map(([x, y, z, c], i) => (
        <Box key={i} p={[x, y, z]} s={[0.84, 0.66, 0.66]} c={c} />
      ))}
      {[-1.5, 1.5].flatMap((x) => [-0.7, 0.7].map((z) => (
        <Box key={`${x}${z}`} p={[x, 1.6, z]} s={[0.1, 3.2, 0.1]} c={NAVY} />
      )))}
      <Box p={[0, 3.25, -0.7]} s={[3.3, 0.22, 0.2]} c={NAVY} />
      <Box p={[0, 3.25, 0.7]} s={[3.3, 0.22, 0.2]} c={NAVY} />
      <group ref={spreader} position={[0, 2.55, 0]}>
        <Box p={[0, 0.5, 0]} s={[0.05, 1, 0.05]} c={NAVY} shadow={false} />
        <Box p={[0, 0, 0]} s={[0.84, 0.6, 0.62]} c={GOLD} />
      </group>
      <group ref={pin} position={[0, 4.1, 0]}>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.25, 0]} castShadow>
          <coneGeometry args={[0.26, 0.55, 14]} />
          <meshStandardMaterial color={GOLD} flatShading />
        </mesh>
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 12]} />
          <meshStandardMaterial color={GOLD} flatShading />
        </mesh>
        <mesh position={[0, 0.12, 0.28]}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color={NAVY} />
        </mesh>
      </group>
      <Ring sx={0} y={0.07} radius={1.6} animate={animate} />
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
      const open = animate ? Math.max(0, Math.sin(t * 0.8 + i * 1.4)) * 0.8 : 0
      const h = 1.2 * (1 - open)
      d.scale.y = 1 - open
      d.position.y = 1.4 - h / 2
    })
    if (eye.current) eye.current.rotation.y = animate ? Math.sin(t * 1.2) * 0.6 : 0
  })
  return (
    <group position={[0, 0, -0.2]}>
      <Box p={[0, 0.9, 0]} s={[3.4, 1.8, 1.7]} c={WHITE} />
      <Box p={[0, 1.95, 0.05]} s={[3.7, 0.22, 1.9]} c={NAVY} />
      {[-1.05, 0, 1.05].map((x, i) => (
        <group key={x}>
          <Box p={[x, 0.6, 0.86]} s={[0.84, 1.2, 0.04]} c="#e8eef9" shadow={false} />
          <mesh ref={(el) => (doors.current[i] = el)} position={[x, 0.8, 0.9]} castShadow>
            <boxGeometry args={[0.84, 1.2, 0.05]} />
            <meshStandardMaterial color={NAVY_LIGHT} flatShading />
          </mesh>
        </group>
      ))}
      <group ref={eye} position={[0, 2.6, 0.2]}>
        <Box p={[0, 0, 0]} s={[0.7, 0.5, 0.5]} c={NAVY} />
        <mesh position={[0, 0, 0.27]}>
          <sphereGeometry args={[0.15, 12, 10]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} />
        </mesh>
      </group>
      <Ring sx={0} y={0.07} radius={1.9} animate={animate} />
    </group>
  )
}

function Waves({ animate }) {
  const rings = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    rings.current.forEach((m, i) => {
      if (!m) return
      const k = animate ? ((t * 0.5 + i / 3) % 1) : 0.3
      m.scale.setScalar(0.4 + k * 2.2)
      m.material.opacity = animate ? (1 - k) * 0.7 : 0
    })
  })
  return (
    <group position={[0, 2.9, 0.3]}>
      <mesh>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial color={NAVY} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.04, 8, 36]} />
          <meshBasicMaterial color={GOLD_DARK} transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}

function WarehouseStation({ animate }) {
  const fork = useRef()
  useFrame(({ clock }) => {
    if (fork.current) fork.current.position.x = animate ? Math.sin(clock.elapsedTime * 0.8) * 1.0 : 0
  })
  const crates = [
    [-1.1, 0.4, BLUE], [-0.55, 0.4, GOLD_DARK], [0.55, 0.4, BLUE], [1.1, 0.4, RED],
    [-1.1, 1.0, RED], [-0.55, 1.0, BLUE], [0.55, 1.0, GOLD_DARK], [1.1, 1.0, BLUE],
  ]
  return (
    <group position={[4, 0, -0.2]}>
      <Box p={[0, 0.95, 0]} s={[3.6, 1.9, 1.9]} c={CREAM} />
      <Box p={[0, 2.05, 0]} s={[3.9, 0.22, 2.1]} c={GOLD_DARK} />
      <Box p={[0, 1.0, 0.96]} s={[3.2, 1.7, 0.05]} c="#eef3fb" shadow={false} />
      {crates.map(([x, y, c], i) => (
        <Box key={i} p={[x, y, 0.82]} s={[0.46, 0.46, 0.46]} c={c} />
      ))}
      <group ref={fork} position={[0, 0, 1.55]}>
        <Box p={[0, 0.5, 0]} s={[0.8, 0.5, 0.5]} c={GOLD} />
        <Box p={[0.5, 0.75, 0]} s={[0.08, 1.1, 0.4]} c={NAVY} />
        <Box p={[0.72, 0.28, 0]} s={[0.4, 0.07, 0.34]} c={NAVY} />
        <mesh position={[-0.2, 0.18, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 10]} />
          <meshStandardMaterial color={NAVY} flatShading />
        </mesh>
        <mesh position={[0.3, 0.18, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 10]} />
          <meshStandardMaterial color={NAVY} flatShading />
        </mesh>
      </group>
      <Waves animate={animate} />
      <Ring sx={0} y={0.07} radius={2} animate={animate} />
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
      b.position.y = 1.3 + (0.7 * h) / 2
    })
    if (pin.current) pin.current.position.y = 0.55 + (animate ? Math.sin(t * 2.2) * 0.12 : 0)
  })
  return (
    <group position={[8, 0, -0.2]}>
      <Box p={[0, 0.9, 0]} s={[0.16, 1.8, 0.16]} c={NAVY} />
      <group position={[0, 2.5, 0]} rotation={[0, -0.18, 0]}>
        <Box p={[0, 0, 0]} s={[3, 1.9, 0.14]} c={NAVY} />
        <Box p={[0, 0, 0.09]} s={[2.8, 1.7, 0.04]} c={WHITE} shadow={false} />
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} ref={(el) => (bars.current[i] = el)} position={[-1 + i * 0.5, 0, 0.14]}>
            <boxGeometry args={[0.28, 0.7, 0.06]} />
            <meshStandardMaterial color={i % 2 ? GOLD_DARK : BLUE} flatShading />
          </mesh>
        ))}
        <Box p={[0, 0.62, 0.12]} s={[2.2, 0.05, 0.04]} c={NAVY} shadow={false} />
      </group>
      <group ref={pin} position={[0, 0.55, 1.0]}>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.22, 0]} castShadow>
          <coneGeometry args={[0.24, 0.5, 14]} />
          <meshStandardMaterial color={RED} flatShading />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow>
          <sphereGeometry args={[0.27, 16, 12]} />
          <meshStandardMaterial color={RED} flatShading />
        </mesh>
        <mesh position={[0, 0.1, 0.24]}>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshStandardMaterial color={WHITE} />
        </mesh>
      </group>
      <Ring sx={0} y={0.07} radius={1.5} animate={animate} />
    </group>
  )
}

function PlatformLinks({ animate }) {
  const packets = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    packets.current.forEach((m, i) => {
      if (!m) return
      const k = animate ? ((t * 0.45 + i * 0.23) % 1) : 0.5
      m.position.y = 5.1 - k * 2.2
    })
  })
  return (
    <group>
      <Box p={[0, 5.5, -0.4]} s={[18, 0.55, 0.9]} c={NAVY} />
      <mesh position={[-8.2, 5.5, 0.06]}>
        <sphereGeometry args={[0.13, 12, 10]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
      </mesh>
      <Box p={[-6.4, 5.5, 0.08]} s={[3.2, 0.14, 0.04]} c={WHITE} shadow={false} />
      <Box p={[-3.9, 5.5, 0.08]} s={[1.6, 0.14, 0.04]} c={WHITE} o={0.4} shadow={false} />
      {STATIONS.map((s, i) => (
        <group key={s.key} position={[s.x, 0, -0.4]}>
          <mesh position={[0, 3.9, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 3.2, 6]} />
            <meshBasicMaterial color={NAVY} transparent opacity={0.3} />
          </mesh>
          <mesh ref={(el) => (packets.current[i] = el)} position={[0, 5.1, 0.1]}>
            <sphereGeometry args={[0.13, 12, 10]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function World({ animate }) {
  const dashes = useRef()
  useFrame(({ clock }) => {
    if (dashes.current && animate) dashes.current.position.x = -((clock.elapsedTime * 3.2) % 1.6)
  })
  const dashCount = 26
  return (
    <group>
      <Box p={[0, -0.28, 0.4]} s={[27, 0.5, 8.6]} c={CREAM} shadow={false} />
      <Box p={[0, -0.68, 0.4]} s={[27.4, 0.3, 9]} c={NAVY_LIGHT} shadow={false} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0.4]} receiveShadow>
        <planeGeometry args={[27, 8.6]} />
        <shadowMaterial opacity={0.14} />
      </mesh>
      <Box p={[0, 0.0, 2.3]} s={[26, 0.08, 1.9]} c={NAVY} shadow={false} />
      <group ref={dashes} position={[0, 0.06, 2.3]}>
        {Array.from({ length: dashCount }, (_, i) => (
          <Box key={i} p={[-18 + i * 1.6, 0, 0]} s={[0.8, 0.02, 0.12]} c={GOLD} shadow={false} />
        ))}
      </group>
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

function CameraRig() {
  const { camera, pointer } = useThree()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    camera.position.x += (pointer.x * 2.4 + Math.sin(t * 0.25) * 0.8 - camera.position.x) * 0.04
    camera.position.y += (9 + pointer.y * 0.8 - camera.position.y) * 0.04
    camera.lookAt(0, 1.6, 0.5)
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
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 9, 22], fov: 33, near: 0.5, far: 80 }}
          gl={{ alpha: true, antialias: true }}
          aria-label="Interactive 3D logistics scene: a truck moves through gate, yard, dock, warehouse and fleet stations, linked to the Prosper AI platform"
        >
          <ambientLight intensity={1.15} />
          <directionalLight
            position={[8, 14, 9]}
            intensity={1.9}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-16}
            shadow-camera-right={16}
            shadow-camera-top={9}
            shadow-camera-bottom={-6}
            shadow-bias={-0.0004}
          />
          <hemisphereLight args={['#ffffff', '#ffe58a', 0.5]} />
          <CameraRig />
          <World animate={animate} />
        </Canvas>
      </div>
      <StationChips reduce={reduce} />
    </div>
  )
}
