# WordPress Headless CMS — Stap-voor-stap Guide voor Vibe-Coded Projecten

## Doel

Deze guide beschrijft hoe je een WordPress headless CMS toevoegt aan een bestaand React/Vite/TypeScript project. WordPress draait lokaal als backend, de React app haalt content op via een REST API, en alle content is bewerkbaar via de WordPress admin.

---

## Wanneer te gebruiken

Plak deze prompt in Claude Code wanneer je een nieuw project wilt voorzien van een WordPress CMS. Pas de project-specifieke waarden aan (post types, velden, pagina's).

---

## De Prompt

```
Ik wil een WordPress headless CMS toevoegen aan mijn React/Vite/TypeScript project.
Voer dit uit in 4 fases. Lees EERST de hele codebase om alle hardcoded content te inventariseren voordat je begint met implementeren.

### FASE 1: Analyse (doe dit EERST, implementeer NIETS)

1. Scan ALLE pagina-componenten (client/pages/*.tsx) en gedeelde componenten (client/components/*.tsx)
2. Maak een complete inventaris van:
   - Alle hardcoded teksten (headings, paragrafen, CTA-knoppen, lijsten)
   - Alle hardcoded afbeeldingen (img src, backgroundImage, video URLs)
   - Alle herhalende data-structuren (coaches, testimonials, events, blogs, etc.)
3. Groepeer de content in twee categorieën:
   A. **Structured content types** — herhalende items met vaste velden (bijv. coaches met naam/bio/foto/rol)
   B. **Page-level content** — teksten en afbeeldingen die per pagina uniek zijn (hero titels, sectie teksten, CTA's, achtergrond foto's)
4. Presenteer de inventaris aan mij ter goedkeuring VOORDAT je begint met implementeren.

### FASE 2: WordPress Backend Setup

Maak een `wordpress/` directory in de project root met:

#### 2.1 WordPress installatie
- Download WordPress core naar `wordpress/`
- Maak `wp-config.php` met lokale MySQL/SQLite database
- Maak `router.php` voor PHP built-in server (serveert statische bestanden direct, rest via index.php)
- Start commando: `cd wordpress && php -S localhost:8081 router.php`

#### 2.2 Content Types Plugin (`wordpress/wp-content/mu-plugins/{project}-content-types.php`)

Voor elke **structured content type**:
- Registreer een Custom Post Type met `register_post_type()` (met `show_in_rest => true`)
- Registreer alle meta fields met `register_post_meta()` (met `show_in_rest => true`)
- Maak een REST endpoint onder namespace `{project}/v1/` (bijv. `/coaches`, `/testimonials`)
- De endpoint callback queryt posts, haalt meta op, en retourneert een schoon JSON object

Voor **page-level content**:
- Gebruik het ingebouwde `page` post type
- Registreer één meta field: `{project}_page_content` (type: string, bevat JSON)
- Maak een REST endpoint: `/{project}/v1/pages/{slug}` die de JSON parsed en retourneert als `Record<string, string>`

BELANGRIJK voor de REST endpoint callbacks:
- Structured types: retourneer een array van objecten met alleen de benodigde velden (niet het volledige WP post object)
- Page content: retourneer een plat key/value object (niet genest)
- Alle afbeeldingsvelden bevatten volledige URLs (geen attachment IDs)

#### 2.3 Admin UI Plugin (`wordpress/wp-content/mu-plugins/{project}-admin-ui.php`)

**Helper functies:**
```php
// Tekst input
function {prefix}_text_field($post_id, $meta_key, $label, $type = 'text')

// Textarea (behoudt newlines)
function {prefix}_textarea_field($post_id, $meta_key, $label, $rows = 4)

// Select dropdown
function {prefix}_select_field($post_id, $meta_key, $label, $options)
```

**Meta boxes** voor elke structured content type met de relevante velden.

**Page Content Meta Box:**
- Definieer per pagina-slug een array van velden met `yww_get_page_fields($slug)`
- Elk veld heeft: `label`, optioneel `type` (text/textarea/image), optioneel `section` (voor groepering), optioneel `hint`
- Het `image` type MOET een WordPress Media Library picker bevatten:

```php
// Image veld met Media Library upload knop
} elseif ($type === 'image') {
    // Laad wp.media via: add_action('admin_enqueue_scripts', function() { wp_enqueue_media(); });
    // Render: tekstveld + "Foto kiezen" knop + "✕" verwijder knop + live preview
    // De knop opent wp.media() frame, selectie vult het tekstveld
}
```

**Veld definities per pagina — REGELS:**
- Elke pagina-sectie krijgt een `'section'` header voor visuele groepering in de admin
- Tekstvelden: `['label' => 'Hero Titel']`
- Lange teksten: `['label' => 'Tekst', 'type' => 'textarea']`
- Lijsten: `['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel']`
- Afbeeldingen: `['label' => 'Hero foto', 'type' => 'image']` — ALTIJD type image, NOOIT een gewoon tekstveld
- Als een sectie 3-4 losse items heeft die elk een eigen kaart vormen, maak dan APARTE velden per item (bijv. `for_whom_1`, `for_whom_2`, `for_whom_3`, `for_whom_4`) in plaats van één textarea met newline-gescheiden items

**Save handlers:**
- `save_post` hook voor structured content types — loop door alle meta keys, sanitize en sla op
- `save_post_page` hook voor page content — loop door field definitions, bouw JSON object, sla op als `{prefix}_page_content`
- Textarea velden: `sanitize_textarea_field()` (behoudt newlines)
- Tekst/image velden: `sanitize_text_field()`

#### 2.4 Content Seeder (`wordpress/seed-content.php` + `wordpress/seed-page-content.php`)

- Maak seed scripts die alle huidige hardcoded content uit de React componenten invoeren in WordPress
- Structured types: `wp_insert_post()` + `update_post_meta()` per item
- Page content: `update_post_meta($page->ID, '{prefix}_page_content', wp_json_encode($data))`
- ALLE huidige afbeeldings-URLs moeten in de seed staan (CDN URLs, lokale /public/ paden, Unsplash URLs, etc.)
- Draai de seeder: `cd wordpress && php seed-content.php && php seed-page-content.php`

### FASE 3: React Frontend Integratie

#### 3.1 API Client (`client/api/wordpress.ts`)
```typescript
const WP_API_URL = import.meta.env.VITE_WP_API_URL || "http://localhost:8081/wp-json";

