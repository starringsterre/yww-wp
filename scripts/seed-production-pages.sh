#!/bin/bash
# Seed page content to Cloud86 production via REST API
# Usage: bash scripts/seed-production-pages.sh
#
# Uses the WP REST API with Application Password to update yww_page_content meta
# on all production pages that have different slugs than local.

API_BASE="https://cms.youngwisewomen.nl/wp-json/wp/v2/pages"
AUTH="admin:pii6 a7Lv T0ZU gQNB Qj8o Jslq"

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

echo ""
echo "=== Seeding YWW Production Pages ==="
echo ""

# Create temp dir for JSON payloads
TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

# ── RETREATS (productie slug: groepstrainingen, page ID 28) ──
cat > "$TMPDIR/retreats.json" << 'JSONEOF'
{
  "hero_title": "Persoonlijke ontwikkeling & groei",
  "hero_subtitle": "Trainingen en Workshops voor jonge carrière-gedreven vrouwen",
  "intro_text": "Persoonlijke Ontwikkeling trainingen & Workshops\n\nDeze pagina is voor particulieren: jonge vrouwen die willen groeien in energie, richting en zelfvertrouwen via onze workshops en weekend trainingen.",
  "card_1_title": "Weekend Trainingen",
  "card_1_text": "2-daagse weekend intensive in Friesland, gericht op verdieping, reflectie en duurzame gedragsverandering voor deelnemers die bewust tijd willen nemen voor persoonlijke ontwikkeling.",
  "card_2_title": "Dag Workshops",
  "card_2_text": "1-daagse workshop waarin je direct werkt aan praktische tools voor energie, focus en richting in werk en leven, toegankelijk en direct toepasbaar in je dagelijks leven."
}
JSONEOF

seed_page 28 "groepstrainingen (→retreats)" "$TMPDIR/retreats.json"

