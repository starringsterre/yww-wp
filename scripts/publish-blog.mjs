/**
 * publish-blog.mjs
 *
 * Zet een blog uit content/blogs/<slug>.mjs in WordPress. Zelfde route als
 * seed-eerste-vijf-jaar-carriere-blog.mjs: een WP-pagina onder "Tools en
 * Handvatten" met yww_blog_content; bij publiceren maakt de
 * transition_post_status-hook in yww-content-types.php de yww_blog-post aan.
 *
 * Usage:
 *   node scripts/publish-blog.mjs content/blogs/<slug>.mjs            # controle, verstuurt niets
 *   node scripts/publish-blog.mjs content/blogs/<slug>.mjs --draft    # concept in WP Admin (niet live)
 *   node scripts/publish-blog.mjs content/blogs/<slug>.mjs --publish  # live zetten
 *
 * Required env vars (in .env.production, gitignored — nooit in .env):
 *   WP_URL   – https://cms.youngwisewomen.nl
 *   WP_USER  – WordPress gebruikersnaam
 *   WP_PASS  – WordPress Application Password
 */

import { existsSync, readFileSync } from "fs";
import { basename, extname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dir = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dir, "..");
const SITE_URL = "https://youngwisewomen.com";
const PARENT_SLUG = "tools-en-handvatten";
const MAX_SECTIONS = 6;

// ─────────────────────────────────────────────
// ARGS + CONTENT
// ─────────────────────────────────────────────

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const mode = args.includes("--publish") ? "publish" : args.includes("--draft") ? "draft" : "check";

if (!file) {
  console.error("Gebruik: node scripts/publish-blog.mjs content/blogs/<slug>.mjs [--draft|--publish]");
  process.exit(1);
}

const blog = (await import(pathToFileURL(resolve(ROOT, file)).href)).default;

function validate(b) {
  const errors = [];
  for (const key of ["slug", "title", "excerpt", "author", "intro"]) {
    if (!b[key]) errors.push(`"${key}" ontbreekt`);
  }
  if (b.slug && !/^[a-z0-9-]+$/.test(b.slug)) errors.push(`slug mag alleen a-z, 0-9 en - bevatten`);
  if (!b.image?.file && !b.image?.url) errors.push(`"image.file" of "image.url" ontbreekt`);
  if (b.image?.file && !existsSync(resolve(ROOT, b.image.file))) errors.push(`afbeelding niet gevonden: ${b.image.file}`);
  if (!b.sections?.length) errors.push(`"sections" is leeg`);
  if (b.sections?.length > MAX_SECTIONS) errors.push(`maximaal ${MAX_SECTIONS} secties (nu ${b.sections.length})`);
  return errors;
}

const errors = validate(blog);
if (errors.length) {
  console.error(`❌  ${file} klopt niet:\n   - ${errors.join("\n   - ")}`);
  process.exit(1);
}

const stripTags = (html) => html.replace(/<[^>]+>/g, " ");
const allHtml = [blog.intro, ...blog.sections.flatMap((s) => [s.heading, s.body]), blog.conclusion ?? ""].join(" ");
const wordCount = stripTags(allHtml).split(/\s+/).filter(Boolean).length;

const BLOG_CONTENT = {
  date: blog.date || new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }),
  author: blog.author,
  category: blog.category ?? "",
  read_time: blog.read_time || `${Math.max(1, Math.round(wordCount / 200))} min`,
  image: blog.image.url ?? "",
  excerpt: blog.excerpt,
  intro: blog.intro,
  ...Object.fromEntries(
    blog.sections.flatMap((s, i) => [
      [`section_${i + 1}_heading`, s.heading],
      [`section_${i + 1}_body`, s.body],
    ]),
  ),
  cta_heading: blog.cta?.heading ?? "",
  cta_body: blog.cta?.body ?? "",
  cta_button_label: blog.cta?.button_label ?? "",
  cta_button_url: blog.cta?.button_url ?? "",
  conclusion: blog.conclusion ?? "",
};

// HTML fallback for native WP editor view
const POST_CONTENT = [
  blog.intro,
  ...blog.sections.map((s) => `<h2>${s.heading}</h2>\n${s.body}`),
  blog.cta ? `<h2>${blog.cta.heading}</h2>\n${blog.cta.body}` : "",
  blog.conclusion ?? "",
]
  .filter(Boolean)
  .join("\n\n");

const LIVE_URL = `${SITE_URL}/inspiratie/${PARENT_SLUG}/${blog.slug}`;

// ─────────────────────────────────────────────
// CHECK (default): geen wachtwoord nodig, verstuurt niets
// ─────────────────────────────────────────────

const WP_URL_DEFAULT = "https://cms.youngwisewomen.nl";
const liveRes = await fetch(`${process.env.WP_URL || WP_URL_DEFAULT}/wp-json/yww/v1/blogs/${blog.slug}`).catch(() => null);
const alreadyLive = liveRes?.ok ?? false;

console.log(`📝  ${blog.title}`);
console.log(`   slug:     ${blog.slug} ${alreadyLive ? "(staat al live → wordt bijgewerkt)" : "(nieuw)"}`);
console.log(`   auteur:   ${BLOG_CONTENT.author} · ${BLOG_CONTENT.date} · ${BLOG_CONTENT.read_time} · ${BLOG_CONTENT.category || "geen categorie"}`);
console.log(`   secties:  ${blog.sections.length} · ${wordCount} woorden`);
console.log(`   beeld:    ${blog.image.file ?? blog.image.url}`);
console.log(`   url:      ${LIVE_URL}`);

