# WordPress Headless CMS - Restplan

## Wat is al gedaan

### Fase 1 & 2 (commit 548fffa)
- WordPress lokale setup met custom REST API endpoints
- API client (`client/api/wordpress.ts`) + TypeScript types (`client/api/wp-types.ts`)
- 6 React hooks met fallback-patronen: `useBlogs`, `usePodcasts`, `useCoaches`, `useTestimonials`, `useEvents`, `useGlobalSettings`
- Base hook `useWPContent` met React Query (5 min stale, fallback via placeholderData)

### Fase 3 Batch 1-4 (commit 7a2043f)
- Blogs.tsx → `useBlogs()`
- Podcasts.tsx → `usePodcasts()`
- Kalender.tsx + EventCalendar → `useEvents()`
- Home.tsx coaches sectie → `useCoaches()`
- RetreatTestimonialsSection → `useTestimonials()`
- Layout.tsx footer → `useGlobalSettings()`

---

## Wat nog gedaan moet worden

### Fase 4: Content-rijke pagina's converteren

Onderstaande pagina's bevatten veel hardcoded tekst die via WordPress beheerbaar zou moeten zijn. Per pagina staat beschreven wat er moet gebeuren.

---

### 4A. Weekenden.tsx (HOGE PRIORITEIT)
**Bestand:** `client/pages/Weekenden.tsx`
**Omvang:** Zeer veel content (~2000+ woorden)

**Hardcoded content:**
- Intro heading + beschrijving
- 3 pijler-kaarten (Reflectie, Rust & Ruimte, Inspiratie) met iconen en tekst
- Foto-galerij sectie
- Doelgroep sectie met 4 kaarten
- Editie-info: datum "24-26 juni 2026", locatie "Oudega, Friesland", doelgroep "24-29"
- 3 dagprogramma-kaarten met gedetailleerde schema's
- "Jouw Transformatie" sectie met 3 kaarten
- 2 expert-kaarten (Chris Rauwendaal breathwork, Liene Molendijk yoga)

**Aanpak:**
- Nieuw WP endpoint: `/yww/v1/page-meta/weekenden`
- Nieuwe hook: `usePageMeta('weekenden')`
- Datums, locatie, instructeurs en dagschema's dynamisch maken
- Pijler-beschrijvingen en doelgroep-teksten via WP
- Fallback: huidige hardcoded content behouden

---

### 4B. WeekendIntensiveTransactie.tsx (HOGE PRIORITEIT)
**Bestand:** `client/pages/WeekendIntensiveTransactie.tsx`
**Omvang:** 863 regels - grootste pagina

**Hardcoded content:**
- Paginatitel + subtitel
- "Praktisch" sectie: 4 info-kaarten (Wanneer/Waar/Groepsgrootte/Kamers)
- "Over dit evenement" beschrijving
- "Voor wie is dit weekend bedoeld?" + 4 bullet points
- "Wat levert deze training je op?" + 6 bullet points
- "Wat is inbegrepen?" + 6 bullet points
- 8 FAQ items met vragen en antwoorden
- Prijsconstanten (EMPLOYER_PRICE = 1450)
- Pakketnamen en beschrijvingen

**Aanpak:**
- FAQ items via nieuw WP endpoint of FAQ CPT
- Event details (datum, locatie, inclusies) via page-meta endpoint
- Prijzen als aparte WP meta fields
- Forms en betaallogica NIET aanraken
- Extra voorzichtig: dit is de transactiepagina

---

### 4C. OntwikkelingWorkshops.tsx (HOGE PRIORITEIT)
**Bestand:** `client/pages/OntwikkelingWorkshops.tsx`

**Hardcoded content:**
- 4 workshop-kaarten met elk:
  - slug, title, subtitle, description
  - nextDate, fromPrice, duration, location
  - audience, goal, program (3 items), investment

**Aanpak:**
- Nieuw WP Custom Post Type: "Workshop"
- Nieuwe hook: `useWorkshops()`
- Nieuw endpoint: `/yww/v1/workshops`
- Fallback: huidige 4 workshop objecten
- Datums en prijzen worden direct bewerkbaar in WP admin

---

### 4D. LidWorden.tsx (MEDIUM PRIORITEIT)
**Bestand:** `client/pages/LidWorden.tsx`

**Hardcoded content:**
- Hero titel + subtitel
- 4 voordelen-kaarten (Verhalen Delen, Samen Samenkomen, Samen Organiseren, Steun & Verbinding)
- Formulier-teksten en succes-bericht

