// Launch catalogue for the online shop (PLACEHOLDER CONTENT, plan section 5).
// Pure data: used to seed the database, by the local development store, and as
// the browser's fallback when the shop API cannot be reached.
import { PRODUCT_SEO, CATEGORY_SEO } from './seo.js'
import { RANGE_CATEGORIES, RANGE_PRODUCTS } from './range.js'

// Every product is seeded with no price, so it shows "Request price" until a
// price and stock are added in the admin screen.

const RAW_CATEGORIES = [
  {
    slug: 'tags-labels',
    name: 'Tags & Labels',
    description:
      'The tag is what gets attached to the asset. Pick the one that suits the surface it will sit on and the place it will live.',
    sort_order: 1,
    icon: 'tag',
  },
  {
    slug: 'readers-antennas',
    name: 'Readers & Antennas',
    description:
      'Handheld readers for counting and finding items, fixed readers and antennas for gates, dock doors and conveyors.',
    sort_order: 3,
    icon: 'radio',
  },
  {
    slug: 'barcode-scanners',
    name: 'Barcode Scanners',
    description:
      'A low-cost way to track stock, parcels and documents with barcodes and QR codes. They work with our software too.',
    sort_order: 4,
    icon: 'scan',
  },
  {
    slug: 'printers-encoders',
    name: 'Printers & Encoders',
    description: 'Print and encode your own labels in-house, from a few labels a day to thousands.',
    sort_order: 6,
    icon: 'printer',
  },
  {
    slug: 'edge-iot',
    name: 'Edge & IoT Devices',
    description: 'Edge AI boxes and industrial gateways for projects that need on-site computing. Sold by quote.',
    sort_order: 11,
    icon: 'cpu',
  },
]

export const SEED_CATEGORIES = [...RAW_CATEGORIES, ...RANGE_CATEGORIES]
  .map((c) => ({ ...c, description: CATEGORY_SEO[c.slug]?.intro || c.description || '' }))
  .sort((a, b) => a.sort_order - b.sort_order)

const p = (sku, slug, category, name, short_description, specs, extra = {}) => ({
  sku,
  slug,
  category,
  name,
  brand: 'Prosper Infotech',
  short_description,
  long_description: '',
  specs: specs.map(([label, value]) => ({ label, value })),
  images: [],
  datasheet_url: null,
  price_paise: null,
  mrp_paise: null,
  gst_percent: 18,
  hsn_code: '',
  stock_qty: 0,
  min_order_qty: 1,
  weight_grams: null,
  is_active: true,
  is_featured: false,
  quote_only: false,
  ...extra,
})

