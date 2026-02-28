<?php
/**
 * Plugin Name: YWW Admin UI
 * Description: Meta boxes and options pages for YWW content types.
 * Version: 1.0.0
 * Author: YWW
 */

if (!defined('ABSPATH')) exit;

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
    ];

    foreach ($meta_keys as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, sanitize_text_field(wp_unslash($_POST[$key])));
        }
    }
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
