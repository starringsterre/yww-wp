# Coding Conventions

**Analysis Date:** 2026-03-07

## Naming Patterns

**Files:**
- Pages: PascalCase single-word or compound name, e.g. `Home.tsx`, `BlogDetail.tsx`, `WeekendIntensiveTransactie.tsx`
- Hooks: camelCase with `use` prefix, e.g. `usePageContent.ts`, `useCoaches.ts`, `useGlobalSettings.ts`
- Server routes: kebab-case, e.g. `weekend-inschrijving.ts`, `groeiscan.ts`
- Server lib: camelCase, e.g. `klaviyo.ts`
- Shared types/utils: camelCase, e.g. `api.ts`, `page-registry.mjs`
- Client lib utils: camelCase, e.g. `utils.ts`, `renderMultiline.tsx`, `siteBranding.ts`
- UI components (shadcn): kebab-case, e.g. `button.tsx`, `toast.tsx`, `use-toast.ts`
- Custom components: PascalCase, e.g. `HeroSection.tsx`, `ScrollFadeInUp.tsx`, `NewsletterSignup.tsx`

**Functions:**
- React components: PascalCase, exported as `default`, e.g. `export default function Home()`
- Hooks: camelCase with `use` prefix, named exports, e.g. `export function useCoaches()`
- API client functions: camelCase with `fetch` prefix, e.g. `fetchCoaches()`, `fetchPageContent()`
- Server route handlers: camelCase with `handle` prefix, e.g. `handleNewsletterSubscribe()`, `handleGroeiScanLead()`
- Server lib functions: camelCase describing the action, e.g. `subscribeProfileToList()`, `createEvent()`

**Variables:**
- camelCase for all variables and parameters
- React state: camelCase, e.g. `const [firstName, setFirstName] = useState("")`
- Destructured hook results: `const { data: cms } = usePageContent("slug")`
- Rename destructured data with descriptive aliases: `{ data: coaches }`, `{ data: settings }`, `{ data: cms }`

**Types/Interfaces:**
- PascalCase with `WP` prefix for WordPress data types: `WPCoach`, `WPEvent`, `WPBlog`, `WPPageContent`
- PascalCase for component props: `SEOHeadProps`, `HeroSectionProps`, `ButtonProps`
- Component props defined with `interface`, inline or in same file
- Shared API types in `shared/api.ts`: `GroeiScanLeadRequest`, `VraagbaakLeadRequest`

## Code Style

**Formatting:**
- Prettier with config in `.prettierrc`
- Tab width: 2 spaces
- No tabs (spaces only)
- Trailing commas: `all`
- Run: `npm run format.fix` (uses `prettier --write .`)

**Linting:**
- No ESLint config in project root (only Prettier)
- TypeScript strict mode: `false` in `tsconfig.json`
- `noImplicitAny: false`, `strictNullChecks: false` -- permissive TS config
- No unused variable/parameter warnings enforced

**Quotes:**
- Double quotes for strings throughout (Prettier default)
- JSX attributes use double quotes

## Import Organization

**Order:**
1. CSS imports (only in `App.tsx`: `import "./global.css"`)
2. External library imports (React, react-router-dom, @tanstack, lucide-react, etc.)
3. Internal path-aliased imports (`@/components/...`, `@/hooks/...`, `@/api/...`, `@/lib/...`)
4. Relative imports (for co-located files like `./utils`)

**Path Aliases:**
- `@/*` maps to `./client/*` -- use for all client-side imports
- `@shared/*` maps to `./shared/*` -- use for shared types between client and server
- Server code uses relative imports: `../lib/klaviyo`, `../../shared/api`

**Example (page file):**
```tsx
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { renderMultiline } from "@/lib/renderMultiline";
import SEOHead from "@/components/SEOHead";
```

## CMS Content Pattern

**The core content pattern used across all pages:**

```tsx
export default function PageName() {
  const { data: cms } = usePageContent("wp-slug");

  return (
    <div className="w-full">
      <SEOHead title="..." description="..." path="/route" />
      <h1>{cms?.field_name || "Hardcoded fallback text"}</h1>
      <img src={cms?.field_image || "https://fallback-url.com/image.jpg"} />
      {renderMultiline(cms?.field_text || "Multi-line\nfallback text", "text-gray-600")}
    </div>
  );
}
```

**Rules:**
- Always use optional chaining: `cms?.field_name`
- Always provide `||` fallback with real default content (not placeholder)
- Image fields end with `_image`, `_photo`, `_foto`, `_video`, `_url`, `_src`, `_thumbnail`
- Text fields end with `_text`, `_tekst`, `_content`, `_description`, `_quote`, `_bio`, `_intro`
- Other fields render as single-line text inputs in WP Admin
- Use `renderMultiline()` from `@/lib/renderMultiline` for multi-paragraph text

## Data Fetching Pattern

**WordPress content hooks follow a consistent pattern using `useWPContent`:**

```tsx
// For collection types (coaches, blogs, events, etc.)
import { useWPContent } from "./useWPContent";
import { fetchCoaches } from "@/api/wordpress";
import type { WPCoach } from "@/api/wp-types";

const fallbackData: WPCoach[] = [/* hardcoded array */];

export function useCoaches() {
  return useWPContent({
    queryKey: ["wp", "coaches"],
    queryFn: fetchCoaches,
    fallbackData: fallbackData,
  });
}
```

