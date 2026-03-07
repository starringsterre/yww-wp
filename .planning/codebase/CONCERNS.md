# Codebase Concerns

**Analysis Date:** 2026-03-07

## Tech Debt

**Vercel API Functions Broken in Production:**
- Issue: All Express API routes (`/api/newsletter/subscribe`, `/api/netwerk/subscribe`, etc.) work locally but crash on Vercel production. The `api/[...all].ts` catch-all cannot import `../server/index` because Vercel's serverless runtime does not bundle the `server/` and `shared/` directories into the function bundle. This has been broken since at least early March 2026.
- Files: `api/[...all].ts`, `server/index.ts`, `vercel.json`
- Impact: **Critical.** All form submissions (newsletter, netwerk signup, weekend registration, groeiscan, vraagbaak, bedrijfs brochure) are non-functional on production. Users submitting forms on the live site get errors or timeouts.
- Fix approach: Bundle server code into a self-contained file using esbuild (`esbuild server/index.ts --bundle --outfile=api/_server.js --platform=node --format=esm`) and import from `api/[...all].ts`, OR rewrite each API route as a standalone Vercel function in the `api/` directory without external imports. See `docs/VERCEL-API-DEBUG-REPORT.md` for full analysis and 5 proposed solutions.

**Debug Endpoint Left in Production Server:**
- Issue: `server/index.ts` exposes `/api/debug/env-check` that reveals which environment variables are set (as booleans). While it does not leak actual values, it confirms the existence and names of secret keys in production.
- Files: `server/index.ts` (lines 27-37)
- Impact: Minor information leak; helps attackers confirm infrastructure details.
- Fix approach: Remove the `/api/debug/env-check` route or gate it behind authentication.

**Scaffold Page `Index.tsx` Still Present:**
- Issue: `client/pages/Index.tsx` is the Fusion Starter boilerplate page with a "Generating your app..." spinner and a TODO comment (`FUSION_GENERATION_APP_PLACEHOLDER`). It is imported but not routed to in `App.tsx` (the `/` route points to `Home`), making it dead code.
- Files: `client/pages/Index.tsx`
- Impact: Dead code; confusing for maintainers. It also makes a fetch to `/api/demo` which is a leftover demo endpoint.
- Fix approach: Delete `client/pages/Index.tsx` and `server/routes/demo.ts`. Remove the `/api/demo` route from `server/index.ts`.

**Duplicate Newsletter Routes:**
- Issue: Two near-identical newsletter subscription routes exist: `server/routes/mailchimp.ts` (mounted at `/api/mailchimp/subscribe`) and `server/routes/newsletter.ts` (mounted at `/api/newsletter/subscribe`). Both subscribe to the same Klaviyo list with nearly identical logic. The `mailchimp.ts` filename is misleading since it actually uses Klaviyo.
- Files: `server/routes/mailchimp.ts`, `server/routes/newsletter.ts`, `server/index.ts` (lines 39-41)
- Impact: Confusing naming; unnecessary duplication. The client (`NewsletterSignup.tsx`) only uses `/api/newsletter/subscribe`.
- Fix approach: Remove `server/routes/mailchimp.ts` and its route registration. Rename references if any external systems call `/api/mailchimp/subscribe`.

**Hardcoded Event Dates Throughout Codebase:**
- Issue: The "Weekend Intensive juni 2026" event dates are hardcoded in multiple places rather than being fetched from CMS or configured in one location.
- Files: `server/routes/weekend-inschrijving.ts` (lines 79-81: `event_name`, `event_start_date`, `event_end_date`), `client/pages/WeekendIntensiveTransactie.tsx` (line 14: `PAGE_PATH`), plus CMS fallback strings in `client/pages/Kalender.tsx`, `client/pages/Weekenden.tsx`, `client/pages/Home.tsx`
- Impact: When the next event is scheduled, changes must be manually made across 5+ files. The server route will send wrong event metadata to Klaviyo if not updated.
- Fix approach: Move event configuration (dates, name, location) to CMS fields or a single shared config. Have the server route read event details from a config file or CMS.

