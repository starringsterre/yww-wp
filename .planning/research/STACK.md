# Technology Stack

**Project:** YWW Vercel API Functions
**Researched:** 2026-03-07
**Scope:** Making Express API routes work as Vercel serverless functions (not re-researching existing React/WordPress/Vite stack)

## The Problem

The Express server (`server/index.ts`) with 8 route handlers and a Klaviyo integration lib lives in `server/` and `shared/`. The `api/[...all].ts` catch-all imports `../server/index`, but Vercel's serverless function bundler only includes files inside `api/`. The `includeFiles` config in `vercel.json` is ignored when `"framework": "vite"` is set because the Vite framework builder controls bundling and overrides the standard `@vercel/node` file tracing behavior.

**Evidence:** The debug report confirms `includeFiles: "server/**,shared/**"` had no effect. A standalone Express app with no external imports works on Vercel. The error is specifically `Cannot find module '/var/task/server/index'` -- Vercel's `/var/task/` directory simply does not contain the `server/` files.

## Recommended Stack

### Strategy: Pre-bundle with esbuild

**Use esbuild to bundle `server/index.ts` and all its dependencies into a single ESM file inside `api/`.** This eliminates the cross-directory import problem entirely.

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| esbuild | ^0.25.x | Bundle server code into single file for `api/` | Already used by Vite internally (likely installed). Fast (< 100ms for 11 files). Produces a single self-contained ESM file. Zero config needed beyond CLI flags. |
| Express | 5.1.0 (keep) | HTTP framework in serverless function | Already installed, all 8 routes built on it. Express 5 is stable and ESM-native. |

**Confidence:** HIGH -- esbuild is the industry-standard bundler for this exact use case. The debug report already identified this as "Richting 1" (most promising direction). Verified via Vercel docs that the root cause is the Vite framework builder ignoring `includeFiles`.

### What to Remove

| Technology | Current Version | Why Remove |
|------------|----------------|------------|
| serverless-http | 3.2.0 | Adds unnecessary abstraction. Express apps can be exported directly as Vercel's default export -- Vercel natively handles them. serverless-http 3.2.0 caused timeouts with Express 5 on Vercel's current runtime (the debug report confirms this). The minimal test function that worked used a direct Express export, not serverless-http. |

**Confidence:** HIGH -- Vercel docs explicitly reference Express usage without serverless-http. Debug report confirms both that serverless-http causes timeouts AND that direct Express export works.

### What to Keep (no changes needed)

| Technology | Version | Purpose | Notes |
|------------|---------|---------|-------|
| Express | 5.1.0 | API route framework | All 8 routes + middleware already built and tested locally |
| dotenv | ^17.2.1 | Env var loading | Only active in dev; Vercel injects env vars in production. Harmless if bundled. |
| zod | ^3.25.x | Validation schemas | Used in shared types |
| cors | ^2.8.5 | CORS middleware | Needed for cross-origin API calls from SPA |
| Vite | 7.1.2 | Client SPA build | Framework builder stays as-is; API bundling is separate |

### Vercel Configuration Changes

| Setting | Current | Recommended | Why |
|---------|---------|-------------|-----|
| `functions.includeFiles` | `"server/**,shared/**"` | REMOVE entirely | Does nothing when framework is `"vite"`. Misleading to keep. |
| `framework` | `"vite"` | Keep | Required for SPA build. Pre-bundled API functions in `api/` work alongside it. |
| Node.js version | (default = 24.x) | Pin to 22.x | Express 5.1.0 requires >= 18. Node 22 is current LTS. Pinning avoids surprise breakage from Vercel's auto-upgrade to 24.x. Set via `"engines": { "node": "22.x" }` in package.json. |

**Confidence:** HIGH for `includeFiles` removal (proven ineffective). MEDIUM for Node 22 pin (Express 5 likely works on 24.x too, but 22.x is the safer bet for production stability).

## Implementation Approach

### 1. Build Step: esbuild bundles server into api/

```bash
esbuild server/index.ts \
  --bundle \
  --outfile=api/_server.mjs \
  --platform=node \
  --target=node22 \
  --format=esm \
  --packages=external
```