async function wpFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${WP_API_URL}/{project}/v1/${endpoint}`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  return res.json();
}

// Eén export per content type
export async function fetchCoaches(): Promise<WPCoach[]> { return wpFetch("coaches"); }
export async function fetchPageContent(slug: string): Promise<WPPageContent> { return wpFetch(`pages/${slug}`); }
```

#### 3.2 TypeScript Types (`client/api/wp-types.ts`)
- Eén interface per structured content type (platte velden, geen nesting)
- `export type WPPageContent = Record<string, string>` voor page content

#### 3.3 React Query Hooks

**Generieke hook** (`client/hooks/useWPContent.ts`):
```typescript
export function useWPContent<T>({ queryKey, queryFn, fallbackData }) {
  return useQuery<T>({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,      // 5 minuten
    gcTime: 10 * 60 * 1000,         // 10 minuten
    placeholderData: fallbackData,   // Toont fallback terwijl WP laadt
    retry: 1,
  });
}
```

**Per structured type** (`client/hooks/useCoaches.ts`):
- Definieer `fallbackData` array met de huidige hardcoded data (inclusief afbeeldings-URLs)
- Dit zorgt ervoor dat de app werkt MET en ZONDER WordPress

**Per pagina** (`client/hooks/usePageContent.ts`):
```typescript
export function usePageContent(slug: string) {
  return useQuery<WPPageContent>({
    queryKey: ["wp", "page", slug],
    queryFn: () => fetchPageContent(slug),
    staleTime: 5 * 60 * 1000,
    placeholderData: {},
    retry: 1,
  });
}
```

#### 3.4 Component Updates

