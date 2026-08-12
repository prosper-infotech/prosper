import { BrainCircuit, ScanEye, Workflow, TrendingUp, Network, Cpu, Sparkles } from 'lucide-react'

const BASE = '/services/ai-software-development'

export const AI_SERVICES = [
  {
    path: `${BASE}/ai-machine-learning-development`,
    label: 'AI & Machine Learning Development',
    icon: BrainCircuit,
    accent: 'violet',
    seoTitle: 'AI & Machine Learning Development for Logistics & Supply Chain | Prosper Infotech',
    seoDescription:
      'Production-ready AI and machine learning solutions for logistics — classification, forecasting, anomaly detection, and decision engines built around real operational workflows.',
    heading: 'AI & Machine Learning Solutions Built for Logistics Operations',
    intro:
      'Build intelligent logistics applications that learn from operational data, automate decisions, identify exceptions, and improve efficiency across yards, warehouses, transportation, container terminals, fleets, and manufacturing operations. Prosper Infotech develops production-ready AI and machine learning solutions designed around real logistics workflows, not generic AI experiments.',
    categories: [
      {
        title: 'Machine Learning Models',
        items: ['Classification', 'Forecasting', 'Anomaly detection', 'Pattern recognition', 'Optimization models', 'Recommendation engines'],
      },
      {
        title: 'Logistics Intelligence',
        items: ['Trailer and container movement intelligence', 'Inventory optimization', 'Yard congestion analysis', 'Dock utilization prediction', 'Equipment utilization analysis', 'Shipment exception prediction'],
      },
      {
        title: 'AI Decision Engines',
        items: ['Rule + ML decision models', 'Confidence scoring', 'Dynamic task prioritization', 'Automated operational recommendations', 'Exception resolution workflows'],
      },
      {
        title: 'Logistics Use Cases',
        items: ['Predict trailer dwell time', 'Predict dock congestion', 'Forecast warehouse workload', 'Predict inventory shortages', 'Identify operational anomalies', 'Optimize equipment allocation', 'Prioritize yard moves', 'Predict maintenance requirements', 'Analyze transportation performance', 'Detect recurring operational bottlenecks'],
      },
    ],
    techTags: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NVIDIA', 'TensorRT', 'PostgreSQL', 'Azure', 'AWS', 'REST APIs'],
    cta: 'Build Your Logistics AI Solution',
  },
  {
    path: `${BASE}/ai-computer-vision-ocr`,
    label: 'AI Computer Vision & OCR',
    icon: ScanEye,
    accent: 'blue',
    seoTitle: 'AI Computer Vision & OCR Solutions for Logistics | Prosper Infotech',
    seoDescription:
      'AI-powered computer vision and OCR that identify trailers, containers, vehicles, pallets, equipment, people, license plates, and documents — automating physical logistics operations.',
    heading: 'Turn Cameras Into Operational Intelligence',
    intro:
      'Prosper Infotech develops AI-powered computer vision and OCR solutions that automatically identify trailers, containers, vehicles, pallets, equipment, people, license plates, documents, and operational events. Our vision solutions combine cameras, Edge AI, OCR, GPS, RFID, and enterprise integrations to automate physical logistics operations.',
    categories: [
      { title: 'Object Detection', items: ['Trucks', 'Trailers', 'Containers', 'Pallets', 'Forklifts', 'Equipment', 'People'] },
      { title: 'OCR & Recognition', items: ['Container number OCR', 'Trailer number recognition', 'License plate recognition', 'SCAC identification', 'Barcode recognition', 'Shipping document OCR', 'Invoice OCR', 'Seal number recognition'] },
      { title: 'AI Video Analytics', items: ['Object tracking', 'Zone monitoring', 'Entry/exit detection', 'Activity detection', 'Dwell monitoring', 'Safety monitoring', 'Exception detection'] },
      { title: 'Logistics Applications', items: ['GateVision AI', 'DockVision AI', 'ForkliftVision AI', 'ContainerVision AI', 'Yard camera inventory', 'Damage detection', 'Vehicle recognition', 'Attendance and workforce vision', 'Warehouse pallet tracking'] },
    ],
    techFlow: ['Camera', 'Prosper AI EdgeBox', 'AI/OCR Processing', 'Business Rules', 'API', 'YMS/WMS/TMS/ERP'],
    cta: 'Explore AI Vision Solutions',
  },
  {
    path: `${BASE}/ai-automation-development`,
    label: 'AI Automation Development',
    icon: Workflow,
    accent: 'orange',
    seoTitle: 'AI Automation Development for Logistics & Supply Chain | Prosper Infotech',
    seoDescription:
      'Intelligent automation platforms that detect operational events, make decisions, create tasks, update enterprise systems, and trigger real-time workflows automatically.',
    heading: 'Automate Logistics Workflows With AI-Driven Decisions',
    intro:
      'Move beyond dashboards and manual processes. Prosper Infotech develops intelligent automation platforms that detect operational events, make decisions, create tasks, update enterprise systems, and trigger real-time workflows automatically.',
    categories: [
      { title: 'Gate Operations', items: ['Automated arrival processing', 'Appointment validation', 'Trailer recognition', 'Barrier control', 'Departure confirmation'] },
      { title: 'Yard Operations', items: ['Trailer inventory updates', 'Spot/pull task creation', 'Yard move prioritization', 'Dwell alerts', 'Location updates'] },
      { title: 'Warehouse Operations', items: ['Automated pallet identification', 'Putaway confirmation', 'Pick validation', 'Inventory movement updates'] },
      { title: 'Dock Operations', items: ['Dock occupancy detection', 'Loading/unloading monitoring', 'Turnaround tracking', 'Delay detection'] },
      { title: 'Container Terminal Operations', items: ['Container pickup validation', 'Reach stacker movement tracking', 'Drop location confirmation', 'Inventory updates'] },
    ],
    techFlow: ['Detect', 'Understand', 'Decide', 'Automate', 'Integrate', 'Audit'],
    techTags: ['YMS', 'WMS', 'TMS', 'ERP', 'SAP', 'AS400 / IBM i', 'REST APIs', 'MQTT', 'WebSockets'],
    cta: 'Automate Your Logistics Operations',
  },
  {
    path: `${BASE}/ai-analytics-predictive-intelligence`,
    label: 'AI Analytics & Predictive Intelligence',
    icon: TrendingUp,
    accent: 'emerald',
    seoTitle: 'AI Analytics & Predictive Intelligence for Logistics | Prosper Infotech',
    seoDescription:
      'AI-powered analytics that turn yard, warehouse, fleet, container, dock, camera, RFID, GPS, and IoT data into real-time and predictive operational intelligence.',
    heading: 'Turn Logistics Data Into Predictive Operational Intelligence',
    intro:
      'Transform operational data from yards, warehouses, fleets, containers, docks, cameras, RFID systems, GPS devices, IoT sensors, and enterprise systems into actionable insights. Prosper Infotech develops AI-powered analytics solutions that help operations teams understand what happened, why it happened, what is happening now, and what is likely to happen next.',
    categories: [
      { title: 'Real-Time Analytics', items: ['Yard inventory', 'Dock utilization', 'Trailer dwell', 'Equipment status', 'Gate throughput', 'Warehouse activity'] },
      { title: 'Predictive Analytics', items: ['Congestion prediction', 'Dwell prediction', 'Capacity forecasting', 'Maintenance forecasting', 'Inventory forecasting', 'Workforce demand'] },
      { title: 'Operational Intelligence', items: ['KPI dashboards', 'Exception trends', 'Root-cause analytics', 'Productivity insights', 'Utilization analysis', 'SLA performance'] },
      { title: 'Data Sources', items: ['RFID', 'GPS / RTK', 'Cameras', 'OCR', 'IoT sensors', 'PLC systems', 'YMS', 'WMS', 'TMS', 'ERP', 'AS400 / IBM i'] },
    ],
    techTags: ['Predict dock delays', 'Recommend alternate dock assignments', 'Alert on dwell thresholds', 'Optimize yard move priority'],
    cta: 'Build Your Logistics Intelligence Platform',
  },
  {
    path: `${BASE}/ai-integration-enterprise-apis`,
    label: 'AI Integration & Enterprise APIs',
    icon: Network,
    accent: 'cyan',
    seoTitle: 'AI Integration & Enterprise API Development for Logistics | Prosper Infotech',
    seoDescription:
      'Connecting AI, RFID, GPS, OCR, IoT, and Edge systems with existing YMS, WMS, TMS, ERP, AS400, SAP, cloud, and customer applications.',
    heading: 'Connect AI Intelligence With Your Enterprise Systems',
    intro:
      'AI creates value only when its insights become part of operational workflows. Prosper Infotech connects AI, RFID, GPS, OCR, IoT, and Edge systems with existing YMS, WMS, TMS, ERP, AS400, SAP, cloud, and customer applications.',
    categories: [
      { title: 'Integration Capabilities', items: ['REST API development', 'Webhooks', 'MQTT', 'WebSockets', 'JSON / XML', 'EDI', 'Database integration', 'Event-driven architecture', 'Message queues', 'Cloud APIs', 'Legacy system integration'] },
      { title: 'Enterprise Systems', items: ['YMS', 'WMS', 'TMS', 'ERP', 'SAP', 'AS400 / IBM i', 'Fleet systems', 'Warehouse automation systems', 'Customer portals', 'Carrier systems'] },
      { title: 'Key Benefits', items: ['Eliminate duplicate data entry', 'Automate operational updates', 'Connect legacy and modern systems', 'Improve data consistency', 'Enable real-time event processing', 'Create a unified operational view'] },
    ],
    techFlow: ['Camera / RFID / GPS / Sensor', 'Prosper Edge Platform', 'AI / OCR / Rules Engine', 'Prosper Integration Layer', 'YMS · WMS · TMS · ERP · SAP · AS400'],
    cta: 'Connect Your Logistics Ecosystem',
  },
  {
    path: `${BASE}/edge-ai-iot-software-development`,
    label: 'Edge AI & IoT Software Development',
    icon: Cpu,
    accent: 'indigo',
    seoTitle: 'Edge AI & Industrial IoT Software Development | Prosper Infotech',
    seoDescription:
      'Edge AI and Industrial IoT software that processes camera, RFID, GPS, PLC, sensor, and machine data directly at the operational edge for low-latency decisions.',
    heading: 'Process Intelligence Where Operations Happen',
    intro:
      'Prosper Infotech develops Edge AI and Industrial IoT software that processes camera, RFID, GPS, PLC, sensor, and machine data directly at the operational edge. This enables low-latency decisions, reduced cloud dependency, resilient operations, and secure local processing.',
    categories: [
      { title: 'Computer Vision', items: ['Object detection', 'OCR', 'Video analytics', 'Tracking'] },
      { title: 'Industrial IoT', items: ['PLC integration', 'Modbus', 'OPC UA', 'BLE', 'LoRaWAN', 'RFID readers', 'Environmental sensors'] },
      { title: 'Connectivity', items: ['Ethernet', 'Wi-Fi', '4G / 5G', 'GPS / GNSS', 'MQTT', 'HTTP', 'REST'] },
      { title: 'Prosper AI EdgeBox', items: ['Computer vision', 'OCR', 'AI inference', 'Sensor fusion', 'Video analytics'] },
      { title: 'EdgeBox Gateway IIoT', items: ['PLC connectivity', 'Sensor collection', 'RFID integration', 'Industrial protocols', 'Secure cloud connectivity'] },
      { title: 'Industries', items: ['Logistics', 'Warehousing', 'Manufacturing', 'Ports', 'CFS terminals', 'Cold chain', 'Construction', 'Smart facilities'] },
    ],
    techNote: 'Edge-first architecture for low latency, local resilience, secure processing and cloud synchronization.',
    cta: 'Build Your Edge AI Platform',
  },
  {
    path: `${BASE}/custom-logistics-ai-software`,
    label: 'Custom Logistics AI Software',
    icon: Sparkles,
    accent: 'gold',
    seoTitle: 'Custom Logistics AI Software Development | Prosper Infotech',
    seoDescription:
      'Custom logistics software combining AI, ML, computer vision, OCR, RFID, GPS, IoT, cloud, and enterprise integration to solve specific operational problems.',
    heading: 'Custom AI Software Built Around Your Logistics Operation',
    intro:
      'Every yard, warehouse, fleet, terminal, and supply chain operation works differently. Prosper Infotech designs custom logistics software that combines AI + ML + Computer Vision + OCR + RFID + GPS + IoT + Cloud + Enterprise Integration to solve specific operational problems.',
    categories: [
      {
        title: 'Solutions We Build',
        items: ['AI-powered YMS', 'Warehouse automation software', 'Yard visibility platforms', 'Container terminal applications', 'Fleet intelligence systems', 'Asset tracking platforms', 'Dock management solutions', 'Gate automation applications', 'AI dashboards', 'Mobile operational applications', 'Edge applications', 'SaaS logistics platforms'],
      },
    ],
    techTags: ['Custom architecture', 'UX/UI', 'APIs', 'Edge processing', 'Cloud deployment', 'Enterprise integration', 'Production support'],
    cta: 'Discuss Your Custom AI Software Project',
  },
]

export const AI_SERVICES_DETAIL = Object.fromEntries(AI_SERVICES.map((s) => [s.path, s]))
