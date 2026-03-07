# Phase 2: Cleanup en Deploy Pipeline - Research

**Researched:** 2026-03-07
**Domain:** Codebase cleanup, deploy pipeline hardening, post-deploy health checks
**Confidence:** HIGH

## Summary

Phase 2 is a cleanup and pipeline improvement phase. The codebase currently contains debug endpoints, unused route files (demo.ts, mailchimp.ts), and a dead starter page (Index.tsx) left over from Phase 1 debugging and the original project scaffold. The deploy script (`deploy.mjs`) works but aborts on first failure and lacks post-deploy verification. All changes are to existing project-specific files -- no new libraries or external tools are needed.

The scope is well-defined and low-risk: delete dead code, refactor error handling in deploy.mjs from throw-on-failure to collect-and-report, and add a Step 5 health check that sends HTTP requests to production endpoints. The CONTEXT.md decisions are specific and complete, leaving minimal ambiguity.

**Primary recommendation:** Execute as a single plan -- the changes span 4-5 files (server/index.ts, deploy.mjs, shared/api.ts, plus deletions), are interdependent (must rebuild `api/_server.mjs` after server changes), and should be deployed together.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Health check wordt Step 5 in deploy.mjs (geen apart script)
- Test alle 6 actieve POST endpoints (/api/newsletter, /api/netwerk, /api/bedrijfs, /api/weekend, /api/groeiscan, /api/vraagbaak) plus /api/ping
- POST requests met lege body, verwacht 400 (bewijst dat route handler draait + validatie werkt)
- /api/ping verwacht 200
- Bij failures: waarschuwing tonen maar deploy niet laten falen (deploy is al uitgevoerd)
- /api/ping blijft behouden (nuttig als health check endpoint)
- mailchimp.ts volledig verwijderen (legacy duplicate van newsletter.ts)
- demo.ts volledig verwijderen (test boilerplate)
- /api/debug/env-check endpoint verwijderen uit server/index.ts
- Success criteria in ROADMAP.md updaten: api/[...all].ts -> api/index.ts (Phase 1 heeft dit gewijzigd)
- Deploy script gaat door met alle stappen, ook als een stap faalt (collect errors, report at end)
- Summary table tonen aan het einde met pass/fail per stap + health check resultaten
- Geen --skip flags nodig (simpel houden)

### Claude's Discretion
- Dependency logic bij Vercel failure: Claude bepaalt welke stappen afhankelijk zijn en welke veilig door kunnen gaan
- Dead code audit: Claude zoekt referenties naar verwijderde bestanden (DemoResponse in shared/api.ts, imports in server/index.ts) en ruimt die ook op
- Exacte formatting van de summary table

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CLEN-01 | Debug wrapper in `api/[...all].ts` wordt vervangen door clean production code | Already resolved by Phase 1. File is now `api/index.ts` with 4 clean lines. ROADMAP success criteria needs text update only. |
| CLEN-02 | Debug endpoints (`/api/debug/env-check`) worden verwijderd | Remove lines 27-37 from `server/index.ts`, rebuild `api/_server.mjs` via esbuild |
| CLEN-03 | Ongebruikte route-bestanden (mailchimp.ts, demo.ts) worden verwijderd | Delete files + remove imports/routes from `server/index.ts` + clean up `DemoResponse` from `shared/api.ts` and `client/pages/Index.tsx` |
| DEPL-01 | `npm run deploy` voert alle stappen betrouwbaar uit | Refactor `deploy.mjs` error handling from throw-on-failure to collect-errors-and-continue, add summary table |
| DEPL-02 | Post-deploy health check test automatisch alle API endpoints na deployment | Add Step 5 to `deploy.mjs` using Node.js built-in `fetch()` (Node 22.x) to hit production endpoints |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-in `fetch()` | Node 22.x | HTTP requests for health check | No external dependency needed; available in Node 18+ |
| `child_process.spawnSync` | Node built-in | Running deploy sub-commands | Already used in deploy.mjs |

### Supporting
No new dependencies needed. This phase only modifies existing files and deletes dead code.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Built-in `fetch()` | `node-fetch` or `axios` | Unnecessary -- Node 22.x has stable `fetch()` globally available |
| Console output summary | chalk/ora | Over-engineering for a deploy script that runs infrequently |

## Architecture Patterns

### Current File Map (What Changes)

