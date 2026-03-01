<?php
/**
 * Plugin Name: YWW Admin UI
 * Description: Meta boxes and options pages for YWW content types.
 * Version: 1.0.0
 * Author: YWW
 */

if (!defined('ABSPATH')) exit;

// ─── Enqueue WordPress Media Library on admin pages ───
add_action('admin_enqueue_scripts', function () {
    wp_enqueue_media();
});

// ─────────────────────────────────────────────
// 1. META BOXES
// ─────────────────────────────────────────────

add_action('add_meta_boxes', 'yww_add_meta_boxes');

function yww_add_meta_boxes() {
    // Coach meta box
    add_meta_box('yww_coach_details', 'Coach Details', 'yww_coach_meta_box', 'yww_coach', 'normal', 'high');

    // Testimonial meta box
    add_meta_box('yww_testimonial_details', 'Testimonial Details', 'yww_testimonial_meta_box', 'yww_testimonial', 'normal', 'high');

    // Event meta box
    add_meta_box('yww_event_details', 'Event Details', 'yww_event_meta_box', 'yww_event', 'normal', 'high');

    // Podcast meta box
    add_meta_box('yww_podcast_details', 'Podcast Details', 'yww_podcast_meta_box', 'yww_podcast', 'normal', 'high');

    // Blog meta box
    add_meta_box('yww_blog_details', 'Blog Details', 'yww_blog_meta_box', 'yww_blog', 'normal', 'high');

    // Workshop meta box
    add_meta_box('yww_workshop_details', 'Workshop Details', 'yww_workshop_meta_box', 'yww_workshop', 'normal', 'high');

    // FAQ meta box
    add_meta_box('yww_faq_details', 'FAQ Details', 'yww_faq_meta_box', 'yww_faq', 'normal', 'high');

    // Page content meta box (only on pages with specific slugs)
    add_meta_box('yww_page_content', 'Pagina Teksten (CMS)', 'yww_page_content_meta_box', 'page', 'normal', 'high');
}

// ─── Helper: render a text input ───
function yww_text_field($post_id, $meta_key, $label, $type = 'text') {
    $value = get_post_meta($post_id, $meta_key, true);
    echo '<p><label><strong>' . esc_html($label) . '</strong><br>';
    echo '<input type="' . esc_attr($type) . '" name="' . esc_attr($meta_key) . '" value="' . esc_attr($value) . '" style="width:100%;" /></label></p>';
}

// ─── Helper: render a textarea ───
function yww_textarea_field($post_id, $meta_key, $label, $rows = 4) {
    $value = get_post_meta($post_id, $meta_key, true);
    echo '<p><label><strong>' . esc_html($label) . '</strong><br>';
    echo '<textarea name="' . esc_attr($meta_key) . '" rows="' . $rows . '" style="width:100%;">' . esc_textarea($value) . '</textarea></label></p>';
}

// ─── Helper: render a select ───
function yww_select_field($post_id, $meta_key, $label, $options) {
    $value = get_post_meta($post_id, $meta_key, true);
    echo '<p><label><strong>' . esc_html($label) . '</strong><br>';
    echo '<select name="' . esc_attr($meta_key) . '" style="width:100%;">';
    foreach ($options as $opt_value => $opt_label) {
        echo '<option value="' . esc_attr($opt_value) . '"' . selected($value, $opt_value, false) . '>' . esc_html($opt_label) . '</option>';
    }
    echo '</select></label></p>';
}

// ─── Coach Meta Box ───
function yww_coach_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_textarea_field($post->ID, 'yww_coach_bio', 'Bio', 6);
    yww_text_field($post->ID, 'yww_coach_role', 'Rol');
    yww_text_field($post->ID, 'yww_coach_image', 'Foto URL');
    yww_text_field($post->ID, 'yww_coach_order', 'Volgorde', 'number');
}

// ─── Testimonial Meta Box ───
function yww_testimonial_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_text_field($post->ID, 'yww_testimonial_name', 'Naam');
    yww_text_field($post->ID, 'yww_testimonial_date_label', 'Datum label (bijv. "Deelnemer oktober 2025")');
    yww_textarea_field($post->ID, 'yww_testimonial_quote', 'Quote', 6);
    yww_text_field($post->ID, 'yww_testimonial_image', 'Foto URL');
    yww_text_field($post->ID, 'yww_testimonial_order', 'Volgorde', 'number');
}

// ─── Event Meta Box ───
function yww_event_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_text_field($post->ID, 'yww_event_label', 'Label (bijv. "Groep weekend training")');
    yww_select_field($post->ID, 'yww_event_type', 'Type', [
        'weekend-training' => 'Weekend Training',
        'workshop'         => 'Workshop',
        'terugkom-dag'     => 'Terugkom Dag',
        'retreat'          => 'Retreat',
        'mini-retreat'     => 'Mini Retreat',
        'sunday-gathering' => 'Sunday Gathering',
        'creative-event'   => 'Creative Event',
    ]);
    yww_text_field($post->ID, 'yww_event_year', 'Jaar', 'number');
    yww_text_field($post->ID, 'yww_event_month', 'Maand (1-12)', 'number');
    yww_text_field($post->ID, 'yww_event_start_date', 'Startdatum (ISO format, bijv. 2026-06-24T17:30:00.000Z)');
    yww_text_field($post->ID, 'yww_event_end_date', 'Einddatum (ISO format)');
    yww_textarea_field($post->ID, 'yww_event_description', 'Beschrijving', 3);
    yww_text_field($post->ID, 'yww_event_link', 'Link URL');
}

