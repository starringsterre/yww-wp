#!/bin/bash
# Seed WordPress with hardcoded content from the React app
# Usage: bash scripts/seed-wordpress.sh

set -e

WP_DIR="$(cd "$(dirname "$0")/../wordpress" && pwd)"
WP="php -d memory_limit=512M -d error_reporting=0 $(which wp)"

cd "$WP_DIR"

echo ""
echo "Seeding WordPress at $WP_DIR"
echo ""

# Helper: create post with meta
create_post() {
  local post_type="$1"
  local title="$2"
  shift 2

  local post_id
  post_id=$($WP post create --post_type="$post_type" --post_title="$title" --post_status=publish --porcelain 2>/dev/null)

  # Set meta fields (pairs of key value)
  while [ $# -ge 2 ]; do
    local key="$1"
    local value="$2"
    shift 2
    if [ -n "$value" ]; then
      $WP post meta update "$post_id" "$key" "$value" 2>/dev/null
    fi
  done

  echo "  ✓ $title (ID: $post_id)"
}

# Helper: create blog post with excerpt
create_blog() {
  local title="$1"
  local excerpt="$2"
  local slug="$3"
  local image="$4"

  local post_id
  post_id=$($WP post create --post_type=yww_blog --post_title="$title" --post_excerpt="$excerpt" --post_status=publish --porcelain 2>/dev/null)
  $WP post meta update "$post_id" yww_blog_slug "$slug" 2>/dev/null
  $WP post meta update "$post_id" yww_blog_featured_image "$image" 2>/dev/null

  echo "  ✓ $title (ID: $post_id)"
}

# ─── Delete existing content ───
echo "Cleaning existing content..."
for type in yww_coach yww_testimonial yww_event yww_podcast yww_blog yww_workshop yww_faq page; do
  $WP post delete $($WP post list --post_type=$type --format=ids 2>/dev/null) --force 2>/dev/null || true
done

# ─── COACHES ───
echo "Seeding coaches..."

create_post yww_coach "Ella Taal" \
  yww_coach_bio "In 2011 is Awareness in Business opgericht door Ella, ontstaan na een management buy-out bij haar vorige organisatie advies kantoor Second Nature. Al ruim 28 jaar heeft zij ervaring als coach, trainer en organisatie adviseur voor diverse opdrachtgevers in zowel binnen- als buitenland. Ze heeft ervaring van het geven van retreats voor o.a. Management teams, DGA's en CEO's. Ella heeft drie dochters van 27, 25 en 22 en wil graag iets terug doen voor de jongere generatie. Bijdragen aan het welzijn van jonge professionals is een passie die ze door het geven van deze retreats naleeft!" \
  yww_coach_role "Founder & Coach" \
  yww_coach_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000" \
  yww_coach_order "1"

create_post yww_coach "Liene Molendijk" \
  yww_coach_bio "Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk. Daarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals." \
  yww_coach_role "Coach & Trainer" \
  yww_coach_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000" \
  yww_coach_order "2"

# ─── TESTIMONIALS ───
echo "Seeding testimonials..."

create_post yww_testimonial "Kim Dingelhoff" \
  yww_testimonial_name "Kim Dingelhoff" \
  yww_testimonial_date_label "Deelnemer oktober 2025" \
  yww_testimonial_quote "De retraite onder begeleiding van Ella en Liene was ontzettend waardevol. Ik heb diepgaande inzichten gekregen in wie ik ben, wat mij drijft en welke stappen ik nu kan zetten, zowel op persoonlijk als op werkvlak. De combinatie van lichaamsgerichte oefeningen en verdiepende gesprekken zorgde voor een perfecte balans tussen voelen en reflecteren. Er hing een warme, veilige sfeer waarin iedereen echt zichzelf kon zijn. Daarnaast raakte ik geïnspireerd door de andere vrouwen; hun verhalen en energie gaven me nieuwe perspectieven en motivatie. Deze retraite heeft me niet alleen dichter bij jezelf gebracht, maar ook helderheid gegeven over mijn volgende stappen." \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa458d3081062459fb8afe9ebe8a4ac0e?format=webp&width=800" \
  yww_testimonial_order "1"

create_post yww_testimonial "Julia Weekenstro" \
  yww_testimonial_name "Julia Weekenstro" \
  yww_testimonial_date_label "Deelnemer Oktober 2025" \
  yww_testimonial_quote "Wauw wat een prachtige ervaring heb ik gehad tijdens het Young Wise Women Retreat! Zowel op cognitief niveau als gevoelsniveau hebben we samen een heel mooie reis mogen maken in onze ontwikkeling. Vooral dat samen aangaan, met de andere vrouwen, heeft me veel gebracht. Zo mooi en betekenisvol hoe we elkaar echt konden inspireren en helpen. Grote complimenten richting de trainers Ella en Liene en de host Esther die dit hebben gefaciliteerd. Op een prachtige plek in de natuur waar ik me al meteen heel veilig en thuis voelde. Ik gun elke vrouw zo een betekenisvol en verbindend weekend." \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F7895d36c45374c71a02e2f8dae447dda?format=webp&width=800" \
  yww_testimonial_order "2"

create_post yww_testimonial "Lisanne de Moel" \
  yww_testimonial_name "Lisanne de Moel" \
  yww_testimonial_date_label "Deelnemer Januari 2025" \
  yww_testimonial_quote "Een heel fijn weekend gehad op de boerderij in Friesland. Wat is het leuk om een weekend te spenderen met allemaal vrouwen die elkaar aanmoedigen en van wie je kan leren. Ik vond het een hele waardevolle ervaring, waarbij je echt even tijd voor jezelf mag en kan nemen. Ella en Karin stelden de juiste vragen, waardoor je interessante inzichten over jezelf doet." \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F8bd83a1cca6e455095fbc2cce26f0452?format=webp&width=800" \
  yww_testimonial_order "3"

create_post yww_testimonial "Melanie de Reus" \
  yww_testimonial_name "Melanie de Reus" \
  yww_testimonial_date_label "Deelnemer September 2023" \
  yww_testimonial_quote "Een weekend waarbij je in alle rust kan reflecteren op je leven en nieuwe inzichten over jezelf kan op doen, gesteund door andere mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen leren en elkaar mogen helpen. Ontzettend mooie en waardevolle inzichten op gedaan!" \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fc5eef54d11c9437abf49ea4fe7b69596?format=webp&width=800" \
  yww_testimonial_order "4"

create_post yww_testimonial "Aïsha Lankhorst" \
  yww_testimonial_name "Aïsha Lankhorst" \
  yww_testimonial_date_label "Deelnemer Januari 2025" \
  yww_testimonial_quote "Ik heb een superfijn weekend gehad met de coaches en de andere meiden in een geweldig huis in de natuur in Friesland. De sfeer was zo veilig en warm, er werd echt naar elkaar geluisterd. We hebben veel van Karen en Ella geleerd, maar ook van elkaar als groep. Ik heb echt het gevoel dat ik weer een stapje verder kan zetten, zowel op persoonlijk als op professioneel vlak. Wat ik ook erg waardeerde was dat er naast alle diepe en mooie gespreken veel ruimte was voor luchtigheid en gezelligheid met elkaar. Ik kan dit retreat echt aanraden, want de inzichten en ervaringen die ik heb opgedaan, neem ik voor de rest van mijn leven mee." \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fb56ba9e008fe487cbc9f8dae8d42a849?format=webp&width=800" \
  yww_testimonial_order "5"

create_post yww_testimonial "Marina Feyz" \
  yww_testimonial_name "Marina Feyz" \
  yww_testimonial_date_label "Deelnemer September 2023" \
  yww_testimonial_quote "Ik heb er geen andere woorden voor dan echt geweldig! Ondanks dat ik de andere meiden van tevoren niet kende, voelde het vrijwel direct zo vertrouwd en zo warm. Ik had het gevoel dat iedereen helemaal zichzelf kon zijn en er een hele veilige omgeving was om je kwetsbaar op te stellen. Zowel Ella als Wineke zijn beiden prachtige vrouwen die mij nieuwe inzichten hebben gegeven, die ik tot op de dag vandaag nog steeds toepas. Wat vullen jullie elkaar goed aan! En dat allemaal in een prachtige omgeving in de natuur. Ik had niet meer kunnen wensen. Onwijs dankbaar voor deze onvergetelijke ervaring." \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F6a36df5bf8b047eaafd0b1579b1fcf62?format=webp&width=800" \
  yww_testimonial_order "6"

create_post yww_testimonial "Julia" \
  yww_testimonial_name "Julia" \
  yww_testimonial_date_label "Deelnemer September 2023" \
  yww_testimonial_quote "Het young wise women retreat was een hele fijne en leerzame ervaring. Vol oefeningen maar ook ruimte voor eigen ideeen. De begeleiding van Ella en Wineke is professioneel en duidelijk, waar zowel lichaam en geest aan bod komen. Ik heb zo veel inspiratie en wijsheid gehaald uit hun oefeningen en ideeen, maar ook uit de verhalen van andere deelnemers. Het is niet erg als je niet met een specifieke leervraag naar dit weekend komt, zie het als een jaarlijkse APK van je mentale gezondheid. Heel erg waardevol!" \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Ff29681ec3e8841db98437ca5e7175eb1?format=webp&width=800" \
  yww_testimonial_order "7"

create_post yww_testimonial "Julia Bleeker" \
  yww_testimonial_name "Julia Bleeker" \
  yww_testimonial_date_label "Deelnemer September 2023" \
  yww_testimonial_quote "Het retreat was voor mij een ontzettend fijn en betekenisvol weekend. Door middel van opdrachten en verbindende gesprekken, heb ik in een veilige en rustige setting veel helderheid en inzicht gekregen in mijn behoeftes en talenten. We waren midden in de natuur en alles werd voor ons verzorgd. Naast dat ik het fijn vond met de andere meiden in de groep, heb ik veel geleerd wat ik kan toepassen in de keuzes voor jezelf en in mijn werk." \
  yww_testimonial_image "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fbdc3b23ee87f40b48865669c690e579d?format=webp&width=800" \
  yww_testimonial_order "8"

# ─── PODCASTS ───
echo "Seeding podcasts..."

create_post yww_podcast "Episode 1" \
  yww_podcast_duration "00:00" \
  yww_podcast_date "2026-02-15" \
  yww_podcast_guest "" \
  yww_podcast_thumbnail "" \
  yww_podcast_youtube_url "https://www.youtube.com/watch?v=l5WYmKOh6TI&t=3s" \
  yww_podcast_spotify_url ""

create_post yww_podcast "Episode 2" \
  yww_podcast_teaser "Korte teaser (1 zin) over deze aflevering." \
  yww_podcast_duration "00:00" \
  yww_podcast_date "2026-02-15" \
  yww_podcast_guest "" \
  yww_podcast_thumbnail "" \
  yww_podcast_youtube_url "https://www.youtube.com/watch?v=oodyR6UYDBY" \
  yww_podcast_spotify_url ""

create_post yww_podcast "Episode 3" \
  yww_podcast_teaser "Korte teaser (1 zin) over deze aflevering." \
  yww_podcast_duration "00:00" \
  yww_podcast_date "2026-02-15" \
  yww_podcast_guest "" \
  yww_podcast_thumbnail "" \
  yww_podcast_youtube_url "" \
  yww_podcast_spotify_url ""

create_post yww_podcast "Episode 4" \
  yww_podcast_teaser "Korte teaser (1 zin) over deze aflevering." \
  yww_podcast_duration "00:00" \
  yww_podcast_date "2026-02-15" \
  yww_podcast_guest "" \
  yww_podcast_thumbnail "" \
  yww_podcast_youtube_url "" \
  yww_podcast_spotify_url ""

create_post yww_podcast "Episode 5" \
  yww_podcast_teaser "Korte teaser (1 zin) over deze aflevering." \
  yww_podcast_duration "00:00" \
  yww_podcast_date "2026-02-15" \
  yww_podcast_guest "" \
  yww_podcast_thumbnail "" \
  yww_podcast_youtube_url "" \
  yww_podcast_spotify_url ""

create_post yww_podcast "Episode 6" \
  yww_podcast_teaser "Korte teaser (1 zin) over deze aflevering." \
  yww_podcast_duration "00:00" \
  yww_podcast_date "2026-02-15" \
  yww_podcast_guest "" \
  yww_podcast_thumbnail "" \
  yww_podcast_youtube_url "" \
  yww_podcast_spotify_url ""

# ─── BLOGS ───
echo "Seeding blogs..."

create_blog "De Motivation Factor als Tool voor Richting" \
  "Hoe je met de Motivation Factor helder krijgt wat je energie geeft, waar je op leegloopt en welke keuzes beter bij je passen." \
  "motivation-factor" \
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop"

create_blog "Persoonlijke Groei in de Praktijk: Voorbeelden" \
  "Concrete voorbeelden van vrouwen die stappen zetten in grenzen aangeven, focus hervinden en met meer rust presteren." \
  "persoonlijke-groei" \
  "/persoonlijke-groei-training.jpg"

create_blog "Vrouwelijk Leiderschap: Zichtbaar en Authentiek" \
  "Wat vrouwelijk leiderschap vandaag vraagt, en hoe je met vertrouwen positie inneemt zonder jezelf kwijt te raken." \
  "vrouwelijk-leiderschap" \
  "/vrouwelijk-leiderschap-training.webp"

# ─── EVENTS ───
echo "Seeding events..."

create_post yww_event "Terugkom dag" \
  yww_event_label "Terugkom dag" \
  yww_event_type "terugkom-dag" \
  yww_event_year "2026" \
  yww_event_month "2" \
  yww_event_start_date "2026-02-15T09:00:00.000Z" \
  yww_event_end_date "" \
  yww_event_description "Terugkomdag om te reflecteren, ervaringen te delen en je volgende stap scherp te maken."

create_post yww_event "Groep weekend training juni" \
  yww_event_label "Groep weekend training" \
  yww_event_type "weekend-training" \
  yww_event_year "2026" \
  yww_event_month "6" \
  yww_event_start_date "2026-06-24T17:30:00.000Z" \
  yww_event_end_date "2026-06-26T16:00:00.000Z" \
  yww_event_description "Intensieve weekend training met verdieping, groepsreflectie en praktische tools."

create_post yww_event "Groep weekend training oktober" \
  yww_event_label "Groep weekend training" \
  yww_event_type "weekend-training" \
  yww_event_year "2026" \
  yww_event_month "10" \
  yww_event_start_date "2026-10-16T17:30:00.000Z" \
  yww_event_end_date "2026-10-18T16:00:00.000Z" \
  yww_event_description "Vervolgweekend met verdieping, integratie en praktische tools voor je volgende stap."

# ─── PAGES ───
echo "Seeding pages..."

$WP post create --post_type=page --post_title="Home" --post_name="home" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Home"

$WP post create --post_type=page --post_title="Weekenden" --post_name="weekenden" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Weekenden"

$WP post create --post_type=page --post_title="Weekend Intensive" --post_name="weekend-intensive" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Weekend Intensive"

$WP post create --post_type=page --post_title="Workshops" --post_name="workshops" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Workshops"

$WP post create --post_type=page --post_title="Ons Verhaal" --post_name="ons-verhaal" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Ons Verhaal"

$WP post create --post_type=page --post_title="Contact" --post_name="contact" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Contact"

$WP post create --post_type=page --post_title="Voor Organisaties" --post_name="voor-organisaties" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Voor Organisaties"

$WP post create --post_type=page --post_title="Kalender" --post_name="kalender" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Kalender"

$WP post create --post_type=page --post_title="Lid Worden" --post_name="lid-worden" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Lid Worden"

$WP post create --post_type=page --post_title="Retreats" --post_name="retreats" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Retreats"

$WP post create --post_type=page --post_title="Losse Workshops" --post_name="losse-workshops" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Losse Workshops"

$WP post create --post_type=page --post_title="Jaarprogrammas" --post_name="jaarprogrammas" --post_status=publish --porcelain 2>/dev/null
echo "  ✓ Jaarprogrammas"

# ─── WORKSHOPS ───
echo "Seeding workshops..."

create_post yww_workshop "Female leadership workshop" \
  yww_workshop_subtitle "Leidinggeven vanuit authenticiteit" \
  yww_workshop_next_date "20 maart 2026" \
  yww_workshop_from_price "EUR 245" \
  yww_workshop_duration "09:30 - 17:00" \
  yww_workshop_location "Castricum" \
  yww_workshop_audience "Jonge vrouwelijke professionals (24+)" \
  yww_workshop_order "1"

create_post yww_workshop "Workshop vitaliteit" \
  yww_workshop_subtitle "Energie en balans vinden" \
  yww_workshop_next_date "15 april 2026" \
  yww_workshop_from_price "EUR 215" \
  yww_workshop_duration "09:30 - 17:00" \
  yww_workshop_location "Amsterdam" \
  yww_workshop_audience "Jonge vrouwelijke professionals (24+)" \
  yww_workshop_order "2"

create_post yww_workshop "Workshop mentale weerbaarheid" \
  yww_workshop_subtitle "Sterker omgaan met stress en druk" \
  yww_workshop_next_date "10 mei 2026" \
  yww_workshop_from_price "EUR 225" \
  yww_workshop_duration "09:30 - 17:00" \
  yww_workshop_location "Utrecht" \
  yww_workshop_audience "Jonge vrouwelijke professionals (24+)" \
  yww_workshop_order "3"

create_post yww_workshop "Workshop persoonlijke effectiviteit" \
  yww_workshop_subtitle "Focus en doelgerichtheid vergroten" \
  yww_workshop_next_date "7 juni 2026" \
  yww_workshop_from_price "EUR 235" \
  yww_workshop_duration "09:30 - 17:00" \
  yww_workshop_location "Rotterdam" \
  yww_workshop_audience "Jonge vrouwelijke professionals (24+)" \
  yww_workshop_order "4"

# ─── FAQ ───
echo "Seeding FAQ items..."

create_post yww_faq "Kan ik de training vergoed krijgen via mijn werkgever?" \
  yww_faq_answer "Ja, de training is vergoed via het opleidingsbudget van je werkgever. Vraag naar de mogelijkheden bij je HR-afdeling." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "1"

create_post yww_faq "Voor wie is dit weekend bedoeld?" \
  yww_faq_answer "Dit weekend is speciaal ontworpen voor jonge vrouwen tussen de 24 en 35 jaar die willen groeien en zich verder willen ontwikkelen." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "2"

create_post yww_faq "Wat als ik nog nooit zoiets heb gedaan?" \
  yww_faq_answer "Geen ervaring nodig! Dit weekend is perfect voor iedereen, ongeacht of je wel of niet eerder aan retreats hebt deelgenomen." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "3"

create_post yww_faq "Hoeveel deelneemsters zijn er per weekend?" \
  yww_faq_answer "We werken met groepen van maximaal 15-20 vrouwen om een intieme en veilige omgeving te creëren." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "4"

create_post yww_faq "Waar vindt het weekend plaats?" \
  yww_faq_answer "Onze weekenden vinden plaats op mooie, rustieke locaties in Nederland, meestal in de buurt van Friesland of Noord-Holland." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "5"

create_post yww_faq "Wat is inbegrepen bij de prijs?" \
  yww_faq_answer "De prijs omvat accommodatie, alle maaltijden, training en materialen. Alleen je aankomst/vertrek is niet inbegrepen." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "6"

create_post yww_faq "Is er een terugkomdag?" \
  yww_faq_answer "Ja, we organiseren regelmatig terukomdag in kleine groepen zodat je jouw ervaringen kunt delen en verder kunt groeien." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "7"

create_post yww_faq "Kan ik annuleren?" \
  yww_faq_answer "Ja, annuleringen kunnen tot 4 weken voor het weekend plaatsvinden met volledige restitutie van je betaling." \
  yww_faq_page "weekend-intensive" \
  yww_faq_order "8"

# ─── OPTIONS ───
echo "Seeding global options..."
$WP option update yww_footer_about "Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft, verstevig je koers en groei met gelijkgestemde vrouwen." 2>/dev/null
$WP option update yww_contact_email "info@youngwisewomen.nl" 2>/dev/null
$WP option update yww_contact_phone "+31 (0)6 55334728" 2>/dev/null
$WP option update yww_social_instagram "http://instagram.com/youngwisewomen" 2>/dev/null
echo "  ✓ Global options set"

echo ""
echo "Seeding complete!"
echo ""
