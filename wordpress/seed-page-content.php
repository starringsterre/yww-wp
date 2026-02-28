<?php
/**
 * Seed all page content fields with the current hardcoded React texts.
 * Usage: cd wordpress && php seed-page-content.php
 */

$_SERVER['REQUEST_METHOD'] = 'GET';
require_once __DIR__ . '/wp-load.php';

function seed_page($slug, $data) {
    $pages = get_posts([
        'post_type' => 'page',
        'name' => $slug,
        'posts_per_page' => 1,
        'post_status' => 'publish',
    ]);

    if (empty($pages)) {
        echo "  ✗ Page '$slug' not found\n";
        return;
    }

    $page = $pages[0];
    update_post_meta($page->ID, 'yww_page_content', wp_json_encode($data, JSON_UNESCAPED_UNICODE));
    echo "  ✓ $slug (" . count($data) . " velden)\n";
}

echo "\nSeeding page content...\n\n";

// ── HOME ──
seed_page('home', [
    'hero_title' => 'Young Wise Women',
    'hero_subtitle' => 'Het Netwerk voor jonge vrouwelijke professionals',
    'hero_video_url' => 'https://cdn.builder.io/o/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6a83a06db694d329132c995244a4ae5?alt=media&token=37e09b99-1fdb-4c85-a0ff-f319faa2bf31&apiKey=264b1b44affb4c70ba84c30b9a51f9df',
    'atmosphere_heading' => 'Evenementen voor persoonlijke ontwikkeling',
    'atmosphere_text' => 'Young Wise Women organiseert verschillende evenementen waarin jonge professionals (24+) samenkomen voor persoonlijke groei. Van meerdaagse retreats tot middagjes waar we verhalen en kennis uitwisselen - allemaal onder begeleiding en met gelijkgestemden die dezelfde waarden delen.',
    'atmosphere_cta' => 'Bekijk evenementen',
    'atmosphere_image_1' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fe09ac73d09854b79ab26b9a2f1b621b1?format=webp&width=4000',
    'atmosphere_image_2' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F359000dab9a94eb6b59fca5e2668ce4f?format=webp&width=4000',
    'atmosphere_image_3' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fba09bc28922e4f28ae356e7db1c5a2f4?format=webp&width=4000',
    'benefits_heading' => 'Wat Young Wise Women trajecten opleveren',
    'benefits_intro' => 'Of je nu kiest voor een workshop of weekendtraining: je ontwikkelt inzichten en tools die direct doorwerken in je werk en dagelijks leven.',
    'benefit_1_title' => 'Persoonlijke Groei',
    'benefit_1_text' => 'Of je nu net een zaadje plant of al als een stevige boom staat, je maakt altijd een volgende stap in je ontwikkeling',
    'benefit_2_title' => 'Eigen Wijsheid',
    'benefit_2_text' => 'De andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt jezelf en je innerlijke wijsheid volledig te omarmen',
    'benefit_3_title' => 'Energie & Motivatie',
    'benefit_3_text' => 'Je voelt richting, duidelijkheid en de drive om in beweging te komen',
    'benefit_4_title' => 'Praktische Handvatten',
    'benefit_4_text' => 'Nieuwe, praktische tools die je direct kunt toepassen in je leven en carrière',
    'trainingen_heading' => 'Weekend trainingen & Dag workshops',
    'trainingen_text' => 'Kies de vorm die past bij jouw ontwikkelvraag: verdieping in een weekend of direct toepasbare tools in een dagworkshop.',
    'trainingen_cta' => 'Meer over persoonlijke ontwikkeling',
    'trainingen_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1800',
    'coaches_heading' => 'Onze Coaches',
    'coaches_intro' => 'Ervaren en inspirerende trainers met jaren van praktijk en begeleiding',
    'coaches_text' => 'Onze coaches zijn ervaren en inspirerende vrouwen die zich volledig inzetten voor jouw persoonlijke groei. Met hun diepgaande kennis, warmte en betrokkenheid creëren zij een veilige ruimte waarin jij jezelf volledig mag zijn. Onder hun begeleiding ontdek je je innerlijke wijsheid en krijg je praktische tools mee voor je leven na het retreat.',
    'coaches_cta' => 'Lees ons unieke verhaal',
    'next_retreat_heading' => 'Volgende weekend intensive editie: 24-26 juni 2026',
    'next_retreat_date_text' => 'Weekend training (intensief)',
    'next_retreat_time' => 'Vrijdag 17:30 uur - Zondag 17:00 uur',
    'next_retreat_description' => 'Ervaar rust en ruimte op een prachtige locatie in de natuur, samen met gelijkgestemde jonge professionals (24-29).',
    'inclusions' => "✓ Intake met coach\n✓ Motivation Factor test (€145 waarde)\n✓ Professionele begeleiding van twee coaches\n✓ Ademsessie (breathwork) met Chris Rauwendaal\n✓ Yogalessen\n✓ 2 nachten accommodatie\n✓ Alle maaltijden en dranken\n✓ Werkboek en praktische tools",
    'investment_heading' => 'Investering in jezelf',
    'investment_price' => '€1450',
    'investment_note' => 'excl. BTW — Vergoed uit het opleidingstarief van je werkgever. Boek de training via het portaal.',
    'results_heading' => 'Wat er jou oplevert',
    'result_1' => 'Persoonlijke groei – een volgende stap in je ontwikkeling',
    'result_2' => 'Eigen wijsheid – je wordt uitgedaagd jezelf volledig te omarmen',
    'result_3' => 'Nieuwe energie & praktische tools – helderheid, richting en de drive om in beweging te komen',
    'bedrijf_heading' => 'Bedrijfstrajecten',
    'bedrijf_text' => 'Voor organisaties die jonge vrouwelijke professionals gericht willen laten groeien in leiderschap, energie en eigenaarschap.',
    'bedrijf_cta' => 'Bekijk bedrijfstrajecten',
    'bedrijf_image' => '/incompany-training-vrouw.png',
]);

