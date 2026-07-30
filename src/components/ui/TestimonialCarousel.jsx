import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function TestimonialCarousel({ testimonials }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      spaceBetween={32}
      slidesPerView={1}
      className="pb-10"
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          <blockquote className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
            <p className="text-lg md:text-xl text-ink-900 italic">&ldquo;{t.quote}&rdquo;</p>
            <footer className="text-sm text-ink-600">
              <span className="font-semibold text-ink-900">{t.name}</span>
              {t.role && <span> &middot; {t.role}</span>}
            </footer>
          </blockquote>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
