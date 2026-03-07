# Requirements: Young Wise Women

**Defined:** 2026-03-07
**Core Value:** Bezoekers kunnen zich via formulieren aanmelden voor retreats, het netwerk, en de nieuwsbrief, en die data komt betrouwbaar in de juiste Klaviyo-lijsten terecht voor geautomatiseerde opvolging.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Vercel API Deployment

- [ ] **VRCL-01**: Server code wordt pre-bundled naar `api/_server.mjs` via esbuild zodat alle API routes werken op Vercel productie
- [ ] **VRCL-02**: `serverless-http` dependency wordt verwijderd en vervangen door directe Express app export
- [ ] **VRCL-03**: Node.js runtime wordt gepind op 22.x in package.json engines

### Production Cleanup

- [ ] **CLEN-01**: Debug wrapper in `api/[...all].ts` wordt vervangen door clean production code
- [ ] **CLEN-02**: Debug endpoints (`/api/debug/env-check`) worden verwijderd
- [ ] **CLEN-03**: Ongebruikte route-bestanden (mailchimp.ts, demo.ts) worden verwijderd

### Deploy Pipeline

- [ ] **DEPL-01**: `npm run deploy` voert alle stappen betrouwbaar uit (Vercel build + CMS sync + PHP rsync + WP pages)
- [ ] **DEPL-02**: Post-deploy health check test automatisch alle API endpoints na deployment

### Production Hardening

- [ ] **HARD-01**: Formulier-endpoints valideren input server-side met Zod
- [ ] **HARD-02**: CORS wordt beperkt tot eigen domeinen (geen wildcard)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Security

- **HARD-03**: Rate limiting op API endpoints (express-rate-limit of Upstash Redis)
- **HARD-04**: Honeypot anti-spam op formulieren

## Out of Scope

| Feature | Reason |
|---------|--------|
| Workshop-formulieren | Nog geen workshops gepland, later toevoegen |
| Vraagbaak/chatbot Klaviyo-integratie | Hidden features, voor later |
| Betalingsintegratie | Aanmeldingen via formulieren, niet online betaling |
| Mobiele app | Web-only platform |
| Custom email sending | Klaviyo handled alle mailflows |
| Client-side Klaviyo SDK | API keys moeten server-side blijven |
| reCAPTCHA | Overkill voor huidige traffic, honeypot in v2 volstaat |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VRCL-01 | — | Pending |
| VRCL-02 | — | Pending |
| VRCL-03 | — | Pending |
| CLEN-01 | — | Pending |
| CLEN-02 | — | Pending |
| CLEN-03 | — | Pending |
| DEPL-01 | — | Pending |
| DEPL-02 | — | Pending |
| HARD-01 | — | Pending |
| HARD-02 | — | Pending |

**Coverage:**
- v1 requirements: 10 total
- Mapped to phases: 0
- Unmapped: 10

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-07 after initial definition*
