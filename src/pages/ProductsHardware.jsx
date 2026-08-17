import { Radio, Satellite, Cpu, Server, Check } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const PRODUCTS = [
  {
    key: 'fixed-rfid-reader',
    icon: Radio,
    name: '4 Port Fixed RFID Reader',
    tagline: 'Industrial UHF RFID reader built on the Impinj E710 chip',
    description:
      'EPC Global Gen2 / ISO 18000-6C compliant fixed reader for long-range, high-speed tag reads in demanding warehouse and yard environments.',
    specs: [
      { label: 'RF Chip', value: 'Impinj E710' },
      { label: 'Frequency', value: 'EU 865-868MHz / NA 902-928MHz' },
      { label: 'RF Power Output', value: '5-33 dBm' },
      { label: 'Read Distance', value: 'Over 13 meters' },
      { label: 'Read Speed', value: '1000+ tags/sec' },
      { label: 'Tag Cache', value: '1000 tags (96-bit EPC)' },
      { label: 'CPU', value: 'ARM7 (HC32F460JEUA)' },
      { label: 'Dimensions', value: '208.8 x 156.2 x 27.5 mm' },
      { label: 'Weight', value: '1200 g' },
      { label: 'Operating Temp', value: '-25°C to +65°C' },
    ],
    features: [
      'Ethernet (10/100 Base-T), RS232, RS485, Wiegand',
      'Optional 4G, WiFi, Bluetooth',
      'DC 12V or POE (802.3af/802.3at) power',
      'Aluminum alloy industrial enclosure',
      'API support for C#/.NET, Java, Python',
    ],
  },
  {
    key: 'antenna-integrated-reader',
    icon: Satellite,
    name: 'Antenna Integrated RFID Reader',
    tagline: 'RFID + GPS + 4G LTE in a single standalone device',
    badge: 'Coming Soon',
    description:
      'A self-contained, industrial-grade device combining RFID reading, GPS positioning, and 4G LTE connectivity — no external gateway required.',
    specs: [
      { label: 'Operating Temp', value: '-25°C to +70°C' },
      { label: 'Connectivity', value: 'Built-in 4G LTE + GPS' },
      { label: 'Power Recovery', value: 'Auto-start & auto-recovery after power loss' },
      { label: 'Design', value: 'Lightweight, low power consumption' },
    ],
    features: [
      'Built-in RFID reader & antenna',
      'Integrated GPS with timestamp correlation',
      'Speed and dwell analysis',
      'Standalone operation, plug-and-play deployment',
      'REST APIs and MQTT support',
      'Movement and status intelligence detection',
    ],
  },
  {
    key: 'ai-edge-box',
    icon: Cpu,
    name: 'AI Edge Box',
    tagline: 'Powered by NVIDIA Jetson Orin NX',
    description:
      'Compact, industrial-grade edge AI computer delivering real-time computer vision performance at the yard or dock.',
    specs: [
      { label: 'Processor', value: 'NVIDIA Jetson Orin NX 16GB' },
      { label: 'AI Performance', value: 'Up to ~157 TOPS' },
      { label: 'Memory', value: '16 GB LPDDR5' },
      { label: 'Storage', value: '128 GB NVMe SSD' },
      { label: 'Video Output', value: 'HDMI 2.1' },
      { label: 'Camera Inputs', value: '2x CSI' },
      { label: 'USB', value: '4x USB 3.2' },
      { label: 'Network', value: 'RJ45 Ethernet, CAN, GPIO' },
      { label: 'OS', value: 'Linux + NVIDIA JetPack' },
    ],
    features: [
      'M.2 Key E (wireless) and Key M (SSD/modules) expansion',
      'Edge / on-premises deployment',
      'Built for yard inventory, video analytics, gate monitoring, and attendance AI',
    ],
  },
  {
    key: 'iot-gateway',
    icon: Server,
    name: 'IoT Gateway',
    tagline: 'Industrial edge gateway built on Raspberry Pi CM4/CM5',
    description:
      'Protocol-rich industrial gateway that bridges RFID, sensors, PLCs, and cameras into a single secure data stream.',
    specs: [
      { label: 'Core Hardware', value: 'Industrial IO board, Raspberry Pi CM4/CM5' },
      { label: 'Connectivity', value: '4G/LTE (EC25), Wi-Fi, Ethernet, GPS/GNSS' },
      { label: 'Industrial I/O', value: 'RS485, RS232, CAN, USB, GPIO' },
      { label: 'Security', value: 'X.509 certificates, TLS, TPM/ATECC608' },
    ],
    features: [
      'RFID (UHF EPC) via LLRP 5084/5086',
      'Modbus TCP/RTU and OPC UA for PLC/PAC integration',
      'RTSP/ONVIF for camera integration',
      'BLE, Zigbee, LoRaWAN wireless support',
      'MQTT and HTTP/REST messaging',
      'Local SQLite/NVMe buffering',
      'Zero-touch provisioning & OTA firmware updates',
      'Scalable to 10,000+ devices',
    ],
  },
]

export default function ProductsHardware() {
  useDocumentTitle(
    'RFID Readers, GPS Devices & AI Edge Hardware | Prosper Infotech',
    'Industrial-grade RFID readers, GPS-enabled edge devices, AI Edge Box, and IoT gateways engineered for continuous operation in warehouses, yards, and ports.'
  )

  return (
    <>
      <Breadcrumb title="Hardware" parent="Products" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Hardware
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Industrial-grade devices built for the edge
          </h2>
          <p className="text-ink-600 text-lg">
            Fixed and integrated RFID readers, GPS-enabled edge devices, AI vision computers, and
            IoT gateways — engineered for continuous operation in warehouses, yards, and ports.
          </p>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-8">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon
            return (
              <Reveal key={product.key} delay={i * 0.05}>
                <div
                  id={product.key}
                  className="scroll-mt-32 rounded-2xl border border-ink-300 bg-white shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading font-semibold text-xl text-primary">
                          {product.name}
                        </h3>
                        {product.badge && (
                          <span className="rounded-full bg-gold/20 text-primary text-xs font-semibold px-3 py-1">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-ink-500">{product.tagline}</p>
                      <p className="mt-2 text-sm text-ink-600">{product.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                        Specifications
                      </h4>
                      <div className="flex flex-col divide-y divide-ink-300 rounded-lg border border-ink-300 overflow-hidden">
                        {product.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="flex items-start justify-between gap-4 bg-surface-alt px-4 py-2.5 text-sm"
                          >
                            <span className="text-ink-500">{spec.label}</span>
                            <span className="text-ink-900 font-medium text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                        Features
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
                            <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CTABand
        title="Need hardware for your deployment?"
        description="Talk to our team about the right readers, gateways, and edge devices for your environment."
      />
    </>
  )
}
