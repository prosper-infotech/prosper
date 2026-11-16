import labelTag from '../assets/asset-tracking-card-rfid-label-tag.jpg'
import ruggedTag from '../assets/asset-tracking-card-rugged-tag.jpg'
import handheldReader from '../assets/asset-tracking-card-handheld-reader.jpg'
import fixedReader from '../assets/asset-tracking-card-fixed-reader.jpg'

// PLACEHOLDER CONTENT. Product names, specs and images are generic until the
// real catalogue is ready. To update a product, edit its entry here — the page,
// quote form and structured data all read from this file.
// - `image: null` shows a themed placeholder panel with the category icon.
// - `to` (optional) links the card to a page with full specs.

export const CATEGORIES = [
  {
    key: 'tags',
    label: 'Tags & Labels',
    heading: 'RFID tags and labels',
    intro:
      'The tag is what gets attached to the asset. Pick the one that suits the surface it will sit on and the place it will live.',
  },
  {
    key: 'readers',
    label: 'Readers & Antennas',
    heading: 'RFID readers and antennas',
    intro:
      'Handheld readers for counting and finding items, fixed readers and antennas for gates, dock doors and conveyors.',
  },
  {
    key: 'scanners',
    label: 'Barcode Scanners',
    heading: 'Barcode and QR scanners',
    intro:
      'Not every item needs an RFID tag. Barcode and QR scanners are a low-cost way to track stock, parcels and documents, and they work with our software too.',
  },
  {
    key: 'printers',
    label: 'Printers & Encoders',
    heading: 'RFID printers and encoders',
    intro: 'Print and encode your own labels in-house, from a few labels a day to thousands.',
  },
]