// ── WEEKENDEN ──
seed_page('weekenden', [
    'hero_title' => 'Weekend trainingen',
    'hero_subtitle' => 'Meerdaagse training voor jonge vrouwen die willen vertragen, verdiepen en duurzaam groeien.',
    'hero_image' => 'https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg',
    'intro_heading' => 'Weekend training persoonlijke ontwikkeling voor vrouwelijke professionals',
    'intro_text_1' => 'Een weekend training is een meerdaagse training die plaatsvindt op een prachtige locatie in de natuur. Tijdens deze training werk je in een kleine groep (max 8 vrouwen) aan persoonlijke groei onder begeleiding van twee ervaren coaches. Het programma combineert gesprekken, coaching, ademwerk en yoga tot een transformatieve ervaring.',
    'intro_text_2' => 'De weekend trainingen zijn ontworpen voor jonge vrouwelijke professionals (24-29) die behoefte hebben aan verdieping, reflectie en praktische tools voor hun persoonlijke en professionele ontwikkeling.',
    'intro_cta' => 'Schrijf me in voor de eerstvolgende training',
    'pillars_heading' => 'De Drie Pijlers van de Weekend Training',
    'pillars_intro' => 'Het fundament van onze weekend trainingen rust op drie kernpijlers die samen zorgen voor een diepgaande transformatie.',
    'pillar_1_title' => 'Reflectie',
    'pillar_1_text' => 'Door middel van gesprekken, oefeningen en coaching krijg je inzicht in je patronen, drijfveren en waarden. Je ontdekt wat je echt belangrijk vindt en waar je naartoe wilt groeien.',
    'pillar_2_title' => 'Rust & Ruimte',
    'pillar_2_text' => 'We creëren bewust ruimte om tot stilstand te komen. In de natuur, weg van de dagelijkse drukte, vind je de rust om naar binnen te kijken en je eigen wijsheid te ontdekken.',
    'pillar_3_title' => 'Inspiratie & Nieuwe Tools',
    'pillar_3_text' => 'Je gaat naar huis met concrete, praktische tools die je direct kunt toepassen. Van ademtechnieken tot communicatievaardigheden – alles gericht op duurzame verandering.',
    'gallery_heading' => 'Beleef de Weekend Training',
    'gallery_subtitle' => 'Een blik op de ervaring van vorige edities',
    'gallery_images' => "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa07f32a91d3a47298e9d8f93c1ee532c?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F83bc1cad84b64bc5bf179476a883178b?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F1a42d8ce7d884dd285837d12b0b1ffb7?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0454f106b58340f2b1d9e58f52316087?format=webp&width=4000\nhttps://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6420ed9ac504161856d9dcfebc9cb02?format=webp&width=4000",
    'for_whom_heading' => 'Voor wie zijn onze trainingen',
    'for_whom_intro' => 'Dit programma is speciaal ontworpen voor jonge professionals (24-29) die:',
    'for_whom_1' => 'Op zoek zijn naar meer betekenis in hun werk en leven',
    'for_whom_2' => 'Ruimte nodig hebben om stil te staan bij hun doelen en praktische tools zoeken voor hun leven en werk',
    'for_whom_3' => 'Willen groeien met steun van een groep gelijkgestemde vrouwen',
    'for_whom_4' => 'Persoonlijke groei en ontwikkeling willen ervaren',
    'edition_label' => '4DE EDITIE',
    'edition_heading' => 'Young Wise Women Weekend Intensive',
    'edition_subtitle' => 'Reflectie, Rust & Ruimte: een meerdaagse training voor persoonlijke ontwikkeling',
    'edition_dates' => '24 - 26 juni 2026',
    'edition_times' => 'Vrijdag 17:30 uur tot Zondag 16:00 uur',
    'edition_next_date' => 'Daarna: 16 - 18 oktober 2026',
    'edition_location' => 'Prachtige Vakantiehuis in de Natuur aan het water',
    'edition_location_detail' => 'Oudega, Friesland',
    'edition_audience' => 'Voor Jonge Professional Vrouwen (24-29)',
    'edition_availability' => 'Beperkte plaatsen beschikbaar',
    'program_heading' => 'Programmaoverzicht',
    'day_1_label' => 'Dag 1 vrijdag',
    'day_1_text' => 'Aankomst, kennismaking, openingscirkel en eerste verdiepingssessie. Gezamenlijk diner en avondprogramma.',
    'day_1_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1600',
    'day_2_label' => 'Dag 2 zaterdag',
    'day_2_text' => 'Ochtendyoga, coaching sessies, ademwerk met Chris Rauwendaal, groepsoefeningen en avondreflectie.',
    'day_2_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=1600',
    'day_3_label' => 'Dag 3 zondag',
    'day_3_text' => 'Ochtendyoga, laatste verdiepingssessie, persoonlijk actieplan en sluitingscirkel.',
    'day_3_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=1600',
    'location_heading' => 'Op een inspirerende locatie in Nederland',
    'location_text' => 'Veel van onze weekend trainingen vinden plaats in het prachtige Friesland',
    'location_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F581f5321cf7147a6a311aa331c6cbdf2?format=webp&width=2000',
    'transform_heading' => 'Jouw Transformatie',
    'goodbye_heading' => 'Waar je Afscheid van Neemt',
    'goodbye_1' => 'Je laat overbelasting, twijfel en het gevoel dat je alles alleen moet doen achter je. Na het weekend heb je helderheid over wat echt belangrijk voor je is.',
    'takeaway_heading' => 'Wat je Meeneemt',
    'takeaway_1' => 'Praktische handvatten die je direct kunt toepassen in je dagelijks leven en werk.',
    'takeaway_2' => 'Een dieper begrip van jezelf: je drijfveren, patronen en unieke kwaliteiten.',
    'takeaway_3' => 'Verbinding met een groep gelijkgestemde vrouwen die je blijven inspireren.',
    'nextstep_heading' => 'Jouw Volgende Stap',
    'nextstep_text' => 'Na het weekend ga je verder met concrete tools, nieuwe inzichten en een netwerk van vrouwen die dezelfde reis maken. Je bent klaar voor je volgende stap.',
    'breathwork_heading' => 'De balans tussen denken en voelen',
    'breathwork_subtitle' => 'In het weekend combineren we mentale verdieping met lichaamswerk voor een complete ervaring.',
    'breathwork_benefits' => "Diepe ontspanning en stressvermindering\nMeer verbinding met je lichaam en emoties\nVerhoogde energie en helderheid",
    'breathwork_image' => '/ademwerk.png',
    'yoga_heading' => 'Yogalessen',
    'yoga_subtitle' => 'Gegeven door Liene Molendijk, coach met expertise in yoga en meditatie.',
    'yoga_benefits' => "Fysieke ontspanning en flexibiliteit\nMentale rust en focus\nVerbinding tussen lichaam en geest",
    'yoga_image' => '/yoga-weekend-persoonlijke-ontwikkeling.png',
    'highlight_heading' => 'Weekend Trainingen',
    'highlight_when' => 'Op vrijdag vanaf 17:30 tot zondag 16:00',
    'highlight_where' => 'Prachtige Vakantiehuis in de Natuur aan het water',
    'highlight_audience' => 'Voor Jonge Professional Vrouwen (24-29)',
    'highlight_capacity' => 'Beperkt plek voor 8 vrouwen',
    'highlight_inclusions' => "Intake met coach\nMotivation Factor test (€145 waarde)\nProfessionele begeleiding van twee coaches\nAdemsessie (breathwork)\nYogalessen\n2 nachten accommodatie\nAlle maaltijden en dranken\nWerkboek en praktische tools",
    'highlight_program_heading' => 'Programma: Persoonlijke groei & authenticiteit',
    'highlight_day_1' => 'Dag 1 vrijdag: Aankomst, kennismaking en eerste verdieping',
    'highlight_day_2' => 'Dag 2 zaterdag: Coaching, ademwerk en groepsoefeningen',
    'highlight_day_3' => 'Dag 3 zondag: Integratie, actieplan en afsluiting',
]);

