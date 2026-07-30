// Site IA per MASTER_PLAN.md Section 2. Each top-level item with `children`
// renders as a mega-menu dropdown; each child becomes its own route.
export const NAV = [
  { label: 'Home', path: '/' },
  {
    label: 'Solutions',
    path: '/solutions',
    description: 'IoT, RFID, GPS, and AI solutions for yards, warehouses, and fleets.',
    templateGroup: 'detail',
    children: [
      {
        label: 'Warehouse Solutions',
        path: '/solutions/warehouse-solutions',
        description: 'WMS, Inventory Management, Warehouse Automation, Dock Management',
      },
      {
        label: 'Yard Solutions',
        path: '/solutions/yard-solutions',
        description: 'YMS, Trailer Management, Gate Automation, Appointment Scheduling',
      },
      {
        label: 'Fleet Management',
        path: '/solutions/fleet-management',
        description: 'Fleet Tracking, GPS Tracking, Vehicle Monitoring, Driver Management',
      },
      {
        label: 'RFID & GPS Solutions',
        path: '/solutions/rfid-gps-solutions',
        description: 'RFID Inventory / Asset / Container Management, RFID Gate Automation',
      },
      {
        label: 'Asset Tracking',
        path: '/solutions/asset-tracking',
        description: 'Equipment, Medical, Manufacturing, Logistics',
      },
      {
        label: 'Container Terminal Automation',
        path: '/solutions/container-terminal-automation',
        description: 'CFS Automation, AI Container Inventory, Container Tracking',
      },
      {
        label: 'Gate/Yard/Dock Vision AI',
        path: '/solutions/gate-yard-dock-vision-ai',
        description: 'Container OCR, OCR Inspection, Reach Stacker Automation',
      },
      {
        label: 'Industrial IoT',
        path: '/solutions/industrial-iot',
        description: 'Edge Computing, Edge AI, Smart Factory, Sensors, LoRaWAN',
      },
      {
        label: 'AI & Computer Vision',
        path: '/solutions/ai-computer-vision',
        description: 'CV Solutions, OCR, Video Analytics, AI Attendance/Inspection, Object Detection',
      },
      {
        label: 'Workforce Management',
        path: '/solutions/workforce-management',
        description: 'HRMS, Payroll, Attendance, Productivity Monitoring',
      },
    ],
  },
  {
    label: 'Products',
    path: '/products',
    description: 'Software platforms and hardware built for RFID, GPS, and IoT deployments.',
    templateGroup: 'detail',
    children: [
      {
        label: 'Software',
        path: '/products/software',
        description:
          'Prosper WMS, Fleet, Asset Tracking, HRMS & Payroll, Gate-Yard-Dock Vision, Vision AI, CFS & Terminal Automation, Video Attendance',
      },
      {
        label: 'Hardware',
        path: '/products/hardware',
        description:
          'Fixed / Handheld / Antenna RFID Readers, RFID Tags, GPS Devices, AI/OCR/ANPR Cameras, Edge Box/Devices, LoRaWAN Sensors, IoT Gateway',
      },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    description: 'Development, implementation, and support across our full solution stack.',
    templateGroup: 'detail',
    children: [
      {
        label: 'Software Development',
        path: '/services/software-development',
        description: 'Custom, Enterprise, AI/CV/OCR/ML Development',
      },
      {
        label: 'RFID Services',
        path: '/services/rfid-services',
        description: 'Consulting, Implementation, Integration, Support',
      },
      {
        label: 'Industrial IoT Services',
        path: '/services/industrial-iot-services',
        description: 'Development, LoRaWAN, Device/Camera Integration, Edge AI, Cloud Connectivity',
      },
      {
        label: 'IBM i / AS400',
        path: '/services/ibm-i-as400',
        description: 'Development, Modernization, Migration, Support',
      },
    ],
  },
  {
    label: 'Industries',
    path: '/industries',
    description: 'Purpose-built solutions across the industries we serve.',
    templateGroup: 'topic',
    children: [
      { label: 'Logistics', path: '/industries/logistics' },
      { label: 'Warehousing', path: '/industries/warehousing' },
      { label: 'Manufacturing', path: '/industries/manufacturing' },
      { label: 'Ports & Terminals', path: '/industries/ports-terminals' },
      { label: 'CFS', path: '/industries/cfs' },
      { label: 'Supply Chain', path: '/industries/supply-chain' },
      { label: '3PL', path: '/industries/3pl' },
      { label: 'Cold Chain', path: '/industries/cold-chain' },
      { label: 'Healthcare', path: '/industries/healthcare' },
      { label: 'Pharma', path: '/industries/pharma' },
      { label: 'Retail', path: '/industries/retail' },
      { label: 'Construction', path: '/industries/construction' },
      { label: 'Media & Entertainment', path: '/industries/media-entertainment' },
    ],
  },
  {
    label: 'Resources',
    path: '/resources',
    description: 'Guides, case studies, and updates from the Prosper Infotech team.',
    templateGroup: 'topic',
    children: [
      { label: 'Blog', path: '/resources/blog' },
      { label: 'Case Studies', path: '/resources/case-studies' },
      { label: 'Brochures', path: '/resources/brochures' },
      { label: 'White Papers', path: '/resources/white-papers' },
      { label: 'Videos', path: '/resources/videos' },
      { label: 'FAQs', path: '/resources/faqs' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

// Flat list of every route implied by NAV (top-level items + their children).
export const ALL_ROUTES = NAV.flatMap((item) => [
  { label: item.label, path: item.path, description: item.description },
  ...(item.children ?? []),
])