**Query key convention:** Always start with `"wp"`, then resource type, then optional identifier:
- `["wp", "coaches"]`
- `["wp", "page", slug]`
- `["wp", "seo", slug]`
- `["wp", "blog", slug]`

**Cache settings (standard):**
- `staleTime: 5 * 60 * 1000` (5 minutes)
- `gcTime: 10 * 60 * 1000` (10 minutes)
- `retry: 1`

**Fallback data:** Every hook provides hardcoded fallback data so the UI renders immediately before WP responds. Fallback arrays contain real Dutch content, not placeholders.

## Component Patterns

**Page components:**
- Default export: `export default function PageName()`
- Always include `<SEOHead>` as first child
- Wrap in `<div className="w-full">`
- Use `<HeroSection>` for pages with hero banners
- End with `<NewsletterSignup />` where appropriate

**Reusable components:**
- Props defined via `interface` in same file
- Default export: `export default function ComponentName({ prop1, prop2 }: Props)`
- UI primitives (shadcn) use `React.forwardRef` with `displayName`

**Animation wrapper components:**
- `ScrollFadeInUp`, `SlideInLeft`, `SlideInRight`, `BlurReveal`, `StaggerChildren`
- Use IntersectionObserver to trigger CSS animations on scroll
- Accept `children`, `className`, optional `as` prop for element tag

## Error Handling

**Client-side API calls (forms):**
```tsx
try {
  const response = await fetch("/api/endpoint", { method: "POST", ... });
  if (!response.ok) throw new Error("Failed");
  toast({ title: "Success message", description: "..." });
} catch (error) {
  console.error("Context:", error);
  toast({ title: "Error", description: "...", variant: "destructive" });
} finally {
  setIsLoading(false);
}
```

**WordPress API client (`client/api/wordpress.ts`):**
- `wpFetch<T>()` throws on non-OK responses with status info
- Individual functions like `fetchBlogBySlug()` catch and return `null` for 404s

**Server route handlers (`server/routes/*.ts`):**
- Check HTTP method: `if (req.method !== "POST") return res.status(405)`
- Validate required fields: return `400` with specific error message
- Check env vars: return `500` with "Server configuration error" (no secret leaking)
- Catch block: `console.error()` + return `500` with generic message
- Some routes include `detail` in non-production responses

**Server lib (`server/lib/klaviyo.ts`):**
- `getRequiredEnv()` throws with descriptive message if env var missing
- `klaviyoRequest()` throws on non-OK with status and error body

## Logging

**Framework:** `console` (no external logging library)

**Patterns:**
- `console.error("Descriptive context:", error)` in server catch blocks
- `console.error("Missing ENV_VAR_NAME environment variable")` for config errors
- Client-side: `console.error("Subscription error:", error)` in form submissions
- No `console.log()` in production code paths (only in `node-build.ts` startup messages)

## Comments

**When to Comment:**
- JSDoc-style comments for API client module: `/** WordPress REST API client for the YWW headless CMS. */`
- JSDoc for hook purpose: `/** Fetches page-level CMS content for a given slug. */`
- Section comments in JSX: `{/* Hero Video Section */}`, `{/* Benefits Section */}`
- Route marker comments: `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}`
- Inline comments for non-obvious behavior: `// eslint-disable-next-line ...`

**JSDoc/TSDoc:**
- Used sparingly, mainly on API functions and hooks
- Not used on component props (interface is self-documenting)

## Function Design

**Size:** Page components can be large (100-490 lines) as they represent full pages. Reusable components and hooks are small (10-50 lines).

**Parameters:**
- Components: single props object destructured in signature
- Hooks: 0-1 parameters (typically a slug string)
- Server handlers: always `(req: Request, res: Response)`

**Return Values:**
- Hooks: return React Query result object directly
- Server handlers: always return `res.json(...)` or `res.status(...).json(...)`
- API functions: return typed Promise

## Module Design

**Exports:**
- Page components: single `export default function`
- Hooks: single named `export function`
- API client: multiple named `export async function` per file
- Types: named `export interface` / `export type`
- UI components (shadcn): named exports of component + variants

**Barrel Files:**
- Not used in this codebase
- Each import references the specific file directly

## Styling

**Approach:** Tailwind CSS utility classes with shadcn/ui component library

**Color system:**
- CSS custom properties (HSL) defined in `client/global.css` `:root`
- Referenced via Tailwind config: `bg-primary`, `text-accent`, etc.
- Brand colors: primary = olive green (`#6B705C`), accent = terracotta (`#B46555`)
- Some inline hex colors used directly: `style={{ color: "#6B705C" }}`

**Typography:**
- Headings: `"Lora"` serif font
- Body: `"Poppins"` sans-serif font
- Both loaded via Google Fonts in `global.css`

**Responsive:**
- Tailwind breakpoints: `md:` (768px), `lg:` (1024px)
- Mobile-first approach
- `useIsMobile()` and `useIsDesktop()` hooks for JS-driven responsive logic

**Pattern for cn() utility:**
```tsx
import { cn } from "@/lib/utils";
// Merges Tailwind classes with conflict resolution
className={cn("base-class", condition && "conditional-class")}
```

---

*Convention analysis: 2026-03-07*
