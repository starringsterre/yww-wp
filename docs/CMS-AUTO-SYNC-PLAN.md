# CMS Auto-Sync: Plan & Context

> Status: Plan goedgekeurd, nog niet geïmplementeerd.
> Volgende stap: `scripts/cms-sync.mjs` bouwen + `package.json` updaten.

---

## Doel

Als Sterre een sectie toevoegt aan een TSX-pagina (bijv. `cms?.nieuwe_titel`), wil ze dat:
1. Het CMS-veld automatisch verschijnt in het WordPress-admin paneel
2. Het veld meteen gevuld is met een slimme placeholder
3. Bij een **nieuwe pagina**: ook de route, navigatie en WordPress-pagina automatisch aangemaakt worden

---

## Hoe de website in elkaar zit

### Architectuur (groot plaatje)

```
WordPress (CMS)          →    React App (Frontend)     →    Vercel (Hosting)
localhost:8081                localhost:8080                youngwisewomen.nl
     ↓                              ↓                             ↓
Beheert content               Haalt data op via            Serveert de gebouwde
(coaches, blogs,              REST API (React Query)       React app + serverless API
teksten, etc.)
```

### Lokaal draaien

```bash
# Terminal 1 – WordPress
cd wordpress
php -S localhost:8081 router.php

# Terminal 2 – React app
npm run dev
```

- Frontend:        http://localhost:8080
- WordPress admin: http://localhost:8080/wp-admin (via Vite proxy)

---

## Hoe data van WordPress naar React stroomt

```
WordPress (yww_page_content meta, opgeslagen als JSON)
    ↓  GET /wp-json/yww/v1/pages/{slug}
client/api/wordpress.ts  →  fetchPageContent(slug)
    ↓
client/hooks/usePageContent.ts  →  usePageContent("home")
    ↓
client/pages/Home.tsx  →  const { data: cms } = usePageContent("home")
    ↓
<h1>{cms?.hero_title || "Fallback tekst"}</h1>
```

### Patroon per pagina

Elk CMS-veld in een TSX-pagina gebruikt dit patroon:
```tsx
const { data: cms } = usePageContent("slug-van-de-pagina");
// ...
<h1>{cms?.hero_title || "Default titel"}</h1>
<p>{cms?.hero_subtitle || "Default subtitel"}</p>
<img src={cms?.hero_image || "/default.jpg"} />
```

---

## Bestaande CMS-infrastructuur

### Veldendefinities (PHP)
**Bestand:** `wordpress/wp-content/mu-plugins/yww-admin-ui.php`
**Functie:** `yww_get_page_fields($slug)` — definieert welke velden elke pagina heeft

```php
$pages = [
    'home' => [
        'hero_title'  => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
        'hero_subtitle' => ['label' => 'Hero Subtitel'],
        'hero_image'  => ['label' => 'Hero foto', 'type' => 'image'],
        'hero_text'   => ['label' => 'Hero tekst', 'type' => 'textarea'],
        // ... alle andere velden
    ],
    'weekenden' => [
        // ...
    ],
];
```

Veldtypes: `text` (default), `textarea`, `image`

### Data opslag
Alle velden worden opgeslagen als één JSON-string in WordPress post meta:
- Meta-key: `yww_page_content`
- Format: `{"hero_title": "...", "hero_subtitle": "...", ...}`

### REST API endpoint
`GET /wp-json/yww/v1/pages/{slug}` → geeft de JSON terug als flat object

### Seed script
**Bestand:** `wordpress/seed-page-content.php`
Vult WordPress-pagina's met placeholder-content via `seed_page('slug', [...])`.

### Paginaregistratie (single source of truth)
**Bestand:** `shared/page-registry.mjs`
Bevat alle routes met slug, titel, SEO-info. Wordt gebruikt door:
- `scripts/sync-wp-pages.mjs` → maakt WP-pagina's aan
- `scripts/generate-sitemap.mjs` → genereert sitemap.xml

### Routes
**Bestand:** `client/App.tsx`
Alle `<Route>` elementen staan hier. Commentaar `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}` markeert waar nieuwe routes komen.

