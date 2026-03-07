# Architecture

**Analysis Date:** 2026-03-07

## Pattern Overview

**Overall:** Headless WordPress CMS + React SPA + Express API Server

**Key Characteristics:**
- WordPress serves as a headless CMS only (no frontend rendering) -- all content is delivered via custom REST endpoints under `/wp-json/yww/v1/*`
- React SPA fetches all content client-side directly from the WordPress REST API
- Express server handles only form submissions (all routed to Klaviyo email marketing API)
- A custom CMS sync toolchain automatically keeps PHP field definitions, WordPress page seeds, React routes, and navigation in sync from TSX source files
- Two deployment targets: Vercel (SPA + serverless API functions) and Cloud86 (WordPress + PHP plugins via rsync)

## Layers

**WordPress CMS (Content Layer):**
- Purpose: Content management, storage, and REST API delivery
- Location: `wordpress/wp-content/mu-plugins/` (PHP plugins deployed to Cloud86)
- Contains: Custom post type registration (`yww-content-types.php`), admin UI field definitions (`yww-admin-ui.php`), and a headless theme (`wordpress/wp-content/themes/yww-headless/`)
- Depends on: WordPress core, Yoast SEO plugin (optional)
- Used by: React SPA client hooks (via REST API)

**React SPA (Presentation Layer):**
- Purpose: Client-side rendering, routing, user interaction
- Location: `client/`
- Contains: Pages (`client/pages/`), components (`client/components/`), hooks (`client/hooks/`), API client (`client/api/`), utilities (`client/lib/`)
- Depends on: WordPress REST API (content), Express API (form submissions)
- Used by: End users in browser

**Express API Server (Backend Layer):**
- Purpose: Handle form submissions and relay data to Klaviyo
- Location: `server/`
- Contains: Route handlers (`server/routes/`), Klaviyo client library (`server/lib/klaviyo.ts`)
- Depends on: Klaviyo API, environment variables for API keys and list IDs
- Used by: React SPA form components (via `POST /api/*`)

**Shared Module:**
- Purpose: Single source of truth for page definitions (routes, WP slugs, SEO metadata, sitemap config)
- Location: `shared/page-registry.mjs`
- Contains: `PAGE_REGISTRY` array, `WP_PAGES` and `SITEMAP_ROUTES` derived exports
- Depends on: Nothing
- Used by: Build scripts (`generate-sitemap.mjs`, `prerender.mjs`, `sync-wp-pages.mjs`, `cms-sync.mjs`)

**Build & Deploy Toolchain:**
- Purpose: Synchronize CMS fields, deploy to Vercel and Cloud86, generate sitemaps, prerender pages
- Location: `scripts/`
- Contains: `deploy.mjs`, `cms-sync.mjs`, `sync-wp-pages.mjs`, `generate-sitemap.mjs`, `prerender.mjs`
- Depends on: `shared/page-registry.mjs`, WordPress REST API (for seeding), Cloud86 SSH access
- Used by: Developer running `npm run deploy` or `npm run cms:sync`

## Data Flow

**Page Content Rendering:**

1. User navigates to a route in the browser (e.g. `/retreats`)
2. React Router matches route in `client/App.tsx` and renders the page component (e.g. `client/pages/Retreats.tsx`)
3. Page component calls `usePageContent("retreats")` which triggers a React Query fetch
4. `fetchPageContent("retreats")` in `client/api/wordpress.ts` calls `GET /wp-json/yww/v1/pages/retreats`
5. WordPress returns the `yww_page_content` meta field as a flat JSON object (`Record<string, string>`)
6. TSX renders each field with inline fallback: `cms?.field_name || "fallback text"`

**Custom Post Type Rendering (e.g. coaches, blogs):**

1. Page component calls a domain hook like `useCoaches()` or `useBlogs()`
2. Hook delegates to `useWPContent()` which wraps React Query with fallback data
3. `fetchCoaches()` in `client/api/wordpress.ts` calls `GET /wp-json/yww/v1/coaches`
4. WordPress PHP in `yww-content-types.php` queries `yww_coach` custom post type and maps meta fields to JSON
5. Hook returns data with hardcoded fallback used as `placeholderData` during loading and if API fails