```
server/
  index.ts              # MODIFY: Remove debug endpoint, demo/mailchimp imports+routes
  routes/
    demo.ts             # DELETE
    mailchimp.ts         # DELETE
    newsletter.ts        # KEEP (active)
    netwerk.ts           # KEEP (active)
    bedrijfs.ts          # KEEP (active)
    weekend-inschrijving.ts  # KEEP (active)
    groeiscan.ts         # KEEP (active)
    vraagbaak.ts         # KEEP (active)

shared/
  api.ts                # MODIFY: Remove DemoResponse interface

client/
  pages/
    Index.tsx            # DELETE (dead starter page, not in App.tsx routes)

scripts/
  deploy.mjs            # MODIFY: Error handling + Step 5 health check + summary table

api/
  index.ts              # NO CHANGE (already clean 4-line file)
  _server.mjs           # REBUILT by esbuild after server/index.ts changes
```

### Pattern 1: Collect-Errors Deploy Pattern
**What:** Each deploy step is wrapped in try/catch. Errors are collected into an array instead of thrown. All steps execute regardless of failures (with dependency awareness). A summary table is printed at the end.
**When to use:** Multi-step deployment scripts where later steps may succeed independently.
**Example:**
```javascript
// Source: project-specific pattern based on CONTEXT.md decisions
const results = [];

async function runStep(n, total, label, fn) {
  step(n, total, label);
  try {
    await fn();
    results.push({ step: n, label, status: "pass" });
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
    results.push({ step: n, label, status: "FAIL", error: err.message });
  }
}
```

### Pattern 2: Health Check via Empty POST
**What:** Send POST with empty JSON body to each form endpoint. Expect 400 (proves route handler runs and validates input). GET /api/ping expects 200.
**When to use:** Post-deploy verification that serverless functions are alive and routing works.
**Example:**
```javascript
// Source: CONTEXT.md locked decision
const HEALTH_ENDPOINTS = [
  { method: "GET",  path: "/api/ping",                   expect: 200 },
  { method: "POST", path: "/api/newsletter/subscribe",    expect: 400 },
  { method: "POST", path: "/api/netwerk/subscribe",       expect: 400 },
  { method: "POST", path: "/api/bedrijfs/brochure-lead",  expect: 400 },
  { method: "POST", path: "/api/weekend/inschrijving",    expect: 400 },
  { method: "POST", path: "/api/groeiscan/lead",          expect: 400 },
  { method: "POST", path: "/api/vraagbaak/lead",          expect: 400 },
];
```

### Pattern 3: Step Dependency Awareness
**What:** When Step 1 (Vercel deploy) fails, the health check (Step 5) should still run against the existing deployment. CMS sync (Step 2), PHP rsync (Step 3), and WP pages (Step 4) are independent of each other but all depend on their respective services being reachable.
**When to use:** Determining which steps to skip vs continue after a failure.

**Dependency analysis:**
| Step | Depends On | Safe to Run After Step 1 Failure? |
|------|-----------|----------------------------------|
| 1. Vercel deploy | Nothing | N/A |
| 2. CMS sync | WP credentials | Yes -- WP is independent of Vercel |
| 3. PHP rsync | SSH credentials | Yes -- Cloud86 is independent |
| 4. WP pages | WP credentials | Yes -- WP is independent |
| 5. Health check | Deployed site | Yes -- tests EXISTING deployment |

**Conclusion:** All steps can always proceed. No step needs to be skipped based on another step's failure. The health check tests whatever is currently deployed (even if the latest deploy failed, the previous version is still running).

### Anti-Patterns to Avoid
- **Exiting on first deploy failure:** The current `run()` throws on non-zero exit. Wrap all `run()` calls in the new `runStep()` pattern.
- **Using `process.exit(1)` in the middle of deploy:** Let all steps complete, then exit with code 1 if any failed.
- **Sending real form data in health checks:** Empty body is deliberate -- avoids creating real Klaviyo profiles/events.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTTP requests for health check | Manual XMLHttpRequest or http module | `globalThis.fetch()` (Node 22.x built-in) | Simpler API, already available, no dependency |
| Summary table formatting | Complex table rendering library | Console.log with padded strings | Deploy script runs in terminal, simple output is fine |

**Key insight:** This phase needs zero new dependencies. Everything is achievable with Node.js built-ins and modifications to existing project files.

## Common Pitfalls