// ── WEEKEND INTENSIVE (TRANSACTIE) ──
seed_page('weekend-intensive', [
    'hero_title' => 'Persoonlijke Ontwikkeling Training voor Vrouwen – Weekend Intensive juni 2026',
    'hero_subtitle' => 'Gericht op jonge vrouwelijke professionals (24–29 jaar) die willen groeien in rust, richting en leiderschap.',
    'hero_image' => '/workshop-persoonlijke-ontwikkeling.jpg',
    'intro_heading' => 'Persoonlijke ontwikkeling training voor vrouwen in Nederland',
    'intro_text' => 'Ben je een jonge vrouw tussen de 24 en 29 jaar en zoek je een training die écht impact maakt? De Weekend Intensive van Young Wise Women is een meerdaagse training gericht op persoonlijke groei, zelfinzicht en praktische tools voor je leven en carrière.',
    'when_label' => 'Wanneer',
    'when_text' => 'Van 24 juni 17:30 t/m 26 juni 16:00 (2026)',
    'where_label' => 'Waar',
    'where_text' => 'Oudega, Friesland (natuur en water)',
    'group_label' => 'Groep',
    'group_text' => 'Maximaal 8 deelneemsters',
    'rooms_label' => 'Kamers',
    'rooms_text' => '4 slaapkamers, bedden kunnen uit elkaar',
    'additional_text' => 'Weekenden op aanvraag zijn beschikbaar voor groepen young professionals.',
    'video_heading' => 'Hoe andere deelneemsters het ervaren:',
    'video_preview_image' => '/persoonlijke-ontwikkeling-training-vrouwen-testimonial-yww.png',
    'about_heading' => 'Over dit evenement',
    'about_text_1' => 'Je stapt drie dagen uit je dagelijkse routine en komt terecht in een omgeving waar je écht tot rust kunt komen. In een kleine groep van maximaal 8 vrouwen werk je onder begeleiding van twee ervaren coaches aan je persoonlijke groei.',
    'about_text_2' => 'Dit weekend is bewust kleinschalig opgezet zodat er ruimte is voor persoonlijke aandacht. Het programma combineert gesprekken, coaching, ademwerk en yoga tot een transformatieve ervaring.',
    'for_whom_heading' => 'Voor wie is dit weekend bedoeld?',
    'for_whom_items' => "Jonge vrouwen (24-29) die willen groeien in zelfkennis en leiderschap\nProfessionals die behoefte hebben aan rust, reflectie en richting\nVrouwen die praktische tools zoeken voor werk en privé\nIedereen die klaar is voor een volgende stap in persoonlijke ontwikkeling",
    'results_heading' => 'Wat levert deze training je op?',
    'results_items' => "Dieper zelfinzicht door de Motivation Factor test en coaching\nPraktische tools die je direct kunt toepassen\nMeer rust, focus en richting in je leven\nVerbinding met gelijkgestemde vrouwen\nNieuwe energie en motivatie\nEen persoonlijk actieplan voor na het weekend",
    'included_heading' => 'Wat is inbegrepen?',
    'included_items' => "Intake gesprek met coach\nMotivation Factor persoonlijkheidstest (€145 waarde)\nProfessionele begeleiding door twee coaches\nAdemwerk sessie en yogalessen\nAlle maaltijden, accommodatie en werkmateriaal",
    'caption_1' => 'Vertragen, voelen en richting kiezen.',
    'caption_2' => 'Van inzicht naar concreet gedrag in werk en leven.',
    'book_heading' => 'Boek jouw plek',
    'book_text' => 'Klaar om je plek te reserveren voor dit trainingsweekend voor vrouwen in Nederland?',
    'book_cta' => 'Ga naar Inquire now',
    'faq_heading' => 'Veelgestelde vragen over persoonlijke ontwikkeling trainingen voor vrouwen',
    'availability_label' => 'Beschikbaarheid',
    'availability_text' => '3 van 8',
    'availability_note' => 'Nog 5 plekken beschikbaar op dit moment.',
    'package_1_title' => 'Betaald vanuit je werkgever',
    'package_1_subtitle' => 'Je eenmalige investering',
    'package_1_price' => '€ 1.450',
    'package_1_note' => 'excl. BTW',
    'package_2_title' => 'Samen met een vriendin/collega*',
    'package_2_subtitle' => 'Per persoon: werkgeverstarief met 10% korting.',
    'package_2_price' => '€ 1.305 p.p.',
    'package_2_note' => 'excl. BTW',
    'package_3_title' => 'Particulier solo reis',
    'package_3_subtitle' => 'Uitzonderingsroute: een gereduceerd tarief voor zelfbetalers.',
    'package_3_price' => 'Prijs in overleg',
    'package_3_note' => 'Beperkt beschikbaar als uitzondering.',
    'form_heading' => 'Laat je gegevens achter',
    'success_title' => 'Success! Heel erg bedankt voor je aanmelding.',
    'success_text' => 'We nemen zo snel mogelijk contact met je op.',
    'success_signature' => 'Hartelijke groet, Ella',
    'sidebar_benefit_1' => 'Binnen 1 werkdag reactie op je aanvraag',
    'sidebar_benefit_2' => 'Inclusief ademwerk en yogalessen',
    'related_heading' => 'Lees ook',
]);

