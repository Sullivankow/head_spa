# Headspa — monorepo vitrine + réservation

Stack : React + Vite + TypeScript + Tailwind CSS / NestJS + Prisma + PostgreSQL / Resend.

## Démarrage rapide

Prérequis : Node.js 20+, Docker Desktop.

```bash
npm install
cp .env.example apps/api/.env
cp .env.example apps/web/.env
npm run db:up
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

- Front : http://localhost:5173
- API : http://localhost:3000
- Health : http://localhost:3000/health

### Resend
Renseigner `RESEND_API_KEY`, `DIRECTOR_EMAIL` et `MAIL_FROM` dans `apps/api/.env`.
En production, utiliser un domaine vérifié dans Resend et une adresse `MAIL_FROM` correspondant à ce domaine.

### Personnalisation
Le contenu marketing principal est dans `apps/web/src/App.tsx`. Les couleurs et composants sont centralisés dans `apps/web/src/index.css`.

## SEO / conversion déjà prévus
- title + meta description
- Open Graph / Twitter cards
- données structurées JSON-LD LocalBusiness + Service
- FAQ visible
- CTA réservation répétés
- formulaire court avec consentement
- sitemap.xml + robots.txt
- design mobile-first et animations respectueuses de prefers-reduced-motion
- API de réservation avec validation, persistance PostgreSQL et email Resend
- protection anti-spam simple via honeypot côté serveur

## À compléter avant mise en production
- vrai nom, adresse, téléphone, horaires et prix
- photos réelles optimisées WebP/AVIF
- domaine et favicon
- politique de confidentialité / mentions légales
- connexion Resend + domaine vérifié
- éventuellement créneaux réellement disponibles et synchronisation agenda
