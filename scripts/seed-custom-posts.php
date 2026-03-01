<?php
/**
 * YWW Custom Post Type Seed Script
 *
 * Seeds all custom post type data (coaches, testimonials, events, workshops,
 * FAQs, blogs) and global options into the WordPress database.
 *
 * Usage (via SSH on production server):
 *   cd /var/www/vhosts/awarenessinbusiness.com/cms.youngwisewomen.nl
 *   wp eval-file seed-custom-posts.php
 *
 * Safe to re-run: deletes existing posts of each type before inserting.
 */

// ─────────────────────────────────────────────
// Helper: delete all posts of a given type
// ─────────────────────────────────────────────

function yww_seed_delete_type($post_type) {
    $existing = get_posts([
        'post_type'      => $post_type,
        'posts_per_page' => -1,
        'post_status'    => 'any',
    ]);
    $count = count($existing);
    foreach ($existing as $p) {
        wp_delete_post($p->ID, true);
    }
    if ($count > 0) {
        echo "  Deleted {$count} existing {$post_type} posts.\n";
    }
}

// Helper: insert a post and its meta, return post ID
function yww_seed_insert($post_type, $title, $meta, $extra_args = []) {
    $args = array_merge([
        'post_type'   => $post_type,
        'post_title'  => $title,
        'post_status' => 'publish',
    ], $extra_args);

    $post_id = wp_insert_post($args, true);

    if (is_wp_error($post_id)) {
        echo "  ERROR creating {$post_type} '{$title}': " . $post_id->get_error_message() . "\n";
        return false;
    }

    foreach ($meta as $key => $value) {
        update_post_meta($post_id, $key, $value);
    }

    return $post_id;
}


echo "\n========================================\n";
echo "YWW Custom Post Type Seed Script\n";
echo "========================================\n\n";


// ─────────────────────────────────────────────
// 1. COACHES
// ─────────────────────────────────────────────

echo "--- Seeding Coaches ---\n";
yww_seed_delete_type('yww_coach');

$coaches = [
    [
        'title' => 'Ella Taal',
        'meta'  => [
            'yww_coach_role'  => 'Founder & Coach',
            'yww_coach_order' => 1,
            'yww_coach_bio'   => 'In 2011 is Awareness in Business opgericht door Ella, ontstaan na een management buy-out bij haar vorige organisatie advies kantoor Second Nature. Al ruim 28 jaar heeft zij ervaring als coach, trainer en organisatie adviseur voor diverse opdrachtgevers in zowel binnen- als buitenland. Ze heeft ervaring van het geven van retreats voor o.a. Management teams, DGA\'s en CEO\'s. Ella heeft drie dochters van 27, 25 en 22 en wil graag iets terug doen voor de jongere generatie. Bijdragen aan het welzijn van jonge professionals is een passie die ze door het geven van deze retreats naleeft!',
            'yww_coach_image' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000',
        ],
    ],
    [
        'title' => 'Liene Molendijk',
        'meta'  => [
            'yww_coach_role'  => 'Coach & Trainer',
            'yww_coach_order' => 2,
            'yww_coach_bio'   => 'Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk. Daarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals.',
            'yww_coach_image' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000',
        ],
    ],
];

foreach ($coaches as $coach) {
    $id = yww_seed_insert('yww_coach', $coach['title'], $coach['meta']);
    if ($id) {
        echo "  Created coach: {$coach['title']} (ID: {$id})\n";
    }
}

echo "  Done: " . count($coaches) . " coaches seeded.\n\n";


// ─────────────────────────────────────────────
// 2. TESTIMONIALS
// ─────────────────────────────────────────────

echo "--- Seeding Testimonials ---\n";
yww_seed_delete_type('yww_testimonial');

