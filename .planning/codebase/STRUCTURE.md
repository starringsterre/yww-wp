# Codebase Structure

**Analysis Date:** 2026-03-07

## Directory Layout

```
yww-wp/
├── api/                    # Vercel serverless function entry point
├── client/                 # React SPA source code
│   ├── api/                # WordPress REST API client and types
│   ├── components/         # Shared React components
│   │   └── ui/             # shadcn/ui primitive components (48 files)
│   ├── hooks/              # React Query hooks for WP data fetching
│   ├── lib/                # Utility functions and constants
│   └── pages/              # Page-level route components
├── dist/                   # Build output (gitignored contents)
│   ├── spa/                # Vite-built SPA (index.html, assets)
│   └── server/             # Vite-built server (production.mjs)
├── docs/                   # Planning docs, guides, logs
├── public/                 # Static assets (images, robots.txt, sitemap.xml)
├── scripts/                # Build, deploy, and CMS sync tooling
├── server/                 # Express API server
│   ├── lib/                # Server-side utility modules (Klaviyo client)
│   └── routes/             # Express route handlers
├── shared/                 # Code shared between client and scripts
├── wordpress/              # WordPress PHP files (deployed to Cloud86)
│   └── wp-content/
│       ├── mu-plugins/     # Must-use plugins (content types, admin UI)
│       └── themes/
│           └── yww-headless/  # Headless WP theme (CORS, customizer)
├── index.html              # SPA entry point (loads client/App.tsx)
├── package.json            # Dependencies and scripts (pnpm)
├── vite.config.ts          # Client build + dev server config
├── vite.config.server.ts   # Server build config
├── vercel.json             # Vercel deployment configuration
├── tailwind.config.ts      # Tailwind CSS theme configuration
├── tsconfig.json           # TypeScript configuration
└── postcss.config.js       # PostCSS (Tailwind + Autoprefixer)
```

## Directory Purposes

**`api/`:**
- Purpose: Vercel serverless function catch-all
- Contains: Single file `[...all].ts` that wraps the Express app with `serverless-http`
- Key files: `api/[...all].ts`

**`client/api/`:**
- Purpose: WordPress REST API client layer
- Contains: Typed fetch functions for every WP endpoint and TypeScript interfaces for WP response shapes
- Key files: `client/api/wordpress.ts` (all fetch functions), `client/api/wp-types.ts` (interfaces for WPCoach, WPBlog, WPEvent, etc.)

**`client/components/`:**
- Purpose: Reusable React components shared across pages
- Contains: Domain components (Layout, SEOHead, HeroSection, NewsletterSignup, GroeiScanSection, EventCalendar, etc.) and animation wrappers (ScrollFadeInUp, SlideInLeft, SlideInRight, BlurReveal, StaggerChildren)
- Key files: `client/components/Layout.tsx` (header/footer/nav), `client/components/SEOHead.tsx` (meta tags), `client/components/HeroSection.tsx` (page hero banner)

**`client/components/ui/`:**
- Purpose: shadcn/ui component library primitives (auto-generated, do not edit heavily)
- Contains: ~48 Radix-based UI components (button, dialog, toast, accordion, tabs, form, card, carousel, etc.)
- Key files: `client/components/ui/button.tsx`, `client/components/ui/toaster.tsx`, `client/components/ui/toast.tsx`

**`client/hooks/`:**
- Purpose: React Query hooks that fetch and cache WordPress content
- Contains: One hook per content type, plus utility hooks
- Key files:
  - `client/hooks/usePageContent.ts` -- fetch flat CMS fields for any page slug
  - `client/hooks/useWPContent.ts` -- generic WP content hook with fallback data
  - `client/hooks/useGlobalSettings.ts` -- footer, contact, social, branding
  - `client/hooks/useNavMenu.ts` -- navigation menu structure
  - `client/hooks/useCoaches.ts`, `client/hooks/useBlogs.ts`, `client/hooks/useEvents.ts`, `client/hooks/usePodcasts.ts`, `client/hooks/useWorkshops.ts`, `client/hooks/useFAQs.ts`, `client/hooks/useTestimonials.ts`
  - `client/hooks/useYoastSEO.ts` -- Yoast SEO metadata per page
  - `client/hooks/useBlog.ts` -- single blog post by slug
  - `client/hooks/useIsDesktop.ts` -- media query hook