### Pitfall 1: Forgetting to Rebuild _server.mjs
**What goes wrong:** Changes to `server/index.ts` (removing routes/imports) don't take effect on Vercel because the deployed bundle is `api/_server.mjs`, which is a pre-built esbuild output.
**Why it happens:** The esbuild step (`npm run build:api`) must run after modifying server source files.
**How to avoid:** After modifying `server/index.ts`, run `pnpm build:api` to regenerate `api/_server.mjs`. The full `pnpm build` also does this. The deploy script runs `vercel --prod` which triggers the full build on Vercel's side.
**Warning signs:** Deleted routes still respond 200 after deploy.

### Pitfall 2: Index.tsx DemoResponse Import Creates Build Error
**What goes wrong:** Deleting `DemoResponse` from `shared/api.ts` without also handling `client/pages/Index.tsx` causes a TypeScript compilation error.
**Why it happens:** `Index.tsx` imports `DemoResponse` from `@shared/api` (line 1). Even though `Index.tsx` is not in any route in `App.tsx`, Vite still bundles it if TypeScript resolves it.
**How to avoid:** Delete `client/pages/Index.tsx` as part of the cleanup. It's a dead starter template page -- not imported anywhere, not in any route.
**Warning signs:** `pnpm typecheck` fails after removing `DemoResponse`.

### Pitfall 3: Health Check URL Resolution
**What goes wrong:** Health check hits wrong URL (localhost instead of production).
**Why it happens:** No production URL is explicitly configured in deploy.mjs currently.
**How to avoid:** Use `https://youngwisewomen.nl` as the base URL for health checks (the custom domain). Alternatively, use `https://young-wise-women-3.vercel.app`. The custom domain is preferred because it tests the full DNS + SSL + routing chain.
**Warning signs:** Health check passes but production site is actually broken.

### Pitfall 4: POST to Form Endpoints May Return 500 Instead of 400
**What goes wrong:** Some endpoints check for missing Klaviyo env vars and return 500 before validating input. An empty POST body hits the email/firstName validation first (400), but if Klaviyo env vars are somehow missing, the endpoint returns 500.
**Why it happens:** Validation order in route handlers: some check env vars first, others check input first.
**How to avoid:** In the health check, accept both 400 and 500 as "alive" -- the important thing is that the route handler executes (not a Vercel 404 or timeout). Only a 404 or network error indicates a routing problem.
**Warning signs:** Health check reports failures even though endpoints work fine with real data.

**Recommendation:** Accept any status < 500 as pass, or specifically accept {200, 400} as pass and flag 500 as a warning (not a failure).

### Pitfall 5: mailchimp.ts References klaviyo.ts
**What goes wrong:** Deleting mailchimp.ts could break if other files import from it.
**Why it happens:** mailchimp.ts imports from `../lib/klaviyo` (uses it), but nothing imports FROM mailchimp.ts except server/index.ts.
**How to avoid:** The grep confirms only `server/index.ts` imports `handleMailchimpSubscribe`. Safe to delete.
**Warning signs:** TypeScript or esbuild errors after deletion.

## Code Examples

### Current server/index.ts (lines to remove)
```typescript
// Source: /Users/sterremolendijk/YWW_FINAL/yww-wp/server/index.ts

// REMOVE these imports (lines 4-5):
import { handleDemo } from "./routes/demo";
import { handleMailchimpSubscribe } from "./routes/mailchimp";

// REMOVE this debug endpoint (lines 27-37):
app.get("/api/debug/env-check", (_req, res) => {
  res.json({
    KLAVIYO_PRIVATE_KEY: !!process.env.KLAVIYO_PRIVATE_KEY,
    // ...
  });
});

// REMOVE these route registrations (lines 39-40):
app.get("/api/demo", handleDemo);
app.post("/api/mailchimp/subscribe", handleMailchimpSubscribe);
```

### Clean server/index.ts (target state)
```typescript
// Source: project pattern
import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleNewsletterSubscribe } from "./routes/newsletter";
import { handleNetwerkSubscribe } from "./routes/netwerk";
import { handleBedrijfsBrochureLead } from "./routes/bedrijfs";
import { handleWeekendInschrijving } from "./routes/weekend-inschrijving";
import { handleGroeiScanLead } from "./routes/groeiscan";
import { handleVraagbaakLead } from "./routes/vraagbaak";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use("/api", express.json());
  app.use("/api", express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.post("/api/newsletter/subscribe", handleNewsletterSubscribe);
  app.post("/api/netwerk/subscribe", handleNetwerkSubscribe);
  app.post("/api/bedrijfs/brochure-lead", handleBedrijfsBrochureLead);
  app.post("/api/weekend/inschrijving", handleWeekendInschrijving);
  app.post("/api/groeiscan/lead", handleGroeiScanLead);
  app.post("/api/vraagbaak/lead", handleVraagbaakLead);

  return app;
}
```

