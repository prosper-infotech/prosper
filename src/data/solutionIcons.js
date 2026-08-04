import { Warehouse, Boxes, Truck, Radio, Tag, Container, ScanEye, Cpu, Eye, Users } from 'lucide-react'

// Keyed by route path so both the Solutions overview grid and each
// detail page's header badge can share one icon assignment.
export const SOLUTION_ICONS = {
  '/solutions/warehouse-solutions': Warehouse,
  '/solutions/yard-solutions': Boxes,
  '/solutions/fleet-management': Truck,
  '/solutions/rfid-gps-solutions': Radio,
  '/solutions/asset-tracking': Tag,
  '/solutions/container-terminal-automation': Container,
  '/solutions/gate-yard-dock-vision-ai': ScanEye,
  '/solutions/industrial-iot': Cpu,
  '/solutions/ai-computer-vision': Eye,
  '/solutions/workforce-management': Users,
}
