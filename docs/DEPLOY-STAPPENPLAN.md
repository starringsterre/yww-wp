# Deploy & Sync Stappenplan

## De gouden regel

> **WP Admin = content. Code = structuur.**
>
> Tekst, afbeeldingen en SEO-velden pas je aan in WP Admin → direct live.
> Routes, nav-labels, paginastructuur en nieuwe velden gaan via de code → daarna `npm run deploy`.

---

## Wat mag je rechtstreeks in WP Admin aanpassen?

| Aanpassing | Direct live? |
|---|---|
| Tekst in een metavak | ✅ Ja |
| Afbeelding in een metavak | ✅ Ja |
| Yoast SEO-titel / beschrijving | ✅ Ja |
| WP paginatitel | ✅ Ja (wordt nav-label) |
| **WP pagina-slug** | ❌ Nooit — breekt de content-koppeling |

---

## Scenario 1 — Alleen tekst/afbeeldingen aanpassen

Doe dit gewoon in WP Admin. Geen deploy nodig.

Wil je het resultaat lokaal inspecteren?
```bash
npm run dev:cms
```
Dit laat je lokaal de live productie-content zien.

---

## Scenario 2 — Nieuw tekstveld toevoegen aan een bestaande pagina

1. Voeg het veld toe in de TSX met een `||`-fallback:
   ```tsx
   {cms?.nieuwe_titel || "Mijn standaard tekst"}
   ```
   De fallback wordt automatisch als beginwaarde in WP Admin gezet.

2. Push je code naar GitHub (Vercel deploy).

3. Daarna:
   ```bash
   npm run deploy
   ```
   Dit detecteert het nieuwe veld, voegt het toe aan de PHP-admin-UI, seeded WP met de fallback-waarde en synct alles naar de server.

---

## Scenario 3 — Nieuwe pagina aanmaken

1. Maak een nieuw TSX-bestand in `client/pages/` en zet bovenaan:
   ```tsx
   // @cms-page slug="mijn-slug" route="/pad/naar/pagina" title="Paginatitel"
   ```

2. Gebruik `cms?.veld || "default"` voor elk bewerkbaar veld.

3. Push naar GitHub → daarna:
   ```bash
   npm run deploy
   ```
   Dit regelt automatisch: route in App.tsx, nav-item, WP-pagina aanmaken, alle velden seeden.

---

## Scenario 4 — Route, URL of nav-label wijzigen

Dit kan **niet** in WP Admin. Dit gaat altijd via de code. Vraag het aan mij (Claude).

Wat ik dan aanpas:
- `shared/page-registry.mjs` — route + wpSlug + SEO-titel
- `client/App.tsx` — React Router routes + redirects van oude URLs
- `client/hooks/useNavMenu.ts` — fallback nav-labels en hrefs
- `wordpress/wp-content/mu-plugins/yww-content-types.php` — PHP nav-config
- Alle TSX-pagina's en componenten met hardcoded links

Daarna:
```bash
git add ... && git commit && git push   # Vercel deploy
npm run deploy                          # Backend sync
```

---

## Scenario 5 — WP Admin toont `[Placeholder]` waarden

Run gewoon:
```bash
npm run deploy
```
De `--reseed` vlag zit er altijd in: placeholders worden vervangen met de echte TSX-defaults. Velden met echte content worden niet aangeraakt.

---

## De volledige deploy-flow (overzicht)

```
1. Code aanpassen (TSX, routes, etc.)
         ↓
2. git push origin main
   → Vercel bouwt en deployt de frontend automatisch
         ↓
3. npm run deploy
   → Stap 1: CMS sync (nieuwe velden in PHP + seed WP)
   → Stap 2: rsync PHP-bestanden naar Cloud86
   → Stap 3: Ontbrekende WP-pagina's aanmaken
```

**Let op:** `npm run deploy` deployt NIET naar Vercel. Dat doet de git push.

---

## Handige commando's

| Commando | Wanneer |
|---|---|
| `npm run dev` | Lokale ontwikkeling (tegen localhost WordPress) |
| `npm run dev:cms` | Lokaal kijken met live productie-content |
| `npm run deploy` | Na elke git push met code-wijzigingen |
| `npm run cms:sync` | Dry-run: bekijk wat er zou veranderen |

---

## Wat doet `npm run deploy` precies?

| Stap | Wat |
|---|---|
| CMS sync `--write --reseed` | Nieuwe velden → PHP admin-UI bijwerken + WP seeden met TSX-defaults, placeholders vervangen |
| rsync naar Cloud86 | `yww-admin-ui.php` + `yww-content-types.php` naar de productieserver |
| sync-wp-pages | Ontbrekende WP-pagina's aanmaken vanuit `page-registry.mjs` |

**Let op:** cms-sync laadt `.env.production` niet zelf. Gebruik altijd `npm run deploy` voor productie, nooit `cms-sync` direct.
