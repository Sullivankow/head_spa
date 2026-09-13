import { X } from "lucide-react";

type BookingModalProps = { readonly onClose: () => void };

export function BookingModal({ onClose }: BookingModalProps) {
    return <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-5 backdrop-blur-sm" onClick={onClose}><div className="w-full max-w-xl rounded-[2rem] bg-cream p-7 shadow-2xl" onClick={event => event.stopPropagation()}><div className="flex justify-between"><h3 className="font-display text-4xl">Votre rituel</h3><button type="button" onClick={onClose}><X /></button></div><p className="mt-2 text-sm text-black/55">Retrouvez le formulaire de réservation en bas de page.</p><a href="#reservation" onClick={onClose} className="mt-7 block rounded-full bg-ink py-4 text-center text-sm font-semibold text-white">Continuer →</a></div></div>;
}