### Health Check Implementation Pattern
```javascript
// Source: project-specific, based on CONTEXT.md decisions
const BASE_URL = "https://youngwisewomen.nl";

const HEALTH_CHECKS = [
  { method: "GET",  path: "/api/ping",                   expect: 200 },
  { method: "POST", path: "/api/newsletter/subscribe",    expect: 400 },
  { method: "POST", path: "/api/netwerk/subscribe",       expect: 400 },
  { method: "POST", path: "/api/bedrijfs/brochure-lead",  expect: 400 },
  { method: "POST", path: "/api/weekend/inschrijving",    expect: 400 },
  { method: "POST", path: "/api/groeiscan/lead",          expect: 400 },
  { method: "POST", path: "/api/vraagbaak/lead",          expect: 400 },
];

async function healthCheck() {
  const results = [];
  for (const check of HEALTH_CHECKS) {
    try {
      const res = await fetch(`${BASE_URL}${check.path}`, {
        method: check.method,
        headers: { "Content-Type": "application/json" },
        body: check.method === "POST" ? JSON.stringify({}) : undefined,
      });
      const pass = res.status === check.expect;
      results.push({ ...check, status: res.status, pass });
    } catch (err) {
      results.push({ ...check, status: "ERR", pass: false, error: err.message });
    }
  }
  return results;
}
```

### Summary Table Pattern
```javascript
// Source: project-specific
function printSummary(stepResults, healthResults) {
  console.log("\n" + "=".repeat(60));
  console.log("  DEPLOY SUMMARY");
  console.log("=".repeat(60));

  for (const r of stepResults) {
    const icon = r.status === "pass" ? "OK" : "FAIL";
    console.log(`  [${icon}]  Step ${r.step}: ${r.label}`);
    if (r.error) console.log(`         ${r.error}`);
  }

  if (healthResults) {
    console.log("\n  Health Check:");
    for (const h of healthResults) {
      const icon = h.pass ? "OK" : "FAIL";
      console.log(`  [${icon}]  ${h.method} ${h.path} -> ${h.status} (expected ${h.expect})`);
    }
  }

  console.log("=".repeat(60));
}
```

## Dead Code Audit (Claude's Discretion)

Full inventory of references to files being deleted, verified via grep:

### demo.ts references
| File | Line | Reference | Action |
|------|------|-----------|--------|
| `server/index.ts` | 4 | `import { handleDemo } from "./routes/demo"` | Remove import |
| `server/index.ts` | 39 | `app.get("/api/demo", handleDemo)` | Remove route |
| `shared/api.ts` | 8-12 | `DemoResponse` interface | Remove interface |
| `client/pages/Index.tsx` | 1 | `import { DemoResponse } from "@shared/api"` | Delete entire file (dead page) |
| `api/_server.mjs` | 6, 532 | Bundled demo references | Auto-fixed by rebuild |

### mailchimp.ts references
| File | Line | Reference | Action |
|------|------|-----------|--------|
| `server/index.ts` | 5 | `import { handleMailchimpSubscribe } from "./routes/mailchimp"` | Remove import |
| `server/index.ts` | 40 | `app.post("/api/mailchimp/subscribe", handleMailchimpSubscribe)` | Remove route |
| `api/_server.mjs` | 125, 533 | Bundled mailchimp references | Auto-fixed by rebuild |

### env-check references
| File | Line | Reference | Action |
|------|------|-----------|--------|
| `server/index.ts` | 27-37 | Debug endpoint definition | Remove block |
| `api/_server.mjs` | 521 | Bundled reference | Auto-fixed by rebuild |

### client/pages/Index.tsx
- **Not imported anywhere** in the codebase (confirmed via grep)
- **Not in any route** in `client/App.tsx`
- Contains only the Fusion starter template placeholder UI
- **Safe to delete** as part of dead code cleanup

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `api/[...all].ts` catch-all | `api/index.ts` + Vercel rewrite | Phase 1 (2026-03-07) | ROADMAP.md success criteria text needs update |
| `serverless-http` wrapper | Direct Express export | Phase 1 (2026-03-07) | Already completed |

