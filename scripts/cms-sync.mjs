/**
 * cms-sync.mjs
 *
 * Scans TSX page files for CMS field usage (cms?.fieldname patterns),
 * detects new fields/pages vs what's already defined in yww-admin-ui.php,
 * and optionally:
 *   - Updates yww-admin-ui.php with new field definitions
 *   - Updates shared/page-registry.mjs with new pages from @cms-page annotations
 *   - Updates client/App.tsx with new routes
 *   - Updates client/components/Layout.tsx with new nav items
 *   - Seeds WordPress (creates pages + populates yww_page_content with placeholders)
 *
 * Usage:
 *   npm run cms:sync                     # Dry-run against local WP (:8081)
 *   npm run cms:sync -- --write          # Write local files + seed local WP
 *
 * Env vars:
 *   WP_URL   – WordPress URL (default: http://localhost:8081)
 *   WP_USER  – Admin username (default: admin)
 *   WP_PASS  – Admin password (default: admin)
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dir = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dir, "..");

const WRITE_MODE = process.argv.includes("--write");
const RESEED_MODE = process.argv.includes("--reseed");

const WP_URL = process.env.WP_URL || "http://localhost:8081";
const WP_USER = process.env.WP_USER || "admin";
const WP_PASS = process.env.WP_PASS || "admin";
const AUTH_HEADER =
  "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");

// ─────────────────────────────────────────────
// FILE PATHS
// ─────────────────────────────────────────────

const ADMIN_UI_PHP = join(
  ROOT,
  "wordpress/wp-content/mu-plugins/yww-admin-ui.php"
);
const PAGE_REGISTRY = join(ROOT, "shared/page-registry.mjs");
const APP_TSX = join(ROOT, "client/App.tsx");
const LAYOUT_TSX = join(ROOT, "client/components/Layout.tsx");
const PAGES_DIR = join(ROOT, "client/pages");

// ─────────────────────────────────────────────
// TYPE INFERENCE
// ─────────────────────────────────────────────

const IMAGE_SUFFIXES = [
  "_image",
  "_video",
  "_url",
  "_photo",
  "_foto",
  "_src",
  "_thumbnail",
];
const TEXTAREA_SUFFIXES = [
  "_text",
  "_tekst",
  "_content",
  "_description",
  "_quote",
  "_bio",
  "_intro",
  "_note",
  "_items",
  "_summary",
];

function inferFieldType(fieldName) {
  const lower = fieldName.toLowerCase();
  if (IMAGE_SUFFIXES.some((s) => lower.endsWith(s))) return "image";
  if (TEXTAREA_SUFFIXES.some((s) => lower.endsWith(s))) return "textarea";
  return "text";
}

// ─────────────────────────────────────────────
// LABEL GENERATION
// ─────────────────────────────────────────────

const DUTCH_WORDS = {
  title: "Titel",
  subtitle: "Subtitel",
  heading: "Heading",
  text: "Tekst",
  image: "Foto",
  video: "Video",
  url: "URL",
  photo: "Foto",
  foto: "Foto",
  src: "URL",
  thumbnail: "Thumbnail",
  description: "Beschrijving",
  intro: "Introductie",
  content: "Inhoud",
  quote: "Quote",
  bio: "Bio",
  note: "Opmerking",
  items: "Items",
  summary: "Samenvatting",
  cta: "CTA",
};

function generateLabel(fieldName) {
  return fieldName
    .split("_")
    .map((part) => {
      const lower = part.toLowerCase();
      if (DUTCH_WORDS[lower]) return DUTCH_WORDS[lower];
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

// ─────────────────────────────────────────────
// SECTION GENERATION
// ─────────────────────────────────────────────

const SECTION_MAP = {
  hero: "Hero Sectie",
  atmosphere: "Sfeer Sectie",
  intro: "Introductie",
  benefits: "Voordelen",
  benefit: "Voordelen",
  trainingen: "Trainingen",
  coaches: "Coaches",
  next_retreat: "Volgende Weekend",
  investment: "Investering",
  results: "Resultaten",
  bedrijf: "Bedrijfstrajecten",
  pillars: "Drie Pijlers",
  gallery: "Foto Galerij",
  for_whom: "Voor Wie",
  edition: "Volgende Editie",
  program: "Programma",
  day: "Programma",
  location: "Locatie",
  transform: "Transformatie",
  goodbye: "Transformatie",
  takeaway: "Transformatie",
  nextstep: "Transformatie",
  breathwork: "Breathwork",
  yoga: "Yoga",
  highlight: "Weekend Training Highlight",
  when: "Praktisch",
  where: "Praktisch",
  group: "Praktisch",
  rooms: "Praktisch",
  additional: "Praktisch",
  video: "Video",
  about: "Over",
  included: "Inbegrepen",
  caption: "Foto Captions",
  book: "Boek Sectie",
  faq: "FAQ",
  availability: "Beschikbaarheid",
  package: "Pakketten",
  form: "Formulier",
  success: "Succes Bericht",
  sidebar: "Sidebar",
  related: "Gerelateerd",
  brands: "Brands",
  section: "Sectie",
  cta: "CTA",
  card: "Kaarten",
  phases: "Fases",
  phase: "Fases",
};

function getSectionName(fieldName) {
  const parts = fieldName.split("_");
  // Try prefix (first part)
  const prefix = parts[0];
  if (SECTION_MAP[prefix]) return SECTION_MAP[prefix];
  // Try two-word prefix
  if (parts.length > 1) {
    const twoPrefix = parts[0] + "_" + parts[1];
    if (SECTION_MAP[twoPrefix]) return SECTION_MAP[twoPrefix];
  }
  return prefix.charAt(0).toUpperCase() + prefix.slice(1) + " Sectie";
}

// ─────────────────────────────────────────────
// TSX PARSING
// ─────────────────────────────────────────────

/**
 * Scan all TSX page files and return:
 *  - pageFields: Map<slug, Set<fieldName>>
 *  - newPageAnnotations: Array<{slug, route, title, menuParent, menuLabel, filePath, componentName}>
 *  - fieldDefaults: Map<slug, Map<fieldName, defaultValue>>
 */
