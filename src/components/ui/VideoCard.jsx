import { useState } from 'react'
import { Play } from 'lucide-react'
import Reveal from '../motion/Reveal'

export default function VideoCard({ video, delay, vertical = false }) {
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
