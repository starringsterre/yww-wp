# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server on :8080 (Vite + Express middleware)
npm run build            # Build client SPA + Node.js server for production
npm run start            # Run production server on port 3000
npm run typecheck        # TypeScript type check
npm run test             # Run Vitest tests

npm run cms:sync                      # Dry-run: detect new CMS fields/pages from TSX
npm run cms:sync -- --write           # Apply: update PHP + seed WordPress with real TSX defaults
npm run cms:sync -- --write --reseed  # Also replace existing [placeholder] values with TSX defaults
npm run sync:wp-pages                 # Create missing WP pages from page-registry.mjs
npm run deploy                        # Full deploy: Vercel --prod + CMS sync + rsync PHP + WP pages
```

**Package manager:** `pnpm`

The dev server proxies `/wp-json`, `/wp-admin`, `/wp-content` to `https://cms.youngwisewomen.nl` (production WordPress) by default. `npm run dev` therefore shows the same content as the live site.

**Deploy workflow:** Run `npm run deploy` — this does everything in one command: Vercel build → CMS sync → rsync PHP to Cloud86 → sync WP pages. `cms-sync.mjs` does NOT load `.env.production` on its own — use `npm run deploy` or pass env vars inline.

## Architecture

**Headless WordPress + React SPA + Express API**∆

```
WordPress (CMS)              React SPA                 Express server
cms.youngwisewomen.nl  ←→   client/pages/*.tsx         server/routes/*.ts
(always production)         fetches via client/api/     handles form submissions
/wp-json/yww/v1/*           wordpress.ts                → Klaviyo
```

**WordPress data flow:**
1. TSX pages call `usePageContent("slug")` → `GET /wp-json/yww/v1/pages/{slug}`
2. WordPress returns `yww_page_content` meta as flat JSON (`Record<string, string>`)
3. TSX renders: `cms?.field_name || "fallback text"` — the fallback is also used as the seed value

All WordPress fetches happen **client-side** directly to the WP REST API. The Express server only handles form submissions (Klaviyo).

**Custom post types** (coaches, blogs, podcasts, events, workshops, testimonials, FAQs) are registered in `yww-content-types.php` and fetched via dedicated hooks in `client/hooks/` (e.g. `useCoaches`, `useBlogs`).

**Global settings** (footer text, contact info, social links, brand logos) come from `useGlobalSettings()` → `GET /wp-json/yww/v1/options`.

**SEO:** Pages use `useYoastSEO(slug)` to fetch Yoast meta from `/wp-json/yww/v1/seo/{slug}` and inject it via `react-helmet-async`.

## CMS Field System

### Adding fields to an existing page
Use `cms?.new_field_name || "default value"` in a TSX page, then run `npm run cms:sync -- --write`. The fallback string becomes the initial seed value in WordPress.

Field type is inferred from the suffix:
- `*_image / *_photo / *_foto / *_video / *_url / *_src / *_thumbnail` → image picker
- `*_text / *_tekst / *_content / *_bio / *_intro / *_items / *_quote / *_description` → textarea
- everything else → text input

### Creating a new page
Add the annotation at the top of the TSX file:
```tsx
// @cms-page slug="my-slug" route="/my/path" title="Page Title" menuParent="Nav Label" menuLabel="Sub Label"
```
Then run `npm run deploy`. This automatically:
- Adds entry to `shared/page-registry.mjs`
- Adds route to `client/App.tsx`
- Adds nav item to `client/components/Layout.tsx`
- Creates WP page + seeds all fields with real TSX fallback values

### Fixing placeholder values in WP Admin
If a page was seeded before real defaults existed and shows `[Field Name]` placeholders:
```bash
npm run deploy  # runs cms-sync --write --reseed automatically
```
`--reseed` replaces `[...]` placeholders with real TSX defaults without touching content that editors have already filled in.

## Key Files

| File | Purpose |
|---|---|
| `client/App.tsx` | React Router route definitions |
| `client/components/Layout.tsx` | `mainNavItems` array — nav structure |
| `client/api/wordpress.ts` | All WP REST API fetch functions |
| `client/api/wp-types.ts` | TypeScript types for WP responses |
| `shared/page-registry.mjs` | Single source of truth for all pages (routes, WP slugs, SEO, sitemap) |
| `wordpress/wp-content/mu-plugins/yww-admin-ui.php` | CMS field definitions per page slug (`yww_get_page_fields`) |
| `wordpress/wp-content/mu-plugins/yww-content-types.php` | Custom post types + REST endpoints (`/wp-json/yww/v1/*`) |
| `scripts/cms-sync.mjs` | Scans TSX → updates PHP → seeds WP with real defaults |
| `scripts/deploy.mjs` | Full deploy: Vercel --prod + CMS sync + rsync PHP to Cloud86 + sync WP pages |

## Server

`server/index.ts` creates the Express app. `server/node-build.ts` is the production entry — serves the SPA from `dist/spa/` and mounts API routes. Route handlers in `server/routes/*.ts` all submit to **Klaviyo** (newsletter, forms, event registrations).

The build process also runs `scripts/generate-sitemap.mjs` and `scripts/prerender.mjs` as part of `npm run build:client`.

## Environment

`.env` — local dev (committed). `.env.production` — production secrets (gitignored).

`deploy.mjs` loads `.env.production` automatically. `cms-sync.mjs` and `sync-wp-pages.mjs` do NOT — pass env vars inline or use `npm run deploy`.

`WP_PASS` must be a WordPress **Application Password** (WP Admin → Users → Profile). Quote it if it contains spaces:
```
WP_PASS="EG2U hLe3 q8eZ 7FkH L4Va AngS"
```

## PHP Admin UI Structure

`yww-admin-ui.php` uses fixed indentation that `cms-sync.mjs` depends on for parsing:
- Slug entries: **8-space** indent inside `$pages = [...]`
- Field entries: **12-space** indent inside each slug block

Slug aliases (production slug → local slug) are defined in both `yww-admin-ui.php` and `seedWordPress()` in `cms-sync.mjs`, e.g. `groepstrainingen` → `retreats`.