// ── WORKSHOPS ──
seed_page('workshops', [
    'hero_title' => 'Dag workshops',
    'hero_subtitle' => 'Praktische groepsworkshops voor jonge professionals die willen groeien in focus, energie en leiderschap.',
    'hero_image' => '/workshop-persoonlijke-ontwikkeling.jpg',
    'transform_heading' => 'Jouw Transformatie',
    'goodbye_heading' => 'Waar je Afscheid van Neemt',
    'goodbye_text' => 'Je laat overbelasting, twijfel en continue aanpassing los. Na de workshop heb je helderheid over wat echt bij je past.',
    'takeaway_heading' => 'Wat je Meeneemt',
    'takeaway_text' => 'Praktische handvatten, nieuwe inzichten en concrete tools die je direct kunt toepassen in je dagelijks leven en werk.',
    'nextstep_heading' => 'Jouw Volgende Stap',
    'nextstep_text' => 'Je gaat naar huis met een persoonlijk actieplan, nieuwe energie en de motivatie om je volgende stap te zetten.',
    'for_whom_heading' => 'Voor wie zijn onze workshops',
    'for_whom_intro' => 'Deze workshops zijn speciaal ontworpen voor jonge professionals (24+) die:',
    'for_whom_items' => "Op zoek zijn naar meer focus en richting in hun werk\nBehoefte hebben aan praktische tools voor persoonlijke groei\nWillen werken aan leiderschap en zelfvertrouwen\nEnergie en motivatie willen hervinden",
    'sidebar_what_heading' => 'Wat je krijgt',
    'sidebar_what_items' => "Professionele begeleiding van ervaren coach\nPraktische tools en oefeningen\nWerkboek om mee naar huis te nemen\nLunch, koffie en thee inbegrepen",
    'sidebar_practical_heading' => 'Praktisch',
    'sidebar_practical_items' => "09:30 - 17:00\nCastricum\n10 tot 14 deelnemers\nInclusief lunch, koffie, thee en werkmateriaal",
    'sidebar_not_for_heading' => 'Voor wie niet',
    'sidebar_not_for_items' => "Als je op zoek bent naar therapie of psychologische hulp\nAls je niet bereid bent om actief deel te nemen\nAls je verwacht dat anderen je problemen oplossen",
]);

