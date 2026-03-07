# Feature Landscape

**Domain:** Vercel serverless form-processing API with Klaviyo CRM integration for a headless WordPress site
**Researched:** 2026-03-07
**Overall confidence:** HIGH (based on codebase analysis, Vercel documentation knowledge, Klaviyo API patterns)

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Working form submissions on production** | Forms are the site's conversion mechanism. Non-functional forms = zero leads. | High | Currently BROKEN. The `api/[...all].ts` catch-all cannot bundle `server/` directory on Vercel. This is the #1 blocker. |
| **Server-side API key protection** | Klaviyo private key must never be exposed to the browser. All form-to-CRM calls must go through a server-side proxy. | Low | Already implemented correctly. Forms POST to `/api/*` routes, server calls Klaviyo. |
| **Loading states on submit** | Users need visual feedback that their form is being processed. Without it, they double-submit or assume it's broken. | Low | Already implemented. All forms use `isLoading`/`isSubmitting` state with disabled buttons and text changes. |
| **Success confirmation** | Users need to know their submission went through. Especially for registrations (weekend retreat = commitment). | Low | Partially implemented. Newsletter uses toast, LidWorden uses success message with auto-reset, WeekendIntensive shows success panel. Consistent but different patterns per form. |
| **Error feedback on failure** | When the API fails, users need to know what happened and what to do next. Silent failures erode trust. | Low | Partially implemented. Some forms show inline errors (WeekendIntensiveTransactie, LidWorden), newsletter uses destructive toast. No forms show actionable retry guidance. |
| **Basic input validation (client-side)** | Catching obvious mistakes (empty email, missing name) before sending. Prevents unnecessary API calls and bad data in CRM. | Low | Implemented inconsistently. Newsletter requires `firstName` + `email`. Weekend has conditional validation for company fields. No email format validation on any form. |
| **Server-side input validation** | Defense against malformed or malicious data reaching Klaviyo. Client-side validation can be bypassed. | Low | Minimal. Routes check `if (!email)` but do not validate email format, string lengths, or sanitize input. Zod is already a dependency but unused server-side. |
| **CORS restriction** | POST endpoints that write to a CRM should not accept requests from any origin. Prevents trivial abuse from any website. | Low | NOT implemented. `cors()` is called with no config = wildcard `*`. Should restrict to `youngwisewomen.nl`, Vercel preview URLs, and `localhost`. |
| **Profile upsert (not duplicate)** | Submitting the same email twice should update the profile, not create duplicates. CRM data quality depends on this. | Low | Already implemented. Klaviyo's `profile-import` endpoint handles upsert natively. The `upsertProfile()` call runs before list subscription. |
| **Multi-list subscription** | Different forms subscribe to different Klaviyo lists. Network form subscribes to both network AND newsletter lists. | Low | Already implemented. Each route uses the correct `KLAVIYO_LIST_ID_*` env var. Netwerk route does `Promise.all()` for two lists. |
| **Event tracking per form** | CRM needs to know what the user did, not just who they are. Events drive automated flows (welcome email, follow-up sequence). | Low | Already implemented. Every route calls `createEvent()` with a named metric and properties. |

## Differentiators

