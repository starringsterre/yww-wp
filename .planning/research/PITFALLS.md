# Domain Pitfalls

**Domain:** Vercel Serverless Functions with Express API + Klaviyo CRM Integration
**Researched:** 2026-03-07
**Confidence:** HIGH (based on project-specific error logs, Vercel official docs, and package analysis)

## Critical Pitfalls

Mistakes that cause production failures or require significant rework.

### Pitfall 1: Vercel Serverless Functions Do Not Bundle Files Outside `api/`

**What goes wrong:** Vercel's serverless function builder only bundles files within the `api/` directory. When `api/[...all].ts` imports `../server/index`, the `server/` directory is not included in the deployed serverless function bundle. The import resolves locally (and during build) but fails at runtime with `Cannot find module '/var/task/server/index'`.

**Why it happens:** Vercel treats each file in `api/` as an independent serverless function entry point. Its bundler traces imports starting from that entry point, but by default only includes files within `api/` and `node_modules/`. Cross-directory imports to sibling directories (`server/`, `shared/`) are not automatically resolved.

**Consequences:** All API endpoints return 500 errors in production. Forms stop submitting to Klaviyo. The site appears fully functional (SPA renders fine) but all server-side functionality is broken.

**Evidence from this project:**
- Error log: `Cannot find module '/var/task/server/index' imported from /var/task/api/[...all].js`
- `includeFiles: "server/**,shared/**"` in `vercel.json` had no effect (likely overridden by the Vite framework adapter)
- Standalone inline Express in `api/test.ts` works, confirming the issue is cross-directory imports, not Express itself

**Prevention:**
1. **Pre-bundle the server code into `api/` using esbuild** -- build `server/index.ts` and all its dependencies into a single `api/_server.js` file, then import from that local bundled file. This is the most reliable approach.
   ```bash
   esbuild server/index.ts --bundle --outfile=api/_server.js --platform=node --format=esm --external:express --external:cors --external:dotenv
   ```
2. **Alternative: Duplicate the server code into `api/`** -- move all route handlers and the Klaviyo lib directly into the `api/` directory so no cross-directory imports exist. Less DRY but guaranteed to work.
3. **Alternative: Use native Vercel function signatures** -- rewrite each route as a standalone `api/route.ts` file using Vercel's native `(req, res)` or `fetch()` handler, eliminating Express entirely.

**Detection:** After every deploy, test at least one API endpoint (`/api/ping`) before considering the deploy successful. Add a post-deploy health check to `scripts/deploy.mjs`.

**Phase relevance:** This is THE blocking issue. Must be resolved in Phase 1 before any other API work.

---

### Pitfall 2: `serverless-http` is CJS-Only and Tested Only Against Express 4

**What goes wrong:** The `serverless-http@3.2.0` package publishes only a CommonJS entry point (`"main": "serverless-http.js"`, no `"module"` or `"exports"` field). This project has `"type": "module"` in package.json (ESM). Additionally, `serverless-http`'s devDependencies show `"express": "^4.17.1"` -- it was never tested with Express 5. This combination causes silent failures: the function receives the request but never sends a response, resulting in a timeout.

**Why it happens:** Express 5 changed internal APIs that `serverless-http` depends on to simulate HTTP request/response cycles. When `serverless-http` calls Express internals that no longer exist or behave differently in v5, the response is never finalized, causing a timeout rather than a clear error.

**Consequences:** Request hangs until Vercel's function timeout (default 10 seconds), then returns a 504 Gateway Timeout. No error is logged because the function never crashes -- it just never responds.

**Evidence from this project:**
- `serverless-http` package.json confirms CJS-only, Express 4 testing
- Debug report: "serverless-http@3.2.0 lijkt incompatibel met Express 5 op de huidige Vercel Node.js runtime"
- Timeout errors (curl exit code 28) when using `serverless(createServer())`
- This worked on 2026-02-22, suggesting a Vercel Node.js runtime update broke CJS/ESM interop

**Prevention:**
1. **Do not use `serverless-http` with Express 5 + ESM** -- the combination is not supported
2. If keeping Express, pre-bundle into a single file and export the Express app directly (Vercel natively supports Express apps as default exports without `serverless-http`)
3. If abandoning Express for serverless, use Vercel's native function API (`export default function handler(req, res)` or `export function GET(request)`)

**Detection:** Test API endpoints with a timeout of 5 seconds. If they hang (no response, no error), suspect `serverless-http` incompatibility.

