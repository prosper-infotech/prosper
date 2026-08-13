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
        children: [
          { label: 'Prosper DockVisionAI', path: '/products/software#dockvision-ai' },
          { label: 'Prosper ContainerVisionAI', path: '/products/software#containervision-ai' },
          { label: 'Prosper Asset Tracking', path: '/products/software#asset-tracking' },
          { label: 'Prosper WMS', path: '/products/software#wms' },
          { label: 'Prosper YardVision AI', path: '/products/software#yardvision-ai' },
          { label: 'RFID + GPS Inventory Tracking', path: '/products/software#rfid-gps' },
          { label: 'Video-Based Attendance System', path: '/products/software#video-attendance' },
        ],
      },
      {
        label: 'Hardware',
        path: '/products/hardware',
        description:
          'Fixed / Handheld / Antenna RFID Readers, RFID Tags, GPS Devices, AI/OCR/ANPR Cameras, Edge Box/Devices, LoRaWAN Sensors, IoT Gateway',
        children: [
          { label: '4 Port Fixed RFID Reader', path: '/products/hardware#fixed-rfid-reader' },
          { label: 'Antenna Integrated RFID Reader', path: '/products/hardware#antenna-integrated-reader' },
          { label: 'AI Edge Box', path: '/products/hardware#ai-edge-box' },
          { label: 'IoT Gateway', path: '/products/hardware#iot-gateway' },
        ],
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
        label: 'AI Software Development',
        path: '/services/ai-software-development',
        description:
          'AI, ML, Computer Vision, OCR, Automation, Analytics, Edge AI and Logistics Technology Engineering',
        children: [
          { label: 'AI & Machine Learning Development', path: '/services/ai-software-development/ai-machine-learning-development' },
          { label: 'AI Computer Vision & OCR', path: '/services/ai-software-development/ai-computer-vision-ocr' },
          { label: 'AI Automation Development', path: '/services/ai-software-development/ai-automation-development' },
          { label: 'AI Analytics & Predictive Intelligence', path: '/services/ai-software-development/ai-analytics-predictive-intelligence' },
          { label: 'AI Integration & Enterprise APIs', path: '/services/ai-software-development/ai-integration-enterprise-apis' },
          { label: 'Edge AI & IoT Software Development', path: '/services/ai-software-development/edge-ai-iot-software-development' },
          { label: 'Custom Logistics AI Software', path: '/services/ai-software-development/custom-logistics-ai-software' },
        ],
      },
      {
        label: 'RFID Services',
        path: '/services/rfid-services',
        description: 'Consulting, Implementation, Integration, Support',
        children: [
          { label: 'RFID Consulting', path: '/services/rfid-services#consulting' },
          { label: 'RFID Implementation', path: '/services/rfid-services#implementation' },
          { label: 'RFID Integration', path: '/services/rfid-services#integration' },
          { label: 'RFID Support', path: '/services/rfid-services#support' },
        ],
      },
      {
        label: 'Industrial IoT Services',
        path: '/services/industrial-iot-services',
        description: 'Development, LoRaWAN, Device/Camera Integration, Edge AI, Cloud Connectivity',
        children: [
          { label: 'IoT Solution Development', path: '/services/industrial-iot-services#development' },
          { label: 'LoRaWAN Networks', path: '/services/industrial-iot-services#lorawan' },
          { label: 'Device & Camera Integration', path: '/services/industrial-iot-services#integration' },
          { label: 'Edge AI', path: '/services/industrial-iot-services#edge-ai' },
          { label: 'Cloud Connectivity', path: '/services/industrial-iot-services#cloud' },
        ],
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
  { label: 'AS400', path: '/ibm-i-as400' },
  { label: '24x7 Help Desk', path: '/contact' },
  {
    label: 'Resources',
    path: '/resources',
    description: 'Guides, case studies, and updates from the Prosper Infotech team.',
    templateGroup: 'topic',
    children: [
      { label: 'Blog', path: '/resources/blog' },
      { label: 'Videos', path: '/resources/videos' },
      { label: 'FAQs', path: '/resources/faqs' },
    ],
  },
  { label: 'About Us', path: '/about' },
]

// Flat list of every route implied by NAV (top-level items + their children).
export const ALL_ROUTES = NAV.flatMap((item) => [
  { label: item.label, path: item.path, description: item.description },
  ...(item.children ?? []),
])