# ── WEEKENDEN (productie slug: persoonlijke-ontwikkeling-weekend-training, page ID 30) ──
cat > "$TMPDIR/weekenden.json" << 'JSONEOF'
{
  "hero_title": "Weekend trainingen",
  "hero_subtitle": "Meerdaagse training voor jonge vrouwen die willen vertragen, verdiepen en duurzaam groeien.",
  "intro_heading": "Weekend training persoonlijke ontwikkeling voor vrouwelijke professionals",
  "intro_text_1": "Deze weekend training persoonlijke ontwikkeling is een concreet programma voor ambitieuze business women en vrouwelijke professionals van 24 tot 29 jaar die willen groeien met focus en richting. Tijdens dit persoonlijke ontwikkeling weekend volg je een persoonlijke ontwikkeling training waarin coaching persoonlijke ontwikkeling, praktijkgerichte oefeningen en een leiderschap training samenkomen.",
  "intro_text_2": "Je werkt aan heldere keuzes, sterker gedrag en directe toepassing in werk en prive. Zoek je een persoonlijke ontwikkeling cursus en training vrouwen met duidelijke resultaten, dan kun je je nu inschrijven voor de eerstvolgende editie.",
  "intro_cta": "Schrijf me in voor de eerstvolgende training",
  "pillars_heading": "De Drie Pijlers van de Weekend Training",
  "pillars_intro": "Het fundament van onze weekend trainingen rust op drie kernpijlers die samen zorgen voor een diepgaande transformatie.",
  "pillar_1_title": "Reflectie",
  "pillar_1_text": "De ideale omgeving voor reflectie op je persoonlijke doelen, je patronen, je (betekenvolle) werk en je eigen energiehuishouding. Met behulp van een werkboek en trainingen gaan we diep in op wat je echt wilt en wat je tegenhoudt.",
  "pillar_2_title": "Rust & Ruimte",
  "pillar_2_text": "Ervaar de rust en ruimte op een prachtige locatie in een vakantiehuis in Friesland, samen met een groep gelijkgestemde jonge professionals (24-29). Alles is voor je geregeld, zodat je je volledig op jezelf en de groep kunt concentreren.",
  "pillar_3_title": "Inspiratie & Nieuwe Tools",
  "pillar_3_text": "Een intensieve weekend training waarin je een nieuwe kijk op jezelf krijgt, je ervaringen en inzichten deelt, en praktische tools krijgt aangereikt voor nu en je toekomst.",
  "gallery_heading": "Beleef de Weekend Training",
  "gallery_subtitle": "Een blik op de ervaring van vorige edities",
  "for_whom_heading": "Voor wie zijn onze trainingen",
  "for_whom_intro": "Dit programma is speciaal ontworpen voor jonge professionals (24-29) die:",
  "for_whom_1": "Op zoek zijn naar meer betekenis in hun werk en leven",
  "for_whom_2": "Ruimte nodig hebben om stil te staan bij hun doelen en praktische tools zoeken voor hun leven en werk",
  "for_whom_3": "Willen groeien met steun van een groep gelijkgestemde vrouwen",
  "for_whom_4": "Persoonlijke groei en ontwikkeling willen ervaren",
  "edition_label": "4DE EDITIE",
  "edition_heading": "Young Wise Women Weekend Intensive",
  "edition_subtitle": "Reflectie, Rust & Ruimte: een meerdaagse training voor persoonlijke ontwikkeling",
  "edition_dates": "24 - 26 juni 2026",
  "edition_times": "Vrijdag 17:30 uur tot Zondag 16:00 uur",
  "edition_next_date": "Daarna: 16 - 18 oktober 2026",
  "edition_location": "Prachtige Vakantiehuis in de Natuur aan het water",
  "edition_location_detail": "Oudega, Friesland",
  "edition_audience": "Voor Jonge Professional Vrouwen (24-29)",
  "edition_availability": "Beperkte plaatsen beschikbaar",
  "program_heading": "Programmaoverzicht",
  "day_1_label": "Dag 1 - Vrijdag",
  "day_1_text": "Aankomst vanaf 17:30 uur • Kennismaking met de andere vrouwen • Bespreken van bevindingen uit Motivation Factor test • Avondwandeling of rust • Deelronde, reflectiemomenten en ademsessie voor een goede nachtrust",
  "day_2_label": "Dag 2 - Zaterdag",
  "day_2_text": "Ochtend: yogasessie of fysieke activiteit • Ontbijt • Verlangens (zakelijk en prive): richting vinden, omgaan met twijfel en heldere keuzes maken • Lunch • Werken aan beperkende overtuigingen en blokkades; mentale en fysieke loslating • 1-op-1 coaching • Reflectiemomenten en rust • Avond: deelronde buiten bij het vuur",
  "day_3_label": "Dag 3 - Zondag",
  "day_3_text": "Ochtend: fysieke activiteit (yoga/wandeling/energetisch lichaamswerk) • Ontbijt • Loslaten van niet-dienende zaken; manifesteren van verlangens met Motivation Factor werkboek • Lunch • Middag: afsluiting met een spel om energie, vertrouwen en focus te brengen • Vertrek rond 17:00 uur",
  "location_heading": "Op een inspirerende locatie in Nederland",
  "location_text": "Veel van onze weekend trainingen vinden plaats in het prachtige Friesland",
  "transform_heading": "Jouw Transformatie",
  "goodbye_heading": "Waar je Afscheid van Neemt",
  "goodbye_1": "Zeg vaarwel aan je 'please-gedrag' - jezelf voortdurend aanpassen en moeten voldoen aan standaarden en verwachtingen.",
  "takeaway_heading": "Wat je Meeneemt",
  "takeaway_1": "Persoonlijke groei - of je nu net een zaadje plant of al als een stevige boom staat, je maakt altijd een volgende stap in je ontwikkeling.",
  "takeaway_2": "Eigen wijsheid - de andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt jezelf en je innerlijke wijsheid volledig te omarmen.",
  "takeaway_3": "Nieuwe energie en motivatie - thema's die al langer in je leven spelen, worden helderder. Je voelt richting, duidelijkheid én de drive om in beweging te komen.",
  "nextstep_heading": "Jouw Volgende Stap",
  "nextstep_text": "Kies nu voor betekenisvol, vitaal en gelukkig leven en werken en word die geweldige vrouw die je bedoeld bent te zijn. Niet door harder te werken of te doen wat anderen doen, maar je eigen unieke koers te volgen en bewuste keuzes te maken.",
  "breathwork_heading": "De balans tussen denken en voelen",
  "breathwork_subtitle": "In het weekend combineren we mentale verdieping met lichaamswerk, zodat je niet alleen begrijpt wat je wilt veranderen, maar het ook echt voelt en belichaamt.",
  "breathwork_benefits": "✓ Meer rust in je hoofd en zenuwstelsel\n✓ Sneller herkennen van spanning en patronen\n✓ Direct toepasbare ademtools voor dagelijks leven",
  "yoga_heading": "Yogalessen",
  "yoga_subtitle": "Gegeven door Liene Molendijk, coach met expertise in psychologie, leiderschap en lichaamsgerichte ontwikkeling.",
  "yoga_benefits": "✓ Van overdenken naar aanwezig zijn in je lichaam\n✓ Meer focus, zachtheid en zelfregie\n✓ Een stevigere verbinding met je authenticiteit",
  "highlight_heading": "Weekend Trainingen",
  "highlight_when": "Op vrijdag vanaf 17:30 tot zondag 16:00",
  "highlight_where": "Prachtige Vakantiehuis in de Natuur aan het water",
  "highlight_audience": "Voor Jonge Professional Vrouwen (24-29)",
  "highlight_capacity": "Beperkt plek voor 8 vrouwen",
  "highlight_inclusions": "✓ Voorafgaande online intake met coach\n✓ Motivation Factor test (t.w.v. €145)\n✓ Professionele begeleiding van 2 coaches\n✓ Ademsessie (breathwork) met Chris Rauwendaal\n✓ Yogalessen\n✓ 2 nachten accommodatie\n✓ Alle maaltijden en dranken\n✓ Werkboek en praktische tools",
  "highlight_program_heading": "Programma: Persoonlijke groei & authenticiteit",
  "highlight_day_1": "Dag 1 vrijdag",
  "highlight_day_2": "Dag 2 zaterdag",
  "highlight_day_3": "Dag 3 zondag"
}
JSONEOF