**Hardcoded Fallback List ID in Server Routes:**
- Issue: `server/routes/groeiscan.ts` and `server/routes/vraagbaak.ts` both contain `const DEFAULT_KLAVIYO_LEADS_LIST_ID = "R4PSyk"` — a hardcoded Klaviyo list ID used as a fallback when `KLAVIYO_LIST_ID_LEADS` env var is missing.
- Files: `server/routes/groeiscan.ts` (line 5), `server/routes/vraagbaak.ts` (line 5)
- Impact: If the env var is missing, it silently falls back to a potentially stale list ID. This also couples code to a specific Klaviyo account.
- Fix approach: Fail loudly if the env var is missing (like other routes do), or move the default to a shared constants file.

**Unused Heavy Dependencies:**
- Issue: `three` (31MB), `@react-three/fiber`, `@react-three/drei`, `recharts` (5.2MB) are installed as devDependencies but never imported in any client code. Several ShadCN UI component wrappers (`chart.tsx`, `input-otp.tsx`, `resizable.tsx`, `command.tsx`) import their corresponding libraries but are never used by any page or component.
- Files: `package.json` (lines 62-63, 95, 101), `client/components/ui/chart.tsx`, `client/components/ui/input-otp.tsx`, `client/components/ui/resizable.tsx`, `client/components/ui/command.tsx`
- Impact: Bloated `node_modules` (~40MB wasted). If tree-shaking fails, these could increase client bundle size.
- Fix approach: Remove `three`, `@react-three/fiber`, `@react-three/drei`, `recharts`, `input-otp`, `cmdk`, `react-resizable-panels` from `package.json`. Delete unused UI component wrappers. Keep `react-day-picker` (used by `calendar.tsx` if calendar is used).

