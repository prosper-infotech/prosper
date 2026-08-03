// Detailed, SEO-oriented content for each Solutions sub-page.
// Keyed by the route path used in src/data/navigation.js.
export const SOLUTIONS_DETAIL = {
  '/solutions/warehouse-solutions': {
    seoTitle: 'Warehouse Management Solutions (WMS) | RFID & Barcode Inventory Control | Prosper Infotech',
    metaDescription:
      'Real-time warehouse management software with RFID and barcode inventory control, automated put-away, picking, packing, and multi-warehouse visibility.',
    intro: [
      "Prosper Infotech's warehouse management solutions give logistics and distribution teams real-time control over inventory, from receiving through dispatch. Built around our proprietary Prosper WMS platform, our warehouse management software combines barcode and RFID scanning with automated put-away, wave picking, and batch/lot/serial tracking to eliminate manual stock counts and reduce fulfillment errors.",
      "Whether you're running a single distribution center or coordinating inventory across multiple warehouses, our warehouse automation tools integrate directly with your ERP, TMS, and existing systems through open APIs — so your team gets accurate, real-time stock visibility without ripping out infrastructure you already rely on.",
    ],
    keyFeatures: [
      { title: 'Real-Time Inventory Visibility', description: 'Track stock levels, locations, and movement across every warehouse from a single live dashboard.' },
      { title: 'Automated Receiving & Put-Away', description: 'Guide inbound goods to the right location automatically, cutting put-away time and picking errors.' },
      { title: 'Wave Picking & Packing', description: 'Optimize pick paths and batch orders to speed up order fulfillment during peak volume.' },
      { title: 'Barcode & RFID Support', description: 'Scan-based or hands-free RFID tracking for batch, lot, and serial-level accuracy.' },
      { title: 'Multi-Warehouse Management', description: 'Manage inventory, transfers, and reporting across multiple sites from one platform.' },
      { title: 'ERP & TMS Integration', description: 'Connect warehouse data directly to your existing ERP, TMS, and order management systems via API.' },
    ],
    benefits: [
      'Reduce inventory errors and stockouts',
      'Faster order fulfillment and dispatch',
      'Lower labor costs through automation',
      'Improve cycle count accuracy',
      'Scale across multiple warehouses without added overhead',
      'Full audit trail for every stock movement',
    ],
    idealFor: ['Distribution Centers', '3PL Warehouses', 'Manufacturing', 'Cold Chain', 'Retail Fulfillment'],
  },

  '/solutions/yard-solutions': {
    seoTitle: 'Yard Management System (YMS) | Gate, Trailer & Appointment Automation | Prosper Infotech',
    metaDescription:
      'AI-powered yard management software for trailer tracking, gate automation, appointment scheduling, and real-time yard visibility across empty and full containers.',
    intro: [
      "Prosper Infotech's yard management solutions, powered by our Prosper YMS platform, bring real-time visibility to every trailer, container, and gate movement across your yard. From carrier appointment scheduling through gate arrival, RFID-based inventory, trailer moves, and departure, our yard management system replaces manual spotter checks and radio calls with automated, auditable workflows.",
      "Built for logistics operations handling high trailer volume, our yard automation software supports empty, loaded, dedicated, dirty, drop, and live arrivals, with reefer monitoring for temperature-sensitive freight. The result: faster gate turnaround, fewer detention charges, and a live, bird's-eye view of every asset in your yard.",
    ],
    keyFeatures: [
      { title: 'Carrier Appointment Scheduling', description: 'Coordinate inbound and outbound slots to reduce gate congestion and driver wait times.' },
      { title: 'Automated Gate Processing', description: 'Capture trailer and container details automatically on arrival and departure.' },
      { title: 'RFID & GPS Yard Inventory', description: 'Real-time location tracking for every trailer and container, dry or reefer.' },
      { title: 'Reefer Guard Monitoring', description: 'Automated temperature, fuel, and defrost checks with instant exception alerts.' },
      { title: 'Trailer Move Management', description: 'Auto-assign spot and pull tasks with a full audit trail of every yard move.' },
      { title: "Bird's-Eye Yard View", description: 'Interactive live map of yard activity, dwell time, and trailer status.' },
    ],
    benefits: [
      'Faster gate turnaround times',
      'Reduced detention and demurrage costs',
      'Real-time trailer and container visibility',
      'Automated reefer compliance checks',
      'Fewer lost or misplaced trailers',
      'Reports, audits, and KPI dashboards on demand',
    ],
    idealFor: ['Distribution Yards', 'Ports & Terminals', 'Cold Chain Facilities', 'Manufacturing Yards', '3PL Operations'],
  },

  '/solutions/fleet-management': {
    seoTitle: 'Fleet Management Software | GPS Tracking & Driver Monitoring | Prosper Infotech',
    metaDescription:
      'GPS-based fleet tracking and driver management software for real-time vehicle visibility, route monitoring, and fleet performance reporting.',
    intro: [
      "Prosper Infotech's fleet management solutions give logistics and transportation teams real-time visibility into every vehicle on the road. Our GPS tracking platform monitors vehicle location, speed, and route adherence continuously, feeding live data into the same dashboards your team already uses for yard and warehouse operations.",
      'From driver behavior monitoring to maintenance scheduling and route optimization, our fleet management software helps you cut fuel costs, reduce idle time, and improve on-time delivery performance — all without adding another disconnected system to your operations.',
    ],
    keyFeatures: [
      { title: 'Real-Time GPS Tracking', description: 'Live vehicle location and route history across your entire fleet.' },
      { title: 'Driver Monitoring', description: 'Track driving behavior, hours of service, and route adherence.' },
      { title: 'Vehicle Health & Maintenance', description: 'Automated maintenance scheduling based on mileage and usage data.' },
      { title: 'Route Optimization', description: 'Plan efficient routes to cut fuel costs and delivery times.' },
      { title: 'Geofencing & Alerts', description: 'Instant notifications when vehicles enter, exit, or deviate from expected zones.' },
      { title: 'Fleet Reporting & Analytics', description: 'Consolidated dashboards for utilization, fuel, and performance reporting.' },
    ],
    benefits: [
      'Lower fuel and operating costs',
      'Improved on-time delivery performance',
      'Reduced vehicle downtime',
      'Better driver accountability',
      'Real-time exception alerts',
      'Centralized fleet reporting',
    ],
    idealFor: ['Trucking & Transportation', 'Last-Mile Delivery', 'Field Service Fleets', 'Logistics Providers', 'Construction Fleets'],
  },

  '/solutions/rfid-gps-solutions': {
    seoTitle: 'RFID & GPS Tracking Solutions | Asset, Inventory & Container Tracking | Prosper Infotech',
    metaDescription:
      'RFID and GPS-based tracking solutions for real-time inventory, asset, and container visibility, with REST API integration into your existing systems.',
    intro: [
      'Prosper Infotech designs and deploys RFID and GPS tracking solutions that give operations teams accurate, real-time location data on inventory, assets, and containers — without relying on manual scans or spreadsheets. Our RFID inventory management systems combine fixed and handheld UHF readers with GPS-enabled edge devices to deliver continuous, automated visibility.',
      'Every read is timestamped, geo-tagged, and pushed through a REST API into your ERP, WMS, YMS, or TMS — so RFID gate automation and real-time asset positioning become part of your existing workflows instead of a separate system to manage.',
    ],
    keyFeatures: [
      { title: 'RFID Inventory Management', description: 'Automated, hands-free inventory counts using fixed and handheld UHF readers.' },
      { title: 'RFID Asset & Container Tracking', description: 'Continuous location tracking for high-value assets and containers.' },
      { title: 'RFID Gate Automation', description: 'Automatic tag reads at gate checkpoints — no manual scanning required.' },
      { title: 'GPS Positioning', description: 'Real-time GPS location, speed, and dwell-time data for mobile assets.' },
      { title: 'AI-Based Locationing', description: 'Combines tag reads and GPS data to calculate the nearest available location.' },
      { title: 'REST API Integration', description: 'Connects directly into your ERP, WMS, YMS, and TMS platforms.' },
    ],
    benefits: [
      'Eliminate manual inventory counts',
      'Reduce asset loss and shrinkage',
      'Faster, more accurate gate processing',
      'Real-time location data across sites',
      'Lower total cost versus barcode-only systems',
      'Seamless integration with existing systems',
    ],
    idealFor: ['Warehouses & DCs', 'Container Yards & Ports', 'Manufacturing Plants', 'Asset-Intensive Operations', 'Logistics Providers'],
  },

  '/solutions/asset-tracking': {
    seoTitle: 'Asset Tracking Software | RFID Equipment & Inventory Tracking | Prosper Infotech',
    metaDescription:
      'RFID-powered asset tracking software for equipment, medical, manufacturing, and logistics assets — delivered as a zero-upfront SaaS platform with hardware included.',
    intro: [
      "Prosper Infotech's asset tracking solutions, built on our Prosper Asset Tracking platform, give organizations real-time visibility into equipment, tools, and high-value assets across every site. Using fixed and handheld RFID readers, our asset tracking software automatically logs check-ins, check-outs, and location changes — replacing manual asset registers and spreadsheets.",
      'Delivered as a SaaS platform with hardware included and no upfront cost, our asset tracking system is built for organizations that need multi-site control, automated alerts, and audit-ready reporting without a large capital investment in infrastructure.',
    ],
    keyFeatures: [
      { title: 'Real-Time Asset Visibility', description: 'Know the location and status of every tracked asset, live.' },
      { title: 'Automated Check-In / Check-Out', description: 'RFID-based logging eliminates manual asset sign-out sheets.' },
      { title: 'Multi-Site Asset Control', description: 'Manage assets across multiple facilities from a single dashboard.' },
      { title: 'Alerts & Notifications', description: 'Get notified instantly when assets move, go missing, or need maintenance.' },
      { title: 'Powerful Dashboards & Reports', description: 'Audit-ready reporting on asset utilization and movement history.' },
      { title: 'Zero Upfront Hardware Cost', description: 'RFID tags and readers included — pay monthly, not upfront.' },
    ],
    benefits: [
      'Eliminate lost or misplaced equipment',
      'Reduce manual asset audits',
      'Lower capital cost with included hardware',
      'Improve equipment utilization tracking',
      'Faster asset audits and compliance reporting',
      'Scales across warehouses, hospitals, job sites, and campuses',
    ],
    idealFor: [
      'Medical & Hospital Equipment',
      'Construction Equipment',
      'Manufacturing Tools & Machinery',
      'IT Assets',
      'Rental Equipment',
      'Fleet Yards',
      'Schools & Campuses',
    ],
  },

  '/solutions/container-terminal-automation': {
    seoTitle: 'Container Terminal Automation | CFS & AI Container Tracking | Prosper Infotech',
    metaDescription:
      'AI-powered container terminal automation for CFS operations, real-time container inventory, and automated container tracking across ports and yards.',
    intro: [
      "Prosper Infotech's container terminal automation solutions bring RFID, GPS, and AI-based computer vision together to give container freight stations (CFS) and terminal operators real-time visibility over every container on-site. Our platform automates container inventory counts, tracks container movement between gate, yard, and vessel, and flags exceptions before they become costly delays.",
      'By combining RFID and GPS inventory tracking with AI-based container vision, our terminal automation software reduces the manual checks and paperwork traditionally required at container freight stations — improving throughput without adding headcount.',
    ],
    keyFeatures: [
      { title: 'CFS Automation', description: 'Automate container receiving, inventory, and dispatch workflows at the freight station.' },
      { title: 'AI-Based Container Inventory', description: 'Continuous, automated container counts using RFID and computer vision.' },
      { title: 'Real-Time Container Tracking', description: 'Track container location and status from gate to yard to vessel.' },
      { title: 'Exception & Dwell Alerts', description: 'Instant notifications for delayed, missing, or misplaced containers.' },
      { title: 'Gate & Yard Integration', description: 'Works alongside our YMS and Vision AI platforms for end-to-end visibility.' },
      { title: 'Reporting & KPI Dashboards', description: 'Terminal throughput, dwell time, and utilization reporting on demand.' },
    ],
    benefits: [
      'Faster container turnaround',
      'Reduced manual inventory checks',
      'Fewer misplaced or lost containers',
      'Improved terminal throughput',
      'Real-time exception management',
      'Audit-ready container movement history',
    ],
    idealFor: ['Container Freight Stations', 'Ports & Terminals', 'Inland Container Depots', 'Logistics & Shipping Operators'],
  },

  '/solutions/gate-yard-dock-vision-ai': {
    seoTitle: 'AI Vision for Gates, Yards & Dock Doors | Container OCR & Reach Stacker Automation | Prosper Infotech',
    metaDescription:
      'Camera-based AI vision solutions for gate, yard, and dock door automation, with container OCR, damage inspection, and reach stacker automation.',
    intro: [
      "Prosper Infotech's Gate/Yard/Dock Vision AI solutions, powered by our YardVision AI platform, use AI cameras and edge computing to automate visual inspection across your entire operation — from gate arrival through yard movement to dock departure. Optical character recognition (OCR) automatically reads container and trailer numbers, license plates, and SCAC codes, while computer vision flags damage and exceptions in real time.",
      'Running on NVIDIA-accelerated edge hardware, our vision AI fuses camera, RFID, and GPS data to deliver a single source of truth for yard and dock activity — reducing reliance on manual spotter trucks and radio checks while integrating directly with YMS, WMS, TMS, and ERP systems.',
    ],
    keyFeatures: [
      { title: 'Container & Trailer OCR', description: 'Automatic recognition of container numbers, license plates, and SCAC codes.' },
      { title: 'OCR Damage Inspection', description: 'AI-powered visual inspection flags damage and exceptions automatically.' },
      { title: 'Reach Stacker Automation', description: 'Vision-guided automation for reach stacker positioning and container handling.' },
      { title: 'Gate Arrival & Departure Detection', description: 'Automatic logging of arrivals and departures with exception alerts.' },
      { title: 'Dock Door Monitoring', description: 'Track dock door activity and turnaround time in real time.' },
      { title: 'Camera + RFID + GPS Fusion', description: 'Combines multiple data sources for accurate, verified asset location.' },
    ],
    benefits: [
      'Reduced manual spotter truck dependency',
      'Faster gate and dock turnaround',
      'Automated damage documentation',
      'Fewer data-entry errors',
      'Real-time yard and dock visibility',
      'Fast integration with existing YMS/WMS/TMS/ERP',
    ],
    idealFor: ['Ports & Container Terminals', 'Distribution Center Docks', 'Container Freight Stations', 'Large-Scale Yard Operations'],
  },

  '/solutions/industrial-iot': {
    seoTitle: 'Industrial IoT Solutions | Edge Computing & Smart Factory Sensors | Prosper Infotech',
    metaDescription:
      'Industrial IoT solutions with edge computing, edge AI, smart factory sensors, and LoRaWAN connectivity for real-time operational data.',
    intro: [
      "Prosper Infotech's industrial IoT solutions connect sensors, PLCs, cameras, and legacy equipment into a single, secure data pipeline — turning raw factory and facility data into real-time operational insight. Built on our industrial IoT gateway platform, our edge computing solutions process data locally for low-latency response, then sync securely to the cloud or your existing systems.",
      'From smart factory sensor networks to LoRaWAN-based asset monitoring, our IoT solutions support the protocols industrial environments actually run on — Modbus, OPC UA, RTSP/ONVIF, MQTT, and more — so you can modernize without replacing equipment that already works.',
    ],
    keyFeatures: [
      { title: 'Edge Computing & Edge AI', description: 'Process sensor and camera data locally for real-time response, even offline.' },
      { title: 'Smart Factory Sensors', description: 'Connect temperature, vibration, and condition sensors across your facility.' },
      { title: 'LoRaWAN Connectivity', description: 'Long-range, low-power wireless sensor networks for large facilities.' },
      { title: 'PLC & SCADA Integration', description: 'Modbus TCP/RTU and OPC UA support for existing industrial equipment.' },
      { title: 'Secure Data Pipeline', description: 'X.509 certificates, TLS encryption, and secure element hardware.' },
      { title: 'Zero-Touch Provisioning', description: 'Deploy and update devices at scale with OTA firmware updates.' },
    ],
    benefits: [
      'Real-time visibility into equipment and facility conditions',
      'Reduced unplanned downtime',
      'Lower integration cost with legacy equipment',
      'Scales to 10,000+ connected devices',
      'Improved predictive maintenance',
      'Secure, encrypted data pipeline',
    ],
    idealFor: ['Manufacturing Plants', 'Warehouses & Distribution Centers', 'Cold Chain Facilities', 'Utilities & Industrial Sites'],
  },

  '/solutions/ai-computer-vision': {
    seoTitle: 'AI & Computer Vision Solutions | OCR, Video Analytics & Object Detection | Prosper Infotech',
    metaDescription:
      'AI-powered computer vision solutions for OCR, video analytics, object detection, and AI-based attendance and inspection.',
    intro: [
      'Prosper Infotech builds AI and computer vision solutions that turn camera feeds into structured, actionable data. Using object detection models, optical character recognition, and edge AI compute, our computer vision platform automates tasks that traditionally required manual observation — from reading container numbers to monitoring attendance and inspecting equipment for damage.',
      'Running on NVIDIA-accelerated edge hardware, our AI vision solutions process video locally for privacy and low latency, delivering real-time alerts and dashboards without sending raw video to the cloud.',
    ],
    keyFeatures: [
      { title: 'Computer Vision Solutions', description: 'Custom object detection and tracking models tuned to your operation.' },
      { title: 'Optical Character Recognition (OCR)', description: 'Automatic reading of text, license plates, and container numbers.' },
      { title: 'Video Analytics', description: 'Real-time analysis of camera feeds for activity, safety, and exceptions.' },
      { title: 'AI-Based Attendance', description: 'Face-recognition attendance tracking with IN/OUT/AWAY monitoring.' },
      { title: 'AI Inspection', description: 'Automated visual inspection for damage, defects, and compliance.' },
      { title: 'Object Detection', description: 'Real-time detection and classification of vehicles, people, and assets.' },
    ],
    benefits: [
      'Reduced manual monitoring and inspection time',
      'Faster, more accurate data capture',
      'On-premise processing for privacy',
      'Real-time alerts on exceptions',
      'Lower long-term labor cost',
      'Integrates with existing yard, dock, and facility systems',
    ],
    idealFor: ['Ports & Terminals', 'Manufacturing Facilities', 'Corporate Offices', 'Warehouses & Distribution Centers'],
  },

  '/solutions/workforce-management': {
    seoTitle: 'Workforce Management Software | HRMS, Payroll & AI Attendance | Prosper Infotech',
    metaDescription:
      'Workforce management software with HRMS, payroll, AI-powered video attendance, and productivity monitoring for offices, plants, and warehouses.',
    intro: [
      "Prosper Infotech's workforce management solutions combine HRMS, payroll, and AI-powered attendance tracking into a single platform for managing your workforce. Our video-based attendance system uses AI face recognition and multi-camera tracking to log IN, OUT, and AWAY time automatically — no badge swipes or manual sign-in sheets required.",
      'Beyond attendance, our workforce management software gives managers real productivity insights, on-premise processing for data privacy, and real-time dashboards — helping organizations track attendance, measure productivity, and improve performance across offices, plants, and warehouses.',
    ],
    keyFeatures: [
      { title: 'AI Face Recognition Attendance', description: 'Accurate, automated attendance tracking without badges or manual entry.' },
      { title: 'Multi-Camera IN/OUT/AWAY Tracking', description: 'Track presence across entry, exit, and away zones in real time.' },
      { title: 'HRMS & Payroll', description: 'Centralized employee records, payroll processing, and compliance reporting.' },
      { title: 'Productivity Insights', description: 'Real productive-time reporting based on actual presence data.' },
      { title: 'On-Premise Privacy-First Processing', description: 'Video processed locally — no footage sent to the cloud.' },
      { title: 'Real-Time Alerts & Dashboards', description: 'Live attendance and productivity dashboards for managers.' },
    ],
    benefits: [
      'Eliminate buddy-punching and manual attendance errors',
      'Accurate, real-time productivity data',
      'Improved payroll accuracy',
      'Privacy-first, on-premise video processing',
      'Faster HR reporting and compliance',
      'Scales across multiple sites and shifts',
    ],
    idealFor: ['Corporate Offices', 'Manufacturing Plants', 'Warehouses', 'Educational Institutions', 'Healthcare Facilities'],
  },
}
