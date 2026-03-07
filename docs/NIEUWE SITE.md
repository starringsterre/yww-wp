# Nieuwe site opzetten – prompt + stappenplan

Dit document geeft je alles wat je nodig hebt om een nieuwe website op te zetten met
dezelfde architectuur als YWW: **Headless WordPress + React SPA + Express + Vercel + Cloud86**.

---

## Deel 1 — Prompt voor Claude (kopieer dit aan het begin van een nieuwe sessie)

```
Ik wil een nieuwe website bouwen met dezelfde architectuur als mijn vorige project.
De stack is:

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, React Router, TanStack Query
- **Backend/CMS**: Headless WordPress (lokaal op :8081, productie op Cloud86)
- **API server**: Express (gemount als Vite middleware in dev, standalone in productie)
- **Hosting**: Vercel (frontend + Express), Cloud86 (WordPress)
- **Package manager**: pnpm

**Hoe de architectuur werkt:**
- TSX-pagina's fetchen content via `usePageContent("slug")` → `GET /wp-json/yww/v1/pages/{slug}`
- WordPress slaat pagina-content op als platte JSON in `yww_page_content` meta
- Patroon in TSX: `{cms?.veld_naam || "fallback tekst"}` — de fallback wordt ook als seed-waarde gebruikt
- Custom post types (coaches, blogs, events etc.) hebben eigen hooks en endpoints
- Globale instellingen (footer, contact, social) via `useGlobalSettings()` → `/wp-json/yww/v1/options`
- SEO via `useYoastSEO(slug)` → `/wp-json/yww/v1/seo/{slug}` (Yoast plugin)
- Express handelt alleen formulieren af (bv. nieuwsbrief via Klaviyo)
- Vite proxy stuurt `/wp-json`, `/wp-content`, `/wp-admin` door naar WordPress

**CMS-sync systeem:**
- `cms-sync.mjs` scant TSX-bestanden op `cms?.veld || "default"` patronen
- Genereert/updatet automatisch `yww-admin-ui.php` (veld-definities) en seeded WordPress
- Nieuwe pagina aanmaken: annotatie `// @cms-page slug="..." route="..." title="..." menuParent="..." menuLabel="..."` bovenaan TSX
- `npm run deploy` doet alles: cms-sync (productie) + rsync PHP naar Cloud86 + sync WP-pagina's

**Dev workflow:**
- `npm run dev` — lokale dev, fetcht van localhost:8081
- `npm run dev:cms` — lokale dev, fetcht van productie-WP (om productie-content te zien)
- `npm run deploy` — productie deploy (na eigen Vercel deploy)

**Kritieke bestanden:**
- `vite.config.ts` — proxy naar `process.env.WP_TARGET || "http://localhost:8081"`
- `shared/page-registry.mjs` — single source of truth voor alle pagina's
- `client/App.tsx` — React Router routes
- `client/components/Layout.tsx` — mainNavItems array
- `client/api/wordpress.ts` — alle WP REST API fetch-functies
- `wordpress/wp-content/mu-plugins/yww-admin-ui.php` — CMS veld-definities per slug
- `wordpress/wp-content/mu-plugins/yww-content-types.php` — custom post types + REST endpoints
- `scripts/cms-sync.mjs` — scant TSX → update PHP → seed WP
- `scripts/deploy.mjs` — productie deploy wrapper
- `.env` — lokale dev vars (gecommit)
- `.env.production` — productie credentials (gitignored)

