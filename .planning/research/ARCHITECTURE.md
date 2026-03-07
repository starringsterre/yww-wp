# Architecture Patterns

**Domain:** Vercel serverless function bundling for Express monorepo (Vite + Express SPA)
**Researched:** 2026-03-07

## Current Architecture (Broken)

```
┌─────────────────────────────────────────────────────────────┐
│ Repository Root                                              │
│                                                              │
│  client/          ──build──>  dist/spa/      (Vercel static) │
│  server/          ──build──>  dist/server/   (Node prod only)│
│  shared/          ──imported by both client + server──       │
│  api/[...all].ts  ──Vercel serverless function──             │
│                                                              │
│  api/[...all].ts tries to import ../server/index             │
│  but Vercel only bundles files INSIDE api/ directory         │
│  Result: "Cannot find module '/var/task/server/index'"       │
└─────────────────────────────────────────────────────────────┘
```

### Why It Breaks

Vercel's serverless function bundler uses `@vercel/nft` (Node File Tracing) to detect which files a function needs by tracing `import`/`require` statements statically. However, when the Vite framework builder is active (`"framework": "vite"` in vercel.json), two things happen:

1. **Vite's build runs first** -- it produces `dist/spa/` for the client. The server build (`vite build --config vite.config.server.ts`) produces `dist/server/` but this output is for the standalone Node.js server (port 3000), not for Vercel serverless.

2. **api/ files are processed separately** by Vercel's own function compiler AFTER the Vite build. At this point, `api/[...all].ts` references `../server/index` which is raw TypeScript. Vercel's Node.js runtime can compile `.ts` files in `api/`, but when it traces the import to `../server/index.ts`, the Vite framework builder may interfere with how the trace resolves paths outside the `api/` directory.

3. **`includeFiles` in vercel.json is ignored** because the Vite framework builder overrides function configuration. This is confirmed by the debug report: `includeFiles: "server/**,shared/**"` had no effect.

### Component Map (Current)

| Component | Directory | Build Target | Works on Vercel? |
|-----------|-----------|-------------|-----------------|
| React SPA | `client/` | `dist/spa/` (Vite build) | YES -- static files |
| Express API | `server/` | `dist/server/` (Vite SSR build) | NO -- only for `node dist/server/production.mjs` |
| Serverless entry | `api/[...all].ts` | Vercel function | NO -- can't resolve `../server/index` |
| Shared types | `shared/` | imported by both | Partially -- client works, server function fails |
| WordPress CMS | external | Cloud86 | YES -- proxied via rewrites |

## Recommended Architecture

### Pattern: Pre-bundled Serverless Entry

Bundle the Express server code into a single self-contained file BEFORE Vercel's function compiler runs, so the `api/` entry point has zero imports outside `api/`.

```
┌───────────────────────────────────────────────────────────────┐
│                        BUILD PIPELINE                          │
│                                                                │
│  Step 1: vite build (client)                                   │
│    client/ + shared/ ──> dist/spa/                             │
│                                                                │
│  Step 2: esbuild (serverless bundle)          *** NEW ***      │
│    server/index.ts + server/**/* + shared/* ──> api/_server.mjs│
│    (single file, all dependencies inlined)                     │
│                                                                │
│  Step 3: Vercel deploys                                        │
│    dist/spa/  ──> static CDN                                   │
│    api/[...all].ts ──> serverless function                     │
│         imports ./_server.mjs (local to api/, no tracing issue)│
│                                                                │
│  (Optional) Step 2b: vite build --config vite.config.server.ts │
│    server/ ──> dist/server/ (standalone Node.js, for fallback) │
└───────────────────────────────────────────────────────────────┘
```

### Component Boundaries (Recommended)

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **React SPA** (`client/`) | Page rendering, routing, CMS content display | WordPress REST API (direct), Express API (`/api/*`) |
| **WordPress CMS** (Cloud86) | Content storage, admin UI, Yoast SEO | React SPA (via REST API), CMS sync scripts |
| **Express API bundle** (`api/_server.mjs`) | Form submission processing, Klaviyo integration | Klaviyo API (outbound HTTPS), React SPA (inbound POST) |
| **Serverless entry** (`api/[...all].ts`) | Thin wrapper: imports bundled Express, exports for Vercel | Express API bundle (local import) |
| **Shared types** (`shared/`) | TypeScript interfaces for form payloads | Compiled into both client bundle and server bundle at build time |
| **Build scripts** (`scripts/`) | Deploy, CMS sync, sitemap generation | WordPress API, Vercel CLI, Cloud86 SSH |

