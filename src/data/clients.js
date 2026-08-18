import {
  Warehouse,
  Rss,
  MapPin,
  MonitorSmartphone,
  Cpu,
  Server,
  Headphones,
  Code2,
  Settings,
  TrendingUp,
  Sparkles,
  UserSquare2,
  ScanFace,
  Video,
  Clapperboard,
  Image as ImageIcon,
  Camera,
  Users,
  Boxes,
} from 'lucide-react'

import lazerLogo from '../assets/clients/lazer-logistics.png'
import hirschbachLogo from '../assets/clients/hirschbach.png'
import laPhotoLogo from '../assets/clients/la-photo-party.png'
import bhartiLogo from '../assets/clients/bharti-hospital.png'
import devamLogo from '../assets/clients/devam-projects.png'

export const CLIENTS = [
  {
    name: 'Lazer Logistics',
    logo: lazerLogo,
    website: 'https://www.lazerlogistics.com/',
    services: [
      { label: 'Yard Automation', icon: Warehouse },
      { label: 'RFID Solutions', icon: Rss },
      { label: 'GPS Tracking', icon: MapPin },
      { label: 'YMS Integration', icon: MonitorSmartphone },
      { label: 'AI Gate Intelligence', icon: Cpu },
    ],
  },
  {
    name: 'Hirschbach Motor Lines',
    logo: hirschbachLogo,
    website: 'https://hirschbach.com/',
    services: [
      { label: 'AS400 / IBM i Support', icon: Server },
      { label: '24x7x365 Help Desk', icon: Headphones },
      { label: 'Application Development', icon: Code2 },
      { label: 'System Maintenance', icon: Settings },
      { label: 'Performance Optimization', icon: TrendingUp },
    ],
  },
  {
    name: 'LA Photo Party',
    logo: laPhotoLogo,
    website: 'https://laphotoparty.com/',
    services: [
      { label: 'AI Photo Enhancement', icon: Sparkles },
      { label: 'AI Avatar Generation', icon: UserSquare2 },
      { label: 'AI Face Recognition', icon: ScanFace },
      { label: 'AI Video Services', icon: Video },
      { label: 'AI Green Screen Without a Green Screen', icon: Clapperboard },
      { label: 'Text to Image', icon: ImageIcon },
      { label: 'Image to Image', icon: ImageIcon },
      { label: 'RFID and DSLR Camera IoT', icon: Camera },
    ],
  },
  {
    name: "Era's Bharti Hospital",
    logo: bhartiLogo,
    logoRound: true,
    website: 'https://www.bhartihospitalpune.com/',
    services: [{ label: 'HRMS (Video Attendance System)', icon: Users }],
  },
  {
    name: 'Devam Projects',
    logo: devamLogo,
    website: 'https://devamprojects.in/',
    services: [
      { label: 'HRMS', icon: Users },
      { label: 'Material Management', icon: Boxes },
    ],
  },
]