seed_page 30 "persoonlijke-ontwikkeling-weekend-training (→weekenden)" "$TMPDIR/weekenden.json"

# ── WEEKEND-INTENSIVE (productie slug: weekend-intensive-juni-2026, page ID 31) ──
cat > "$TMPDIR/weekend-intensive.json" << 'JSONEOF'
{
  "hero_title": "Persoonlijke Ontwikkeling Training voor Vrouwen – Weekend Intensive juni 2026",
  "hero_subtitle": "Gericht op jonge vrouwelijke professionals (24–29 jaar) die willen groeien in rust, richting en leiderschap.",
  "intro_heading": "Persoonlijke ontwikkeling training voor vrouwen in Nederland",
  "intro_text": "Deze persoonlijke ontwikkeling training voor vrouwen combineert coaching, reflectie en lichaamswerk in een kleinschalige setting in Nederland. Tijdens dit trainingsweekend werk je aan rust in je hoofd, helderheid in je keuzes en zichtbaar leiderschap in je werk en leven. Je vertrekt met concrete stappen die je direct toepast in je dagelijkse praktijk.",
  "when_label": "Wanneer",
  "when_text": "Van 24 juni 17:30 t/m 26 juni 16:00 (2026)",
  "where_label": "Waar",
  "where_text": "Oudega, Friesland (natuur en water)",
  "group_label": "Groep",
  "group_text": "Maximaal 8 deelneemsters",
  "rooms_label": "Kamers",
  "rooms_text": "4 slaapkamers, bedden kunnen uit elkaar",
  "additional_text": "Weekenden op aanvraag zijn beschikbaar voor groepen young professionals. Bekijk de mogelijkheden op de bedrijfspagina.",
  "video_heading": "Hoe andere deelneemsters het ervaren:",
  "about_heading": "Over dit evenement",
  "about_text_1": "Je stapt drie dagen uit je dagelijkse ritme om opnieuw contact te maken met wat voor jou klopt. Met coaching, reflectie, ademwerk en beweging werk je aan duurzame verandering die je na het weekend direct toepast.",
  "about_text_2": "Dit weekend is bewust kleinschalig: 8 deelneemsters, 4 slaapkamers, en een setting waarin veiligheid, diepte en praktische vertaling centraal staan.",
  "for_whom_heading": "Voor wie is dit weekend bedoeld?",
  "for_whom_items": "Voor jonge vrouwelijke professionals die persoonlijk en professioneel willen doorgroeien.\nVoor vrouwen die veel dragen, maar worstelen met stress, twijfel of het stellen van grenzen.\nVoor deelnemers die verlangen naar meer rust, richting, zelfvertrouwen en regie.\nVoor wie na het weekend met concrete inzichten en direct toepasbare acties naar huis wil.",
  "results_heading": "Wat levert deze training je op?",
  "results_items": "Meer richting in je werk en persoonlijke keuzes.\nHeldere grenzen communiceren zonder schuldgevoel.\nSterker en rustiger leiderschap in uitdagende situaties.\nMeer energie door betere balans tussen inspanning en herstel.\nDuidelijkheid over wat nu echt belangrijk is en wat je loslaat.\nEen concreet actieplan voor de eerste 30 dagen na het weekend.",
  "included_heading": "Wat is inbegrepen?",
  "included_items": "Intake vantevoren met de coach om je behoeftes in kaart te brengen\nMotivation Factor self-assessment ter waarde van €145\nPersoonlijke professionele begeleiding van twee coaches\nCatering verzorgd met ontbijt, lunch, diner en versnaperingen\n2 nachten accommodatie in een prachtig huis in Nederland, in comfortabele tweepersoonskamers met losse bedden",
  "caption_1": "Vertragen, voelen en richting kiezen.",
  "caption_2": "Van inzicht naar concreet gedrag in werk en leven.",
  "book_heading": "Boek jouw plek",
  "book_text": "Klaar om je plek te reserveren voor dit trainingsweekend voor vrouwen in Nederland?",
  "book_cta": "Ga naar Inquire now",
  "faq_heading": "Veelgestelde vragen over persoonlijke ontwikkeling trainingen voor vrouwen",
  "availability_label": "Beschikbaarheid",
  "availability_text": "3 van 8",
  "availability_note": "Nog 5 plekken beschikbaar op dit moment.",
  "package_1_title": "Betaald vanuit je werkgever",
  "package_1_subtitle": "Je eenmalige investering",
  "package_1_price": "€ 1.450",
  "package_1_note": "excl. BTW",
  "package_2_title": "Samen met een vriendin/collega*",
  "package_2_subtitle": "Per persoon: werkgeverstarief met 10% korting.",
  "package_2_price": "€ 1.305 p.p.",
  "package_2_note": "excl. BTW",
  "package_3_title": "Particulier solo reis",
  "package_3_subtitle": "Uitzonderingsroute: een gereduceerd particulier tarief voor wie niet via werkgever kan deelnemen.",
  "package_3_price": "Prijs in overleg",
  "package_3_note": "Beperkt beschikbaar als uitzondering.",
  "form_heading": "Laat je gegevens achter",
  "success_title": "Success! Heel erg bedankt voor je aanmelding.",
  "success_text": "We nemen zo snel mogelijk contact met je op.",
  "success_signature": "Hartelijke groet, Ella",
  "sidebar_benefit_1": "Binnen 1 werkdag reactie op je aanvraag",
  "sidebar_benefit_2": "Inclusief ademwerk en yogalessen",
  "related_heading": "Lees ook"
}
JSONEOF