### Data Flow

```
User Browser
    │
    ├──GET /page──> Vercel CDN ──> dist/spa/index.html (React SPA)
    │
    ├──GET /wp-json/*──> Vercel rewrite ──> cms.youngwisewomen.nl (WordPress)
    │                                            │
    │                                    returns CMS JSON
    │                                            │
    │  <──JSON response──────────────────────────┘
    │
    ├──POST /api/newsletter/subscribe──> Vercel serverless function
    │                                         │
    │                                    api/[...all].ts
    │                                         │
    │                                    imports api/_server.mjs
    │                                    (bundled Express app)
    │                                         │
    │                                    Express routes parse body,
    │                                    validate, call Klaviyo API
    │                                         │
    │                                    POST https://a.klaviyo.com/api/*
    │                                         │
    │  <──JSON { success: true }──────────────┘
    │
    └──GET /wp-content/*──> Vercel rewrite ──> cms.youngwisewomen.nl (media files)
```

## Patterns to Follow

### Pattern 1: esbuild Pre-bundle for Serverless

**What:** Use esbuild to compile `server/index.ts` and all its transitive dependencies (routes, lib/klaviyo, shared/api) into a single `.mjs` file placed in the `api/` directory. The actual `api/[...all].ts` becomes a thin 3-line wrapper.

**When:** Always -- this is the core fix.

**Why:** Vercel's function runtime needs all code either inside `api/` or resolved by its nft tracer. The Vite framework builder interferes with nft tracing. Pre-bundling eliminates the problem entirely by making the function self-contained.

**Example:**

```bash
# Build step (add to package.json scripts)
npx esbuild server/index.ts \
  --bundle \
  --outfile=api/_server.mjs \
  --platform=node \
  --target=node20 \
  --format=esm \
  --external:express \
  --external:cors \
  --external:dotenv
```

```typescript
// api/[...all].ts -- thin wrapper, no imports outside api/
import { createServer } from "./_server.mjs";

const app = createServer();
export default app;
```

**Confidence:** HIGH -- This pattern is confirmed by:
- The debug report shows standalone Express functions in api/ DO work
- esbuild can resolve all TypeScript imports and produce a single file
- express/cors/dotenv are npm packages available at runtime (externalized, not bundled)

### Pattern 2: Express App as Default Export (No serverless-http)

**What:** Export the Express app directly as the default export, without wrapping it in serverless-http. Modern Vercel Node.js runtime (2025+) can handle Express apps natively when exported as default.

**When:** If the Vercel runtime version supports it. The Vercel docs reference `export default app` patterns for Express.

**Why:** Removes the `serverless-http` dependency entirely. One fewer point of failure. The debug report noted that serverless-http with Express 5 caused timeouts.

**Example:**

```typescript
// api/[...all].ts
import { createServer } from "./_server.mjs";
export default createServer();
```

**Confidence:** MEDIUM -- Vercel's Express guide mentions this approach, but Express 5 (which this project uses) is newer and less tested in serverless contexts. If the direct export doesn't work, fall back to serverless-http with Express 4 or use native Vercel function handlers.

### Pattern 3: Fallback -- Native Vercel Functions (No Express)

**What:** If Express bundling proves unreliable, rewrite each route as a standalone Vercel function using the native `(req, res)` or `fetch(request)` signature. Each route becomes its own file in `api/`.

**When:** Only if Pattern 1 + Pattern 2 both fail.

**Why:** Eliminates all framework compatibility issues. Each function is independent. The trade-off is code duplication (Klaviyo helper copied into each file or bundled separately).

**Example:**

```typescript
// api/newsletter/subscribe.ts
import { subscribeProfileToList, createEvent } from "../_klaviyo.mjs";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }
  const body = await req.json();
  // ... validation and Klaviyo calls
  return Response.json({ success: true });
}
```

**Confidence:** HIGH that it works, but it requires significant refactoring away from Express.

