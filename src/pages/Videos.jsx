import { useState } from 'react'
import { Play } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import { YoutubeIcon } from '../components/icons/SocialIcons'
import { SOCIAL_LINKS } from '../data/socialLinks'
import useDocumentTitle from '../hooks/useDocumentTitle'

const YOUTUBE_URL = SOCIAL_LINKS.find((link) => link.label === 'YouTube').href

// Videos from the Prosper Infotech YouTube channel, newest first.
// `duration` is the display time; `iso` is the same length in ISO 8601 for the structured data.
const DEMOS = [
  {
    id: 'i7Oq3cniwa4',
    title: 'ForkliftVision AI | Real-Time Pallet Tracking & Forklift Safety for Racked and Open-Space Warehouses',
    duration: '4:44',
    iso: 'PT4M44S',
    uploaded: '2026-11-13T01:32:46-08:00',
  },
  {
    id: 'FC58M9LK3Og',
    title: 'Smart CFS Automation in Hindi | AI se Container Yard Management | ContainerVision AI Demo',
    duration: '4:35',
    iso: 'PT4M35S',
    uploaded: '2026-11-07T22:30:23-08:00',
  },
  {
    id: '6LxOQYq13RQ',
    title: 'Smart CFS Automation in India | JNCH Public Notice 120/2026 Compliance | ContainerVision AI Demo',
    duration: '4:35',
    iso: 'PT4M35S',
    uploaded: '2026-11-04T02:33:22-08:00',
  },
  {
    id: 'wLIENZDi5-w',
    title: 'AI Container Yard & CFS Automation | ContainerVision AI Full Demo',
    duration: '4:09',
    iso: 'PT4M9S',
    uploaded: '2026-11-03T04:00:20-08:00',
  },
]

const SHORTS = [
  {
    id: '2yu0aziK1qw',
    title: 'ForkliftVision AI | Track Every Pallet, Racks or Open Floor',
    duration: '0:56',
    iso: 'PT56S',
    uploaded: '2026-11-13T01:48:25-08:00',
  },
  {
    id: 'VjX_im-q1wM',
    title: '6 Logistics Problems, 1 AI Platform',
    duration: '0:38',
    iso: 'PT38S',
    uploaded: '2026-11-12T06:00:13-08:00',
  },
  {
    id: '5YuBg0_SE5E',
    title: 'Smart CFS Kaise Kaam Karta Hai? 50 Sec Mein Dekhiye | AI Container Tracking | Hindi',
    duration: '0:50',
    iso: 'PT50S',
    uploaded: '2026-11-07T22:30:07-08:00',
  },
  {
    id: 'M1lQPYI3-o0',
    title: 'Truck Kahan Hai? Live Truck Tracking with Prosper VMS',
    duration: '0:32',
    iso: 'PT32S',
    uploaded: '2026-11-04T19:30:20-08:00',
  },
  {
    id: 'RSsCiHKF5qE',
    title: 'Smart CFS in 50 Seconds | AI Container Tracking for Indian CFS | ContainerVision AI',
    duration: '0:50',
    iso: 'PT50S',
    uploaded: '2026-11-04T02:35:31-08:00',
  },
  {
    id: 'WO7k67NT5Q4',
    title: 'Your Gate, Yard, Dock and Warehouse in One AI Platform',
    duration: '0:33',
    iso: 'PT33S',
    uploaded: '2026-11-03T19:00:00-08:00',
  },
  {
    id: 'B5f_3UzLRnU',
    title: 'Smarter Truck Entry with GateVision',
    duration: '0:31',
    iso: 'PT31S',
    uploaded: '2026-10-29T01:57:10-07:00',
  },
  {
    id: '7mAlMk90qwc',
    title: 'What Does a Truly Smart CFS Look Like?',
    duration: '0:47',
    iso: 'PT47S',
    uploaded: '2026-10-27T03:55:51-07:00',
  },
]

// VideoObject markup so search engines can show these videos in results.
const VIDEOS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Prosper Infotech videos',
  itemListElement: [...DEMOS, ...SHORTS].map((video, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoObject',
      name: video.title,
      description: `${video.title} — Prosper Infotech`,
      thumbnailUrl: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
      uploadDate: video.uploaded,
      duration: video.iso,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    },
  })),
}

function VideoCard({ video, delay, vertical = false }) {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal delay={delay}>
      <div className="h-full overflow-hidden rounded-xl border border-ink-300 bg-white shadow-md transition-all duration-300 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className={`relative bg-navy ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          {playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative h-full w-full"
              aria-label={`Play ${video.title}`}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-navy/30 transition-colors group-hover:bg-navy/40">
                <span
                  className={`flex items-center justify-center rounded-full bg-gold text-primary shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                    vertical ? 'h-12 w-12' : 'h-14 w-14'
                  }`}
                >
                  <Play className={vertical ? 'ml-0.5 h-5 w-5' : 'ml-1 h-6 w-6'} fill="currentColor" />
                </span>
              </span>
              <span className="absolute bottom-2 right-2 rounded bg-navy/85 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                {video.duration}
              </span>
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className={`line-clamp-3 font-heading font-semibold text-primary ${vertical ? 'text-[13px] leading-snug' : 'text-sm'}`}>
            {video.title}
          </h3>
        </div>
      </div>
    </Reveal>
  )
}

export default function Videos() {
  useDocumentTitle(
    'AI Logistics Demo Videos | Prosper Infotech',
    'Watch ContainerVision AI, ForkliftVision AI, GateVision and Prosper VMS demos: AI container yard and CFS automation, pallet tracking and live truck tracking.',
    VIDEOS_SCHEMA
  )

  return (
    <>
      <Breadcrumb title="Videos" parent="Resources" parentPath="/resources" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Resources
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Watch Prosper Infotech in action
          </h2>
          <p className="text-ink-600 text-lg">
            Product demos and quick explainers on AI container yard and CFS automation, forklift pallet
            tracking, gate automation and truck tracking.
          </p>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            <YoutubeIcon className="h-5 w-5 text-gold" />
            Subscribe on YouTube
          </a>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <Reveal className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl">Product demos</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {DEMOS.map((video, i) => (
            <VideoCard key={video.id} video={video} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 pt-6">
        <Reveal className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl">Quick explainers</h2>
          <p className="mt-2 text-ink-600">Short videos from our YouTube channel, under a minute each.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {SHORTS.map((video, i) => (
            <VideoCard key={video.id} video={video} delay={(i % 4) * 0.06} vertical />
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
