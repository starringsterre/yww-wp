# Fase 3: Pagina-per-pagina conversie naar WordPress content

## Voorvereisten (elke sessie)
```bash
# Start WordPress
cd wordpress && php -S localhost:8081 router.php -d error_reporting=0 &

# Start React dev server
npm run dev
```
WP Admin: http://localhost:8081/wp-admin (admin/admin)

## Principe per pagina
1. Importeer de juiste hook (bijv. `useCoaches()`)
2. Vervang hardcoded data door `data` uit de hook
3. Voeg loading/error states toe waar nodig
4. Test: werkt met WP aan EN uit (fallback)

## Batch 1: Simpel (alleen data-array vervangen)

### 1A. Blogs.tsx
- **Bestand:** `client/pages/Blogs.tsx`
- **Actie:** Vervang `const blogItems = [...]` door `const { data: blogItems } = useBlogs()`
- **Hook:** `useBlogs` (al aangemaakt)
- **Let op:** Blog items gebruiken `id`, `title`, `excerpt`, `image` - exact dezelfde shape als WP response

### 1B. Podcasts.tsx
- **Bestand:** `client/pages/Podcasts.tsx`
- **Actie:** Vervang `const episodes: Episode[] = [...]` door `const { data: episodes } = usePodcasts()`
- **Hook:** `usePodcasts` (al aangemaakt)
- **Let op:** WPPodcast type matcht Episode type qua velden. Map eventueel `title` → Episode shape
- **Aandacht:** Episode type in Podcasts.tsx heeft dezelfde velden als WPPodcast

### 1C. Inspiratie.tsx
- **Bestand:** `client/pages/Inspiratie.tsx`
- **Actie:** Inspiratie items komen uit `client/lib/inspirationItems.ts` - deze zijn navigatie-links, NIET content. Kunnen hardcoded blijven.
- **Status:** Geen actie nodig

## Batch 2: Medium (pagina's met formulieren/contact)

### 2A. Contact / Ons Verhaal
- **Bestand:** `client/pages/Contact.tsx`
- **Actie:** Check welke content hardcoded is (teksten, contact info)
- **Hook:** `useGlobalSettings()` voor contact email/telefoon
- **Forms:** Blijven ongewijzigd (Klaviyo/N8N)

### 2B. LidWorden.tsx
- **Bestand:** `client/pages/LidWorden.tsx`
- **Actie:** Check hardcoded teksten, mogelijk page-specific meta velden nodig
- **Forms:** Blijven ongewijzigd

### 2C. Retreats/Weekenden.tsx
- **Bestand:** `client/pages/Retreats.tsx`, `client/pages/Weekenden.tsx`
- **Actie:** Weekend data (datums, prijzen, inclusies) - overweeg een "page meta" endpoint

## Batch 3: Complex (grote pagina's met veel secties)

### 3A. Home.tsx (464 regels)
- **Bestand:** `client/pages/Home.tsx`
- **Acties:**
  - Coaches sectie: `useCoaches()` → geeft data aan `<CoachCardsGrid coaches={data} />`
  - Testimonials: Component `RetreatTestimonialsSection` checken of het al testimonials ophaalt
  - Video URL, hero teksten, benefits cards: overweeg page-meta endpoint of laat hardcoded
- **Niet aanraken:** GroeiScanSection, FloatingBrandsSection logica, animaties

### 3B. VoorOrganisaties.tsx
- **Bestand:** `client/pages/VoorOrganisaties.tsx` (of `in-company`)
- **Actie:** Check hardcoded teksten en USP's

### 3C. WeekendIntensiveTransactie.tsx (863 regels!)
- **Bestand:** `client/pages/WeekendIntensiveTransactie.tsx`
- **Actie:** Grootste en meest complexe pagina. Bevat prijzen, datums, inclusies, FAQ
- **Aanpak:** Alleen content-teksten via WP, alle logica/formulieren blijven in React
- **Let op:** Dit is de transactiepagina - wees extra voorzichtig

## Batch 4: Shared componenten

### 4A. Layout.tsx (Nav + Footer)
- **Bestand:** `client/components/Layout.tsx`
- **Actie:** Footer tekst + contact info via `useGlobalSettings()`
- **Nav items:** Kunnen hardcoded blijven (structureel, niet content)

### 4B. TestimonialsCarousel
- **Bestand:** Check `client/components/RetreatTestimonialsSection.tsx`
- **Actie:** `useTestimonials()` → map naar carousel data
- **Let op:** Testimonials worden op meerdere pagina's gebruikt

### 4C. CoachCardsGrid
- **Bestand:** `client/components/CoachCardsGrid.tsx`
- **Actie:** Component ontvangt coaches als prop - aanpassing zit in de PAGINA die de prop vult

### 4D. EventCalendar
- **Bestand:** `client/components/EventCalendar.tsx`
- **Actie:** `useEvents()` → events prop vullen vanuit WP i.p.v. alleen fallback
- **Let op:** Component heeft al fallback-merge logica ingebouwd

## Bestanden die NIET veranderen
- `client/components/VraagbaakWidget.tsx` - Logica, niet content
- `client/components/GroeiScanSection.tsx` - Scoring algoritme
- `client/components/CookieConsentBanner.tsx` - Juridisch/technisch
- `server/routes/*` - Express API routes (Klaviyo, N8N)
- `server/lib/klaviyo.ts` - Integratie logica
- Alle animatie-componenten (ScrollFadeInUp, SlideIn*, etc.)

## Aanbevolen volgorde voor implementatie
1. **EventCalendar** - heeft al fallback-merge, alleen events prop vullen
2. **Blogs** - simpelste pagina, 3 items
3. **Podcasts** - iets complexer door filters
4. **Home (coaches sectie)** - CoachCardsGrid prop vullen
5. **TestimonialsCarousel** - gebruikt op meerdere pagina's
6. **Layout footer** - globalSettings voor contact info
7. **Contact pagina** - globalSettings
8. **Rest** - per pagina evalueren

## Checklist per pagina-conversie
- [ ] Hook importeren en data ophalen
- [ ] Hardcoded data verwijderen of naar fallback verplaatsen
- [ ] TypeScript types kloppen (WP response → component props)
- [ ] Loading state: placeholder of skeleton tonen
- [ ] Error state: fallback data gebruiken
- [ ] Test met WP draaiend: content komt van WP
- [ ] Test met WP uit: fallback data wordt getoond
- [ ] Visueel identiek aan huidige versie
- [ ] Geen regressies in interactieve features
