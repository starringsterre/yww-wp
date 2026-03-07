# Technology Stack

**Analysis Date:** 2026-03-07

## Languages

**Primary:**
- TypeScript 5.9.2 - Client SPA (`client/**/*.tsx`), Express server (`server/**/*.ts`), shared types (`shared/api.ts`)
- PHP - WordPress mu-plugins (`wordpress/wp-content/mu-plugins/yww-*.php`) and headless theme (`wordpress/wp-content/themes/yww-headless/functions.php`)

**Secondary:**
- JavaScript (ESM) - Build/deploy scripts (`scripts/*.mjs`), config files (`postcss.config.js`)
- CSS - Global styles via Tailwind (`client/global.css`)

## Runtime

**Environment:**
- Node.js 22 (target `node22` in `vite.config.server.ts`, v22.21.0 detected on dev machine)
- WordPress / PHP on Cloud86 server (`cms.youngwisewomen.nl`)

**Package Manager:**
- pnpm 10.14.0 (pinned via `packageManager` field in `package.json`)
- Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**
- React 18.3.1 - Client SPA, rendered via `createRoot` in `client/App.tsx`
- Express 5.1.0 - Server API, created in `server/index.ts`, serves form submission endpoints under `/api/*`
- React Router DOM 6.30.1 - Client-side routing, configured in `client/App.tsx`
- TanStack React Query 5.84.2 - Data fetching/caching for all WordPress API calls, used in every hook in `client/hooks/`

**Testing:**
- Vitest 3.2.4 - Test runner, invoked via `npm run test` (`vitest --run`)

**Build/Dev:**
- Vite 7.1.2 - Dev server + client build (`vite.config.ts`), server build (`vite.config.server.ts`)
- @vitejs/plugin-react-swc 4.0.0 - React Fast Refresh using SWC compiler
- SWC 1.13.3 - Fast TypeScript/JSX transpilation (via `@swc/core`)
- Puppeteer 24.37.5 - Pre-renders SEO-critical pages to static HTML at build time (`scripts/prerender.mjs`)

**Styling:**
- Tailwind CSS 3.4.17 - Utility-first CSS, configured in `tailwind.config.ts`
- tailwindcss-animate 1.0.7 - Animation utilities for Radix UI components
- @tailwindcss/typography 0.5.16 - Prose styling for blog/CMS content
- PostCSS 8.5.6 + Autoprefixer 10.4.21 - CSS processing pipeline (`postcss.config.js`)

## Key Dependencies

**Critical:**
- @tanstack/react-query 5.84.2 - All WordPress data fetching goes through React Query hooks with 5-minute stale time
- react-helmet-async 2.0.5 - SEO meta tag injection from Yoast data (`useYoastSEO` hook)
- zod 3.25.76 - Schema validation (production dependency)
- dotenv 17.2.1 - Environment variable loading in server (`server/index.ts` imports `dotenv/config`)
- serverless-http 3.2.0 - Wraps Express app for Vercel serverless functions (`api/[...all].ts`)

**UI Component Library (Radix + shadcn/ui pattern):**
- @radix-ui/react-* - Full suite of accessible primitives: accordion, dialog, dropdown-menu, navigation-menu, popover, select, tabs, toast, tooltip, and more (20+ packages)
- class-variance-authority 0.7.1 - Component variant styling
- clsx 2.1.1 + tailwind-merge 2.6.0 - Conditional class merging
- lucide-react 0.539.0 - Icon library
- cmdk 1.1.1 - Command palette component
- sonner 1.7.4 - Toast notifications
- vaul 1.1.2 - Drawer component

**Animation & 3D:**
- framer-motion 12.23.12 - Page transitions and scroll animations
- three 0.176.0 + @react-three/fiber 8.18.0 + @react-three/drei 9.122.0 - 3D rendering (WebGL scenes)

**Forms:**
- react-hook-form 7.62.0 - Form state management
- @hookform/resolvers 5.2.1 - Zod schema integration for form validation

