import WhatsAppLink from './WhatsAppLink'

export default function WhatsAppButton() {
  return (
    <WhatsAppLink
      iconClassName="h-5 w-5"
      className="fixed bottom-20 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-md transition-transform hover:scale-105"
    />
  )
}
