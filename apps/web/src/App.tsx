import { FormEvent, useState } from "react";
import { BookingModal } from "./components/BookingModal";
import { CookieConsent } from "./components/CookieConsent";
import { ExperienceSection } from "./components/ExperienceSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LegalModal } from "./components/LegalModal";
import { QuoteSection } from "./components/QuoteSection";
import { ReservationSection } from "./components/ReservationSection";
import { RitualsSection } from "./components/RitualsSection";
import { PrivacyModal } from "./components/PrivacyModal";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { initialReservationForm, ReservationForm, treatments } from "./data";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cookiePreferencesOpen, setCookiePreferencesOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [form, setForm] = useState<ReservationForm>(initialReservationForm);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Reservation request failed");
      setBooked(true);
      setForm(initialReservationForm);
    } catch { alert("Impossible d’envoyer la demande pour le moment. Vérifiez que l’API est démarrée."); }
  }

  function selectTreatment(title: string) {
    setOpen(true);
    setForm(current => ({ ...current, treatment: title }));
  }

  return <div id="top" className="min-h-screen overflow-x-hidden bg-cream">
    <Header menu={menu} onMenuToggle={() => setMenu(current => !current)} onNavigate={() => setMenu(false)} />

    <main>
      <HeroSection />
      <section className="border-y border-[#c7a167]/30 bg-white/45 py-5"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-5 text-xs font-semibold uppercase tracking-[.18em] text-sage"><span>Massage du cuir chevelu</span><span>•</span><span>Vapeur douce</span><span>•</span><span>Relaxation profonde</span><span>•</span><span>Beauté naturelle</span></div></section>
      <ExperienceSection />
      <RitualsSection treatments={treatments} onSelectTreatment={selectTreatment} />
      <QuoteSection />
      <FaqSection />
      <ReservationSection booked={booked} form={form} treatments={treatments} onChange={setForm} onSubmit={submit} />
    </main>
    <Footer onManageCookies={() => setCookiePreferencesOpen(true)} onOpenPrivacy={() => setPrivacyOpen(true)} onOpenLegal={() => setLegalOpen(true)} />
    <WhatsAppButton />
    <CookieConsent openPreferences={cookiePreferencesOpen} onClosePreferences={() => setCookiePreferencesOpen(false)} />
    {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    {legalOpen && <LegalModal onClose={() => setLegalOpen(false)} />}
    {open && <BookingModal onClose={() => setOpen(false)} />}
  </div>;
}