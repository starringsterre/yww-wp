<?php
/**
 * Plugin Name: YWW Content Types & REST API
 * Description: Custom Post Types, meta fields, and REST API endpoints for Young Wise Women headless CMS.
 * Version: 1.0.0
 * Author: YWW
 */

if (!defined('ABSPATH')) exit;

// ─────────────────────────────────────────────
// 1. REGISTER CUSTOM POST TYPES
// ─────────────────────────────────────────────

add_action('init', 'yww_register_post_types');

function yww_register_post_types() {

    // Coach
    register_post_type('yww_coach', [
        'labels' => [
            'name'          => 'Coaches',
            'singular_name' => 'Coach',
            'add_new_item'  => 'Nieuwe coach toevoegen',
            'edit_item'     => 'Coach bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-groups',
        'supports'     => ['title', 'thumbnail'],
        'menu_position' => 20,
    ]);

    // Testimonial
    register_post_type('yww_testimonial', [
        'labels' => [
            'name'          => 'Testimonials',
            'singular_name' => 'Testimonial',
            'add_new_item'  => 'Nieuwe testimonial toevoegen',
            'edit_item'     => 'Testimonial bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-format-quote',
        'supports'     => ['title', 'thumbnail'],
        'menu_position' => 21,
    ]);

    // Event
    register_post_type('yww_event', [
        'labels' => [
            'name'          => 'Events',
            'singular_name' => 'Event',
            'add_new_item'  => 'Nieuw event toevoegen',
            'edit_item'     => 'Event bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-calendar-alt',
        'supports'     => ['title'],
        'menu_position' => 22,
    ]);

    // Podcast
    register_post_type('yww_podcast', [
        'labels' => [
            'name'          => 'Podcasts',
            'singular_name' => 'Podcast',
            'add_new_item'  => 'Nieuwe podcast toevoegen',
            'edit_item'     => 'Podcast bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-microphone',
        'supports'     => ['title', 'thumbnail'],
        'menu_position' => 23,
    ]);

    // Blog
    register_post_type('yww_blog', [
        'labels' => [
            'name'          => 'Blogs',
            'singular_name' => 'Blog',
            'add_new_item'  => 'Nieuw blog toevoegen',
            'edit_item'     => 'Blog bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-admin-post',
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_position' => 24,
        'rewrite'      => ['slug' => 'blog'],
    ]);
}

// ─────────────────────────────────────────────
// 2. REGISTER POST META FIELDS
// ─────────────────────────────────────────────

add_action('init', 'yww_register_meta_fields');

function yww_register_meta_fields() {

    // Coach meta
    $coach_meta = [
        'yww_coach_bio'    => 'string',
        'yww_coach_role'   => 'string',
        'yww_coach_order'  => 'integer',
        'yww_coach_image'  => 'string',
    ];
    foreach ($coach_meta as $key => $type) {
        register_post_meta('yww_coach', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => $type === 'integer' ? 0 : '',
        ]);
    }

    // Testimonial meta
    $testimonial_meta = [
        'yww_testimonial_name'       => 'string',
        'yww_testimonial_date_label' => 'string',
        'yww_testimonial_quote'      => 'string',
        'yww_testimonial_image'      => 'string',
        'yww_testimonial_order'      => 'integer',
    ];
    foreach ($testimonial_meta as $key => $type) {
        register_post_meta('yww_testimonial', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => $type === 'integer' ? 0 : '',
        ]);
    }

    // Event meta
    $event_meta = [
        'yww_event_label'       => 'string',
        'yww_event_type'        => 'string',
        'yww_event_year'        => 'integer',
        'yww_event_month'       => 'integer',
        'yww_event_start_date'  => 'string',
        'yww_event_end_date'    => 'string',
        'yww_event_description' => 'string',
        'yww_event_link'        => 'string',
    ];
    foreach ($event_meta as $key => $type) {
        register_post_meta('yww_event', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => $type === 'integer' ? 0 : '',
        ]);
    }

    // Podcast meta
    $podcast_meta = [
        'yww_podcast_teaser'      => 'string',
        'yww_podcast_duration'    => 'string',
        'yww_podcast_date'        => 'string',
        'yww_podcast_guest'       => 'string',
        'yww_podcast_thumbnail'   => 'string',
        'yww_podcast_youtube_url' => 'string',
        'yww_podcast_spotify_url' => 'string',
    ];
    foreach ($podcast_meta as $key => $type) {
        register_post_meta('yww_podcast', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => '',
        ]);
    }

    // Blog meta
    $blog_meta = [
        'yww_blog_slug'           => 'string',
        'yww_blog_featured_image' => 'string',
    ];
    foreach ($blog_meta as $key => $type) {
        register_post_meta('yww_blog', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => '',
        ]);
    }
}