### Navigatie
**Bestand:** `client/components/Layout.tsx`
`mainNavItems` array definieert het hoofdmenu met 4 items en hun children:
- "Persoonlijke ontwikkeling" (children: Weekend trainingen, Dag workshops)
- "Bedrijfstrajecten" (children: Jaarprogramma's, Losse Workshops)
- "Inspiratie" (children: Evenementen, Blogs, Podcasts)
- "Ons Verhaal" (geen children)

---

## Implementatieplan: `scripts/cms-sync.mjs`

### Nieuw npm-script (in `package.json`)
```json
"cms:sync": "node scripts/cms-sync.mjs"
```

Gebruik:
```bash
npm run cms:sync            # Dry-run: toont wat er verandert (veilig)
npm run cms:sync -- --write # Schrijft wijzigingen daadwerkelijk weg
```

---

### Wat het script doet

#### Stap 1 – TSX-bestanden scannen
- Scan `client/pages/*.tsx`
- Detecteer `usePageContent("slug")` → bepaal de slug
- Detecteer alle `cms?.fieldName` patronen → verzamel veldnamen
- Detecteer `// @cms-page ...` annotaties → lees metadata nieuwe pagina's

#### Stap 2 – Bestaande PHP-definities inlezen
- Parse `yww_get_page_fields()` in `yww-admin-ui.php`
- Extraheer welke velden al bestaan per slug

#### Stap 3 – Veldensync (bestaande pagina's)
Voor elke slug: detecteer ontbrekende velden, dan:
1. Voeg veld-definitie toe in `yww-admin-ui.php`
2. Voeg placeholder-waarde toe in `seed-page-content.php`
3. Update `yww_page_content` meta direct via WordPress REST API (zodat het meteen zichtbaar is)

#### Stap 4 – Nieuwe pagina registreren
Voor elk TSX-bestand met `// @cms-page ...` annotatie dat nog niet in `page-registry.mjs` staat:
1. Voeg entry toe aan `shared/page-registry.mjs`
2. Voeg `<Route>` toe aan `client/App.tsx`
3. Voeg nav-item toe aan `client/components/Layout.tsx` (op basis van `menuParent`)
4. Voeg lege slug-array toe aan `yww-admin-ui.php`
5. Maak WP-pagina aan via REST API (zelfde als `sync-wp-pages.mjs`)
6. Voer daarna meteen de veldensync uit voor de nieuwe slug

#### Stap 5 – Rapport
Print een overzicht van alles wat veranderd is (of zou veranderen bij dry-run).

---

### Annotatie-format voor nieuwe pagina's

Bovenaan het nieuwe TSX-bestand zet je één comment-regel:
```tsx
// @cms-page slug="nieuwe-pagina" route="/groepstrainingen/nieuwe-pagina" title="Nieuwe Pagina" menuParent="Persoonlijke ontwikkeling" menuLabel="Nieuwe Pagina"
```

- `slug` = WordPress page slug (uniek, lowercase, koppeltekens)
- `route` = React Router pad (begint met `/`)
- `title` = Paginatitel in WordPress admin
- `menuParent` = Label van het hoofdmenu-item (exact zoals in Layout.tsx, of leeg `""` voor top-level)
- `menuLabel` = Tekst die in het dropdown-menu verschijnt

**Voorbeeld nieuwe pagina:**
```tsx
// @cms-page slug="mindfulness" route="/groepstrainingen/mindfulness" title="Mindfulness Training" menuParent="Persoonlijke ontwikkeling" menuLabel="Mindfulness"
import { usePageContent } from "@/hooks/usePageContent";

export default function Mindfulness() {
  const { data: cms } = usePageContent("mindfulness");

  return (
    <div>
      <h1>{cms?.hero_title || "Mindfulness Training"}</h1>
      <p>{cms?.hero_text || "Beschrijving..."}</p>
      <img src={cms?.hero_image || "/default.jpg"} />
    </div>
  );
}
```

Na `npm run cms:sync -- --write`:
- Route `/groepstrainingen/mindfulness` werkt meteen
- "Mindfulness" verschijnt in het dropdown van "Persoonlijke ontwikkeling"
- In WordPress admin → Pagina's → Mindfulness Training → je ziet de CMS-velden met placeholders

---

### Type-inferentie (automatisch)

Het script bepaalt het veld-type op basis van de naam:

| Patroon | Type | Beschrijving |
|---------|------|-------------|
| `*_image`, `*_foto`, `*_photo`, `*_video`, `*_url`, `*_src`, `*_thumbnail` | `image` | Afbeelding-picker in WP admin |
| `*_text`, `*_tekst`, `*_content`, `*_description`, `*_beschrijving`, `*_quote`, `*_bio`, `*_intro`, `*_note`, `*_items`, `*_summary` | `textarea` | Groot tekstvak |
| alles andere | `text` | Gewoon tekstveld |

### Sectie-groepering (automatisch)

Velden worden gegroepeerd op het eerste deel van de naam:
- `hero_*` → sectie "Hero Sectie"
- `atmosphere_*` → "Sfeer Sectie"
- `benefits_*` / `benefit_*` → "Voordelen"
- `pillars_*` / `pillar_*` → "Pijlers"
- `program_*` → "Programma"
- nieuw prefix → `"{Prefix} Sectie"` (gecapitaliseerd)

### Label-generatie (automatisch)
`hero_title` → `Hero Titel` (split op `_`, elk woord met hoofdletter)

### Placeholder-waarden

| Veldnaam bevat | Placeholder |
|----------------|-------------|
| `title`, `titel` | `"Nieuwe Titel"` |
| `subtitle`, `subtitel` | `"Subtitel"` |
| `heading` | `"Sectie Heading"` |
| `text`, `tekst`, `description`, `content` | `"Tekst voor deze sectie. Pas dit aan in WordPress."` |
| `cta` | `"Meer informatie"` |
| `image`, `foto`, `photo` | placeholder Unsplash URL |
| `video`, `url` | `"https://"` |
| `price`, `prijs` | `"€ 0,-"` |
| overig | `"Invullen in WordPress CMS"` |

---

## Bestanden die het script aanpast

| Bestand | Wanneer | Wat |
|---------|---------|-----|
| `wordpress/wp-content/mu-plugins/yww-admin-ui.php` | Altijd (nieuwe velden) | Veld-definities in `yww_get_page_fields()` |
| `wordpress/seed-page-content.php` | Altijd (nieuwe velden) | Placeholder-waarden in `seed_page()` calls |
| WordPress REST API | Altijd (als WP draait) | Seed `yww_page_content` direct op WP-pagina |
| `shared/page-registry.mjs` | Alleen nieuwe pagina's | Nieuw entry toevoegen |
| `client/App.tsx` | Alleen nieuwe pagina's | `<Route>` toevoegen |
| `client/components/Layout.tsx` | Alleen nieuwe pagina's | Nav-item toevoegen aan `mainNavItems` |

---

## Verificatie na implementatie

### Test 1: Bestaande pagina, nieuw veld
1. Voeg toe aan `client/pages/Home.tsx`: `<p>{cms?.test_nieuw_veld || "test"}</p>`
2. Draai `npm run cms:sync -- --write` (WordPress moet draaien op :8081)
3. Ga naar WordPress admin → Pagina's → Home → "Pagina Teksten (CMS)"
4. Controleer: veld "Test Nieuw Veld" verschijnt met placeholder-waarde

### Test 2: Nieuwe pagina
1. Maak `client/pages/TestPagina.tsx` met annotatie + `usePageContent("test-pagina")`
2. Draai `npm run cms:sync -- --write`
3. Controleer: http://localhost:8080/nieuwe-route werkt
4. Controleer: nav-item zichtbaar in menu
5. Controleer: pagina zichtbaar in WordPress admin met CMS-velden

---

## Bestaande ondersteunde slugs (ter referentie)

| WP slug | Route | Pagina |
|---------|-------|--------|
| `home` | `/` | Home |
| `groepstrainingen` | `/groepstrainingen` | Retreats |
| `ontwikkeling-workshops` | `/groepstrainingen/ontwikkeling-workshops` | OntwikkelingWorkshops |
| `persoonlijke-ontwikkeling-weekend-training` | `/persoonlijke-ontwikkeling-weekend-training` | Weekenden |
| `weekend-intensive-juni-2026` | `/persoonlijke-ontwikkeling-training-vrouwen-...` | WeekendIntensiveTransactie |
| `in-company` | `/in-company` | VoorOrganisaties |
| `jaarprogrammas` | `/in-company/jaarprogrammas` | Jaarprogrammas |
| `losse-workshops` | `/in-company/losse-workshops` | LosseWorkshops |
| `inspiratie` | `/inspiratie` | Inspiratie |
| `evenementen` | `/inspiratie/evenementen` | Kalender |
| `blogs` | `/inspiratie/blogs` | Blogs |
| `podcasts` | `/inspiratie/podcasts` | Podcasts |
| `ons-verhaal` | `/ons-verhaal` | Contact |
| `lid-worden` | `/lid-worden` | LidWorden |
