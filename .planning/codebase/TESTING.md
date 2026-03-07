# Testing Patterns

**Analysis Date:** 2026-03-07

## Test Framework

**Runner:**
- Vitest 3.2.4
- Config: Vitest uses the Vite config from `vite.config.ts` (no separate vitest config file)

**Assertion Library:**
- Vitest built-in `expect` (compatible with Jest API)

**Run Commands:**
```bash
pnpm test              # Run all tests once (vitest --run)
```

No watch mode or coverage scripts are configured in `package.json`. To run manually:
```bash
npx vitest             # Watch mode (default vitest behavior)
npx vitest --coverage  # Coverage (requires @vitest/coverage-v8 or similar, not installed)
```

## Test File Organization

**Location:**
- Co-located with source files (test file next to the module it tests)

**Naming:**
- `*.spec.ts` pattern (not `*.test.ts`)

**Current test files:**
```
client/
  lib/
    utils.spec.ts      # Only test file in the entire codebase
    utils.ts           # Module under test
```

**Coverage is minimal:** Only one test file exists, covering the `cn()` utility function. No tests exist for:
- React components or pages
- Custom hooks
- Server routes
- API client functions
- Shared types/utilities

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn function", () => {
  it("should merge classes correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    expect(cn("base-class", isActive && "active-class")).toBe(
      "base-class active-class",
    );
  });

  it("should handle false and null conditions", () => {
    const isActive = false;
    expect(cn("base-class", isActive && "active-class", null)).toBe(
      "base-class",
    );
  });

  it("should merge tailwind classes properly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("should work with object notation", () => {
    expect(cn("base", { conditional: true, "not-included": false })).toBe(
      "base conditional",
    );
  });
});
```

**Patterns:**
- Import test utilities from `"vitest"` (not `@jest/globals`)
- Use `describe()` to group related tests by function/feature
- Use `it()` with descriptive English messages starting with "should"
- Use `toBe()` for string equality assertions
- Direct function import from relative path (co-located)

## Mocking

**Framework:** Not established (no mocking patterns in existing tests)

**Recommended approach for this codebase (based on Vitest):**
```typescript
import { vi, describe, it, expect } from "vitest";

// Mock WordPress API
vi.mock("@/api/wordpress", () => ({
  fetchPageContent: vi.fn().mockResolvedValue({ hero_title: "Test" }),
}));
```

**What to mock (when adding tests):**
- WordPress REST API calls (`client/api/wordpress.ts` functions)
- Klaviyo API calls in server routes (`server/lib/klaviyo.ts`)
- `fetch()` global for integration-style tests
- Environment variables via `vi.stubEnv()`

**What NOT to mock:**
- `cn()` and other pure utility functions
- Type definitions
- Static data (fallback arrays, testimonials, inspiration items)

## Fixtures and Factories

**Test Data:**
- No dedicated test fixtures or factories exist
- Fallback data in hooks serves as de facto fixture data (real Dutch content)

**Existing fallback data that can serve as test fixtures:**
```typescript
// In client/hooks/useCoaches.ts
const fallbackCoaches: WPCoach[] = [
  { id: 1, name: "Ella Taal", image: "...", bio: "...", role: "Founder & Coach", order: 1 },
  // ...
];

// In client/hooks/useEvents.ts
const fallbackEvents: WPEvent[] = [
  { id: 1, label: "Terugkom dag", type: "terugkom-dag", year: 2026, ... },
  // ...
];
```

**Location:**
- No dedicated fixtures directory. When adding tests, create `client/__fixtures__/` or co-locate with test files.

## Coverage

**Requirements:** None enforced. No coverage thresholds configured.

**Current coverage:** Extremely low -- only `client/lib/utils.ts` is tested.

**View Coverage:**
```bash
npx vitest --coverage    # Requires installing @vitest/coverage-v8
```

## Test Types

**Unit Tests:**
- Only type present: pure function tests (`cn()` in `utils.spec.ts`)
- Pattern: import function, call with inputs, assert output

**Integration Tests:**
- Not present
- Server routes (`server/routes/*.ts`) are good candidates for integration tests with mocked Klaviyo

**E2E Tests:**
- Not present
- `puppeteer` (v24.37.5) is installed as a devDependency but used only for pre-rendering (`scripts/prerender.mjs`), not for testing

## Common Patterns

**Async Testing (recommended for future tests):**
```typescript
it("should fetch page content", async () => {
  const result = await fetchPageContent("home");
  expect(result).toBeDefined();
  expect(result.hero_title).toBe("Expected Title");
});
```

**Error Testing (recommended for server routes):**
```typescript
it("should return 400 for missing email", async () => {
  const req = { method: "POST", body: { firstName: "Test" } } as Request;
  const res = createMockResponse();
  await handleNewsletterSubscribe(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
```

## Guidance for Adding New Tests

**Priority areas to test:**
1. Server route handlers (`server/routes/*.ts`) - validation logic, error paths
2. API client functions (`client/api/wordpress.ts`) - response parsing, error handling
3. Utility functions (`client/lib/*.ts`) - pure functions are easiest to test
4. Klaviyo client (`server/lib/klaviyo.ts`) - profile attribute mapping

**Where to place new test files:**
- Co-locate with source: `server/routes/newsletter.spec.ts` next to `newsletter.ts`
- Use `.spec.ts` extension (established convention from `utils.spec.ts`)

**Server route testing pattern (recommended):**
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleNewsletterSubscribe } from "./newsletter";

vi.mock("../lib/klaviyo", () => ({
  subscribeProfileToList: vi.fn().mockResolvedValue(undefined),
  createEvent: vi.fn().mockResolvedValue(undefined),
}));

describe("handleNewsletterSubscribe", () => {
  const mockRes = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("should return 400 when email is missing", async () => {
    const req = { method: "POST", body: { firstName: "Test" } } as any;
    const res = mockRes();
    await handleNewsletterSubscribe(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return success for valid input", async () => {
    vi.stubEnv("KLAVIYO_LIST_ID_NEWSLETTER", "test-list-id");
    const req = {
      method: "POST",
      body: { email: "test@example.com", firstName: "Test" },
    } as any;
    const res = mockRes();
    await handleNewsletterSubscribe(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});
```

---

*Testing analysis: 2026-03-07*