De website heet [NAAM]. Pas dit toe op alles wat je aanmaakt.
Laat me weten welke stappen we als eerste oppakken.
```

> Pas `[NAAM]` aan naar de naam van je nieuwe site.

---

## Deel 2 — Stappenplan: nieuwe site van nul

### Fase 1 — Project aanmaken

1. **Kopieer de YWW-starter** (of fork het repo):
   ```bash
   cp -r /pad/naar/yww-wp /pad/naar/nieuwe-site
   cd /pad/naar/nieuwe-site
   git init && git add . && git commit -m "init: starter template"
   ```

2. **Hernoem het project** in `package.json`:
   ```json
   { "name": "nieuwe-site-naam" }
   ```

3. **Installeer dependencies:**
   ```bash
   pnpm install
   ```

---

### Fase 2 — Lokale WordPress instellen

4. **Installeer WordPress lokaal** op poort 8081 (Local by Flywheel, MAMP, Docker, etc.)

5. **Kopieer de mu-plugins** naar je lokale WP:
   ```
   wordpress/wp-content/mu-plugins/yww-admin-ui.php
   wordpress/wp-content/mu-plugins/yww-content-types.php
   ```
   → naar je lokale WP install: `wp-content/mu-plugins/`

6. **Maak een Application Password** aan in WP Admin → Gebruikers → Profiel → Application Passwords.
   Noteer gebruikersnaam + wachtwoord.

7. **Maak een `.env` aan** (of pas de bestaande aan):
   ```env
   VITE_WP_API_URL=http://localhost:8080/wp-json
   WP_USER=admin
   WP_PASS=jouw-application-password
   ```

8. **Test lokale WP-verbinding:**
   ```bash
   npm run cms:sync
   ```
   Verwacht output: droog-run met gevonden pagina's en velden.

---

### Fase 3 — Bestaande YWW-content vervangen door nieuwe content

9. **Verwijder YWW-specifieke pagina's** uit `shared/page-registry.mjs` en maak er nieuwe aan.

10. **Maak je eerste pagina aan** (patroon):
    ```tsx
    // @cms-page slug="home" route="/" title="Home" menuParent="" menuLabel="Home"

    import { usePageContent } from "@/hooks/usePageContent";

    export default function Home() {
      const { data: cms } = usePageContent("home");
      return (
        <main>
          <h1>{cms?.hero_title || "Welkom bij [Sitenaam]"}</h1>
          <p>{cms?.hero_tekst || "Jouw omschrijving hier."}</p>
        </main>
      );
    }
    ```

11. **Seed lokale WP** met de initiële velden:
    ```bash
    npm run cms:sync -- --write
    ```

12. **Start de dev server** en controleer of alles werkt:
    ```bash
    npm run dev
    ```

---

### Fase 4 — Productie-omgeving opzetten

13. **Maak een WordPress-installatie aan op Cloud86** (of andere host).
    Installeer de mu-plugins (zie stap 5) en de Yoast SEO plugin.

14. **Maak een Application Password** aan op de productie-WP.

15. **Maak `.env.production` aan** (nooit committen):
    ```env
    WP_URL=https://cms.jouwsite.nl
    WP_USER=admin
    WP_PASS="xxxx xxxx xxxx xxxx xxxx xxxx"
    CLOUD86_SSH_USER=jouw-ssh-user
    CLOUD86_SSH_HOST=ip-adres
    CLOUD86_WP_PATH=/var/www/vhosts/.../jouwsite.nl
    ```

16. **Koppel het project aan Vercel:**
    ```bash
    vercel --prod
    ```

17. **Voer de eerste productie-deploy uit:**
    ```bash
    npm run deploy
    ```
    Dit doet: cms-sync productie + rsync PHP → Cloud86 + sync WP-pagina's.

---

### Fase 5 — Doorontwikkelen

#### Nieuwe pagina toevoegen
```tsx
// @cms-page slug="over-ons" route="/over-ons" title="Over Ons" menuParent="Over" menuLabel="Over ons"
```
Dan: `npm run deploy`

#### Nieuw CMS-veld toevoegen aan bestaande pagina
```tsx
{cms?.nieuw_veld || "Standaard tekst"}
```
Dan: `npm run deploy`

#### CMS-content die je in productie hebt gewijzigd lokaal bekijken
```bash
npm run dev:cms
```

#### Placeholders in WP Admin vervangen door echte defaults
Wordt automatisch gedaan door `npm run deploy` (`--reseed` vlag).

---

## Veld-type suffixen (automatisch herkend door cms-sync)

| Suffix | Type in WP Admin |
|---|---|
| `_image` / `_photo` / `_foto` / `_url` / `_src` / `_thumbnail` / `_video` | Foto-picker |
| `_text` / `_tekst` / `_content` / `_description` / `_bio` / `_intro` / `_quote` / `_note` / `_items` / `_summary` | Groot tekstvak |
| al het andere | Tekstveld |

---

## Omgevingsvariabelen overzicht

| Var | Bestand | Gebruik |
|---|---|---|
| `VITE_WP_API_URL` | `.env` | WP API URL voor de browser (via Vite proxy) |
| `WP_USER` / `WP_PASS` | `.env` | Credentials voor lokale cms-sync |
| `WP_TARGET` | inline / npm script | Vite proxy doel (default: localhost:8081) |
| `WP_URL` | `.env.production` | Productie WP URL voor deploy |
| `WP_USER` / `WP_PASS` | `.env.production` | Productie WP credentials |
| `CLOUD86_SSH_USER` / `CLOUD86_SSH_HOST` / `CLOUD86_WP_PATH` | `.env.production` | SSH voor rsync naar Cloud86 |

---

## Snelreferentie commando's

```bash
npm run dev                    # Lokale dev (WP: localhost:8081)
npm run dev:cms                # Lokale dev (WP: productie)
npm run cms:sync               # Droog-run: wat zou er veranderen?
npm run cms:sync -- --write    # Schrijf: update PHP + seed lokale WP
npm run deploy                 # Productie: cms-sync + rsync + sync-wp-pages
npm run typecheck              # TypeScript check
npm run test                   # Vitest tests
```
