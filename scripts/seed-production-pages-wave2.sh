#!/bin/bash
# Seed page content to Cloud86 production via REST API - Wave 2
# Usage: bash scripts/seed-production-pages-wave2.sh
#
# Seeds 8 pages: Contact (NEW), Ons Verhaal, Lid Worden, Inspiratie,
# Losse Workshops, Jaarprogrammas, Blogs (NEW), Podcasts (NEW)
#
# Pages marked NEW are first created via REST API, then seeded.

API_BASE="https://cms.youngwisewomen.nl/wp-json/wp/v2/pages"
AUTH="${WP_AUTH:-admin:admin}"

seed_page() {
  local page_id="$1"
  local slug="$2"
  local json_file="$3"

  echo -n "  Seeding $slug (ID $page_id)... "

  local content
  content=$(cat "$json_file")

  local response
  response=$(curl -s -w "\n%{http_code}" -X POST "${API_BASE}/${page_id}" \
    -u "$AUTH" \
    -H "Content-Type: application/json" \
    -d "{\"meta\":{\"yww_page_content\":$(echo "$content" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')}}")

  local http_code
  http_code=$(echo "$response" | tail -1)

  if [ "$http_code" = "200" ]; then
    local field_count
    field_count=$(echo "$content" | python3 -c 'import json,sys; print(len(json.loads(sys.stdin.read())))')
    echo "✓ ($field_count velden)"
  else
    echo "✗ HTTP $http_code"
    echo "$response" | head -1 | python3 -c 'import json,sys; d=json.loads(sys.stdin.read()); print("    Error:", d.get("message","unknown"))' 2>/dev/null
  fi
}

create_page() {
  local title="$1"
  local slug="$2"

  echo -n "  Creating page '$title' (slug: $slug)... "

  local response
  response=$(curl -s -w "\n%{http_code}" -X POST "${API_BASE}" \
    -u "$AUTH" \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"$title\",\"slug\":\"$slug\",\"status\":\"publish\"}")

  local http_code
  http_code=$(echo "$response" | tail -1)

  if [ "$http_code" = "201" ]; then
    local page_id
    page_id=$(echo "$response" | head -1 | python3 -c 'import json,sys; print(json.loads(sys.stdin.read())["id"])')
    echo "✓ (ID $page_id)"
    echo "$page_id"
  else
    echo "✗ HTTP $http_code"
    echo "$response" | head -1 | python3 -c 'import json,sys; d=json.loads(sys.stdin.read()); print("    Error:", d.get("message","unknown"))' 2>/dev/null
    echo ""
  fi
}

echo ""
echo "=== Seeding YWW Production Pages - Wave 2 ==="
echo ""

# Create temp dir for JSON payloads
TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

# ────────────────────────────────────────────────────────────
# STEP 1: Create new pages that don't exist yet on production
# ────────────────────────────────────────────────────────────

echo "── Step 1: Creating new pages ──"
echo ""

CONTACT_ID=$(create_page "Contact" "contact")
BLOGS_ID=$(create_page "Blogs" "blogs")
PODCASTS_ID=$(create_page "Podcasts" "podcasts")

echo ""

# Validate that all IDs were captured
if [ -z "$CONTACT_ID" ] || [ -z "$BLOGS_ID" ] || [ -z "$PODCASTS_ID" ]; then
  echo "ERROR: Failed to create one or more pages. Aborting."
  echo "  CONTACT_ID=$CONTACT_ID"
  echo "  BLOGS_ID=$BLOGS_ID"
  echo "  PODCASTS_ID=$PODCASTS_ID"
  exit 1
fi

echo "── Step 2: Seeding page content ──"
echo ""

# ── CONTACT (NEW, slug: contact) ──
cat > "$TMPDIR/contact.json" << 'JSONEOF'
{
  "hero_title": "Ons Verhaal",
  "hero_subtitle": "Hoe twee generaties elkaar versterken",
  "block_1_heading": "Ons Gedachtegoed",
  "block_1_text": "Het idee voor dit retreat ontstond bij Ella Taal, zelf afkomstig uit Generatie X en moeder van drie dochters uit Generatie Z. Ze zag van dichtbij hoe jonge vrouwen vandaag de dag zoeken naar hun plek in het professionele werkveld, vaak zonder de begeleiding die ze verdienen. Ella voelde de wens om de kracht en wijsheid van eerdere generaties door te geven aan deze nieuwe generatie, die in een complexe wereld op eigenzinnige en bewuste wijze leiding durft te nemen. Zo wil zij bijdragen aan het versterken van vrouwen die leiderschap tonen \u2013 iets waar in deze tijd grote behoefte aan is.",
  "block_2_heading": "Unieke Kracht"
}
JSONEOF

