import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import VideoCard from '../components/ui/VideoCard'
import { YoutubeIcon } from '../components/icons/SocialIcons'
import { SOCIAL_LINKS } from '../data/socialLinks'
import { DEMOS, SHORTS, videoSchema } from '../data/videos'
import useDocumentTitle from '../hooks/useDocumentTitle'

const YOUTUBE_URL = SOCIAL_LINKS.find((link) => link.label === 'YouTube').href
const VIDEOS_SCHEMA = videoSchema([...DEMOS, ...SHORTS])

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