// ── ONS VERHAAL ──
seed_page('ons-verhaal', [
    'hero_title' => 'Ons Verhaal',
    'hero_subtitle' => 'Ontdek wat Young Wise Women betekent en wat ons drijft',
    'hero_image' => 'https://images.pexels.com/photos/12198985/pexels-photo-12198985.jpeg',
    'section_1_heading' => 'Het Begin van Ons Avontuur',
    'section_1_text' => "Young Wise Women is geboren uit een passie om jonge professionals te ondersteunen in hun persoonlijke en professionele groei. We geloven dat de beste versie van jezelf niet alleen goed is voor jouw wellbeing, maar ook voor de wereld om je heen.\nOnze missie is om vrouwen in de leeftijd van 24+ te helpen een betekenisvol leven te leiden, waarbij ze hun unieke talenten en wijsheid volledig kunnen omarmen. We creëren ruimte voor reflectie, groei en inspiratie.",
    'section_1_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fcf6849fa4e1a4b76b17b1abaac301ee1?format=webp&width=4000',
    'section_2_heading' => 'Onze Waarden',
    'section_2_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F664a16fe95e34cfa87d16dd246540bca?format=webp&width=4000',
    'section_2_items' => "Authentieke verbinding met jezelf en anderen\nRuimte voor reflectie en persoonlijke groei\nSteun en inspiratie van gelijkgestemde vrouwen\nPraktische tools voor betekenisvolle verandering",
    'cta_heading' => 'Ben je klaar voor je volgende stap?',
    'cta_text' => 'Ontdek onze groepstrainingen',
]);

