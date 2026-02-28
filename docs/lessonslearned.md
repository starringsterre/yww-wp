# Lessons Learned: React Landing Page → WordPress Conversie

## Wat is er gedaan
De volledige Talentix React landing page (vibecoded met Vite/TypeScript/Tailwind/Shadcn) is 1-op-1 omgezet naar een custom WordPress theme. Dit is volledig autonoom door Claude gedaan.

## Resultaat
- **15 bestanden**, **2.211 regels code** toegevoegd
- Pixel-perfect replica van de React versie
- Alle content bewerkbaar via WordPress Customizer (96 velden)
- Geen plugins of page builders nodig

---

## Aanpak & Beslissingen

### 1. Vanilla CSS i.p.v. een framework
- **Keuze:** Geen Bootstrap, Tailwind of ander CSS framework
- **Waarom:** Kleinere payload, geen build-stap nodig, volledige controle, beter voor SEO
- **Resultaat:** 1 CSS-bestand van ~1030 regels met dezelfde design tokens (HSL kleuren) als de React versie

### 2. Template Parts structuur
- **Keuze:** Elke landing sectie als apart template-part bestand
- **Mapping:** `Hero.tsx` → `template-parts/landing/hero.php`, etc.
- **Waarom:** Modulair, makkelijk te herordenen/verwijderen, WordPress best practice
- **Bestanden:** hero, features, how-it-works, testimonials, pricing, faq

### 3. WordPress Customizer voor content
- **Keuze:** Alle teksten/content via `get_theme_mod()` met defaults
- **Waarom:** Non-technische gebruikers kunnen alles aanpassen via de admin
- **Omvang:** 96 customizer-velden verdeeld over 7 secties
- **Secties:** Hero (8), Features (14), How It Works (10), Testimonials (17), Pricing (21), FAQ (14), Footer (2)

### 4. Vanilla JavaScript
- **Keuze:** Pure JS, geen jQuery of Alpine.js
- **Slechts ~80 regels** voor: mobiel menu, FAQ accordion, smooth scroll
- **Waarom:** Minimale overhead, geen build-stap, werkt overal

### 5. Inline SVG iconen
- **Keuze:** SVG's direct in de PHP templates hardcoded
- **Waarom:** Geen dependency op icon fonts/libraries, styleable met CSS

### 6. Design token consistentie
- **Identieke HSL kleurwaarden** in zowel React (`index.css`) als WordPress (`style.css`)
- Primary: `229 100% 57%` (#244DFE), Accent: `262 83% 58%` (#8B5CF6)
- Zelfde font (Inter), zelfde spacing, zelfde breakpoints

---

## Technische Mapping

| React | WordPress |
|-------|-----------|
| TypeScript + JSX | PHP templates |
| Tailwind utility classes | Vanilla CSS + design tokens |
| React components | `get_template_part()` |
| Component state/props | `get_theme_mod()` defaults |
| Lucide React icons | Inline SVG strings |
| React Router | WordPress page system |
| Vite build | Geen build nodig (server-rendered) |
| SPA (client-side) | Server-side rendered |

---

## Wat ging goed
- 1-op-1 visuele match tussen React en WordPress
- Alle interactieve elementen werken (menu, accordion, smooth scroll)
- Mobile-responsive op 3 breakpoints (mobile, 768px, 1024px)
- Content volledig beheerbaar zonder code aan te raken
- Schone, onderhoudbare codestructuur

## Aandachtspunten voor de toekomst
- SVG iconen staan hardcoded → bij wijzigingen moet je in de PHP bestanden duiken
- 96 customizer-velden is veel → overweeg ACF (Advanced Custom Fields) voor complexere content
- Geen WordPress block editor (Gutenberg) integratie → alleen Customizer
- Geen contact formulier of dynamische functionaliteit → alleen statische landing page
- WordPress lokale installatie staat in `wordpress-local/` (niet gecommit) en theme ook in `wordpress/talentix/` (wel gecommit)