seed_page 31 "weekend-intensive-juni-2026 (→weekend-intensive)" "$TMPDIR/weekend-intensive.json"

# ── WORKSHOPS (productie slug: ontwikkeling-workshops, page ID 29) ──
cat > "$TMPDIR/workshops.json" << 'JSONEOF'
{
  "hero_title": "Dag workshops",
  "hero_subtitle": "Praktische groepsworkshops voor jonge professionals die willen groeien in focus, energie en leiderschap.",
  "transform_heading": "Jouw Transformatie",
  "goodbye_heading": "Waar je Afscheid van Neemt",
  "goodbye_text": "Je laat overbelasting, twijfel en continue aanpassing los, zodat je met meer rust en focus keuzes maakt.",
  "takeaway_heading": "Wat je Meeneemt",
  "takeaway_text": "Praktische handvatten, meer energie en heldere prioriteiten die je direct toepast in werk en dagelijks leven.",
  "nextstep_heading": "Jouw Volgende Stap",
  "nextstep_text": "Je gaat naar huis met een concreet actieplan, zodat je ontwikkeling na de workshop direct doorloopt.",
  "for_whom_heading": "Voor wie zijn onze workshops",
  "for_whom_intro": "Deze workshops zijn speciaal ontworpen voor jonge professionals (24+) die:",
  "for_whom_items": "Op zoek zijn naar meer betekenis in werk en leven\nPraktische tools zoeken voor focus, rust en richting\nWillen groeien met steun van een groep gelijkgestemde vrouwen\nPersoonlijke groei en ontwikkeling willen ervaren",
  "sidebar_what_heading": "Wat je krijgt",
  "sidebar_what_items": "Praktische handvatten die direct toepasbaar zijn\nPersoonlijke reflectie-oefeningen en werkmateriaal\nFeedback van coaches en de groep\nConcreet actieplan voor de weken erna",
  "sidebar_practical_heading": "Praktisch",
  "sidebar_practical_items": "Tijd: 09:30 - 17:00\nLocatie: Castricum\nGroepsgrootte: 10 tot 14 deelnemers\nInclusief lunch, koffie, thee en werkmateriaal",
  "sidebar_not_for_heading": "Voor wie niet",
  "sidebar_not_for_items": "Als je alleen theorie wilt zonder oefenen\nAls je geen ruimte hebt om te reflecteren\nAls je nu geen concrete verandering wilt maken"
}
JSONEOF