// ── CONTACT ──
seed_page('contact', [
    'hero_title' => 'Ons Verhaal',
    'hero_subtitle' => 'Hoe twee generaties elkaar versterken',
    'block_1_heading' => 'Ons Gedachtegoed',
    'block_1_text' => 'Het idee voor dit retreat ontstond bij Ella Taal, zelf afkomstig uit Generatie X en moeder van drie dochters uit Generatie Z. Ze zag van dichtbij hoe jonge vrouwen vandaag de dag zoeken naar hun plek in het professionele werkveld, vaak zonder de begeleiding die ze verdienen. Ella voelde de wens om de kracht en wijsheid van eerdere generaties door te geven aan deze nieuwe generatie, die in een complexe wereld op eigenzinnige en bewuste wijze leiding durft te nemen. Zo wil zij bijdragen aan het versterken van vrouwen die leiderschap tonen – iets waar in deze tijd grote behoefte aan is.',
    'block_2_heading' => 'Unieke Kracht',
    'block_2_text' => "Die visie wordt versterkt door de samenwerking met Ella's oudste dochter, Liene Molendijk (Generatie Z). Als voormalig deelnemer kent zij de kracht van het retreat van binnenuit. Inmiddels coördineert zij het programma met enthousiasme, ondersteunt ze de groep waar nodig en brengt ze yoga- en meditatiewijsheden op een toegankelijke manier in.\nSamen vormen Ella en Liene een team dat op een intergenerationele, laagdrempelige en inspirerende manier jonge vrouwen begeleidt. Met hun verschillende perspectieven delen ze persoonlijke ervaringen, denken ze pragmatisch mee en creëren ze een veilige setting voor groei en bewustwording. Dit unieke samenspel van generaties maakt het retreat bijzonder krachtig.",
]);

