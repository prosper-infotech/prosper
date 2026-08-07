import { useState } from 'react'
import { Play } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const VIDEOS = [
  { id: 'aU3I6Tw6S5I', title: 'Prosper Infotech LLC, Dallas, TX, USA' },
  { id: 'tCWJOamLZas', title: 'Virtual Geofence Mapping for House Plot Mapping' },
  { id: 'iBECj1Q94VI', title: 'Virtual Geo-fence Mapping' },
  { id: 'W7swAlelysk', title: 'Geo-fence Mapping' },
  { id: 'RiNWFYhQyIw', title: 'Cost Optimized RFID+GPS Inventory Tracking Tool' },
  { id: '7LyV_xW5flw', title: 'Cost Optimized RFID+GPS Inventory Tracking Hardware and Software' },
  { id: 'cY7W93ERc1g', title: 'Direct To Parking' },
  { id: 'SPFwiNGiiL4', title: 'RFID Based Gate Arrival and Departure' },
]

function VideoCard({ video, delay }) {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal delay={delay}>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 bg-white border border-ink-300">
        <div className="relative aspect-video bg-navy">
          {playing ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative w-full h-full"
              aria-label={`Play ${video.title}`}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 bg-navy/30 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 ml-1" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading font-semibold text-sm text-primary line-clamp-2">
            {video.title}
          </h3>
        </div>
      </div>
    </Reveal>
  )
}

export default function Videos() {
  useDocumentTitle(
    'Videos | Prosper Infotech',
    "Watch Prosper Infotech's RFID, GPS, and geofencing solutions in action across real warehouse, yard, and fleet deployments."
  )

  return (
    <>
      <Breadcrumb title="Videos" parent="Resources" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Resources
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Watch Prosper Infotech in action
          </h2>
          <p className="text-ink-600 text-lg">
            See our RFID, GPS, and geofencing solutions demonstrated on real deployments.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </section>

      <CTABand
        title="Want a live walkthrough?"
        description="Talk to our team for a personalized demo of any solution shown here."
      />
    </>
  )
}