export const RFID_PRODUCTS = [
  {
    key: 'uhf-paper-labels',
    category: 'tags',
    name: 'UHF RFID Paper Labels',
    useCase: 'Cartons, files, boxes, documents and retail stock.',
    image: labelTag,
    specs: [
      { label: 'Frequency', value: 'UHF 860-960 MHz' },
      { label: 'Standard', value: 'EPC Gen2 / ISO 18000-6C' },
      { label: 'Format', value: 'Self-adhesive label, roll or sheet' },
      { label: 'Surface', value: 'Paper, cardboard, plastic' },
    ],
  },
  {
    key: 'on-metal-tags',
    category: 'tags',
    name: 'On-Metal RFID Tags',
    useCase: 'IT equipment, tools, machines, racks and metal cabinets.',
    image: null,
    specs: [
      { label: 'Frequency', value: 'UHF 860-960 MHz' },
      { label: 'Standard', value: 'EPC Gen2 / ISO 18000-6C' },
      { label: 'Format', value: 'Hard tag, adhesive or screw mount' },
      { label: 'Surface', value: 'Metal and mixed surfaces' },
    ],
  },
  {
    key: 'rugged-outdoor-tags',
    category: 'tags',
    name: 'Rugged Outdoor RFID Tags',
    useCase: 'Containers, trailers, pallets, cylinders and yard assets.',
    image: ruggedTag,
    specs: [
      { label: 'Frequency', value: 'UHF 860-960 MHz' },
      { label: 'Durability', value: 'Weather, UV and impact resistant' },
      { label: 'Format', value: 'Hard tag, bolt or strap mount' },
      { label: 'Use', value: 'Indoor and outdoor' },
    ],
  },
  {
    key: 'cable-tie-tags',
    category: 'tags',
    name: 'Cable-Tie and Hang Tags',
    useCase: 'Garments, bags, cables, tools and items with no flat surface.',
    image: null,
    specs: [
      { label: 'Frequency', value: 'UHF 860-960 MHz' },
      { label: 'Standard', value: 'EPC Gen2 / ISO 18000-6C' },
      { label: 'Format', value: 'Cable-tie or hang tag' },
      { label: 'Use', value: 'Reusable or single use' },
    ],
  },
  {
    key: 'handheld-uhf-reader',
    category: 'readers',
    name: 'Handheld UHF RFID Reader',
    useCase: 'Stock counts, audits, asset checks and finding a missing item.',
    image: handheldReader,
    specs: [
      { label: 'Frequency', value: 'UHF 860-960 MHz' },
      { label: 'Platform', value: 'Android handheld with trigger' },
      { label: 'Connectivity', value: 'Wi-Fi, Bluetooth, optional 4G' },
      { label: 'Works with', value: 'Prosper Asset Tracking app' },
    ],
  },
  {
    key: 'fixed-rfid-reader',
    category: 'readers',
    name: '4-Port Fixed RFID Reader',
    useCase: 'Gates, dock doors, conveyors and portals with continuous reads.',
    image: fixedReader,
    to: '/products/hardware#fixed-rfid-reader',
    specs: [
      { label: 'RF Chip', value: 'Impinj E710' },
      { label: 'Read Speed', value: '1000+ tags per second' },
      { label: 'Ports', value: '4 antenna ports' },
      { label: 'Power', value: 'DC 12V or PoE' },
    ],
  },
  {
    key: 'rfid-antennas',
    category: 'readers',
    name: 'RFID Antennas',
    useCase: 'Gate, portal and shelf coverage for fixed readers.',
    image: null,
    specs: [
      { label: 'Frequency', value: 'UHF 860-960 MHz' },
      { label: 'Polarization', value: 'Circular or linear' },
      { label: 'Mounting', value: 'Wall, ceiling or pole' },
      { label: 'Use', value: 'Indoor and outdoor models' },
    ],
  },
  {
    key: 'handheld-barcode-scanner',
    category: 'scanners',
    name: 'Handheld Barcode Scanner (1D / 2D)',
    useCase: 'Billing counters, stores, stock rooms and dispatch desks.',
    image: null,
    specs: [
      { label: 'Reads', value: '1D barcodes, 2D codes and QR' },
      { label: 'Connection', value: 'USB wired' },
      { label: 'Use', value: 'Plug and play, works like a keyboard' },
      { label: 'Build', value: 'Drop resistant housing' },
    ],
  },
  {
    key: 'wireless-barcode-scanner',
    category: 'scanners',
    name: 'Wireless Barcode Scanner',
    useCase: 'Warehouses, shop floors and large counters where a cable gets in the way.',
    image: null,
    specs: [
      { label: 'Reads', value: '1D barcodes, 2D codes and QR' },
      { label: 'Connection', value: 'Bluetooth or 2.4 GHz wireless' },
      { label: 'Battery', value: 'Rechargeable, full-shift use' },
      { label: 'Range', value: 'Long range with charging cradle' },
    ],
  },
  {
    key: 'mobile-barcode-computer',
    category: 'scanners',
    name: 'Mobile Computer with Barcode Scanner',
    useCase: 'Stock counts, picking, proof of delivery and field audits.',
    image: null,
    specs: [
      { label: 'Platform', value: 'Android handheld with touch screen' },
      { label: 'Scanner', value: 'Built-in 1D / 2D imager and camera' },
      { label: 'Connectivity', value: 'Wi-Fi, Bluetooth, 4G, NFC' },
      { label: 'Build', value: 'Rugged, drop and dust resistant' },
    ],
  },
  {
    key: 'fixed-mount-scanner',
    category: 'scanners',
    name: 'Fixed-Mount Barcode Scanner',
    useCase: 'Conveyors, sorting lines, kiosks and gates that scan without anyone holding it.',
    image: null,
    specs: [
      { label: 'Reads', value: '1D barcodes, 2D codes and QR' },
      { label: 'Mounting', value: 'Bracket or tunnel mount' },
      { label: 'Connection', value: 'USB, RS-232 or Ethernet' },
      { label: 'Use', value: 'Hands-free, continuous scanning' },
    ],
  },
  {
    key: 'tabletop-barcode-scanner',
    category: 'scanners',
    name: 'Tabletop Barcode Scanner',
    useCase: 'Retail counters, pharmacies and self-service desks.',
    image: null,
    specs: [
      { label: 'Reads', value: '1D barcodes, 2D codes and QR, including phone screens' },
      { label: 'Mode', value: 'Hands-free, with stand' },
      { label: 'Connection', value: 'USB' },
      { label: 'Use', value: 'Fast scanning at the counter' },
    ],
  },
  {
    key: 'desktop-rfid-printer',
    category: 'printers',
    name: 'Desktop RFID Printer / Encoder',
    useCase: 'Small batches of labels printed and encoded at the desk.',
    image: null,
    specs: [
      { label: 'Printing', value: 'Thermal transfer' },
      { label: 'Encoding', value: 'UHF EPC Gen2' },
      { label: 'Volume', value: 'Low to medium daily use' },
      { label: 'Connectivity', value: 'USB and Ethernet' },
    ],
  },
  {
    key: 'industrial-rfid-printer',
    category: 'printers',
    name: 'Industrial RFID Printer / Encoder',
    useCase: 'High-volume tagging in warehouses and production lines.',
    image: null,
    specs: [
      { label: 'Printing', value: 'Thermal transfer, rugged build' },
      { label: 'Encoding', value: 'UHF EPC Gen2' },
      { label: 'Volume', value: 'High, all-day use' },
      { label: 'Connectivity', value: 'USB, Ethernet, optional Wi-Fi' },
    ],
  },
  {
    key: 'barcode-label-printer',
    category: 'printers',
    name: 'Barcode Label Printer',
    useCase: 'Asset labels, shipping labels and shelf labels with barcodes and QR codes.',
    image: null,
    specs: [
      { label: 'Printing', value: 'Thermal transfer or direct thermal' },
      { label: 'Codes', value: 'Barcodes, QR codes, text and logos' },
      { label: 'Volume', value: 'Desktop to industrial models' },
      { label: 'Connectivity', value: 'USB and Ethernet' },
    ],
  },
  {
    key: 'labels-and-ribbons',
    category: 'printers',
    name: 'Blank RFID Labels and Ribbons',
    useCase: 'Consumables for your RFID printer, in the sizes you need.',
    image: null,
    specs: [
      { label: 'Labels', value: 'Printable RFID inlay labels' },
      { label: 'Ribbons', value: 'Wax and resin options' },
      { label: 'Sizes', value: 'Custom sizes on request' },
      { label: 'Supply', value: 'Rolls, in bulk' },
    ],
  },
]

