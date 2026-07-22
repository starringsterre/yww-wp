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

add_action('add_meta_boxes', 'yww_add_meta_boxes', 10, 2);

function yww_add_meta_boxes($post_type, $post = null) {
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

    // Blog structured content meta box
    add_meta_box('yww_blog_content_details', 'Blog Inhoud (Gestructureerd)', 'yww_blog_content_meta_box', 'yww_blog', 'normal', 'high');

    // Workshop meta box
    add_meta_box('yww_workshop_details', 'Workshop Details', 'yww_workshop_meta_box', 'yww_workshop', 'normal', 'high');

    // FAQ meta box
    add_meta_box('yww_faq_details', 'FAQ Details', 'yww_faq_meta_box', 'yww_faq', 'normal', 'high');

    // Employer Review meta box
    add_meta_box('yww_employer_review_details', 'Review Details', 'yww_employer_review_meta_box', 'yww_employer_review', 'normal', 'high');

    // Page content meta box (only on pages with specific slugs)
    add_meta_box('yww_page_content', 'Pagina Teksten (CMS)', 'yww_page_content_meta_box', 'page', 'normal', 'high');

    // Blog content meta box for blog draft pages (created via seed script)
    if ($post_type === 'page' && $post && get_post_meta($post->ID, 'yww_blog_content', true)) {
        add_meta_box('yww_blog_content_details', 'Blog Inhoud (Gestructureerd)',
                     'yww_blog_content_meta_box', 'page', 'normal', 'high');
    }
}

// ─── Helper: render a text input ───
function yww_text_field($post_id, $meta_key, $label, $type = 'text', $placeholder = '') {
    $value = get_post_meta($post_id, $meta_key, true);
    $ph = $placeholder ? ' placeholder="' . esc_attr($placeholder) . '"' : '';
    echo '<p><label><strong>' . esc_html($label) . '</strong><br>';
    echo '<input type="' . esc_attr($type) . '" name="' . esc_attr($meta_key) . '" value="' . esc_attr($value) . '"' . $ph . ' style="width:100%;" /></label></p>';
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

// ─── Employer Review Meta Box ───
function yww_employer_review_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_text_field($post->ID, 'yww_employer_review_name', 'Naam');
    yww_text_field($post->ID, 'yww_employer_review_role', 'Functie');
    yww_text_field($post->ID, 'yww_employer_review_company', 'Bedrijf');
    yww_textarea_field($post->ID, 'yww_employer_review_quote', 'Quote', 6);
    yww_text_field($post->ID, 'yww_employer_review_image', 'Foto URL');
    yww_text_field($post->ID, 'yww_employer_review_order', 'Volgorde', 'number');
}

