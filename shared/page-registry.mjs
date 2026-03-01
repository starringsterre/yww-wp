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
    seoTitle: "Young Wise Women – Persoonlijke groei voor jonge vrouwen",
    seoDescription:
      "Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft en groei met gelijkgestemde vrouwen.",
    sitemap: { priority: 1.0, changefreq: "weekly" },
  },
  {
    route: "/groepstrainingen",
    wpSlug: "groepstrainingen",
    wpTitle: "Groepstrainingen",
    seoTitle: "Groepstrainingen – Young Wise Women",
    seoDescription:
      "Ontdek onze groepstrainingen: weekendretraites en workshops voor persoonlijke ontwikkeling.",
    sitemap: { priority: 0.7, changefreq: "monthly" },
  },
  {
    route: "/groepstrainingen/ontwikkeling-workshops",
    wpSlug: "ontwikkeling-workshops",
    wpTitle: "Ontwikkeling Workshops",
    seoTitle: "Ontwikkeling Workshops – Young Wise Women",
    seoDescription:
      "Workshops gericht op persoonlijke en professionele ontwikkeling voor jonge vrouwen.",
    sitemap: { priority: 0.7, changefreq: "monthly" },
  },
  {
    route: "/persoonlijke-ontwikkeling-weekend-training",
    wpSlug: "persoonlijke-ontwikkeling-weekend-training",
    wpTitle: "Weekend Training",
    seoTitle: "Weekend Training Persoonlijke Ontwikkeling – Young Wise Women",
    seoDescription:
      "Intensieve weekendtraining voor persoonlijke groei, reflectie en verbinding met andere jonge vrouwen.",
    sitemap: { priority: 0.8, changefreq: "monthly" },
  },
  {
    route:
      "/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026",
    wpSlug: "weekend-intensive-juni-2026",
    wpTitle: "Weekend Intensive Juni 2026",
    seoTitle: "Weekend Intensive Juni 2026 – Young Wise Women",
    seoDescription:
      "Weekend intensive juni 2026: persoonlijke ontwikkeling training voor vrouwen.",
    sitemap: { priority: 0.8, changefreq: "weekly" },
  },
  {
    route: "/in-company",
    wpSlug: "in-company",
    wpTitle: "In-Company",
    seoTitle: "In-Company Trainingen – Young Wise Women",
    seoDescription:
      "Trainingen en programma's voor organisaties die investeren in de groei van jonge vrouwelijke professionals.",
    sitemap: { priority: 0.6, changefreq: "monthly" },
  },
  {
    route: "/in-company/jaarprogrammas",
    wpSlug: "jaarprogrammas",
    wpTitle: "Jaarprogramma's",
    seoTitle: "Jaarprogramma's – Young Wise Women",
    seoDescription:
      "Doorlopende jaarprogramma's voor organisaties: investeer structureel in de ontwikkeling van jonge vrouwen.",
    sitemap: { priority: 0.6, changefreq: "monthly" },
  },
  {
    route: "/in-company/losse-workshops",
    wpSlug: "losse-workshops",
    wpTitle: "Losse Workshops",
    seoTitle: "Losse Workshops – Young Wise Women",
    seoDescription:
      "Losse workshops voor teams en organisaties, op maat ingericht.",
    sitemap: { priority: 0.6, changefreq: "monthly" },
  },
  {
    route: "/inspiratie",
    wpSlug: "inspiratie",
    wpTitle: "Inspiratie",
    seoTitle: "Inspiratie – Young Wise Women",
    seoDescription:
      "Blogs, podcasts en evenementen vol inspiratie voor persoonlijke groei.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    route: "/inspiratie/evenementen",
    wpSlug: "evenementen",
    wpTitle: "Evenementen",
    seoTitle: "Evenementen – Young Wise Women",
    seoDescription:
      "Bekijk onze aankomende evenementen, terugkomdagen en workshops.",
    sitemap: { priority: 0.5, changefreq: "weekly" },
  },
  {
    route: "/inspiratie/blogs",
    wpSlug: null,
    wpTitle: "Blogs",
    seoTitle: "Blogs – Young Wise Women",
    seoDescription:
      "Artikelen over persoonlijke groei, leiderschap en het vinden van je eigen koers.",
    sitemap: { priority: 0.9, changefreq: "weekly" },
  },
  {
    route: "/inspiratie/podcasts",
    wpSlug: null,
    wpTitle: "Podcasts",
    seoTitle: "Podcasts – Young Wise Women",
    seoDescription:
      "Luister naar onze podcast: gesprekken over groei, kwetsbaarheid en ambitie.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    route: "/ons-verhaal",
    wpSlug: "ons-verhaal",
    wpTitle: "Ons Verhaal",
    seoTitle: "Ons Verhaal – Young Wise Women",
    seoDescription:
      "Leer het team achter Young Wise Women kennen en ontdek ons verhaal.",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },
  {
    route: "/lid-worden",
    wpSlug: "lid-worden",
    wpTitle: "Lid Worden",
    seoTitle: "Lid Worden – Young Wise Women",
    seoDescription:
      "Word lid van Young Wise Women en krijg toegang tot exclusieve content en evenementen.",
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