seed_page 29 "ontwikkeling-workshops (→workshops)" "$TMPDIR/workshops.json"

# ── VOOR-ORGANISATIES (productie slug: in-company, page ID 32) ──
cat > "$TMPDIR/voor-organisaties.json" << 'JSONEOF'
{
  "hero_title": "Bedrijfstrajecten",
  "hero_subtitle": "Het Netwerk voor jonge vrouwelijke professionals",
  "intro_heading": "Jaarprogramma voor jonge vrouwelijke professionals",
  "intro_text": "We begeleiden groepen jonge vrouwen een jaar lang met een combinatie van 1-op-1 coaching, groepssessies, een dag workshop en een weekend training (intensief). Zo bouwen zij rust, zelfvertrouwen en leiderschap op dat direct impact heeft op werk en welzijn.",
  "brands_heading": "talent uit deze organisaties ontwikkelde zich via YWW",
  "program_heading": "Wat zit er in het programma",
  "program_1_title": "1-op-1 coaching",
  "program_1_text": "Persoonlijke begeleiding op thema's als energie, grenzen, loopbaanrichting en persoonlijk leiderschap.",
  "program_2_title": "Groepssessies",
  "program_2_text": "Interactieve sessies waarin deelnemers van elkaar leren, samen reflecteren en eigenaarschap versterken.",
  "program_3_title": "Dag workshop",
  "program_3_text": "Een verdiepende dag buiten de dagelijkse werkcontext om focus, rust en richting terug te pakken.",
  "program_4_title": "Weekend training (intensief)",
  "program_4_text": "Een intensieve meerdaagse ervaring met ruimte voor reflectie, gedragsverandering en duurzame borging van inzichten.",
  "cta_heading": "Interesse in een programma op maat?",
  "cta_text": "We stemmen inhoud, ritme en groepsgrootte af op jullie organisatie.",
  "cta_button_1": "Plan een kennismaking",
  "cta_button_2": "Download brochure"
}
JSONEOF

