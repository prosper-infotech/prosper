import WhatsAppLink from './WhatsAppLink'

export default function WhatsAppButton({ tight = false }) {
  return (
    <WhatsAppLink
      iconClassName="h-6 w-6"
      className={`fixed ${tight ? 'bottom-24' : 'bottom-[168px]'} sm:bottom-[92px] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105`}
    />
  )
}
