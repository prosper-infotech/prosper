// Original blog content for the Resources > Blog section.
export const BLOG_POSTS = [
  {
    slug: 'signs-your-warehouse-needs-rfid',
    title: '5 Signs Your Warehouse Needs RFID Inventory Tracking',
    category: 'Warehouse Management',
    excerpt:
      "If your team is still relying on manual cycle counts and spreadsheets, these are the warning signs that it's time to move to RFID.",
    date: '2026-01-15',
    readTime: '5 min read',
    sections: [
      {
        body: "Most warehouses don't switch to RFID because they read about it — they switch because the cracks in their current process become impossible to ignore. If any of the following sound familiar, it's worth taking a closer look at what RFID could fix.",
      },
      {
        heading: '1. Cycle counts take days, not hours',
        body: "If a full inventory count means shutting down a section of the warehouse for a day — or running counts overnight to avoid disrupting operations — you're spending labor on a problem RFID solves in minutes. Fixed and handheld RFID readers can count an entire zone without anyone touching a scanner or opening a box.",
      },
      {
        heading: "2. Inventory accuracy keeps slipping",
        body: "Barcode systems are only as accurate as the last person who scanned correctly. Missed scans, mislabeled bins, and skipped steps compound over time. RFID tags get read automatically as inventory moves past a reader, which removes the human error that barcode-only systems depend on.",
      },
      {
        heading: "3. You're paying for space you can't find",
        body: "When location data is unreliable, teams start over-ordering or holding safety stock they don't actually need — because they can't trust the system to tell them what's already on hand. Real-time RFID location tracking closes that gap.",
      },
      {
        heading: '4. Pick errors are eating into margins',
        body: 'Wrong-item picks are expensive twice: once to ship the wrong order, and again to process the return. RFID-guided picking confirms the right item was pulled before it leaves the shelf, not after a customer complains.',
      },
      {
        heading: "5. You can't answer \"where is it\" in real time",
        body: "If a manager has to physically walk the floor to answer a simple location question, that's a sign your inventory data is stale the moment it's entered. RFID keeps location data current continuously, not just at count time.",
      },
      {
        body: "None of this means ripping out your existing systems. A well-scoped RFID rollout integrates with the WMS and ERP you already run — it just replaces the manual counting and scanning steps that slow everything else down.",
      },
    ],
  },

  {
    slug: 'rfid-vs-barcode',
    title: 'RFID vs. Barcode: Which Is Right for Your Operation?',
    category: 'RFID Technology',
    excerpt:
      "Barcode and RFID both track inventory, but they solve very different problems. Here's how to decide which one fits your operation.",
    date: '2026-01-22',
    readTime: '6 min read',
    sections: [
      {
        body: "The barcode-versus-RFID question comes up in almost every warehouse and yard modernization conversation. The honest answer is that neither technology is universally \"better\" — they're built for different problems.",
      },
      {
        heading: 'How barcode scanning works (and where it falls short)',
        body: 'Barcode systems require direct line of sight and a deliberate scan for every single item. That works fine at a low volume, but it means every pallet, case, or asset has to be individually pointed at a scanner. Speed and accuracy both depend entirely on the person doing the scanning.',
      },
      {
        heading: 'How RFID changes the equation',
        body: 'RFID tags can be read in bulk, without line of sight, and without a person manually aiming a scanner at each item. A fixed reader at a dock door or gate can capture dozens of tags as a pallet or trailer passes through — turning a manual counting task into a passive, automatic one.',
      },
      {
        heading: 'When barcode is still the right choice',
        body: "For low-volume operations, or assets that rarely move, barcode is often the more cost-effective option. If you're tracking a small number of SKUs with infrequent movement, the incremental accuracy and speed gains from RFID may not justify the hardware investment.",
      },
      {
        heading: 'When RFID pays for itself',
        body: 'RFID earns its cost back fastest in high-volume, high-movement environments — warehouses running frequent cycle counts, yards processing dozens of trailers a day, or operations where a single missed asset has real financial consequences (medical equipment, high-value tools, leased machinery).',
      },
      {
        heading: 'Can you use both?',
        body: "Yes, and many operations do. Barcode for slow-moving, low-value inventory; RFID for high-velocity zones, gate automation, or asset tracking. The right architecture depends on where your current process is actually losing time and accuracy — not on picking one technology across the board.",
      },
    ],
  },

  {
    slug: 'ai-vision-container-terminals',
    title: 'How AI Vision Is Changing Container Terminal Operations',
    category: 'AI & Computer Vision',
    excerpt:
      'Camera-based AI is replacing manual gate inspections and spotter trucks at ports and container terminals. Here\'s what that actually looks like in practice.',
    date: '2026-02-03',
    readTime: '6 min read',
    sections: [
      {
        body: 'Container terminals have historically relied on people — gate clerks reading container numbers, spotters driving the yard to locate trailers, inspectors walking around equipment looking for damage. AI vision is not replacing the need for oversight, but it is replacing the manual, repetitive parts of that work.',
      },
      {
        heading: 'The manual process AI vision replaces',
        body: 'A typical gate transaction involves a human reading and typing in a container number, checking for visible damage, and logging the time. Multiply that by hundreds of trailers a day, and small delays compound into real gate congestion.',
      },
      {
        heading: 'OCR at the gate',
        body: 'Optical character recognition (OCR) cameras read container numbers, chassis numbers, and license plates automatically as a trailer passes through the gate — logging the transaction without anyone typing a single character.',
      },
      {
        heading: 'Damage inspection without a human walk-around',
        body: 'Camera arrays positioned around the gate capture multiple angles of a container as it enters or exits, and computer vision models flag visible damage automatically. This creates a documented, timestamped record of condition at arrival and departure — useful for both operational and liability purposes.',
      },
      {
        heading: 'Reach stacker automation',
        body: 'Vision-guided systems can assist reach stacker operators with precise container positioning, reducing misalignment and the time spent repositioning equipment.',
      },
      {
        heading: 'What terminals should evaluate before adopting vision AI',
        body: "The real value of AI vision comes from how well it integrates with existing yard and gate systems. A vision system that captures accurate data but doesn't feed it into your YMS or TMS just creates another disconnected dashboard. Before adopting AI vision, confirm it can fuse with your existing RFID and GPS data, not just replace one manual step in isolation.",
      },
    ],
  },

  {
    slug: 'cost-of-yard-congestion',
    title: 'The True Cost of Yard Congestion (and How to Fix It)',
    category: 'Yard Management',
    excerpt:
      "Detention fees are only the visible cost of a congested yard. Here's what else it's costing you — and how yard management software fixes it.",
    date: '2026-02-12',
    readTime: '5 min read',
    sections: [
      {
        body: 'Detention and demurrage charges are the cost of yard congestion everyone talks about, because they show up on an invoice. But they are rarely the biggest cost — they are just the easiest one to point to.',
      },
      {
        heading: 'Detention and demurrage: the obvious cost',
        body: "Every extra minute a driver waits at your gate or in your yard is a cost, whether or not it triggers a formal detention charge. Multiply that across every trailer, every day, and it adds up fast.",
      },
      {
        heading: "Driver turnover you don't see coming",
        body: "Drivers remember which facilities are slow to load and unload. In a market where carriers can choose who they work with, a yard with a reputation for long waits gets deprioritized — and that shows up later as reduced carrier capacity and higher freight costs.",
      },
      {
        heading: 'The labor cost of manual trailer checks',
        body: "If your team is still walking the yard to find trailers, or radioing spotters to confirm status, that's labor spent on a task that automated RFID and GPS tracking can do continuously and passively.",
      },
      {
        heading: 'Missed appointments and cascading delays',
        body: "A single late gate transaction can push back every appointment scheduled after it. Without real-time visibility into what's actually happening at the gate and in the yard, that ripple effect is invisible until it's already caused a problem downstream.",
      },
      {
        heading: 'How automated gate and yard visibility fixes this',
        body: "Automated gate processing, RFID and GPS-based yard inventory, and real-time dwell-time alerts give yard managers the visibility to catch bottlenecks before they cascade — turning yard management from a reactive, walk-and-radio process into a proactive one.",
      },
    ],
  },

  {
    slug: 'ibm-i-modernization-options',
    title: "IBM i / AS400 Modernization: Why Rip-and-Replace Isn't Your Only Option",
    category: 'IBM i / AS400',
    excerpt:
      "Replacing a working AS400 system is expensive and risky. Here are the modernization paths that let you keep what works and upgrade what doesn't.",
    date: '2026-02-20',
    readTime: '6 min read',
    sections: [
      {
        body: "Every few years, someone suggests replacing the IBM i (AS400) system that's been quietly running core operations for decades. It's an understandable instinct — the interface looks dated, and the RPG or COBOL codebase can feel like a black box. But \"replace it\" is rarely the fastest or safest path to modernization.",
      },
      {
        heading: 'Why "just migrate off it" is bad advice',
        body: "IBM i systems are often reliable specifically because they've been refined over years of real production use. A full rewrite means re-implementing business logic that may not be fully documented anywhere except the existing code — a high-risk, high-cost undertaking with no guarantee the replacement will be more reliable.",
      },
      {
        heading: 'API-enabling your existing RPG and COBOL applications',
        body: 'Rather than rewriting business logic, you can expose it through REST APIs — letting modern web and mobile applications call into your existing IBM i programs without touching the underlying code. This is often the fastest way to connect legacy systems to modern integrations.',
      },
      {
        heading: 'Green-screen to web UI, without a rewrite',
        body: "The 5250 green-screen interface is usually the most visible complaint about IBM i systems — and it's also one of the easier things to fix. Web-based UI layers can sit on top of existing applications, giving users a modern interface without touching the business logic underneath.",
      },
      {
        heading: 'Cloud migration for IBM i, done right',
        body: 'IBM i workloads can run on IBM Power Systems in the cloud, or integrate with AWS and Azure for specific workloads, without abandoning the platform entirely. This gets you modern infrastructure benefits — scalability, disaster recovery, reduced hardware maintenance — without a full application rewrite.',
      },
      {
        heading: 'How to decide what actually needs to change',
        body: "Start by separating three things: what's broken, what's outdated but working, and what's simply unfamiliar. Modernization budget should go toward the first category — API-enabling integrations, improving the user interface, and addressing real technical debt — not toward replacing a system just because it's old.",
      },
    ],
  },

  {
    slug: 'cold-chain-reefer-monitoring',
    title: 'Cold Chain Compliance: What Reefer Monitoring Actually Prevents',
    category: 'Cold Chain',
    excerpt:
      'A single undetected temperature excursion can mean a lost shipment and a compliance violation. Here\'s what real-time reefer monitoring catches before it becomes a loss.',
    date: '2026-03-01',
    readTime: '5 min read',
    sections: [
      {
        body: "Cold chain logistics has zero margin for \"we'll catch it eventually.\" A reefer unit that fails silently for even a few hours can spoil an entire load — and by the time anyone notices, there's no fixing it, only documenting it.",
      },
      {
        heading: 'What actually causes reefer failures',
        body: "Reefer units fail for mundane reasons: low fuel, a defrost cycle that doesn't complete correctly, a door left ajar during a stop, a compressor issue that develops gradually rather than all at once. None of these are dramatic events — which is exactly why they're easy to miss with manual checks.",
      },
      {
        heading: "The gap manual spot-checks can't close",
        body: 'A driver or yard worker checking a reefer unit once at departure and once at arrival only catches problems that happen to be visible at those two moments. A temperature excursion that starts and is corrected in between — or one that starts and never gets corrected — goes undetected either way.',
      },
      {
        heading: 'What automated reefer monitoring catches',
        body: 'Continuous monitoring of temperature, fuel level, and defrost cycles means an exception triggers an alert the moment it happens, not hours later at the next scheduled check. That is the difference between catching a problem in time to act on it and finding out after the product is already compromised.',
      },
      {
        heading: 'Compliance documentation, solved',
        body: 'Beyond preventing loss, continuous reefer monitoring creates an automatic, timestamped compliance record — exactly what regulators and customers expect for temperature-sensitive freight, without anyone manually logging readings by hand.',
      },
      {
        heading: 'Building a reefer monitoring program that works',
        body: "The most effective reefer monitoring programs combine automated inspection at gate arrival and departure with continuous in-transit monitoring — so exceptions are caught whether the trailer is sitting in your yard or moving down the highway.",
      },
    ],
  },

  {
    slug: 'gps-fleet-tracking-roi',
    title: 'GPS Fleet Tracking: What Real-Time Visibility Actually Fixes',
    category: 'Fleet Management',
    excerpt:
      "GPS tracking gets sold as a dot on a map. The real return comes from what that data lets you stop doing manually — and what it catches before it becomes an incident.",
    date: '2026-03-18',
    readTime: '5 min read',
    sections: [
      {
        body: "Most fleet managers already know where their trucks are, roughly, because dispatchers are on the phone with drivers all day. GPS tracking doesn't just replace that phone call — it replaces the guesswork that happens between calls, and that's where the real savings show up.",
      },
      {
        heading: "'Where's my truck' calls disappear",
        body: 'Every inbound call asking for a location update is a dispatcher pulled away from actually dispatching. A live map that customers or internal teams can check themselves removes an entire category of interruption, not just for drivers but for the office staff fielding those calls.',
      },
      {
        heading: 'Idle time becomes visible, not anecdotal',
        body: "Fuel and engine-hour costs from excessive idling are easy to suspect and hard to prove without data. GPS-linked telematics turns 'I think that truck idles a lot' into an exact number, by vehicle, by day — which is what actually changes driver behavior or route planning.",
      },
      {
        heading: 'Geofencing catches deviations before they matter',
        body: "A truck that drifts off its assigned route or enters a restricted area triggers an alert immediately, instead of surfacing three weeks later during a fuel-cost review. For regulated freight or high-value loads, that early warning is often the entire point of the system.",
      },
      {
        heading: 'ETA accuracy compounds downstream',
        body: 'A dock or yard that knows a trailer will arrive in 12 minutes, not just "later today," can staff and stage accordingly. Real-time GPS feeding into yard management software is what turns appointment scheduling from a guess into a plan.',
      },
      {
        heading: 'What to look for in a fleet GPS platform',
        body: "The hardware is the easy part — most GPS trackers report similar data. The differentiator is whether that data integrates with your existing dispatch, yard, and maintenance systems, or whether it becomes one more standalone dashboard your team has to remember to check.",
      },
    ],
  },

  {
    slug: 'video-attendance-vs-biometric',
    title: "Video-Based Attendance vs. Biometric Scanners: What's the Difference?",
    category: 'Workforce Management',
    excerpt:
      "Fingerprint and face scanners aren't the only way to automate attendance anymore. Here's how camera-based attendance compares — and why it's winning out in some facilities.",
    date: '2026-04-02',
    readTime: '5 min read',
    sections: [
      {
        body: "Biometric time clocks solved the buddy-punching problem, but they introduced new ones: shared touchpoints, enrollment friction, and — increasingly — employee pushback over storing fingerprint or facial biometric data. Video-based attendance is a different approach to the same problem.",
      },
      {
        heading: 'How video-based attendance actually works',
        body: 'Instead of requiring each worker to touch or scan a device, cameras positioned at entry points recognize and log employees as they pass through — no physical contact, no queue forming at a single scanner during shift change.',
      },
      {
        heading: 'The privacy and compliance angle',
        body: "Biometric data — fingerprints, facial templates — falls under stricter data-privacy regulations in many states and countries, and employees are increasingly wary of it being stored indefinitely. Video-based systems that process recognition on-premise, without exporting biometric templates off-site, sidestep a real and growing compliance concern.",
      },
      {
        heading: 'Throughput at shift change',
        body: "A single fingerprint or badge scanner creates a bottleneck when fifty people need to clock in within a five-minute window. Camera-based recognition at multiple entry points processes that same crowd without a physical line forming.",
      },
      {
        heading: 'Where biometric scanners still make sense',
        body: "For small teams, single-entry facilities, or environments where cameras aren't practical (certain cleanroom or secure-area requirements), a badge or fingerprint scanner is still a simpler, cheaper option. Video-based attendance earns its cost at scale — multiple entrances, high headcount, or shift patterns that create crowding.",
      },
      {
        heading: 'Integration matters more than the capture method',
        body: "Whichever method you choose, the real value comes from attendance data flowing directly into payroll and HRMS without manual reconciliation. A capture method that isn't connected to your existing systems just moves the manual work from the time clock to a spreadsheet.",
      },
    ],
  },

  {
    slug: 'edge-ai-vs-cloud-ai-inspection',
    title: 'Edge AI vs. Cloud AI: Where Should Your Inspection Models Actually Run?',
    category: 'Edge AI & IoT',
    excerpt:
      "Running AI inference on-site instead of in the cloud isn't just a latency decision — it changes what you can monitor, how fast you find out, and what data leaves your facility.",
    date: '2026-04-20',
    readTime: '6 min read',
    sections: [
      {
        body: "Cloud AI and edge AI can run the same model and produce the same detection — the difference is where the inference actually happens, and that decision has real operational consequences most teams don't think through until after deployment.",
      },
      {
        heading: 'The latency problem cloud inference creates',
        body: "Sending every camera frame to the cloud for processing, then waiting for a response, adds delay — usually small, but not zero. For a gate camera that just needs to log a container number after the fact, that's fine. For a safety system meant to stop equipment before a collision, a few hundred milliseconds is the difference between a warning and an incident report.",
      },
      {
        heading: 'Connectivity you can\'t always count on',
        body: 'Yards, ports, and remote industrial sites don\'t always have reliable, high-bandwidth connectivity. An edge AI box keeps inspecting, detecting, and logging locally even when the uplink to the cloud drops — buffering and syncing once connectivity returns, instead of going blind.',
      },
      {
        heading: 'Bandwidth costs add up fast at scale',
        body: "Streaming continuous high-resolution video from dozens of cameras to the cloud for processing is expensive, both in bandwidth and in cloud compute. Running inference at the edge and sending only the results — events, alerts, metadata — cuts that cost dramatically.",
      },
      {
        heading: 'Keeping sensitive footage on-site',
        body: "For facilities with contractual or regulatory restrictions on where video data can be stored or transmitted, edge processing means raw footage never has to leave the building. Only the derived data — a detection, a count, an alert — goes to the cloud.",
      },
      {
        heading: 'The hybrid answer most deployments land on',
        body: "In practice, most production systems use both: edge AI for real-time detection and safety-critical response, cloud for aggregation, long-term analytics, and cross-site dashboards. The question isn't edge versus cloud — it's which decisions need to happen in milliseconds on-site, and which can wait for a dashboard.",
      },
    ],
  },

  {
    slug: 'rfid-asset-tracking-healthcare',
    title: 'RFID Asset Tracking in Healthcare: Beyond Just Finding Equipment',
    category: 'Asset Tracking',
    excerpt:
      "Locating a missing infusion pump is the obvious use case. The bigger return from RFID asset tracking in healthcare comes from what it prevents, not just what it finds.",
    date: '2026-05-05',
    readTime: '5 min read',
    sections: [
      {
        body: "Ask any hospital biomed team what their day looks like, and 'searching for equipment' is usually near the top. RFID asset tracking gets pitched around solving that specific pain point — but in practice, the bigger wins show up in areas that never make the initial sales conversation.",
      },
      {
        heading: 'The obvious win: finding equipment faster',
        body: "Infusion pumps, wheelchairs, and monitors that wander between floors and departments cost real staff time to track down. A real-time RFID location system turns 'has anyone seen the third pump' into a two-second lookup.",
      },
      {
        heading: 'Rental and loaner equipment reconciliation',
        body: "Hospitals often rent specialized equipment for temporary needs, billed by the day. Without accurate tracking, rental units linger on-site past their return date and keep accruing charges. RFID tagging on rental equipment flags exactly when and where a unit needs to go back.",
      },
      {
        heading: 'Preventive maintenance compliance',
        body: 'Equipment due for calibration or preventive maintenance is easy to miss when biomed teams don\'t know where a given asset physically is. Location tracking combined with maintenance scheduling means a unit overdue for service can be found and pulled, not discovered broken during a code.',
      },
      {
        heading: 'Shrinkage and loss prevention',
        body: "High-value portable equipment — ultrasound units, specialty monitors — has a way of disappearing between facilities or during transfers. RFID gate readers at exits and elevators create an automatic record of when a tagged asset leaves a zone it shouldn't, without adding a security checkpoint.",
      },
      {
        heading: 'What makes a healthcare RFID deployment succeed',
        body: "The clinical environment adds constraints a warehouse doesn't have — tags need to survive sterilization cycles, readers can't interfere with medical equipment, and staff workflows can't be disrupted. A deployment scoped around actual clinical workflows, not just asset counts, is what determines whether the system gets used or gets ignored.",
      },
    ],
  },
]
