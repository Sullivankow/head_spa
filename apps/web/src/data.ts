export type Treatment = { title: string; duration: string; price: string; desc: string };
export type ReservationForm = { name: string; email: string; phone: string; treatment: string; date: string; time: string; message: string; website: string };

export const treatments: Treatment[] = [
  { title: "Rituel Découverte", duration: "60 min", price: "89 €", desc: "Un premier voyage sensoriel : nettoyage doux, massage du cuir chevelu, vapeur et relaxation." },
  { title: "Rituel Signature", duration: "90 min", price: "129 €", desc: "Notre expérience complète pour déconnecter, relâcher les tensions et retrouver une sensation de légèreté." },
  { title: "Évasion Profonde", duration: "120 min", price: "169 €", desc: "Le grand rituel : soin, massage prolongé et temps de repos pour une parenthèse profondément apaisante." }
];

export const faqs = [
  ["Est-ce que le headspa convient à tout le monde ?", "La séance est pensée comme un moment de bien-être. En cas de grossesse, problème dermatologique ou situation particulière, contactez-nous avant de réserver afin de vérifier les précautions adaptées."],
  ["Que faut-il prévoir ?", "Rien. Venez simplement avec l’envie de ralentir. Nous vous accueillons et préparons tout le nécessaire pour votre rituel."],
  ["Puis-je offrir une séance ?", "Oui. Les rituels sont parfaits pour un cadeau bien-être. Contactez la maison pour une carte cadeau personnalisée."],
  ["Comment choisir mon rituel ?", "Le Rituel Découverte est idéal pour une première expérience. Pour une relaxation plus complète, privilégiez le Signature ou l’Évasion Profonde."]
];

export const initialReservationForm: ReservationForm = { name: "", email: "", phone: "", treatment: "Rituel Signature", date: "", time: "", message: "", website: "" };