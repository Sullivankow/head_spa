import { faqs } from "../data";

export function FaqSection() {
    return <section id="faq" className="border-t border-black/5 bg-white/35 px-5 py-24 lg:py-32"><div className="mx-auto max-w-4xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-sage">Questions fréquentes</p><h2 className="font-display text-5xl">Tout savoir avant de venir.</h2><div className="mt-10 divide-y divide-black/10">{faqs.map(([question, answer]) => <details key={question} className="group py-6"><summary className="cursor-pointer list-none pr-10 text-lg font-medium">{question}<span className="float-right transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 text-sm leading-7 text-black/60">{answer}</p></details>)}</div></div></section>;
}