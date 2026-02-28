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

// ─── Helper: seed page content (find existing or create, always update content) ───
function yww_seed_page_content($slug, $title, $content_data) {
    $pages = get_posts([
        'post_type'      => 'page',
        'name'           => $slug,
        'posts_per_page' => 1,
        'post_status'    => 'any',
    ]);

    if (!empty($pages)) {
        $page_id = $pages[0]->ID;
        $existing = get_post_meta($page_id, 'yww_page_content', true);
        $existing_data = $existing ? json_decode($existing, true) : [];

        // Only update if most fields are empty (don't overwrite user edits)
        $empty_count = 0;
        foreach ($content_data as $key => $val) {
            if (empty($existing_data[$key] ?? '')) $empty_count++;
        }

        if ($empty_count > count($content_data) / 2) {
            update_post_meta($page_id, 'yww_page_content', wp_json_encode($content_data, JSON_UNESCAPED_UNICODE));
            echo "  ~ {$title} (ID: {$page_id}) bijgewerkt ({$empty_count} lege velden gevuld)\n";
        } else {
            echo "  ({$title} al grotendeels gevuld, overgeslagen)\n";
        }
        return $page_id;
    }

    $page_id = wp_insert_post([
        'post_type'   => 'page',
        'post_title'  => $title,
        'post_name'   => $slug,
        'post_status' => 'publish',
    ]);

    if (is_wp_error($page_id)) {
        echo "  FOUT: {$title} - " . $page_id->get_error_message() . "\n";
        return 0;
    }

    update_post_meta($page_id, 'yww_page_content', wp_json_encode($content_data, JSON_UNESCAPED_UNICODE));
    echo "  + {$title} (ID: {$page_id})\n";
    return $page_id;
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
// 6. WORKSHOPS
// ═══════════════════════════════════════
echo "\nWorkshops...\n";
if (yww_count_posts('yww_workshop') > 0) {
    echo "  (al gevuld, overgeslagen)\n";
} else {
    yww_seed_post('yww_workshop', 'Female leadership workshop', [
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
    ]);

    yww_seed_post('yww_workshop', 'Workshop vitaliteit', [
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
    ]);

    yww_seed_post('yww_workshop', 'Workshop mentale weerbaarheid', [
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
    ]);

    yww_seed_post('yww_workshop', 'Workshop persoonlijke effectiviteit', [
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
    ]);
}

// ═══════════════════════════════════════
// 7. PAGE CONTENT — Voor Organisaties
// ═══════════════════════════════════════
echo "\nPagina: voor-organisaties...\n";
yww_seed_page_content('voor-organisaties', 'Bedrijfstrajecten', [
    'hero_title'      => 'Bedrijfstrajecten',
    'hero_subtitle'   => 'Het Netwerk voor jonge vrouwelijke professionals',
    'intro_heading'   => 'Jaarprogramma voor jonge vrouwelijke professionals',
    'intro_text'      => 'We begeleiden groepen jonge vrouwen een jaar lang met een combinatie van 1-op-1 coaching, groepssessies, een dag workshop en een weekend training (intensief). Zo bouwen zij rust, zelfvertrouwen en leiderschap op dat direct impact heeft op werk en welzijn.',
    'brands_heading'  => 'talent uit deze organisaties ontwikkelde zich via YWW',
    'program_heading' => 'Wat zit er in het programma',
    'program_1_title' => '1-op-1 coaching',
    'program_1_text'  => 'Persoonlijke begeleiding op thema\'s als energie, grenzen, loopbaanrichting en persoonlijk leiderschap.',
    'program_2_title' => 'Groepssessies',
    'program_2_text'  => 'Interactieve sessies waarin deelnemers van elkaar leren, samen reflecteren en eigenaarschap versterken.',
    'program_3_title' => 'Dag workshop',
    'program_3_text'  => 'Een verdiepende dag buiten de dagelijkse werkcontext om focus, rust en richting terug te pakken.',
    'program_4_title' => 'Weekend training (intensief)',
    'program_4_text'  => 'Een intensieve meerdaagse ervaring met ruimte voor reflectie, gedragsverandering en duurzame borging van inzichten.',
    'cta_heading'     => 'Interesse in een programma op maat?',
    'cta_text'        => 'We stemmen inhoud, ritme en groepsgrootte af op jullie organisatie.',
    'cta_button_1'    => 'Plan een kennismaking',
    'cta_button_2'    => 'Download brochure',
]);

// ═══════════════════════════════════════
// 8. PAGE CONTENT — Jaarprogramma's
// ═══════════════════════════════════════
echo "\nPagina: jaarprogrammas...\n";
yww_seed_page_content('jaarprogrammas', 'Jaarprogramma\'s', [
    'hero_title'             => 'Jaarprogramma\'s',
    'hero_subtitle'          => 'Langlopende ontwikkelprogramma\'s voor jonge vrouwen die duurzaam willen groeien in leiderschap en persoonlijke kracht.',
    'intro_heading'          => 'Een jaar lang investeren in jouw groei als jonge professional',
    'intro_text_1'           => 'Ons jaarprogramma combineert 1-op-1 coaching, groepssessies, een dag workshop en een weekend training tot een samenhangend traject. Gedurende 12 maanden werk je structureel aan je persoonlijke en professionele ontwikkeling, met begeleiding van ervaren coaches.',
    'intro_text_2'           => 'Je bouwt stap voor stap aan rust, zelfvertrouwen en leiderschap. Het programma is ontworpen zodat je inzichten direct kunt toepassen in je werk en dagelijks leven.',
    'intro_cta'              => 'Neem contact op voor meer informatie',
    'phases_heading'         => 'De Drie Fases van het Jaarprogramma',
    'phases_intro'           => 'Elk jaarprogramma is opgebouwd uit drie fases die samen zorgen voor een duurzame transformatie.',
    'phase_1_title'          => 'Fase 1: Bewustwording',
    'phase_1_text'           => 'Je brengt in kaart wie je bent, wat je drijft en waar je naartoe wilt. Door reflectie, coaching en de Motivation Factor test krijg je helder inzicht in je patronen en kwaliteiten.',
    'phase_2_title'          => 'Fase 2: Verdieping',
    'phase_2_text'           => 'Je werkt actief aan gedragsverandering en leiderschap. In groepssessies en een weekend training ga je dieper in op je blokkades en leer je nieuwe vaardigheden toepassen.',
    'phase_3_title'          => 'Fase 3: Integratie',
    'phase_3_text'           => 'Je borgt je ontwikkeling en maakt het onderdeel van je dagelijks leven. Met een concreet actieplan en terugkomsessies zorg je dat je groei duurzaam doorwerkt.',
    'for_whom_heading'       => 'Voor wie zijn onze jaarprogramma\'s',
    'for_whom_intro'         => 'Dit programma is speciaal ontworpen voor jonge professionals (24+) die:',
    'for_whom_items'         => "✓ Duurzaam willen groeien over een langere periode\n✓ Behoefte hebben aan structuur en begeleiding in hun ontwikkeling\n✓ Willen investeren in zowel persoonlijk als professioneel leiderschap\n✓ Een community zoeken van gelijkgestemde jonge vrouwen",
    'edition_label'          => 'JAARPROGRAMMA',
    'edition_heading'        => 'Young Wise Women Jaarprogramma',
    'edition_subtitle'       => '12 maanden persoonlijke en professionele groei met coaching, groepssessies en intensieve trainingen',
    'edition_dates'          => 'Start meerdere momenten per jaar',
    'edition_duration'       => 'Doorlooptijd: 12 maanden',
    'edition_location'       => 'Castricum, Friesland & online',
    'edition_location_detail' => 'Combinatie van fysieke bijeenkomsten en online sessies',
    'edition_audience'       => 'Voor jonge vrouwelijke professionals (24+)',
    'edition_availability'   => 'Kleine groepen van 8 tot 12 deelnemers',
    'program_heading'        => 'Programma-opbouw per fase',
    'phase_detail_1_label'   => 'Fase 1 — Bewustwording (maand 1-4)',
    'phase_detail_1_text'    => 'Intake en Motivation Factor test • Kennismaking met je groep • 1-op-1 coachingsessies • Reflectie op patronen, drijfveren en doelen • Eerste groepssessies met thema\'s als grenzen en energie',
    'phase_detail_2_label'   => 'Fase 2 — Verdieping (maand 5-8)',
    'phase_detail_2_text'    => 'Verdiepende groepssessies en 1-op-1 coaching • Dag workshop met focus op leiderschap en effectiviteit • Weekend training (intensief) met reflectie, ademwerk en praktische tools • Werken aan beperkende overtuigingen en gedragsverandering',
    'phase_detail_3_label'   => 'Fase 3 — Integratie (maand 9-12)',
    'phase_detail_3_text'    => 'Borging van inzichten in dagelijks leven en werk • Afsluitende coachingsessies • Terugkomdag met de groep • Concreet actieplan voor na het programma • Afsluiting en certificering',
    'transform_heading'      => 'Jouw Transformatie',
    'goodbye_heading'        => 'Waar je Afscheid van Neemt',
    'goodbye_text'           => 'Je laat het gevoel van vastlopen, constant aanpassen en twijfelen achter je. Na een jaar heb je helder wat je wilt en de tools om ernaar te handelen.',
    'takeaway_heading'       => 'Wat je Meeneemt',
    'takeaway_text'          => 'Diepgaand zelfinzicht, sterker leiderschap en een netwerk van gelijkgestemde vrouwen. Je hebt concrete vaardigheden die je dagelijks inzet.',
    'nextstep_heading'       => 'Jouw Volgende Stap',
    'nextstep_text'          => 'Je sluit het programma af met een concreet actieplan en de zekerheid dat je groei duurzaam doorzet, ondersteund door je community.',
    'sidebar_investment_heading' => 'Investering',
    'sidebar_investment_items'   => "✓ Maandelijks te betalen of in één keer\n✓ Vaak vergoed via opleidingsbudget werkgever\n✓ Inclusief alle materialen en tools",
    'sidebar_included_heading'   => 'Inclusief',
    'sidebar_included_items'     => "✓ 1-op-1 coachingsessies met gecertificeerde coach\n✓ Maandelijkse groepssessies\n✓ Dag workshop en weekend training\n✓ Motivation Factor test (t.w.v. €145)\n✓ Werkboek en praktische tools",
    'sidebar_practical_heading'  => 'Praktisch',
    'sidebar_practical_items'    => "✓ Duur: 12 maanden\n✓ Locatie: Castricum / Friesland / online\n✓ Groepsgrootte: 8 tot 12 deelnemers\n✓ Start: meerdere momenten per jaar",
    'cta_heading'            => 'Klaar om te groeien?',
    'cta_text'               => 'Neem contact op voor een vrijblijvend kennismakingsgesprek en ontdek welk programma bij jou past.',
    'cta_button_1'           => 'Neem contact op',
    'cta_button_2'           => 'Bekijk kalender',
]);

// ═══════════════════════════════════════
// 9. PAGE CONTENT — Losse Workshops
// ═══════════════════════════════════════
echo "\nPagina: losse-workshops...\n";
yww_seed_page_content('losse-workshops', 'Losse Workshops', [
    'hero_title'              => 'Losse workshops',
    'hero_subtitle'           => 'Flexibele dag workshops voor jonge professionals die gericht willen werken aan een specifiek thema.',
    'transform_heading'       => 'Jouw Transformatie',
    'goodbye_heading'         => 'Waar je Afscheid van Neemt',
    'goodbye_text'            => 'Je laat twijfel, uitstelgedrag en het gevoel van \'moet ik nog meer?\' los, zodat je met meer rust en focus keuzes maakt.',
    'takeaway_heading'        => 'Wat je Meeneemt',
    'takeaway_text'           => 'Praktische handvatten, meer energie en heldere prioriteiten die je direct toepast in werk en dagelijks leven.',
    'nextstep_heading'        => 'Jouw Volgende Stap',
    'nextstep_text'           => 'Je gaat naar huis met een concreet actieplan, zodat je ontwikkeling na de workshop direct doorloopt.',
    'for_whom_heading'        => 'Voor wie zijn onze workshops',
    'for_whom_intro'          => 'Deze losse workshops zijn ideaal voor jonge professionals (24+) die:',
    'for_whom_items'          => "✓ Snel en gericht willen werken aan een specifiek thema\n✓ Praktische tools zoeken die direct toepasbaar zijn\n✓ Een dag willen investeren in persoonlijke groei\n✓ Willen groeien met steun van een groep gelijkgestemde vrouwen",
    'sidebar_what_heading'    => 'Wat je krijgt',
    'sidebar_what_items'      => "✓ Praktische handvatten die direct toepasbaar zijn\n✓ Persoonlijke reflectie-oefeningen en werkmateriaal\n✓ Feedback van coaches en de groep\n✓ Concreet actieplan voor de weken erna",
    'sidebar_practical_heading' => 'Praktisch',
    'sidebar_practical_items' => "✓ Tijd: 09:30 - 17:00\n✓ Locatie: Castricum\n✓ Groepsgrootte: 10 tot 14 deelnemers\n✓ Inclusief lunch, koffie, thee en werkmateriaal",
    'sidebar_not_for_heading' => 'Voor wie niet',
    'sidebar_not_for_items'   => "• Als je alleen theorie wilt zonder oefenen\n• Als je geen ruimte hebt om te reflecteren\n• Als je nu geen concrete verandering wilt maken",
]);

// ═══════════════════════════════════════
// 10. GLOBAL SETTINGS
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
