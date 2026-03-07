---
phase: 2
slug: cleanup-en-deploy-pipeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.2.4 |
| **Config file** | None (uses Vite config defaults) |
| **Quick run command** | `pnpm typecheck` |
| **Full suite command** | `pnpm typecheck && pnpm build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm typecheck`
- **After every plan wave:** Run `pnpm typecheck && pnpm build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CLEN-01 | manual | Inspect `api/index.ts` (4 clean lines) | N/A | pending |
| 02-01-02 | 01 | 1 | CLEN-02 | build | `pnpm typecheck && pnpm build` | Yes | pending |
| 02-01-03 | 01 | 1 | CLEN-03 | build | `pnpm typecheck && pnpm build` | Yes | pending |
| 02-01-04 | 01 | 1 | DEPL-01 | smoke | `node scripts/deploy.mjs` (requires credentials) | Yes | pending |
| 02-01-05 | 01 | 1 | DEPL-02 | smoke | Built into deploy.mjs Step 5 | Yes | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `pnpm typecheck` passes after removing DemoResponse, Index.tsx, demo/mailchimp imports
- [ ] `pnpm build` succeeds after server/index.ts changes (esbuild regenerates _server.mjs)

*Existing infrastructure covers all phase requirements — no new test files needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| api/index.ts is clean | CLEN-01 | File content check (4 lines) | Read file, confirm no debug wrappers |
| /api/debug/env-check returns 404 | CLEN-02 | Requires deployed site | `curl -s -o /dev/null -w "%{http_code}" https://youngwisewomen.nl/api/debug/env-check` |
| Deploy pipeline runs end-to-end | DEPL-01 | Requires credentials + services | Run `npm run deploy` and verify all steps pass |
| Health check reports all endpoints | DEPL-02 | Requires deployed site | Verify Step 5 output in deploy run |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
