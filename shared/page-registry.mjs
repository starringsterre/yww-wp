/**
 * Single source of truth for all YWW pages.
 *
 * Used by:
 * - scripts/sync-wp-pages.mjs  → creates missing WP pages
 * - scripts/generate-sitemap.mjs → generates sitemap.xml
 *
 * Fields:
 *   route          – React Router path
 *   wpSlug         – WordPress page slug (null = skip WP sync, e.g. dynamic routes)
 *   wpTitle        – Title shown in wp-admin
 *   seoTitle       – Default Yoast SEO title
 *   seoDescription – Default Yoast meta description
 *   sitemap        – { priority, changefreq } or null to exclude from sitemap
 */

export const PAGE_REGISTRY = [
  {
    route: "/",
    wpSlug: "home",
    wpTitle: "Home",
    seoTitle: "Young Wise Women | Begrijpen, Binden en Behouden van Jong Talent",
    seoDescription:
      "Young Wise Women helpt organisaties jong vrouwelijk talent (de next generation) te begrijpen, ontwikkelen en behouden, met workshops en Business Retreats.",
    sitemap: { priority: 1.0, changefreq: "weekly" },
  },
  {
    route: "/aanbod/workshops",
    wpSlug: "in-company",
    wpTitle: "Workshops",
    seoTitle: "Workshops | Young Wise Women",
    seoDescription:
      "Talentontwikkeling voor jong vrouwelijk talent via workshops. Young Wise Women helpt organisaties de next generation begrijpen, ontwikkelen en behouden.",
    sitemap: { priority: 0.9, changefreq: "monthly" },
  },
  {
    route: "/aanbod/workshops/jaarprogramma",
    wpSlug: "jaarprogrammas",
    wpTitle: "Jaarprogramma",
    seoTitle: "Jaarprogramma voor Organisaties | Young Wise Women",
    seoDescription:
      "12 maanden persoonlijk leiderschap voor jonge vrouwelijke professionals. Jaarprogramma met coaching, groepssessies, workshops en weekend retreat.",
    sitemap: { priority: 0.8, changefreq: "monthly" },
  },
  {
    route: "/pilot-programma",
    wpSlug: "pilot-programma",
    wpTitle: "Pilot Programma",
    seoTitle: "Pilot Programma | Young Wise Women",
    seoDescription:
      "In 6 maanden ervaart uw organisatie de impact van persoonlijk leiderschap bij jonge professionals. Laagdrempelig, meetbaar en zonder langetermijnverplichting.",
    sitemap: null,
  },
  {
    route: "/voor-consultancy",
    wpSlug: "voor-consultancy",
    wpTitle: "Voor Consultancy",
    seoTitle: "Talentontwikkeling voor consultancy | Young Wise Women",
    seoDescription:
      "Behoud jong vrouwelijk talent in consultancy, finance en legal. Workshops, Business Retreats en een introductieworkshop tegen prestatiedruk en vroege uitval.",
    sitemap: { priority: 0.7, changefreq: "monthly" },
  },
  {
    route: "/aanbod/business-retreats",
    wpSlug: "business-retreats",
    wpTitle: "Business Retreats",
    seoTitle: "Business Retreats | Young Wise Women",
    seoDescription:
      "Talentontwikkeling voor jong vrouwelijk talent via business retreats. Young Wise Women helpt organisaties de next gen begrijpen, ontwikkelen en behouden.",
    sitemap: { priority: 0.8, changefreq: "monthly" },
  },
  {
    route:
      "/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026",
    wpSlug: "weekend-intensive-juni-2026",
    wpTitle: "Weekend Retreat Juni 2026",
    seoTitle: "Weekend Retreat Juni 2026 | Young Wise Women",
    seoDescription:
      "Weekend retreat juni 2026: persoonlijk leiderschap voor jonge vrouwelijke professionals.",
    sitemap: { priority: 0.8, changefreq: "weekly" },
  },
  {
    route:
      "/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-oktober-2026",
    wpSlug: "weekend-intensive-oktober-2026",
    wpTitle: "Weekend Retreat Oktober 2026",
    seoTitle: "Weekend Retreat Oktober 2026 | Young Wise Women",
    seoDescription:
      "Weekend retreat oktober 2026: persoonlijk leiderschap voor jonge vrouwelijke professionals.",
    sitemap: { priority: 0.8, changefreq: "weekly" },
  },
  {
    route: "/introductie-workshop-persoonlijk-leiderschap-april-2026",
    wpSlug: "introductie-workshop-april-2026",
    wpTitle: "Introductie Workshop April 2026",
    seoTitle: "Introductie Workshop Persoonlijk Leiderschap | Young Wise Women",
    seoDescription:
      "Introductie workshop persoonlijk leiderschap op 10 april 2026 voor jonge vrouwelijke professionals.",
    sitemap: { priority: 0.7, changefreq: "weekly" },
  },
  {
    route: "/onze-aanpak",
    wpSlug: "onze-aanpak",
    wpTitle: "Onze Aanpak",
    seoTitle: "Onze Aanpak | Young Wise Women",
    seoDescription:
      "Het Leadership Reset Framework, een bewezen methode die reflectie, verbinding en praktische toepassing combineert voor persoonlijk leiderschap.",
    sitemap: { priority: 0.7, changefreq: "monthly" },
  },
  {
    route: "/inspiratie",
    wpSlug: "inspiratie",
    wpTitle: "Inspiratie",
    seoTitle: "Inspiratie | Young Wise Women",
    seoDescription:
      "Inzichten, verhalen en gesprekken over persoonlijk leiderschap in je eerste werkjaren.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    route: "/inspiratie/tools-en-handvatten",
    wpSlug: "tools-en-handvatten",
    wpTitle: "Tools en Handvatten",
    seoTitle: "Tools & Handvatten: blogs en artikelen | Young Wise Women",
    seoDescription:
      "Praktische blogs en artikelen over persoonlijk leiderschap, motivatie en groei voor jonge vrouwelijke professionals in hun eerste werkjaren.",
    sitemap: { priority: 0.9, changefreq: "weekly" },
  },
  {
    route: "/inspiratie/tools-en-handvatten/:slug",
    wpSlug: null,
    wpTitle: null,
    seoTitle: null,
    seoDescription: null,
    sitemap: null,
  },
  {
    route: "/inspiratie/podcasts",
    wpSlug: "podcasts",
    wpTitle: "Podcasts",
    seoTitle: "Podcast | Young Wise Women",
    seoDescription:
      "Luister naar onze podcast: gesprekken over persoonlijk leiderschap en groei.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    // Evenementen/kalender. wpSlug null: geen aparte WP-pagina nodig
    // (events komen uit de events-CPT), maar wel prerenderen + in sitemap
    // zodat de agenda crawlbaar is. /kalender 301-redirect wijst hierheen.
    route: "/inspiratie/evenementen",
    wpSlug: null,
    wpTitle: null,
    seoTitle: "Evenementen Kalender | Young Wise Women",
    seoDescription:
      "Bekijk de agenda met workshops, Business Retreats en evenementen van Young Wise Women.",
    sitemap: { priority: 0.5, changefreq: "weekly" },
  },
  {
    route: "/ons-verhaal",
    wpSlug: "ons-verhaal",
    wpTitle: "Ons Verhaal",
    seoTitle: "Ons Verhaal | Young Wise Women",
    seoDescription:
      "Leer het team achter Young Wise Women kennen en ontdek ons verhaal.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    route: "/ons-verhaal/over-ella",
    wpSlug: "over-ella",
    wpTitle: "Over Ella",
    seoTitle: "Over Ella | Young Wise Women",
    seoDescription:
      "Leer Ella kennen, de drijvende kracht achter Young Wise Women met 25+ jaar coaching-ervaring.",
    sitemap: { priority: 0.4, changefreq: "monthly" },
  },
  {
    route: "/contact",
    wpSlug: "contact",
    wpTitle: "Contact",
    seoTitle: "Contact | Young Wise Women",
    seoDescription:
      "Neem contact op met Young Wise Women. Plan een vrijblijvende kennismaking of stel je vraag.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    route: "/lid-worden",
    wpSlug: "lid-worden",
    wpTitle: "Lid Worden",
    seoTitle: "Netwerk | Young Wise Women",
    seoDescription:
      "Word lid van het Young Wise Women Netwerk. Ontmoet gelijkgestemde vrouwen, bezoek events en groei samen verder.",
    sitemap: { priority: 0.3, changefreq: "monthly" },
  },
  {
    route: "/ons-verhaal/het-team",
    wpSlug: "het-team",
    wpTitle: "Het Team",
    seoTitle: "Het Team | Young Wise Women",
    seoDescription:
      "Maak kennis met het team van Young Wise Women: coaches van Generatie X en Generatie Z die samen persoonlijke groei en leiderschap begeleiden.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
];

/** Pages that need a WordPress page (wpSlug !== null) */
export const WP_PAGES = PAGE_REGISTRY.filter((p) => p.wpSlug !== null);

/** Sitemap routes in the format generate-sitemap.mjs expects */
export const SITEMAP_ROUTES = PAGE_REGISTRY.filter(
  (p) => p.sitemap !== null
).map((p) => ({
  path: p.route,
  priority: p.sitemap.priority,
  changefreq: p.sitemap.changefreq,
}));