**Aanpak:**
- Voordelen-kaarten via `useGlobalSettings()` of nieuw page-meta endpoint
- Formulier blijft ongewijzigd (Klaviyo)
- Fallback: huidige content

---

### 4E. VoorOrganisaties.tsx (MEDIUM PRIORITEIT)
**Bestand:** `client/pages/VoorOrganisaties.tsx`

**Hardcoded content:**
- Jaarprogramma heading + beschrijving
- 4 programma-kaarten (1-op-1 coaching, Groepssessies, Dag workshop, Weekend training)
- Contact info (telefoonnummer, Calendly URL)
- Brochure download URL
- Rol-selectie opties in formulier

**Aanpak:**
- Programma-kaarten via page-meta of nieuw B2B CPT
- Contact info via `useGlobalSettings()` (al beschikbaar)
- Formulier en Calendly integratie blijven ongewijzigd

---

### 4F. OnsVerhaal.tsx (LAGE PRIORITEIT)
**Bestand:** `client/pages/OnsVerhaal.tsx`

**Hardcoded content:**
- "Het Begin van Ons Avontuur" + 2 paragrafen
- "Onze Waarden" + beschrijving + 4 bullet points
- CTA sectie teksten

**Aanpak:**
- Brand story via page-meta endpoint
- Waarden als repeater field
- Kan later, content verandert zelden

---

### 4G. Contact.tsx (LAGE PRIORITEIT)
**Bestand:** `client/pages/Contact.tsx`

**Hardcoded content:**
- "Ons Gedachtegoed" + founder story (~380 woorden)
- "Unieke Kracht" + samenwerking tekst

**Aanpak:**
- Contact info al dynamisch via Layout footer
- Brand story eventueel via page-meta
- Formulier blijft ongewijzigd

---

### 4H. Retreats.tsx (GEEN ACTIE NODIG)
**Bestand:** `client/pages/Retreats.tsx`

Simpele landing page met 2 korte beschrijvingen en links naar subpagina's. Te weinig content om te converteren - mag hardcoded blijven.

---

## Technische vereisten voor resterende conversies

### Nieuw WP endpoint nodig: Page Meta
```
GET /yww/v1/page-meta/{slug}
```
Retourneert pagina-specifieke content (secties, kaarten, FAQ) per slug. Dit voorkomt dat elke pagina een eigen endpoint nodig heeft.

### Nieuw WP Custom Post Type: Workshop
```
GET /yww/v1/workshops
```
Retourneert workshop-kaarten met velden: slug, title, subtitle, description, nextDate, fromPrice, duration, location, audience, goal, program, investment.

### Bestaande endpoints uitbreiden
- `/yww/v1/options` → telefoonnummer, Calendly URL, brochure URL toevoegen

### Nieuwe hooks nodig
- `usePageMeta(slug)` - generiek per pagina
- `useWorkshops()` - workshop listing
- Eventueel `useFAQ(category)` - FAQ items

---

## Aanbevolen volgorde

| # | Pagina | Prioriteit | Geschatte complexiteit |
|---|--------|-----------|----------------------|
| 1 | OntwikkelingWorkshops | Hoog | Medium - nieuw CPT + hook |
| 2 | Weekenden | Hoog | Hoog - veel content secties |
| 3 | WeekendIntensiveTransactie | Hoog | Hoog - voorzichtig, transactiepagina |
| 4 | LidWorden | Medium | Laag - voordelen-kaarten |
| 5 | VoorOrganisaties | Medium | Medium - programma-kaarten |
| 6 | OnsVerhaal | Laag | Laag - statische tekst |
| 7 | Contact | Laag | Laag - al deels via globalSettings |

---

## Bestanden die NIET veranderen
- `client/components/VraagbaakWidget.tsx` - Logica
- `client/components/GroeiScanSection.tsx` - Scoring algoritme
- `client/components/CookieConsentBanner.tsx` - Juridisch/technisch
- `client/pages/Inspiratie.tsx` - Navigatie-links, niet content
- `server/routes/*` - Express API routes (Klaviyo, N8N)
- `server/lib/klaviyo.ts` - Integratie logica
- Alle animatie-componenten

## Checklist per conversie
- [ ] WP endpoint aanmaken (indien nieuw)
- [ ] Hook aanmaken met fallback data
- [ ] TypeScript types definiëren
- [ ] Hardcoded data vervangen door hook data
- [ ] Fallback = huidige hardcoded content
- [ ] Test met WP aan: content komt van WP
- [ ] Test met WP uit: fallback werkt
- [ ] Visueel identiek
- [ ] Geen regressies in forms/logica
