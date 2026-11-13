// Videos from the Prosper Infotech YouTube channel (https://www.youtube.com/@prosper_infotech), newest first.
// `duration` is the display time; `iso` is the same length in ISO 8601 for the structured data.
export const DEMOS = [
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

export const SHORTS = [
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
export function videoSchema(videos, name = 'Prosper Infotech videos') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: videos.map((video, i) => ({
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
}
