# Tijdelijk verborgen features

Deze features zijn klaar maar nog niet ingeschakeld voor productie. Componentbestanden en API-routes zijn intact gelaten.

---

## VraagbaakWidget (chatbot)

**Componentbestand:** `client/components/VraagbaakWidget.tsx`
**API routes:** `api/vraagbaak/`, `server/routes/vraagbaak.ts`

### Terugplaatsen in `client/components/Layout.tsx`

1. Voeg import toe (bovenaan, bij de andere component-imports):
   ```tsx
   import VraagbaakWidget from "@/components/VraagbaakWidget";
   ```

2. Voeg JSX toe vlak voor het sluitende `</div>` onderaan de return (na `<CookieConsentBanner />`):
   ```tsx
   <VraagbaakWidget />
   ```

---

## GroeiScanSection

**Componentbestand:** `client/components/GroeiScanSection.tsx`
**API routes:** `api/groeiscan/`, `server/routes/groeiscan.ts`

### Terugplaatsen in `client/pages/Home.tsx`

1. Voeg import toe (bovenaan, bij de andere component-imports):
   ```tsx
   import GroeiScanSection from "@/components/GroeiScanSection";
   ```

2. Voeg JSX toe tussen de testimonials-sectie en de coaches-sectie (na `</section>` van de hero-blok, vóór `<RetreatTestimonialsSection />`):
   ```tsx
   {cms?.show_groeiscan !== "false" && <GroeiScanSection />}
   ```
