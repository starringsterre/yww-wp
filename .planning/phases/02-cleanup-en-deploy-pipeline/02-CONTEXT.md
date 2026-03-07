# Phase 2: Cleanup en Deploy Pipeline - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Debug-code en ongebruikte routes verwijderen uit de codebase, de deploy-pipeline betrouwbaar maken met foutafhandeling en samenvatting, en een post-deploy health check toevoegen die alle API endpoints verifieert op productie.

</domain>

<decisions>
## Implementation Decisions

### Health Check Design
- Health check wordt Step 5 in deploy.mjs (geen apart script)
- Test alle 6 actieve POST endpoints (/api/newsletter, /api/netwerk, /api/bedrijfs, /api/weekend, /api/groeiscan, /api/vraagbaak) plus /api/ping
- POST requests met lege body, verwacht 400 (bewijst dat route handler draait + validatie werkt)
- /api/ping verwacht 200
- Bij failures: waarschuwing tonen maar deploy niet laten falen (deploy is al uitgevoerd)

### Cleanup Scope
- /api/ping blijft behouden (nuttig als health check endpoint)
- mailchimp.ts volledig verwijderen (legacy duplicate van newsletter.ts)
- demo.ts volledig verwijderen (test boilerplate)
- /api/debug/env-check endpoint verwijderen uit server/index.ts
- Success criteria in ROADMAP.md updaten: api/[...all].ts -> api/index.ts (Phase 1 heeft dit gewijzigd)

### Deploy Error Handling
- Deploy script gaat door met alle stappen, ook als een stap faalt (collect errors, report at end)
- Summary table tonen aan het einde met pass/fail per stap + health check resultaten
- Geen --skip flags nodig (simpel houden)

### Claude's Discretion
- Dependency logic bij Vercel failure: Claude bepaalt welke stappen afhankelijk zijn en welke veilig door kunnen gaan
- Dead code audit: Claude zoekt referenties naar verwijderde bestanden (DemoResponse in shared/api.ts, imports in server/index.ts) en ruimt die ook op
- Exacte formatting van de summary table

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `api/index.ts`: Clean 4-line entry point (import + export _server.mjs) — al correct, geen debug wrapper
- `deploy.mjs`: Bestaand 4-step deploy script met helper functies (`step()`, `run()`, `checkEnv()`)
- `/api/ping` endpoint: Bestaand, geschikt als health check basis

### Established Patterns
- Deploy steps gebruiken `step(n, total, label)` + `run(cmd)` patroon
- Server routes volgen `handleXxx` naming convention met Request/Response types
- esbuild pre-bundling naar `api/_server.mjs` (Phase 1 pattern)

### Integration Points
- `server/index.ts`: Verwijder imports van demo.ts en mailchimp.ts + hun route-registraties
- `deploy.mjs`: Voeg Step 5 (health check) toe, wijzig error handling van throw naar collect
- `shared/api.ts`: DemoResponse type mogelijk verwijderen (alleen door demo.ts gebruikt)

</code_context>

<specifics>
## Specific Ideas

- Health check target URL is de Vercel productie-URL (young-wise-women-3.vercel.app of youngwisewomen.nl)
- De summary table moet duidelijk laten zien welke stappen geslaagd/gefaald zijn, zodat je in een oogopslag ziet wat er aan de hand is

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-cleanup-en-deploy-pipeline*
*Context gathered: 2026-03-07*
