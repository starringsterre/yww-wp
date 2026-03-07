# Research Summary: Vercel Serverless Function Architecture

**Domain:** Serverless function bundling for Express monorepo (Vite + Express SPA)
**Researched:** 2026-03-07
**Overall confidence:** HIGH

## Executive Summary

The Young Wise Women site has a fully functional Express API with 8 Klaviyo-integrated form endpoints that work locally but fail on Vercel production. The root cause is an architectural mismatch: `api/[...all].ts` imports from `../server/index`, but Vercel's serverless function bundler (especially with the Vite framework builder active) does not include files outside the `api/` directory. The `includeFiles` config in vercel.json is confirmed to have no effect under the Vite framework adapter.

Three compounding issues make the current approach unworkable: (1) cross-directory imports are not traced by Vercel's nft bundler when the Vite framework builder is active, (2) `serverless-http` 3.2.0 is incompatible with Express 5 + ESM, causing silent timeouts, and (3) ESM does not support directory imports (`../server` must be `../server/index`). Each of these was confirmed by specific error messages in the debug report.

The recommended fix is a **pre-bundled serverless entry** pattern: use esbuild to compile `server/index.ts` and all its transitive dependencies into a single `api/_server.mjs` file as part of the build step. The existing `api/[...all].ts` becomes a 3-line wrapper that imports from this local file. This approach requires zero changes to the server source code, adds esbuild as an explicit devDependency (already a transitive dep via Vite), and fits cleanly into the existing build pipeline.

The Vercel documentation confirms that functions in the `api/` directory work with TypeScript, and the project's own testing shows standalone Express apps in `api/` deploy successfully. The fix is straightforward: make the function self-contained by pre-bundling its dependencies.

## Key Findings

**Stack:** Add esbuild as explicit devDependency. Remove serverless-http. Use `--packages=external` flag so npm packages (express, cors, dotenv) are resolved from node_modules at runtime (Vercel installs them). Pin Node.js to 22.x via package.json engines (Vercel default is now 24.x).

**Architecture:** Pre-bundle server code into `api/_server.mjs` using esbuild, so the serverless function has zero imports outside `api/`. Keep Vite framework builder for SPA, solve serverless independently.

**Critical pitfall:** The Vite framework adapter overrides `includeFiles` in vercel.json, making it impossible to pull in cross-directory files through config alone. Pre-bundling is the only reliable approach.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Fix Vercel API Deployment** - Add esbuild serverless bundle step, rewrite api/[...all].ts as thin wrapper
   - Addresses: Working form submissions (the only true blocker)
   - Avoids: Continued reliance on fragile serverless-http + cross-directory imports
   - Build order: `build:api` must run BEFORE `build:client` so `api/_server.mjs` exists before Vercel processes api/ files

2. **Verify and Clean Up** - Test all 8 endpoints on production, remove debug code, remove serverless-http
   - Addresses: Debug endpoint removal (`/api/debug/env-check`), serverless-http removal, post-deploy health check
   - Avoids: Security risks from debug endpoints, dead dependency weight

3. **Production Hardening** - Add input validation, CORS restriction, rate limiting
   - Addresses: Zod validation, CORS origins, rate limiting, honeypot anti-spam
   - Avoids: CRM data pollution, abuse from open endpoints

**Phase ordering rationale:**
- Phase 1 is a single, well-scoped change: add one build step + rewrite one file. Everything else depends on this working.
- Phase 2 is verification and cleanup -- can be done immediately after Phase 1 confirms the fix.
- Phase 3 is independent hardening that does not require the bundling architecture to change.

**Research flags for phases:**
- Phase 1: May need a quick technical spike to verify Express 5 default export works on Vercel's Node.js 22.x runtime. If not, Pattern 3 (native Vercel functions) is the fallback.
- Phase 1: Test for body parsing double-parse issue (Express `express.json()` + Vercel's built-in parsing). May need to disable Vercel helpers via `NODEJS_HELPERS=0` env var.
- Phase 2: Standard patterns, no research needed
- Phase 3: Standard security patterns, no research needed

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | esbuild is proven for this use case. `--packages=external` flag verified. serverless-http removal justified by debug evidence. Node.js versions verified from Vercel docs (24.x default, 22.x available). |
| Features | HIGH | All 8 form endpoints are built and tested locally. The fix is purely deployment. |
| Architecture | HIGH | Pre-bundle pattern confirmed by: standalone api/ tests working, Vercel docs for api/ functions, esbuild capability verified. Dependency tree is only 11 local files. |
| Pitfalls | HIGH | All critical pitfalls documented from first-hand error logs in debug report. Body parsing and dotenv behavior verified against Vercel docs. |

## Gaps to Address

- Express 5 direct export compatibility with Vercel's Node.js 22.x runtime needs a quick test (MEDIUM confidence -- Vercel docs reference Express but do not specify v5 explicitly)
- If Express 5 export fails, native Vercel function rewrite is the fallback (HIGH confidence but more work -- 8 routes to convert)
- Body parsing double-parse risk (Express middleware + Vercel's built-in parsing) needs testing after the fix. Vercel docs mention a `NODEJS_HELPERS=0` env var to disable built-in helpers.
- Vercel build output inspection should be done on first deploy to confirm `api/_server.mjs` is included correctly
- Node.js 24.x compatibility with Express 5.1.0 is untested -- recommend 22.x initially, upgrade later