**Phase relevance:** Phase 1. Remove `serverless-http` from the solution entirely.

---

### Pitfall 3: ESM Directory Import Not Supported

**What goes wrong:** Import statement `import { createServer } from "../server"` (without specifying `/index`) fails in ESM mode with `Directory import '/var/task/server' is not supported resolving ES modules`.

**Why it happens:** CommonJS allows `require("./server")` to automatically resolve to `./server/index.js`. ESM does NOT allow this -- you must specify the full path including the file extension or at minimum `/index`. This project has `"type": "module"`, making all `.js` files ESM.

**Consequences:** Immediate crash at function cold start. Clear error message but confusing if you are accustomed to CommonJS behavior.

**Evidence from this project:**
- Error log: `Directory import '/var/task/server' is not supported resolving ES modules`
- Fix to `../server/index` was applied but then hit Pitfall 1 (module not found because server/ not bundled)

**Prevention:**
1. Always use explicit file paths in imports, never directory imports: `from "../server/index"` not `from "../server"`
2. Configure ESLint with `import/no-unresolved` or use TypeScript's `moduleResolution: "bundler"` which catches this at build time (already in place, but only catches it if the import is within the project scope)

**Detection:** TypeScript compiler or linting will catch this locally. The danger is when imports are valid locally (because Node.js dev server uses different resolution) but fail in the Vercel runtime.

**Phase relevance:** Phase 1, but already partially addressed. Ensure all imports are explicit.

---

### Pitfall 4: Vite Framework Adapter Overrides `vercel.json` Function Config

**What goes wrong:** When `vercel.json` has `"framework": "vite"`, Vercel uses its Vite framework adapter to process the build and deploy. This adapter may override or ignore `functions` configuration like `includeFiles`. The `includeFiles` setting for `api/[...all].ts` had no effect on what gets bundled.

**Why it happens:** Framework adapters (for Next.js, Vite, Remix, etc.) have their own build pipelines that take precedence over manual serverless function configuration. The Vite adapter builds the client SPA but does not have built-in knowledge of how to bundle a custom `api/` directory with external imports.

**Consequences:** Configuration that should work per Vercel docs silently does nothing. Debugging is extremely frustrating because there is no error message -- the config is simply ignored.

**Evidence from this project:**
- `"includeFiles": "server/**,shared/**"` in vercel.json had no effect
- Debug report confirms: "wordt waarschijnlijk genegeerd door Vite framework"

**Prevention:**
1. **Do not rely on `includeFiles` when using a framework adapter** -- handle bundling yourself with a pre-build step
2. Pre-bundle server code into `api/` using esbuild as part of `npm run build`
3. Alternatively, remove `"framework": "vite"` and configure the build manually, but this sacrifices Vercel's SPA handling optimizations

**Detection:** After changing `vercel.json` function config, verify by inspecting the Vercel build output (check deployment logs for which files are included in the function bundle).

**Phase relevance:** Phase 1. Stop relying on `includeFiles` and pre-bundle instead.

## Moderate Pitfalls

### Pitfall 5: Express Body Parsers Conflict with Vercel's Built-in Body Parsing

**What goes wrong:** Vercel serverless functions automatically parse request bodies (JSON, form-urlencoded, text, binary) and attach them to `request.body`. When Express also runs `express.json()` middleware, it attempts to re-parse an already-consumed stream. Depending on the Express version, this can result in empty `req.body`, parse errors, or the middleware hanging.

**Prevention:**
1. When running on Vercel, skip Express's body parsing middleware. Check for `req.body` being already populated:
   ```typescript
   if (!req.body) {
     app.use(express.json());
   }
   ```
2. Or better: if abandoning Express for native Vercel functions, use `request.body` directly (already parsed)
3. The current code scopes parsers to `/api` prefix (`app.use("/api", express.json())`), which is fine locally but may double-parse on Vercel

**Detection:** Forms submit but `req.body` is `undefined` or `{}` on the server despite the client sending valid JSON.

**Phase relevance:** Phase 1 -- must test body parsing after fixing the bundling issue.

---

### Pitfall 6: `dotenv/config` Import in Serverless Functions

**What goes wrong:** The server entry (`server/index.ts`) imports `dotenv/config` at the top level. On Vercel, environment variables are injected directly into `process.env` -- there is no `.env` file. The `dotenv/config` import will silently fail to find a `.env` file and do nothing, which is fine. BUT: if `dotenv` is not in the production dependencies and gets tree-shaken or excluded from the bundle, the import crashes with a module-not-found error.

