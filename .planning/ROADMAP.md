# Roadmap: Young Wise Women

## Overview

De site is functioneel compleet maar de API routes (formulierverwerking naar Klaviyo) werken niet op Vercel productie. Deze roadmap lost het deployment-probleem op, ruimt debug-code op, maakt de deploy-pipeline waterdicht, en verhardt de API voor productiegebruik. Drie fasen: eerst het serverless bundling-probleem fixen (de enige echte blocker), dan opruimen en verifi&euml;ren, dan hardening voor veilige productie.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Vercel API Fix** - Pre-bundle server code zodat alle formulier-endpoints werken op Vercel productie
- [ ] **Phase 2: Cleanup en Deploy Pipeline** - Debug-code verwijderen, deploy-pipeline betrouwbaar maken, alle endpoints verifi&euml;ren
- [ ] **Phase 3: Production Hardening** - Input validatie en CORS-beperking voor veilige productie
- [ ] **Phase 4: Klaviyo CRM & Flows Setup** - Alle formulieren inventariseren, Klaviyo-lijsten/flows/automations inrichten, welkomstmails, CRM production-ready maken

## Phase Details

### Phase 1: Vercel API Fix
**Goal**: Bezoekers kunnen formulieren invullen op de live site en hun data komt aan in Klaviyo
**Depends on**: Nothing (first phase)
**Requirements**: VRCL-01, VRCL-02, VRCL-03
**Success Criteria** (what must be TRUE):
  1. Alle 8 formulier-endpoints (`/api/newsletter`, `/api/network`, `/api/retreat-*`, `/api/brochure`, etc.) retourneren een 200-response op de Vercel productie-URL
  2. Een formulierinzending op de live site resulteert in een nieuw profiel/subscription in de correcte Klaviyo-lijst
  3. `api/_server.mjs` wordt gegenereerd door het build-proces en bevat alle server-dependencies zonder cross-directory imports
  4. `serverless-http` staat niet meer in package.json
**Plans:** 1 plan

Plans:
- [x] 01-01-PLAN.md -- Pre-bundle server via esbuild, remove serverless-http, pin Node.js 22.x, deploy and verify

### Phase 2: Cleanup en Deploy Pipeline
**Goal**: De codebase is schoon, de deploy-pipeline werkt betrouwbaar, en alle endpoints zijn geverifieerd op productie
**Depends on**: Phase 1
**Requirements**: CLEN-01, CLEN-02, CLEN-03, DEPL-01, DEPL-02
**Success Criteria** (what must be TRUE):
  1. `api/index.ts` bevat alleen een clean import+export van `_server.mjs` -- geen debug wrappers, geen try/catch error logging
  2. `/api/debug/env-check` retourneert een 404 (endpoint verwijderd)
  3. `npm run deploy` voert alle stappen succesvol uit in een enkele run (Vercel build + CMS sync + PHP rsync + WP pages + health check)
  4. Na een deploy bevestigt een automatische health check dat alle API endpoints bereikbaar zijn
  5. Er zijn geen ongebruikte route-bestanden (mailchimp.ts, demo.ts) meer in de codebase
**Plans:** 1 plan

Plans:
- [ ] 02-01-PLAN.md -- Remove dead code/debug endpoints, harden deploy.mjs with collect-errors + health check

### Phase 3: Production Hardening
**Goal**: De API is beschermd tegen ongeldige input en ongeautoriseerde origins zodat Klaviyo-data schoon blijft
**Depends on**: Phase 2
**Requirements**: HARD-01, HARD-02
**Success Criteria** (what must be TRUE):
  1. Een formulier-POST met ontbrekende of ongeldige velden retourneert een duidelijke 400-error met veldbeschrijving (niet een 500 of Klaviyo-error)
  2. Een API-request vanaf een niet-toegestaan domein wordt geblokkeerd door CORS (geen wildcard `*` meer)
  3. Correcte formulierinzendingen vanaf youngwisewomen.nl en cms.youngwisewomen.nl werken nog steeds normaal
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Vercel API Fix | 1/1 | Complete | 2026-03-07 |
| 2. Cleanup en Deploy Pipeline | 0/1 | Not started | - |
| 3. Production Hardening | 0/? | Not started | - |
| 4. Klaviyo CRM & Flows Setup | 0/? | Not started | - |

### Phase 4: Klaviyo CRM & Flows Setup
**Goal**: Klaviyo is volledig production-ready ingericht: alle formulieren op de site triggeren de juiste flows, bezoekers ontvangen automatisch welkomst-/opvolgmails, en het CRM is professioneel gesegmenteerd
**Depends on**: Phase 3
**Requirements**: TBD (research phase needed)
**Success Criteria** (what must be TRUE):
  1. Elk formuliertype (newsletter, netwerk, retreat-inschrijving, groeiscan, bedrijfsbrochure, vraagbaak) heeft een bijbehorende Klaviyo-flow met welkomst-/bevestigingsmail
  2. Klaviyo-lijsten en segmenten zijn logisch ingericht per doelgroep
  3. Email templates zijn professioneel en on-brand (Young Wise Women huisstijl)
  4. Een aanmelding via elk formulier op de live site resulteert in de juiste flow-trigger en email-ontvangst
  5. CRM-profielen bevatten alle relevante data (naam, email, aanmeldtype, bron)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD (run /gsd:plan-phase 4 to break down)