### Pattern 4: Build Script Integration

**What:** Modify the existing `npm run build` script to include the esbuild serverless step, so the bundled server file is always fresh when deploying.

**When:** Always -- this ensures the deploy pipeline stays one command.

**Example in package.json:**

```json
{
  "scripts": {
    "build:serverless": "esbuild server/index.ts --bundle --outfile=api/_server.mjs --platform=node --target=node20 --format=esm --external:express --external:cors --external:dotenv",
    "build": "npm run build:client && npm run build:serverless && npm run build:server"
  }
}
```

**Confidence:** HIGH -- esbuild is already an indirect dependency via Vite and is extremely fast (<100ms for this codebase).

## Anti-Patterns to Avoid

### Anti-Pattern 1: Relying on `includeFiles` with Vite Framework Builder

**What:** Specifying `functions.includeFiles` in vercel.json to pull in files from `server/` and `shared/`.

**Why bad:** The Vite framework builder overrides or ignores `includeFiles`. This has been confirmed in the debug report -- `"includeFiles": "server/**,shared/**"` had zero effect. The function runtime still could not find `/var/task/server/index`.

**Instead:** Pre-bundle the server code into api/ with esbuild so there are no external imports to trace.

### Anti-Pattern 2: Using `serverless-http` with Express 5

**What:** Wrapping the Express 5 app with `serverless-http` to adapt it for serverless.

**Why bad:** The project uses Express 5.1.0 (`"express": "^5.1.0"`). serverless-http 3.2.0 has known compatibility issues with Express 5's new internals. The debug report documents timeouts when using this combination. It worked on Feb 22 but broke later, suggesting Vercel runtime updates exposed the incompatibility.

**Instead:** Export the Express app directly (modern Vercel runtimes handle this) or use native Vercel function signatures.

### Anti-Pattern 3: Two Separate Server Builds for the Same Code

**What:** Building `server/` with `vite.config.server.ts` for standalone AND also trying to import raw `server/` from `api/[...all].ts` for serverless.

**Why bad:** The Vite server build outputs to `dist/server/` with external dependencies (express, cors are `external` in rollupOptions). This build is for running `node dist/server/production.mjs` -- a long-running process. Serverless functions need a different build: everything inlined except npm packages. These are fundamentally different build targets.

**Instead:** Build explicitly for each target:
1. `build:client` -- Vite SPA build for static files
2. `build:serverless` -- esbuild bundle for `api/_server.mjs`
3. `build:server` -- (optional) Vite SSR build for standalone Node.js fallback

### Anti-Pattern 4: Removing `"framework": "vite"` from vercel.json

**What:** Switching away from the Vite framework builder to get more control over function bundling.

**Why bad:** The Vite framework builder handles SPA detection, output directory mapping, and other optimizations automatically. Removing it requires manually configuring the Build Output API, which is significantly more complex.

**Instead:** Keep the Vite framework builder for the SPA, and solve the serverless problem independently with pre-bundling.

## Detailed Build Architecture

### Current Build Pipeline

```
npm run build
  ├── build:client
  │    ├── vite build                    → dist/spa/ (React SPA)
  │    ├── generate-sitemap.mjs          → public/sitemap.xml
  │    └── prerender.mjs                 → dist/spa/pre-rendered pages
  │
  └── build:server
       └── vite build --config server    → dist/server/production.mjs
                                           (standalone Node.js, NOT used by Vercel)
```

### Recommended Build Pipeline

```
npm run build
  ├── build:client
  │    ├── vite build                    → dist/spa/ (React SPA)
  │    ├── generate-sitemap.mjs          → public/sitemap.xml
  │    └── prerender.mjs                 → dist/spa/pre-rendered pages
  │
  ├── build:serverless                   *** NEW ***
  │    └── esbuild server/index.ts       → api/_server.mjs
  │         --bundle                       (self-contained Express app)
  │         --platform=node
  │         --format=esm
  │         --external:express,cors,dotenv
  │
  └── build:server                       (optional, for non-Vercel hosting)
       └── vite build --config server    → dist/server/production.mjs
```

### Vercel Deploy Pipeline

