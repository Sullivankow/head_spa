import { useEffect, useState } from "react";
import { Check, Cookie, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "mlc-head-spa-cookie-consent";

type CookieConsentValue = {
    analytics: boolean;
    personalization: boolean;
};

type CookieConsentProps = {
    readonly openPreferences: boolean;
    readonly onClosePreferences: () => void;
};

const defaultConsent: CookieConsentValue = { analytics: false, personalization: false };

function readConsent(): CookieConsentValue | null {
    try {
        const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!storedConsent) return null;
        const parsedConsent = JSON.parse(storedConsent) as Partial<CookieConsentValue>;
        return {
            analytics: parsedConsent.analytics === true,
            personalization: parsedConsent.personalization === true
        };
    } catch {
        return null;
    }
}

export function CookieConsent({ openPreferences, onClosePreferences }: CookieConsentProps) {
    const [consent, setConsent] = useState<CookieConsentValue | null>(null);
    const [draftConsent, setDraftConsent] = useState(defaultConsent);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const savedConsent = readConsent();
        setConsent(savedConsent);
        if (savedConsent) setDraftConsent(savedConsent);
    }, []);

    useEffect(() => {
        if (openPreferences && consent) {
            setDraftConsent(consent);
            setShowDetails(true);
        }
    }, [openPreferences, consent]);

    function saveConsent(nextConsent: CookieConsentValue) {
        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextConsent));
        } catch { }
        setConsent(nextConsent);
        setDraftConsent(nextConsent);
        setShowDetails(false);
        onClosePreferences();
    }

    function refuseOptionalCookies() {
        saveConsent(defaultConsent);
    }

    function acceptAllCookies() {
        saveConsent({ analytics: true, personalization: true });
    }

    if (consent && !openPreferences) return null;

    return <>
        {!consent && <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-[1.5rem] border border-[#c7a167]/45 bg-[#f7efe2]/[.98] p-5 text-ink shadow-[0_18px_60px_rgba(51,38,29,.2)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-7">
            <div className="flex items-start gap-4"><div className="hidden rounded-full bg-[#e5eee1] p-3 text-sage sm:block"><Cookie className="h-5 w-5" /></div><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sage">Votre vie privée compte</p><h2 className="mt-2 font-display text-3xl">Un choix en toute sérénité.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">Nous utilisons uniquement les cookies nécessaires au fonctionnement du site. Les cookies optionnels servent à améliorer votre expérience et ne seront activés qu’avec votre accord.</p><button type="button" onClick={() => setShowDetails(current => !current)} className="mt-3 text-sm font-semibold text-[#8d6a3f] underline decoration-[#c7a167]/60 underline-offset-4">{showDetails ? "Masquer les détails" : "Voir les détails"}</button></div></div>
            {showDetails && <ConsentDetails consent={draftConsent} onChange={setDraftConsent} />}
            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={refuseOptionalCookies} className="rounded-full border border-[#c7a167]/60 px-5 py-3 text-sm font-semibold transition hover:bg-white/60">Refuser les optionnels</button><button type="button" onClick={() => setShowDetails(true)} className="rounded-full border border-[#c7a167]/60 px-5 py-3 text-sm font-semibold transition hover:bg-white/60">Personnaliser</button><button type="button" onClick={acceptAllCookies} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">Tout accepter</button></div>
        </div>}
        {consent && openPreferences && <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-cream p-6 text-ink shadow-2xl sm:p-9"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sage">Confidentialité</p><h2 id="cookie-preferences-title" className="mt-2 font-display text-4xl">Gérer mes cookies</h2></div><button type="button" aria-label="Fermer les préférences de cookies" onClick={onClosePreferences} className="rounded-full p-2 transition hover:bg-white/60"><X /></button></div><p className="mt-5 text-sm leading-7 text-black/60">Votre choix est enregistré sur cet appareil. Vous pouvez le modifier à tout moment depuis le lien « Gérer mes cookies » en bas de page.</p><ConsentDetails consent={draftConsent} onChange={setDraftConsent} /><div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={refuseOptionalCookies} className="rounded-full border border-[#c7a167]/60 px-5 py-3 text-sm font-semibold transition hover:bg-white/60">Refuser les optionnels</button><button type="button" onClick={() => saveConsent(draftConsent)} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">Enregistrer mes choix</button></div></div></div>}
    </>;
}

type ConsentDetailsProps = {
    readonly consent: CookieConsentValue;
    readonly onChange: (consent: CookieConsentValue) => void;
};

function ConsentDetails({ consent, onChange }: ConsentDetailsProps) {
    return <div className="mt-5 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/40"><CookieOption title="Stockage nécessaire" description="Il permet au site de fonctionner et de mémoriser votre choix de consentement sur cet appareil." enabled={true} disabled /><CookieOption title="Mesure d’audience" description="Aucun outil de mesure d’audience n’est activé actuellement. Cette option restera inactive tant qu’elle n’est pas acceptée." enabled={consent.analytics} onToggle={() => onChange({ ...consent, analytics: !consent.analytics })} /><CookieOption title="Personnalisation" description="Permettrait de mémoriser vos préférences de confort. Aucun stockage de personnalisation n’est activé actuellement." enabled={consent.personalization} onToggle={() => onChange({ ...consent, personalization: !consent.personalization })} /></div>;
}

type CookieOptionProps = {
    readonly title: string;
    readonly description: string;
    readonly enabled: boolean;
    readonly disabled?: boolean;
    readonly onToggle?: () => void;
};

function CookieOption({ title, description, enabled, disabled = false, onToggle }: CookieOptionProps) {
    return <div className="flex items-start justify-between gap-4 p-4"><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-black/55">{description}</p></div><button type="button" role="switch" aria-checked={enabled} aria-label={`${title} : ${enabled ? "activé" : "désactivé"}`} disabled={disabled} onClick={onToggle} className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${enabled ? "bg-[#8d6a3f]" : "bg-black/15"} ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${enabled ? "left-6" : "left-1"}`}>{enabled && disabled && <Check className="h-4 w-4 p-0.5 text-[#8d6a3f]" />}</span></button></div>;
}