// ─── Event Meta Box ───
function yww_event_meta_box($post) {
    wp_nonce_field('yww_save_meta', 'yww_meta_nonce');
    yww_text_field($post->ID, 'yww_event_label', 'Label (bijv. "Weekend Retreat")');
    yww_select_field($post->ID, 'yww_event_type', 'Type', [
        'weekend-retreat' => 'Weekend Retreat',
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
    echo '<div style="background:#f0f6ff;border-left:4px solid #2271b1;padding:10px 14px;margin-bottom:14px;font-size:13px;line-height:1.6;">';
    echo '<strong>Blog structuur (gebaseerd op voorbeeldblog "Persoonlijke Groei")</strong><br><br>';
    echo '<strong>Titel</strong> → bijv. <em>"Persoonlijke Ontwikkeling en Groei: Wat Het Is en Voorbeelden"</em><br>';
    echo '<strong>Samenvatting</strong> → bijv. <em>"Concrete persoonlijke ontwikkeling voorbeelden: van zelfbewustzijn en communicatie tot grenzen stellen en jouw persoonlijke roadmap. Ontdek hoe jij groeit."</em><br>';
    echo '<strong>Inhoud</strong> → gebruik H2- en H3-kopjes met id-attributen (bijv. <code>id="zelfbewustzijn"</code>) voor de automatische inhoudsopgave, aangevuld met alinea\'s en bullet-/nummerlijsten.';
    echo '</div>';
    yww_text_field($post->ID, 'yww_blog_slug', 'Slug (URL-deel van het blog)', 'text', 'bijv. persoonlijke-groei-voorbeelden');
    yww_text_field($post->ID, 'yww_blog_featured_image', 'Featured Image URL (horizontaal, 16:9)', 'text', 'bijv. /persoonlijke-groei-training.jpg');
}

// ─── Blog Content Field Schema ───
function yww_get_blog_fields() {
    return [
        // Meta
        'date'              => ['label' => 'Publicatiedatum',                          'section' => 'Meta',        'hint' => 'bijv. "3 maart 2026"'],
        'author'            => ['label' => 'Auteur',                                                                 'hint' => 'bijv. "Ella Taal"'],
        'category'          => ['label' => 'Categorie',                                                             'hint' => 'bijv. "Persoonlijke ontwikkeling"'],
        'read_time'         => ['label' => 'Leestijd',                                                              'hint' => 'bijv. "8 min"'],
        'image'             => ['label' => 'Header foto',                                                           'type' => 'image'],
        'excerpt'           => ['label' => 'Samenvatting (voor blogoverzicht)',                                      'type' => 'textarea', 'rows' => 3],
        // Intro
        'intro'             => ['label' => 'Intro alinea (optioneel, vóór eerste H2)', 'section' => 'Intro',       'type' => 'html', 'rows' => 3],
        // Sections
        'section_1_heading' => ['label' => 'Heading',                                  'section' => 'Sectie 1'],
        'section_1_body'    => ['label' => 'Body HTML (paragrafen, H3, lijsten)',                                   'type' => 'html', 'rows' => 8],
        'section_2_heading' => ['label' => 'Heading',                                  'section' => 'Sectie 2'],
        'section_2_body'    => ['label' => 'Body HTML',                                                            'type' => 'html', 'rows' => 6],
        'section_3_heading' => ['label' => 'Heading',                                  'section' => 'Sectie 3'],
        'section_3_body'    => ['label' => 'Body HTML (mag H3-subsecties bevatten)',                               'type' => 'html', 'rows' => 16],
        'section_4_heading' => ['label' => 'Heading',                                  'section' => 'Sectie 4'],
        'section_4_body'    => ['label' => 'Body HTML',                                                            'type' => 'html', 'rows' => 8],
        'section_5_heading' => ['label' => 'Heading',                                  'section' => 'Sectie 5'],
        'section_5_body'    => ['label' => 'Body HTML',                                                            'type' => 'html', 'rows' => 8],
        'section_6_heading' => ['label' => 'Heading',                                  'section' => 'Sectie 6'],
        'section_6_body'    => ['label' => 'Body HTML',                                                            'type' => 'html', 'rows' => 6],
        // CTA
        'cta_heading'       => ['label' => 'CTA Heading',                              'section' => 'CTA Blok',    'hint' => 'bijv. "Persoonlijke groei ervaren in een retreat"'],
        'cta_body'          => ['label' => 'CTA Tekst HTML',                                                       'type' => 'html', 'rows' => 6],
        'cta_button_label'  => ['label' => 'Knoptekst',                                                            'hint' => 'bijv. "Bekijk onze retreats"'],
        'cta_button_url'    => ['label' => 'Knop URL',                                                             'hint' => 'bijv. "/retreats"'],
        // Conclusion
        'conclusion'        => ['label' => 'Conclusie HTML',                           'section' => 'Conclusie',   'type' => 'html', 'rows' => 6],
    ];
}

// ─── Blog Content Meta Box ───
function yww_blog_content_meta_box($post) {
    wp_nonce_field('yww_save_blog_content', 'yww_blog_content_nonce');

    $fields = yww_get_blog_fields();
    $json = get_post_meta($post->ID, 'yww_blog_content', true);
    $data = $json ? json_decode($json, true) : [];
    if (!is_array($data)) $data = [];

    $current_section = '';
    foreach ($fields as $key => $field) {
        if (isset($field['section']) && $field['section'] !== $current_section) {
            $current_section = $field['section'];
            echo '<h3 style="margin-top:20px;padding:8px 0;border-bottom:2px solid #2271b1;color:#2271b1;">' . esc_html($current_section) . '</h3>';
        }

        $value = isset($data[$key]) ? $data[$key] : '';
        $name  = 'yww_bc_' . $key;
        $type  = isset($field['type']) ? $field['type'] : 'text';

        echo '<p><label><strong>' . esc_html($field['label']) . '</strong>';
        if (isset($field['hint'])) {
            echo ' <span style="color:#666;font-weight:normal;">(' . esc_html($field['hint']) . ')</span>';
        }
        echo '<br>';

        if ($type === 'textarea' || $type === 'html') {
            $rows = isset($field['rows']) ? $field['rows'] : 4;
            $style = $type === 'html' ? 'width:100%;font-family:monospace;font-size:12px;' : 'width:100%;';
            echo '<textarea name="' . esc_attr($name) . '" rows="' . $rows . '" style="' . $style . '">' . esc_textarea($value) . '</textarea>';
        } else {
            echo '<input type="text" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" style="width:100%;" />';
        }

        echo '</label></p>';
    }
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

        if ($type === 'select') {
            $options = isset($field['options']) ? $field['options'] : [];
            echo '<select name="' . esc_attr($name) . '" style="width:100%;">';
            foreach ($options as $opt_val => $opt_label) {
                $selected = ($value === (string)$opt_val) ? ' selected' : '';
                echo '<option value="' . esc_attr($opt_val) . '"' . $selected . '>' . esc_html($opt_label) . '</option>';
            }
            echo '</select>';
        } elseif ($type === 'textarea') {
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
        'in-company'                                 => 'bedrijfstrajecten',
        'evenementen'                                => 'kalender',
    ];
    if (isset($aliases[$slug])) {
        $slug = $aliases[$slug];
    }

    $pages = [
        'home' => [
            'hero_video_url'                => ['label' => 'Hero Video URL', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel'],
            'offer_heading'                 => ['label' => 'Offer Heading', 'section' => 'Offer Sectie'],
            'offer_subtitle'                => ['label' => 'Offer Subtitel', 'type' => 'textarea'],
            'offer_distinct'                => ['label' => 'Offer Distinct'],
            'workshops_card_title'          => ['label' => 'Workshops Card Titel', 'section' => 'Workshops Sectie'],
            'workshops_card_text'           => ['label' => 'Workshops Card Tekst', 'type' => 'textarea'],
            'workshops_card_bullet_1'       => ['label' => 'Workshops Card Bullet 1'],
            'workshops_card_bullet_2'       => ['label' => 'Workshops Card Bullet 2'],
            'workshops_card_bullet_3'       => ['label' => 'Workshops Card Bullet 3'],
            'workshops_card_cta'            => ['label' => 'Workshops Card CTA'],
            'retreats_card_title'           => ['label' => 'Retreats Card Titel', 'section' => 'Retreats Sectie'],
            'retreats_card_text'            => ['label' => 'Retreats Card Tekst', 'type' => 'textarea'],
            'retreats_card_bullet_1'        => ['label' => 'Retreats Card Bullet 1'],
            'retreats_card_bullet_2'        => ['label' => 'Retreats Card Bullet 2'],
            'retreats_card_bullet_3'        => ['label' => 'Retreats Card Bullet 3'],
            'retreats_card_cta'             => ['label' => 'Retreats Card CTA'],
            'jaarprogramma_card_title'      => ['label' => 'Jaarprogramma Card Titel', 'section' => 'Jaarprogramma Sectie'],
            'jaarprogramma_card_text'       => ['label' => 'Jaarprogramma Card Tekst', 'type' => 'textarea'],
            'jaarprogramma_card_bullet_1'   => ['label' => 'Jaarprogramma Card Bullet 1'],
            'jaarprogramma_card_bullet_2'   => ['label' => 'Jaarprogramma Card Bullet 2'],
            'jaarprogramma_card_bullet_3'   => ['label' => 'Jaarprogramma Card Bullet 3'],
            'jaarprogramma_card_cta'        => ['label' => 'Jaarprogramma Card CTA'],
            'intergen_heading'              => ['label' => 'Intergen Heading', 'section' => 'Intergen Sectie'],
            'intergen_subtitle'             => ['label' => 'Intergen Subtitel'],
            'intergen_body'                 => ['label' => 'Intergen Body'],
            'coaches_cta'                   => ['label' => 'Coaches CTA', 'section' => 'Coaches'],
            'benefits_cta'                  => ['label' => 'Benefits CTA', 'section' => 'Voordelen'],
            'testimonials_video_heading'    => ['label' => 'Testimonials Video Heading', 'section' => 'Testimonials Sectie'],
            'trusted_heading'               => ['label' => 'Trusted Heading', 'section' => 'Trusted Sectie'],
            'trusted_subtitle'              => ['label' => 'Trusted Subtitel'],
        ],
        'weekenden' => [
            'gallery_images'                => ['label' => 'Galerij foto URLs', 'type' => 'textarea', 'hint' => '1 URL per regel, maximaal 9 foto\'s', 'rows' => 10],
            'highlight_day_1'               => ['label' => 'Dag 1 tekst', 'type' => 'textarea'],
            'day_1_image'                   => ['label' => 'Dag 1 foto', 'type' => 'image'],
            'highlight_day_2'               => ['label' => 'Dag 2 tekst', 'type' => 'textarea'],
            'day_2_image'                   => ['label' => 'Dag 2 foto', 'type' => 'image'],
            'highlight_day_3'               => ['label' => 'Dag 3 tekst', 'type' => 'textarea'],
            'day_3_image'                   => ['label' => 'Dag 3 foto', 'type' => 'image'],
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'highlight_heading'             => ['label' => 'Heading', 'section' => 'Weekend Retreat'],
            'highlight_when'                => ['label' => 'Wanneer'],
            'highlight_where'               => ['label' => 'Waar'],
            'highlight_audience'            => ['label' => 'Voor wie'],
            'highlight_capacity'            => ['label' => 'Capaciteit'],
            'highlight_inclusions'          => ['label' => 'Inbegrepen items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'highlight_program_heading'     => ['label' => 'Programma heading'],
            'intro_heading'                 => ['label' => 'SEO Heading', 'section' => 'Introductie'],
            'intro_text_1'                  => ['label' => 'Introductie tekst 1', 'type' => 'textarea'],
            'intro_text_2'                  => ['label' => 'Introductie tekst 2', 'type' => 'textarea'],
            'intro_cta'                     => ['label' => 'CTA knop tekst'],
            'pillars_heading'               => ['label' => 'Heading', 'section' => 'Drie Pijlers'],
            'pillars_intro'                 => ['label' => 'Introductie', 'type' => 'textarea'],
            'pillar_1_title'                => ['label' => 'Pijler 1 titel'],
            'pillar_1_text'                 => ['label' => 'Pijler 1 tekst', 'type' => 'textarea'],
            'pillar_2_title'                => ['label' => 'Pijler 2 titel'],
            'pillar_2_text'                 => ['label' => 'Pijler 2 tekst', 'type' => 'textarea'],
            'pillar_3_title'                => ['label' => 'Pijler 3 titel'],
            'pillar_3_text'                 => ['label' => 'Pijler 3 tekst', 'type' => 'textarea'],
            'gallery_heading'               => ['label' => 'Heading', 'section' => 'Foto Galerij'],
            'gallery_subtitle'              => ['label' => 'Subtitel'],
            'for_whom_heading'              => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'                => ['label' => 'Introductie'],
            'for_whom_1'                    => ['label' => 'Blok 1', 'type' => 'textarea'],
            'for_whom_2'                    => ['label' => 'Blok 2', 'type' => 'textarea'],
            'for_whom_3'                    => ['label' => 'Blok 3', 'type' => 'textarea'],
            'for_whom_4'                    => ['label' => 'Blok 4', 'type' => 'textarea'],
            'breathwork_heading'            => ['label' => 'Heading', 'section' => 'Breathwork & Yoga'],
            'breathwork_subtitle'           => ['label' => 'Subtitel', 'type' => 'textarea'],
            'breathwork_url'                => ['label' => 'Breathwork URL', 'section' => 'Breathwork', 'type' => 'image'],
            'breathwork_image'              => ['label' => 'Breathwork foto', 'type' => 'image'],
            'breathwork_card_heading'       => ['label' => 'Breathwork Card Heading'],
            'breathwork_card_description'   => ['label' => 'Breathwork Card Beschrijving', 'type' => 'textarea'],
            'breathwork_benefits'           => ['label' => 'Breathwork voordelen', 'type' => 'textarea', 'hint' => '1 per regel'],
            'yoga_image'                    => ['label' => 'Yoga foto', 'type' => 'image'],
            'yoga_heading'                  => ['label' => 'Yoga heading'],
            'yoga_subtitle'                 => ['label' => 'Yoga subtitel', 'type' => 'textarea'],
            'yoga_benefits'                 => ['label' => 'Yoga voordelen', 'type' => 'textarea', 'hint' => '1 per regel'],
            'edition_label'                 => ['label' => 'Editie label (bijv. "4DE EDITIE")', 'section' => 'Volgende Editie'],
            'edition_heading'               => ['label' => 'Editie heading'],
            'edition_subtitle'              => ['label' => 'Editie subtitel'],
            'edition_dates'                 => ['label' => 'Datum tekst'],
            'edition_times'                 => ['label' => 'Tijden tekst'],
            'edition_next_date'             => ['label' => 'Volgende datum tekst'],
            'edition_location'              => ['label' => 'Locatie'],
            'edition_location_detail'       => ['label' => 'Locatie detail'],
            'edition_audience'              => ['label' => 'Doelgroep'],
            'edition_availability'          => ['label' => 'Beschikbaarheid'],
            'program_heading'               => ['label' => 'Heading', 'section' => 'Programma'],
            'day_1_label'                   => ['label' => 'Dag 1 label'],
            'day_1_text'                    => ['label' => 'Dag 1 tekst', 'type' => 'textarea'],
            'day_2_label'                   => ['label' => 'Dag 2 label'],
            'day_2_text'                    => ['label' => 'Dag 2 tekst', 'type' => 'textarea'],
            'day_3_label'                   => ['label' => 'Dag 3 label'],
            'day_3_text'                    => ['label' => 'Dag 3 tekst', 'type' => 'textarea'],
            'oktober_cta_text'              => ['label' => 'Oktober CTA Tekst', 'section' => 'Oktober Sectie', 'type' => 'textarea'],
            'oktober_cta_link'              => ['label' => 'Oktober CTA Link'],
            'location_image'                => ['label' => 'Locatie achtergrond foto', 'type' => 'image'],
            'location_heading'              => ['label' => 'Heading', 'section' => 'Locatie'],
            'location_text'                 => ['label' => 'Tekst', 'type' => 'textarea'],
            'transform_heading'             => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'               => ['label' => 'Afscheid heading'],
            'goodbye_1'                     => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'              => ['label' => 'Meenemen heading'],
            'takeaway_1'                    => ['label' => 'Meenemen tekst 1', 'type' => 'textarea'],
            'takeaway_2'                    => ['label' => 'Meenemen tekst 2', 'type' => 'textarea'],
            'takeaway_3'                    => ['label' => 'Meenemen tekst 3', 'type' => 'textarea'],
            'nextstep_heading'              => ['label' => 'Volgende stap heading'],
            'nextstep_text'                 => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'calendar_cta'                  => ['label' => 'Calendar CTA', 'section' => 'Calendar Sectie'],
            'iw_heading'                    => ['label' => 'Iw Heading', 'section' => 'Iw Sectie'],
            'iw_text'                       => ['label' => 'Iw Tekst', 'type' => 'textarea'],
            'iw_date'                       => ['label' => 'Iw Date'],
            'iw_time'                       => ['label' => 'Iw Time'],
            'iw_location'                   => ['label' => 'Iw Location'],
            'iw_cta'                        => ['label' => 'Iw CTA'],
        ],
        'weekend-intensive' => [
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'intro_heading'                 => ['label' => 'Heading', 'section' => 'Introductie'],
            'intro_text'                    => ['label' => 'Tekst', 'type' => 'textarea'],
            'when_label'                    => ['label' => 'Wanneer label', 'section' => 'Praktisch'],
            'when_text'                     => ['label' => 'Wanneer tekst'],
            'where_label'                   => ['label' => 'Waar label'],
            'where_text'                    => ['label' => 'Waar tekst'],
            'group_label'                   => ['label' => 'Groep label'],
            'group_text'                    => ['label' => 'Groep tekst'],
            'rooms_label'                   => ['label' => 'Kamers label'],
            'rooms_text'                    => ['label' => 'Kamers tekst'],
            'additional_text'               => ['label' => 'Extra tekst', 'type' => 'textarea'],
            'video_heading'                 => ['label' => 'Video heading', 'section' => 'Video'],
            'about_heading'                 => ['label' => 'Heading', 'section' => 'Over dit evenement'],
            'about_text_1'                  => ['label' => 'Tekst 1', 'type' => 'textarea'],
            'about_text_2'                  => ['label' => 'Tekst 2', 'type' => 'textarea'],
            'for_whom_heading'              => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_items'                => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'results_heading'               => ['label' => 'Heading', 'section' => 'Resultaten'],
            'results_items'                 => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'included_heading'              => ['label' => 'Heading', 'section' => 'Inbegrepen'],
            'included_items'                => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'caption_1'                     => ['label' => 'Foto caption 1', 'section' => 'Foto Captions'],
            'caption_2'                     => ['label' => 'Foto caption 2'],
            'book_heading'                  => ['label' => 'Heading', 'section' => 'Boek Sectie'],
            'book_text'                     => ['label' => 'Tekst', 'type' => 'textarea'],
            'book_cta'                      => ['label' => 'CTA knop tekst'],
            'faq_heading'                   => ['label' => 'FAQ Heading', 'section' => 'FAQ'],
            'related_heading'               => ['label' => 'Heading', 'section' => 'Gerelateerd'],
            'availability_label'            => ['label' => 'Label', 'section' => 'Beschikbaarheid'],
            'availability_text'             => ['label' => 'Tekst (bijv. "3 van 8")'],
            'availability_note'             => ['label' => 'Opmerking'],
            'package_1_title'               => ['label' => 'Pakket 1 titel', 'section' => 'Pakketten'],
            'package_1_subtitle'            => ['label' => 'Pakket 1 subtitel'],
            'package_1_note'                => ['label' => 'Pakket 1 opmerking'],
            'package_2_title'               => ['label' => 'Pakket 2 titel'],
            'package_2_subtitle'            => ['label' => 'Pakket 2 subtitel'],
            'package_2_note'                => ['label' => 'Pakket 2 opmerking'],
            'package_3_title'               => ['label' => 'Pakket 3 titel'],
            'package_3_subtitle'            => ['label' => 'Pakket 3 subtitel'],
            'package_3_price'               => ['label' => 'Pakket 3 prijs'],
            'package_3_note'                => ['label' => 'Pakket 3 opmerking'],
            'form_heading'                  => ['label' => 'Formulier heading', 'section' => 'Formulier'],
            'success_title'                 => ['label' => 'Succes titel', 'section' => 'Succes Bericht'],
            'success_text'                  => ['label' => 'Succes tekst', 'type' => 'textarea'],
            'success_signature'             => ['label' => 'Ondertekening'],
            'sidebar_benefit_1'             => ['label' => 'Sidebar voordeel 1', 'section' => 'Sidebar'],
            'sidebar_benefit_2'             => ['label' => 'Sidebar voordeel 2'],
        ],
        'workshops' => [
            'for_whom_items'                => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_what_items'            => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_practical_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_not_for_items'         => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'transform_heading'             => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'               => ['label' => 'Afscheid heading'],
            'goodbye_text'                  => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'              => ['label' => 'Meenemen heading'],
            'takeaway_text'                 => ['label' => 'Meenemen tekst', 'type' => 'textarea'],
            'nextstep_heading'              => ['label' => 'Volgende stap heading'],
            'nextstep_text'                 => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'for_whom_heading'              => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'                => ['label' => 'Introductie'],
            'sidebar_what_heading'          => ['label' => 'Heading', 'section' => 'Sidebar: Wat je krijgt'],
            'sidebar_practical_heading'     => ['label' => 'Heading', 'section' => 'Sidebar: Praktisch'],
            'sidebar_not_for_heading'       => ['label' => 'Heading', 'section' => 'Sidebar: Voor wie niet'],
        ],
        'ons-verhaal' => [
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'section_1_heading'             => ['label' => 'Heading', 'section' => 'Sectie 1'],
            'section_1_text'                => ['label' => 'Tekst', 'type' => 'textarea'],
            'section_1_image'               => ['label' => 'Sectie 1 foto', 'type' => 'image'],
            'section_2_heading'             => ['label' => 'Heading', 'section' => 'Sectie 2 (Waarden)'],
            'section_2_items'               => ['label' => 'Waarden items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'section_2_image'               => ['label' => 'Sectie 2 foto', 'type' => 'image'],
            'cta_heading'                   => ['label' => 'Heading', 'section' => 'CTA'],
            'cta_text'                      => ['label' => 'Knop tekst'],
        ],
        'contact' => [
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'block_1_heading'               => ['label' => 'Heading', 'section' => 'Blok 1 (Gedachtegoed)'],
            'block_1_text'                  => ['label' => 'Tekst', 'type' => 'textarea', 'rows' => 8],
            'block_2_heading'               => ['label' => 'Heading', 'section' => 'Blok 2 (Unieke Kracht)'],
            'block_2_text'                  => ['label' => 'Tekst', 'type' => 'textarea', 'rows' => 8],
            'contact_hero_image'            => ['label' => 'Contact Hero Foto', 'section' => 'Contact Sectie', 'type' => 'image'],
            'contact_hero_title'            => ['label' => 'Contact Hero Titel'],
            'contact_hero_subtitle'         => ['label' => 'Contact Hero Subtitel'],
            'contact_heading'               => ['label' => 'Contact Heading'],
            'contact_intro_text'            => ['label' => 'Contact Introductie Tekst', 'type' => 'textarea'],
        ],
        'bedrijfstrajecten' => [
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'intro_cta'                     => ['label' => 'Introductie CTA', 'section' => 'Introductie'],
            'workshops_image'               => ['label' => 'Workshops Foto', 'section' => 'Workshops Sectie', 'type' => 'image'],
            'workshops_grid_heading'        => ['label' => 'Workshops Grid Heading'],
            'workshops_grid_intro'          => ['label' => 'Workshops Grid Introductie', 'type' => 'textarea'],
            'los_heading'                   => ['label' => 'Los Heading', 'section' => 'Los Sectie'],
            'los_text'                      => ['label' => 'Los Tekst', 'type' => 'textarea'],
            'intro_callout_badge'           => ['label' => 'Introductie Callout Badge'],
            'intro_callout_heading'         => ['label' => 'Introductie Callout Heading'],
            'intro_callout_text'            => ['label' => 'Introductie Callout Tekst', 'type' => 'textarea'],
            'intro_callout_cta'             => ['label' => 'Introductie Callout CTA'],
            'investering_heading'           => ['label' => 'Investering Heading', 'section' => 'Investering Sectie'],
            'investering_1_title'           => ['label' => 'Investering 1 Titel'],
            'investering_1_text'            => ['label' => 'Investering 1 Tekst', 'type' => 'textarea'],
            'investering_2_title'           => ['label' => 'Investering 2 Titel'],
            'investering_2_text'            => ['label' => 'Investering 2 Tekst', 'type' => 'textarea'],
            'investering_3_title'           => ['label' => 'Investering 3 Titel'],
            'investering_3_text'            => ['label' => 'Investering 3 Tekst', 'type' => 'textarea'],
            'investering_4_title'           => ['label' => 'Investering 4 Titel'],
            'investering_4_text'            => ['label' => 'Investering 4 Tekst', 'type' => 'textarea'],
            'coaches_section_heading'       => ['label' => 'Coaches Section Heading', 'section' => 'Coaches'],
            'coaches_section_subtitle'      => ['label' => 'Coaches Section Subtitel'],
            'coaches_section_cta'           => ['label' => 'Coaches Section CTA'],
            'journey_heading'               => ['label' => 'Journey Heading', 'section' => 'Journey Sectie'],
            'journey_intro'                 => ['label' => 'Journey Introductie', 'type' => 'textarea'],
            'pijler_1_title'                => ['label' => 'Pijler 1 Titel', 'section' => 'Pijler Sectie'],
            'pijler_1_text'                 => ['label' => 'Pijler 1 Tekst', 'type' => 'textarea'],
            'pijler_2_title'                => ['label' => 'Pijler 2 Titel'],
            'pijler_2_text'                 => ['label' => 'Pijler 2 Tekst', 'type' => 'textarea'],
            'pijler_3_title'                => ['label' => 'Pijler 3 Titel'],
            'pijler_3_text'                 => ['label' => 'Pijler 3 Tekst', 'type' => 'textarea'],
            'pijler_4_title'                => ['label' => 'Pijler 4 Titel'],
            'pijler_4_text'                 => ['label' => 'Pijler 4 Tekst', 'type' => 'textarea'],
            'mf_dialog_trigger'             => ['label' => 'Mf Dialog Trigger', 'section' => 'Mf Sectie'],
            'mf_dialog_title'               => ['label' => 'Mf Dialog Titel'],
            'mf_dialog_subtitle'            => ['label' => 'Mf Dialog Subtitel'],
            'mf_dialog_image'               => ['label' => 'Mf Dialog Foto', 'type' => 'image'],
            'mf_dialog_text_1'              => ['label' => 'Mf Dialog Tekst 1'],
            'mf_dialog_text_2'              => ['label' => 'Mf Dialog Tekst 2'],
            'mf_dialog_text_3'              => ['label' => 'Mf Dialog Tekst 3'],
            'mf_dialog_cta'                 => ['label' => 'Mf Dialog CTA'],
            'cta_background_image'          => ['label' => 'CTA Background Foto', 'section' => 'CTA', 'type' => 'image'],
            'promo_popup_heading'           => ['label' => 'Promo Popup Heading', 'section' => 'Promo Sectie'],
            'promo_popup_text'              => ['label' => 'Promo Popup Tekst', 'type' => 'textarea'],
            'promo_popup_cta'               => ['label' => 'Promo Popup CTA'],
            'employer_reviews_title'        => ['label' => 'Employer Reviews Titel', 'section' => 'Employer Sectie'],
        ],
        'kalender' => [
            'edition_label'                 => ['label' => 'Editie label', 'section' => 'Volgende Editie'],
            'edition_heading'               => ['label' => 'Editie heading'],
            'edition_subtitle'              => ['label' => 'Editie subtitel'],
            'edition_dates'                 => ['label' => 'Datum tekst'],
            'edition_times'                 => ['label' => 'Tijden tekst'],
            'edition_next_date'             => ['label' => 'Volgende datum tekst'],
            'edition_location'              => ['label' => 'Locatie'],
            'edition_location_detail'       => ['label' => 'Locatie detail'],
            'edition_audience'              => ['label' => 'Doelgroep'],
            'edition_availability'          => ['label' => 'Beschikbaarheid'],
            'program_heading'               => ['label' => 'Heading', 'section' => 'Programma'],
            'day_1_label'                   => ['label' => 'Dag 1 label'],
            'day_1_text'                    => ['label' => 'Dag 1 tekst', 'type' => 'textarea'],
            'day_2_label'                   => ['label' => 'Dag 2 label'],
            'day_2_text'                    => ['label' => 'Dag 2 tekst', 'type' => 'textarea'],
            'day_3_label'                   => ['label' => 'Dag 3 label'],
            'day_3_text'                    => ['label' => 'Dag 3 tekst', 'type' => 'textarea'],
            'investment_heading'            => ['label' => 'Heading', 'section' => 'Investering'],
            'investment_via_employer_title' => ['label' => 'Via werkgever titel'],
            'investment_price'              => ['label' => 'Prijs'],
            'investment_price_note'         => ['label' => 'Prijs opmerking'],
            'investment_employer_note'      => ['label' => 'Werkgever opmerking'],
            'results_heading'               => ['label' => 'Resultaten heading'],
            'result_1'                      => ['label' => 'Resultaat 1', 'type' => 'textarea'],
            'result_2'                      => ['label' => 'Resultaat 2', 'type' => 'textarea'],
            'result_3'                      => ['label' => 'Resultaat 3', 'type' => 'textarea'],
            'inclusions_heading'            => ['label' => 'Inbegrepen heading'],
            'inclusions'                    => ['label' => 'Inbegrepen items', 'type' => 'textarea', 'hint' => '1 per regel'],
        ],
        'lid-worden' => [
            'benefit_1_title'               => ['label' => 'Voordeel 1 titel'],
            'benefit_1_text'                => ['label' => 'Voordeel 1 tekst', 'type' => 'textarea'],
            'benefit_2_title'               => ['label' => 'Voordeel 2 titel'],
            'benefit_2_text'                => ['label' => 'Voordeel 2 tekst', 'type' => 'textarea'],
            'benefit_3_title'               => ['label' => 'Voordeel 3 titel'],
            'benefit_3_text'                => ['label' => 'Voordeel 3 tekst', 'type' => 'textarea'],
            'benefit_4_title'               => ['label' => 'Voordeel 4 titel'],
            'benefit_4_text'                => ['label' => 'Voordeel 4 tekst', 'type' => 'textarea'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'benefits_heading'              => ['label' => 'Heading', 'section' => 'Voordelen'],
            'benefits_intro'                => ['label' => 'Introductie tekst', 'type' => 'textarea'],
            'form_heading'                  => ['label' => 'Heading', 'section' => 'Formulier'],
            'form_text'                     => ['label' => 'Tekst'],
            'form_success'                  => ['label' => 'Succes bericht', 'type' => 'textarea'],
            'form_button'                   => ['label' => 'Knop tekst'],
            'form_privacy'                  => ['label' => 'Privacy tekst', 'type' => 'textarea'],
            'form_whatsapp_note'            => ['label' => 'Form Whatsapp Opmerking', 'section' => 'Formulier', 'type' => 'textarea'],
        ],
        'retreats' => [
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'card_1_title'                  => ['label' => 'Kaart 1 titel', 'section' => 'Trainingskaarten'],
            'card_1_text'                   => ['label' => 'Kaart 1 tekst', 'type' => 'textarea'],
            'card_1_image'                  => ['label' => 'Kaart 1 foto', 'type' => 'image'],
            'card_2_title'                  => ['label' => 'Kaart 2 titel'],
            'card_2_text'                   => ['label' => 'Kaart 2 tekst', 'type' => 'textarea'],
            'card_2_image'                  => ['label' => 'Kaart 2 foto', 'type' => 'image'],
        ],
        'inspiratie' => [
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
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
            'for_whom_items'                => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_investment_items'      => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_included_items'        => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'sidebar_practical_items'       => ['label' => 'Items', 'type' => 'textarea', 'hint' => '1 per regel'],
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel', 'type' => 'textarea'],
            'intro_heading'                 => ['label' => 'SEO Heading', 'section' => 'Introductie'],
            'intro_text_1'                  => ['label' => 'Introductie tekst 1', 'type' => 'textarea'],
            'intro_text_2'                  => ['label' => 'Introductie tekst 2', 'type' => 'textarea'],
            'intro_cta'                     => ['label' => 'CTA knop tekst'],
            'phases_heading'                => ['label' => 'Heading', 'section' => 'Drie Fases'],
            'phases_intro'                  => ['label' => 'Introductie', 'type' => 'textarea'],
            'phase_1_title'                 => ['label' => 'Fase 1 titel'],
            'phase_1_text'                  => ['label' => 'Fase 1 tekst', 'type' => 'textarea'],
            'phase_2_title'                 => ['label' => 'Fase 2 titel'],
            'phase_2_text'                  => ['label' => 'Fase 2 tekst', 'type' => 'textarea'],
            'phase_3_title'                 => ['label' => 'Fase 3 titel'],
            'phase_3_text'                  => ['label' => 'Fase 3 tekst', 'type' => 'textarea'],
            'for_whom_heading'              => ['label' => 'Heading', 'section' => 'Voor Wie'],
            'for_whom_intro'                => ['label' => 'Introductie'],
            'edition_label'                 => ['label' => 'Editie label', 'section' => 'Programma Detail'],
            'edition_heading'               => ['label' => 'Editie heading'],
            'edition_subtitle'              => ['label' => 'Editie subtitel'],
            'edition_dates'                 => ['label' => 'Datum tekst'],
            'edition_duration'              => ['label' => 'Doorlooptijd'],
            'edition_location'              => ['label' => 'Locatie'],
            'edition_location_detail'       => ['label' => 'Locatie detail'],
            'edition_audience'              => ['label' => 'Doelgroep'],
            'edition_availability'          => ['label' => 'Beschikbaarheid'],
            'program_heading'               => ['label' => 'Heading', 'section' => 'Programma per fase'],
            'phase_detail_1_label'          => ['label' => 'Fase 1 label'],
            'phase_detail_1_text'           => ['label' => 'Fase 1 tekst', 'type' => 'textarea'],
            'phase_detail_2_label'          => ['label' => 'Fase 2 label'],
            'phase_detail_2_text'           => ['label' => 'Fase 2 tekst', 'type' => 'textarea'],
            'phase_detail_3_label'          => ['label' => 'Fase 3 label'],
            'phase_detail_3_text'           => ['label' => 'Fase 3 tekst', 'type' => 'textarea'],
            'transform_heading'             => ['label' => 'Heading', 'section' => 'Transformatie'],
            'goodbye_heading'               => ['label' => 'Afscheid heading'],
            'goodbye_text'                  => ['label' => 'Afscheid tekst', 'type' => 'textarea'],
            'takeaway_heading'              => ['label' => 'Meenemen heading'],
            'takeaway_text'                 => ['label' => 'Meenemen tekst', 'type' => 'textarea'],
            'nextstep_heading'              => ['label' => 'Volgende stap heading'],
            'nextstep_text'                 => ['label' => 'Volgende stap tekst', 'type' => 'textarea'],
            'sidebar_investment_heading'    => ['label' => 'Heading', 'section' => 'Sidebar: Investering'],
            'sidebar_included_heading'      => ['label' => 'Heading', 'section' => 'Sidebar: Inclusief'],
            'sidebar_practical_heading'     => ['label' => 'Heading', 'section' => 'Sidebar: Praktisch'],
            'cta_heading'                   => ['label' => 'Heading', 'section' => 'CTA'],
            'cta_text'                      => ['label' => 'Tekst'],
            'cta_button_1'                  => ['label' => 'Knop 1 tekst'],
            'cta_button_2'                  => ['label' => 'Knop 2 tekst'],
        ],
        'blogs' => [
            'hero_image'                    => ['label' => 'Hero Foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
        ],
        'podcasts' => [
            'hero_image'                    => ['label' => 'Hero Foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
        ],
        'over-ella' => [
            'bio_text'                      => ['label' => 'Biografie', 'section' => 'Bio Sectie', 'type' => 'textarea'],
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'profile_photo'                 => ['label' => 'Profielfoto (links op pagina)', 'section' => 'Profiel Sectie', 'type' => 'image'],
            'name_heading'                  => ['label' => 'Naam (H2)', 'section' => 'Naam & Functie'],
            'role_subheading'               => ['label' => 'Functietitel', 'section' => 'Naam & Functie'],
        ],
        'het-team' => [
            'hero_image'                    => ['label' => 'Hero achtergrond foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'team_1_name'                   => ['label' => 'Naam', 'section' => 'Teamlid 1 (Ella Taal)'],
            'team_1_role'                   => ['label' => 'Functie', 'section' => 'Teamlid 1 (Ella Taal)'],
            'team_1_bio'                    => ['label' => 'Bio', 'section' => 'Teamlid 1 (Ella Taal)', 'type' => 'textarea'],
            'team_1_image'                  => ['label' => 'Foto', 'section' => 'Teamlid 1 (Ella Taal)', 'type' => 'image'],
            'team_2_name'                   => ['label' => 'Naam', 'section' => 'Teamlid 2 (Liene Molendijk)'],
            'team_2_role'                   => ['label' => 'Functie', 'section' => 'Teamlid 2 (Liene Molendijk)'],
            'team_2_bio'                    => ['label' => 'Bio', 'section' => 'Teamlid 2 (Liene Molendijk)', 'type' => 'textarea'],
            'team_2_image'                  => ['label' => 'Foto', 'section' => 'Teamlid 2 (Liene Molendijk)', 'type' => 'image'],
            'team_3_name'                   => ['label' => 'Naam', 'section' => 'Teamlid 3 (Marloes Versteeg)'],
            'team_3_role'                   => ['label' => 'Functie', 'section' => 'Teamlid 3 (Marloes Versteeg)'],
            'team_3_bio'                    => ['label' => 'Bio', 'section' => 'Teamlid 3 (Marloes Versteeg)', 'type' => 'textarea'],
            'team_3_quote'                  => ['label' => 'Quote', 'section' => 'Teamlid 3 (Marloes Versteeg)', 'type' => 'textarea'],
            'team_3_image'                  => ['label' => 'Foto', 'section' => 'Teamlid 3 (Marloes Versteeg)', 'type' => 'image'],
            'team_4_name'                   => ['label' => 'Naam', 'section' => 'Teamlid 4 (Julia Weekenstroo)'],
            'team_4_role'                   => ['label' => 'Functie', 'section' => 'Teamlid 4 (Julia Weekenstroo)'],
            'team_4_bio'                    => ['label' => 'Bio', 'section' => 'Teamlid 4 (Julia Weekenstroo)', 'type' => 'textarea'],
            'team_4_image'                  => ['label' => 'Foto', 'section' => 'Teamlid 4 (Julia Weekenstroo)', 'type' => 'image'],
            'team_5_name'                   => ['label' => 'Naam', 'section' => 'Teamlid 5 (Karen van Bremen)'],
            'team_5_role'                   => ['label' => 'Functie', 'section' => 'Teamlid 5 (Karen van Bremen)'],
            'team_5_bio'                    => ['label' => 'Bio', 'section' => 'Teamlid 5 (Karen van Bremen)', 'type' => 'textarea'],
            'team_5_image'                  => ['label' => 'Foto', 'section' => 'Teamlid 5 (Karen van Bremen)', 'type' => 'image'],
        ],
        'tools-en-handvatten' => [
            'hero_title'                    => ['label' => 'Hero Titel'],
        ],
        'workshops-op-maat' => [
            'for_whom_items'                => ['label' => 'For Whom Items', 'section' => 'Voor Wie', 'type' => 'textarea'],
            'sidebar_what_items'            => ['label' => 'Sidebar What Items', 'section' => 'Sidebar', 'type' => 'textarea'],
            'sidebar_practical_items'       => ['label' => 'Sidebar Practical Items', 'type' => 'textarea'],
            'sidebar_not_for_items'         => ['label' => 'Sidebar Not For Items', 'type' => 'textarea'],
            'hero_image'                    => ['label' => 'Hero Foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'transform_heading'             => ['label' => 'Transform Heading', 'section' => 'Transformatie'],
            'goodbye_heading'               => ['label' => 'Goodbye Heading'],
            'goodbye_text'                  => ['label' => 'Goodbye Tekst', 'type' => 'textarea'],
            'takeaway_heading'              => ['label' => 'Takeaway Heading'],
            'takeaway_text'                 => ['label' => 'Takeaway Tekst', 'type' => 'textarea'],
            'nextstep_heading'              => ['label' => 'Nextstep Heading'],
            'nextstep_text'                 => ['label' => 'Nextstep Tekst', 'type' => 'textarea'],
            'for_whom_heading'              => ['label' => 'For Whom Heading'],
            'for_whom_intro'                => ['label' => 'For Whom Introductie', 'type' => 'textarea'],
            'sidebar_what_heading'          => ['label' => 'Sidebar What Heading'],
            'sidebar_practical_heading'     => ['label' => 'Sidebar Practical Heading'],
            'sidebar_not_for_heading'       => ['label' => 'Sidebar Not For Heading'],
        ],
        'weekend-intensive-oktober-2026' => [
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'intro_heading'                 => ['label' => 'Introductie Heading', 'section' => 'Introductie'],
            'intro_text'                    => ['label' => 'Introductie Tekst', 'type' => 'textarea'],
            'when_label'                    => ['label' => 'When Label', 'section' => 'Praktisch'],
            'when_text'                     => ['label' => 'When Tekst', 'type' => 'textarea'],
            'where_label'                   => ['label' => 'Where Label'],
            'where_text'                    => ['label' => 'Where Tekst', 'type' => 'textarea'],
            'group_label'                   => ['label' => 'Group Label'],
            'group_text'                    => ['label' => 'Group Tekst', 'type' => 'textarea'],
            'rooms_label'                   => ['label' => 'Rooms Label'],
            'rooms_text'                    => ['label' => 'Rooms Tekst', 'type' => 'textarea'],
            'additional_text'               => ['label' => 'Additional Tekst', 'type' => 'textarea'],
            'video_heading'                 => ['label' => 'Video Heading', 'section' => 'Video'],
            'about_heading'                 => ['label' => 'About Heading', 'section' => 'Over'],
            'about_text_1'                  => ['label' => 'About Tekst 1'],
            'about_text_2'                  => ['label' => 'About Tekst 2'],
            'for_whom_heading'              => ['label' => 'For Whom Heading', 'section' => 'Voor Wie'],
            'for_whom_items'                => ['label' => 'For Whom Items', 'type' => 'textarea'],
            'results_heading'               => ['label' => 'Results Heading', 'section' => 'Resultaten'],
            'results_items'                 => ['label' => 'Results Items', 'type' => 'textarea'],
            'included_heading'              => ['label' => 'Included Heading', 'section' => 'Inbegrepen'],
            'included_items'                => ['label' => 'Included Items', 'type' => 'textarea'],
            'caption_1'                     => ['label' => 'Caption 1', 'section' => 'Foto Captions'],
            'caption_2'                     => ['label' => 'Caption 2'],
            'book_heading'                  => ['label' => 'Book Heading', 'section' => 'Boek Sectie'],
            'book_text'                     => ['label' => 'Book Tekst', 'type' => 'textarea'],
            'book_cta'                      => ['label' => 'Book CTA'],
            'faq_heading'                   => ['label' => 'Faq Heading', 'section' => 'FAQ'],
            'related_heading'               => ['label' => 'Related Heading', 'section' => 'Gerelateerd'],
            'availability_label'            => ['label' => 'Availability Label', 'section' => 'Beschikbaarheid'],
            'availability_text'             => ['label' => 'Availability Tekst', 'type' => 'textarea'],
            'availability_note'             => ['label' => 'Availability Opmerking', 'type' => 'textarea'],
            'package_1_title'               => ['label' => 'Package 1 Titel', 'section' => 'Pakketten'],
            'package_1_subtitle'            => ['label' => 'Package 1 Subtitel'],
            'package_1_note'                => ['label' => 'Package 1 Opmerking', 'type' => 'textarea'],
            'package_2_title'               => ['label' => 'Package 2 Titel'],
            'package_2_subtitle'            => ['label' => 'Package 2 Subtitel'],
            'package_2_note'                => ['label' => 'Package 2 Opmerking', 'type' => 'textarea'],
            'package_3_title'               => ['label' => 'Package 3 Titel'],
            'package_3_subtitle'            => ['label' => 'Package 3 Subtitel'],
            'package_3_price'               => ['label' => 'Package 3 Price'],
            'package_3_note'                => ['label' => 'Package 3 Opmerking', 'type' => 'textarea'],
            'form_heading'                  => ['label' => 'Form Heading', 'section' => 'Formulier'],
            'success_title'                 => ['label' => 'Success Titel', 'section' => 'Succes Bericht'],
            'success_text'                  => ['label' => 'Success Tekst', 'type' => 'textarea'],
            'success_signature'             => ['label' => 'Success Signature'],
            'sidebar_benefit_1'             => ['label' => 'Sidebar Benefit 1', 'section' => 'Sidebar'],
            'sidebar_benefit_2'             => ['label' => 'Sidebar Benefit 2'],
        ],
        'introductie-workshop-april-2026' => [
            'hero_title'                    => ['label' => 'Hero Titel', 'section' => 'Hero Sectie'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'when_label'                    => ['label' => 'When Label', 'section' => 'Praktisch'],
            'when_text'                     => ['label' => 'When Tekst', 'type' => 'textarea'],
            'time_label'                    => ['label' => 'Time Label', 'section' => 'Time Sectie'],
            'time_text'                     => ['label' => 'Time Tekst', 'type' => 'textarea'],
            'where_label'                   => ['label' => 'Where Label', 'section' => 'Praktisch'],
            'where_text'                    => ['label' => 'Where Tekst', 'type' => 'textarea'],
            'audience_label'                => ['label' => 'Audience Label', 'section' => 'Audience Sectie'],
            'audience_text'                 => ['label' => 'Audience Tekst', 'type' => 'textarea'],
            'price'                         => ['label' => 'Price', 'section' => 'Price Sectie'],
            'price_note'                    => ['label' => 'Price Opmerking', 'type' => 'textarea'],
            'program_heading'               => ['label' => 'Program Heading', 'section' => 'Programma'],
            'program_text'                  => ['label' => 'Program Tekst', 'type' => 'textarea'],
            'program_items'                 => ['label' => 'Program Items', 'type' => 'textarea'],
            'form_heading'                  => ['label' => 'Form Heading', 'section' => 'Formulier'],
            'form_text'                     => ['label' => 'Form Tekst', 'type' => 'textarea'],
            'benefit_1'                     => ['label' => 'Benefit 1', 'section' => 'Voordelen'],
            'benefit_2'                     => ['label' => 'Benefit 2'],
            'success_title'                 => ['label' => 'Success Titel', 'section' => 'Succes Bericht'],
            'success_text'                  => ['label' => 'Success Tekst', 'type' => 'textarea'],
            'success_signature'             => ['label' => 'Success Signature'],
        ],
        'onze-aanpak' => [
            'hero_image'                    => ['label' => 'Hero Foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'hero_title'                    => ['label' => 'Hero Titel'],
            'hero_subtitle'                 => ['label' => 'Hero Subtitel'],
            'framework_heading'             => ['label' => 'Framework Heading', 'section' => 'Framework Sectie'],
            'framework_intro_text'          => ['label' => 'Framework Introductie Tekst', 'type' => 'textarea'],
            'principes_heading'             => ['label' => 'Principes Heading', 'section' => 'Principes Sectie'],
            'principes_intro_text'          => ['label' => 'Principes Introductie Tekst', 'type' => 'textarea'],
            'intergen_heading'              => ['label' => 'Intergen Heading', 'section' => 'Intergen Sectie'],
            'ella_image'                    => ['label' => 'Ella Foto', 'section' => 'Ella Sectie', 'type' => 'image'],
            'ella_name'                     => ['label' => 'Ella Name'],
            'ella_bio_text'                 => ['label' => 'Ella Bio Tekst', 'type' => 'textarea'],
            'liene_image'                   => ['label' => 'Liene Foto', 'section' => 'Liene Sectie', 'type' => 'image'],
            'liene_name'                    => ['label' => 'Liene Name'],
            'liene_bio_text'                => ['label' => 'Liene Bio Tekst', 'type' => 'textarea'],
            'onderscheidt_heading'          => ['label' => 'Onderscheidt Heading', 'section' => 'Onderscheidt Sectie'],
            'vs_trainingen_title'           => ['label' => 'Vs Trainingen Titel', 'section' => 'Vs Sectie'],
            'vs_trainingen_text'            => ['label' => 'Vs Trainingen Tekst', 'type' => 'textarea'],
            'vs_yoga_title'                 => ['label' => 'Vs Yoga Titel'],
            'vs_yoga_text'                  => ['label' => 'Vs Yoga Tekst', 'type' => 'textarea'],
            'vs_coaching_title'             => ['label' => 'Vs Coaching Titel'],
            'vs_coaching_text'              => ['label' => 'Vs Coaching Tekst', 'type' => 'textarea'],
            'cta_heading'                   => ['label' => 'CTA Heading', 'section' => 'CTA'],
            'cta_description'               => ['label' => 'CTA Beschrijving', 'type' => 'textarea'],
            'cta_button_organisaties'       => ['label' => 'CTA Button Organisaties'],
            'cta_button_weekend'            => ['label' => 'CTA Button Weekend'],
            'framework_step_1_title'        => ['label' => 'Framework Step 1 Titel', 'section' => 'Framework Sectie'],
            'framework_step_2_title'        => ['label' => 'Framework Step 2 Titel'],
            'framework_step_3_title'        => ['label' => 'Framework Step 3 Titel'],
            'framework_step_4_title'        => ['label' => 'Framework Step 4 Titel'],
            'framework_step_5_title'        => ['label' => 'Framework Step 5 Titel'],
            'framework_step_1_description'  => ['label' => 'Framework Step 1 Beschrijving', 'type' => 'textarea'],
            'framework_step_2_description'  => ['label' => 'Framework Step 2 Beschrijving', 'type' => 'textarea'],
            'framework_step_3_description'  => ['label' => 'Framework Step 3 Beschrijving', 'type' => 'textarea'],
            'framework_step_4_description'  => ['label' => 'Framework Step 4 Beschrijving', 'type' => 'textarea'],
            'framework_step_5_description'  => ['label' => 'Framework Step 5 Beschrijving', 'type' => 'textarea'],
            'principe_1_text'               => ['label' => 'Principe 1 Tekst', 'section' => 'Principe Sectie', 'type' => 'textarea'],
            'principe_2_text'               => ['label' => 'Principe 2 Tekst', 'type' => 'textarea'],
            'principe_3_text'               => ['label' => 'Principe 3 Tekst', 'type' => 'textarea'],
            'principe_4_text'               => ['label' => 'Principe 4 Tekst', 'type' => 'textarea'],
            'principe_5_text'               => ['label' => 'Principe 5 Tekst', 'type' => 'textarea'],
            'principe_6_text'               => ['label' => 'Principe 6 Tekst', 'type' => 'textarea'],
            'principe_7_text'               => ['label' => 'Principe 7 Tekst', 'type' => 'textarea'],
        ],
        'pilot-programma' => [
            'problem_stat_1'                => ['label' => 'Problem Stat 1', 'section' => 'Problem Sectie'],
            'problem_stat_1_text'           => ['label' => 'Problem Stat 1 Tekst', 'type' => 'textarea'],
            'problem_stat_2'                => ['label' => 'Problem Stat 2'],
            'problem_stat_2_text'           => ['label' => 'Problem Stat 2 Tekst', 'type' => 'textarea'],
            'problem_stat_3'                => ['label' => 'Problem Stat 3'],
            'problem_stat_3_text'           => ['label' => 'Problem Stat 3 Tekst', 'type' => 'textarea'],
            'problem_stat_4'                => ['label' => 'Problem Stat 4'],
            'problem_stat_4_text'           => ['label' => 'Problem Stat 4 Tekst', 'type' => 'textarea'],
            'outcome_1_title'               => ['label' => 'Outcome 1 Titel', 'section' => 'Outcome Sectie'],
            'outcome_1_text'                => ['label' => 'Outcome 1 Tekst', 'type' => 'textarea'],
            'outcome_2_title'               => ['label' => 'Outcome 2 Titel'],
            'outcome_2_text'                => ['label' => 'Outcome 2 Tekst', 'type' => 'textarea'],
            'outcome_3_title'               => ['label' => 'Outcome 3 Titel'],
            'outcome_3_text'                => ['label' => 'Outcome 3 Tekst', 'type' => 'textarea'],
            'outcome_4_title'               => ['label' => 'Outcome 4 Titel'],
            'outcome_4_text'                => ['label' => 'Outcome 4 Tekst', 'type' => 'textarea'],
            'outcome_5_title'               => ['label' => 'Outcome 5 Titel'],
            'outcome_5_text'                => ['label' => 'Outcome 5 Tekst', 'type' => 'textarea'],
            'outcome_6_title'               => ['label' => 'Outcome 6 Titel'],
            'outcome_6_text'                => ['label' => 'Outcome 6 Tekst', 'type' => 'textarea'],
            'timeline_1_month'              => ['label' => 'Timeline 1 Month', 'section' => 'Timeline Sectie'],
            'timeline_1_title'              => ['label' => 'Timeline 1 Titel'],
            'timeline_1_text'               => ['label' => 'Timeline 1 Tekst', 'type' => 'textarea'],
            'timeline_2_month'              => ['label' => 'Timeline 2 Month'],
            'timeline_2_title'              => ['label' => 'Timeline 2 Titel'],
            'timeline_2_text'               => ['label' => 'Timeline 2 Tekst', 'type' => 'textarea'],
            'timeline_3_month'              => ['label' => 'Timeline 3 Month'],
            'timeline_3_title'              => ['label' => 'Timeline 3 Titel'],
            'timeline_3_text'               => ['label' => 'Timeline 3 Tekst', 'type' => 'textarea'],
            'timeline_4_month'              => ['label' => 'Timeline 4 Month'],
            'timeline_4_title'              => ['label' => 'Timeline 4 Titel'],
            'timeline_4_text'               => ['label' => 'Timeline 4 Tekst', 'type' => 'textarea'],
            'timeline_5_month'              => ['label' => 'Timeline 5 Month'],
            'timeline_5_title'              => ['label' => 'Timeline 5 Titel'],
            'timeline_5_text'               => ['label' => 'Timeline 5 Tekst', 'type' => 'textarea'],
            'process_1_title'               => ['label' => 'Process 1 Titel', 'section' => 'Process Sectie'],
            'process_1_text'                => ['label' => 'Process 1 Tekst', 'type' => 'textarea'],
            'process_2_title'               => ['label' => 'Process 2 Titel'],
            'process_2_text'                => ['label' => 'Process 2 Tekst', 'type' => 'textarea'],
            'process_3_title'               => ['label' => 'Process 3 Titel'],
            'process_3_text'                => ['label' => 'Process 3 Tekst', 'type' => 'textarea'],
            'process_4_title'               => ['label' => 'Process 4 Titel'],
            'process_4_text'                => ['label' => 'Process 4 Tekst', 'type' => 'textarea'],
            'faq_1_question'                => ['label' => 'Faq 1 Question', 'section' => 'FAQ'],
            'faq_1_answer'                  => ['label' => 'Faq 1 Answer'],
            'faq_2_question'                => ['label' => 'Faq 2 Question'],
            'faq_2_answer'                  => ['label' => 'Faq 2 Answer'],
            'faq_3_question'                => ['label' => 'Faq 3 Question'],
            'faq_3_answer'                  => ['label' => 'Faq 3 Answer'],
            'faq_4_question'                => ['label' => 'Faq 4 Question'],
            'faq_4_answer'                  => ['label' => 'Faq 4 Answer'],
            'faq_5_question'                => ['label' => 'Faq 5 Question'],
            'faq_5_answer'                  => ['label' => 'Faq 5 Answer'],
            'faq_6_question'                => ['label' => 'Faq 6 Question'],
            'faq_6_answer'                  => ['label' => 'Faq 6 Answer'],
            'guarantee_1_title'             => ['label' => 'Guarantee 1 Titel', 'section' => 'Guarantee Sectie'],
            'guarantee_1_text'              => ['label' => 'Guarantee 1 Tekst', 'type' => 'textarea'],
            'guarantee_2_title'             => ['label' => 'Guarantee 2 Titel'],
            'guarantee_2_text'              => ['label' => 'Guarantee 2 Tekst', 'type' => 'textarea'],
            'guarantee_3_title'             => ['label' => 'Guarantee 3 Titel'],
            'guarantee_3_text'              => ['label' => 'Guarantee 3 Tekst', 'type' => 'textarea'],
            'hero_label'                    => ['label' => 'Hero Label', 'section' => 'Hero Sectie'],
            'hero_title'                    => ['label' => 'Hero Titel'],
            'hero_subtitle_text'            => ['label' => 'Hero Subtitel Tekst', 'type' => 'textarea'],
            'hero_cta'                      => ['label' => 'Hero CTA'],
            'hero_badge_1'                  => ['label' => 'Hero Badge 1'],
            'hero_badge_2'                  => ['label' => 'Hero Badge 2'],
            'hero_badge_3'                  => ['label' => 'Hero Badge 3'],
            'problem_heading'               => ['label' => 'Problem Heading'],
            'problem_intro_text'            => ['label' => 'Problem Introductie Tekst', 'type' => 'textarea'],
            'problem_conclusion_text'       => ['label' => 'Problem Conclusion Tekst', 'type' => 'textarea'],
            'solution_label'                => ['label' => 'Solution Label', 'section' => 'Solution Sectie'],
            'solution_heading'              => ['label' => 'Solution Heading'],
            'solution_intro_text'           => ['label' => 'Solution Introductie Tekst', 'type' => 'textarea'],
            'solution_pillar_1_title'       => ['label' => 'Solution Pillar 1 Titel'],
            'solution_pillar_1_text'        => ['label' => 'Solution Pillar 1 Tekst', 'type' => 'textarea'],
            'solution_pillar_2_title'       => ['label' => 'Solution Pillar 2 Titel'],
            'solution_pillar_2_text'        => ['label' => 'Solution Pillar 2 Tekst', 'type' => 'textarea'],
            'solution_pillar_3_title'       => ['label' => 'Solution Pillar 3 Titel'],
            'solution_pillar_3_text'        => ['label' => 'Solution Pillar 3 Tekst', 'type' => 'textarea'],
            'outcomes_heading'              => ['label' => 'Outcomes Heading', 'section' => 'Outcomes Sectie'],
            'outcomes_intro_text'           => ['label' => 'Outcomes Introductie Tekst', 'type' => 'textarea'],
            'proof_heading'                 => ['label' => 'Proof Heading', 'section' => 'Proof Sectie'],
            'proof_stat_1'                  => ['label' => 'Proof Stat 1'],
            'proof_stat_1_title'            => ['label' => 'Proof Stat 1 Titel'],
            'proof_stat_1_text'             => ['label' => 'Proof Stat 1 Tekst', 'type' => 'textarea'],
            'proof_stat_2'                  => ['label' => 'Proof Stat 2'],
            'proof_stat_2_title'            => ['label' => 'Proof Stat 2 Titel'],
            'proof_stat_2_text'             => ['label' => 'Proof Stat 2 Tekst', 'type' => 'textarea'],
            'proof_method_title'            => ['label' => 'Proof Method Titel'],
            'proof_method_text'             => ['label' => 'Proof Method Tekst', 'type' => 'textarea'],
            'testimonial_quote_text'        => ['label' => 'Testimonial Quote Tekst', 'section' => 'Testimonial Sectie', 'type' => 'textarea'],
            'testimonial_author'            => ['label' => 'Testimonial Author'],
            'timeline_label'                => ['label' => 'Timeline Label'],
            'timeline_heading'              => ['label' => 'Timeline Heading'],
            'timeline_intro'                => ['label' => 'Timeline Introductie', 'type' => 'textarea'],
            'process_label'                 => ['label' => 'Process Label'],
            'process_heading'               => ['label' => 'Process Heading'],
            'process_intro'                 => ['label' => 'Process Introductie', 'type' => 'textarea'],
            'investment_heading'            => ['label' => 'Investment Heading', 'section' => 'Investering'],
            'investment_price'              => ['label' => 'Investment Price'],
            'investment_price_note'         => ['label' => 'Investment Price Opmerking', 'type' => 'textarea'],
            'investment_included_title'     => ['label' => 'Investment Included Titel'],
            'investment_included_items'     => ['label' => 'Investment Included Items', 'type' => 'textarea'],
            'investment_context_title'      => ['label' => 'Investment Context Titel'],
            'investment_context_text'       => ['label' => 'Investment Context Tekst', 'type' => 'textarea'],
            'guarantee_heading'             => ['label' => 'Guarantee Heading'],
            'cta_heading'                   => ['label' => 'CTA Heading', 'section' => 'CTA'],
            'cta_text'                      => ['label' => 'CTA Tekst', 'type' => 'textarea'],
            'cta_button'                    => ['label' => 'CTA Button'],
            'cta_note'                      => ['label' => 'CTA Opmerking', 'type' => 'textarea'],
            'faq_heading'                   => ['label' => 'Faq Heading'],
            'faq_intro'                     => ['label' => 'Faq Introductie', 'type' => 'textarea'],
            'faq_cta'                       => ['label' => 'Faq CTA'],
        ],
        'business-retreats' => [
            'gallery_images'                => ['label' => 'Gallery Images', 'section' => 'Foto Galerij'],
            'hero_image'                    => ['label' => 'Hero Foto', 'section' => 'Hero Sectie', 'type' => 'image'],
            'problem_heading'               => ['label' => 'Problem Heading', 'section' => 'Problem Sectie'],
            'problem_text'                  => ['label' => 'Problem Tekst', 'type' => 'textarea'],
            'voor_wie_heading'              => ['label' => 'Voor Wie Heading', 'section' => 'Voor Sectie'],
            'voor_wie_intro'                => ['label' => 'Voor Wie Introductie', 'type' => 'textarea'],
            'voor_wie_primary_title'        => ['label' => 'Voor Wie Primary Titel'],
            'voor_wie_text'                 => ['label' => 'Voor Wie Tekst', 'type' => 'textarea'],
            'voor_wie_senior_title'         => ['label' => 'Voor Wie Senior Titel'],
            'voor_wie_senior_text'          => ['label' => 'Voor Wie Senior Tekst', 'type' => 'textarea'],
            'gallery_heading'               => ['label' => 'Gallery Heading'],
            'gallery_subtitle'              => ['label' => 'Gallery Subtitel'],
            'inhoud_heading'                => ['label' => 'Inhoud Heading', 'section' => 'Inhoud Sectie'],
            'inhoud_intro'                  => ['label' => 'Inhoud Introductie', 'type' => 'textarea'],
            'investering_heading'           => ['label' => 'Investering Heading', 'section' => 'Investering Sectie'],
            'investering_1_title'           => ['label' => 'Investering 1 Titel'],
            'investering_1_text'            => ['label' => 'Investering 1 Tekst', 'type' => 'textarea'],
            'investering_2_title'           => ['label' => 'Investering 2 Titel'],
            'investering_2_text'            => ['label' => 'Investering 2 Tekst', 'type' => 'textarea'],
            'investering_3_title'           => ['label' => 'Investering 3 Titel'],
            'investering_3_text'            => ['label' => 'Investering 3 Tekst', 'type' => 'textarea'],
            'investering_4_title'           => ['label' => 'Investering 4 Titel'],
            'investering_4_text'            => ['label' => 'Investering 4 Tekst', 'type' => 'textarea'],
            'coaches_section_heading'       => ['label' => 'Coaches Section Heading', 'section' => 'Coaches'],
            'coaches_section_subtitle'      => ['label' => 'Coaches Section Subtitel'],
            'coaches_section_cta'           => ['label' => 'Coaches Section CTA'],
            'praktisch_heading'             => ['label' => 'Praktisch Heading', 'section' => 'Praktisch Sectie'],
            'praktisch_intro'               => ['label' => 'Praktisch Introductie', 'type' => 'textarea'],
            'praktisch_format_a_title'      => ['label' => 'Praktisch Format A Titel'],
            'praktisch_format_a_subtitle'   => ['label' => 'Praktisch Format A Subtitel'],
            'praktisch_format_a_text'       => ['label' => 'Praktisch Format A Tekst', 'type' => 'textarea'],
            'praktisch_format_b_title'      => ['label' => 'Praktisch Format B Titel'],
            'praktisch_format_b_subtitle'   => ['label' => 'Praktisch Format B Subtitel'],
            'praktisch_format_b_text'       => ['label' => 'Praktisch Format B Tekst', 'type' => 'textarea'],
            'praktisch_fact_duration'       => ['label' => 'Praktisch Fact Duration'],
            'praktisch_fact_group_size'     => ['label' => 'Praktisch Fact Group Size'],
            'praktisch_fact_group_label'    => ['label' => 'Praktisch Fact Group Label'],
            'praktisch_fact_location'       => ['label' => 'Praktisch Fact Location'],
            'praktisch_fact_format'         => ['label' => 'Praktisch Fact Format'],
            'breathwork_heading'            => ['label' => 'Breathwork Heading', 'section' => 'Breathwork'],
            'breathwork_subtitle'           => ['label' => 'Breathwork Subtitel'],
            'breathwork_url'                => ['label' => 'Breathwork URL', 'type' => 'image'],
            'breathwork_image'              => ['label' => 'Breathwork Foto', 'type' => 'image'],
            'breathwork_card_heading'       => ['label' => 'Breathwork Card Heading'],
            'breathwork_card_description'   => ['label' => 'Breathwork Card Beschrijving', 'type' => 'textarea'],
            'breathwork_benefits'           => ['label' => 'Breathwork Benefits'],
            'yoga_image'                    => ['label' => 'Yoga Foto', 'section' => 'Yoga', 'type' => 'image'],
            'yoga_heading'                  => ['label' => 'Yoga Heading'],
            'yoga_subtitle'                 => ['label' => 'Yoga Subtitel'],
            'yoga_benefits'                 => ['label' => 'Yoga Benefits'],
            'location_image'                => ['label' => 'Location Foto', 'section' => 'Locatie', 'type' => 'image'],
            'location_heading'              => ['label' => 'Location Heading'],
            'location_text'                 => ['label' => 'Location Tekst', 'type' => 'textarea'],
            'location_cta_label'            => ['label' => 'Location CTA Label'],
            'video_heading'                 => ['label' => 'Video Heading', 'section' => 'Video'],
            'cta_heading'                   => ['label' => 'CTA Heading', 'section' => 'CTA'],
            'cta_text'                      => ['label' => 'CTA Tekst', 'type' => 'textarea'],
            'jaarprogramma_heading'         => ['label' => 'Jaarprogramma Heading', 'section' => 'Jaarprogramma Sectie'],
            'jaarprogramma_intro'           => ['label' => 'Jaarprogramma Introductie', 'type' => 'textarea'],
            'jaarprogramma_subheading'      => ['label' => 'Jaarprogramma Subheading'],
            'jaarprogramma_0_title'         => ['label' => 'Jaarprogramma 0 Titel'],
            'jaarprogramma_0_text'          => ['label' => 'Jaarprogramma 0 Tekst', 'type' => 'textarea'],
            'jaarprogramma_1_title'         => ['label' => 'Jaarprogramma 1 Titel'],
            'jaarprogramma_1_text'          => ['label' => 'Jaarprogramma 1 Tekst', 'type' => 'textarea'],
            'jaarprogramma_2_title'         => ['label' => 'Jaarprogramma 2 Titel'],
            'jaarprogramma_2_text'          => ['label' => 'Jaarprogramma 2 Tekst', 'type' => 'textarea'],
            'jaarprogramma_3_title'         => ['label' => 'Jaarprogramma 3 Titel'],
            'jaarprogramma_3_text'          => ['label' => 'Jaarprogramma 3 Tekst', 'type' => 'textarea'],
            'jaarprogramma_4_title'         => ['label' => 'Jaarprogramma 4 Titel'],
            'jaarprogramma_4_text'          => ['label' => 'Jaarprogramma 4 Tekst', 'type' => 'textarea'],
            'jaarprogramma_5_title'         => ['label' => 'Jaarprogramma 5 Titel'],
            'jaarprogramma_5_text'          => ['label' => 'Jaarprogramma 5 Tekst', 'type' => 'textarea'],
            'final_cta_heading'             => ['label' => 'Final CTA Heading', 'section' => 'Final Sectie'],
            'final_cta_text'                => ['label' => 'Final CTA Tekst', 'type' => 'textarea'],
        ],
    ];

    $fields = isset($pages[$slug]) ? $pages[$slug] : [];

    // Gedeelde SEO-sectie: op elke pagina bewerkbaar (titel, meta description, social-afbeelding).
    // Wordt opgeslagen in hetzelfde yww_page_content JSON-meta en uitgelezen door /yww/v1/seo/{slug}.
    $fields['seo_title']       = ['label' => 'SEO titel', 'section' => 'SEO', 'hint' => '50-60 tekens'];
    $fields['seo_description'] = ['label' => 'Meta description', 'section' => 'SEO', 'type' => 'textarea', 'rows' => 3, 'hint' => '140-160 tekens'];
    $fields['seo_og_image']    = ['label' => 'Social deelafbeelding', 'section' => 'SEO', 'type' => 'image'];

    return $fields;
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
        // Employer Review
        'yww_employer_review_name', 'yww_employer_review_role', 'yww_employer_review_company',
        'yww_employer_review_quote', 'yww_employer_review_image', 'yww_employer_review_order',
    ];

    // Textarea fields that should preserve newlines
    $textarea_keys = [
        'yww_coach_bio', 'yww_testimonial_quote', 'yww_event_description',
        'yww_podcast_teaser', 'yww_workshop_description', 'yww_workshop_goal',
        'yww_workshop_program', 'yww_faq_answer', 'yww_employer_review_quote',
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

// ─── Auto-fetch YouTube duration for podcasts ───

add_action('save_post_yww_podcast', 'yww_auto_fetch_youtube_duration', 20);

function yww_auto_fetch_youtube_duration($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    $youtube_url = get_post_meta($post_id, 'yww_podcast_youtube_url', true);
    $duration    = get_post_meta($post_id, 'yww_podcast_duration', true);

    // Only fetch if YouTube URL exists and duration is empty or default
    if (!$youtube_url || ($duration && $duration !== '00:00')) return;

    $api_key = defined('YWW_YOUTUBE_API_KEY') ? YWW_YOUTUBE_API_KEY : '';
    if (!$api_key) return;

    // Extract video ID from YouTube URL
    $video_id = '';
    if (preg_match('/[?&]v=([a-zA-Z0-9_-]{11})/', $youtube_url, $m)) {
        $video_id = $m[1];
    } elseif (preg_match('#youtu\.be/([a-zA-Z0-9_-]{11})#', $youtube_url, $m)) {
        $video_id = $m[1];
    }
    if (!$video_id) return;

    $api_url  = "https://www.googleapis.com/youtube/v3/videos?id={$video_id}&part=contentDetails&key={$api_key}";
    $response = wp_remote_get($api_url, ['timeout' => 10]);

    if (is_wp_error($response)) return;

    $body = json_decode(wp_remote_retrieve_body($response), true);
    if (empty($body['items'][0]['contentDetails']['duration'])) return;

    // Convert ISO 8601 duration (PT1H2M30S) to HH:MM or MM:SS
    $iso = $body['items'][0]['contentDetails']['duration'];
    preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/', $iso, $parts);
    $h = intval($parts[1] ?? 0);
    $m = intval($parts[2] ?? 0);
    $s = intval($parts[3] ?? 0);

    if ($h > 0) {
        $formatted = sprintf('%d:%02d:%02d', $h, $m, $s);
    } else {
        $formatted = sprintf('%d:%02d', $m, $s);
    }

    update_post_meta($post_id, 'yww_podcast_duration', $formatted);
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

// ─── Save Blog Content as JSON ───
add_action('save_post_yww_blog', 'yww_save_blog_content_data');
add_action('save_post_page', 'yww_save_blog_content_data');

function yww_save_blog_content_data($post_id) {
    if (!isset($_POST['yww_blog_content_nonce']) || !wp_verify_nonce($_POST['yww_blog_content_nonce'], 'yww_save_blog_content')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = yww_get_blog_fields();
    $data   = [];

    foreach ($fields as $key => $field) {
        $name = 'yww_bc_' . $key;
        if (isset($_POST[$name])) {
            $type = isset($field['type']) ? $field['type'] : 'text';
            if ($type === 'html') {
                $data[$key] = wp_kses_post(wp_unslash($_POST[$name]));
            } elseif ($type === 'textarea') {
                $data[$key] = sanitize_textarea_field(wp_unslash($_POST[$name]));
            } else {
                $data[$key] = sanitize_text_field(wp_unslash($_POST[$name]));
            }
        }
    }

    update_post_meta($post_id, 'yww_blog_content', wp_slash(wp_json_encode($data, JSON_UNESCAPED_UNICODE)));
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
    // Site section
    add_settings_section('yww_site_section', 'Site', null, 'yww-settings');

    register_setting('yww-settings', 'yww_site_logo', [
        'sanitize_callback' => 'esc_url_raw',
    ]);
    add_settings_field('yww_site_logo', 'Site logo', function () {
        $value = get_option('yww_site_logo', '');
        $has_value = !empty($value);

        echo '<input type="url" id="yww_site_logo" name="yww_site_logo" value="' . esc_attr($value) . '" class="regular-text" />';
        echo ' <button type="button" class="button" id="yww_site_logo_button">Kies uit mediabibliotheek</button>';
        echo ' <button type="button" class="button button-link-delete" id="yww_site_logo_clear">Verwijderen</button>';
        echo '<p class="description">Kies een logo uit de mediabibliotheek of plak handmatig een afbeeldings-URL.</p>';
        echo '<div style="margin-top: 12px;">';
        echo '<img id="yww_site_logo_preview" src="' . esc_url($value) . '" alt="" style="max-width: 220px; height: auto; border: 1px solid #dcdcde; padding: 8px; background: #fff; display: ' . ($has_value ? 'block' : 'none') . ';" />';
        echo '</div>';
        ?>
        <script>
        (function() {
          const input = document.getElementById("yww_site_logo");
          const button = document.getElementById("yww_site_logo_button");
          const clearButton = document.getElementById("yww_site_logo_clear");
          const preview = document.getElementById("yww_site_logo_preview");

          if (!input || !button || !clearButton || !preview) {
            return;
          }

          const updatePreview = (value) => {
            if (value) {
              preview.src = value;
              preview.style.display = "block";
              return;
            }

            preview.removeAttribute("src");
            preview.style.display = "none";
          };

          button.addEventListener("click", function(event) {
            event.preventDefault();

            if (typeof wp === "undefined" || !wp.media) {
              return;
            }

            const frame = wp.media({
              title: "Kies een site logo",
              button: { text: "Gebruik dit logo" },
              library: { type: "image" },
              multiple: false
            });

            frame.on("select", function() {
              const attachment = frame.state().get("selection").first().toJSON();
              input.value = attachment.url || "";
              updatePreview(input.value);
            });

            frame.open();
          });

          clearButton.addEventListener("click", function(event) {
            event.preventDefault();
            input.value = "";
            updatePreview("");
          });

          input.addEventListener("input", function() {
            updatePreview(input.value.trim());
          });
        })();
        </script>
        <?php
    }, 'yww-settings', 'yww_site_section');

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
