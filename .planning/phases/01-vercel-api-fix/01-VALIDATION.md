---
phase: 1
slug: vercel-api-fix
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (already installed) |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | VRCL-01 | integration | `npx esbuild server/index.ts --bundle --platform=node --format=esm --packages=external --outfile=api/_server.mjs && test -f api/_server.mjs` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | VRCL-02 | unit | `! grep -q serverless-http package.json` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | VRCL-03 | unit | `node -e "const p=require('./package.json'); console.assert(p.engines?.node==='22.x')"` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | VRCL-01 | manual | curl production endpoints | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Build script produces `api/_server.mjs` — verified by file existence check
- [ ] `serverless-http` removed from package.json dependencies

*Existing vitest infrastructure covers unit tests. Integration tests are build-step validations.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| All 8 endpoints return 200 on Vercel production | VRCL-01 | Requires deployed Vercel environment | `curl -s -o /dev/null -w "%{http_code}" https://young-wise-women-3.vercel.app/api/ping` for each endpoint |
| Form submission creates Klaviyo profile | VRCL-01 | Requires live Klaviyo API + Vercel env vars | Submit test form on live site, verify in Klaviyo dashboard |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