**Het patroon voor ELKE hardcoded waarde:**
```tsx
// Tekst — was: <h1>Vaste Titel</h1>
<h1>{cms?.hero_title || "Vaste Titel"}</h1>

// Afbeelding — was: <img src="https://cdn.example.com/foto.jpg" />
<img src={cms?.hero_image || "https://cdn.example.com/foto.jpg"} />

// Background image — was: style={{ backgroundImage: "url('/foto.png')" }}
style={{ backgroundImage: `url('${cms?.hero_image || "/foto.png"}')` }}

// Lijst items — was: hardcoded array
{(cms?.items || "Item 1\nItem 2\nItem 3").split('\n').filter(Boolean).map(...)}
```

- De huidige hardcoded waarde wordt ALTIJD de fallback na `||`
- Structured types: gebruik de hook data (bijv. `coaches` van `useCoaches()`)
- Page content: gebruik `const { data: cms } = usePageContent("slug")`

### FASE 4: Verificatie

1. Start WordPress: `cd wordpress && php -S localhost:8081 router.php &`
2. Draai seeders: `cd wordpress && php seed-content.php && php seed-page-content.php`
3. Start React dev server: `npm run dev`
4. Controleer:
   - [ ] Alle pagina's tonen dezelfde content als voor de CMS integratie
   - [ ] WordPress admin (localhost:8081/wp-admin) toont alle velden per pagina
   - [ ] Image velden hebben een "Foto kiezen" knop met Media Library picker en preview
   - [ ] Wijzigingen in WordPress admin verschijnen na refresh in de React app
   - [ ] Als WordPress niet draait, toont de app fallback data
5. TypeScript check: `npx tsc --noEmit` — geen nieuwe errors

### KRITIEKE REGELS (leer van eerdere fouten)

1. **Afbeeldingen ALTIJD als `type: 'image'`** — nooit als gewoon tekstveld. Gebruikers verwachten een upload knop met preview, geen leeg tekstveld.
2. **wp_enqueue_media()** moet geladen worden via `admin_enqueue_scripts` hook, anders werkt de Media Library picker niet.
3. **Aparte velden voor kaart-items** — als een sectie 3-4 items toont als losse kaarten/blokken, maak dan aparte CMS velden per kaart (item_1, item_2, item_3) in plaats van één textarea. Dit geeft betere UX in de admin.
4. **Seed ALLE content** inclusief afbeeldingen — als de seeder niet draait, zijn de image velden leeg in de admin en ziet de gebruiker lege previews.
5. **Fallback data = huidige hardcoded data** — de React app moet ALTIJD werken zonder WordPress. De fallback IS de huidige content.
6. **Page content is een plat JSON object** — geen geneste structuren. Key/value pairs waar keys beschrijvend zijn (hero_title, section_1_image, etc.).
7. **Eén seed-script per categorie** — `seed-content.php` voor structured types, `seed-page-content.php` voor page-level content. Beide idempotent (veilig om opnieuw te draaien).
```

---

## Mappenstructuur

```
project-root/
├── wordpress/
│   ├── wp-config.php
│   ├── router.php
│   ├── seed-content.php
│   ├── seed-page-content.php
│   └── wp-content/
│       └── mu-plugins/
│           ├── {project}-content-types.php   # Post types + REST API
│           └── {project}-admin-ui.php        # Admin interface + save logic
├── client/
│   ├── api/
│   │   ├── wordpress.ts                      # API client
│   │   └── wp-types.ts                       # TypeScript interfaces
│   ├── hooks/
│   │   ├── useWPContent.ts                   # Generic React Query wrapper
│   │   ├── usePageContent.ts                 # Page content hook
│   │   ├── useCoaches.ts                     # Per-type hook met fallback
│   │   └── ...
│   └── pages/
│       └── *.tsx                             # Components met cms?.field || fallback
└── .env
    VITE_WP_API_URL=http://localhost:8081/wp-json
```

## Quick Start Commando's

```bash
# WordPress starten
cd wordpress && php -S localhost:8081 router.php -d error_reporting=0 &

# Content seeden
cd wordpress && php seed-content.php && php seed-page-content.php

# WordPress admin
open http://localhost:8081/wp-admin   # admin / admin

# React dev server
npm run dev
```
