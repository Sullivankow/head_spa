import { Heart } from "lucide-react";

type FooterProps = { readonly onManageCookies: () => void; readonly onOpenPrivacy: () => void; readonly onOpenLegal: () => void };

export function Footer({ onManageCookies, onOpenPrivacy, onOpenLegal }: FooterProps) {
    return <footer className="border-t border-black/5 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs text-black/50 sm:flex-row sm:items-center">
            <img src="/logo.png" alt="MLC Head Spa" className="h-20 w-20 object-contain" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <button type="button" onClick={onManageCookies} className="underline decoration-black/20 underline-offset-4 transition hover:text-ink">Gérer mes cookies</button>
                <button type="button" onClick={onOpenPrivacy} className="underline decoration-black/20 underline-offset-4 transition hover:text-ink">Politique de confidentialité</button>
                <span>
                    <button type="button" onClick={onOpenLegal} className="underline decoration-black/20 underline-offset-4 transition hover:text-ink">Mentions légales</button>
                </span>
                <span className="inline-flex items-center gap-1">Fait avec <Heart aria-hidden="true" className="h-3 w-3 fill-current text-red-500" /> par <a href="https://www.facebook.com/AvenWebSully?locale=fr_FR" target="_blank" rel="noreferrer" className="font-semibold underline decoration-black/20 underline-offset-4 transition hover:text-ink">Aven Web</a></span>
            </div>
        </div>
    </footer>;
}