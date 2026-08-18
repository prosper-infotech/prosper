import { useLocation } from 'react-router-dom'

const WHATSAPP_NUMBER = '19407583271'

function buildMessage(pathname) {
  const pageTitle = document.title.split('|')[0].trim()
  const pageUrl = `https://www.prosperinfotech.com${pathname}`
  return `Hi, I'd like to know more about Prosper Infotech's solutions. I'm messaging from the "${pageTitle}" page (${pageUrl}).`
}

export default function WhatsAppButton() {
  const { pathname } = useLocation()

  const handleClick = (e) => {
    e.preventDefault()
    window.gtag?.('event', 'click_whatsapp', { event_category: 'Chat Support' })
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(pathname))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(pathname))}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="#fff" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.702 4.607 1.912 6.472L4 29l7.72-1.876A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.98 0-3.83-.562-5.4-1.535l-.387-.23-4.583 1.114 1.13-4.47-.253-.398A9.77 9.77 0 0 1 5.182 15c0-5.964 4.858-10.818 10.822-10.818S26.818 9.036 26.818 15 21.968 24.818 16.004 24.818Zm5.94-8.144c-.325-.163-1.925-.95-2.223-1.058-.298-.109-.516-.163-.733.163-.217.325-.842 1.058-1.033 1.276-.19.217-.38.244-.706.081-.325-.163-1.374-.506-2.617-1.612-.968-.862-1.622-1.927-1.812-2.252-.19-.325-.02-.5.143-.663.147-.146.325-.38.488-.57.163-.19.217-.325.325-.543.109-.217.054-.407-.027-.57-.081-.163-.733-1.765-1.004-2.417-.264-.635-.532-.55-.733-.56l-.625-.011c-.217 0-.57.081-.868.407-.298.325-1.137 1.112-1.137 2.712 0 1.6 1.164 3.147 1.326 3.364.163.217 2.29 3.497 5.55 4.904.775.335 1.38.535 1.852.684.778.247 1.486.212 2.046.129.624-.093 1.925-.787 2.196-1.547.271-.76.271-1.412.19-1.548-.081-.135-.298-.216-.624-.38Z" />
      </svg>
    </a>
  )
}
