import warehouse from '../assets/solution-warehouse.webp'
import yard from '../assets/solution-yard.webp'
import fleet from '../assets/solution-fleet.webp'
import rfidGps from '../assets/solution-rfid-gps.webp'
import assetTracking from '../assets/solution-asset-tracking.webp'
import containerTerminal from '../assets/solution-container-terminal.webp'
import gateYardDockVision from '../assets/solution-gate-yard-dock-vision.webp'
import industrialIot from '../assets/solution-industrial-iot.webp'
import aiComputerVision from '../assets/solution-ai-computer-vision.webp'
import workforceManagement from '../assets/solution-workforce-management.webp'

// Keyed by route path so both the Solutions overview grid and each
// detail page's overview section can share one image assignment.
export const SOLUTION_IMAGES = {
  '/solutions/warehouse-solutions': warehouse,
  '/solutions/yard-solutions': yard,
  '/solutions/fleet-management': fleet,
  '/solutions/rfid-gps-solutions': rfidGps,
  '/solutions/asset-tracking': assetTracking,
  '/solutions/container-terminal-automation': containerTerminal,
  '/solutions/gate-yard-dock-vision-ai': gateYardDockVision,
  '/solutions/industrial-iot': industrialIot,
  '/solutions/ai-computer-vision': aiComputerVision,
  '/solutions/workforce-management': workforceManagement,
}