export const RFID_FAQS = [
  {
    question: 'Do you sell RFID tags and readers in small quantities?',
    answer:
      'Yes. You can order a few tags and one reader to test in your own site, then scale up once it works. Tell us the quantity in your enquiry and we will quote for it.',
  },
  {
    question: 'Should I use RFID or barcodes?',
    answer:
      'Barcodes are cheap and work well when you can scan each item one at a time. RFID reads many items at once without a clear line of sight, so it suits gates, dock doors and fast stock counts. Many sites use both. Tell us how you work and we will suggest the right mix.',
  },
  {
    question: 'How do I know which RFID tag is right for my asset?',
    answer:
      'It depends on what the asset is made of and where it sits. Metal needs an on-metal tag, outdoor assets need a rugged tag, and cartons and files can use a paper label. Send us a photo or description of the asset and we will suggest one.',
  },
  {
    question: 'Will these products work with Prosper Asset Tracking?',
    answer:
      'Yes. Our tags, readers and printers are chosen to work together with Prosper Asset Tracking and our RFID and GPS software, so there is no extra integration work on your side.',
  },
  {
    question: 'Can you install the readers and set up the system?',
    answer:
      'Yes. Our RFID services team can plan the layout, install fixed readers and antennas, connect everything to your software and train your staff.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery depends on the product and quantity. Common tags and readers usually ship quickly; larger or custom orders take longer. We confirm the delivery time in your quote.',
  },
  {
    question: 'Do the products come with a warranty?',
    answer:
      'Yes. Warranty terms depend on the product and are listed in your quote, so you know what is covered before you order.',
  },
]