function parseTsxFiles() {
  const pageFields = new Map();
  const newPageAnnotations = [];
  const fieldDefaults = new Map(); // Map<slug, Map<fieldName, defaultValue>>

  const files = readdirSync(PAGES_DIR).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    const filePath = join(PAGES_DIR, file);
    const content = readFileSync(filePath, "utf8");

    // Check for @cms-page annotation
    const annotationMatch = content.match(
      /\/\/\s*@cms-page\s+(slug="[^"]*"[^\n]*)/
    );
    if (annotationMatch) {
      const attrStr = annotationMatch[1];
      const slug = (attrStr.match(/slug="([^"]*)"/) || [])[1];
      const route = (attrStr.match(/route="([^"]*)"/) || [])[1];
      const title = (attrStr.match(/title="([^"]*)"/) || [])[1];
      const menuParent = (attrStr.match(/menuParent="([^"]*)"/) || [])[1];
      const menuLabel = (attrStr.match(/menuLabel="([^"]*)"/) || [])[1];

      if (slug && route && title) {
        const componentName = file.replace(".tsx", "");
        newPageAnnotations.push({
          slug,
          route,
          title,
          menuParent,
          menuLabel,
          filePath,
          componentName,
        });
      }
    }

    // Find usePageContent calls to get the slug for this file
    const slugMatches = [
      ...content.matchAll(/usePageContent\(\s*["']([^"']+)["']\s*\)/g),
    ];
    for (const match of slugMatches) {
      const slug = match[1];

      // ─── Step A: Extract variable declarations ───
      const variables = new Map(); // varName → value
      // Template literals: const varName = `...`;
      for (const m of content.matchAll(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*`([\s\S]*?)`\s*;/g)) {
        variables.set(m[1], m[2]);
      }
      // String literals: const varName = "...";
      for (const m of content.matchAll(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*"([^"]*)"\s*;/g)) {
        if (!variables.has(m[1])) variables.set(m[1], m[2]);
      }

      // ─── Step B: Extract || fallback defaults ───
      const slugDefaults = fieldDefaults.get(slug) || new Map();

      // String literal: cms?.hero_title || "Over Ella"
      for (const m of content.matchAll(/cms\?\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\|\|\s*"([^"]*)"/g)) {
        slugDefaults.set(m[1], m[2]);
      }
      // Template literal inline: cms?.bio_text || `...`
      for (const m of content.matchAll(/cms\?\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\|\|\s*`([^`]*)`/g)) {
        slugDefaults.set(m[1], m[2]);
      }
      // Variable reference: cms?.bio_text || defaultBio
      for (const m of content.matchAll(/cms\?\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\|\|\s*([a-zA-Z_][a-zA-Z0-9_]*)\b/g)) {
        const varName = m[2];
        if (variables.has(varName)) {
          slugDefaults.set(m[1], variables.get(varName));
        }
      }

      if (slugDefaults.size > 0) {
        fieldDefaults.set(slug, slugDefaults);
      }

      // Find all cms?.fieldname usages (field names can contain digits)
      const fieldMatches = [...content.matchAll(/cms\?\.([a-zA-Z_][a-zA-Z0-9_]*)/g)];
      if (fieldMatches.length > 0) {
        if (!pageFields.has(slug)) {
          pageFields.set(slug, new Set());
        }
        for (const fm of fieldMatches) {
          pageFields.get(slug).add(fm[1]);
        }
      }
    }
  }

  return { pageFields, newPageAnnotations, fieldDefaults };
}

// ─────────────────────────────────────────────
// PHP PARSING
// ─────────────────────────────────────────────

/**
 * Parse yww-admin-ui.php to extract existing field keys per slug.
 * Uses indentation to distinguish slug-level (8 spaces) vs field-level (12 spaces) entries.
 * Returns Map<slug, Set<fieldName>>
 */
function parseExistingPhpFields() {
  const content = readFileSync(ADMIN_UI_PHP, "utf8");
  const existingFields = new Map();

  // Slug entries are indented with exactly 8 spaces inside $pages = [...]
  // e.g.:  '        'home' => ['
  const slugPattern = /^        '([a-z0-9][a-z0-9-]*)'\s*=>\s*\[/gm;
  const slugMatches = [...content.matchAll(slugPattern)];

  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1];
    const start = slugMatches[i].index + slugMatches[i][0].length;
    const end =
      i + 1 < slugMatches.length
        ? slugMatches[i + 1].index
        : content.length;

    const slugBlock = content.substring(start, end);

    // Field entries are indented with exactly 12 spaces
    // e.g.: '            'hero_title'           => ['label' => ...],'
    const fieldPattern = /^            '([a-zA-Z_][a-zA-Z0-9_]*)'\s*=>/gm;
    const fieldMatches = [...slugBlock.matchAll(fieldPattern)];

    const fields = new Set(fieldMatches.map((m) => m[1]));
    existingFields.set(slug, fields);
  }

  return existingFields;
}

// ─────────────────────────────────────────────
// PAGE REGISTRY PARSING
// ─────────────────────────────────────────────

function parseExistingRegistrySlugs() {
  const content = readFileSync(PAGE_REGISTRY, "utf8");
  const slugs = new Set();
  for (const match of content.matchAll(/wpSlug:\s*["']([^"']+)["']/g)) {
    slugs.add(match[1]);
  }
  return slugs;
}

function parseExistingRoutes() {
  const content = readFileSync(APP_TSX, "utf8");
  const routes = new Set();
  for (const match of content.matchAll(/path=["']([^"']+)["']/g)) {
    routes.add(match[1]);
  }
  return routes;
}

// ─────────────────────────────────────────────
// PHP FILE UPDATING
// ─────────────────────────────────────────────

/**
 * Generate PHP field entry code.
 * Returns the PHP line(s) to add for a new field.
 */
function generatePhpFieldEntry(fieldName, type, label, addSection, sectionName) {
  const typeStr = type !== "text" ? `, 'type' => '${type}'` : "";
  const sectionStr = addSection ? `, 'section' => '${sectionName}'` : "";
  const pad = "            ";
  return `${pad}'${fieldName}'${" ".repeat(Math.max(1, 30 - fieldName.length))}=> ['label' => '${label}'${sectionStr}${typeStr}],\n`;
}

/**
 * Update yww-admin-ui.php to add new fields for a given slug.
 * If slug doesn't exist in PHP, adds a new page entry.
 */
function updatePhpFile(slug, newFields) {
  let content = readFileSync(ADMIN_UI_PHP, "utf8");

  if (newFields.length === 0) return;

  // Group new fields by section prefix to minimize section headers
  // Track which sections already exist for this slug
  const sectionsSeen = new Map(); // prefix → sectionName
  const phpLines = [];

  let lastSection = null;
  for (const fieldName of newFields) {
    const type = inferFieldType(fieldName);
    const label = generateLabel(fieldName);
    const prefix = fieldName.split("_")[0];
    const sectionName = getSectionName(fieldName);
    const isNewSection = !sectionsSeen.has(prefix);
    if (isNewSection) sectionsSeen.set(prefix, sectionName);
    const addSection = isNewSection && sectionName !== lastSection;
    if (addSection) lastSection = sectionName;
    phpLines.push(generatePhpFieldEntry(fieldName, type, label, addSection, sectionName));
  }

  const addedCode = phpLines.join("");

  // Check if slug already exists in PHP
  const slugPattern = new RegExp(`'${slug}'\\s*=>\\s*\\[`);
  if (slugPattern.test(content)) {
    // Find the closing of this slug's array and insert before it
    // Strategy: find the slug opening, then find its matching '],
    const slugIdx = content.search(slugPattern);
    if (slugIdx === -1) return;

    // Find the slug's block end (the '], that closes it)
    // We need to find the matching closing bracket
    let depth = 0;
    let i = content.indexOf("[", slugIdx + content.substring(slugIdx).search(/\[/));
    let blockEnd = -1;

    for (; i < content.length; i++) {
      if (content[i] === "[") depth++;
      else if (content[i] === "]") {
        depth--;
        if (depth === 0) {
          blockEnd = i;
          break;
        }
      }
    }

    if (blockEnd === -1) {
      console.error(`  ✗ Could not find end of '${slug}' block in PHP`);
      return;
    }

    // Insert new fields just before the closing ]
    content =
      content.substring(0, blockEnd) +
      addedCode +
      "        " + // closing bracket indentation
      content.substring(blockEnd);
  } else {
    // Add new page entry before the final return statement
    const insertPoint = content.lastIndexOf(
      "    return isset($pages[$slug]) ? $pages[$slug] : [];"
    );
    if (insertPoint === -1) {
      console.error("  ✗ Could not find insertion point in PHP file");
      return;
    }

    // Build new page block
    const newPageBlock =
      `        '${slug}' => [\n` + addedCode + `        ],\n`;

    // Find the line that closes the $pages array: "\n    ];"
    // We search backwards from the return statement to find "    ];"
    const pagesEndMarker = "\n    ];";
    const pagesEndIdx = content.lastIndexOf(pagesEndMarker, insertPoint);
    if (pagesEndIdx === -1) {
      console.error("  ✗ Could not find $pages array end in PHP file");
      return;
    }

    // Insert the new block AFTER the "\n" but BEFORE "    ];"
    // so that the closing "    ];" keeps its own indentation.
    const insertAt = pagesEndIdx + 1; // right after the \n, before "    ];"
    content =
      content.substring(0, insertAt) +
      newPageBlock +
      content.substring(insertAt);
  }

  writeFileSync(ADMIN_UI_PHP, content, "utf8");
  console.log(
    `  ✓ PHP updated for slug '${slug}': added ${newFields.length} field(s)`
  );
}

// ─────────────────────────────────────────────
// PAGE REGISTRY UPDATING
// ─────────────────────────────────────────────

function updatePageRegistry(newPages) {
  let content = readFileSync(PAGE_REGISTRY, "utf8");

  for (const page of newPages) {
    // Build new registry entry
    const entry = `  {
    route: "${page.route}",
    wpSlug: "${page.slug}",
    wpTitle: "${page.title}",
    seoTitle: "${page.title} – Young Wise Women",
    seoDescription: "",
    sitemap: { priority: 0.5, changefreq: "monthly" },
  },\n`;

    // Insert before the closing ];
    const insertPoint = content.lastIndexOf("];");
    content = content.substring(0, insertPoint) + entry + content.substring(insertPoint);
  }

  writeFileSync(PAGE_REGISTRY, content, "utf8");
  console.log(`  ✓ page-registry.mjs updated: added ${newPages.length} page(s)`);
}

// ─────────────────────────────────────────────
// APP.TSX UPDATING
// ─────────────────────────────────────────────

function updateAppTsx(newPages) {
  let content = readFileSync(APP_TSX, "utf8");

  for (const page of newPages) {
    const { componentName, route } = page;

    // Add import if not already present
    const importLine = `import ${componentName} from "./pages/${componentName}";`;
    if (!content.includes(importLine)) {
      // Insert before the NotFound import
      content = content.replace(
        'import NotFound from "./pages/NotFound";',
        `${importLine}\nimport NotFound from "./pages/NotFound";`
      );
    }

    // Add route if not already present
    const routeEntry = `            <Route path="${route}" element={<${componentName} />} />`;
    if (!content.includes(`path="${route}"`)) {
      // Insert before the catch-all comment
      content = content.replace(
        "            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL",
        `${routeEntry}\n            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL`
      );
    }
  }

  writeFileSync(APP_TSX, content, "utf8");
  console.log(`  ✓ App.tsx updated: added ${newPages.length} route(s)`);
}

// ─────────────────────────────────────────────
// LAYOUT.TSX UPDATING
// ─────────────────────────────────────────────

function updateLayoutTsx(newPages) {
  let content = readFileSync(LAYOUT_TSX, "utf8");
  let changed = false;

  for (const page of newPages) {
    const { route, menuLabel, menuParent } = page;
    if (!menuLabel) continue;

    // Find if this is a child of an existing nav item
    if (menuParent) {
      // Find the parent navItem by label and add child
      const parentEscaped = menuParent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const parentMatch = content.match(
        new RegExp(`(label:\\s*"${parentEscaped}"[\\s\\S]*?children:\\s*\\[)([\\s\\S]*?)(\\]\\s*,)`)
      );
      if (parentMatch) {
        const childEntry = `\n      { href: "${route}", label: "${menuLabel}" },`;
        const insertPos = content.indexOf(parentMatch[0]);
        if (insertPos !== -1) {
          const oldBlock = parentMatch[0];
          const newBlock =
            parentMatch[1] +
            parentMatch[2] +
            childEntry +
            "\n    " +
            parentMatch[3];
          content = content.replace(oldBlock, newBlock);
          changed = true;
        }
      } else {
        // Parent not found, add as top-level item
        const entry = `  { href: "${route}", label: "${menuLabel}" },\n`;
        content = content.replace(
          "  { href: \"/ons-verhaal\", label: \"Ons Verhaal\" },\n];",
          `  { href: "/ons-verhaal", label: "Ons Verhaal" },\n${entry}];`
        );
        changed = true;
      }
    } else {
      // Add as top-level nav item
      const entry = `  { href: "${route}", label: "${menuLabel}" },\n`;
      if (!content.includes(`href: "${route}"`)) {
        content = content.replace(
          "  { href: \"/ons-verhaal\", label: \"Ons Verhaal\" },\n];",
          `  { href: "/ons-verhaal", label: "Ons Verhaal" },\n${entry}];`
        );
        changed = true;
      }
    }
  }

  if (changed) {
    writeFileSync(LAYOUT_TSX, content, "utf8");
    console.log(`  ✓ Layout.tsx updated with new nav item(s)`);
  }
}

// ─────────────────────────────────────────────
// WORDPRESS API
// ─────────────────────────────────────────────

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

async function getExistingWpPages() {
  const pages = [];
  for (const status of ["publish", "draft"]) {
    let page = 1;
    while (true) {
      const batch = await wpFetch(`pages?per_page=100&page=${page}&status=${status}`);
      pages.push(...batch);
      if (batch.length < 100) break;
      page++;
    }
  }
  return pages;
}

/**
 * Seed WordPress:
 * - Create missing pages from new page annotations
 * - Update yww_page_content with real defaults (from TSX fallbacks) or placeholder values for new fields
 * - With --reseed flag: also update existing placeholder values ([...]) with real defaults
 */
async function seedWordPress(newPageAnnotations, newFieldsMap, allPhpFields, fieldDefaults) {
  console.log(`\nSeeding WordPress at ${WP_URL}...`);

  // Verify connection
  try {
    const res = await fetch(`${WP_URL}/wp-json/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(`  Connected to: ${data.name}`);
  } catch (err) {
    console.error(`  ✗ Cannot connect to WordPress: ${err.message}`);
    return;
  }

  const existingPages = await getExistingWpPages();
  const pageBySlug = new Map(existingPages.map((p) => [p.slug, p]));

  // 1. Create new WP pages from @cms-page annotations
  for (const page of newPageAnnotations) {
    if (!pageBySlug.has(page.slug)) {
      try {
        const created = await wpFetch("pages", {
          method: "POST",
          body: JSON.stringify({
            title: page.title,
            slug: page.slug,
            status: "publish",
            meta: { yww_page_content: "{}" },
          }),
        });
        pageBySlug.set(page.slug, created);
        console.log(`  ✓ Created WP page '${page.slug}' (ID: ${created.id})`);
      } catch (err) {
        console.error(`  ✗ Failed to create WP page '${page.slug}': ${err.message}`);
      }
    }
  }

  // 2. Seed any WP page that has empty yww_page_content with all known fields
  const aliases = {
    retreats: "groepstrainingen",
    weekenden: "persoonlijke-ontwikkeling-weekend-training",
    "weekend-intensive": "weekend-intensive-juni-2026",
    workshops: "ontwikkeling-workshops",
    "voor-organisaties": "in-company",
    kalender: "evenementen",
  };
  for (const [phpSlug, fields] of (allPhpFields || new Map())) {
    if (fields.size === 0) continue;
    const wpSlug = aliases[phpSlug] || phpSlug;
    const wpPage = pageBySlug.get(wpSlug) || pageBySlug.get(phpSlug);
    if (!wpPage) continue;

    let currentContent = {};
    try {
      const pageData = await wpFetch(`pages/${wpPage.id}?context=edit`);
      const json = pageData.meta?.yww_page_content;
      if (json) currentContent = JSON.parse(json);
    } catch {
      // ignore parse errors
    }

    const hasContent = Object.keys(currentContent).length > 0;

    // In reseed mode: also process pages that still have placeholder values
    if (hasContent && RESEED_MODE) {
      const hasPlaceholders = Object.values(currentContent).some(
        (v) => typeof v === "string" && /^\[.+\]$/.test(v)
      );
      if (!hasPlaceholders) continue; // Has real content, nothing to fix
    } else if (hasContent) {
      continue; // Normal mode: skip pages that already have content
    }

    let seededCount = 0;
    for (const fieldName of fields) {
      const currentValue = currentContent[fieldName];
      const isPlaceholder =
        currentValue === undefined ||
        currentValue === "" ||
        (typeof currentValue === "string" && /^\[.+\]$/.test(currentValue));

      // In reseed mode with existing content: only update placeholder values
      if (hasContent && RESEED_MODE && !isPlaceholder) continue;

      const defaultValue = fieldDefaults?.get(phpSlug)?.get(fieldName);
      const type = inferFieldType(fieldName);
      currentContent[fieldName] =
        defaultValue !== undefined
          ? defaultValue
          : type === "textarea"
          ? `[${generateLabel(fieldName)} tekst hier invullen]`
          : type === "image"
          ? ""
          : `[${generateLabel(fieldName)}]`;
      seededCount++;
    }

    if (seededCount === 0) continue;

    try {
      await wpFetch(`pages/${wpPage.id}`, {
        method: "POST",
        body: JSON.stringify({
          meta: { yww_page_content: JSON.stringify(currentContent) },
        }),
      });
      console.log(`  ✓ Seeded ${seededCount} field(s) in WP page '${wpSlug}'`);
    } catch (err) {
      console.error(`  ✗ Failed to seed fields for '${wpSlug}': ${err.message}`);
    }
  }

  // 3. Seed new fields with placeholder values
  for (const [slug, fields] of newFieldsMap) {
    if (fields.length === 0) continue;

    // Find the WP page for this slug (try common alias mappings)
    const aliases = {
      retreats: "groepstrainingen",
      weekenden: "persoonlijke-ontwikkeling-weekend-training",
      "weekend-intensive": "weekend-intensive-juni-2026",
      workshops: "ontwikkeling-workshops",
      "voor-organisaties": "in-company",
      kalender: "evenementen",
    };
    const wpSlug = aliases[slug] || slug;
    const wpPage = pageBySlug.get(wpSlug) || pageBySlug.get(slug);

    if (!wpPage) {
      console.log(`  · Skipping field seed for '${slug}' (no WP page found)`);
      continue;
    }

    // Get current page content
    let currentContent = {};
    try {
      const pageData = await wpFetch(`pages/${wpPage.id}?context=edit`);
      const json = pageData.meta?.yww_page_content;
      if (json) currentContent = JSON.parse(json);
    } catch {
      // ignore parse errors
    }

    // Add values for new fields (use real TSX defaults when available)
    // In reseed mode: also update existing placeholder values
    let updated = false;
    for (const fieldName of fields) {
      const currentValue = currentContent[fieldName];
      const isExistingPlaceholder =
        fieldName in currentContent &&
        typeof currentValue === "string" &&
        /^\[.+\]$/.test(currentValue);
      const needsUpdate =
        !(fieldName in currentContent) ||
        (RESEED_MODE && isExistingPlaceholder);

      if (!needsUpdate) continue;

      const defaultValue = fieldDefaults?.get(slug)?.get(fieldName);
      const type = inferFieldType(fieldName);
      currentContent[fieldName] =
        defaultValue !== undefined
          ? defaultValue
          : type === "textarea"
          ? `[${generateLabel(fieldName)} tekst hier invullen]`
          : type === "image"
          ? ""
          : `[${generateLabel(fieldName)}]`;
      updated = true;
    }

    if (updated) {
      try {
        await wpFetch(`pages/${wpPage.id}`, {
          method: "POST",
          body: JSON.stringify({
            meta: { yww_page_content: JSON.stringify(currentContent) },
          }),
        });
        console.log(
          `  ✓ Seeded ${fields.length} field(s) in WP page '${wpSlug || slug}'`
        );
      } catch (err) {
        console.error(`  ✗ Failed to seed fields for '${slug}': ${err.message}`);
      }
    }
  }
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