$testimonials = [
    [
        'title' => 'Kim Dingelhoff',
        'meta'  => [
            'yww_testimonial_name'       => 'Kim Dingelhoff',
            'yww_testimonial_date_label' => 'Deelnemer oktober 2025',
            'yww_testimonial_order'      => 1,
            'yww_testimonial_quote'      => 'De retraite onder begeleiding van Ella en Liene was ontzettend waardevol. Ik heb diepgaande inzichten gekregen in wie ik ben, wat mij drijft en welke stappen ik nu kan zetten, zowel op persoonlijk als op werkvlak. De combinatie van lichaamsgerichte oefeningen en verdiepende gesprekken zorgde voor een perfecte balans tussen voelen en reflecteren. Er hing een warme, veilige sfeer waarin iedereen echt zichzelf kon zijn. Daarnaast raakte ik geïnspireerd door de andere vrouwen; hun verhalen en energie gaven me nieuwe perspectieven en motivatie. Deze retraite heeft me niet alleen dichter bij jezelf gebracht, maar ook helderheid gegeven over mijn volgende stappen.',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa458d3081062459fb8afe9ebe8a4ac0e?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Julia Weekenstro',
        'meta'  => [
            'yww_testimonial_name'       => 'Julia Weekenstro',
            'yww_testimonial_date_label' => 'Deelnemer Oktober 2025',
            'yww_testimonial_order'      => 2,
            'yww_testimonial_quote'      => 'Wauw wat een prachtige ervaring heb ik gehad tijdens het Young Wise Women Retreat! Zowel op cognitief niveau als gevoelsniveau hebben we samen een heel mooie reis mogen maken in onze ontwikkeling. Vooral dat samen aangaan, met de andere vrouwen, heeft me veel gebracht. Zo mooi en betekenisvol hoe we elkaar echt konden inspireren en helpen. Grote complimenten richting de trainers Ella en Liene en de host Esther die dit hebben gefaciliteerd. Op een prachtige plek in de natuur waar ik me al meteen heel veilig en thuis voelde. Ik gun elke vrouw zo een betekenisvol en verbindend weekend.',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F7895d36c45374c71a02e2f8dae447dda?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Lisanne de Moel',
        'meta'  => [
            'yww_testimonial_name'       => 'Lisanne de Moel',
            'yww_testimonial_date_label' => 'Deelnemer Januari 2025',
            'yww_testimonial_order'      => 3,
            'yww_testimonial_quote'      => 'Een heel fijn weekend gehad op de boerderij in Friesland. Wat is het leuk om een weekend te spenderen met allemaal vrouwen die elkaar aanmoedigen en van wie je kan leren. Ik vond het een hele waardevolle ervaring, waarbij je echt even tijd voor jezelf mag en kan nemen. Ella en Karin stelden de juiste vragen, waardoor je interessante inzichten over jezelf doet.',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F8bd83a1cca6e455095fbc2cce26f0452?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Melanie de Reus',
        'meta'  => [
            'yww_testimonial_name'       => 'Melanie de Reus',
            'yww_testimonial_date_label' => 'Deelnemer September 2023',
            'yww_testimonial_order'      => 4,
            'yww_testimonial_quote'      => 'Een weekend waarbij je in alle rust kan reflecteren op je leven en nieuwe inzichten over jezelf kan op doen, gesteund door andere mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen leren en elkaar mogen helpen. Ontzettend mooie en waardevolle inzichten op gedaan!',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fc5eef54d11c9437abf49ea4fe7b69596?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Aisha Lankhorst',
        'meta'  => [
            'yww_testimonial_name'       => 'Aisha Lankhorst',
            'yww_testimonial_date_label' => 'Deelnemer Januari 2025',
            'yww_testimonial_order'      => 5,
            'yww_testimonial_quote'      => 'Ik heb een superfijn weekend gehad met de coaches en de andere meiden in een geweldig huis in de natuur in Friesland. De sfeer was zo veilig en warm, er werd echt naar elkaar geluisterd. We hebben veel van Karen en Ella geleerd, maar ook van elkaar als groep. Ik heb echt het gevoel dat ik weer een stapje verder kan zetten, zowel op persoonlijk als op professioneel vlak. Wat ik ook erg waardeerde was dat er naast alle diepe en mooie gespreken veel ruimte was voor luchtigheid en gezelligheid met elkaar. Ik kan dit retreat echt aanraden, want de inzichten en ervaringen die ik heb opgedaan, neem ik voor de rest van mijn leven mee.',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fb56ba9e008fe487cbc9f8dae8d42a849?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Marina Feyz',
        'meta'  => [
            'yww_testimonial_name'       => 'Marina Feyz',
            'yww_testimonial_date_label' => 'Deelnemer September 2023',
            'yww_testimonial_order'      => 6,
            'yww_testimonial_quote'      => 'Ik heb er geen andere woorden voor dan echt geweldig! Ondanks dat ik de andere meiden van tevoren niet kende, voelde het vrijwel direct zo vertrouwd en zo warm. Ik had het gevoel dat iedereen helemaal zichzelf kon zijn en er een hele veilige omgeving was om je kwetsbaar op te stellen. Zowel Ella als Wineke zijn beiden prachtige vrouwen die mij nieuwe inzichten hebben gegeven, die ik tot op de dag vandaag nog steeds toepas. Wat vullen jullie elkaar goed aan! En dat allemaal in een prachtige omgeving in de natuur. Ik had niet meer kunnen wensen. Onwijs dankbaar voor deze onvergetelijke ervaring.',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F6a36df5bf8b047eaafd0b1579b1fcf62?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Julia',
        'meta'  => [
            'yww_testimonial_name'       => 'Julia',
            'yww_testimonial_date_label' => 'Deelnemer September 2023',
            'yww_testimonial_order'      => 7,
            'yww_testimonial_quote'      => 'Het young wise women retreat was een hele fijne en leerzame ervaring. Vol oefeningen maar ook ruimte voor eigen ideeën. De begeleiding van Ella en Wineke is professioneel en duidelijk, waar zowel lichaam en geest aan bod komen. Ik heb zo veel inspiratie en wijsheid gehaald uit hun oefeningen en ideeën, maar ook uit de verhalen van andere deelnemers. Het is niet erg als je niet met een specifieke leervraag naar dit weekend komt, zie het als een jaarlijkse APK van je mentale gezondheid. Heel erg waardevol!',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Ff29681ec3e8841db98437ca5e7175eb1?format=webp&width=800',
        ],
    ],
    [
        'title' => 'Julia Bleeker',
        'meta'  => [
            'yww_testimonial_name'       => 'Julia Bleeker',
            'yww_testimonial_date_label' => 'Deelnemer September 2023',
            'yww_testimonial_order'      => 8,
            'yww_testimonial_quote'      => 'Het retreat was voor mij een ontzettend fijn en betekenisvol weekend. Door middel van opdrachten en verbindende gesprekken, heb ik in een veilige en rustige setting veel helderheid en inzicht gekregen in mijn behoeftes en talenten. We waren midden in de natuur en alles werd voor ons verzorgd. Naast dat ik het fijn vond met de andere meiden in de groep, heb ik veel geleerd wat ik kan toepassen in de keuzes voor jezelf en in mijn werk.',
            'yww_testimonial_image'      => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fbdc3b23ee87f40b48865669c690e579d?format=webp&width=800',
        ],
    ],
];

foreach ($testimonials as $t) {
    $id = yww_seed_insert('yww_testimonial', $t['title'], $t['meta']);
    if ($id) {
        echo "  Created testimonial: {$t['title']} (ID: {$id})\n";
    }
}

echo "  Done: " . count($testimonials) . " testimonials seeded.\n\n";


// ─────────────────────────────────────────────
// 3. EVENTS
// ─────────────────────────────────────────────

echo "--- Seeding Events ---\n";
yww_seed_delete_type('yww_event');

$events = [
    [
        'title' => 'Terugkom dag',
        'meta'  => [
            'yww_event_label'       => 'Terugkom dag',
            'yww_event_type'        => 'terugkom-dag',
            'yww_event_year'        => 2026,
            'yww_event_month'       => 2,
            'yww_event_start_date'  => '2026-02-15T09:00:00.000Z',
            'yww_event_end_date'    => '',
            'yww_event_description' => 'Terugkomdag om te reflecteren, ervaringen te delen en je volgende stap scherp te maken.',
            'yww_event_link'        => '',
        ],
    ],
    [
        'title' => 'Groep weekend training',
        'meta'  => [
            'yww_event_label'       => 'Groep weekend training',
            'yww_event_type'        => 'weekend-training',
            'yww_event_year'        => 2026,
            'yww_event_month'       => 6,
            'yww_event_start_date'  => '2026-06-24T17:30:00.000Z',
            'yww_event_end_date'    => '2026-06-26T16:00:00.000Z',
            'yww_event_description' => 'Intensieve weekend training met verdieping, groepsreflectie en praktische tools.',
            'yww_event_link'        => '',
        ],
    ],
    [
        'title' => 'Groep weekend training',
        'meta'  => [
            'yww_event_label'       => 'Groep weekend training',
            'yww_event_type'        => 'weekend-training',
            'yww_event_year'        => 2026,
            'yww_event_month'       => 10,
            'yww_event_start_date'  => '2026-10-16T17:30:00.000Z',
            'yww_event_end_date'    => '2026-10-18T16:00:00.000Z',
            'yww_event_description' => 'Vervolgweekend met verdieping, integratie en praktische tools voor je volgende stap.',
            'yww_event_link'        => '',
        ],
    ],
];

foreach ($events as $e) {
    $id = yww_seed_insert('yww_event', $e['title'], $e['meta']);
    if ($id) {
        echo "  Created event: {$e['title']} — {$e['meta']['yww_event_start_date']} (ID: {$id})\n";
    }
}

echo "  Done: " . count($events) . " events seeded.\n\n";


// ─────────────────────────────────────────────
// 4. WORKSHOPS
// ─────────────────────────────────────────────

echo "--- Seeding Workshops ---\n";
yww_seed_delete_type('yww_workshop');

$workshops = [
    [
        'title' => 'Female leadership workshop',
        'meta'  => [
            'yww_workshop_subtitle'    => 'Leidinggeven vanuit authenticiteit',
            'yww_workshop_description' => 'Ontwikkel je eigen leiderschapsstijl en leer hoe je vanuit authenticiteit en kracht kunt leiden.',
            'yww_workshop_next_date'   => '20 maart 2026',
            'yww_workshop_from_price'  => 'EUR 245',
            'yww_workshop_duration'    => '09:30 - 17:00',
            'yww_workshop_location'    => 'Castricum',
            'yww_workshop_audience'    => 'Jonge vrouwelijke professionals (24+)',
            'yww_workshop_goal'        => 'Je ontdekt je unieke leiderschapskwaliteiten en leert deze bewust in te zetten in je werk en leven.',
            'yww_workshop_program'     => "Inzicht in je leiderschapsstijl\nOefeningen rondom authenticiteit en grenzen\nActieplan voor je volgende stap",
            'yww_workshop_investment'  => 'EUR 245 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal',
            'yww_workshop_order'       => 1,
        ],
    ],
    [
        'title' => 'Workshop vitaliteit',
        'meta'  => [
            'yww_workshop_subtitle'    => 'Energie en balans in werk en leven',
            'yww_workshop_description' => 'Leer hoe je je energie kunt managen en duurzame balans creëert tussen werk en privé.',
            'yww_workshop_next_date'   => '10 april 2026',
            'yww_workshop_from_price'  => 'EUR 215',
            'yww_workshop_duration'    => '09:30 - 17:00',
            'yww_workshop_location'    => 'Castricum',
            'yww_workshop_audience'    => 'Jonge professionals (24+)',
            'yww_workshop_goal'        => 'Je krijgt inzicht in je energiebalans en praktische tools om vitaler te leven en werken.',
            'yww_workshop_program'     => "Energiemanagement en stressherkenning\nAdemwerk en lichaamsgerichte oefeningen\nPersoonlijk vitaliteitsplan",
            'yww_workshop_investment'  => 'EUR 215 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal',
            'yww_workshop_order'       => 2,
        ],
    ],
    [
        'title' => 'Workshop mentale weerbaarheid',
        'meta'  => [
            'yww_workshop_subtitle'    => 'Steviger staan in uitdagende situaties',
            'yww_workshop_description' => 'Versterk je mentale weerbaarheid en leer omgaan met druk, onzekerheid en verandering.',
            'yww_workshop_next_date'   => '24 april 2026',
            'yww_workshop_from_price'  => 'EUR 225',
            'yww_workshop_duration'    => '09:30 - 17:00',
            'yww_workshop_location'    => 'Castricum',
            'yww_workshop_audience'    => 'Jonge professionals (24+)',
            'yww_workshop_goal'        => 'Je ontwikkelt mentale veerkracht en leert effectief omgaan met uitdagende situaties.',
            'yww_workshop_program'     => "Herkennen van stresspatronen en overtuigingen\nTechnieken voor mentale veerkracht\nOefeningen voor grenzen stellen",
            'yww_workshop_investment'  => 'EUR 225 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal',
            'yww_workshop_order'       => 3,
        ],
    ],
    [
        'title' => 'Workshop persoonlijke effectiviteit',
        'meta'  => [
            'yww_workshop_subtitle'    => 'Focus en richting in je werk en leven',
            'yww_workshop_description' => 'Ontdek wat je drijft en leer hoe je effectiever kunt werken vanuit je eigen kracht.',
            'yww_workshop_next_date'   => '8 mei 2026',
            'yww_workshop_from_price'  => 'EUR 235',
            'yww_workshop_duration'    => '09:30 - 17:00',
            'yww_workshop_location'    => 'Castricum',
            'yww_workshop_audience'    => 'Jonge professionals (24+)',
            'yww_workshop_goal'        => 'Je krijgt helderheid over je prioriteiten en leert effectiever werken vanuit focus en richting.',
            'yww_workshop_program'     => "Inzicht in je drijfveren en waarden\nTimemanagement en prioriteiten stellen\nPersoonlijk actieplan",
            'yww_workshop_investment'  => 'EUR 235 excl. BTW — inclusief lunch, koffie, thee en werkmateriaal',
            'yww_workshop_order'       => 4,
        ],
    ],
];

foreach ($workshops as $w) {
    $id = yww_seed_insert('yww_workshop', $w['title'], $w['meta']);
    if ($id) {
        echo "  Created workshop: {$w['title']} (ID: {$id})\n";
    }
}

echo "  Done: " . count($workshops) . " workshops seeded.\n\n";


// ─────────────────────────────────────────────
// 5. FAQs
// ─────────────────────────────────────────────

echo "--- Seeding FAQs ---\n";
yww_seed_delete_type('yww_faq');

$faqs = [
    [
        'title' => 'Voor wie is deze persoonlijke ontwikkeling training voor vrouwen bedoeld?',
        'meta'  => [
            'yww_faq_answer' => 'Voor jonge vrouwelijke professionals (24-29 jaar) die bewust willen groeien in rust, richting en leiderschap.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 1,
        ],
    ],
    [
        'title' => 'Is dit een persoonlijke ontwikkeling training voor vrouwen in Nederland?',
        'meta'  => [
            'yww_faq_answer' => 'Ja, dit trainingsweekend vindt plaats in Oudega, Friesland en is volledig in Nederland.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 2,
        ],
    ],
    [
        'title' => 'Wat levert deze leiderschapstraining voor vrouwen concreet op?',
        'meta'  => [
            'yww_faq_answer' => 'Je gaat naar huis met meer zelfsturing, heldere keuzes, sterke grenzen en een praktisch actieplan voor werk en prive.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 3,
        ],
    ],
    [
        'title' => 'Kan ik alleen deelnemen als ik niemand ken?',
        'meta'  => [
            'yww_faq_answer' => 'Ja, veel deelnemers komen alleen. De groepsopbouw is veilig, warm en begeleid vanaf de eerste sessie.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 4,
        ],
    ],
    [
        'title' => 'Wat is inbegrepen in het weekend?',
        'meta'  => [
            'yww_faq_answer' => 'Intake, begeleiding door 2 coaches, ademwerk en reflectiesessies, 2 overnachtingen, alle maaltijden en een werkboek.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 5,
        ],
    ],
    [
        'title' => 'Hoeveel plekken zijn er beschikbaar?',
        'meta'  => [
            'yww_faq_answer' => 'Er is plek voor maximaal 8 deelnemers zodat er voldoende persoonlijke aandacht en verdieping mogelijk is.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 6,
        ],
    ],
    [
        'title' => 'Wat betekent Particulier solo reis als je niet via je werkgever kunt deelnemen?',
        'meta'  => [
            'yww_faq_answer' => 'Wij gunnen iedere vrouw dit retreat. Mocht je werkgever het niet vergoeden vanuit het opleidingstarief, kunnen we een gereduceerd tarief aanbieden. Inquire en we nemen contact op om te kijken naar de mogelijkheden.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 7,
        ],
    ],
    [
        'title' => 'Kan ik als particulier betalen in 3 termijnen?',
        'meta'  => [
            'yww_faq_answer' => 'Er is mogelijkheid tot het betalen in (3) termijnen.',
            'yww_faq_page'   => 'weekend-intensive',
            'yww_faq_order'  => 8,
        ],
    ],
];

foreach ($faqs as $f) {
    $id = yww_seed_insert('yww_faq', $f['title'], $f['meta']);
    if ($id) {
        echo "  Created FAQ: " . substr($f['title'], 0, 60) . "... (ID: {$id})\n";
    }
}

echo "  Done: " . count($faqs) . " FAQs seeded.\n\n";


// ─────────────────────────────────────────────
// 6. BLOGS
// ─────────────────────────────────────────────

echo "--- Seeding Blogs ---\n";
yww_seed_delete_type('yww_blog');

$blogs = [
    [
        'title'   => 'De Motivation Factor als Tool voor Richting',
        'excerpt' => 'Hoe je met de Motivation Factor helder krijgt wat je energie geeft, waar je op leegloopt en welke keuzes beter bij je passen.',
        'content' => '<p>De Motivation Factor is een wetenschappelijk onderbouwde tool die inzicht geeft in wat jou werkelijk drijft. In dit artikel leggen we uit hoe je deze tool kunt gebruiken om heldere keuzes te maken in werk en leven.</p><p>Tijdens onze weekend trainingen gebruiken we de Motivation Factor als startpunt voor reflectie en groei. Deelnemers ontdekken waar hun energie naartoe gaat en waar ze op leegraken.</p>',
        'meta'    => [
            'yww_blog_slug'           => 'motivation-factor',
            'yww_blog_featured_image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop',
        ],
    ],
    [
        'title'   => 'Persoonlijke Groei in de Praktijk: Voorbeelden',
        'excerpt' => 'Concrete voorbeelden van vrouwen die stappen zetten in grenzen aangeven, focus hervinden en met meer rust presteren.',
        'content' => '<p>Persoonlijke groei klinkt abstract, maar in de praktijk gaat het om concrete stappen. In dit artikel delen we voorbeelden van vrouwen die door onze programma\'s heen zijn gegroeid.</p><p>Van het leren stellen van grenzen op het werk tot het hervinden van focus en richting in het leven – elke vrouw maakt haar eigen reis.</p>',
        'meta'    => [
            'yww_blog_slug'           => 'persoonlijke-groei',
            'yww_blog_featured_image' => '/persoonlijke-groei-training.jpg',
        ],
    ],
    [
        'title'   => 'Vrouwelijk Leiderschap: Zichtbaar en Authentiek',
        'excerpt' => 'Wat vrouwelijk leiderschap vandaag vraagt, en hoe je met vertrouwen positie inneemt zonder jezelf kwijt te raken.',
        'content' => '<p>Vrouwelijk leiderschap gaat niet over harder werken of meer presteren. Het gaat over zichtbaar durven zijn, je stem laten horen en vanuit authenticiteit leiden.</p><p>In onze workshops en trainingen werken we aan de vaardigheden en het zelfvertrouwen die nodig zijn om als jonge vrouw leiding te nemen in je werk en leven.</p>',
        'meta'    => [
            'yww_blog_slug'           => 'vrouwelijk-leiderschap',
            'yww_blog_featured_image' => '/vrouwelijk-leiderschap-training.webp',
        ],
    ],
];

foreach ($blogs as $b) {
    $id = yww_seed_insert('yww_blog', $b['title'], $b['meta'], [
        'post_content' => $b['content'],
        'post_excerpt' => $b['excerpt'],
    ]);
    if ($id) {
        echo "  Created blog: {$b['title']} (ID: {$id})\n";
    }
}

echo "  Done: " . count($blogs) . " blogs seeded.\n\n";


// ─────────────────────────────────────────────
// 7. GLOBAL OPTIONS
// ─────────────────────────────────────────────

echo "--- Seeding Global Options ---\n";

update_option('yww_footer_about', 'Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft, verstevig je koers en groei met gelijkgestemde vrouwen.');
echo "  Set yww_footer_about\n";

update_option('yww_footer_copyright', '© 2026 Young Wise Women. Alle rechten voorbehouden.');
echo "  Set yww_footer_copyright\n";

update_option('yww_contact_email', 'info@youngwisewomen.nl');
echo "  Set yww_contact_email\n";

update_option('yww_contact_phone', '+31 (0)6 55334728');
echo "  Set yww_contact_phone\n";

update_option('yww_social_instagram', 'https://instagram.com/youngwisewomen');
echo "  Set yww_social_instagram\n";

update_option('yww_social_linkedin', 'https://linkedin.com/company/young-wise-women');
echo "  Set yww_social_linkedin\n";

echo "  Done: 6 global options set.\n\n";


// ─────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────

echo "========================================\n";
echo "Seed complete!\n";
echo "  Coaches:      " . count($coaches) . "\n";
echo "  Testimonials: " . count($testimonials) . "\n";
echo "  Events:       " . count($events) . "\n";
echo "  Workshops:    " . count($workshops) . "\n";
echo "  FAQs:         " . count($faqs) . "\n";
echo "  Blogs:        " . count($blogs) . "\n";
echo "  Options:      6\n";
echo "========================================\n";
