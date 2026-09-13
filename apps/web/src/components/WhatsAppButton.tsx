import { MessageCircle } from "lucide-react";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const whatsappMessage = encodeURIComponent("Bonjour, je souhaite avoir des informations sur les rituels MLC Head Spa.");

export function WhatsAppButton() {
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : "#reservation";

  return <a href={whatsappUrl} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined} aria-label="Contacter MLC Head Spa sur WhatsApp" title="Contacter MLC Head Spa sur WhatsApp" className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,.4)] ring-4 ring-[#25D366]/20 transition hover:scale-105 hover:bg-[#1fbd5b] sm:bottom-7 sm:right-7 sm:px-5 sm:py-4"><MessageCircle className="h-5 w-5 fill-current" /><span>WhatsApp</span></a>;
}