**Prevention:**
1. `dotenv` is currently in `dependencies` (not `devDependencies`), so it will be installed. Keep it there.
2. Consider making the import conditional: `import "dotenv/config"` is safe if the package is present, even if no `.env` file exists
3. If pre-bundling with esbuild, mark `dotenv` as external OR bundle it in

**Detection:** Cold start crash with `Cannot find module 'dotenv/config'`.

**Phase relevance:** Phase 1, verify after pre-bundle setup.

---

### Pitfall 7: Klaviyo API Revision Header Mismatch

**What goes wrong:** Klaviyo requires a `revision` header on every API request, specifying which API version to target. The current code defaults to `"2024-10-15"`. Klaviyo periodically deprecates old revisions. If the revision becomes unsupported, all API calls return errors.

**Prevention:**
1. Set `KLAVIYO_API_REVISION` as a Vercel environment variable (already in code as fallback)
2. Periodically check Klaviyo's API changelog for deprecation notices
3. Test Klaviyo integration after every deploy, not just after code changes

**Detection:** Klaviyo API returns 400 or 422 errors with messages about unsupported API revision.

**Phase relevance:** Ongoing maintenance, not phase-specific.

---

### Pitfall 8: Vercel Function Cold Start Timeout with Heavy Express App

**What goes wrong:** Serverless functions have a cold start phase where the module is loaded and initialized. If the Express app imports many dependencies (cors, dotenv, zod, all route handlers, the Klaviyo lib), cold start can approach or exceed the function timeout (default 10s on Hobby plan). The current app imports 8 route handlers, each importing from `../lib/klaviyo` and `../../shared/api`.

**Prevention:**
1. Pre-bundling with esbuild will significantly reduce cold start time by inlining all dependencies into one file
2. Consider splitting into individual route files (`api/newsletter.ts`, `api/netwerk.ts`) instead of a catch-all, so each function only loads what it needs
3. Set `maxDuration` in `vercel.json` if on Pro plan (not available on Hobby)

**Detection:** First request after idle period takes >5 seconds or times out. Subsequent requests are fast.

**Phase relevance:** Phase 2 (optimization), after basic functionality works.

---

### Pitfall 9: `shared/` Directory Types Used at Runtime

**What goes wrong:** The `shared/api.ts` file exports TypeScript interfaces (`GroeiScanLeadRequest`, `VraagbaakLeadRequest`, `DemoResponse`). These are used in route handlers with `as` type assertions (`req.body as GroeiScanLeadRequest`). At runtime, TypeScript types are erased -- the `as` cast does no validation. If the client sends malformed data, the server proceeds without error, potentially sending garbage to Klaviyo.

**Prevention:**
1. Use Zod (already a dependency) for runtime validation of request bodies, not just TypeScript type assertions
2. The `shared/api.ts` types are fine for development DX but must not be relied upon for runtime safety
3. Example fix:
   ```typescript
   const parsed = groeiscanSchema.safeParse(req.body);
   if (!parsed.success) return res.status(400).json({ error: parsed.error });
   ```

**Detection:** Klaviyo profiles created with undefined/null fields, or Klaviyo API errors about invalid data.

**Phase relevance:** Phase 2 (hardening), after API routes work on Vercel.

## Minor Pitfalls

### Pitfall 10: `cors()` Middleware Allows All Origins

**What goes wrong:** The Express app uses `cors()` with no configuration, which allows requests from any origin. In production, this means any website can submit forms to the API, potentially creating spam profiles in Klaviyo.

**Prevention:**
1. Configure CORS to only allow the production domain:
   ```typescript
   app.use(cors({ origin: ["https://youngwisewomen.nl", "https://www.youngwisewomen.nl"] }));
   ```
2. Alternatively, Vercel's native functions do not set CORS headers by default, so switching away from Express would solve this

**Detection:** Spam profiles appearing in Klaviyo from unknown sources.

**Phase relevance:** Phase 2 (security hardening).

---

### Pitfall 11: No Post-Deploy Verification in Deploy Script

**What goes wrong:** `scripts/deploy.mjs` runs `vercel --prod`, CMS sync, rsync, and WP page sync, but does not verify that the deployed API endpoints actually work. A deployment can succeed (build passes, files uploaded) while the API is completely broken.