```
Vercel receives push / vercel --prod
  │
  ├── pnpm install
  │
  ├── pnpm build (buildCommand from vercel.json)
  │    ├── build:client → dist/spa/
  │    ├── build:serverless → api/_server.mjs (esbuild output)
  │    └── build:server → dist/server/ (not used by Vercel)
  │
  ├── Vercel detects framework: vite
  │    └── Serves dist/spa/ as static files
  │
  ├── Vercel detects api/[...all].ts
  │    └── Compiles to serverless function
  │         └── Imports ./_server.mjs (local file, no tracing issue)
  │
  └── Vercel applies rewrites from vercel.json
       ├── /api/(.*) → api function
       ├── /wp-json/* → cms.youngwisewomen.nl proxy
       └── /(.*) → /index.html (SPA fallback)
```

## Key Files After Fix

| File | Role | Changes Needed |
|------|------|---------------|
| `api/[...all].ts` | Thin serverless entry | Rewrite: import from `./_server.mjs`, remove serverless-http |
| `api/_server.mjs` | Bundled Express app | Generated by esbuild (gitignored) |
| `server/index.ts` | Express app source | No changes -- esbuild reads this as input |
| `server/routes/*.ts` | Route handlers | No changes |
| `server/lib/klaviyo.ts` | Klaviyo API client | No changes |
| `shared/api.ts` | Shared types | No changes -- bundled into `_server.mjs` by esbuild |
| `package.json` | Build scripts | Add `build:serverless` script |
| `vercel.json` | Vercel config | Remove `functions.includeFiles` (no longer needed) |
| `.gitignore` | Git exclusions | Add `api/_server.mjs` |

## Scalability Considerations

| Concern | Current (broken) | After fix | At scale (1000+ form submissions/day) |
|---------|-----------------|-----------|---------------------------------------|
| API availability | 0% on Vercel | 100% | 100% -- serverless auto-scales |
| Cold start latency | N/A | ~200-500ms (Express init) | Same -- each invocation initializes Express |
| Bundle size | N/A | ~50-100KB (server code small) | Same -- no database, just HTTP to Klaviyo |
| Concurrent requests | N/A | Vercel handles concurrency | Fluid compute reuses warm instances |
| Klaviyo rate limits | N/A | Unlikely to hit (100 req/s) | May need rate limiting at 10K+/day |

## Dependency Graph

```
api/[...all].ts
  └── api/_server.mjs (esbuild output)
       ├── server/index.ts
       │    ├── server/routes/newsletter.ts
       │    │    └── server/lib/klaviyo.ts
       │    ├── server/routes/netwerk.ts
       │    │    └── server/lib/klaviyo.ts
       │    ├── server/routes/bedrijfs.ts
       │    │    └── server/lib/klaviyo.ts
       │    ├── server/routes/weekend-inschrijving.ts
       │    │    └── server/lib/klaviyo.ts
       │    ├── server/routes/groeiscan.ts
       │    │    ├── server/lib/klaviyo.ts
       │    │    └── shared/api.ts
       │    ├── server/routes/vraagbaak.ts
       │    │    ├── server/lib/klaviyo.ts
       │    │    └── shared/api.ts
       │    ├── server/routes/mailchimp.ts
       │    └── server/routes/demo.ts
       │
       ├── (external) express
       ├── (external) cors
       └── (external) dotenv
```

All internal dependencies (server/routes, server/lib, shared/) get INLINED into the bundle.
All npm packages (express, cors, dotenv) stay EXTERNAL -- Vercel installs them via pnpm.

## Sources

- Vercel Functions docs: https://vercel.com/docs/functions/serverless-functions (fetched 2026-03-07) -- confirmed api/ directory pattern, Node.js runtime
- Vercel Node.js runtime docs: https://vercel.com/docs/functions/runtimes/node-js (fetched 2026-03-07) -- confirmed TypeScript support in api/, mentions Express guide
- Vercel Vite framework docs: https://vercel.com/docs/frameworks/frontend/vite (fetched 2026-03-07) -- confirmed Vite framework builder for SPA, api/ directory for functions
- Project debug report: docs/VERCEL-API-DEBUG-REPORT.md -- confirmed includeFiles failure, standalone function success, Express 5 + serverless-http timeout
- Codebase analysis: server/index.ts, api/[...all].ts, vite.config.server.ts, vercel.json, package.json