**ROADMAP.md text fix needed:**
- Success criterion 1 says `api/[...all].ts` but should say `api/index.ts`
- This is noted in both STATE.md and CONTEXT.md

## Open Questions

1. **Health check base URL**
   - What we know: Custom domain is `youngwisewomen.nl`, Vercel URL is `young-wise-women-3.vercel.app`
   - What's unclear: Which URL to use for health checks -- custom domain tests full routing, Vercel URL is more direct
   - Recommendation: Use `https://youngwisewomen.nl` -- it tests the complete user path. If DNS is the problem, the health check correctly reports failure.

2. **Expected status for POST with empty body**
   - What we know: All route handlers validate `email` + `firstName` and return 400 when missing
   - What's unclear: Whether Express 5 returns 400 for empty body or something else (empty JSON `{}` has no `email` field)
   - Recommendation: Send `{}` as body. Handlers check `if (!email || !firstName)` -- empty object means both are `undefined`, so 400 is returned. This is verified by reading all 6 route handler implementations. **Confidence: HIGH.**

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.4 |
| Config file | None (uses Vite config defaults) |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CLEN-01 | api/index.ts is clean (no debug wrapper) | manual | Inspect file content (4 lines) | N/A -- visual verification |
| CLEN-02 | /api/debug/env-check returns 404 | smoke/manual | `curl -s -o /dev/null -w "%{http_code}" https://youngwisewomen.nl/api/debug/env-check` | No -- post-deploy manual |
| CLEN-03 | No mailchimp.ts, demo.ts in codebase | unit | `test -f server/routes/demo.ts && exit 1 || exit 0` | No -- Wave 0 |
| DEPL-01 | deploy.mjs runs all steps, collects errors | smoke/manual | `node scripts/deploy.mjs` (requires credentials) | No -- manual run |
| DEPL-02 | Health check tests all endpoints post-deploy | smoke/manual | Built into deploy.mjs Step 5 | No -- self-testing |

### Sampling Rate
- **Per task commit:** `pnpm typecheck && pnpm test` (verifies no broken imports)
- **Per wave merge:** `pnpm build` (verifies esbuild succeeds with removed routes)
- **Phase gate:** Full deploy run + visual health check output

### Wave 0 Gaps
- [ ] `pnpm typecheck` must pass after removing DemoResponse and Index.tsx -- verify during implementation
- [ ] `pnpm build` must succeed after server/index.ts changes -- verify esbuild output has no dead references
- [ ] No new test files needed -- verification is via build success + deploy run + health check output

*(Most phase requirements are verified by build success and post-deploy health check, not unit tests)*

## Sources

### Primary (HIGH confidence)
- `server/index.ts` -- direct code inspection of all routes, imports, debug endpoints
- `server/routes/demo.ts` -- confirmed dead code (starter template)
- `server/routes/mailchimp.ts` -- confirmed duplicate of newsletter.ts (legacy)
- `client/pages/Index.tsx` -- confirmed dead page (not in App.tsx routes)
- `shared/api.ts` -- confirmed DemoResponse is only used by dead demo.ts and dead Index.tsx
- `scripts/deploy.mjs` -- current deploy script structure (4 steps, throw-on-failure)
- `api/index.ts` -- confirmed clean 4-line entry point (no debug wrapper)
- `package.json` -- Node 22.x engine, esbuild build:api script
- `vercel.json` -- rewrite rules `/api/(.*)` -> `/api`
- `.vercel/project.json` -- project name `young-wise-women-3`, Node 24.x on Vercel

### Secondary (MEDIUM confidence)
- CONTEXT.md -- all user decisions locked and clear
- STATE.md -- Phase 1 decisions (api/index.ts vs api/[...all].ts)

### Tertiary (LOW confidence)
- None -- all findings verified via direct code inspection

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all Node.js built-ins
- Architecture: HIGH -- all files inspected, all references traced via grep
- Pitfalls: HIGH -- verified by reading actual route handler implementations
- Dead code audit: HIGH -- complete grep across codebase confirms no hidden references

**Research date:** 2026-03-07
**Valid until:** Indefinite -- this is project-specific cleanup, not library-dependent