seed_page "$CONTACT_ID" "contact" "$TMPDIR/contact.json"

# ── ONS VERHAAL (slug: ons-verhaal, page ID 37) ──
cat > "$TMPDIR/ons-verhaal.json" << 'JSONEOF'
{
  "hero_title": "Ons Verhaal",
  "hero_subtitle": "Ontdek wat Young Wise Women betekent en wat ons drijft",
  "section_1_heading": "Het Begin van Ons Avontuur",
  "section_1_text": "Young Wise Women is geboren uit een passie om jonge professionals te ondersteunen in hun persoonlijke en professionele groei. We geloven dat de beste versie van jezelf niet alleen goed is voor jouw wellbeing, maar ook voor de wereld om je heen.\nOnze missie is om vrouwen in de leeftijd van 24+ te helpen een betekenisvol leven te leiden, waarbij ze hun unieke talenten en wijsheid volledig kunnen omarmen. We cre\u00ebren ruimte voor reflectie, groei en inspiratie.",
  "section_2_heading": "Onze Waarden",
  "section_2_items": "Authentieke verbinding met jezelf en anderen\nRuimte voor reflectie en persoonlijke groei\nSteun en inspiratie van gelijkgestemde vrouwen\nPraktische tools voor betekenisvolle verandering",
  "cta_heading": "Ben je klaar voor je volgende stap?",
  "cta_text": "Ontdek onze groepstrainingen"
}
JSONEOF

seed_page 37 "ons-verhaal" "$TMPDIR/ons-verhaal.json"

# ── LID WORDEN (slug: lid-worden, page ID 38) ──
cat > "$TMPDIR/lid-worden.json" << 'JSONEOF'
{
  "hero_title": "Lid worden van het Young Wise Women Netwerk",
  "hero_subtitle": "Sluit je aan bij een groep young professionals die elkaar ondersteunen, inspireren en samen groeien. Lidmaatschap is gratis.",
  "benefit_1_title": "Verhalen Delen",
  "benefit_1_text": "Deel je persoonlijke verhalen en ervaringen met gelijkgestemde vrouwen in een veilige omgeving.",
  "benefit_2_title": "Samen Samenkomen",
  "benefit_2_text": "Ontmoet andere vrouwen in het Netwerk op regelmatige bijeenkomsten en events.",
  "benefit_3_title": "Samen Dingen Organiseren",
  "benefit_3_text": "Werk samen met andere leden aan activiteiten, workshops en projecten.",
  "benefit_4_title": "Steun en Verbinding",
  "benefit_4_text": "Maak deel uit van een ondersteunende gemeenschap waar je jezelf kunt zijn.",
  "benefits_heading": "Voordelen van Lidmaatschap",
  "benefits_intro": "Het Young Wise Women Netwerk is een plek waar je jezelf volledig kunt uiten en groeien. Deelname is volledig gratis.",
  "form_heading": "Schrijf je in",
  "form_text": "Vul het formulier in en sluit je aan! Het lidmaatschap is gratis.",
  "form_success": "\u2713 Bedankt! We ontvangen je inschrijving en sturen je binnenkort meer informatie.",
  "form_button": "Ik word gratis lid van het Netwerk",
  "form_privacy": "We respecteren je privacy. Je gegevens worden alleen gebruikt om je in aanraking te brengen met het Young Wise Women Netwerk."
}
JSONEOF

seed_page 38 "lid-worden" "$TMPDIR/lid-worden.json"

# ── INSPIRATIE (slug: inspiratie, page ID 35) ──
cat > "$TMPDIR/inspiratie.json" << 'JSONEOF'
{
  "hero_title": "Inspiratie",
  "hero_subtitle": "Verhalen, inzichten en gesprekken die je helpen groeien in werk en leven."
}
JSONEOF

seed_page 35 "inspiratie" "$TMPDIR/inspiratie.json"