// ─────────────────────────────────────────────
// 3. CUSTOM REST API ENDPOINTS
// ─────────────────────────────────────────────

add_action('rest_api_init', 'yww_register_rest_routes');

function yww_register_rest_routes() {

    $namespace = 'yww/v1';

    // GET /yww/v1/coaches
    register_rest_route($namespace, '/coaches', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_coaches',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/testimonials
    register_rest_route($namespace, '/testimonials', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_testimonials',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/events
    register_rest_route($namespace, '/events', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_events',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/podcasts
    register_rest_route($namespace, '/podcasts', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_podcasts',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/blogs
    register_rest_route($namespace, '/blogs', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_blogs',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/options
    register_rest_route($namespace, '/options', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_options',
        'permission_callback' => '__return_true',
    ]);
}

// ─────────────────────────────────────────────
// 4. REST API CALLBACK FUNCTIONS
// ─────────────────────────────────────────────

function yww_get_coaches() {
    $posts = get_posts([
        'post_type'      => 'yww_coach',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_key'       => 'yww_coach_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'    => $post->ID,
            'name'  => $post->post_title,
            'bio'   => get_post_meta($post->ID, 'yww_coach_bio', true),
            'role'  => get_post_meta($post->ID, 'yww_coach_role', true),
            'image' => get_post_meta($post->ID, 'yww_coach_image', true),
            'order' => (int) get_post_meta($post->ID, 'yww_coach_order', true),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_testimonials() {
    $posts = get_posts([
        'post_type'      => 'yww_testimonial',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_key'       => 'yww_testimonial_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'    => $post->ID,
            'name'  => get_post_meta($post->ID, 'yww_testimonial_name', true),
            'date'  => get_post_meta($post->ID, 'yww_testimonial_date_label', true),
            'quote' => get_post_meta($post->ID, 'yww_testimonial_quote', true),
            'image' => get_post_meta($post->ID, 'yww_testimonial_image', true),
            'order' => (int) get_post_meta($post->ID, 'yww_testimonial_order', true),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_events() {
    $posts = get_posts([
        'post_type'      => 'yww_event',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_key'       => 'yww_event_start_date',
        'orderby'        => 'meta_value',
        'order'          => 'ASC',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'          => $post->ID,
            'label'       => get_post_meta($post->ID, 'yww_event_label', true),
            'type'        => get_post_meta($post->ID, 'yww_event_type', true),
            'year'        => (int) get_post_meta($post->ID, 'yww_event_year', true),
            'month'       => (int) get_post_meta($post->ID, 'yww_event_month', true),
            'startDate'   => get_post_meta($post->ID, 'yww_event_start_date', true),
            'endDate'     => get_post_meta($post->ID, 'yww_event_end_date', true),
            'description' => get_post_meta($post->ID, 'yww_event_description', true),
            'link'        => get_post_meta($post->ID, 'yww_event_link', true),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_podcasts() {
    $posts = get_posts([
        'post_type'      => 'yww_podcast',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'           => $post->ID,
            'title'        => $post->post_title,
            'teaser'       => get_post_meta($post->ID, 'yww_podcast_teaser', true),
            'duration'     => get_post_meta($post->ID, 'yww_podcast_duration', true),
            'date'         => get_post_meta($post->ID, 'yww_podcast_date', true),
            'guest'        => get_post_meta($post->ID, 'yww_podcast_guest', true),
            'thumbnailUrl' => get_post_meta($post->ID, 'yww_podcast_thumbnail', true),
            'youtubeUrl'   => get_post_meta($post->ID, 'yww_podcast_youtube_url', true),
            'spotifyUrl'   => get_post_meta($post->ID, 'yww_podcast_spotify_url', true),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_blogs() {
    $posts = get_posts([
        'post_type'      => 'yww_blog',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'      => get_post_meta($post->ID, 'yww_blog_slug', true) ?: $post->post_name,
            'title'   => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'image'   => get_post_meta($post->ID, 'yww_blog_featured_image', true),
            'content' => apply_filters('the_content', $post->post_content),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_options() {
    $options = [
        'footer' => [
            'about_text'    => get_option('yww_footer_about', 'Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek wat je drijft, verstevig je koers en groei met gelijkgestemde vrouwen.'),
            'copyright'     => get_option('yww_footer_copyright', ''),
        ],
        'contact' => [
            'email' => get_option('yww_contact_email', 'info@youngwisewomen.nl'),
            'phone' => get_option('yww_contact_phone', '+31 (0)6 55334728'),
        ],
        'social' => [
            'instagram' => get_option('yww_social_instagram', 'http://instagram.com/youngwisewomen'),
            'linkedin'  => get_option('yww_social_linkedin', ''),
        ],
        'brands' => json_decode(get_option('yww_brands', '[]'), true) ?: [],
    ];

    return rest_ensure_response($options);
}