Key flags explained:
- `--bundle`: Resolves and inlines ALL local imports (server/routes/*, server/lib/klaviyo.ts, shared/api.ts)
- `--platform=node`: Marks Node.js built-ins (fs, path, http, etc.) as external
- `--packages=external`: Marks ALL npm packages (express, cors, dotenv, zod) as external -- Vercel installs them from package.json at deploy time
- `--format=esm`: Matches the project's `"type": "module"` in package.json
- `--target=node22`: Matches the pinned Vercel Node.js runtime
- `--outfile=api/_server.mjs`: Output lands inside `api/` where Vercel can find it. The `_` prefix is a convention for build artifacts.

### 2. Simplified api/[...all].ts

```typescript
// api/[...all].ts
import { createServer } from "./_server.mjs";

const app = createServer();
export default app;
```

The import is now **local to the api/ directory**. Vercel bundles it without issues.

### 3. Updated package.json scripts

```json
{
  "scripts": {
    "build:api": "esbuild server/index.ts --bundle --outfile=api/_server.mjs --platform=node --target=node22 --format=esm --packages=external",
    "build": "npm run build:api && npm run build:client && npm run build:server"
  }
}
```

`build:api` runs **first** so that `api/_server.mjs` exists before Vercel processes the `api/` directory during the build.

### 4. .gitignore addition

```
api/_server.mjs
```

This is a build artifact, not source code.

### 5. Clean up vercel.json

Remove the `functions` block entirely:

```json
{
  "framework": "vite",
  "installCommand": "pnpm install --no-frozen-lockfile",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/spa",
  "headers": [ ... ],
  "rewrites": [ ... ]
}
```

## Dependency Tree Analysis

The server code has a small, well-contained dependency tree. This is what esbuild will inline:

```
server/index.ts (createServer)
  |-- server/routes/newsletter.ts
  |-- server/routes/netwerk.ts
  |-- server/routes/bedrijfs.ts
  |-- server/routes/weekend-inschrijving.ts
  |-- server/routes/groeiscan.ts      -> shared/api.ts (types only)
  |-- server/routes/vraagbaak.ts      -> shared/api.ts (types only)
  |-- server/routes/demo.ts           -> shared/api.ts (types only)
  |-- server/routes/mailchimp.ts
  All routes import:
    |-- server/lib/klaviyo.ts (subscribeProfileToList, createEvent, upsertProfile)

External (kept as imports, not bundled):
  express, cors, dotenv, zod
```

**Total local files to bundle:** 11 TypeScript files. esbuild handles this in < 50ms.

**shared/api.ts:** Contains only TypeScript interfaces (`GroeiScanLeadRequest`, `VraagbaakLeadRequest`, `DemoResponse`). These are erased at compile time -- they add zero bytes to the bundle. esbuild handles this correctly.

## Express 5 on Vercel: How Direct Export Works

Vercel's Node.js runtime can serve an Express app when exported as the default export. The runtime wraps it in its own HTTP server internally. Key points verified:

1. **Express 5 is ESM-native** -- no CJS/ESM compatibility layer needed
2. **`dotenv/config` import**: Not needed on Vercel (env vars are injected via dashboard), but harmless if present. dotenv's `config()` is a no-op when vars already exist in `process.env`.
3. **Express body parsers** (`express.json()`, `express.urlencoded()`): Work normally in serverless context
4. **CORS middleware**: Works normally
5. **Route mounting under `/api`**: The routes are already mounted at `/api/newsletter/subscribe` etc., which matches Vercel's expectation for the `api/` directory

**Confidence:** HIGH -- the debug report confirms a minimal Express app exported directly works on Vercel (`api/test.ts` example). The only issue was cross-directory imports, which esbuild solves.

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Bundler | esbuild (CLI) | Vite second config | A `vite.config.api.ts` would work but adds config complexity. The existing `vite.config.server.ts` builds for `node-build.ts` (standalone server), not for Vercel serverless. esbuild CLI is one command. |
| Bundler | esbuild (CLI) | Rollup | More configuration files needed. esbuild does this with CLI flags alone. |
| Bundler | esbuild (CLI) | tsup | Wrapper around esbuild. Unnecessary abstraction for one bundle target. |
| Bundler | esbuild (CLI) | webpack | Overkill. Slower. More config. |
| Wrapper | Direct Express export | serverless-http | serverless-http 3.2.0 causes timeouts with Express 5 on Vercel. Direct export is proven to work. |
| Architecture | Pre-bundle | Native Vercel Functions (no Express) | Would require rewriting 8 route handlers as individual `api/route.ts` files with Vercel's `fetch` Web Standard or `(req, res)` handlers. Loses Express middleware stack (cors, json, urlencoded). High effort, no benefit. |
| Architecture | Pre-bundle | Move all server code into api/ | Breaks the local dev setup -- the Vite `expressPlugin()` imports from `./server`. Would force restructuring the entire codebase. |
| Architecture | Pre-bundle | Remove `"framework": "vite"` | Would require manually configuring the entire Vite build output for Vercel. Extremely high risk of breaking the working SPA deployment. |
| Architecture | Pre-bundle | Use Vercel `vercel-build` script | Same concept as adding `build:api` to package.json scripts, but ties the build to Vercel specifically. npm scripts keep it platform-agnostic. |

## Version Pinning

| Package | Pin Strategy | Rationale |
|---------|-------------|-----------|
| esbuild | `^0.25.x` (devDep) | Stable API. Minor versions add features/optimizations. Major versions are rare but may change CLI flags. |
| express | `^5.1.0` (keep) | Already locked. Express 5 is new; stay on 5.x. |
| dotenv | `^17.2.1` (keep) | Already locked. Stable. |
| cors | `^2.8.5` (keep) | Already locked. Mature package. |

## Installation

```bash
# Add esbuild as explicit dev dependency
# (may already be present as Vite transitive dep, but explicit is better)
pnpm add -D esbuild

# Remove serverless-http
pnpm remove serverless-http
```

## Sources

- Vercel Functions documentation: https://vercel.com/docs/functions/serverless-functions (fetched 2026-03-07, HIGH confidence)
- Vercel Node.js runtime documentation: https://vercel.com/docs/functions/runtimes/node-js (fetched 2026-03-07, HIGH confidence)
- Vercel advanced Node.js configuration: https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration (fetched 2026-03-07, HIGH confidence)
- Vercel vercel.json functions configuration: https://vercel.com/docs/project-configuration/vercel-json (fetched 2026-03-07, HIGH confidence)
- Vercel supported Node.js versions: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions (fetched 2026-03-07, HIGH confidence -- default is 24.x, 22.x and 20.x available)
- Project debug report: docs/VERCEL-API-DEBUG-REPORT.md (LOCAL, HIGH confidence)
- pnpm-lock.yaml version verification: express@5.1.0, serverless-http@3.2.0 (LOCAL, HIGH confidence)
- Codebase analysis: server/index.ts, server/routes/*.ts, server/lib/klaviyo.ts, shared/api.ts (LOCAL, HIGH confidence)
