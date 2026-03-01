/**
 * Sync WordPress pages from the page registry.
 *
 * Creates missing WP pages with empty yww_page_content meta
 * and optional Yoast SEO defaults. Idempotent — safe to run repeatedly.
 *
 * Usage: node scripts/sync-wp-pages.mjs
 *
 * Env vars (same as seed-wordpress.mjs):
 *   WP_URL   – WordPress URL (default: http://localhost:8081)
 *   WP_USER  – Admin username (default: admin)
 *   WP_PASS  – Admin password (default: admin)
 */

import { WP_PAGES } from "../shared/page-registry.mjs";

const WP_URL = process.env.WP_URL || "http://localhost:8081";
const WP_USER = process.env.WP_USER || "admin";
const WP_PASS = process.env.WP_PASS || "admin";

const AUTH_HEADER =
  "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");

async function wpFetch(endpoint, options = {}) {
  const url = `${WP_URL}/wp-json/wp/v2/${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_HEADER,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP API error ${res.status} at ${endpoint}: ${text}`);
  }
  return res.json();
}

async function getExistingPages() {
  const pages = [];
  let page = 1;
  while (true) {
    const batch = await wpFetch(`pages?per_page=100&page=${page}&status=any`);
    pages.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return pages;
}

async function checkYoastActive() {
  try {
    const res = await fetch(`${WP_URL}/wp-json/yoast/v1/get_head?url=/`, {
      headers: { Authorization: AUTH_HEADER },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`\nSync WP pages from registry → ${WP_URL}\n`);

  // Verify connection
  try {
    const res = await fetch(`${WP_URL}/wp-json/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(`Connected to: ${data.name}\n`);
  } catch (err) {
    console.error(`Cannot connect to WordPress at ${WP_URL}: ${err.message}`);
    process.exit(1);
  }

  const existingPages = await getExistingPages();
  const existingSlugs = new Set(existingPages.map((p) => p.slug));
  const yoastActive = await checkYoastActive();

  if (yoastActive) {
    console.log("Yoast SEO detected — will set SEO defaults\n");
  }

  let created = 0;
  let skipped = 0;

  for (const entry of WP_PAGES) {
    if (existingSlugs.has(entry.wpSlug)) {
      console.log(`  · ${entry.wpSlug} — already exists, skipping`);
      skipped++;
      continue;
    }

    const body = {
      title: entry.wpTitle,
      slug: entry.wpSlug,
      status: "draft",
      meta: {
        yww_page_content: "{}",
      },
    };

    if (yoastActive) {
      body.meta.yoast_wpseo_title = entry.seoTitle;
      body.meta.yoast_wpseo_metadesc = entry.seoDescription;
    }

    try {
      const page = await wpFetch("pages", {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log(
        `  ✓ ${entry.wpSlug} — created (ID: ${page.id}, status: draft)`
      );
      created++;
    } catch (err) {
      console.error(`  ✗ ${entry.wpSlug} — failed: ${err.message}`);
    }
  }

  console.log(
    `\nDone: ${created} created, ${skipped} skipped (already existed)\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