// ─── Podcast Meta Box ───
function yww_podcast_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_textarea_field($post->ID, 'yww_podcast_teaser', 'Teaser', 2);
    yww_text_field($post->ID, 'yww_podcast_duration', 'Duur (bijv. "45:30")');
    yww_text_field($post->ID, 'yww_podcast_date', 'Datum (YYYY-MM-DD)');
    yww_text_field($post->ID, 'yww_podcast_guest', 'Gast');
    yww_text_field($post->ID, 'yww_podcast_thumbnail', 'Thumbnail URL');
    yww_text_field($post->ID, 'yww_podcast_youtube_url', 'YouTube URL');
    yww_text_field($post->ID, 'yww_podcast_spotify_url', 'Spotify URL');
}

// ─── Blog Meta Box ───
function yww_blog_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_text_field($post->ID, 'yww_blog_slug', 'Slug (bijv. "motivation-factor")');
    yww_text_field($post->ID, 'yww_blog_featured_image', 'Featured Image URL');
}

// ─── Workshop Meta Box ───
function yww_workshop_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_text_field($post->ID, 'yww_workshop_subtitle', 'Ondertitel');
    yww_textarea_field($post->ID, 'yww_workshop_description', 'Beschrijving', 4);
    yww_text_field($post->ID, 'yww_workshop_next_date', 'Eerstvolgende datum (bijv. "20 maart 2026")');
    yww_text_field($post->ID, 'yww_workshop_from_price', 'Prijs (bijv. "EUR 245")');
    yww_text_field($post->ID, 'yww_workshop_duration', 'Duur (bijv. "09:30 - 17:00")');
    yww_text_field($post->ID, 'yww_workshop_location', 'Locatie');
    yww_text_field($post->ID, 'yww_workshop_audience', 'Doelgroep');
    yww_textarea_field($post->ID, 'yww_workshop_goal', 'Doel', 3);
    yww_textarea_field($post->ID, 'yww_workshop_program', 'Programma onderdelen (1 per regel)', 4);
    yww_text_field($post->ID, 'yww_workshop_investment', 'Investering tekst');
    yww_text_field($post->ID, 'yww_workshop_order', 'Volgorde', 'number');
}

// ─── FAQ Meta Box ───
function yww_faq_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_textarea_field($post->ID, 'yww_faq_answer', 'Antwoord', 6);
    yww_text_field($post->ID, 'yww_faq_page', 'Pagina slug (bijv. "weekend-intensive")');
    yww_text_field($post->ID, 'yww_faq_order', 'Volgorde', 'number');
}