// ── VOOR ORGANISATIES ──
seed_page('voor-organisaties', [
    'hero_title' => 'Bedrijfstrajecten',
    'hero_subtitle' => 'Het Netwerk voor jonge vrouwelijke professionals',
    'hero_image' => '/incompany-training-vrouw.png',
    'intro_heading' => 'Jaarprogramma voor jonge vrouwelijke professionals',
    'intro_text' => 'We begeleiden groepen jonge vrouwen een jaar lang met een combinatie van 1-op-1 coaching, groepssessies, een dag workshop en een weekend training (intensief). Zo bouwen zij rust, zelfvertrouwen en leiderschap op dat direct impact heeft op werk en welzijn.',
    'brands_heading' => 'talent uit deze organisaties ontwikkelde zich via YWW',
    'program_heading' => 'Wat zit er in het programma',
    'program_1_title' => '1-op-1 coaching',
    'program_1_text' => 'Persoonlijke coaching sessies gericht op jouw specifieke ontwikkelvragen en doelen.',
    'program_2_title' => 'Groepssessies',
    'program_2_text' => 'Leer van en met elkaar in begeleide groepsbijeenkomsten met gelijkgestemde professionals.',
    'program_3_title' => 'Dag workshop',
    'program_3_text' => 'Een intensieve dag vol praktische tools en oefeningen die je direct kunt toepassen.',
    'program_4_title' => 'Weekend training (intensief)',
    'program_4_text' => 'Een meerdaagse training op een inspirerende locatie voor diepgaande persoonlijke groei.',
    'cta_heading' => 'Interesse in een programma op maat?',
    'cta_text' => 'We stemmen inhoud, ritme en groepsgrootte af op jullie organisatie.',
    'cta_button_1' => 'Plan een kennismaking',
    'cta_button_2' => 'Download brochure',
]);

// ── KALENDER ──
seed_page('kalender', [
    'hero_title' => 'Evenementen Kalender',
    'hero_subtitle' => 'Volgende evenementen van het Young Wise Women Netwerk',
    'edition_label' => '4DE EDITIE',
    'edition_heading' => 'Young Wise Women Weekend Intensive',
    'edition_subtitle' => 'Reflectie, Rust & Ruimte: een meerdaagse training voor persoonlijke ontwikkeling',
    'edition_dates' => '24 - 26 juni 2026',
    'edition_times' => 'Vrijdag 17:30 uur tot Zondag 16:00 uur',
    'edition_next_date' => 'Daarna: 16 - 18 oktober 2026',
    'edition_location' => 'Prachtige Vakantiehuis in de Natuur aan het water',
    'edition_location_detail' => 'Oudega, Friesland',
    'edition_audience' => 'Voor Jonge Professional Vrouwen (24-29)',
    'edition_availability' => 'Beperkte plaatsen beschikbaar',
    'program_heading' => 'Programmaoverzicht',
    'day_1_label' => 'Dag 1 vrijdag',
    'day_1_text' => 'Aankomst, kennismaking, openingscirkel en eerste verdiepingssessie.',
    'day_2_label' => 'Dag 2 zaterdag',
    'day_2_text' => 'Ochtendyoga, coaching sessies, ademwerk en groepsoefeningen.',
    'day_3_label' => 'Dag 3 zondag',
    'day_3_text' => 'Ochtendyoga, laatste verdiepingssessie, actieplan en afsluiting.',
    'investment_heading' => 'Eenmalige Investering in jezelf',
    'investment_via_employer_title' => 'Via Werkgever',
    'investment_price' => '€1.450',
    'investment_price_note' => 'excl. BTW',
    'investment_employer_note' => 'Opleidingstarief voor inschrijvingen vergoed door je werkgever.',
    'results_heading' => 'Wat er jou oplevert',
    'result_1' => 'Persoonlijke groei – een volgende stap in je ontwikkeling',
    'result_2' => 'Eigen wijsheid – je wordt uitgedaagd jezelf volledig te omarmen',
    'result_3' => 'Nieuwe energie & praktische tools – helderheid, richting en drive',
    'inclusions_heading' => 'Wat is Inbegrepen',
    'inclusions' => "Intake met coach\nMotivation Factor test (€145 waarde)\nProfessionele begeleiding van twee coaches\nAdemwerk en yogalessen\n2 nachten accommodatie\nAlle maaltijden en dranken",
]);

