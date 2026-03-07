# External Integrations

**Analysis Date:** 2026-03-07

## APIs & External Services

**WordPress REST API (CMS):**
- Base URL: `https://cms.youngwisewomen.nl/wp-json/yww/v1/`
- Client: Custom fetch wrapper in `client/api/wordpress.ts`
- Auth: Public read-only (no auth needed for content fetching)
- Admin auth (for seeding/sync scripts): HTTP Basic via `WP_USER` + `WP_PASS` env vars
- Custom endpoints registered in `wordpress/wp-content/mu-plugins/yww-content-types.php`:
  - `GET /yww/v1/pages/{slug}` - Page content (flat JSON key/value)
  - `GET /yww/v1/coaches` - Coach profiles
  - `GET /yww/v1/testimonials` - Testimonials
  - `GET /yww/v1/events` - Events/calendar
  - `GET /yww/v1/podcasts` - Podcast episodes
  - `GET /yww/v1/blogs` - Blog posts list
  - `GET /yww/v1/blogs/{slug}` - Single blog post
  - `GET /yww/v1/workshops` - Workshop listings
  - `GET /yww/v1/faqs` - FAQs (optionally filtered by `?page=slug`)
  - `GET /yww/v1/options` - Global site settings (footer, contact, social, brands)
  - `GET /yww/v1/seo/{slug}` - Yoast SEO metadata per page
  - `GET /yww/v1/nav` - Navigation menu structure

**Klaviyo (Email Marketing & CRM):**
- Base URL: `https://a.klaviyo.com/api`
- Client: Custom wrapper in `server/lib/klaviyo.ts`
- Auth: `KLAVIYO_PRIVATE_KEY` env var, sent as `Klaviyo-API-Key` header
- API Revision: `KLAVIYO_API_REVISION` env var (defaults to `2024-10-15`)
- Operations used:
  - `POST /profile-import/` - Upsert profile with custom properties
  - `POST /profile-subscription-bulk-create-jobs/` - Subscribe profile to a list
  - `POST /events/` - Create custom metric events
- List IDs (env vars):
  - `KLAVIYO_LIST_ID_NEWSLETTER` - Newsletter subscribers
  - `KLAVIYO_LIST_ID_NETWERK` - Network members
  - `KLAVIYO_LIST_ID_TRAININGS` - Training/weekend registrations
  - `KLAVIYO_LIST_ID_LEADS` - General leads (groeiscan, vraagbaak) - default fallback: `R4PSyk`
  - `KLAVIYO_LIST_ID_BEDRIJFS` - Business/corporate brochure leads

## Express API Routes (Server-Side)

All routes are defined in `server/index.ts` and handle form submissions by forwarding to Klaviyo.

**Newsletter/Subscription Routes:**
- `POST /api/newsletter/subscribe` - Newsletter signup (`server/routes/newsletter.ts`)
  - Creates Klaviyo profile + subscribes to newsletter list + fires "Nieuwsbrief Inschrijving" event
- `POST /api/mailchimp/subscribe` - Legacy newsletter route (`server/routes/mailchimp.ts`)
  - Same behavior as newsletter route (name is historical; actually uses Klaviyo)
- `POST /api/netwerk/subscribe` - Network membership signup (`server/routes/netwerk.ts`)
  - Subscribes to both netwerk AND newsletter lists simultaneously
  - Fires "Netwerk Inschrijving" event

**Lead Capture Routes:**
- `POST /api/bedrijfs/brochure-lead` - Corporate brochure download lead (`server/routes/bedrijfs.ts`)
  - Captures company + role, fires "Bedrijfs Brochure Download" event
- `POST /api/groeiscan/lead` - Growth scan quiz results (`server/routes/groeiscan.ts`)
  - Captures quiz answers + recommendation, fires "Groeiscan Ingevuld" event
  - Request type defined in `shared/api.ts` (`GroeiScanLeadRequest`)
- `POST /api/vraagbaak/lead` - Advisory chatbot lead (`server/routes/vraagbaak.ts`)
  - Captures chat messages + intake answers, fires "Vraagbaak Lead Ingevuld" event
  - Request type defined in `shared/api.ts` (`VraagbaakLeadRequest`)

**Event Registration Routes:**
- `POST /api/weekend/inschrijving` - Weekend training registration (`server/routes/weekend-inschrijving.ts`)
  - Handles package selection, friend/company details
  - Subscribes to trainings list, fires "Weekend Inschrijving Gestart" event

**Debug/Utility Routes:**
- `GET /api/ping` - Health check
- `GET /api/debug/env-check` - Shows which Klaviyo env vars are set (boolean only, no values)
- `GET /api/demo` - Demo response (`server/routes/demo.ts`)

## Data Storage

**Databases:**
- WordPress MySQL - Hosted on Cloud86 shared hosting
  - Managed by WordPress core, no direct DB access from Node.js
  - Content stored as post meta (`yww_page_content`) and custom post types
  - Connection configured in WordPress `wp-config.php` on server (not in this repo)

**File Storage:**
- WordPress Media Library - Images/media uploaded via WP Admin on Cloud86
  - Served from `https://cms.youngwisewomen.nl/wp-content/uploads/`
  - Referenced in CMS content fields as full URLs

**Caching:**
- TanStack React Query client-side caching:
  - `staleTime: 5 * 60 * 1000` (5 minutes) for page content and general data
  - `staleTime: 10 * 60 * 1000` (10 minutes) for SEO data
  - `gcTime: 10 * 60 * 1000` (10 minutes) garbage collection
  - `retry: 1` for most queries
