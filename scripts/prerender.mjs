/**
 * Pre-renderer for SEO-critical pages.
 * Renders React SPA pages to static HTML using headless Chrome.
 *
 * Requires: puppeteer (devDependency)
 * Usage: PRERENDER_ENABLED=true node scripts/prerender.mjs
 *
 * This script:
 * 1. Starts a local HTTP server serving dist/spa/
 * 2. Opens each route in headless Chrome
 * 3. Waits for network idle (API calls complete)
 * 4. Saves rendered HTML as dist/spa/{route}/index.html
 * 5. Stops the server
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist", "spa");
const PORT = 4173;

async function main() {
  if (process.env.PRERENDER_ENABLED !== "true") {
    console.log("Pre-rendering disabled (set PRERENDER_ENABLED=true to enable).");
    return;
  }

  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error("puppeteer not installed. Run: npm install -D puppeteer");
    process.exit(1);
  }

  // Load routes config
  const routesPath = join(__dirname, "prerender-routes.json");
  let routes;
  try {
    routes = JSON.parse(readFileSync(routesPath, "utf-8"));
  } catch {
    console.error(`Cannot read ${routesPath}`);
    process.exit(1);
  }

  // Start a simple static file server
  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

    // SPA fallback: serve index.html for routes without file extension
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
      // SPA fallback
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

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.default.launch({ headless: true });

  for (const route of routes) {
    console.log(`Pre-rendering: ${route}`);
    const page = await browser.newPage();

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait a bit for React to finish rendering
      await page.waitForSelector("#root", { timeout: 10000 });

      const html = await page.content();

      // Determine output path
      const routePath = route === "/" ? "" : route;
      const outputDir = join(DIST_DIR, routePath);
      mkdirSync(outputDir, { recursive: true });
      writeFileSync(join(outputDir, "index.html"), html, "utf-8");
      console.log(`  ✓ Saved: ${routePath}/index.html`);
    } catch (err) {
      console.error(`  ✗ Failed: ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log("Pre-rendering complete.");
}

main().catch(console.error);