**Form Submission (e.g. newsletter signup):**

1. User fills out form in a React component (e.g. `client/components/NewsletterSignup.tsx`)
2. Component POSTs JSON to `/api/newsletter/subscribe`
3. Express route handler in `server/routes/newsletter.ts` validates input
4. Handler calls `subscribeProfileToList()` and `createEvent()` from `server/lib/klaviyo.ts`
5. Klaviyo client makes authenticated POST requests to Klaviyo API (`https://a.klaviyo.com/api`)
6. Handler returns `{ success: true }` or error response

**CMS Field Sync (Developer Workflow):**

1. Developer adds `cms?.new_field || "default value"` in a TSX page file
2. Developer runs `npm run cms:sync -- --write`
3. `scripts/cms-sync.mjs` scans all TSX files in `client/pages/` for `cms?.fieldname` patterns
4. Script extracts field names and fallback values, infers field type from suffix
5. Script updates `wordpress/wp-content/mu-plugins/yww-admin-ui.php` with new field definitions
6. Script seeds WordPress via REST API, writing fallback values into `yww_page_content` meta

**Full Deploy:**

1. `npm run deploy` runs `scripts/deploy.mjs` which loads `.env.production`
2. Step 1: `vercel --prod` deploys the built SPA to Vercel
3. Step 2: `cms-sync --write --reseed` syncs CMS fields to production WordPress
4. Step 3: `rsync` deploys PHP mu-plugins and theme to Cloud86 via SSH
5. Step 4: `sync-wp-pages.mjs` creates any missing WordPress pages from `PAGE_REGISTRY`

**State Management:**
- All server-side state lives in WordPress (content, custom posts, global settings)
- Client-side state management uses React Query (`@tanstack/react-query`) for all API data
- Query cache: 5 min `staleTime`, 10 min `gcTime`, 1 retry
- No client-side global state store (no Redux, Zustand, etc.)
- Form state is managed locally per component with `useState`

## Key Abstractions

**usePageContent(slug):**
- Purpose: Fetch page-level CMS content as a flat key-value map
- Location: `client/hooks/usePageContent.ts`
- Pattern: Returns `Record<string, string>`, consumed as `cms?.field_name || "fallback"`
- The fallback pattern doubles as the seed value for `cms-sync.mjs`

**useWPContent(options):**
- Purpose: Generic wrapper for fetching any WordPress content with React Query and fallback data
- Location: `client/hooks/useWPContent.ts`
- Pattern: Accepts `queryKey`, `queryFn`, and `fallbackData`. Returns React Query result with `placeholderData` set to fallback so the UI always renders
- Used by: `useCoaches`, `useBlogs`, `useEvents`, `usePodcasts`, `useWorkshops`, `useGlobalSettings`, `useNavMenu`

**wpFetch<T>(endpoint):**
- Purpose: Type-safe wrapper around `fetch` for the custom WP REST API
- Location: `client/api/wordpress.ts`
- Pattern: Prepends `{WP_API_URL}/yww/v1/` to endpoint, throws on non-OK responses

**subscribeProfileToList / createEvent:**
- Purpose: Klaviyo API operations used by all form submission handlers
- Location: `server/lib/klaviyo.ts`
- Pattern: `upsertProfile` first, then `subscribeProfileToList` (list subscription) and/or `createEvent` (custom metric tracking)

**SEOHead:**
- Purpose: Inject `<title>`, meta description, Open Graph, Twitter Card, and JSON-LD into `<head>`
- Location: `client/components/SEOHead.tsx`
- Pattern: Every page component includes `<SEOHead title="..." description="..." path="/..." />` at the top of its JSX

**PAGE_REGISTRY:**
- Purpose: Single source of truth for all pages -- connects React routes to WordPress slugs, SEO defaults, and sitemap config
- Location: `shared/page-registry.mjs`
- Pattern: Array of objects with `route`, `wpSlug`, `wpTitle`, `seoTitle`, `seoDescription`, `sitemap`
- Consumed by: `generate-sitemap.mjs`, `prerender.mjs`, `sync-wp-pages.mjs`, `cms-sync.mjs`

## Entry Points