# ── LOSSE WORKSHOPS (slug: losse-workshops, page ID 34) ──
cat > "$TMPDIR/losse-workshops.json" << 'JSONEOF'
{
  "hero_title": "Losse workshops",
  "hero_subtitle": "Flexibele dag workshops voor jonge professionals die gericht willen werken aan een specifiek thema.",
  "transform_heading": "Jouw Transformatie",
  "goodbye_heading": "Waar je Afscheid van Neemt",
  "goodbye_text": "Je laat twijfel, uitstelgedrag en het gevoel van 'moet ik nog meer?' los, zodat je met meer rust en focus keuzes maakt.",
  "takeaway_heading": "Wat je Meeneemt",
  "takeaway_text": "Praktische handvatten, meer energie en heldere prioriteiten die je direct toepast in werk en dagelijks leven.",
  "nextstep_heading": "Jouw Volgende Stap",
  "nextstep_text": "Je gaat naar huis met een concreet actieplan, zodat je ontwikkeling na de workshop direct doorloopt.",
  "for_whom_heading": "Voor wie zijn onze workshops",
  "for_whom_intro": "Deze losse workshops zijn ideaal voor jonge professionals (24+) die:",
  "for_whom_items": "\u2713 Snel en gericht willen werken aan een specifiek thema\n\u2713 Praktische tools zoeken die direct toepasbaar zijn\n\u2713 Een dag willen investeren in persoonlijke groei\n\u2713 Willen groeien met steun van een groep gelijkgestemde vrouwen",
  "sidebar_what_heading": "Wat je krijgt",
  "sidebar_what_items": "\u2713 Praktische handvatten die direct toepasbaar zijn\n\u2713 Persoonlijke reflectie-oefeningen en werkmateriaal\n\u2713 Feedback van coaches en de groep\n\u2713 Concreet actieplan voor de weken erna",
  "sidebar_practical_heading": "Praktisch",
  "sidebar_practical_items": "\u2713 Tijd: 09:30 - 17:00\n\u2713 Locatie: Castricum\n\u2713 Groepsgrootte: 10 tot 14 deelnemers\n\u2713 Inclusief lunch, koffie, thee en werkmateriaal",
  "sidebar_not_for_heading": "Voor wie niet",
  "sidebar_not_for_items": "\u2022 Als je alleen theorie wilt zonder oefenen\n\u2022 Als je geen ruimte hebt om te reflecteren\n\u2022 Als je nu geen concrete verandering wilt maken"
}
JSONEOF

seed_page 34 "losse-workshops" "$TMPDIR/losse-workshops.json"