if (mode === "check") {
  console.log(`\n✓  Controle ok. Niets verstuurd. Gebruik --draft of --publish om naar WordPress te sturen.`);
  process.exit(0);
}

if (mode === "draft" && alreadyLive) {
  console.error(`\n❌  Deze blog staat al live; een concept zou de live versie niet vervangen. Gebruik --publish om bij te werken.`);
  process.exit(1);
}

// ─────────────────────────────────────────────
// LOAD .env.production
// ─────────────────────────────────────────────

const ENV_FILE = join(ROOT, ".env.production");
if (existsSync(ENV_FILE)) {
  for (const line of readFileSync(ENV_FILE, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.substring(0, eq).trim();
    const value = trimmed.substring(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  }
}

const WP_URL = process.env.WP_URL || WP_URL_DEFAULT;
const WP_USER = process.env.WP_USER;
const WP_PASS = process.env.WP_PASS;

if (!WP_USER || !WP_PASS) {
  console.error(`\n❌  WP_USER en WP_PASS ontbreken. Zet ze in .env.production (niet in .env: die gaat mee naar GitHub).`);
  process.exit(1);
}

const AUTH = `Basic ${Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64")}`;

async function wpRequest(method, path, body) {
  const url = `${WP_URL}/wp-json/wp/v2/${path}`;
  const res = await fetch(url, {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`WP API ${method} ${url} → ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─────────────────────────────────────────────
// WORDPRESS
// ─────────────────────────────────────────────

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

async function uploadFeaturedImage() {
  const mediaSlug = `${blog.slug}-cover`;
  const existing = await wpRequest("GET", `media?slug=${mediaSlug}`).catch(() => []);
  if (existing[0]?.source_url) {
    console.log(`🖼️   Bestaande afbeelding hergebruikt: ${existing[0].source_url}`);
    return existing[0].source_url;
  }

  const ext = extname(blog.image.file).toLowerCase();
  const form = new FormData();
  form.append(
    "file",
    new Blob([readFileSync(resolve(ROOT, blog.image.file))], { type: MIME[ext] ?? "application/octet-stream" }),
    `${mediaSlug}${ext}`,
  );
  form.append("title", blog.image.title ?? basename(blog.image.file, ext));
  form.append("alt_text", blog.image.alt ?? blog.title);

  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, { method: "POST", headers: { Authorization: AUTH }, body: form });
  if (!res.ok) throw new Error(`Upload afbeelding → ${res.status}: ${await res.text()}`);
  const uploaded = await res.json();
  console.log(`🖼️   Afbeelding geüpload: ${uploaded.source_url}`);
  return uploaded.source_url;
}

async function findParentId() {
  const parents = await wpRequest("GET", `pages?slug=${PARENT_SLUG}&status=any`);
  if (!parents.length) throw new Error(`Parent pagina "${PARENT_SLUG}" niet gevonden in WordPress.`);
  return parents[0].id;
}

// De hook kopieert post_content alleen bij de eerste publicatie; bij updates
// werken we de yww_blog-post daarom direct bij.
async function syncBlogPost() {
  const blogs = await wpRequest("GET", `yww_blog?slug=${blog.slug}&status=any`).catch(() => []);
  if (!blogs.length) return;
  await wpRequest("POST", `yww_blog/${blogs[0].id}`, {
    title: blog.title,
    content: POST_CONTENT,
    excerpt: blog.excerpt,
    meta: {
      yww_blog_featured_image: BLOG_CONTENT.image,
      yww_blog_content: JSON.stringify(BLOG_CONTENT),
    },
  });
}

async function run() {
  console.log(`\n🔗  Verbinden met ${WP_URL} als ${WP_USER}…`);
  if (blog.image.file) BLOG_CONTENT.image = await uploadFeaturedImage();

  const pageBody = {
    title: blog.title,
    content: POST_CONTENT,
    excerpt: blog.excerpt,
    meta: { yww_blog_content: JSON.stringify(BLOG_CONTENT) },
  };

  const existing = await wpRequest("GET", `pages?slug=${blog.slug}&status=any`);
  let page;
  if (existing.length) {
    page = await wpRequest("POST", `pages/${existing[0].id}`, { ...pageBody, status: "draft" });
    console.log(`♻️   Bestaande pagina bijgewerkt (ID: ${page.id}).`);
  } else {
    page = await wpRequest("POST", "pages", { ...pageBody, slug: blog.slug, parent: await findParentId(), status: "draft" });
    console.log(`✅  Concept aangemaakt (ID: ${page.id}).`);
  }

  if (mode === "draft") {
    console.log(`\n📄  Concept staat klaar (niet live): ${WP_URL}/wp-admin/post.php?post=${page.id}&action=edit`);
    return;
  }

  await wpRequest("POST", `pages/${page.id}`, { status: "publish" });
  await syncBlogPost();

  const check = await fetch(`${WP_URL}/wp-json/yww/v1/blogs/${blog.slug}`);
  if (!check.ok) throw new Error(`Gepubliceerd, maar /yww/v1/blogs/${blog.slug} geeft ${check.status}.`);
  console.log(`\n🚀  Live: ${LIVE_URL}`);
}

run().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
