/**
 * Sitemap generator for Young Wise Women.
 * Generates sitemap.xml with static routes and (optionally) dynamic blog slugs from WP API.
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://youngwisewomen.nl";
const WP_API_URL = process.env.VITE_WP_API_URL || "http://localhost:8081/wp-json";

const staticRoutes = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/inspiratie/blogs", priority: 0.9, changefreq: "weekly" },
  { path: "/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026", priority: 0.8, changefreq: "weekly" },
  { path: "/persoonlijke-ontwikkeling-weekend-training", priority: 0.8, changefreq: "monthly" },
  { path: "/groepstrainingen", priority: 0.7, changefreq: "monthly" },
  { path: "/groepstrainingen/ontwikkeling-workshops", priority: 0.7, changefreq: "monthly" },
  { path: "/in-company", priority: 0.6, changefreq: "monthly" },
  { path: "/in-company/jaarprogrammas", priority: 0.6, changefreq: "monthly" },
  { path: "/in-company/losse-workshops", priority: 0.6, changefreq: "monthly" },
  { path: "/inspiratie", priority: 0.5, changefreq: "monthly" },
  { path: "/inspiratie/evenementen", priority: 0.5, changefreq: "weekly" },
  { path: "/inspiratie/podcasts", priority: 0.5, changefreq: "monthly" },
  { path: "/ons-verhaal", priority: 0.5, changefreq: "monthly" },
  { path: "/lid-worden", priority: 0.5, changefreq: "monthly" },
];

async function fetchBlogSlugs() {
  try {
    const res = await fetch(`${WP_API_URL}/yww/v1/blogs`);
    if (!res.ok) return [];
    const blogs = await res.json();
    return blogs.map((b) => ({
      path: `/inspiratie/blogs/${b.id}`,
      priority: 0.8,
      changefreq: "monthly",
    }));
  } catch {
    console.log("WP API not available — skipping dynamic blog routes.");
    return [];
  }
}

function buildSitemapXml(routes) {
  const today = new Date().toISOString().split("T")[0];
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

async function main() {
  const blogRoutes = await fetchBlogSlugs();
  const allRoutes = [...staticRoutes, ...blogRoutes];
  const xml = buildSitemapXml(allRoutes);

  // Write to dist/spa/ (for production build)
  const distDir = join(__dirname, "..", "dist", "spa");
  try {
    mkdirSync(distDir, { recursive: true });
    writeFileSync(join(distDir, "sitemap.xml"), xml, "utf-8");
    console.log(`✓ sitemap.xml written to dist/spa/ (${allRoutes.length} URLs)`);
  } catch (err) {
    console.error("Failed to write to dist/spa/:", err.message);
  }

  // Also write to public/ as fallback
  const publicDir = join(__dirname, "..", "public");
  writeFileSync(join(publicDir, "sitemap.xml"), xml, "utf-8");
  console.log(`✓ sitemap.xml written to public/ (${allRoutes.length} URLs)`);
}

main().catch(console.error);