const RAW_PRODUCTS = [
  p('PI-TAG-001', 'uhf-rfid-paper-labels', 'tags-labels', 'UHF RFID Paper Labels',
    'Cartons, files, boxes, documents and retail stock.',
    [['Frequency', 'UHF 860-960 MHz'], ['Standard', 'EPC Gen2 / ISO 18000-6C'], ['Format', 'Self-adhesive label, roll or sheet'], ['Surface', 'Paper, cardboard, plastic']],
    { images: ['/shop/products/uhf-paper-labels.jpg'], is_featured: true }),
  p('PI-TAG-002', 'on-metal-rfid-tags', 'tags-labels', 'On-Metal RFID Tags',
    'IT equipment, tools, machines, racks and metal cabinets.',
    [['Frequency', 'UHF 860-960 MHz'], ['Standard', 'EPC Gen2 / ISO 18000-6C'], ['Format', 'Hard tag, adhesive or screw mount'], ['Surface', 'Metal and mixed surfaces']],
    {}),
  p('PI-TAG-003', 'rugged-outdoor-rfid-tags', 'tags-labels', 'Rugged Outdoor RFID Tags',
    'Containers, trailers, pallets, cylinders and yard assets.',
    [['Frequency', 'UHF 860-960 MHz'], ['Durability', 'Weather, UV and impact resistant'], ['Format', 'Hard tag, bolt or strap mount'], ['Use', 'Indoor and outdoor']],
    { images: ['/shop/products/rugged-outdoor-tags.jpg'], is_featured: true }),
  p('PI-TAG-004', 'cable-tie-and-hang-tags', 'tags-labels', 'Cable-Tie and Hang Tags',
    'Garments, bags, cables, tools and items with no flat surface.',
    [['Frequency', 'UHF 860-960 MHz'], ['Standard', 'EPC Gen2 / ISO 18000-6C'], ['Format', 'Cable-tie or hang tag'], ['Use', 'Reusable or single use']],
    {}),

  p('PI-RDR-001', 'handheld-uhf-rfid-reader', 'readers-antennas', 'Handheld UHF RFID Reader',
    'Stock counts, audits, asset checks and finding a missing item.',
    [['Frequency', 'UHF 860-960 MHz'], ['Platform', 'Android handheld with trigger'], ['Connectivity', 'Wi-Fi, Bluetooth, optional 4G'], ['Works with', 'Prosper Asset Tracking app']],
    { images: ['/shop/products/handheld-uhf-reader.jpg'], is_featured: true }),
  p('PI-RDR-002', '4-port-fixed-rfid-reader', 'readers-antennas', '4-Port Fixed RFID Reader',
    'Gates, dock doors, conveyors and portals with continuous reads.',
    [['RF Chip', 'Impinj E710'], ['Read Speed', '1000+ tags per second'], ['Ports', '4 antenna ports'], ['Power', 'DC 12V or PoE']],
    { images: ['/shop/products/fixed-rfid-reader.jpg'], is_featured: true }),
  p('PI-RDR-003', 'rfid-antennas', 'readers-antennas', 'RFID Antennas',
    'Gate, portal and shelf coverage for fixed readers.',
    [['Frequency', 'UHF 860-960 MHz'], ['Polarization', 'Circular or linear'], ['Mounting', 'Wall, ceiling or pole'], ['Use', 'Indoor and outdoor models']],
    {}),
  p('PI-RDR-004', 'antenna-integrated-rfid-reader', 'readers-antennas', 'Antenna Integrated RFID Reader',
    'RFID, GPS and 4G LTE in a single standalone device. Coming soon.',
    [['Radios', 'UHF RFID, GPS, 4G LTE'], ['Antenna', 'Built in'], ['Use', 'Vehicles, gates and remote sites'], ['Status', 'Coming soon']],
    { quote_only: true }),

  p('PI-SCN-001', 'handheld-barcode-scanner', 'barcode-scanners', 'Handheld Barcode Scanner (1D / 2D)',
    'Billing counters, stores, stock rooms and dispatch desks.',
    [['Reads', '1D barcodes, 2D codes and QR'], ['Connection', 'USB wired'], ['Use', 'Plug and play, works like a keyboard'], ['Build', 'Drop resistant housing']],
    { is_featured: true }),
  p('PI-SCN-002', 'wireless-barcode-scanner', 'barcode-scanners', 'Wireless Barcode Scanner',
    'Warehouses, shop floors and large counters where a cable gets in the way.',
    [['Reads', '1D barcodes, 2D codes and QR'], ['Connection', 'Bluetooth or 2.4 GHz wireless'], ['Battery', 'Rechargeable, full-shift use'], ['Range', 'Long range with charging cradle']],
    {}),
  p('PI-SCN-003', 'mobile-computer-with-barcode-scanner', 'barcode-scanners', 'Mobile Computer with Barcode Scanner',
    'Stock counts, picking, proof of delivery and field audits.',
    [['Platform', 'Android handheld with touch screen'], ['Scanner', 'Built-in 1D / 2D imager and camera'], ['Connectivity', 'Wi-Fi, Bluetooth, 4G, NFC'], ['Build', 'Rugged, drop and dust resistant']],
    {}),
  p('PI-SCN-004', 'fixed-mount-barcode-scanner', 'barcode-scanners', 'Fixed-Mount Barcode Scanner',
    'Conveyors, sorting lines, kiosks and gates that scan without anyone holding it.',
    [['Reads', '1D barcodes, 2D codes and QR'], ['Mounting', 'Bracket or tunnel mount'], ['Connection', 'USB, RS-232 or Ethernet'], ['Use', 'Hands-free, continuous scanning']],
    {}),
  p('PI-SCN-005', 'tabletop-barcode-scanner', 'barcode-scanners', 'Tabletop Barcode Scanner',
    'Retail counters, pharmacies and self-service desks.',
    [['Reads', '1D barcodes, 2D codes and QR, including phone screens'], ['Mode', 'Hands-free, with stand'], ['Connection', 'USB'], ['Use', 'Fast scanning at the counter']],
    {}),

  p('PI-PRN-001', 'desktop-rfid-printer-encoder', 'printers-encoders', 'Desktop RFID Printer / Encoder',
    'Small batches of labels printed and encoded at the desk.',
    [['Printing', 'Thermal transfer'], ['Encoding', 'UHF EPC Gen2'], ['Volume', 'Low to medium daily use'], ['Connectivity', 'USB and Ethernet']],
    {}),
  p('PI-PRN-002', 'industrial-rfid-printer-encoder', 'printers-encoders', 'Industrial RFID Printer / Encoder',
    'High-volume tagging in warehouses and production lines.',
    [['Printing', 'Thermal transfer, rugged build'], ['Encoding', 'UHF EPC Gen2'], ['Volume', 'High, all-day use'], ['Connectivity', 'USB, Ethernet, optional Wi-Fi']],
    {}),
  p('PI-PRN-003', 'barcode-label-printer', 'printers-encoders', 'Barcode Label Printer',
    'Asset labels, shipping labels and shelf labels with barcodes and QR codes.',
    [['Printing', 'Thermal transfer or direct thermal'], ['Codes', 'Barcodes, QR codes, text and logos'], ['Volume', 'Desktop to industrial models'], ['Connectivity', 'USB and Ethernet']],
    { is_featured: true }),
  p('PI-PRN-004', 'blank-rfid-labels-and-ribbons', 'printers-encoders', 'Blank RFID Labels and Ribbons',
    'Consumables for your RFID printer, in the sizes you need.',
    [['Labels', 'Printable RFID inlay labels'], ['Ribbons', 'Wax and resin options'], ['Sizes', 'Custom sizes on request'], ['Supply', 'Rolls, in bulk']],
    {}),

  p('PI-EDG-001', 'ai-edge-box', 'edge-iot', 'AI Edge Box',
    'On-site AI computing for cameras and vision projects. Powered by NVIDIA Jetson Orin NX.',
    [['Processor', 'NVIDIA Jetson Orin NX'], ['Use', 'Vision AI, OCR and ANPR at the edge'], ['Inputs', 'Multiple IP cameras'], ['Sold as', 'Part of a project, by quote']],
    { quote_only: true }),
  p('PI-EDG-002', 'iot-gateway', 'edge-iot', 'IoT Gateway',
    'Industrial edge gateway that connects sensors, PLCs and readers to your software.',
    [['Platform', 'Raspberry Pi CM4 / CM5'], ['Connectivity', 'Ethernet, Wi-Fi, 4G, RS-485'], ['Use', 'Sensors, PLCs and RFID readers'], ['Sold as', 'Part of a project, by quote']],
    { quote_only: true }),
]

