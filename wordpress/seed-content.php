<?php
/**
 * YWW Content Seeder
 * Vult WordPress met alle bestaande fallback data.
 *
 * Gebruik: cd wordpress && php seed-content.php
 */

// Bootstrap WordPress
define('ABSPATH', __DIR__ . '/');
$_SERVER['HTTP_HOST'] = 'localhost:8081';
$_SERVER['REQUEST_URI'] = '/';

require_once ABSPATH . 'wp-load.php';

echo "=== YWW Content Seeder ===\n\n";

// ─── Helper: insert post with meta ───
function yww_seed_post($post_type, $title, $meta = [], $extra = []) {
    $args = array_merge([
        'post_type'   => $post_type,
        'post_title'  => $title,
        'post_status' => 'publish',
    ], $extra);

    $post_id = wp_insert_post($args);
    if (is_wp_error($post_id)) {
        echo "  FOUT: {$title} - " . $post_id->get_error_message() . "\n";
        return 0;
    }

    foreach ($meta as $key => $value) {
        update_post_meta($post_id, $key, $value);
    }

    echo "  + {$title} (ID: {$post_id})\n";
    return $post_id;
}

// ─── Helper: check if posts already exist ───
function yww_count_posts($post_type) {
    return (int) wp_count_posts($post_type)->publish;
}

// ═══════════════════════════════════════
// 1. COACHES
// ═══════════════════════════════════════
echo "Coaches...\n";
if (yww_count_posts('yww_coach') > 0) {
    echo "  (al gevuld, overgeslagen)\n";
} else {
    yww_seed_post('yww_coach', 'Ella Taal', [
        'yww_coach_bio'   => 'In 2011 is Awareness in Business opgericht door Ella, ontstaan na een management buy-out bij haar vorige organisatie advies kantoor Second Nature. Al ruim 28 jaar heeft zij ervaring als coach, trainer en organisatie adviseur voor diverse opdrachtgevers in zowel binnen- als buitenland. Ze heeft ervaring van het geven van retreats voor o.a. Management teams, DGA\'s en CEO\'s. Ella heeft drie dochters van 27, 25 en 22 en wil graag iets terug doen voor de jongere generatie. Bijdragen aan het welzijn van jonge professionals is een passie die ze door het geven van deze retreats naleeft!',
        'yww_coach_role'  => 'Founder & Coach',
        'yww_coach_image' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000',
        'yww_coach_order' => 1,
    ]);

    yww_seed_post('yww_coach', 'Liene Molendijk', [
        'yww_coach_bio'   => 'Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk. Daarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals.',
        'yww_coach_role'  => 'Coach & Trainer',
        'yww_coach_image' => 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000',
        'yww_coach_order' => 2,
    ]);
}