async function main() {
  const modeLabel = !WRITE_MODE
    ? "Dry-run (use --write to apply changes)"
    : RESEED_MODE
    ? "WRITE + RESEED mode (updating placeholder values with real defaults)"
    : "WRITE mode";
  console.log(`\nCMS Sync — ${modeLabel}\n`);

  // 1. Parse TSX files
  const { pageFields, newPageAnnotations, fieldDefaults } = parseTsxFiles();

  // 2. Parse existing PHP fields
  const existingPhpFields = parseExistingPhpFields();

  // 3. Compute new fields per slug
  const newFieldsMap = new Map(); // slug → Array<fieldName>
  let totalNewFields = 0;

  for (const [slug, fields] of pageFields) {
    const existingFields = existingPhpFields.get(slug) || new Set();
    const newFields = [...fields].filter((f) => !existingFields.has(f));

    if (newFields.length > 0) {
      newFieldsMap.set(slug, newFields);
      totalNewFields += newFields.length;
      console.log(`  [${slug}] ${newFields.length} new field(s): ${newFields.join(", ")}`);
    }
  }

  if (totalNewFields === 0) {
    console.log("  ✓ No new CMS fields detected.");
  }

  // 4. Check for new pages from @cms-page annotations
  const existingRegistrySlugs = parseExistingRegistrySlugs();
  const existingRoutes = parseExistingRoutes();

  const newPages = newPageAnnotations.filter(
    (p) => !existingRegistrySlugs.has(p.slug) || !existingRoutes.has(p.route)
  );

  if (newPages.length > 0) {
    console.log(`\n  ${newPages.length} new page(s) detected:`);
    for (const p of newPages) {
      console.log(`    - ${p.slug} → ${p.route} (${p.componentName})`);
    }
  } else {
    console.log("  ✓ No new pages detected.");
  }

  if (!WRITE_MODE) {
    console.log(
      "\nDry-run complete. Run with --write to apply changes.\n"
    );
    return;
  }

  console.log("\nApplying changes...\n");

  // 5. Update PHP file with new fields
  for (const [slug, newFields] of newFieldsMap) {
    updatePhpFile(slug, newFields);
  }

  // 6. Update page registry with new pages
  if (newPages.length > 0) {
    updatePageRegistry(newPages);
  }

  // 7. Update App.tsx with new routes
  if (newPages.length > 0) {
    updateAppTsx(newPages);
  }

  // 8. Update Layout.tsx with new nav items
  const pagesWithMenu = newPages.filter((p) => p.menuLabel);
  if (pagesWithMenu.length > 0) {
    updateLayoutTsx(pagesWithMenu);
  }

  // 9. Seed WordPress
  await seedWordPress(newPages, newFieldsMap, existingPhpFields, fieldDefaults);

  console.log("\nSync complete!\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
