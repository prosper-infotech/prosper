import WhatsAppLink from './WhatsAppLink'

export default function WhatsAppButton({ tight = false }) {
  return (
    <WhatsAppLink
      className={`fixed ${tight ? 'bottom-24' : 'bottom-[168px]'} sm:bottom-[92px] right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-md transition-transform hover:scale-105`}
    />
  )
}