// ── LID WORDEN ──
seed_page('lid-worden', [
    'hero_title' => 'Lid worden van het Young Wise Women Netwerk',
    'hero_subtitle' => 'Sluit je aan bij een groep young professionals die elkaar ondersteunen, inspireren en samen groeien. Lidmaatschap is gratis.',
    'benefits_heading' => 'Voordelen van Lidmaatschap',
    'benefits_intro' => 'Het Young Wise Women Netwerk is een plek waar je jezelf volledig kunt uiten en groeien. Deelname is volledig gratis.',
    'benefit_1_title' => 'Verhalen Delen',
    'benefit_1_text' => 'Deel je persoonlijke verhalen en ervaringen met gelijkgestemde vrouwen in een veilige omgeving.',
    'benefit_2_title' => 'Samen Samenkomen',
    'benefit_2_text' => 'Ontmoet andere vrouwen in het Netwerk op regelmatige bijeenkomsten en events.',
    'benefit_3_title' => 'Samen Dingen Organiseren',
    'benefit_3_text' => 'Werk samen met andere leden aan activiteiten, workshops en projecten.',
    'benefit_4_title' => 'Steun en Verbinding',
    'benefit_4_text' => 'Maak deel uit van een ondersteunende gemeenschap waar je jezelf kunt zijn.',
    'form_heading' => 'Schrijf je in',
    'form_text' => 'Vul het formulier in en sluit je aan! Het lidmaatschap is gratis.',
    'form_success' => '✓ Bedankt! We ontvangen je inschrijving en sturen je binnenkort meer informatie.',
    'form_button' => 'Ik word gratis lid van het Netwerk',
    'form_privacy' => 'We respecteren je privacy. Je gegevens worden alleen gebruikt om je in aanraking te brengen met het Young Wise Women Netwerk.',
]);

// ── RETREATS ──
seed_page('retreats', [
    'hero_title' => 'Persoonlijke ontwikkeling & groei',
    'hero_subtitle' => 'Trainingen en Workshops voor jonge carrière-gedreven vrouwen',
    'hero_image' => 'https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg',
    'intro_text' => "Persoonlijke Ontwikkeling trainingen & Workshops\nDeze pagina is voor particulieren: jonge vrouwen die willen groeien in energie, richting en zelfvertrouwen via onze workshops en weekend trainingen.",
    'card_1_title' => 'Weekend Trainingen',
    'card_1_text' => '2-daagse weekend intensive in Friesland, gericht op verdieping, reflectie en duurzame gedragsverandering voor deelnemers die bewust tijd willen nemen voor persoonlijke ontwikkeling.',
    'card_1_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1800',
    'card_2_title' => 'Dag Workshops',
    'card_2_text' => '1-daagse workshop waarin je direct werkt aan praktische tools voor energie, focus en richting in werk en leven, toegankelijk en direct toepasbaar in je dagelijks leven.',
    'card_2_image' => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=1800',
]);

// ── LOSSE WORKSHOPS ──
seed_page('losse-workshops', [
    'hero_title' => 'Losse workshops',
    'hero_subtitle' => 'Flexibele bedrijfstrajecten workshops rond thema\'s zoals leiderschap, energie en samenwerking.',
    'hero_image' => '/workshop-persoonlijke-ontwikkeling.jpg',
    'section_heading' => 'Snel inzetbaar',
    'section_text' => 'Losse workshops zijn ideaal voor teams die direct willen werken aan een specifiek ontwikkelthema.',
]);

// ── JAARPROGRAMMAS ──
seed_page('jaarprogrammas', [
    'hero_title' => "Jaarprogramma's",
    'hero_subtitle' => 'Langlopende bedrijfstrajecten voor duurzame groei van jonge vrouwelijke professionals.',
    'hero_image' => 'https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg',
    'section_heading' => 'Duurzame impact',
    'section_text' => 'Een jaarprogramma combineert coaching, groepssessies en praktische tools die direct toepasbaar zijn in de dagelijkse praktijk.',
]);

// ── INSPIRATIE ──
seed_page('inspiratie', [
    'hero_title' => 'Inspiratie',
    'hero_subtitle' => 'Verhalen, inzichten en gesprekken die je helpen groeien in werk en leven.',
    'hero_image' => 'https://images.pexels.com/photos/1825206/pexels-photo-1825206.jpeg',
]);

echo "\nDone! All page content seeded.\n";