// ─── Page Content Meta Box ───
function yww_page_content_meta_box($post) {
    wp_nonce_field('yww_save_page_content', 'yww_page_content_nonce');

    $slug = $post->post_name;
    $fields = yww_get_page_fields($slug);

    if (empty($fields)) {
        echo '<p style="color:#666;">Sla de pagina eerst op met een slug, dan verschijnen hier de tekstvelden.</p>';
        echo '<p>Ondersteunde slugs: <code>home</code>, <code>weekenden</code>, <code>weekend-intensive</code>, <code>workshops</code>, <code>ons-verhaal</code>, <code>contact</code>, <code>voor-organisaties</code>, <code>kalender</code>, <code>lid-worden</code>, <code>retreats</code>, <code>inspiratie</code>, <code>losse-workshops</code>, <code>jaarprogrammas</code></p>';
        echo '<p style="color:#888;"><em>Productie aliassen werken ook: groepstrainingen, persoonlijke-ontwikkeling-weekend-training, weekend-intensive-juni-2026, ontwikkeling-workshops, in-company, evenementen</em></p>';
        return;
    }

    $json = get_post_meta($post->ID, 'yww_page_content', true);
    $data = $json ? json_decode($json, true) : [];
    if (!is_array($data)) $data = [];

    $current_section = '';
    foreach ($fields as $key => $field) {
        // Section header
        if (isset($field['section']) && $field['section'] !== $current_section) {
            $current_section = $field['section'];
            echo '<h3 style="margin-top:20px;padding:8px 0;border-bottom:2px solid #2271b1;color:#2271b1;">' . esc_html($current_section) . '</h3>';
        }

        $value = isset($data[$key]) ? $data[$key] : '';
        $name = 'yww_pc_' . $key;
        $type = isset($field['type']) ? $field['type'] : 'text';

        echo '<p><label><strong>' . esc_html($field['label']) . '</strong>';
        if (isset($field['hint'])) {
            echo ' <span style="color:#666;font-weight:normal;">(' . esc_html($field['hint']) . ')</span>';
        }
        echo '<br>';

        if ($type === 'textarea') {
            $rows = isset($field['rows']) ? $field['rows'] : 4;
            echo '<textarea name="' . esc_attr($name) . '" rows="' . $rows . '" style="width:100%;">' . esc_textarea($value) . '</textarea>';
        } elseif ($type === 'image') {
            $preview_id = 'preview_' . esc_attr($key);
            $input_id = 'input_' . esc_attr($key);
            $btn_id = 'btn_' . esc_attr($key);
            $clear_id = 'clear_' . esc_attr($key);
            echo '<div style="display:flex;gap:6px;align-items:center;">';
            echo '<input type="text" id="' . $input_id . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" style="width:100%;" oninput="document.getElementById(\'' . $preview_id . '\').src=this.value;document.getElementById(\'' . $preview_id . '\').style.display=this.value?\'block\':\'none\';" />';
            echo '<button type="button" id="' . $btn_id . '" class="button" style="white-space:nowrap;">Foto kiezen</button>';
            echo '<button type="button" id="' . $clear_id . '" class="button" style="white-space:nowrap;color:#b32d2e;" title="Verwijder foto">✕</button>';
            echo '</div>';
            echo '<img id="' . $preview_id . '" src="' . esc_attr($value) . '" style="max-width:300px;max-height:180px;margin-top:8px;border-radius:6px;border:1px solid #ddd;object-fit:cover;' . ($value ? '' : 'display:none;') . '" />';
            echo '<script>jQuery(function($){';
            echo '$("#' . $btn_id . '").on("click",function(e){e.preventDefault();var frame=wp.media({title:"Kies een afbeelding",button:{text:"Gebruik deze afbeelding"},multiple:false});frame.on("select",function(){var url=frame.state().get("selection").first().toJSON().url;$("#' . $input_id . '").val(url).trigger("input");});frame.open();});';
            echo '$("#' . $clear_id . '").on("click",function(e){e.preventDefault();$("#' . $input_id . '").val("").trigger("input");});';
            echo '});</script>';
        } else {
            echo '<input type="text" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" style="width:100%;" />';
        }

        echo '</label></p>';
    }
}

// ─── Page fields definition per slug ───
function yww_get_page_fields($slug) {
    // Productie slugs → lokale slugs alias mapping
    $aliases = [
        'groepstrainingen'                          => 'retreats',
        'persoonlijke-ontwikkeling-weekend-training' => 'weekenden',
        'weekend-intensive-juni-2026'                => 'weekend-intensive',
        'ontwikkeling-workshops'                     => 'workshops',
        'in-company'                                 => 'voor-organisaties',
        'evenementen'                                => 'kalender',
    ];
    if (isset($aliases[$slug])) {
        $slug = $aliases[$slug];
    }

    $pages = [
        'home' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel'],
            'hero_video_url'       => ['label' => 'Hero Video URL', 'type' => 'image', 'hint' => 'MP4 video URL'],
            'atmosphere_heading'   => ['label' => 'Heading', 'section' => 'Sfeer / Evenementen'],
            'atmosphere_text'      => ['label' => 'Tekst', 'type' => 'textarea'],
            'atmosphere_cta'       => ['label' => 'CTA knop tekst'],
            'atmosphere_image_1'   => ['label' => 'Sfeer foto 1', 'type' => 'image'],
            'atmosphere_image_2'   => ['label' => 'Sfeer foto 2', 'type' => 'image'],
            'atmosphere_image_3'   => ['label' => 'Sfeer foto 3', 'type' => 'image'],
            'benefits_heading'     => ['label' => 'Heading', 'section' => 'Voordelen'],
            'benefits_intro'       => ['label' => 'Introductie tekst', 'type' => 'textarea'],
            'benefit_1_title'      => ['label' => 'Voordeel 1 titel'],
            'benefit_1_text'       => ['label' => 'Voordeel 1 tekst', 'type' => 'textarea'],
            'benefit_2_title'      => ['label' => 'Voordeel 2 titel'],
            'benefit_2_text'       => ['label' => 'Voordeel 2 tekst', 'type' => 'textarea'],
            'benefit_3_title'      => ['label' => 'Voordeel 3 titel'],
            'benefit_3_text'       => ['label' => 'Voordeel 3 tekst', 'type' => 'textarea'],
            'benefit_4_title'      => ['label' => 'Voordeel 4 titel'],
            'benefit_4_text'       => ['label' => 'Voordeel 4 tekst', 'type' => 'textarea'],
            'trainingen_heading'   => ['label' => 'Heading', 'section' => 'Trainingen Spotlight'],
            'trainingen_text'      => ['label' => 'Tekst', 'type' => 'textarea'],
            'trainingen_cta'       => ['label' => 'CTA knop tekst'],
            'trainingen_image'     => ['label' => 'Trainingen foto', 'type' => 'image'],
            'coaches_heading'      => ['label' => 'Heading', 'section' => 'Coaches'],
            'coaches_intro'        => ['label' => 'Subtitel'],
            'coaches_text'         => ['label' => 'Tekst', 'type' => 'textarea'],
            'coaches_cta'          => ['label' => 'CTA knop tekst'],
            'next_retreat_heading' => ['label' => 'Heading', 'section' => 'Volgende Weekend'],
            'next_retreat_date_text' => ['label' => 'Type label (bijv. "Weekend training (intensief)")'],
            'next_retreat_time'    => ['label' => 'Tijd tekst'],
            'next_retreat_description' => ['label' => 'Beschrijving', 'type' => 'textarea'],
            'inclusions'           => ['label' => 'Inbegrepen items', 'type' => 'textarea', 'hint' => '1 per regel, met of zonder checkmark'],
            'investment_heading'   => ['label' => 'Investering heading', 'section' => 'Investering'],
            'investment_price'     => ['label' => 'Prijs'],
            'investment_note'      => ['label' => 'Opmerking', 'type' => 'textarea'],
            'results_heading'      => ['label' => 'Heading', 'section' => 'Resultaten'],
            'result_1'             => ['label' => 'Resultaat 1', 'type' => 'textarea'],
            'result_2'             => ['label' => 'Resultaat 2', 'type' => 'textarea'],
            'result_3'             => ['label' => 'Resultaat 3', 'type' => 'textarea'],
            'bedrijf_heading'      => ['label' => 'Heading', 'section' => 'Bedrijfstrajecten'],
            'bedrijf_text'         => ['label' => 'Tekst', 'type' => 'textarea'],
            'bedrijf_cta'          => ['label' => 'CTA knop tekst'],
            'bedrijf_image'        => ['label' => 'Achtergrond foto', 'type' => 'image'],
        ],
        'weekenden' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'intro_heading'        => ['label' => 'SEO Heading', 'section' => 'Introductie'],
            'intro_text_1'         => ['label' => 'Introductie tekst 1', 'type' => 'textarea'],
            'intro_text_2'         => ['label' => 'Introductie tekst 2', 'type' => 'textarea'],
            'intro_cta'            => ['label' => 'CTA knop tekst'],
            'pillars_heading'      => ['label' => 'Heading', 'section' => 'Drie Pijlers'],
            'pillars_intro'        => ['label' => 'Introductie', 'type' => 'textarea'],
            'pillar_1_title'       => ['label' => 'Pijler 1 titel'],
            'pillar_1_text'        => ['label' => 'Pijler 1 tekst', 'type' => 'textarea'],
            'pillar_2_title'       => ['label' => 'Pijler 2 titel'],
            'pillar_2_text'        => ['label' => 'Pijler 2 tekst', 'type' => 'textarea'],
            'pillar_3_title'       => ['label' => 'Pijler 3 titel'],
            'pillar_3_text'        => ['label' => 'Pijler 3 tekst', 'type' => 'textarea'],
            'gallery_heading'      => ['label' => 'Heading', 'section' => 'Foto Galerij'],
            'gallery_subtitle'     => ['label' => 'Subtitel'],
            'gallery_images'       => ['label' => 'Galerij foto URLs', 'type' => 'textarea', 'hint' => '1 URL per regel, maximaal 9 foto\'s', 'rows' => 10],
            'for_whom_heading'     => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'       => ['label' => 'Introductie'],
            'for_whom_1'           => ['label' => 'Blok 1', 'type' => 'textarea'],
            'for_whom_2'           => ['label' => 'Blok 2', 'type' => 'textarea'],
            'for_whom_3'           => ['label' => 'Blok 3', 'type' => 'textarea'],
            'for_whom_4'           => ['label' => 'Blok 4', 'type' => 'textarea'],
            'edition_label'        => ['label' => 'Editie label (bijv. "4DE EDITIE")', 'section' => 'Volgende Editie'],
            'edition_heading'      => ['label' => 'Editie heading'],
            'edition_subtitle'     => ['label' => 'Editie subtitel'],
            'edition_dates'        => ['label' => 'Datum tekst'],
            'edition_times'        => ['label' => 'Tijden tekst'],
            'edition_next_date'    => ['label' => 'Volgende datum tekst'],
            'edition_location'     => ['label' => 'Locatie'],
            'edition_location_detail' => ['label' => 'Locatie detail'],
            'edition_audience'     => ['label' => 'Doelgroep'],
            'edition_availability' => ['label' => 'Beschikbaarheid'],
            'program_heading'      => ['label' => 'Heading', 'section' => 'Programma'],
            'day_1_label'          => ['label' => 'Dag 1 label'],
            'day_1_text'           => ['label' => 'Dag 1 tekst', 'type' => 'textarea'],
            'day_1_image'          => ['label' => 'Dag 1 foto', 'type' => 'image'],
            'day_2_label'          => ['label' => 'Dag 2 label'],
            'day_2_text'           => ['label' => 'Dag 2 tekst', 'type' => 'textarea'],
            'day_2_image'          => ['label' => 'Dag 2 foto', 'type' => 'image'],
            'day_3_label'          => ['label' => 'Dag 3 label'],
            'day_3_text'           => ['label' => 'Dag 3 tekst', 'type' => 'textarea'],
            'day_3_image'          => ['label' => 'Dag 3 foto', 'type' => 'image'],
            'location_heading'     => ['label' => 'Heading', 'section' => 'Locatie'],
            'location_text'        => ['label' => 'Tekst', 'type' => 'textarea'],
            'location_image'       => ['label' => 'Locatie achtergrond foto', 'type' => 'image'],
            'transform_heading'    => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'      => ['label' => 'Afscheid heading'],
            'goodbye_1'            => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'     => ['label' => 'Meenemen heading'],
            'takeaway_1'           => ['label' => 'Meenemen tekst 1', 'type' => 'textarea'],
            'takeaway_2'           => ['label' => 'Meenemen tekst 2', 'type' => 'textarea'],
            'takeaway_3'           => ['label' => 'Meenemen tekst 3', 'type' => 'textarea'],
            'nextstep_heading'     => ['label' => 'Volgende stap heading'],
            'nextstep_text'        => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'breathwork_heading'   => ['label' => 'Heading', 'section' => 'Breathwork & Yoga'],
            'breathwork_subtitle'  => ['label' => 'Subtitel', 'type' => 'textarea'],
            'breathwork_benefits'  => ['label' => 'Breathwork voordelen', 'type' => 'textarea', 'hint' => '1 per regel'],
            'breathwork_image'     => ['label' => 'Breathwork foto', 'type' => 'image'],
            'yoga_heading'         => ['label' => 'Yoga heading'],
            'yoga_subtitle'        => ['label' => 'Yoga subtitel', 'type' => 'textarea'],
            'yoga_benefits'        => ['label' => 'Yoga voordelen', 'type' => 'textarea', 'hint' => '1 per regel'],
            'yoga_image'           => ['label' => 'Yoga foto', 'type' => 'image'],
            'highlight_heading'    => ['label' => 'Heading', 'section' => 'Weekend Training Highlight'],
            'highlight_when'       => ['label' => 'Wanneer'],
            'highlight_where'      => ['label' => 'Waar'],
            'highlight_audience'   => ['label' => 'Voor wie'],
            'highlight_capacity'   => ['label' => 'Capaciteit'],
            'highlight_inclusions' => ['label' => 'Inbegrepen items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'highlight_program_heading' => ['label' => 'Programma heading'],
            'highlight_day_1'      => ['label' => 'Dag 1 tekst', 'type' => 'textarea'],
            'highlight_day_2'      => ['label' => 'Dag 2 tekst', 'type' => 'textarea'],
            'highlight_day_3'      => ['label' => 'Dag 3 tekst', 'type' => 'textarea'],
        ],
        'weekend-intensive' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero foto', 'type' => 'image'],
            'intro_heading'        => ['label' => 'Heading', 'section' => 'Introductie'],
            'intro_text'           => ['label' => 'Tekst', 'type' => 'textarea'],
            'when_label'           => ['label' => 'Wanneer label', 'section' => 'Praktisch'],
            'when_text'            => ['label' => 'Wanneer tekst'],
            'where_label'          => ['label' => 'Waar label'],
            'where_text'           => ['label' => 'Waar tekst'],
            'group_label'          => ['label' => 'Groep label'],
            'group_text'           => ['label' => 'Groep tekst'],
            'rooms_label'          => ['label' => 'Kamers label'],
            'rooms_text'           => ['label' => 'Kamers tekst'],
            'additional_text'      => ['label' => 'Extra tekst', 'type' => 'textarea'],
            'video_heading'        => ['label' => 'Video heading', 'section' => 'Video'],
            'video_preview_image'  => ['label' => 'Video preview afbeelding', 'type' => 'image'],
            'about_heading'        => ['label' => 'Heading', 'section' => 'Over dit evenement'],
            'about_text_1'         => ['label' => 'Tekst 1', 'type' => 'textarea'],
            'about_text_2'         => ['label' => 'Tekst 2', 'type' => 'textarea'],
            'for_whom_heading'     => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'results_heading'      => ['label' => 'Heading', 'section' => 'Resultaten'],
            'results_items'        => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'included_heading'     => ['label' => 'Heading', 'section' => 'Inbegrepen'],
            'included_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'caption_1'            => ['label' => 'Foto caption 1', 'section' => 'Foto Captions'],
            'caption_2'            => ['label' => 'Foto caption 2'],
            'book_heading'         => ['label' => 'Heading', 'section' => 'Boek Sectie'],
            'book_text'            => ['label' => 'Tekst', 'type' => 'textarea'],
            'book_cta'             => ['label' => 'CTA knop tekst'],
            'faq_heading'          => ['label' => 'FAQ Heading', 'section' => 'FAQ'],
            'availability_label'   => ['label' => 'Label', 'section' => 'Beschikbaarheid'],
            'availability_text'    => ['label' => 'Tekst (bijv. "3 van 8")'],
            'availability_note'    => ['label' => 'Opmerking'],
            'package_1_title'      => ['label' => 'Pakket 1 titel', 'section' => 'Pakketten'],
            'package_1_subtitle'   => ['label' => 'Pakket 1 subtitel'],
            'package_1_price'      => ['label' => 'Pakket 1 prijs'],
            'package_1_note'       => ['label' => 'Pakket 1 opmerking'],
            'package_2_title'      => ['label' => 'Pakket 2 titel'],
            'package_2_subtitle'   => ['label' => 'Pakket 2 subtitel'],
            'package_2_price'      => ['label' => 'Pakket 2 prijs'],
            'package_2_note'       => ['label' => 'Pakket 2 opmerking'],
            'package_3_title'      => ['label' => 'Pakket 3 titel'],
            'package_3_subtitle'   => ['label' => 'Pakket 3 subtitel'],
            'package_3_price'      => ['label' => 'Pakket 3 prijs'],
            'package_3_note'       => ['label' => 'Pakket 3 opmerking'],
            'form_heading'         => ['label' => 'Formulier heading', 'section' => 'Formulier'],
            'success_title'        => ['label' => 'Succes titel', 'section' => 'Succes Bericht'],
            'success_text'         => ['label' => 'Succes tekst', 'type' => 'textarea'],
            'success_signature'    => ['label' => 'Ondertekening'],
            'sidebar_benefit_1'    => ['label' => 'Sidebar voordeel 1', 'section' => 'Sidebar'],
            'sidebar_benefit_2'    => ['label' => 'Sidebar voordeel 2'],
            'related_heading'      => ['label' => 'Heading', 'section' => 'Gerelateerd'],
            'related_links'        => ['label' => 'Links', 'type' => 'textarea', 'hint' => '1 per regel: label|url'],
        ],
        'workshops' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'transform_heading'    => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'      => ['label' => 'Afscheid heading'],
            'goodbye_text'         => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'     => ['label' => 'Meenemen heading'],
            'takeaway_text'        => ['label' => 'Meenemen tekst', 'type' => 'textarea'],
            'nextstep_heading'     => ['label' => 'Volgende stap heading'],
            'nextstep_text'        => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'for_whom_heading'     => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'       => ['label' => 'Introductie'],
            'for_whom_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_what_heading' => ['label' => 'Heading', 'section' => 'Sidebar: Wat je krijgt'],
            'sidebar_what_items'   => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_practical_heading' => ['label' => 'Heading', 'section' => 'Sidebar: Praktisch'],
            'sidebar_practical_items'   => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_not_for_heading'   => ['label' => 'Heading', 'section' => 'Sidebar: Voor wie niet'],
            'sidebar_not_for_items'     => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
        ],
        'ons-verhaal' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'section_1_heading'    => ['label' => 'Heading', 'section' => 'Sectie 1'],
            'section_1_text'       => ['label' => 'Tekst', 'type' => 'textarea'],
            'section_1_image'      => ['label' => 'Sectie 1 foto', 'type' => 'image'],
            'section_2_heading'    => ['label' => 'Heading', 'section' => 'Sectie 2 (Waarden)'],
            'section_2_image'      => ['label' => 'Sectie 2 foto', 'type' => 'image'],
            'section_2_items'      => ['label' => 'Waarden items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'cta_heading'          => ['label' => 'Heading', 'section' => 'CTA'],
            'cta_text'             => ['label' => 'Knop tekst'],
        ],
        'contact' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel'],
            'block_1_heading'      => ['label' => 'Heading', 'section' => 'Blok 1 (Gedachtegoed)'],
            'block_1_text'         => ['label' => 'Tekst', 'type' => 'textarea', 'rows' => 8],
            'block_2_heading'      => ['label' => 'Heading', 'section' => 'Blok 2 (Unieke Kracht)'],
            'block_2_text'         => ['label' => 'Tekst', 'type' => 'textarea', 'rows' => 8],
        ],
        'voor-organisaties' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'intro_heading'        => ['label' => 'Heading', 'section' => 'Introductie'],
            'intro_text'           => ['label' => 'Tekst', 'type' => 'textarea'],
            'brands_heading'       => ['label' => 'Brands heading', 'section' => 'Brands'],
            'program_heading'      => ['label' => 'Heading', 'section' => 'Programma'],
            'program_1_title'      => ['label' => 'Onderdeel 1 titel'],
            'program_1_text'       => ['label' => 'Onderdeel 1 tekst', 'type' => 'textarea'],
            'program_2_title'      => ['label' => 'Onderdeel 2 titel'],
            'program_2_text'       => ['label' => 'Onderdeel 2 tekst', 'type' => 'textarea'],
            'program_3_title'      => ['label' => 'Onderdeel 3 titel'],
            'program_3_text'       => ['label' => 'Onderdeel 3 tekst', 'type' => 'textarea'],
            'program_4_title'      => ['label' => 'Onderdeel 4 titel'],
            'program_4_text'       => ['label' => 'Onderdeel 4 tekst', 'type' => 'textarea'],
            'cta_heading'          => ['label' => 'Heading', 'section' => 'CTA'],
            'cta_text'             => ['label' => 'Tekst'],
            'cta_button_1'         => ['label' => 'Knop 1 tekst'],
            'cta_button_2'         => ['label' => 'Knop 2 tekst'],
        ],
        'kalender' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel'],
            'edition_label'        => ['label' => 'Editie label', 'section' => 'Volgende Editie'],
            'edition_heading'      => ['label' => 'Editie heading'],
            'edition_subtitle'     => ['label' => 'Editie subtitel'],
            'edition_dates'        => ['label' => 'Datum tekst'],
            'edition_times'        => ['label' => 'Tijden tekst'],
            'edition_next_date'    => ['label' => 'Volgende datum tekst'],
            'edition_location'     => ['label' => 'Locatie'],
            'edition_location_detail' => ['label' => 'Locatie detail'],
            'edition_audience'     => ['label' => 'Doelgroep'],
            'edition_availability' => ['label' => 'Beschikbaarheid'],
            'program_heading'      => ['label' => 'Heading', 'section' => 'Programma'],
            'day_1_label'          => ['label' => 'Dag 1 label'],
            'day_1_text'           => ['label' => 'Dag 1 tekst', 'type' => 'textarea'],
            'day_2_label'          => ['label' => 'Dag 2 label'],
            'day_2_text'           => ['label' => 'Dag 2 tekst', 'type' => 'textarea'],
            'day_3_label'          => ['label' => 'Dag 3 label'],
            'day_3_text'           => ['label' => 'Dag 3 tekst', 'type' => 'textarea'],
            'investment_heading'   => ['label' => 'Heading', 'section' => 'Investering'],
            'investment_via_employer_title' => ['label' => 'Via werkgever titel'],
            'investment_price'     => ['label' => 'Prijs'],
            'investment_price_note' => ['label' => 'Prijs opmerking'],
            'investment_employer_note' => ['label' => 'Werkgever opmerking'],
            'results_heading'      => ['label' => 'Resultaten heading'],
            'result_1'             => ['label' => 'Resultaat 1', 'type' => 'textarea'],
            'result_2'             => ['label' => 'Resultaat 2', 'type' => 'textarea'],
            'result_3'             => ['label' => 'Resultaat 3', 'type' => 'textarea'],
            'inclusions_heading'   => ['label' => 'Inbegrepen heading'],
            'inclusions'           => ['label' => 'Inbegrepen items', 'type' => 'textarea', 'hint' => '1 per regel'],
        ],
        'lid-worden' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'benefits_heading'     => ['label' => 'Heading', 'section' => 'Voordelen'],
            'benefits_intro'       => ['label' => 'Introductie tekst', 'type' => 'textarea'],
            'benefit_1_title'      => ['label' => 'Voordeel 1 titel'],
            'benefit_1_text'       => ['label' => 'Voordeel 1 tekst', 'type' => 'textarea'],
            'benefit_2_title'      => ['label' => 'Voordeel 2 titel'],
            'benefit_2_text'       => ['label' => 'Voordeel 2 tekst', 'type' => 'textarea'],
            'benefit_3_title'      => ['label' => 'Voordeel 3 titel'],
            'benefit_3_text'       => ['label' => 'Voordeel 3 tekst', 'type' => 'textarea'],
            'benefit_4_title'      => ['label' => 'Voordeel 4 titel'],
            'benefit_4_text'       => ['label' => 'Voordeel 4 tekst', 'type' => 'textarea'],
            'form_heading'         => ['label' => 'Heading', 'section' => 'Formulier'],
            'form_text'            => ['label' => 'Tekst'],
            'form_success'         => ['label' => 'Succes bericht', 'type' => 'textarea'],
            'form_button'          => ['label' => 'Knop tekst'],
            'form_privacy'         => ['label' => 'Privacy tekst', 'type' => 'textarea'],
        ],
        'retreats' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'intro_text'           => ['label' => 'Introductie tekst', 'section' => 'Introductie', 'type' => 'textarea'],
            'card_1_title'         => ['label' => 'Kaart 1 titel', 'section' => 'Trainingskaarten'],
            'card_1_text'          => ['label' => 'Kaart 1 tekst', 'type' => 'textarea'],
            'card_1_image'         => ['label' => 'Kaart 1 foto', 'type' => 'image'],
            'card_2_title'         => ['label' => 'Kaart 2 titel'],
            'card_2_text'          => ['label' => 'Kaart 2 tekst', 'type' => 'textarea'],
            'card_2_image'         => ['label' => 'Kaart 2 foto', 'type' => 'image'],
        ],
        'inspiratie' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
        ],
        'losse-workshops' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'transform_heading'    => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'      => ['label' => 'Afscheid heading'],
            'goodbye_text'         => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'     => ['label' => 'Meenemen heading'],
            'takeaway_text'        => ['label' => 'Meenemen tekst', 'type' => 'textarea'],
            'nextstep_heading'     => ['label' => 'Volgende stap heading'],
            'nextstep_text'        => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'for_whom_heading'     => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'       => ['label' => 'Introductie'],
            'for_whom_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_what_heading' => ['label' => 'Heading', 'section' => 'Sidebar: Wat je krijgt'],
            'sidebar_what_items'   => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_practical_heading' => ['label' => 'Heading', 'section' => 'Sidebar: Praktisch'],
            'sidebar_practical_items'   => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_not_for_heading'   => ['label' => 'Heading', 'section' => 'Sidebar: Voor wie niet'],
            'sidebar_not_for_items'     => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
        ],
        'jaarprogrammas' => [
            'hero_title'           => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'        => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'hero_image'           => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'intro_heading'        => ['label' => 'SEO Heading', 'section' => 'Introductie'],
            'intro_text_1'         => ['label' => 'Introductie tekst 1', 'type' => 'textarea'],
            'intro_text_2'         => ['label' => 'Introductie tekst 2', 'type' => 'textarea'],
            'intro_cta'            => ['label' => 'CTA knop tekst'],
            'phases_heading'       => ['label' => 'Heading', 'section' => 'Drie Fases'],
            'phases_intro'         => ['label' => 'Introductie', 'type' => 'textarea'],
            'phase_1_title'        => ['label' => 'Fase 1 titel'],
            'phase_1_text'         => ['label' => 'Fase 1 tekst', 'type' => 'textarea'],
            'phase_2_title'        => ['label' => 'Fase 2 titel'],
            'phase_2_text'         => ['label' => 'Fase 2 tekst', 'type' => 'textarea'],
            'phase_3_title'        => ['label' => 'Fase 3 titel'],
            'phase_3_text'         => ['label' => 'Fase 3 tekst', 'type' => 'textarea'],
            'for_whom_heading'     => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'       => ['label' => 'Introductie'],
            'for_whom_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'edition_label'        => ['label' => 'Editie label', 'section' => 'Programma Detail'],
            'edition_heading'      => ['label' => 'Editie heading'],
            'edition_subtitle'     => ['label' => 'Editie subtitel'],
            'edition_dates'        => ['label' => 'Datum tekst'],
            'edition_duration'     => ['label' => 'Doorlooptijd'],
            'edition_location'     => ['label' => 'Locatie'],
            'edition_location_detail' => ['label' => 'Locatie detail'],
            'edition_audience'     => ['label' => 'Doelgroep'],
            'edition_availability' => ['label' => 'Beschikbaarheid'],
            'program_heading'      => ['label' => 'Heading', 'section' => 'Programma per fase'],
            'phase_detail_1_label' => ['label' => 'Fase 1 label'],
            'phase_detail_1_text'  => ['label' => 'Fase 1 tekst', 'type' => 'textarea'],
            'phase_detail_2_label' => ['label' => 'Fase 2 label'],
            'phase_detail_2_text'  => ['label' => 'Fase 2 tekst', 'type' => 'textarea'],
            'phase_detail_3_label' => ['label' => 'Fase 3 label'],
            'phase_detail_3_text'  => ['label' => 'Fase 3 tekst', 'type' => 'textarea'],
            'transform_heading'    => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'      => ['label' => 'Afscheid heading'],
            'goodbye_text'         => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'     => ['label' => 'Meenemen heading'],
            'takeaway_text'        => ['label' => 'Meenemen tekst', 'type' => 'textarea'],
            'nextstep_heading'     => ['label' => 'Volgende stap heading'],
            'nextstep_text'        => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'sidebar_investment_heading' => ['label' => 'Heading', 'section' => 'Sidebar: Investering'],
            'sidebar_investment_items'   => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_included_heading'   => ['label' => 'Heading', 'section' => 'Sidebar: Inclusief'],
            'sidebar_included_items'     => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_practical_heading'  => ['label' => 'Heading', 'section' => 'Sidebar: Praktisch'],
            'sidebar_practical_items'    => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'cta_heading'          => ['label' => 'Heading', 'section' => 'CTA'],
            'cta_text'             => ['label' => 'Tekst'],
            'cta_button_1'         => ['label' => 'Knop 1 tekst'],
            'cta_button_2'         => ['label' => 'Knop 2 tekst'],
        ],
    ];

    return isset($pages[$slug]) ? $pages[$slug] : [];
}

