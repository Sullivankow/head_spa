import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Clock3, Heart, Menu, Sparkles, Star, X } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const treatments = [
  { title: "Rituel Découverte", duration: "60 min", price: "89 €", desc: "Un premier voyage sensoriel : nettoyage doux, massage du cuir chevelu, vapeur et relaxation." },
  { title: "Rituel Signature", duration: "90 min", price: "129 €", desc: "Notre expérience complète pour déconnecter, relâcher les tensions et retrouver une sensation de légèreté." },
  { title: "Évasion Profonde", duration: "120 min", price: "169 €", desc: "Le grand rituel : soin, massage prolongé et temps de repos pour une parenthèse profondément apaisante." }
];

const faqs = [
  ["Est-ce que le headspa convient à tout le monde ?", "La séance est pensée comme un moment de bien-être. En cas de grossesse, problème dermatologique ou situation particulière, contactez-nous avant de réserver afin de vérifier les précautions adaptées."],
  ["Que faut-il prévoir ?", "Rien. Venez simplement avec l’envie de ralentir. Nous vous accueillons et préparons tout le nécessaire pour votre rituel."],
  ["Puis-je offrir une séance ?", "Oui. Les rituels sont parfaits pour un cadeau bien-être. Contactez la maison pour une carte cadeau personnalisée."],
  ["Comment choisir mon rituel ?", "Le Rituel Découverte est idéal pour une première expérience. Pour une relaxation plus complète, privilégiez le Signature ou l’Évasion Profonde."]
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "Rituel Signature", date: "", time: "", message: "", website: "" });

  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      const r = await fetch(`${API}/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error();
      setBooked(true);
      setForm({ name: "", email: "", phone: "", treatment: "Rituel Signature", date: "", time: "", message: "", website: "" });
    } catch { alert("Impossible d’envoyer la demande pour le moment. Vérifiez que l’API est démarrée."); }
  }

  return <div className="min-h-screen overflow-x-hidden bg-cream">
    <header className="fixed top-0 z-50 w-full border-b border-[#c7a167]/35 bg-[#f7efe2]/95 text-ink shadow-[0_8px_30px_rgba(92,63,32,.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" aria-label="MLC Head Spa" className="flex items-center text-ink"><img src="/logo.png" alt="MLC Head Spa" className="h-14 w-14 object-contain" /></a>
        <nav className="hidden items-center gap-8 text-sm text-ink/75 md:flex">
          <a href="#experience" className="transition-colors hover:text-ink">L’expérience</a>
          <a href="#soins" className="transition-colors hover:text-ink">Les rituels</a>
          <a href="#faq" className="transition-colors hover:text-ink">FAQ</a>
          <a href="#reservation" className="rounded-full bg-[#c7a167] px-5 py-3 font-semibold text-ink shadow-[0_5px_14px_rgba(92,63,32,.12)] transition hover:-translate-y-0.5 hover:bg-[#b58c56]">Réserver <ArrowUpRight className="ml-1 inline h-4 w-4" /></a>
        </nav>
        <button aria-label="Ouvrir le menu" className="text-ink/80 md:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      {menu && <nav className="flex flex-col gap-5 border-t border-[#c7a167]/25 bg-[#f7efe2] px-5 py-5 text-ink/80 md:hidden">
        <a href="#experience" onClick={() => setMenu(false)}>L’expérience</a><a href="#soins" onClick={() => setMenu(false)}>Les rituels</a><a href="#faq" onClick={() => setMenu(false)}>FAQ</a><a href="#reservation" onClick={() => setMenu(false)} className="font-semibold text-[#8d6a3f]">Réserver →</a>
      </nav>}
    </header>

    <main>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-24">
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24">
          <div className="self-end">
            <div className="mb-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.24em] text-sage"><Sparkles className="h-4 w-4" /> MLC · HEAD SPA</div>
            <h1 className="max-w-4xl font-display text-6xl leading-[.88] tracking-[-.04em] sm:text-7xl lg:text-8xl">Ralentir.<br /><i className="gold-text">Respirer.</i><br />Se retrouver.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/65">Un rituel headspa enveloppant pour prendre soin du cuir chevelu, relâcher les tensions et offrir à l’esprit une vraie pause.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#reservation" className="rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1">Je réserve mon rituel</a><a href="#soins" className="rounded-full border border-[#c7a167]/60 bg-white/30 px-7 py-4 text-sm">Découvrir les soins</a></div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-black/60"><span><Check className="mr-2 inline h-4 w-4" />Cabine privative</span><span><Check className="mr-2 inline h-4 w-4" />Expérience sensorielle</span><span><Check className="mr-2 inline h-4 w-4" />Sur réservation</span></div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] border border-[#c7a167]/40 bg-[#cbb6a8] shadow-2xl lg:min-h-[570px]">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85" alt="Soin bien-être dans une cabine de spa" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.15),rgba(57,42,34,.3))]" />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-[#f4d9a0]/70 bg-[#33261d]/55 p-6 text-white backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 fill-current" /> Une pause qui commence dès que vous arrivez.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#c7a167]/30 bg-white/45 py-5"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-5 text-xs font-semibold uppercase tracking-[.18em] text-sage"><span>Massage du cuir chevelu</span><span>•</span><span>Vapeur douce</span><span>•</span><span>Relaxation profonde</span><span>•</span><span>Beauté naturelle</span></div></section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-sage">L’expérience MLC</p><h2 className="font-display text-5xl leading-none sm:text-6xl">Le luxe de<br /><i className="gold-text">ne rien faire.</i></h2></div>
          <div className="grid gap-10 sm:grid-cols-3">
            {[["01", "Déconnecter", "Une bulle loin du rythme quotidien, dans une atmosphère calme et intime."], ["02", "Relâcher", "Des gestes précis et enveloppants pour apaiser les tensions et favoriser la détente."], ["03", "Rayonner", "Une sensation de légèreté et un cuir chevelu choyé, au sortir de la séance."]].map(([n, t, d]) => <div key={n} className="border-t border-black/15 pt-5"><span className="text-xs text-black/40">{n}</span><h3 className="mt-8 font-display text-3xl">{t}</h3><p className="mt-3 text-sm leading-6 text-black/60">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section id="soins" className="bg-sand px-5 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-sage">Les rituels</p><h2 className="font-display text-5xl sm:text-6xl">Choisissez votre<br /><i className="gold-text">parenthèse.</i></h2></div><p className="max-w-sm text-sm leading-6 text-black/60">Des durées pensées pour vous laisser le temps d’arriver, de lâcher prise et de repartir autrement.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {treatments.map((x, i) => <article key={x.title} className={`rounded-[2rem] p-7 ${i === 1 ? "bg-ink text-white" : "bg-white/55"}`}><div className="flex justify-between text-sm"><span>{x.duration}</span><span>{x.price}</span></div><h3 className="mt-20 font-display text-4xl">{x.title}</h3><p className={`mt-4 min-h-24 text-sm leading-6 ${i === 1 ? "text-white/65" : "text-black/60"}`}>{x.desc}</p><button onClick={() => { setOpen(true); setForm(f => ({ ...f, treatment: x.title })) }} className="mt-6 w-full rounded-full border border-current/20 py-3 text-sm font-semibold transition hover:bg-white/20">Réserver ce rituel <ArrowUpRight className="ml-1 inline h-4 w-4" /></button></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 lg:p-16">
          <div className="gold-line absolute left-0 right-0 top-0 h-px" />
          <div className="grid gap-12 lg:grid-cols-[1fr_.7fr]">
            <div><Heart className="mb-10 h-7 w-7 text-[#e0bd7b]" /><h2 className="max-w-2xl font-display text-5xl leading-none sm:text-6xl">« J’ai enfin pris<br /><i className="text-[#e0bd7b]">le temps.</i> »</h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/60">Le headspa n’est pas seulement un soin. C’est un rendez-vous avec soi-même, dans une cabine pensée pour ralentir.</p></div>
            <div className="flex items-end"><div className="border-l border-[#c7a167]/60 pl-6"><p className="font-display text-3xl">Une heure où le monde peut attendre.</p><p className="mt-3 text-xs uppercase tracking-[.18em] text-white/50">MLC Head Spa</p></div></div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-black/5 bg-white/35 px-5 py-24 lg:py-32"><div className="mx-auto max-w-4xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-sage">Questions fréquentes</p><h2 className="font-display text-5xl">Tout savoir avant de venir.</h2><div className="mt-10 divide-y divide-black/10">{faqs.map(([q, a]) => <details key={q} className="group py-6"><summary className="cursor-pointer list-none pr-10 text-lg font-medium">{q}<span className="float-right transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 text-sm leading-7 text-black/60">{a}</p></details>)}</div></div></section>

      <section id="reservation" className="px-5 py-24 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-sage">Votre rendez-vous</p><h2 className="font-display text-5xl leading-none sm:text-6xl">Réservez votre<br /><i>moment.</i></h2><p className="mt-6 max-w-md text-sm leading-7 text-black/60">Choisissez votre rituel et vos préférences. Nous vous confirmerons votre demande par email.</p><div className="mt-10 space-y-4 text-sm"><div><Clock3 className="mr-3 inline h-4 w-4" />Du lundi au samedi · 9h — 19h</div><div><Heart className="mr-3 inline h-4 w-4" />Cabine privative · adresse à personnaliser</div></div></div>
        <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5 sm:p-9">
          {booked && <div className="mb-6 rounded-2xl bg-[#e5eee1] p-4 text-sm"><Check className="mr-2 inline h-4 w-4" />Votre demande est bien envoyée. Nous revenons vers vous rapidement.</div>}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm">Nom et prénom<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl bg-cream px-4 py-3 outline-none ring-0" placeholder="Votre nom" /></label>
            <label className="text-sm">Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl bg-cream px-4 py-3" placeholder="vous@email.fr" /></label>
            <label className="text-sm">Téléphone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl bg-cream px-4 py-3" placeholder="06 00 00 00 00" /></label>
            <label className="text-sm">Rituel<select value={form.treatment} onChange={e => setForm({ ...form, treatment: e.target.value })} className="mt-2 w-full rounded-xl bg-cream px-4 py-3">{treatments.map(t => <option key={t.title}>{t.title}</option>)}</select></label>
            <label className="text-sm">Date souhaitée<input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-2 w-full rounded-xl bg-cream px-4 py-3" /></label>
            <label className="text-sm">Créneau souhaité<select required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="mt-2 w-full rounded-xl bg-cream px-4 py-3"><option value="">Choisir</option>{["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:00"].map(t => <option key={t}>{t}</option>)}</select></label>
          </div>
          <label className="mt-5 block text-sm">Message (optionnel)<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} className="mt-2 w-full rounded-xl bg-cream px-4 py-3" placeholder="Une demande particulière ?" /></label>
          <input aria-hidden tabIndex={-1} autoComplete="off" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="absolute -left-[9999px]" />
          <label className="mt-5 flex gap-3 text-xs leading-5 text-black/55"><input required type="checkbox" className="mt-1" />J’accepte que mes informations soient utilisées pour traiter ma demande de réservation.</label>
          <button className="mt-7 w-full rounded-full bg-ink py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">Envoyer ma demande <ArrowUpRight className="ml-1 inline h-4 w-4" /></button>
          <p className="mt-3 text-center text-xs text-black/40">La réservation est confirmée après validation par la maison.</p>
        </form>
      </div></section>
    </main>

    <footer className="border-t border-black/5 px-5 py-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs text-black/50 sm:flex-row sm:items-center"><img src="/logo.png" alt="MLC Head Spa" className="h-20 w-20 object-contain" /><span>© 2026 · Mentions légales · Politique de confidentialité</span></div></footer>

    {open && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-5 backdrop-blur-sm" onClick={() => setOpen(false)}><div className="w-full max-w-xl rounded-[2rem] bg-cream p-7 shadow-2xl" onClick={e => e.stopPropagation()}><div className="flex justify-between"><h3 className="font-display text-4xl">Votre rituel</h3><button onClick={() => setOpen(false)}><X /></button></div><p className="mt-2 text-sm text-black/55">Retrouvez le formulaire de réservation en bas de page.</p><a href="#reservation" onClick={() => setOpen(false)} className="mt-7 block rounded-full bg-ink py-4 text-center text-sm font-semibold text-white">Continuer →</a></div></div>}
  </div>;
}