seed_page 32 "in-company (→voor-organisaties)" "$TMPDIR/voor-organisaties.json"

# ── KALENDER (productie slug: evenementen, page ID 36) ──
cat > "$TMPDIR/kalender.json" << 'JSONEOF'
{
  "hero_title": "Evenementen Kalender",
  "hero_subtitle": "Volgende evenementen van het Young Wise Women Netwerk",
  "edition_label": "4DE EDITIE",
  "edition_heading": "Young Wise Women Weekend Intensive",
  "edition_subtitle": "Reflectie, Rust & Ruimte: een meerdaagse training voor persoonlijke ontwikkeling",
  "edition_dates": "24 - 26 juni 2026",
  "edition_times": "Vrijdag 17:30 uur tot Zondag 16:00 uur",
  "edition_next_date": "Daarna: 16 - 18 oktober 2026",
  "edition_location": "Prachtige Vakantiehuis in de Natuur aan het water",
  "edition_location_detail": "Oudega, Friesland",
  "edition_audience": "Voor Jonge Professional Vrouwen (24-29)",
  "edition_availability": "Beperkte plaatsen beschikbaar",
  "program_heading": "Programmaoverzicht",
  "day_1_label": "Dag 1 - Vrijdag",
  "day_1_text": "Aankomst vanaf 17:30 uur • Kennismaking met de andere vrouwen • Bespreken van bevindingen uit Motivation Factor test • Avondwandeling of rust • Deelronde, reflectiemomenten en ademsessie voor een goede nachtrust",
  "day_2_label": "Dag 2 - Zaterdag",
  "day_2_text": "Ochtend: yogasessie of fysieke activiteit • Ontbijt • Verlangens (zakelijk en privé): richting vinden, omgaan met twijfel en heldere keuzes maken • Lunch • Werken aan beperkende overtuigingen en blokkades; mentale en fysieke loslating • 1-op-1 coaching • Reflectiemomenten en rust • Avond: deelronde buiten bij het vuur",
  "day_3_label": "Dag 3 - Zondag",
  "day_3_text": "Ochtend: fysieke activiteit (yoga/wandeling/energetisch lichaamswerk) • Ontbijt • Loslaten van niet-dienende zaken; manifesteren van verlangens met Motivation Factor werkboek • Lunch • Middag: afsluiting met een spel om energie, vertrouwen en focus te brengen • Vertrek rond 17:00 uur",
  "investment_heading": "Eenmalige Investering in jezelf",
  "investment_via_employer_title": "Via Werkgever",
  "investment_price": "€1.450",
  "investment_price_note": "excl. BTW",
  "investment_employer_note": "Opleidingstarief voor inschrijvingen vergoed door je werkgever.",
  "results_heading": "Wat er jou oplevert",
  "result_1": "Persoonlijke groei – een volgende stap in je ontwikkeling",
  "result_2": "Eigen wijsheid – je worden uitgedaagd jezelf volledig te omarmen",
  "result_3": "Nieuwe energie – helderheid, richting en de drive om in beweging te komen",
  "inclusions_heading": "Wat is Inbegrepen",
  "inclusions": "Intake van tevoren met de coach om je behoeften in kaart te brengen\nMotivation Factor self-assessment ter waarde van €145\nPersoonlijke professionele begeleiding van twee coaches\nOntbijt, lunch, diner en versnaperingen\n2 nachten accommodatie in comfortabele tweepersoonskamers\nWerkboek en praktische tools voor je toekomst"
}
JSONEOF

seed_page 36 "evenementen (→kalender)" "$TMPDIR/kalender.json"

echo ""
echo "=== Done! ==="
echo ""
echo "Verifieer via: curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/pages/groepstrainingen | python3 -m json.tool | head -20"