// ═══════════════════════════════════════
// 2. TESTIMONIALS
// ═══════════════════════════════════════
echo "\nTestimonials...\n";
if (yww_count_posts('yww_testimonial') > 0) {
    echo "  (al gevuld, overgeslagen)\n";
} else {
    $testimonials = [
        ['Kim Dingelhoff', 'Deelnemer oktober 2025', 'De retraite onder begeleiding van Ella en Liene was ontzettend waardevol. Ik heb diepgaande inzichten gekregen in wie ik ben, wat mij drijft en welke stappen ik nu kan zetten, zowel op persoonlijk als op werkvlak. De combinatie van lichaamsgerichte oefeningen en verdiepende gesprekken zorgde voor een perfecte balans tussen voelen en reflecteren. Er hing een warme, veilige sfeer waarin iedereen echt zichzelf kon zijn. Daarnaast raakte ik geïnspireerd door de andere vrouwen; hun verhalen en energie gaven me nieuwe perspectieven en motivatie. Deze retraite heeft me niet alleen dichter bij jezelf gebracht, maar ook helderheid gegeven over mijn volgende stappen.', 'https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa458d3081062459fb8afe9ebe8a4ac0e?format=webp&width=800'],
        ['Julia Weekenstro', 'Deelnemer Oktober 2025', 'Wauw wat een prachtige ervaring heb ik gehad tijdens het Young Wise Women Retreat! Zowel op cognitief niveau als gevoelsniveau hebben we samen een heel mooie "reis" mogen maken in onze ontwikkeling. Vooral dat samen aangaan, met de andere vrouwen, heeft me veel gebracht. Zo mooi en betekenisvol hoe we elkaar echt konden inspireren en helpen. Grote complimenten richting de trainers Ella en Liene en de host Esther die dit hebben gefaciliteerd. Op een prachtige plek in de natuur waar ik me al meteen heel veilig en thuis voelde. Ik gun elke vrouw zo\'n betekenisvol en verbindend weekend.', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F7895d36c45374c71a02e2f8dae447dda?format=webp&width=800'],
        ['Lisanne de Moel', 'Deelnemer Januari 2025', 'Een heel fijn weekend gehad op de boerderij in Friesland. Wat is het leuk om een weekend te spenderen met allemaal vrouwen die elkaar aanmoedigen en van wie je kan leren. Ik vond het een hele waardevolle ervaring, waarbij je echt even tijd voor jezelf mag en kan nemen. Ella en Karin stelden de juiste vragen, waardoor je interessante inzichten over jezelf doet.', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F8bd83a1cca6e455095fbc2cce26f0452?format=webp&width=800'],
        ['Melanie de Reus', 'Deelnemer September 2023', 'Een weekend waarbij je in alle rust kan reflecteren op je leven en nieuwe inzichten over jezelf kan op doen, gesteund door andere mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen leren en elkaar mogen helpen. Ontzettend mooie en waardevolle inzichten op gedaan!', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fc5eef54d11c9437abf49ea4fe7b69596?format=webp&width=800'],
        ['Aïsha Lankhorst', 'Deelnemer Januari 2025', 'Ik heb een superfijn weekend gehad met de coaches en de andere meiden in een geweldig huis in de natuur in Friesland. De sfeer was zo veilig en warm, er werd echt naar elkaar geluisterd. We hebben veel van Karen en Ella geleerd, maar ook van elkaar als groep. Ik heb echt het gevoel dat ik weer een stapje verder kan zetten, zowel op persoonlijk als op professioneel vlak. Wat ik ook erg waardeerde was dat er naast alle diepe en mooie gespreken veel ruimte was voor luchtigheid en gezelligheid met elkaar. Ik kan dit retreat echt aanraden, want de inzichten en ervaringen die ik heb opgedaan, neem ik voor de rest van mijn leven mee.', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fb56ba9e008fe487cbc9f8dae8d42a849?format=webp&width=800'],
        ['Marina Feyz', 'Deelnemer September 2023', 'Ik heb er geen andere woorden voor dan \'echt geweldig\'! Ondanks dat ik de andere meiden van tevoren niet kende, voelde het vrijwel direct zo vertrouwd en zo warm. Ik had het gevoel dat iedereen helemaal zichzelf kon zijn en er een hele veilige omgeving was om je kwetsbaar op te stellen. Zowel Ella als Wineke zijn beiden prachtige vrouwen die mij nieuwe inzichten hebben gegeven, die ik tot op de dag vandaag nog steeds toepas. Wat vullen jullie elkaar goed aan! En dat allemaal in een prachtige omgeving in de natuur. Ik had niet meer kunnen wensen. Onwijs dankbaar voor deze onvergetelijke ervaring.', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F6a36df5bf8b047eaafd0b1579b1fcf62?format=webp&width=800'],
        ['Julia', 'Deelnemer September 2023', 'Het young wise women retreat was een hele fijne en leerzame ervaring. Vol oefeningen maar ook ruimte voor eigen ideeën. De begeleiding van Ella en Wineke is professioneel en duidelijk, waar zowel lichaam en geest aan bod komen. Ik heb zo veel inspiratie en wijsheid gehaald uit hun oefeningen en ideeën, maar ook uit de verhalen van andere deelnemers. Het is niet erg als je niet met een specifieke leervraag naar dit weekend komt, zie het als een jaarlijkse \'APK\' van je mentale gezondheid. Heel erg waardevol!', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Ff29681ec3e8841db98437ca5e7175eb1?format=webp&width=800'],
        ['Julia Bleeker', 'Deelnemer September 2023', 'Het retreat was voor mij een ontzettend fijn en betekenisvol weekend. Door middel van opdrachten en verbindende gesprekken, heb ik in een veilige en rustige setting veel helderheid en inzicht gekregen in mijn behoeftes en talenten. We waren midden in de natuur en alles werd voor ons verzorgd. Naast dat ik het fijn vond met de andere meiden in de groep, heb ik veel geleerd wat ik kan toepassen in de keuzes voor jezelf en in mijn werk.', 'https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fbdc3b23ee87f40b48865669c690e579d?format=webp&width=800'],
    ];

    foreach ($testimonials as $i => $t) {
        yww_seed_post('yww_testimonial', $t[0], [
            'yww_testimonial_name'       => $t[0],
            'yww_testimonial_date_label' => $t[1],
            'yww_testimonial_quote'      => $t[2],
            'yww_testimonial_image'      => $t[3],
            'yww_testimonial_order'      => $i + 1,
        ]);
    }
}

// ═══════════════════════════════════════
// 3. EVENTS
// ═══════════════════════════════════════
echo "\nEvents...\n";
if (yww_count_posts('yww_event') > 0) {
    echo "  (al gevuld, overgeslagen)\n";
} else {
    yww_seed_post('yww_event', 'Terugkom dag', [
        'yww_event_label'       => 'Terugkom dag',
        'yww_event_type'        => 'terugkom-dag',
        'yww_event_year'        => 2026,
        'yww_event_month'       => 2,
        'yww_event_start_date'  => '2026-02-15T09:00:00.000Z',
        'yww_event_end_date'    => '',
        'yww_event_description' => 'Terugkomdag om te reflecteren, ervaringen te delen en je volgende stap scherp te maken.',
        'yww_event_link'        => '',
    ]);

    yww_seed_post('yww_event', 'Groep weekend training juni', [
        'yww_event_label'       => 'Groep weekend training',
        'yww_event_type'        => 'weekend-training',
        'yww_event_year'        => 2026,
        'yww_event_month'       => 6,
        'yww_event_start_date'  => '2026-06-24T17:30:00.000Z',
        'yww_event_end_date'    => '2026-06-26T16:00:00.000Z',
        'yww_event_description' => 'Intensieve weekend training met verdieping, groepsreflectie en praktische tools.',
        'yww_event_link'        => '',
    ]);

    yww_seed_post('yww_event', 'Groep weekend training oktober', [
        'yww_event_label'       => 'Groep weekend training',
        'yww_event_type'        => 'weekend-training',
        'yww_event_year'        => 2026,
        'yww_event_month'       => 10,
        'yww_event_start_date'  => '2026-10-16T17:30:00.000Z',
        'yww_event_end_date'    => '2026-10-18T16:00:00.000Z',
        'yww_event_description' => 'Vervolgweekend met verdieping, integratie en praktische tools voor je volgende stap.',
        'yww_event_link'        => '',
    ]);
}

// ═══════════════════════════════════════
// 4. PODCASTS
// ═══════════════════════════════════════
echo "\nPodcasts...\n";
if (yww_count_posts('yww_podcast') > 0) {
    echo "  (al gevuld, overgeslagen)\n";
} else {
    $podcasts = [
        ['Episode 1', '', '00:00', '2026-02-15', '', '', 'https://www.youtube.com/watch?v=l5WYmKOh6TI&t=3s', ''],
        ['Episode 2', 'Korte teaser (1 zin) over deze aflevering.', '00:00', '2026-02-15', '', '', 'https://www.youtube.com/watch?v=oodyR6UYDBY', ''],
        ['Episode 3', 'Korte teaser (1 zin) over deze aflevering.', '00:00', '2026-02-15', '', '', '', ''],
        ['Episode 4', 'Korte teaser (1 zin) over deze aflevering.', '00:00', '2026-02-15', '', '', '', ''],
        ['Episode 5', 'Korte teaser (1 zin) over deze aflevering.', '00:00', '2026-02-15', '', '', '', ''],
        ['Episode 6', 'Korte teaser (1 zin) over deze aflevering.', '00:00', '2026-02-15', '', '', '', ''],
    ];

    foreach ($podcasts as $p) {
        yww_seed_post('yww_podcast', $p[0], [
            'yww_podcast_teaser'      => $p[1],
            'yww_podcast_duration'    => $p[2],
            'yww_podcast_date'        => $p[3],
            'yww_podcast_guest'       => $p[4],
            'yww_podcast_thumbnail'   => $p[5],
            'yww_podcast_youtube_url' => $p[6],
            'yww_podcast_spotify_url' => $p[7],
        ]);
    }
}

// ═══════════════════════════════════════
// 5. BLOGS
// ═══════════════════════════════════════
echo "\nBlogs...\n";
if (yww_count_posts('yww_blog') > 0) {
    echo "  (al gevuld, overgeslagen)\n";
} else {
    yww_seed_post('yww_blog', 'De Motivation Factor als Tool voor Richting', [
        'yww_blog_slug'           => 'motivation-factor',
        'yww_blog_featured_image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop',
    ], [
        'post_excerpt' => 'Hoe je met de Motivation Factor helder krijgt wat je energie geeft, waar je op leegloopt en welke keuzes beter bij je passen.',
    ]);

    yww_seed_post('yww_blog', 'Persoonlijke Groei in de Praktijk: Voorbeelden', [
        'yww_blog_slug'           => 'persoonlijke-groei',
        'yww_blog_featured_image' => '/persoonlijke-groei-training.jpg',
    ], [
        'post_excerpt' => 'Concrete voorbeelden van vrouwen die stappen zetten in grenzen aangeven, focus hervinden en met meer rust presteren.',
    ]);

    yww_seed_post('yww_blog', 'Vrouwelijk Leiderschap: Zichtbaar en Authentiek', [
        'yww_blog_slug'           => 'vrouwelijk-leiderschap',
        'yww_blog_featured_image' => '/vrouwelijk-leiderschap-training.webp',
    ], [
        'post_excerpt' => 'Wat vrouwelijk leiderschap vandaag vraagt, en hoe je met vertrouwen positie inneemt zonder jezelf kwijt te raken.',
    ]);
}

// ═══════════════════════════════════════
// 6. GLOBAL SETTINGS
// ═══════════════════════════════════════
echo "\nGlobal settings...\n";
$defaults = [
    'yww_footer_about'     => 'Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft, verstevig je koers en groei met gelijkgestemde vrouwen.',
    'yww_contact_email'    => 'info@youngwisewomen.nl',
    'yww_contact_phone'    => '+31 (0)6 55334728',
    'yww_social_instagram' => 'http://instagram.com/youngwisewomen',
];

foreach ($defaults as $key => $value) {
    if (!get_option($key)) {
        update_option($key, $value);
        echo "  + {$key}\n";
    } else {
        echo "  ({$key} al ingesteld)\n";
    }
}

echo "\n=== Klaar! Alle content staat nu in WordPress. ===\n";
echo "Open http://localhost:8081/wp-admin om te bewerken.\n";