// Names, search titles and descriptions come from shared/seo.js.
// The wider range (shared/range.js) has its names and search text built in.
export const SEED_PRODUCTS = [
  ...RAW_PRODUCTS.map((p) => ({ ...p, ...(PRODUCT_SEO[p.sku] || {}) })),
  ...RANGE_PRODUCTS.map((r) => ({ ...p(r.sku, r.slug, r.category, r.name, r.short_description, []), ...r })),
]

// Default shop settings. Editable in the admin screen. Amounts are in paise.
export const DEFAULT_SETTINGS = {
  shipping_flat_paise: 15000,
  free_shipping_threshold_paise: 500000,
  shipping_gst_percent: 18,
  delivery_days_min: 3,
  delivery_days_max: 7,
  low_stock_threshold: 5,
  support_email: 'sales@prosperinfotech.com',
  support_phone: '+91 92268 91830',
  whatsapp_number: '919226891830',
  invoice_prefix: 'PI/',
  seller: {
    legal_name: 'Prosper Infotech',
    gstin: '',
    address: 'Ganesham A Commercial, Office No. 17-18, 3rd Floor, Pimple Saudagar, Pune 411027',
    state: 'Maharashtra',
  },
  bank: { account_name: '', account_number: '', ifsc: '', bank_name: '', branch: '' },
  upi_id: '',
  // Orders are placed without paying online: the sales team calls the customer to
  // confirm payment and delivery. Set to false to bring back the payment step.
  direct_orders: true,
}
