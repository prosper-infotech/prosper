import WhatsAppLink from './WhatsAppLink'

export default function WhatsAppButton({ tight = false }) {
  return (
    <WhatsAppLink
      className={`fixed ${tight ? 'bottom-28' : 'bottom-[168px]'} sm:bottom-[104px] right-5 z-40 flex h-16 w-[67px] items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105`}
    />
  )
}