- No server-side caching layer

## Authentication & Identity

**WordPress Admin Auth:**
- WordPress Application Passwords for REST API write access
- Used by: `scripts/cms-sync.mjs`, `scripts/sync-wp-pages.mjs`, `scripts/deploy.mjs`
- Env vars: `WP_USER`, `WP_PASS`
- Auth method: HTTP Basic (`Authorization: Basic base64(user:pass)`)

**End-User Auth:**
- None - The frontend has no user authentication system
- All content is publicly accessible

## SEO Integration

**Yoast SEO (WordPress Plugin):**
- Custom REST endpoint: `GET /wp-json/yww/v1/seo/{slug}`
- Returns: title, description, canonical, og_title, og_description, og_image, og_type, schema JSON-LD, robots
- Client hook: `client/hooks/useYoastSEO.ts`
- Injected via `react-helmet-async` in each page component
- Default SEO values defined in `shared/page-registry.mjs`

## Monitoring & Observability

**Error Tracking:**
- None detected - No Sentry, Datadog, or similar integration

**Logs:**
- `console.log` / `console.error` in server routes
- Production errors in Klaviyo routes include `error.message` detail in non-production only (`process.env.NODE_ENV === "production" ? undefined : detail`)
- Vercel serverless function logs available via Vercel dashboard

## CI/CD & Deployment

**Hosting:**
- Frontend SPA: Vercel (`young-wise-women-3.vercel.app` / `youngwisewomen.nl`)
  - Static files from `dist/spa/`
  - Serverless function for API at `api/[...all].ts` (wraps Express via `serverless-http`)
  - Config: `vercel.json`
- WordPress CMS: Cloud86 shared hosting at `cms.youngwisewomen.nl`
  - SSH access: `CLOUD86_SSH_USER@CLOUD86_SSH_HOST`
  - WP path: `CLOUD86_WP_PATH` (typically `/var/www/vhosts/awarenessinbusiness.com/cms.youngwisewomen.nl`)

**CI Pipeline:**
- No automated CI detected (no GitHub Actions, no Vercel CI config)
- Deployment is manual via `npm run deploy` (`scripts/deploy.mjs`)

**Deploy Flow:**
1. `vercel --prod` - Push SPA + serverless function to Vercel
2. `cms-sync.mjs --write --reseed` - Sync field definitions to production WP
3. `rsync` over SSH - Deploy PHP mu-plugins and theme to Cloud86
4. `sync-wp-pages.mjs` - Create any missing WordPress pages

## Vercel Configuration

**Config file:** `vercel.json`
- Framework: Vite
- Install command: `pnpm install --no-frozen-lockfile`
- Build command: `pnpm build`
- Output directory: `dist/spa`
- Serverless function: `api/[...all].ts` with `includeFiles: "server/**,shared/**"`
- Rewrites:
  - `/api/*` -> serverless function
  - `/wp-json/*` -> proxied to `https://cms.youngwisewomen.nl/wp-json/*`
  - All other routes -> `index.html` (SPA fallback)

## WordPress Custom Post Types

Registered in `wordpress/wp-content/mu-plugins/yww-content-types.php`:
- `yww_coach` - Coach profiles (name, bio, role, image, order)
- `yww_testimonial` - Client testimonials (name, date, quote, image, order)
- `yww_event` - Calendar events (label, type, dates, description, link)
- `yww_podcast` - Podcast episodes (title, teaser, duration, guest, YouTube/Spotify URLs)
- `yww_blog` - Blog posts (title, excerpt, structured sections, CTA)
- `yww_workshop` - Workshop listings (title, description, pricing, schedule)
- `yww_faq` - FAQ entries (question, answer, page assignment, order)

## Environment Configuration

**Required env vars for production deploy:**
- `WP_URL` - WordPress base URL
- `WP_USER` - WordPress admin username
- `WP_PASS` - WordPress Application Password (may contain spaces, must be quoted)
- `KLAVIYO_PRIVATE_KEY` - Klaviyo API private key
- `KLAVIYO_LIST_ID_NEWSLETTER` - Klaviyo list ID for newsletter
- `KLAVIYO_LIST_ID_NETWERK` - Klaviyo list ID for network members
- `KLAVIYO_LIST_ID_TRAININGS` - Klaviyo list ID for training registrations
- `KLAVIYO_LIST_ID_LEADS` - Klaviyo list ID for general leads
- `KLAVIYO_LIST_ID_BEDRIJFS` - Klaviyo list ID for corporate leads
- `CLOUD86_SSH_USER` - SSH username for Cloud86
- `CLOUD86_SSH_HOST` - SSH host for Cloud86
- `CLOUD86_WP_PATH` - WordPress root path on Cloud86

**Optional env vars:**
- `KLAVIYO_API_REVISION` - Klaviyo API version (default: `2024-10-15`)
- `VITE_WP_API_URL` - WP API URL for client-side (default: `http://localhost:8081/wp-json`)
- `WP_TARGET` - Dev proxy target for WordPress (default: `https://cms.youngwisewomen.nl`)
- `PING_MESSAGE` - Custom ping response message
- `PRERENDER_ENABLED` - Set to `false` to skip pre-rendering

**Secrets location:**
- `.env.production` in project root (gitignored)
- Vercel environment variables for production serverless functions

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- All outgoing communication is via Klaviyo API calls from Express route handlers
- Klaviyo events trigger automated email flows configured in the Klaviyo dashboard (external)

---

*Integration audit: 2026-03-07*