**Utilities:**
- date-fns 4.1.0 - Date formatting
- recharts 2.12.7 - Charting (likely used in groeiscan results)
- embla-carousel-react 8.6.0 - Carousel/slider component
- react-day-picker 9.8.1 - Date picker
- react-resizable-panels 3.0.4 - Resizable panel layouts
- next-themes 0.4.6 - Theme/dark mode toggling (adapted for non-Next.js use)

**Infrastructure:**
- cors 2.8.5 - CORS middleware for Express
- tsx 4.20.3 - TypeScript execution for scripts
- prettier 3.6.2 - Code formatting

## TypeScript Configuration

**Config:** `tsconfig.json`
- Target: ES2020
- Module: ESNext with bundler resolution
- JSX: react-jsx
- Strict mode: **disabled** (`strict: false`, `noImplicitAny: false`, `strictNullChecks: false`)
- Path aliases: `@/*` -> `./client/*`, `@shared/*` -> `./shared/*`
- Includes: `client/**/*`, `server/**/*`, `shared/**/*`

## Configuration

**Environment:**
- `.env` - Local development config (committed to git)
- `.env.production` - Production secrets (gitignored), loaded by `scripts/deploy.mjs`
- Key env vars: `WP_URL`, `WP_USER`, `WP_PASS`, `KLAVIYO_PRIVATE_KEY`, `KLAVIYO_LIST_ID_*` (NEWSLETTER, NETWERK, TRAININGS, LEADS, BEDRIJFS), `KLAVIYO_API_REVISION`, `CLOUD86_SSH_USER`, `CLOUD86_SSH_HOST`, `CLOUD86_WP_PATH`
- Client env: `VITE_WP_API_URL` - WordPress API base URL (defaults to `http://localhost:8081/wp-json`)

**Build:**
- `vite.config.ts` - Client SPA build to `dist/spa/`, dev server on port 8080 with WP proxy
- `vite.config.server.ts` - Server build to `dist/server/` as ESM library targeting Node 22
- `postcss.config.js` - Tailwind + Autoprefixer pipeline
- `tailwind.config.ts` - shadcn/ui theme tokens via CSS custom properties, content scans `client/**/*.{ts,tsx}`
- `.prettierrc` - 2-space tabs, trailing commas

**Formatting:**
- Prettier configured in `.prettierrc`: `{ tabWidth: 2, useTabs: false, trailingComma: "all" }`
- Run via `npm run format.fix` (`prettier --write .`)
- No ESLint config detected

## Platform Requirements

**Development:**
- Node.js 22+
- pnpm 10.14.0 (enforced via `packageManager` field)
- WordPress instance at `http://localhost:8081` (or use `npm run dev:cms` to proxy to production WP)

**Production:**
- Frontend: Vercel (static SPA + serverless function at `api/[...all].ts`)
- WordPress CMS: Cloud86 shared hosting at `cms.youngwisewomen.nl`
- PHP deployed via rsync over SSH to Cloud86
- Production domain: `youngwisewomen.nl`

**Build Pipeline:**
1. `vite build` - Builds client SPA to `dist/spa/`
2. `scripts/generate-sitemap.mjs` - Generates `sitemap.xml` from `shared/page-registry.mjs` + dynamic blog slugs
3. `scripts/prerender.mjs` - Pre-renders all routes to static HTML using Puppeteer (SEO)
4. `vite build --config vite.config.server.ts` - Builds server to `dist/server/production.mjs`

**Deploy Pipeline** (`npm run deploy` / `scripts/deploy.mjs`):
1. `vercel --prod` - Deploy frontend to Vercel
2. `cms-sync.mjs --write --reseed` - Sync CMS fields to production WordPress
3. `rsync` - Deploy PHP files to Cloud86 via SSH
4. `sync-wp-pages.mjs` - Create missing WordPress pages

---

*Stack analysis: 2026-03-07*