# ── JAARPROGRAMMAS (slug: jaarprogrammas, page ID 33) ──
cat > "$TMPDIR/jaarprogrammas.json" << 'JSONEOF'
{
  "hero_title": "Jaarprogramma's",
  "hero_subtitle": "Langlopende ontwikkelprogramma's voor jonge vrouwen die duurzaam willen groeien in leiderschap en persoonlijke kracht.",
  "intro_heading": "Een jaar lang investeren in jouw groei als jonge professional",
  "intro_text_1": "Ons jaarprogramma combineert 1-op-1 coaching, groepssessies, een dag workshop en een weekend training tot een samenhangend traject. Gedurende 12 maanden werk je structureel aan je persoonlijke en professionele ontwikkeling, met begeleiding van ervaren coaches.",
  "intro_text_2": "Je bouwt stap voor stap aan rust, zelfvertrouwen en leiderschap. Het programma is ontworpen zodat je inzichten direct kunt toepassen in je werk en dagelijks leven.",
  "intro_cta": "Neem contact op voor meer informatie",
  "phases_heading": "De Drie Fases van het Jaarprogramma",
  "phases_intro": "Elk jaarprogramma is opgebouwd uit drie fases die samen zorgen voor een duurzame transformatie.",
  "phase_1_title": "Fase 1: Bewustwording",
  "phase_1_text": "Je brengt in kaart wie je bent, wat je drijft en waar je naartoe wilt. Door reflectie, coaching en de Motivation Factor test krijg je helder inzicht in je patronen en kwaliteiten.",
  "phase_2_title": "Fase 2: Verdieping",
  "phase_2_text": "Je werkt actief aan gedragsverandering en leiderschap. In groepssessies en een weekend training ga je dieper in op je blokkades en leer je nieuwe vaardigheden toepassen.",
  "phase_3_title": "Fase 3: Integratie",
  "phase_3_text": "Je borgt je ontwikkeling en maakt het onderdeel van je dagelijks leven. Met een concreet actieplan en terugkomsessies zorg je dat je groei duurzaam doorwerkt.",
  "for_whom_heading": "Voor wie zijn onze jaarprogramma's",
  "for_whom_intro": "Dit programma is speciaal ontworpen voor jonge professionals (24+) die:",
  "for_whom_items": "\u2713 Duurzaam willen groeien over een langere periode\n\u2713 Behoefte hebben aan structuur en begeleiding in hun ontwikkeling\n\u2713 Willen investeren in zowel persoonlijk als professioneel leiderschap\n\u2713 Een community zoeken van gelijkgestemde jonge vrouwen",
  "edition_label": "JAARPROGRAMMA",
  "edition_heading": "Young Wise Women Jaarprogramma",
  "edition_subtitle": "12 maanden persoonlijke en professionele groei met coaching, groepssessies en intensieve trainingen",
  "edition_dates": "Start meerdere momenten per jaar",
  "edition_duration": "Doorlooptijd: 12 maanden",
  "edition_location": "Castricum, Friesland & online",
  "edition_location_detail": "Combinatie van fysieke bijeenkomsten en online sessies",
  "edition_audience": "Voor jonge vrouwelijke professionals (24+)",
  "edition_availability": "Kleine groepen van 8 tot 12 deelnemers",
  "program_heading": "Programma-opbouw per fase",
  "phase_detail_1_label": "Fase 1 \u2014 Bewustwording (maand 1-4)",
  "phase_detail_1_text": "Intake en Motivation Factor test \u2022 Kennismaking met je groep \u2022 1-op-1 coachingsessies \u2022 Reflectie op patronen, drijfveren en doelen \u2022 Eerste groepssessies met thema's als grenzen en energie",
  "phase_detail_2_label": "Fase 2 \u2014 Verdieping (maand 5-8)",
  "phase_detail_2_text": "Verdiepende groepssessies en 1-op-1 coaching \u2022 Dag workshop met focus op leiderschap en effectiviteit \u2022 Weekend training (intensief) met reflectie, ademwerk en praktische tools \u2022 Werken aan beperkende overtuigingen en gedragsverandering",
  "phase_detail_3_label": "Fase 3 \u2014 Integratie (maand 9-12)",
  "phase_detail_3_text": "Borging van inzichten in dagelijks leven en werk \u2022 Afsluitende coachingsessies \u2022 Terugkomdag met de groep \u2022 Concreet actieplan voor na het programma \u2022 Afsluiting en certificering",
  "transform_heading": "Jouw Transformatie",
  "goodbye_heading": "Waar je Afscheid van Neemt",
  "goodbye_text": "Je laat het gevoel van vastlopen, constant aanpassen en twijfelen achter je. Na een jaar heb je helder wat je wilt en de tools om ernaar te handelen.",
  "takeaway_heading": "Wat je Meeneemt",
  "takeaway_text": "Diepgaand zelfinzicht, sterker leiderschap en een netwerk van gelijkgestemde vrouwen. Je hebt concrete vaardigheden die je dagelijks inzet.",
  "nextstep_heading": "Jouw Volgende Stap",
  "nextstep_text": "Je sluit het programma af met een concreet actieplan en de zekerheid dat je groei duurzaam doorzet, ondersteund door je community.",
  "sidebar_investment_heading": "Investering",
  "sidebar_investment_items": "\u2713 Maandelijks te betalen of in \u00e9\u00e9n keer\n\u2713 Vaak vergoed via opleidingsbudget werkgever\n\u2713 Inclusief alle materialen en tools",
  "sidebar_included_heading": "Inclusief",
  "sidebar_included_items": "\u2713 1-op-1 coachingsessies met gecertificeerde coach\n\u2713 Maandelijkse groepssessies\n\u2713 Dag workshop en weekend training\n\u2713 Motivation Factor test (t.w.v. \u20ac145)\n\u2713 Werkboek en praktische tools",
  "sidebar_practical_heading": "Praktisch",
  "sidebar_practical_items": "\u2713 Duur: 12 maanden\n\u2713 Locatie: Castricum / Friesland / online\n\u2713 Groepsgrootte: 8 tot 12 deelnemers\n\u2713 Start: meerdere momenten per jaar",
  "cta_heading": "Klaar om te groeien?",
  "cta_text": "Neem contact op voor een vrijblijvend kennismakingsgesprek en ontdek welk programma bij jou past.",
  "cta_button_1": "Neem contact op",
  "cta_button_2": "Bekijk kalender"
}
JSONEOF

seed_page 33 "jaarprogrammas" "$TMPDIR/jaarprogrammas.json"

# ── BLOGS (NEW, slug: blogs) ──
cat > "$TMPDIR/blogs.json" << 'JSONEOF'
{
  "hero_title": "Tools & Handvatten",
  "hero_subtitle": "Praktische en verdiepende artikelen voor jonge professionals."
}
JSONEOF

seed_page "$BLOGS_ID" "blogs" "$TMPDIR/blogs.json"

# ── PODCASTS (NEW, slug: podcasts) ──
cat > "$TMPDIR/podcasts.json" << 'JSONEOF'
{
  "hero_title": "Podcasts",
  "hero_subtitle": "Luister naar verhalen, gesprekken en inzichten die je verder brengen."
}
JSONEOF

seed_page "$PODCASTS_ID" "podcasts" "$TMPDIR/podcasts.json"

echo ""
echo "=== Done! ==="
echo ""
echo "New page IDs created:"
echo "  Contact:  $CONTACT_ID"
echo "  Blogs:    $BLOGS_ID"
echo "  Podcasts: $PODCASTS_ID"
echo ""
echo "Verifieer via:"
echo "  curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/pages/ons-verhaal | python3 -m json.tool | head -20"
echo "  curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/pages/contact | python3 -m json.tool | head -20"
echo "  curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/pages/jaarprogrammas | python3 -m json.tool | head -20"