**`client/lib/`:**
- Purpose: Client-side utility functions and data constants
- Contains: Tailwind `cn()` helper, multiline text renderer, site branding constants, static data
- Key files: `client/lib/utils.ts` (`cn` function), `client/lib/siteBranding.ts` (logo URL, base URL), `client/lib/renderMultiline.tsx` (newline-to-paragraphs), `client/lib/inspirationItems.ts`, `client/lib/testimonials.ts`

**`client/pages/`:**
- Purpose: Top-level page components, one per route
- Contains: 19 page files, each a default-exported React component
- Key files: `client/pages/Home.tsx`, `client/pages/Retreats.tsx`, `client/pages/Contact.tsx`, `client/pages/BlogDetail.tsx`, `client/pages/WeekendIntensiveTransactie.tsx`, `client/pages/LidWorden.tsx`, `client/pages/NotFound.tsx`

**`server/`:**
- Purpose: Express API server for form submissions
- Contains: Server creation, route handlers, Klaviyo integration
- Key files: `server/index.ts` (creates Express app, mounts routes), `server/node-build.ts` (production entry with static file serving)

**`server/routes/`:**
- Purpose: Individual Express route handlers, each handling one form type
- Contains: 8 route handler files
- Key files: `server/routes/newsletter.ts`, `server/routes/netwerk.ts`, `server/routes/bedrijfs.ts`, `server/routes/weekend-inschrijving.ts`, `server/routes/groeiscan.ts`, `server/routes/vraagbaak.ts`, `server/routes/mailchimp.ts`, `server/routes/demo.ts`

**`server/lib/`:**
- Purpose: Server-side utility modules
- Contains: Klaviyo API client
- Key files: `server/lib/klaviyo.ts` (upsertProfile, subscribeProfileToList, createEvent)

**`shared/`:**
- Purpose: Code and data shared between client, server, and build scripts
- Contains: Page registry (single source of truth for all pages)
- Key files: `shared/page-registry.mjs` (PAGE_REGISTRY, WP_PAGES, SITEMAP_ROUTES)

**`scripts/`:**
- Purpose: Build, deploy, and CMS synchronization tooling
- Contains: Node.js scripts run via npm commands
- Key files:
  - `scripts/deploy.mjs` -- full deploy pipeline (Vercel + CMS sync + rsync + WP pages)
  - `scripts/cms-sync.mjs` -- scan TSX for CMS fields, update PHP, seed WordPress
  - `scripts/sync-wp-pages.mjs` -- create missing WordPress pages from registry
  - `scripts/generate-sitemap.mjs` -- generate sitemap.xml from PAGE_REGISTRY + dynamic blog slugs
  - `scripts/prerender.mjs` -- pre-render pages to static HTML via Puppeteer

**`wordpress/wp-content/mu-plugins/`:**
- Purpose: WordPress must-use plugins that define the headless CMS behavior
- Contains: Custom post types, REST API endpoints, admin meta boxes, and CMS field definitions
- Key files:
  - `wordpress/wp-content/mu-plugins/yww-content-types.php` -- registers 7 custom post types (coach, testimonial, event, podcast, blog, workshop, FAQ), their meta fields, and 12 REST API endpoints under `/wp-json/yww/v1/*`
  - `wordpress/wp-content/mu-plugins/yww-admin-ui.php` -- admin meta boxes for editing content, and `yww_get_page_fields()` function defining CMS fields per page slug (auto-updated by cms-sync.mjs)