// ─────────────────────────────────────────────
// 2. SAVE META DATA
// ─────────────────────────────────────────────

add_action('save_post', 'yww_save_meta_data');

function yww_save_meta_data($post_id) {
    if (!isset($_POST['yww_meta_nonce']) || !wp_verify_nonce($_POST['yww_meta_nonce'], 'yww_save_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // All meta keys we might save
    $meta_keys = [
        // Coach
        'yww_coach_bio', 'yww_coach_role', 'yww_coach_order', 'yww_coach_image',
        // Testimonial
        'yww_testimonial_name', 'yww_testimonial_date_label', 'yww_testimonial_quote',
        'yww_testimonial_image', 'yww_testimonial_order',
        // Event
        'yww_event_label', 'yww_event_type', 'yww_event_year', 'yww_event_month',
        'yww_event_start_date', 'yww_event_end_date', 'yww_event_description', 'yww_event_link',
        // Podcast
        'yww_podcast_teaser', 'yww_podcast_duration', 'yww_podcast_date',
        'yww_podcast_guest', 'yww_podcast_thumbnail', 'yww_podcast_youtube_url', 'yww_podcast_spotify_url',
        // Blog
        'yww_blog_slug', 'yww_blog_featured_image',
        // Workshop
        'yww_workshop_subtitle', 'yww_workshop_description', 'yww_workshop_next_date',
        'yww_workshop_from_price', 'yww_workshop_duration', 'yww_workshop_location',
        'yww_workshop_audience', 'yww_workshop_goal', 'yww_workshop_program',
        'yww_workshop_investment', 'yww_workshop_order',
        // FAQ
        'yww_faq_answer', 'yww_faq_page', 'yww_faq_order',
    ];

    // Textarea fields that should preserve newlines
    $textarea_keys = [
        'yww_coach_bio', 'yww_testimonial_quote', 'yww_event_description',
        'yww_podcast_teaser', 'yww_workshop_description', 'yww_workshop_goal',
        'yww_workshop_program', 'yww_faq_answer',
    ];

    foreach ($meta_keys as $key) {
        if (isset($_POST[$key])) {
            if (in_array($key, $textarea_keys)) {
                update_post_meta($post_id, $key, sanitize_textarea_field(wp_unslash($_POST[$key])));
            } else {
                update_post_meta($post_id, $key, sanitize_text_field(wp_unslash($_POST[$key])));
            }
        }
    }
}

// ─── Save Page Content as JSON ───
add_action('save_post_page', 'yww_save_page_content_data');

function yww_save_page_content_data($post_id) {
    if (!isset($_POST['yww_page_content_nonce']) || !wp_verify_nonce($_POST['yww_page_content_nonce'], 'yww_save_page_content')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $slug = get_post_field('post_name', $post_id);
    $fields = yww_get_page_fields($slug);

    if (empty($fields)) {
        return;
    }

    $data = [];
    foreach ($fields as $key => $field) {
        $name = 'yww_pc_' . $key;
        if (isset($_POST[$name])) {
            $type = isset($field['type']) ? $field['type'] : 'text';
            if ($type === 'textarea') {
                $data[$key] = sanitize_textarea_field(wp_unslash($_POST[$name]));
            } else {
                $data[$key] = sanitize_text_field(wp_unslash($_POST[$name]));
            }
        }
    }

    update_post_meta($post_id, 'yww_page_content', wp_slash(wp_json_encode($data, JSON_UNESCAPED_UNICODE)));
}

// ─────────────────────────────────────────────
// 3. OPTIONS PAGE FOR GLOBAL SETTINGS
// ─────────────────────────────────────────────

add_action('admin_menu', 'yww_add_options_page');

function yww_add_options_page() {
    add_options_page(
        'YWW Instellingen',
        'YWW Instellingen',
        'manage_options',
        'yww-settings',
        'yww_options_page_html'
    );
}

add_action('admin_init', 'yww_register_settings');

function yww_register_settings() {
    // Footer section
    add_settings_section('yww_footer_section', 'Footer', null, 'yww-settings');

    register_setting('yww-settings', 'yww_footer_about');
    add_settings_field('yww_footer_about', 'Over tekst', function () {
        $value = get_option('yww_footer_about', '');
        echo '<textarea name="yww_footer_about" rows="3" class="large-text">' . esc_textarea($value) . '</textarea>';
    }, 'yww-settings', 'yww_footer_section');

    register_setting('yww-settings', 'yww_footer_copyright');
    add_settings_field('yww_footer_copyright', 'Copyright tekst', function () {
        $value = get_option('yww_footer_copyright', '');
        echo '<input type="text" name="yww_footer_copyright" value="' . esc_attr($value) . '" class="regular-text" />';
    }, 'yww-settings', 'yww_footer_section');

    // Contact section
    add_settings_section('yww_contact_section', 'Contact', null, 'yww-settings');

    register_setting('yww-settings', 'yww_contact_email');
    add_settings_field('yww_contact_email', 'E-mail', function () {
        $value = get_option('yww_contact_email', 'info@youngwisewomen.nl');
        echo '<input type="email" name="yww_contact_email" value="' . esc_attr($value) . '" class="regular-text" />';
    }, 'yww-settings', 'yww_contact_section');

    register_setting('yww-settings', 'yww_contact_phone');
    add_settings_field('yww_contact_phone', 'Telefoon', function () {
        $value = get_option('yww_contact_phone', '+31 (0)6 55334728');
        echo '<input type="text" name="yww_contact_phone" value="' . esc_attr($value) . '" class="regular-text" />';
    }, 'yww-settings', 'yww_contact_section');

    // Social section
    add_settings_section('yww_social_section', 'Social Media', null, 'yww-settings');

    register_setting('yww-settings', 'yww_social_instagram');
    add_settings_field('yww_social_instagram', 'Instagram URL', function () {
        $value = get_option('yww_social_instagram', '');
        echo '<input type="url" name="yww_social_instagram" value="' . esc_attr($value) . '" class="regular-text" />';
    }, 'yww-settings', 'yww_social_section');

    register_setting('yww-settings', 'yww_social_linkedin');
    add_settings_field('yww_social_linkedin', 'LinkedIn URL', function () {
        $value = get_option('yww_social_linkedin', '');
        echo '<input type="url" name="yww_social_linkedin" value="' . esc_attr($value) . '" class="regular-text" />';
    }, 'yww-settings', 'yww_social_section');

    // Brands section
    add_settings_section('yww_brands_section', 'Brand Logos', null, 'yww-settings');

    register_setting('yww-settings', 'yww_brands');
    add_settings_field('yww_brands', 'Brands (JSON array)', function () {
        $value = get_option('yww_brands', '[]');
        echo '<textarea name="yww_brands" rows="6" class="large-text" placeholder=\'[{"name":"Brand","logo":"/logo.png"}]\'>' . esc_textarea($value) . '</textarea>';
        echo '<p class="description">JSON array met objecten: {"name": "Naam", "logo": "/pad-naar-logo.png"}</p>';
    }, 'yww-settings', 'yww_brands_section');
}

function yww_options_page_html() {
    if (!current_user_can('manage_options')) return;
    ?>
    <div class="wrap">
        <h1>YWW Instellingen</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('yww-settings');
            do_settings_sections('yww-settings');
            submit_button('Opslaan');
            ?>
        </form>
    </div>
    <?php
}
