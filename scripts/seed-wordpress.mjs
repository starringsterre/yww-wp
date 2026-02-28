/**
 * Seed WordPress with hardcoded content from the React app.
 *
 * Usage: node scripts/seed-wordpress.mjs
 *
 * Requires WordPress running at WP_URL (default: http://localhost:8081)
 * with admin credentials (default: admin/admin).
 */

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

async function createPost(postType, data) {
  return wpFetch(postType, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

const testimonials = [
  {
    name: "Kim Dingelhoff",
    date: "Deelnemer oktober 2025",
    quote:
      "De retraite onder begeleiding van Ella en Liene was ontzettend waardevol. Ik heb diepgaande inzichten gekregen in wie ik ben, wat mij drijft en welke stappen ik nu kan zetten, zowel op persoonlijk als op werkvlak. De combinatie van lichaamsgerichte oefeningen en verdiepende gesprekken zorgde voor een perfecte balans tussen voelen en reflecteren. Er hing een warme, veilige sfeer waarin iedereen echt zichzelf kon zijn. Daarnaast raakte ik geïnspireerd door de andere vrouwen; hun verhalen en energie gaven me nieuwe perspectieven en motivatie. Deze retraite heeft me niet alleen dichter bij jezelf gebracht, maar ook helderheid gegeven over mijn volgende stappen.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa458d3081062459fb8afe9ebe8a4ac0e?format=webp&width=800",
  },
  {
    name: "Julia Weekenstro",
    date: "Deelnemer Oktober 2025",
    quote:
      'Wauw wat een prachtige ervaring heb ik gehad tijdens het Young Wise Women Retreat! Zowel op cognitief niveau als gevoelsniveau hebben we samen een heel mooie "reis" mogen maken in onze ontwikkeling. Vooral dat samen aangaan, met de andere vrouwen, heeft me veel gebracht. Zo mooi en betekenisvol hoe we elkaar echt konden inspireren en helpen. Grote complimenten richting de trainers Ella en Liene en de host Esther die dit hebben gefaciliteerd. Op een prachtige plek in de natuur waar ik me al meteen heel veilig en thuis voelde. Ik gun elke vrouw zo\'n betekenisvol en verbindend weekend.',
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F7895d36c45374c71a02e2f8dae447dda?format=webp&width=800",
  },
  {
    name: "Lisanne de Moel",
    date: "Deelnemer Januari 2025",
    quote:
      "Een heel fijn weekend gehad op de boerderij in Friesland. Wat is het leuk om een weekend te spenderen met allemaal vrouwen die elkaar aanmoedigen en van wie je kan leren. Ik vond het een hele waardevolle ervaring, waarbij je echt even tijd voor jezelf mag en kan nemen. Ella en Karin stelden de juiste vragen, waardoor je interessante inzichten over jezelf doet.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F8bd83a1cca6e455095fbc2cce26f0452?format=webp&width=800",
  },
  {
    name: "Melanie de Reus",
    date: "Deelnemer September 2023",
    quote:
      "Een weekend waarbij je in alle rust kan reflecteren op je leven en nieuwe inzichten over jezelf kan op doen, gesteund door andere mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen leren en elkaar mogen helpen. Ontzettend mooie en waardevolle inzichten op gedaan!",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fc5eef54d11c9437abf49ea4fe7b69596?format=webp&width=800",
  },
  {
    name: "Aïsha Lankhorst",
    date: "Deelnemer Januari 2025",
    quote:
      "Ik heb een superfijn weekend gehad met de coaches en de andere meiden in een geweldig huis in de natuur in Friesland. De sfeer was zo veilig en warm, er werd echt naar elkaar geluisterd. We hebben veel van Karen en Ella geleerd, maar ook van elkaar als groep. Ik heb echt het gevoel dat ik weer een stapje verder kan zetten, zowel op persoonlijk als op professioneel vlak. Wat ik ook erg waardeerde was dat er naast alle diepe en mooie gespreken veel ruimte was voor luchtigheid en gezelligheid met elkaar. Ik kan dit retreat echt aanraden, want de inzichten en ervaringen die ik heb opgedaan, neem ik voor de rest van mijn leven mee.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fb56ba9e008fe487cbc9f8dae8d42a849?format=webp&width=800",
  },
  {
    name: "Marina Feyz",
    date: "Deelnemer September 2023",
    quote:
      "Ik heb er geen andere woorden voor dan 'echt geweldig'! Ondanks dat ik de andere meiden van tevoren niet kende, voelde het vrijwel direct zo vertrouwd en zo warm. Ik had het gevoel dat iedereen helemaal zichzelf kon zijn en er een hele veilige omgeving was om je kwetsbaar op te stellen. Zowel Ella als Wineke zijn beiden prachtige vrouwen die mij nieuwe inzichten hebben gegeven, die ik tot op de dag vandaag nog steeds toepas. Wat vullen jullie elkaar goed aan! En dat allemaal in een prachtige omgeving in de natuur. Ik had niet meer kunnen wensen. Onwijs dankbaar voor deze onvergetelijke ervaring.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F6a36df5bf8b047eaafd0b1579b1fcf62?format=webp&width=800",
  },
  {
    name: "Julia",
    date: "Deelnemer September 2023",
    quote:
      "Het young wise women retreat was een hele fijne en leerzame ervaring. Vol oefeningen maar ook ruimte voor eigen ideeën. De begeleiding van Ella en Wineke is professioneel en duidelijk, waar zowel lichaam en geest aan bod komen. Ik heb zo veel inspiratie en wijsheid gehaald uit hun oefeningen en ideeën, maar ook uit de verhalen van andere deelnemers. Het is niet erg als je niet met een specifieke leervraag naar dit weekend komt, zie het als een jaarlijkse 'APK' van je mentale gezondheid. Heel erg waardevol!",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Ff29681ec3e8841db98437ca5e7175eb1?format=webp&width=800",
  },
  {
    name: "Julia Bleeker",
    date: "Deelnemer September 2023",
    quote:
      "Het retreat was voor mij een ontzettend fijn en betekenisvol weekend. Door middel van opdrachten en verbindende gesprekken, heb ik in een veilige en rustige setting veel helderheid en inzicht gekregen in mijn behoeftes en talenten. We waren midden in de natuur en alles werd voor ons verzorgd. Naast dat ik het fijn vond met de andere meiden in de groep, heb ik veel geleerd wat ik kan toepassen in de keuzes voor jezelf en in mijn werk.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fbdc3b23ee87f40b48865669c690e579d?format=webp&width=800",
  },
];

// ─────────────────────────────────────────────
// COACHES
// ─────────────────────────────────────────────

const coaches = [
  {
    name: "Ella Taal",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000",
    bio: "In 2011 is Awareness in Business opgericht door Ella, ontstaan na een management buy-out bij haar vorige organisatie advies kantoor Second Nature. Al ruim 28 jaar heeft zij ervaring als coach, trainer en organisatie adviseur voor diverse opdrachtgevers in zowel binnen- als buitenland. Ze heeft ervaring van het geven van retreats voor o.a. Management teams, DGA's en CEO's. Ella heeft drie dochters van 27, 25 en 22 en wil graag iets terug doen voor de jongere generatie. Bijdragen aan het welzijn van jonge professionals is een passie die ze door het geven van deze retreats naleeft!",
    role: "Founder & Coach",
    order: 1,
  },
  {
    name: "Liene Molendijk",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000",
    bio: "Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk. Daarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals.",
    role: "Coach & Trainer",
    order: 2,
  },
];

// ─────────────────────────────────────────────
// PODCASTS
// ─────────────────────────────────────────────

const podcasts = [
  {
    title: "Episode 1",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "https://www.youtube.com/watch?v=l5WYmKOh6TI&t=3s",
    spotifyUrl: "",
  },
  {
    title: "Episode 2",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "https://www.youtube.com/watch?v=oodyR6UYDBY",
    spotifyUrl: "",
  },
  {
    title: "Episode 3",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
  {
    title: "Episode 4",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
  {
    title: "Episode 5",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
  {
    title: "Episode 6",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
];

// ─────────────────────────────────────────────
// BLOGS
// ─────────────────────────────────────────────

const blogs = [
  {
    slug: "motivation-factor",
    title: "De Motivation Factor als Tool voor Richting",
    excerpt:
      "Hoe je met de Motivation Factor helder krijgt wat je energie geeft, waar je op leegloopt en welke keuzes beter bij je passen.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop",
  },
  {
    slug: "persoonlijke-groei",
    title: "Persoonlijke Groei in de Praktijk: Voorbeelden",
    excerpt:
      "Concrete voorbeelden van vrouwen die stappen zetten in grenzen aangeven, focus hervinden en met meer rust presteren.",
    image: "/persoonlijke-groei-training.jpg",
  },
  {
    slug: "vrouwelijk-leiderschap",
    title: "Vrouwelijk Leiderschap: Zichtbaar en Authentiek",
    excerpt:
      "Wat vrouwelijk leiderschap vandaag vraagt, en hoe je met vertrouwen positie inneemt zonder jezelf kwijt te raken.",
    image: "/vrouwelijk-leiderschap-training.webp",
  },
];

// ─────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────

const events = [
  {
    label: "Terugkom dag",
    type: "terugkom-dag",
    year: 2026,
    month: 2,
    startDate: "2026-02-15T09:00:00.000Z",
    endDate: "",
    description:
      "Terugkomdag om te reflecteren, ervaringen te delen en je volgende stap scherp te maken.",
  },
  {
    label: "Groep weekend training",
    type: "weekend-training",
    year: 2026,
    month: 6,
    startDate: "2026-06-24T17:30:00.000Z",
    endDate: "2026-06-26T16:00:00.000Z",
    description:
      "Intensieve weekend training met verdieping, groepsreflectie en praktische tools.",
  },
  {
    label: "Groep weekend training",
    type: "weekend-training",
    year: 2026,
    month: 10,
    startDate: "2026-10-16T17:30:00.000Z",
    endDate: "2026-10-18T16:00:00.000Z",
    description:
      "Vervolgweekend met verdieping, integratie en praktische tools voor je volgende stap.",
  },
];

// ─────────────────────────────────────────────
// GLOBAL OPTIONS
// ─────────────────────────────────────────────

const globalOptions = {
  yww_footer_about:
    "Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft, verstevig je koers en groei met gelijkgestemde vrouwen.",
  yww_contact_email: "info@youngwisewomen.nl",
  yww_contact_phone: "+31 (0)6 55334728",
  yww_social_instagram: "http://instagram.com/youngwisewomen",
  yww_social_linkedin: "",
};

// ─────────────────────────────────────────────
// SEEDING LOGIC
// ─────────────────────────────────────────────

async function seedTestimonials() {
  console.log("Seeding testimonials...");
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const post = await createPost("yww_testimonial", {
      title: t.name,
      status: "publish",
      meta: {
        yww_testimonial_name: t.name,
        yww_testimonial_date_label: t.date,
        yww_testimonial_quote: t.quote,
        yww_testimonial_image: t.image,
        yww_testimonial_order: i + 1,
      },
    });
    console.log(`  ✓ Testimonial: ${t.name} (ID: ${post.id})`);
  }
}

async function seedCoaches() {
  console.log("Seeding coaches...");
  for (const c of coaches) {
    const post = await createPost("yww_coach", {
      title: c.name,
      status: "publish",
      meta: {
        yww_coach_bio: c.bio,
        yww_coach_role: c.role,
        yww_coach_image: c.image,
        yww_coach_order: c.order,
      },
    });
    console.log(`  ✓ Coach: ${c.name} (ID: ${post.id})`);
  }
}

async function seedPodcasts() {
  console.log("Seeding podcasts...");
  for (const p of podcasts) {
    const post = await createPost("yww_podcast", {
      title: p.title,
      status: "publish",
      meta: {
        yww_podcast_teaser: p.teaser || "",
        yww_podcast_duration: p.duration,
        yww_podcast_date: p.date,
        yww_podcast_guest: p.guest,
        yww_podcast_thumbnail: p.thumbnailUrl,
        yww_podcast_youtube_url: p.youtubeUrl,
        yww_podcast_spotify_url: p.spotifyUrl,
      },
    });
    console.log(`  ✓ Podcast: ${p.title} (ID: ${post.id})`);
  }
}

async function seedBlogs() {
  console.log("Seeding blogs...");
  for (const b of blogs) {
    const post = await createPost("yww_blog", {
      title: b.title,
      status: "publish",
      excerpt: b.excerpt,
      meta: {
        yww_blog_slug: b.slug,
        yww_blog_featured_image: b.image,
      },
    });
    console.log(`  ✓ Blog: ${b.title} (ID: ${post.id})`);
  }
}

async function seedEvents() {
  console.log("Seeding events...");
  for (const e of events) {
    const post = await createPost("yww_event", {
      title: e.label,
      status: "publish",
      meta: {
        yww_event_label: e.label,
        yww_event_type: e.type,
        yww_event_year: e.year,
        yww_event_month: e.month,
        yww_event_start_date: e.startDate,
        yww_event_end_date: e.endDate || "",
        yww_event_description: e.description,
      },
    });
    console.log(`  ✓ Event: ${e.label} (ID: ${post.id})`);
  }
}

async function seedOptions() {
  console.log("Seeding global options...");
  for (const [key, value] of Object.entries(globalOptions)) {
    const url = `${WP_URL}/wp-json/wp/v2/settings`;
    // Use WP-CLI instead since settings API requires specific registration
    // We'll use a different approach - direct option update via a custom endpoint
  }
  // Use WP REST API options endpoint
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_HEADER,
    },
    body: JSON.stringify({}),
  });
  // Options will use defaults set in the plugin; skip REST settings API
  console.log(
    "  ✓ Options use plugin defaults (edit via WP Admin > Settings > YWW Instellingen)"
  );
}

async function main() {
  console.log(`\nSeeding WordPress at ${WP_URL}\n`);

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

  try {
    await seedCoaches();
    await seedTestimonials();
    await seedPodcasts();
    await seedBlogs();
    await seedEvents();
    await seedOptions();
    console.log("\nSeeding complete!\n");
  } catch (err) {
    console.error(`\nSeeding failed: ${err.message}\n`);
    process.exit(1);
  }
}

main();