**`wordpress/wp-content/themes/yww-headless/`:**
- Purpose: Minimal WordPress theme for headless operation
- Contains: CORS configuration, customizer settings (contact, social, footer), security hardening
- Key files: `wordpress/wp-content/themes/yww-headless/functions.php`

**`public/`:**
- Purpose: Static assets served as-is (images, favicon, robots.txt, sitemap)
- Contains: Image files, SVGs, sitemap.xml (auto-generated)
- Key files: `public/robots.txt`, `public/sitemap.xml`, `public/YWW Favicon.svg`

## Key File Locations

**Entry Points:**
- `index.html`: SPA HTML shell, loads `client/App.tsx` as module
- `client/App.tsx`: React app root -- QueryClient, Router, Layout, all Routes
- `server/index.ts`: Express app factory (`createServer()`)
- `server/node-build.ts`: Production server entry (static files + API)
- `api/[...all].ts`: Vercel serverless function entry

**Configuration:**
- `vite.config.ts`: Dev server (port 8080), WP proxy targets, Express plugin, path aliases (`@/` -> `client/`, `@shared/` -> `shared/`)
- `vite.config.server.ts`: Server build config (Node 22 target, ESM output)
- `vercel.json`: Vercel deploy config (rewrites, serverless function config, headers)
- `tsconfig.json`: TypeScript config (strict: false, path aliases)
- `tailwind.config.ts`: Tailwind theme (custom colors, fonts, animations)
- `postcss.config.js`: PostCSS with Tailwind + Autoprefixer
- `client/global.css`: CSS variables (HSL color tokens), font imports (Lora, Poppins), custom animations
- `.prettierrc`: Prettier formatting config
- `components.json`: shadcn/ui configuration

**Core Logic:**
- `client/api/wordpress.ts`: All WordPress REST API fetch functions
- `client/api/wp-types.ts`: TypeScript interfaces for all WP response types
- `client/hooks/useWPContent.ts`: Generic React Query wrapper with fallback pattern
- `client/hooks/usePageContent.ts`: Page-level CMS content hook
- `server/lib/klaviyo.ts`: Klaviyo API client (profile upsert, list subscribe, event create)
- `shared/page-registry.mjs`: Central page definitions array

**Testing:**
- `client/lib/utils.spec.ts`: Unit test for `cn()` utility

## Naming Conventions

**Files:**
- Page components: PascalCase (`Home.tsx`, `BlogDetail.tsx`, `WeekendIntensiveTransactie.tsx`)
- Hooks: camelCase with `use` prefix (`usePageContent.ts`, `useCoaches.ts`, `useWPContent.ts`)
- Server routes: kebab-case (`weekend-inschrijving.ts`, `newsletter.ts`)
- Utility modules: camelCase (`siteBranding.ts`, `renderMultiline.tsx`)
- UI components (shadcn): kebab-case (`alert-dialog.tsx`, `hover-card.tsx`)
- Domain components: PascalCase (`HeroSection.tsx`, `NewsletterSignup.tsx`, `SEOHead.tsx`)
- Scripts: kebab-case (`cms-sync.mjs`, `deploy.mjs`, `sync-wp-pages.mjs`)
- PHP plugins: kebab-case with `yww-` prefix (`yww-content-types.php`, `yww-admin-ui.php`)

**Directories:**
- All lowercase, descriptive (`pages`, `hooks`, `components`, `routes`, `lib`, `scripts`)
- No nesting beyond one level in most cases (flat structure within each directory)

**Exports:**
- Page components: `export default function PageName()` (default exports)
- Hooks: named exports (`export function useXxx()`)
- API functions: named exports (`export async function fetchXxx()`)
- Server routes: named exports (`export async function handleXxx()`)
- UI components (shadcn): mixed named exports

## Where to Add New Code

