---
phase: 01-vercel-api-fix
plan: 01
subsystem: infra
tags: [esbuild, vercel, serverless, express, pnpm]

# Dependency graph
requires: []
provides:
  - Working Vercel serverless API via esbuild-bundled Express app
  - Build pipeline that produces api/_server.mjs from server/index.ts
  - All 8 API endpoints responding on Vercel production
affects: [02-cleanup-deploy-pipeline, 03-production-hardening]

# Tech tracking
tech-stack:
  added: [esbuild (explicit devDep)]
  patterns: [esbuild server bundling for Vercel, direct Express export (no serverless-http wrapper), api/index.ts + rewrite pattern for nested routes]

key-files:
  created:
    - api/index.ts
  modified:
    - package.json
    - vercel.json
    - .gitignore
    - pnpm-lock.yaml

key-decisions:
  - "Used api/index.ts + /api/(.*) rewrite instead of api/[...all].ts -- Vercel Vite adapter does not route nested paths to catch-all files"
  - "Added esbuild as explicit devDependency -- pnpm does not create .bin symlinks for transitive dependencies on Vercel"
  - "Removed serverless-http entirely -- Vercel natively supports export default expressApp"
  - "Pinned Node.js to 22.x via engines field"

patterns-established:
  - "Server bundling: esbuild bundles server/index.ts to api/_server.mjs with --packages=external"
  - "Vercel API entry: api/index.ts imports bundled server, exports Express app directly"
  - "Nested route routing: vercel.json /api/(.*) rewrite directs all API traffic to api/index.ts"

requirements-completed: [VRCL-01, VRCL-02, VRCL-03]

# Metrics
duration: ~45min
completed: 2026-03-07
---

# Phase 1 Plan 01: Vercel API Fix Summary

**esbuild-bundled Express server for Vercel serverless with all 8 Klaviyo form endpoints verified working in production**

## Performance

- **Duration:** ~45 min (across two sessions with deployment checkpoint)
- **Started:** 2026-03-07
- **Completed:** 2026-03-07
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Server code pre-bundled into single `api/_server.mjs` via esbuild, eliminating cross-directory import failures on Vercel
- All 8 API endpoints verified working on Vercel production: `/api/ping`, `/api/debug/env-check`, `/api/newsletter/subscribe`, `/api/netwerk/subscribe`, `/api/bedrijfs/brochure-lead`, `/api/weekend/inschrijving`, `/api/groeiscan/lead`, `/api/vraagbaak/lead`
- Newsletter subscription confirmed end-to-end: data reaches Klaviyo
- Removed `serverless-http` dependency -- Vercel natively supports Express app exports
- Node.js runtime pinned to 22.x

## Task Commits

Each task was committed atomically:

1. **Task 1: Bundle server code for Vercel and update all config** - `5d02240` (feat)
2. **Task 1 deviation fix: esbuild explicit devDependency** - `29c6c47` (fix)
3. **Task 1 deviation fix: remove blocking api rewrite** - `5451ec6` (fix)
4. **Task 1 deviation fix: api/index.ts + rewrite pattern** - `408799c` (fix)
5. **Task 2: Deploy and verify** - checkpoint:human-verify (approved)

## Files Created/Modified

- `api/index.ts` - Vercel serverless entry point: imports bundled server, exports Express app (was `api/[...all].ts`, renamed)
- `api/_server.mjs` - esbuild-generated bundle of server/index.ts (gitignored, regenerated on build)
- `package.json` - Added `build:api` script, esbuild devDep, `engines.node: "22.x"`, removed serverless-http
- `vercel.json` - Removed `functions` block, added `/api/(.*)` rewrite to `api/index.ts`
- `.gitignore` - Added `api/_server.mjs`
- `pnpm-lock.yaml` - Updated (serverless-http removed, esbuild added)

## Decisions Made

- **api/index.ts instead of api/[...all].ts**: Vercel's Vite framework adapter does not route nested paths (like `/api/newsletter/subscribe`) to catch-all files. Using `api/index.ts` with an explicit `/api/(.*)` rewrite in vercel.json reliably routes all API traffic.
- **esbuild as explicit devDependency**: pnpm strict mode on Vercel does not create `.bin` symlinks for transitive dependencies (esbuild is a transitive dep of Vite). Adding it explicitly ensures `npx esbuild` works during `vercel build`.
- **Direct Express export (no serverless-http)**: Vercel's Node.js runtime natively supports `export default app` for Express apps, making the serverless-http wrapper unnecessary overhead.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] esbuild not found on Vercel during build**
- **Found during:** Task 1 (Vercel deployment)
- **Issue:** `npx esbuild` failed on Vercel because pnpm does not create `.bin` symlinks for transitive dependencies
- **Fix:** Added esbuild as explicit devDependency in package.json
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** Vercel build succeeds
- **Committed in:** `29c6c47`

**2. [Rule 3 - Blocking] Nested API routes returning 404 on Vercel**
- **Found during:** Task 2 (Production verification)
- **Issue:** Vercel's Vite framework adapter does not route nested paths to `api/[...all].ts` catch-all
- **Fix:** Renamed `api/[...all].ts` to `api/index.ts` and added `/api/(.*)` rewrite in vercel.json
- **Files modified:** api/index.ts (new), api/[...all].ts (deleted), vercel.json
- **Verification:** All 8 endpoints return proper responses (200 or 400 validation errors, not 404s)
- **Committed in:** `5451ec6`, `408799c`

---

**Total deviations:** 2 auto-fixed (both Rule 3 - Blocking)
**Impact on plan:** Both fixes were essential for Vercel deployment to work. The core approach (esbuild bundling + Express export) was correct; only the Vercel-specific routing mechanism and pnpm dependency resolution needed adaptation. No scope creep.

## Issues Encountered

- Initial deployment used `api/[...all].ts` as planned, but Vercel's Vite framework adapter only routed `/api` to the catch-all, not nested paths like `/api/newsletter/subscribe`. Resolved by switching to `api/index.ts` + explicit rewrite.
- `pnpm` on Vercel does not hoist transitive dependencies into `.bin`, so `npx esbuild` failed despite esbuild being a dependency of Vite. Resolved by adding esbuild as explicit devDependency.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All API endpoints working on Vercel production -- Phase 1 objective fully achieved
- Phase 2 (Cleanup en Deploy Pipeline) can proceed: debug endpoints and debug code can now be removed, deploy pipeline can be verified
- Note for Phase 2: `api/[...all].ts` referenced in CLEN-01 is now `api/index.ts` -- plan should reference the correct filename

## Self-Check: PASSED

All files verified present, all commits verified in git log, all content checks passed:
- api/index.ts, vercel.json, .gitignore, package.json, pnpm-lock.yaml: all exist
- Commits 5d02240, 29c6c47, 5451ec6, 408799c: all found in git log
- api/_server.mjs in .gitignore: confirmed
- build:api in package.json: confirmed
- serverless-http not in package.json: confirmed

---
*Phase: 01-vercel-api-fix*
*Completed: 2026-03-07*
