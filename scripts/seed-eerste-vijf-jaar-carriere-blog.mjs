/**
 * Seed script: creates + publishes the GEO/SEO optimized blog article
 * "Waarom hebben jonge vrouwen in de eerste vijf jaar van hun loopbaan
 * specifieke begeleiding nodig?" in WordPress as a WP Page (child of
 * "Tools en Handvatten"). Auteur: Ella Taal.
 *
 * Run (productie):
 *   WP_BASE="https://cms.youngwisewomen.nl" WP_USER="sterre" WP_PASS="<app password>" \
 *     node scripts/seed-eerste-vijf-jaar-carriere-blog.mjs
 *
 * Het script maakt de pagina als draft aan en zet hem daarna op "publish".
 * De transition_post_status-hook in yww-content-types.php maakt dan automatisch
 * een yww_blog-post aan met dezelfde titel, foto en excerpt.
 * De blog verschijnt op /inspiratie/tools-en-handvatten/eerste-vijf-jaar-carriere-jonge-vrouwen
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env");
let WP_BASE = "http://localhost:8080";
let WP_USER = "";
let WP_PASS = "";

try {
  const env = readFileSync(envPath, "utf-8");
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim().replace(/^["']|["']$/g, "");
    if (key?.trim() === "WP_USER") WP_USER = value;
    if (key?.trim() === "WP_PASS") WP_PASS = value;
    if (key?.trim() === "WP_BASE") WP_BASE = value;
  }
} catch {
  WP_USER = process.env.WP_USER ?? "";
  WP_PASS = process.env.WP_PASS ?? "";
  WP_BASE = process.env.WP_BASE ?? WP_BASE;
}

if (process.env.WP_USER) WP_USER = process.env.WP_USER;
if (process.env.WP_PASS) WP_PASS = process.env.WP_PASS;
if (process.env.WP_BASE) WP_BASE = process.env.WP_BASE;

if (!WP_USER || !WP_PASS) {
  console.error("❌  WP_USER and WP_PASS must be set (in .env or as environment variables)");
  process.exit(1);
}

const POST_SLUG = "eerste-vijf-jaar-carriere-jonge-vrouwen";
const POST_TITLE =
  "Waarom hebben jonge vrouwen in de eerste vijf jaar van hun loopbaan specifieke begeleiding nodig?";
const POST_EXCERPT =
  "Jonge vrouwen hebben in de eerste vijf jaar van hun loopbaan begeleiding nodig omdat juist dan patronen rond grenzen, feedback en zichtbaarheid ontstaan.";
const FEATURED_IMAGE_LOCAL = "/eerste 5 jaar carriere.png";
const FEATURED_IMAGE_FILE = resolve(process.cwd(), "public/eerste 5 jaar carriere.png");
const FEATURED_IMAGE_FILENAME = "eerste-5-jaar-carriere.png";
const FEATURED_IMAGE_ALT =
  "Jonge vrouwelijke professionals in de eerste vijf jaar van hun carrière";

const INTRO = `<p><strong>Jonge vrouwen hebben specifieke begeleiding nodig in de eerste vijf jaar van hun loopbaan, omdat juist in die periode de patronen ontstaan die hun verdere carrière, welzijn en leiderschap bepalen.</strong> Young Wise Women begeleidt jonge vrouwelijke professionals in deze fase bij het ontwikkelen van mentale weerbaarheid: voelen wat iets met je doet, zonder jezelf kwijt te raken.</p>
<p>Die eerste werkjaren zijn meer dan een startfase. Het is de periode waarin jonge professionals leren hoe zij omgaan met prestatiedruk, feedback, grenzen, zichtbaarheid, verantwoordelijkheid en sociale verwachtingen. Als daar geen bewuste begeleiding bij komt, kunnen kwaliteiten als betrokkenheid, empathie en ambitie ongemerkt omslaan in oververantwoordelijkheid, bewijsdrang en mentale overbelasting.</p>`;

const BLOG_CONTENT = {
  date: "10 augustus 2026",
  author: "Ella Taal",
  category: "Mentale weerbaarheid",
  read_time: "7 min",
  image: FEATURED_IMAGE_LOCAL,
  excerpt: POST_EXCERPT,
  intro: INTRO,

  section_1_heading: "Waar lopen jonge vrouwelijke professionals tegenaan?",
  section_1_body: `<p>Een groeiende groep jonge vrouwen worstelt in de eerste werkjaren met prestatiedruk, onzekerheid, perfectionisme en mentale overbelasting, terwijl ze hoogopgeleid, ambitieus en zeer betrokken zijn. De kernvraag is niet of ze hard genoeg werken, maar hoe ze zichzelf kunnen blijven in een veeleisende werkomgeving.</p>
<p>De cijfers onderstrepen dat dit geen individueel randverschijnsel is. TNO en CBS zagen in de Nationale Enquête Arbeidsomstandigheden dat het aandeel jonge vrouwen met burn-outklachten steeg van 25% in 2020 naar 29% in 2022. Recente RIVM-cijfers op basis van de NEA laten bovendien zien dat in 2025 23,5% van de vrouwelijke werknemers burn-outklachten rapporteerde, en dat werknemers van 25 t/m 34 jaar met 28,2% de hoogste leeftijdsgroep vormden.</p>
<p>In onze begeleidingspraktijk horen we steeds dezelfde vragen terugkomen:</p>
<ul>
  <li>Doe ik het wel goed?</li>
  <li>Wat vinden anderen van mij?</li>
  <li>Heb ik iemand teleurgesteld?</li>
  <li>Moet ik dit oplossen?</li>
  <li>Ben ik wel goed genoeg?</li>
</ul>
<p>Herken je dit bij jezelf of bij jonge collega's? Dan gaat het niet om zwakte. Wie deze vragen dagelijks meedraagt, neemt steeds meer verantwoordelijkheid voor de sfeer, het resultaat en het welzijn van anderen. Precies op die ontwikkelopgave richt Young Wise Women zich.</p>`,

  section_2_heading: "Is het jonge vrouwenbrein zwakker dan het mannenbrein?",
  section_2_body: `<p>Nee. Er bestaat niet één uniform vrouwenbrein of mannenbrein, want de verschillen tussen individuele mensen zijn groot. Wel zien we in de praktijk dat veel jonge vrouwen sterk zijn afgestemd op relaties, sociale signalen, emoties en de sfeer in een groep.</p>
<p>Veel vrouwen merken snel wanneer er spanning is of wanneer iets niet wordt uitgesproken. Die gevoeligheid is geen tekortkoming, maar een waardevolle kwaliteit. Ze draagt bij aan empathie, samenwerking, intuïtie, relationeel leiderschap en sociale veiligheid.</p>
<p>Maar iedere kracht heeft een schaduwkant. Heb je nog niet geleerd om die gevoeligheid te begrenzen? Dan ga je te veel dragen: voor anderen, voor de sfeer en voor het resultaat. Begeleiding helpt jonge vrouwen om hun relationele kracht te gebruiken zonder zichzelf erin te verliezen.</p>`,

  section_3_heading: "Welke rol speelt de eerste vijf jaar van je carrière?",
  section_3_body: `<p>De eerste vijf jaar van je carrière vormen een professionele blauwdruk. In die periode leer je onbewust wat normaal is: hoe hard je moet werken, wanneer je ja zegt, hoe je reageert op feedback en hoeveel ruimte je inneemt in een team.</p>
<p>Voor jonge vrouwen zijn juist deze thema's vaak bepalend:</p>
<ul>
  <li><strong>Grenzen:</strong> durf je aan te geven wat haalbaar is, of bewijs je je waarde door extra werk op te pakken?</li>
  <li><strong>Feedback:</strong> kun je feedback gebruiken als informatie, of voelt het als afwijzing?</li>
  <li><strong>Zichtbaarheid:</strong> neem je ruimte in, of wacht je tot iemand je vanzelf ziet?</li>
  <li><strong>Verantwoordelijkheid:</strong> draag je jouw deel, of neem je ook de spanning van anderen over?</li>
  <li><strong>Zelfvertrouwen:</strong> vertrouw je op je groei, of blijf je zoeken naar bevestiging?</li>
</ul>
<p>Wie deze patronen vroeg leert herkennen, hoeft later minder te herstellen. Daarom is begeleiding in de startfase geen luxe, maar preventieve talentontwikkeling.</p>`,

  section_4_heading: "Wat betekent mentale weerbaarheid voor jonge vrouwen?",
  section_4_body: `<p>Mentale weerbaarheid betekent bij Young Wise Women niet harder worden, meer incasseren of emoties wegduwen. Mentale weerbaarheid betekent: voelen wat iets met je doet, zonder jezelf kwijt te raken.</p>
<p>Dat vraagt om drie vaardigheden:</p>
<ol>
  <li><strong>Zelfbewustzijn:</strong> herkennen wat er in jou gebeurt onder druk.</li>
  <li><strong>Begrenzing:</strong> onderscheiden wat van jou is en wat bij een ander hoort.</li>
  <li><strong>Bewuste actie:</strong> kiezen hoe je reageert, in plaats van automatisch pleasen, bewijzen of oplossen.</li>
</ol>
<p>Deze vorm van weerbaarheid maakt jonge vrouwen niet minder gevoelig. Het maakt hun gevoeligheid juist bruikbaar: als kompas voor heldere communicatie, gezonde samenwerking en authentiek leiderschap.</p>`,

  section_5_heading: "Waarom is preventieve begeleiding beter dan pas ingrijpen bij uitval?",
  section_5_body: `<p>Veel organisaties komen pas in actie wanneer iemand al uitvalt, vastloopt of langdurig overbelast is. Dan is begeleiding vooral herstellend. Dat kan waardevol zijn, maar het is laat.</p>
<p>Preventieve begeleiding werkt eerder en dieper, omdat patronen dan nog gevormd worden. Jonge vrouwen leren dan:</p>
<ul>
  <li>signalen van stress en overbelasting sneller herkennen;</li>
  <li>feedback ontvangen zonder zichzelf af te wijzen;</li>
  <li>zichtbaar zijn zonder zich groter voor te doen;</li>
  <li>grenzen aangeven zonder schuldgevoel;</li>
  <li>verantwoordelijkheid nemen zonder alles over te nemen.</li>
</ul>
<p>Voor organisaties betekent dit dat talent niet alleen instroomt, maar ook duurzaam doorgroeit. Voor jonge vrouwen betekent het dat ambitie niet ten koste hoeft te gaan van gezondheid of eigenheid.</p>`,

  section_6_heading: "Veelgestelde vragen over begeleiding in de eerste vijf loopbaanjaren",
  section_6_body: `<p>Specifieke begeleiding in de eerste loopbaanjaren helpt jonge vrouwen om competentie, zelfvertrouwen en veerkracht tegelijk te ontwikkelen. Dat is belangrijk voor hun eigen welzijn, maar ook voor organisaties die jong vrouwelijk talent willen behouden.</p>
<p>Begeleiding helpt bij:</p>
<ul>
  <li>minder snelle langdurige overbelasting;</li>
  <li>meer eigenaarschap zonder oververantwoordelijkheid;</li>
  <li>sterkere communicatie over grenzen, behoeften en ambitie;</li>
  <li>doorgroei naar senior-, lead- en leiderschapsrollen;</li>
  <li>een open en sociaal veilige werkcultuur.</li>
</ul>
<p>De wereld heeft jonge vrouwen nodig die niet alleen competent en ambitieus zijn, maar ook verbonden blijven met zichzelf. Daarom begeleiden wij hen juist in de eerste vijf werkjaren: niet om hen minder gevoelig te maken, maar om hen te helpen voelen zonder zichzelf kwijt te raken.</p>
<h3>Waarom richt Young Wise Women zich op de eerste vijf werkjaren?</h3>
<p>Omdat in deze periode de patronen ontstaan rond grenzen, feedback, zichtbaarheid en verantwoordelijkheid die de rest van de loopbaan doorwerken. Bijsturen is dan nog vormend in plaats van herstellend.</p>
<h3>Zijn jonge vrouwen gevoeliger voor burn-out dan jonge mannen?</h3>
<p>Jonge vrouwen rapporteren vaker burn-outklachten dan jonge mannen. Dat maakt hen niet zwakker, maar wijst op een specifieke ontwikkelopgave rond begrenzing, prestatiedruk en oververantwoordelijkheid.</p>
<h3>Wat is het verschil tussen mentale weerbaarheid en incasseringsvermogen?</h3>
<p>Incasseringsvermogen is verdragen zonder te voelen wat het met je doet. Mentale weerbaarheid is voelen wat iets met je doet zonder jezelf kwijt te raken, en op basis daarvan bewuste keuzes maken.</p>
<h3>Voor wie zijn de programma's van Young Wise Women bedoeld?</h3>
<p>Voor jonge vrouwelijke professionals in de eerste vijf jaar van hun loopbaan, en voor organisaties die dit talent duurzaam willen ontwikkelen en behouden.</p>
<h3>Moet je al klachten hebben om mee te doen?</h3>
<p>Nee. De begeleiding is juist preventief bedoeld: op het moment dat patronen nog gevormd worden, niet pas wanneer iemand uitvalt of een burn-out heeft.</p>
<h3>Bronnen</h3>
<ul>
  <li><a href="https://monitorarbeid.tno.nl/publicaties/burn-outklachten-onder-jonge-werknemers/" target="_blank" rel="noreferrer">TNO/CBS: Burn-outklachten onder jonge werknemers</a></li>
  <li><a href="https://www.rivm.nl/mentale-gezondheid/monitor/werkenden/burn-out-klachten" target="_blank" rel="noreferrer">RIVM: burn-outklachten bij werkenden, verslagjaar 2025</a></li>
</ul>`,

  cta_heading: "Wil je jong vrouwelijk talent duurzaam laten groeien?",
  cta_body: `<p>Young Wise Women biedt workshops en jaarprogramma's voor jonge vrouwelijke professionals en organisaties die willen investeren in mentale weerbaarheid, persoonlijk leiderschap en duurzame talentontwikkeling.</p>
<p>Wil je weten wat dit voor jouw organisatie of voor jou persoonlijk kan betekenen? Bekijk onze workshops en jaarprogramma's of neem contact op met Young Wise Women.</p>`,
  cta_button_label: "Bekijk het aanbod",
  cta_button_url: "/aanbod/workshops",

  conclusion: `<h2>Key takeaways</h2>
<ul>
  <li>De eerste vijf werkjaren vormen de patronen die de verdere loopbaan, het welzijn en het leiderschap van jonge vrouwen bepalen.</li>
  <li>Burn-outklachten komen relatief vaak voor bij jonge werknemers en vrouwelijke werknemers; actuele NEA-cijfers maken preventie urgent.</li>
  <li>Kwaliteiten als betrokkenheid, empathie en ambitie kunnen zonder begrenzing omslaan in oververantwoordelijkheid, overbelasting en bewijsdrang.</li>
  <li>Mentale weerbaarheid is niet harder worden, maar voelen wat iets met je doet zonder jezelf kwijt te raken.</li>
  <li>Preventieve begeleiding werkt het best voordat klachten ontstaan, wanneer professionele patronen nog gevormd worden.</li>
</ul>`,
};

// HTML fallback for native WP editor view
const POST_CONTENT = [
  BLOG_CONTENT.intro,
  ...[1, 2, 3, 4, 5, 6].map(
    (i) => `<h2>${BLOG_CONTENT[`section_${i}_heading`]}</h2>\n${BLOG_CONTENT[`section_${i}_body`]}`,
  ),
  `<h2>${BLOG_CONTENT.cta_heading}</h2>\n${BLOG_CONTENT.cta_body}`,
  BLOG_CONTENT.conclusion,
].join("\n\n");

async function wpRequest(method, path, body) {
  const credentials = Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");
  const url = `${WP_BASE}/wp-json/wp/v2/${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP API ${method} ${url} → ${res.status}: ${text}`);
  }

  return res.json();
}

async function findExistingFeaturedImage() {
  let media = [];
  try {
    media = await wpRequest("GET", "media?slug=eerste-vijf-jaar-carriere&status=inherit");
  } catch {
    return "";
  }

  const existing = media.find((item) => item?.source_url);

  return existing?.source_url ?? "";
}

async function uploadFeaturedImage() {
  const existingUrl = await findExistingFeaturedImage();
  if (existingUrl) {
    console.log(`🖼️  Bestaande media gevonden: ${existingUrl}`);
    return existingUrl;
  }

  const credentials = Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");
  const url = `${WP_BASE}/wp-json/wp/v2/media`;
  const file = readFileSync(FEATURED_IMAGE_FILE);
  const form = new FormData();
  form.append("file", new Blob([file], { type: "image/png" }), FEATURED_IMAGE_FILENAME);
  form.append("title", "Eerste vijf jaar carrière");
  form.append("alt_text", FEATURED_IMAGE_ALT);

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}` },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP API POST ${url} → ${res.status}: ${text}`);
  }

  const uploaded = await res.json();
  console.log(`🖼️  Media geüpload: ${uploaded.source_url}`);
  return uploaded.source_url;
}

// De transition_post_status-hook kopieert de body/afbeelding alleen bij de
// eerste publicatie. Bij her-runs werken we de yww_blog-post daarom direct bij.
async function syncBlogPost() {
  let blogs = [];
  try {
    blogs = await wpRequest("GET", `yww_blog?slug=${POST_SLUG}&status=any`);
  } catch {
    // ignore
  }
  if (!blogs.length) {
    console.log(`ℹ️  Nog geen yww_blog-post gevonden om direct bij te werken (auto-sync maakt 'm aan).`);
    return;
  }

  const blogId = blogs[0].id;
  await wpRequest("POST", `yww_blog/${blogId}`, {
    title: POST_TITLE,
    content: POST_CONTENT,
    excerpt: POST_EXCERPT,
    meta: {
      yww_blog_featured_image: BLOG_CONTENT.image,
      yww_blog_content: JSON.stringify(BLOG_CONTENT),
    },
  });
  console.log(`🔄  yww_blog-post (ID: ${blogId}) direct bijgewerkt (content + thumbnail).`);
}

async function run() {
  console.log(`🔗  Connecting to ${WP_BASE} as ${WP_USER}…`);
  BLOG_CONTENT.image = await uploadFeaturedImage();

  let existingPages = [];
  try {
    existingPages = await wpRequest("GET", `pages?slug=${POST_SLUG}&status=any`);
  } catch {
    // ignore
  }
  if (existingPages.length > 0) {
    const existing = existingPages[0];
    console.log(`♻️  WP Pagina met slug "${POST_SLUG}" bestaat al (ID: ${existing.id}). Update + her-publiceren.`);
    await wpRequest("POST", `pages/${existing.id}`, {
      title: POST_TITLE,
      content: POST_CONTENT,
      excerpt: POST_EXCERPT,
      status: "draft",
      meta: { yww_blog_content: JSON.stringify(BLOG_CONTENT) },
    });
    await wpRequest("POST", `pages/${existing.id}`, { status: "publish" });
    console.log("🚀  Bijgewerkt en opnieuw gepubliceerd.");
    await syncBlogPost();
    console.log(`   Live op: ${WP_BASE.replace("cms.", "")}/inspiratie/tools-en-handvatten/${POST_SLUG}`);
    return;
  }

  let parentId = 0;
  const parentSlug = "tools-en-handvatten";
  let parentPages = [];
  try {
    parentPages = await wpRequest("GET", `pages?slug=${parentSlug}&status=any`);
  } catch {
    // ignore
  }

  if (parentPages.length > 0) {
    parentId = parentPages[0].id;
    console.log(`📁  Parent pagina gevonden: "Tools en Handvatten" (ID: ${parentId})`);
  } else {
    const parent = await wpRequest("POST", "pages", {
      title: "Tools en Handvatten",
      slug: parentSlug,
      status: "publish",
    });
    parentId = parent.id;
    console.log(`📁  Parent pagina aangemaakt: "Tools en Handvatten" (ID: ${parentId})`);
  }

  const page = await wpRequest("POST", "pages", {
    title: POST_TITLE,
    content: POST_CONTENT,
    excerpt: POST_EXCERPT,
    slug: POST_SLUG,
    status: "draft",
    parent: parentId,
    meta: {
      yww_blog_content: JSON.stringify(BLOG_CONTENT),
    },
  });
  console.log(`✅  WP Pagina draft aangemaakt! ID: ${page.id}, slug: "${page.slug}"`);

  await wpRequest("POST", `pages/${page.id}`, { status: "publish" });
  console.log("🚀  Gepubliceerd. De auto-sync maakt nu een yww_blog-post aan.");
  await syncBlogPost();
  console.log(`   Live op: ${WP_BASE.replace("cms.", "")}/inspiratie/tools-en-handvatten/${POST_SLUG}`);
}

run().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
