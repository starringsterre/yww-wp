# Young Wise Women

## What This Is

Een website en platform voor Young Wise Women — een coaching- en trainingsplatform gericht op jonge vrouwen. De site verkoopt weekend retreats, biedt een professioneel netwerk aan, en vangt leads af via formulieren die gekoppeld zijn aan Klaviyo CRM voor geautomatiseerde mailflows. Gebouwd als headless WordPress (CMS op Cloud86) + React SPA (Vercel) + Express API (Klaviyo formulierverwerking).

## Core Value

Bezoekers kunnen zich via formulieren aanmelden voor retreats, het netwerk, en de nieuwsbrief, en die data komt betrouwbaar in de juiste Klaviyo-lijsten terecht voor geautomatiseerde opvolging.

## Requirements

### Validated

- Headless WordPress CMS met bewerkbare content per pagina — bestaand
- React SPA met routing, pagina's, en CMS-integratie (`usePageContent`) — bestaand
- CMS-sync systeem (`cms-sync.mjs`) dat TSX-velden naar WordPress seeded — bestaand
- Klaviyo API-integratie met profiel-upsert en lijst-subscriptions — werkt lokaal
- 5 formulieren gebouwd: 2x retreat, nieuwsbrief, netwerk, brochure-download — werken lokaal
- Deploy script (`npm run deploy`) voor Vercel + CMS sync + rsync PHP — bestaand
- Yoast SEO integratie via REST API — bestaand
- Custom post types (coaches, blogs, podcasts, events, workshops, testimonials, FAQs) — bestaand

### Active

- [ ] API routes werken op Vercel productie (formulieren posten naar Klaviyo)
- [ ] Deploy pipeline (`npm run deploy`) is waterdicht en betrouwbaar getest
- [ ] CMS-synchronisatie werkt foutloos in productie (seeds, reseeds, nieuwe pagina's)
- [ ] Debug-code opgeruimd (debug wrapper in `api/[...all].ts`, debug commits)

### Out of Scope

- Workshop-formulieren — later, als er workshops gepland worden
- Vraagbaak en chatbot Klaviyo-integratie — hidden features, voor later
- Mobiele app — web-only platform
- Betalingsintegratie — aanmeldingen gaan via formulieren, niet via online betaling

## Context

De site is bijna af. Vrijwel alle pagina's, content-types, en frontend-functionaliteit staan. Het kernprobleem is dat de Express API routes (formulierverwerking → Klaviyo) lokaal perfect werken maar op Vercel productie crashen. De serverless function kan de `server/` directory niet bundelen.

**Vercel API probleem (zie `docs/VERCEL-API-DEBUG-REPORT.md`):**
- `api/[...all].ts` importeert `../server/index` — Vercel bundelt `server/` niet mee
- Standalone Express in een enkel bestand werkt WEL op Vercel
- `serverless-http` wrapper werkte op 22 feb maar niet meer (mogelijk Vercel runtime update)
- `includeFiles` in vercel.json heeft geen effect

**Klaviyo-lijsten:**
- Newsletter lijst (S9QkJ9)
- Netwerk lijst (WPtGhz)
- Trainings lijst (Tx7WvE) — voor retreats
- Bedrijfs lijst (RQw5nL) — voor brochure-downloads
- Leads lijst (R4PSyk)

**Klant:** De website wordt gebouwd voor een klant. Na oplevering moet de klant zelfstandig content kunnen beheren via WordPress admin en moet de deploy-pipeline betrouwbaar werken.

## Constraints

- **Hosting:** Frontend op Vercel, WordPress CMS op Cloud86 (45.82.189.195)
- **API:** Express routes moeten werken als Vercel serverless functions
- **CMS:** WordPress REST API — content wordt client-side opgehaald, niet SSR
- **CRM:** Klaviyo — alle formulierdata moet in de juiste lijsten terechtkomen
- **Package manager:** pnpm
- **Bestaande code:** Brownfield project — alle wijzigingen moeten compatibel zijn met bestaande architectuur

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Headless WordPress + React SPA | Klant kan content beheren, developer heeft controle over frontend | Bestaand |
| Klaviyo als CRM | Geautomatiseerde mailflows, lijst-segmentatie, WhatsApp-integratie | Bestaand |
| Vercel voor frontend hosting | Snelle deploys, goede DX, gratis tier | Bestaand — API routes problematisch |
| Express voor API routes | Formulierverwerking server-side voor API key security | Bestaand — moet werken op Vercel |
| CMS-sync vanuit TSX | Single source of truth: TSX fallbacks worden WP seed values | Bestaand |

---
*Last updated: 2026-03-07 after initialization*