Features that improve quality, reliability, or operational confidence. Not required for launch but high-value for a production site handling real leads.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Rate limiting on API routes** | Prevents bot abuse, protects Klaviyo API quota (75 req/s), stops fake profile flooding. Without it, a single curl loop can burn through CRM quotas and pollute data. | Low | Not implemented. Use `express-rate-limit` with 10-20 req/min per IP on `/api` routes. In Vercel serverless context, use Vercel's built-in IP headers (`x-forwarded-for`) or switch to Vercel Edge Middleware for rate limiting. |
| **Structured request validation with Zod** | Catches invalid data before it reaches Klaviyo. Provides specific error messages ("Invalid email format") instead of generic failures. Zod schemas double as documentation. | Low | Zod is already installed. Define schemas in `shared/` and use in both server validation and (optionally) client-side form validation. Shared types already exist in `shared/api.ts` for groeiscan and vraagbaak. |
| **Honeypot anti-spam field** | Low-friction bot prevention. Hidden field that bots fill in but humans do not. Zero UX impact, catches most automated spam. | Low | Not implemented. Add a hidden input to each form and reject submissions where it is filled. No external service needed. |
| **Consistent error response format** | All error responses follow the same shape (`{ error: string, detail?: string }`). Enables unified client-side error handling instead of per-form error parsing. | Low | Partially consistent. Some routes return `{ error, detail }`, others just `{ error }`. Standardize across all routes. |
| **Environment variable validation at startup** | Fail fast if required env vars (Klaviyo keys, list IDs) are missing. Currently, routes fail at request time with `500 Server configuration error`, which is invisible until a user submits a form. | Low | Currently each route checks its own env var at request time. Validate all required env vars once at server startup and refuse to start if any are missing. |
| **Request logging** | Visibility into which endpoints are called, response times, and error rates. Essential for debugging production issues and understanding traffic. | Low | Not implemented. Add minimal request logging (method, path, status, duration). In Vercel serverless, logs go to Vercel's function logs automatically, but structured logging (e.g., JSON format) makes them searchable. |
| **Error boundary on React app** | Prevents the entire SPA from crashing to a white screen if a component throws. Shows a user-friendly error page instead. | Low | Not implemented. Wrap `<Routes>` in an error boundary component. Independent of API work but important for overall UX. |
| **Retry logic on client-side form submission** | Network errors and cold-start timeouts are common on serverless. Automatic retry (1-2 attempts) with exponential backoff prevents lost submissions for transient failures. | Medium | Not implemented. Currently a network error shows an error toast and the user must manually retry. |
| **Idempotent form submissions** | If a retry sends the same data twice, the CRM should not create duplicate events. Use a client-generated idempotency key (UUID) passed to the server. | Medium | Not implemented. Currently, retrying a form submission creates duplicate Klaviyo events. The profile upsert is naturally idempotent, but `createEvent()` is not. |
| **Health check endpoint** | A `/api/health` endpoint that verifies Klaviyo connectivity and env vars. Enables uptime monitoring and immediate visibility when something breaks. | Low | Partially exists as `/api/debug/env-check` but exposes too much info and is not suitable for production monitoring. Replace with a proper health check. |
| **Confirmation email via Klaviyo flow** | After form submission, Klaviyo sends an automated confirmation email. This is not a code feature but a Klaviyo flow configuration triggered by the events already being created. | Low (config) | Events are already being tracked. The Klaviyo flow just needs to be configured in the Klaviyo dashboard to trigger on the custom metrics. |

## Anti-Features

Features to explicitly NOT build. Either over-engineering, wrong abstraction, or harmful.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **reCAPTCHA / Turnstile on every form** | Adds friction to conversion forms. The site targets young women signing up for retreats and networking -- captchas reduce conversion rates. Spam risk is moderate (niche Dutch site, not a global SaaS). | Use honeypot fields (zero friction). Add rate limiting. Only add visible captcha if spam becomes a measurable problem. |
| **Custom email sending from the server** | Building email templates, SMTP config, and delivery tracking server-side duplicates what Klaviyo already does. Klaviyo has built-in flows, templates, and deliverability management. | Use Klaviyo flows triggered by events. The server creates the event; Klaviyo handles the email. |
| **Complex form builder / dynamic forms** | There are only 6 forms, each with different fields and CRM mapping. A generic form builder adds abstraction without value. Each form is simple enough to be a standalone component. | Keep forms as individual React components with dedicated server routes. The 1:1 mapping is clear and debuggable. |
| **WebSocket / real-time submission status** | Forms submit once and return. There is no need for real-time updates, progress bars, or streaming responses. A POST with JSON response is sufficient. | Standard `fetch` POST with loading state. Serverless functions have a 10-second timeout which is more than enough for a Klaviyo API call (typically <500ms). |
| **Client-side Klaviyo SDK / direct browser integration** | Klaviyo offers a JavaScript SDK for client-side tracking. Using it exposes the API key to the browser and splits tracking between client and server, making it harder to debug. | Keep all Klaviyo calls server-side through the Express routes. One integration point, one place to debug. |
| **Queue / background job system** | The site handles <100 form submissions per day. Synchronous Klaviyo API calls complete in <500ms. A queue (Redis, SQS, etc.) adds operational complexity for zero benefit at this scale. | Call Klaviyo synchronously in the request handler. Return success/failure immediately. |
| **Database for form submissions** | Storing form data in a database before sending to Klaviyo adds a persistence layer that needs backup, migration, and maintenance. Klaviyo IS the database for these leads. | Trust Klaviyo as the system of record. If Klaviyo is down, return an error and let the user retry. |
| **SSR for form pages** | Forms are interactive client-side components. Server-side rendering them adds complexity without SEO benefit (form pages are not indexed for search). The SPA approach is fine for form-heavy pages. | Keep forms as client-rendered React components. SEO is handled by Yoast meta tags and pre-rendered static pages. |
| **Express.js on Vercel with serverless-http** | The current `serverless-http` wrapper is broken and has proven fragile across Vercel runtime updates. Express adds weight to cold starts and introduces bundling complexity that native Vercel functions avoid. | Either bundle Express with esbuild into a single file, OR rewrite routes as standalone Vercel functions (`export default function handler(req, res)`) sharing only the Klaviyo lib. |