**49 ShadCN UI Components, Most Unused:**
- Issue: The `client/components/ui/` directory contains 49 component files, but pages only import a handful: `button`, `dialog`, `toast/toaster/use-toast`, `sonner`, `tooltip`, `form`, `input`, `label`, `select`, `accordion`. The rest (~35+ components) are unused dead code.
- Files: `client/components/ui/` (full directory listing includes: `alert-dialog.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `calendar.tsx`, `card.tsx`, `carousel.tsx`, `chart.tsx`, `checkbox.tsx`, `collapsible.tsx`, `command.tsx`, `context-menu.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `hover-card.tsx`, `input-otp.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `resizable.tsx`, `scroll-area.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `slider.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `toggle.tsx`, `toggle-group.tsx`)
- Impact: Code clutter; makes the components directory hard to navigate. Increases cognitive load for maintainers.
- Fix approach: Audit usage with `grep` and remove unused components. ShadCN components can always be re-added later with `npx shadcn-ui@latest add <component>`.

## Known Bugs

**Mobile Navigation Does Not Show Sub-items:**
- Symptoms: On mobile, the nav menu renders only top-level links. Sub-navigation items (dropdown children from `item.children`) are not rendered, so users on mobile cannot navigate to sub-pages like "/retreats/persoonlijke-ontwikkeling-dag-workshops" from the menu.
- Files: `client/components/Layout.tsx` (lines 224-250)
- Trigger: Open the mobile menu on any screen < 768px wide. Only top-level nav items appear; there is no accordion or expanding sub-menu for items with children.
- Workaround: Sub-pages are still accessible via links within page content, or by typing the URL directly.

**Prerender Script Uses Wrong Blog URL Pattern:**
- Symptoms: The prerender script generates blog URLs as `/inspiratie/blogs/{id}` but the actual React Router route is `/inspiratie/tools-en-handvatten/:slug`. Blog routes generated during prerender would produce 404s or wrong content.
- Files: `scripts/prerender.mjs` (line 28: `return blogs.map((b) => '/inspiratie/blogs/${b.id}')`)
- Trigger: Run `npm run build` with a WP API available. The prerendered blog pages use the wrong path pattern.
- Workaround: The prerender script silently skips if Chrome/Puppeteer is not available (common on Vercel). SPA client-side routing works correctly.

## Security Considerations

**No Rate Limiting on API Routes:**
- Risk: All form submission endpoints (`/api/newsletter/subscribe`, `/api/netwerk/subscribe`, `/api/weekend/inschrijving`, `/api/groeiscan/lead`, `/api/vraagbaak/lead`, `/api/bedrijfs/brochure-lead`) have no rate limiting. An attacker could flood Klaviyo with fake profiles or exhaust API quotas.
- Files: `server/index.ts`, all files in `server/routes/`
- Current mitigation: None.
- Recommendations: Add `express-rate-limit` middleware scoped to `/api` routes. Start with 10-20 requests per minute per IP.

**No Input Validation Library on Server:**
- Risk: Server routes use manual `if (!email || !firstName)` checks. There is no schema validation (the shared Zod dependency is available but not used server-side). Malformed or excessively long input is passed directly to the Klaviyo API.
- Files: `server/routes/mailchimp.ts`, `server/routes/newsletter.ts`, `server/routes/netwerk.ts`, `server/routes/weekend-inschrijving.ts`, `server/routes/groeiscan.ts`, `server/routes/vraagbaak.ts`
- Current mitigation: Basic null checks on required fields.
- Recommendations: Use Zod schemas (already a dependency) for all request body validation. Limit string lengths. Validate email format server-side.

**CORS Configured as Wildcard:**
- Risk: Both the Express server (`cors()` with no config = allow all origins) and the WordPress PHP API (`Access-Control-Allow-Origin: *`) accept requests from any origin. While the endpoints are public-facing and read-only on the WP side, the Express POST endpoints accept form data from any origin.
- Files: `server/index.ts` (line 17: `app.use(cors())`), `wordpress/wp-content/mu-plugins/yww-content-types.php` (line 19)
- Current mitigation: None. The comment in PHP says "these endpoints are public read-only" but Express POST endpoints are write endpoints.
- Recommendations: Configure CORS on Express to only allow `https://youngwisewomen.nl`, `https://young-wise-women-3.vercel.app`, and `http://localhost:8080`.

**Unsanitized HTML Rendered via dangerouslySetInnerHTML:**
- Risk: Blog content from WordPress is rendered using `dangerouslySetInnerHTML` in 5 locations without any sanitization. If a WP admin account is compromised or content contains malicious scripts, they would execute in visitor browsers.
- Files: `client/pages/BlogDetail.tsx` (lines 43, 323, 328, 333, 337)
- Current mitigation: Content comes from WordPress which has its own sanitization, but there is no client-side sanitization layer.
- Recommendations: Add DOMPurify (`dompurify` package) to sanitize HTML before rendering. Create a wrapper component like `<SafeHTML html={content} />`.

**TypeScript Strict Mode Completely Disabled:**
- Risk: `tsconfig.json` has `strict: false`, `noImplicitAny: false`, `strictNullChecks: false`, and `noUnusedLocals: false`. This means TypeScript provides almost no safety guarantees. Null pointer errors, type mismatches, and unused code all pass the type checker silently.
- Files: `tsconfig.json` (lines 21-26)
- Current mitigation: None.
- Recommendations: Incrementally enable strict checks. Start with `strictNullChecks: true` (highest value for catching runtime errors), then `noImplicitAny: true`.

## Performance Bottlenecks

**No Code Splitting / Lazy Loading of Routes:**
- Problem: All 17 page components are eagerly imported in `client/App.tsx`. Every page's code is included in the initial bundle, even though a visitor only sees one page at a time.
- Files: `client/App.tsx` (lines 10-27: all static imports)
- Cause: No use of `React.lazy()` or `import()` for route-level code splitting.
- Improvement path: Convert page imports to `const Home = React.lazy(() => import("./pages/Home"))` with a `<Suspense fallback={...}>` wrapper. This could significantly reduce initial bundle size.

**Custom Cursor Causes Continuous Re-renders on Desktop:**
- Problem: `CustomCursor` component tracks `mousemove` events and updates React state on every mouse movement, triggering a re-render of the cursor component on every frame. The click ripple effect also creates new DOM elements for every click.
- Files: `client/components/CustomCursor.tsx`
- Cause: `useState` for mouse position means React re-renders the component tree on every `mousemove` event (dozens of times per second).
- Improvement path: Use CSS custom properties (`document.documentElement.style.setProperty`) or refs instead of state to update cursor position. Or use a pure CSS custom cursor.

**Hero Video on Home Page Loads Immediately:**
- Problem: The home page auto-plays a large `.mp4` video from a CDN as the hero background. This is a significant bandwidth cost for mobile users or users on slow connections.
- Files: `client/pages/Home.tsx` (lines 46-54)
- Cause: `<video autoPlay muted loop playsInline>` with no lazy loading or poster image.
- Improvement path: Add a `poster` attribute with a static image. Consider loading the video only after the page has rendered or only on desktop connections.

**All WP Content Fetched Client-Side:**
- Problem: Every page makes multiple client-side API calls to `cms.youngwisewomen.nl` on mount: page content, global settings, nav menu, SEO data. This causes visible loading delays and content flashes, especially on slower connections.
- Files: `client/hooks/usePageContent.ts`, `client/hooks/useGlobalSettings.ts`, `client/hooks/useNavMenu.ts`, `client/hooks/useYoastSEO.ts`, `client/api/wordpress.ts`
- Cause: Architecture is a pure client-side SPA with no SSR or data prefetching.
- Improvement path: React Query has `staleTime: 5min` configured which helps with subsequent navigations, but the first page load always waits for API responses. Consider implementing SSR with Vite SSR plugin, or pre-fetching critical data (nav, global settings) during build and embedding it in the HTML.

## Fragile Areas

**CMS Sync Script Depends on PHP Indentation:**
- Files: `scripts/cms-sync.mjs`, `wordpress/wp-content/mu-plugins/yww-admin-ui.php`
- Why fragile: `cms-sync.mjs` parses `yww-admin-ui.php` by matching exact indentation levels: 8-space indent for slug entries, 12-space indent for field entries inside `$pages = [...]`. Any change to indentation (e.g., by a PHP formatter) breaks the sync entirely.
- Safe modification: Never auto-format `yww-admin-ui.php` with a PHP formatter. Only add new fields via `cms-sync.mjs --write`, never manually edit the PHP field definitions.
- Test coverage: None. No tests exist for `cms-sync.mjs`.

**deploy.mjs Custom .env Parser:**
- Files: `scripts/deploy.mjs` (lines 34-52)
- Why fragile: `deploy.mjs` implements its own `.env.production` parser with basic string splitting. It does not handle multi-line values, escape sequences, or inline comments after values. WordPress Application Passwords often contain spaces, which can break if quoting is incorrect.
- Safe modification: Test with the actual `.env.production` file after any changes.
- Test coverage: None.

**WordPress Page Content as Single JSON Blob:**
- Files: `wordpress/wp-content/mu-plugins/yww-content-types.php` (line 296: `yww_page_content` meta), `wordpress/wp-content/mu-plugins/yww-admin-ui.php`
- Why fragile: All page CMS fields are stored in a single `yww_page_content` meta field as a JSON string. If the JSON becomes corrupted (e.g., by manual editing in the DB), the entire page's CMS content is lost. There is no per-field validation.
- Safe modification: Always use the WP Admin UI or `cms-sync.mjs` to edit fields. Never edit `yww_page_content` meta directly in the database.
- Test coverage: None.

## Scaling Limits

**WordPress as Single Point of Failure:**
- Current capacity: Single WordPress instance on Cloud86 shared hosting.
- Limit: If WordPress goes down, the SPA still loads but all CMS-driven content shows fallback text. React Query has no persistent cache, so a browser refresh during WP downtime shows degraded content.
- Scaling path: Add a CDN cache layer (e.g., Cloudflare) in front of the WP REST API. Consider caching WP responses at build time for critical data.

**Klaviyo API Rate Limits:**
- Current capacity: Klaviyo API has rate limits (75 requests per second for most endpoints).
- Limit: With no rate limiting on the Express server, a bot could exhaust Klaviyo quotas.
- Scaling path: Add server-side rate limiting. Consider queuing Klaviyo submissions for high-traffic events.

## Dependencies at Risk

**serverless-http@3.2.0:**
- Risk: Currently incompatible with Express 5 + ESM on Vercel's Node.js runtime. Was working on Feb 22 but broke (likely due to Vercel runtime update). This is the root cause of the production API outage.
- Impact: All API form submissions are broken on production.
- Migration plan: Replace with direct Vercel function handlers, or bundle Express into a standalone file (see Vercel API fix above).

**Express 5.1.0 (Early/Beta):**
- Risk: Express 5 is relatively new. Some middleware (like `serverless-http`) may not be fully compatible. Express 5 changes include async error handling and removed deprecated methods.
- Impact: Potential compatibility issues with third-party middleware.
- Migration plan: Monitor Express 5 ecosystem compatibility. If issues persist, consider downgrading to Express 4.x.

**puppeteer as devDependency for Prerendering:**
- Risk: Puppeteer requires a full Chrome installation. It fails silently on Vercel and other CI environments without Chrome. The prerender step during `npm run build` is effectively skipped in most environments.
- Impact: Pre-rendered HTML is only generated when building locally on a machine with Chrome installed. SEO may suffer without pre-rendered pages.
- Migration plan: Consider using `@prerenderer/renderer-puppeteer` with a Docker-based build, or switch to Vite SSR for server-side rendering.

## Missing Critical Features

**No Error Boundary:**
- Problem: There is no React Error Boundary component in the app. If any component throws a runtime error, the entire app crashes to a white screen.
- Blocks: Graceful error recovery; users see a blank page instead of a fallback UI.
- Files: `client/App.tsx` (no ErrorBoundary wrapper)
- Fix: Add an error boundary component wrapping `<Routes>` in `client/App.tsx`.

**No Monitoring or Error Tracking:**
- Problem: There is no error tracking service (Sentry, LogRocket, etc.) integrated. Server errors are only logged to `console.error`. Client errors are not tracked at all.
- Blocks: No visibility into production errors. Issues only discovered when users report them manually.

**No Request Logging on Server:**
- Problem: The Express server has no request logging middleware (like `morgan`). There is no way to see which API endpoints are being called, response times, or error rates.
- Blocks: Debugging production issues; understanding traffic patterns.
- Files: `server/index.ts`

## Test Coverage Gaps

**Near-Zero Test Coverage:**
- What's not tested: The entire application has a single test file: `client/lib/utils.spec.ts` (5 tests for the `cn()` CSS utility function). Zero tests exist for:
  - All server routes (newsletter, netwerk, weekend, groeiscan, vraagbaak, bedrijfs)
  - Klaviyo integration library (`server/lib/klaviyo.ts`)
  - WordPress API client (`client/api/wordpress.ts`)
  - All React hooks (13 hooks in `client/hooks/`)
  - All page components (17 pages)
  - CMS sync script (922 lines, `scripts/cms-sync.mjs`)
  - Deploy script (`scripts/deploy.mjs`)
- Files: `client/lib/utils.spec.ts` (only test file)
- Risk: Any code change can introduce regressions undetected. The Klaviyo integration handles real user data and has zero tests. The CMS sync script modifies PHP source files and WordPress data with zero tests.
- Priority: **High.** Start with server route tests (most impactful, easiest to test), then Klaviyo library, then hooks.

---

*Concerns audit: 2026-03-07*
