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
]