**New Page:**
1. Create the TSX file in `client/pages/NewPage.tsx` with `@cms-page` annotation at top
2. Use `usePageContent("slug")` for CMS-editable fields with `|| "fallback"` pattern
3. Include `<SEOHead>` component at top of JSX
4. Run `npm run cms:sync -- --write` which auto-updates:
   - `shared/page-registry.mjs` (adds entry)
   - `client/App.tsx` (adds Route)
   - `client/components/Layout.tsx` (adds nav item)
   - `wordpress/wp-content/mu-plugins/yww-admin-ui.php` (adds field definitions)
   - WordPress (creates page + seeds field values)

**New CMS Field on Existing Page:**
1. Add `cms?.field_name || "default value"` in the existing page TSX file
2. Run `npm run cms:sync -- --write`
3. Field type is auto-inferred from suffix (see CLAUDE.md for suffix rules)

**New React Component:**
- Shared/reusable components: `client/components/ComponentName.tsx`
- UI primitives (shadcn): `client/components/ui/component-name.tsx` (use `npx shadcn-ui@latest add`)
- Animation wrappers: `client/components/AnimationName.tsx`

**New React Hook:**
- WordPress content hooks: `client/hooks/useNewType.ts` (follow `useWPContent` pattern with fallback data)
- Utility hooks: `client/hooks/useNewHook.ts`

**New API Route (Form Handler):**
1. Create handler in `server/routes/new-route.ts` (export `handleNewRoute`)
2. Register route in `server/index.ts` (add `app.post("/api/new-route", handleNewRoute)`)
3. Use `subscribeProfileToList` and/or `createEvent` from `server/lib/klaviyo.ts`

**New WordPress Custom Post Type:**
1. Register post type in `wordpress/wp-content/mu-plugins/yww-content-types.php`
2. Register meta fields in same file
3. Add REST endpoint via `register_rest_route` in same file
4. Add admin meta box in `wordpress/wp-content/mu-plugins/yww-admin-ui.php`
5. Add TypeScript interface in `client/api/wp-types.ts`
6. Add fetch function in `client/api/wordpress.ts`
7. Add React hook in `client/hooks/useNewType.ts` with fallback data

**New Utility Function:**
- Client-side: `client/lib/newUtil.ts`
- Server-side: `server/lib/newUtil.ts`
- Shared: `shared/newModule.mjs` (must be ESM `.mjs` for script compatibility)

**New Build/Deploy Script:**
- Location: `scripts/new-script.mjs`
- Add npm script in `package.json` if it should be run directly

## Special Directories

**`dist/`:**
- Purpose: Build output
- Generated: Yes (by `npm run build`)
- Committed: No (gitignored)
- Subdirectories: `dist/spa/` (client SPA), `dist/server/` (production server bundle)

**`node_modules/`:**
- Purpose: Package dependencies
- Generated: Yes (by `pnpm install`)
- Committed: No (gitignored)

**`public/`:**
- Purpose: Static assets copied as-is to build output
- Generated: Partially (`sitemap.xml` is auto-generated by build)
- Committed: Yes
- Note: Contains large image files (some > 5MB)

**`.vercel/`:**
- Purpose: Vercel CLI configuration and project linking
- Generated: Yes (by `vercel` CLI)
- Committed: No (gitignored)

**`docs/`:**
- Purpose: Planning documents, guides, and debug reports
- Generated: No (manually written)
- Committed: Yes
- Key files: `docs/DEPLOY-STAPPENPLAN.md`, `docs/VERCEL-API-DEBUG-REPORT.md`, `docs/WORDPRESS-CMS-GUIDE.md`

**`wordpress/`:**
- Purpose: PHP files deployed to Cloud86 production WordPress installation
- Generated: `yww-admin-ui.php` is partially auto-generated by `cms-sync.mjs`
- Committed: Yes
- Deployed via: `rsync` over SSH to Cloud86 (step 3 of `npm run deploy`)

---

*Structure analysis: 2026-03-07*