**Prevention:**
1. Add a post-deploy health check step to `deploy.mjs`:
   ```javascript
   const res = await fetch("https://youngwisewomen.nl/api/ping");
   if (!res.ok) throw new Error("API health check failed after deploy");
   ```
2. Test at least `/api/ping` and one form endpoint after every deploy

**Detection:** Only discovered when a user tries to submit a form and gets an error.

**Phase relevance:** Phase 1 -- add health check as part of fixing the API.

---

### Pitfall 12: `serverless-http` is a devDependency

**What goes wrong:** `serverless-http` is listed under `devDependencies` in package.json. On Vercel, `pnpm install` installs production dependencies for the serverless function runtime. If the function imports `serverless-http`, it may not be available at runtime.

**Prevention:**
1. If `serverless-http` is needed (it should not be -- see Pitfall 2), move it to `dependencies`
2. Better: remove `serverless-http` entirely and use a different approach (pre-bundling or native Vercel functions)

**Detection:** Function crashes with `Cannot find module 'serverless-http'` only in production, works locally.

**Phase relevance:** Phase 1. Remove `serverless-http` from the project.

---

### Pitfall 13: Debug Code Left in Production

**What goes wrong:** The `api/[...all].ts` file and `server/index.ts` contain debug endpoints (`/api/debug/env-check`) and the debug report notes "debug wrapper nog actief". Debug endpoints that expose environment variable presence are a security risk.

**Prevention:**
1. Remove `/api/debug/env-check` endpoint before production deploy
2. Remove any try/catch wrappers that expose internal error details
3. Add a pre-deploy check that greps for "debug" in API files

**Detection:** Visiting `/api/debug/env-check` in production reveals which env vars are set.

**Phase relevance:** Phase 1 -- clean up as part of the fix.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Fix API on Vercel (Phase 1) | Pitfall 1 (cross-dir imports), Pitfall 2 (serverless-http), Pitfall 4 (includeFiles ignored) | Pre-bundle server code with esbuild into `api/` dir. Do NOT use serverless-http. Do NOT rely on includeFiles. |
| Verify Klaviyo integration (Phase 1) | Pitfall 5 (body parsing), Pitfall 6 (dotenv) | Test body parsing on Vercel specifically. Ensure dotenv is bundled or externalized correctly. |
| Clean up debug code (Phase 1) | Pitfall 13 (debug endpoints) | Remove all debug endpoints and wrappers before go-live. |
| Add deploy health checks (Phase 1) | Pitfall 11 (no verification) | Add `/api/ping` check to deploy script. |
| Harden API (Phase 2) | Pitfall 9 (no runtime validation), Pitfall 10 (open CORS) | Add Zod validation, restrict CORS origins. |
| Optimize cold start (Phase 2) | Pitfall 8 (heavy Express app) | Consider splitting into individual functions or keep pre-bundled single file. |
| Ongoing maintenance | Pitfall 7 (Klaviyo API revision) | Monitor Klaviyo deprecation notices. |

## Recommended Fix Strategy (Summary)

The root cause of all critical issues is a single architectural mismatch: **an Express app in `server/` being imported by a catch-all in `api/` on a Vercel deployment with a Vite framework adapter.**

The most reliable fix path (in priority order):

1. **Add a pre-build step** that uses esbuild to bundle `server/index.ts` + all dependencies into `api/_server.mjs` as a single ESM file
2. **Rewrite `api/[...all].ts`** to import from `./\_server.mjs` (local to `api/`)
3. **Remove `serverless-http`** -- export the Express app directly (`export default app`; Vercel supports this natively)
4. **Remove `includeFiles`** from vercel.json (not needed with pre-bundling)
5. **Add post-deploy health check** to `deploy.mjs`
6. **Clean up debug code** before go-live

Alternative (more work but cleaner long-term): rewrite each route as a standalone Vercel function file in `api/`, eliminating Express entirely. This avoids the Express-to-serverless conversion problem completely but requires duplicating middleware logic.

## Sources

- Project files: `docs/VERCEL-API-DEBUG-REPORT.md` (first-hand error logs and debugging history)
- Project files: `api/[...all].ts`, `server/index.ts`, `vercel.json`, `package.json`
- Vercel official docs: `/docs/functions/runtimes/node-js` (confirmed: functions default to `api/` directory, ESM support, Express guide reference)
- Package analysis: `serverless-http@3.2.0` package.json (CJS-only, Express 4 devDeps)
- Package analysis: project package.json (`"type": "module"`, Express 5.1.0)