## Feature Dependencies

```
Working Vercel deployment ──> All other features
  |
  ├── Rate limiting (needs working API to protect)
  ├── Request logging (needs working API to log)
  ├── Health check endpoint (needs working API)
  └── Structured validation (needs working routes to validate in)

Zod schemas (shared/) ──> Server validation ──> Better error messages to client

Honeypot field ──> Client form update + Server rejection logic (independent of other features)

Client retry logic ──> Idempotency keys (retry without idempotency creates duplicates)

Error boundary (React) ──> Independent of API work, can be done in parallel
```

## MVP Recommendation

The site is nearly complete. The core blocker is that API routes do not work on Vercel production. The MVP for this milestone is narrow:

**Prioritize (must-ship):**
1. **Working Vercel API deployment** -- without this, nothing else matters. Recommend bundling with esbuild OR rewriting as standalone Vercel functions.
2. **Server-side input validation with Zod** -- low effort, high impact. Prevents bad data in Klaviyo.
3. **CORS restriction** -- one line change, prevents trivial abuse.
4. **Rate limiting** -- small middleware addition, prevents CRM pollution.

**Should-have (ship soon after):**
5. **Honeypot anti-spam** -- simple, effective, no UX cost.
6. **Environment variable validation at startup** -- fail fast instead of fail silently.
7. **Remove debug endpoints and dead code** -- cleanup (`/api/debug/env-check`, `mailchimp.ts`, `demo.ts`, `Index.tsx`).
8. **Consistent error response format** -- small standardization across routes.

**Defer (not needed for launch):**
- Client-side retry logic with idempotency keys: adds complexity, only matters under unreliable network conditions
- Request logging: Vercel provides basic function logs already
- Error boundary: important but independent of the API milestone
- Health check endpoint: nice-to-have for monitoring, not launch-blocking
- Confirmation emails: Klaviyo flow configuration, not code work

## Sources

- Codebase analysis: `server/routes/*.ts`, `server/lib/klaviyo.ts`, `server/index.ts`, `api/[...all].ts`
- Codebase analysis: `client/components/NewsletterSignup.tsx`, `client/pages/LidWorden.tsx`, `client/pages/WeekendIntensiveTransactie.tsx`, `client/pages/VoorOrganisaties.tsx`, `client/components/GroeiScanSection.tsx`, `client/components/VraagbaakWidget.tsx`
- Codebase analysis: `vercel.json`, `shared/api.ts`
- Project context: `.planning/PROJECT.md`, `.planning/codebase/CONCERNS.md`
- Debug report: `docs/VERCEL-API-DEBUG-REPORT.md`
- Klaviyo API knowledge: profile-import endpoint (upsert), subscription-bulk-create-jobs, events API (training data, HIGH confidence -- patterns match codebase implementation)
- Vercel serverless functions: function bundling, `includeFiles`, cold starts, runtime behavior (training data, HIGH confidence -- consistent with observed behavior in debug report)
