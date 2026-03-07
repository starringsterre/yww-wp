/**
 * Pre-renderer for SEO-critical pages.
 * Renders React SPA pages to static HTML using headless Chrome.
 *
 * Routes are automatically sourced from shared/page-registry.mjs (single source of truth).
 * Dynamic blog routes are fetched from the WP API at build time.
 *
 * Usage: node scripts/prerender.mjs
 *        PRERENDER_ENABLED=false node scripts/prerender.mjs  (to skip)
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { PAGE_REGISTRY } from "../shared/page-registry.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist", "spa");
const PORT = 4173;
const WP_API_URL = process.env.VITE_WP_API_URL || "http://localhost:8081/wp-json";

async function fetchBlogRoutes() {
  try {
    const res = await fetch(`${WP_API_URL}/yww/v1/blogs`);
    if (!res.ok) return [];
    const blogs = await res.json();
    return blogs.map((b) => `/inspiratie/blogs/${b.id}`);
  } catch {
    console.log("WP API not available — skipping dynamic blog routes.");
    return [];
  }
}

async function main() {
  if (process.env.PRERENDER_ENABLED === "false") {
    console.log("Pre-rendering disabled (PRERENDER_ENABLED=false).");
    return;
  }

  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.log("⚠ puppeteer not available — skipping pre-rendering.");
    return;
  }

  const staticRoutes = PAGE_REGISTRY.map((p) => p.route);
  const blogRoutes = await fetchBlogRoutes();
  const routes = [...new Set([...staticRoutes, ...blogRoutes])];

  console.log(`Pre-rendering ${routes.length} pages...`);

  // Start a simple static file server
  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

    const ext = filePath.split(".").pop();
    if (!ext || ext === filePath.split("/").pop()) {
      filePath = join(DIST_DIR, "index.html");
    }

    try {
      const content = readFileSync(filePath);
      const mimeTypes = {
        html: "text/html",
        js: "application/javascript",
        css: "text/css",
        json: "application/json",
        png: "image/png",
        jpg: "image/jpeg",
        svg: "image/svg+xml",
        woff2: "font/woff2",
      };
      const fileExt = filePath.split(".").pop();
      res.writeHead(200, { "Content-Type": mimeTypes[fileExt] || "application/octet-stream" });
      res.end(content);
    } catch {
      try {
        const indexContent = readFileSync(join(DIST_DIR, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexContent);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", resolve);
  });
  console.log(`Static server running on http://localhost:${PORT}`);

  let browser;

  try {
    browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }).catch((err) => {
      console.log(`⚠ Chrome not available — skipping pre-rendering. (${err.message})`);
      server.close();
      return null;
    });
    if (!browser) return;

    let ok = 0;
    let fail = 0;

    for (const route of routes) {
      console.log(`Pre-rendering: ${route}`);
      const page = await browser.newPage();

      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        await page.waitForSelector("#root", { timeout: 10000 });

        const html = await page.content();

        const routePath = route === "/" ? "" : route;
        const outputDir = join(DIST_DIR, routePath);
        mkdirSync(outputDir, { recursive: true });
        writeFileSync(join(outputDir, "index.html"), html, "utf-8");
        console.log(`  ✓ ${routePath}/index.html`);
        ok++;
      } catch (err) {
        console.error(`  ✗ Failed: ${route} — ${err.message}`);
        fail++;
      } finally {
        await page.close();
      }
    }

    console.log(`\nPre-rendering complete: ${ok} ok, ${fail} failed.`);
  } finally {
    if (browser) {
      await browser.close();
    }
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