**Browser (SPA):**
- Location: `index.html` -> `client/App.tsx`
- Triggers: User navigates to any URL
- Responsibilities: Bootstraps React app, mounts router, renders `<Layout>` with page component

**Dev Server:**
- Location: `vite.config.ts`
- Triggers: `npm run dev` (port 8080)
- Responsibilities: Serves SPA with HMR, proxies `/wp-json`, `/wp-content`, `/wp-admin` to WordPress (defaults to production CMS), mounts Express app as Vite middleware for `/api/*` routes

**Production Node Server:**
- Location: `server/node-build.ts`
- Triggers: `npm run start` (port 3000)
- Responsibilities: Creates Express app via `server/index.ts`, serves static SPA from `dist/spa/`, handles `/api/*` routes, falls back to `index.html` for client-side routing

**Vercel Serverless Function:**
- Location: `api/[...all].ts`
- Triggers: Any request to `/api/*` on Vercel
- Responsibilities: Wraps Express app with `serverless-http` for Vercel's serverless runtime. Note: this is currently a known issue -- Vercel bundling of `server/` directory does not work reliably (see `docs/VERCEL-API-DEBUG-REPORT.md`)

**Deploy Script:**
- Location: `scripts/deploy.mjs`
- Triggers: `npm run deploy`
- Responsibilities: Full pipeline: Vercel deploy, CMS sync, PHP rsync to Cloud86, WP page sync

**CMS Sync Script:**
- Location: `scripts/cms-sync.mjs`
- Triggers: `npm run cms:sync` (dry-run) or `npm run cms:sync -- --write` (apply)
- Responsibilities: Scan TSX for CMS fields, update PHP field definitions, update page registry / App.tsx / Layout.tsx for new `@cms-page` pages, seed WordPress with fallback values

## Error Handling

**Strategy:** Fallback-first with graceful degradation

**Patterns:**
- **WordPress API failures**: Every content hook provides hardcoded `fallbackData` (or `placeholderData: {}` for page content). If the WP API is unreachable, the SPA still renders with fallback content. React Query retries once before using fallback.
- **Form submission failures**: Express route handlers wrap Klaviyo calls in try/catch, log errors with `console.error`, and return structured `{ error: "message" }` JSON responses with appropriate HTTP status codes (400, 405, 500).
- **Klaviyo API failures**: `server/lib/klaviyo.ts` reads error response text and throws descriptive `Error` objects. Route handlers catch and return 500 with detail.
- **Missing environment variables**: `server/lib/klaviyo.ts` uses `getRequiredEnv()` which throws immediately if a var is missing. Route handlers check list ID env vars and return 500 with "Server configuration error".
- **Build-time API failures**: Sitemap and prerender scripts catch fetch errors and continue with empty dynamic routes (graceful fallback to static routes only).

## Cross-Cutting Concerns

**Logging:** `console.log` / `console.error` throughout. No structured logging framework. Server routes log errors to console on failure.

**Validation:** Minimal -- route handlers check for required fields (`email`, `firstName`, etc.) and return 400. Zod is listed as a dependency but not observed in active use for request validation. Client-side forms use HTML5 `required` attributes and `react-hook-form` in some components.

**Authentication:** No user authentication in the SPA. WordPress admin uses Application Passwords for REST API writes (used by deploy/sync scripts only). Klaviyo API uses server-side private key (`KLAVIYO_PRIVATE_KEY` env var). WordPress REST API reads are unauthenticated (public).

**SEO:** Each page uses `<SEOHead>` component for meta tags. Yoast SEO plugin on WordPress provides additional metadata via `/wp-json/yww/v1/seo/{slug}` (consumed by `useYoastSEO` hook). Sitemap generated at build time from `PAGE_REGISTRY`. Pre-rendering via Puppeteer for crawlers.

**Caching:** React Query handles client-side caching (5 min stale, 10 min GC). No server-side caching. WordPress REST responses may be cached by LiteSpeed on Cloud86.

**CORS:** Configured in two places: `wordpress/wp-content/themes/yww-headless/functions.php` (allowlist of specific origins) and `wordpress/wp-content/mu-plugins/yww-content-types.php` (wildcard `*` for public read-only endpoints). Express server uses `cors()` middleware.

---

*Architecture analysis: 2026-03-07*
