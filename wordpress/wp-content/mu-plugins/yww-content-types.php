<?php
/**
 * Plugin Name: YWW Content Types & REST API
 * Description: Custom Post Types, meta fields, and REST API endpoints for Young Wise Women headless CMS.
 * Version: 1.0.0
 * Author: YWW
 */

if (!defined('ABSPATH')) exit;

// ─────────────────────────────────────────────
// 0. CORS HEADERS FOR HEADLESS FRONTEND
// ─────────────────────────────────────────────

add_action('rest_pre_serve_request', function() {
    // LiteSpeed may cache REST responses and replay a previously cached
    // Access-Control-Allow-Origin header for a different frontend origin.
    // A wildcard is safe here because these endpoints are public read-only.
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Vary: Origin', false);
});

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

    // Workshop
    register_post_type('yww_workshop', [
        'labels' => [
            'name'          => 'Workshops',
            'singular_name' => 'Workshop',
            'add_new_item'  => 'Nieuwe workshop toevoegen',
            'edit_item'     => 'Workshop bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-welcome-learn-more',
        'supports'     => ['title'],
        'menu_position' => 25,
    ]);

    // FAQ
    register_post_type('yww_faq', [
        'labels' => [
            'name'          => 'FAQ',
            'singular_name' => 'FAQ',
            'add_new_item'  => 'Nieuwe FAQ toevoegen',
            'edit_item'     => 'FAQ bewerken',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-editor-help',
        'supports'     => ['title'],
        'menu_position' => 26,
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

    // Blog structured content — single JSON blob, parallel to yww_page_content for pages
    register_post_meta('yww_blog', 'yww_blog_content', [
        'show_in_rest'  => true,
        'single'        => true,
        'type'          => 'string',
        'default'       => '',
    ]);

    // Blog structured content also registered on page post type (for draft workflow)
    register_post_meta('page', 'yww_blog_content', [
        'show_in_rest'  => true,
        'single'        => true,
        'type'          => 'string',
        'default'       => '',
    ]);

    // Workshop meta
    $workshop_meta = [
        'yww_workshop_subtitle'    => 'string',
        'yww_workshop_description' => 'string',
        'yww_workshop_next_date'   => 'string',
        'yww_workshop_from_price'  => 'string',
        'yww_workshop_duration'    => 'string',
        'yww_workshop_location'    => 'string',
        'yww_workshop_audience'    => 'string',
        'yww_workshop_goal'        => 'string',
        'yww_workshop_program'     => 'string', // newline-separated items
        'yww_workshop_investment'  => 'string',
        'yww_workshop_order'       => 'integer',
    ];
    foreach ($workshop_meta as $key => $type) {
        register_post_meta('yww_workshop', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => $type === 'integer' ? 0 : '',
        ]);
    }

    // FAQ meta
    $faq_meta = [
        'yww_faq_answer'   => 'string',
        'yww_faq_page'     => 'string', // slug of the page this FAQ belongs to
        'yww_faq_order'    => 'integer',
    ];
    foreach ($faq_meta as $key => $type) {
        register_post_meta('yww_faq', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'default'       => $type === 'integer' ? 0 : '',
        ]);
    }

    // Page content meta — register for the built-in 'page' post type
    // We use a single meta key that stores all fields as JSON
    register_post_meta('page', 'yww_page_content', [
        'show_in_rest'  => true,
        'single'        => true,
        'type'          => 'string',
        'default'       => '',
    ]);
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

    // GET /yww/v1/blogs/{slug}
    register_rest_route($namespace, '/blogs/(?P<slug>[a-z0-9-]+)', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_blog_by_slug',
        'permission_callback' => '__return_true',
        'args' => [
            'slug' => [
                'required'          => true,
                'validate_callback' => function ($param) {
                    return is_string($param) && preg_match('/^[a-z0-9-]+$/', $param);
                },
            ],
        ],
    ]);

    // GET /yww/v1/options
    register_rest_route($namespace, '/options', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_options',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/pages/{slug}
    register_rest_route($namespace, '/pages/(?P<slug>[a-z0-9-]+)', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_page_content',
        'permission_callback' => '__return_true',
        'args' => [
            'slug' => [
                'required'          => true,
                'validate_callback' => function ($param) {
                    return is_string($param) && preg_match('/^[a-z0-9-]+$/', $param);
                },
            ],
        ],
    ]);

    // GET /yww/v1/workshops
    register_rest_route($namespace, '/workshops', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_workshops',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/seo/{slug}
    register_rest_route($namespace, '/seo/(?P<slug>[a-z0-9-]+)', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_seo',
        'permission_callback' => '__return_true',
        'args' => [
            'slug' => [
                'required'          => true,
                'validate_callback' => function ($param) {
                    return is_string($param) && preg_match('/^[a-z0-9-]+$/', $param);
                },
            ],
        ],
    ]);

    // GET /yww/v1/nav
    register_rest_route($namespace, '/nav', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_nav',
        'permission_callback' => '__return_true',
    ]);

    // GET /yww/v1/faqs
    register_rest_route($namespace, '/faqs', [
        'methods'             => 'GET',
        'callback'            => 'yww_get_faqs',
        'permission_callback' => '__return_true',
        'args' => [
            'page' => [
                'required'          => false,
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
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

// ─── Helper: build structured blog data from a post ───
function yww_build_blog_data($post) {
    $base = [
        'id'      => get_post_meta($post->ID, 'yww_blog_slug', true) ?: $post->post_name,
        'title'   => $post->post_title,
        'excerpt' => $post->post_excerpt,
        'image'   => get_post_meta($post->ID, 'yww_blog_featured_image', true),
        'slug'    => $post->post_name,
    ];

    $json = get_post_meta($post->ID, 'yww_blog_content', true);
    if (!$json) {
        $base['content'] = apply_filters('the_content', $post->post_content);
        return $base;
    }

    $data = json_decode($json, true);
    if (!is_array($data)) {
        $base['content'] = apply_filters('the_content', $post->post_content);
        return $base;
    }

    // Override image/excerpt from structured content if present
    if (!empty($data['image'])) {
        $base['image'] = $data['image'];
    }
    if (!empty($data['excerpt'])) {
        $base['excerpt'] = $data['excerpt'];
    }

    // Build sections array (up to 6)
    $sections = [];
    for ($i = 1; $i <= 6; $i++) {
        $heading = isset($data["section_{$i}_heading"]) ? $data["section_{$i}_heading"] : '';
        $body    = isset($data["section_{$i}_body"])    ? $data["section_{$i}_body"]    : '';
        if ($heading || $body) {
            $sections[] = ['heading' => $heading, 'body' => $body];
        }
    }

    $cta = null;
    if (!empty($data['cta_heading']) || !empty($data['cta_body'])) {
        $cta = [
            'heading'     => isset($data['cta_heading'])      ? $data['cta_heading']      : '',
            'body'        => isset($data['cta_body'])         ? $data['cta_body']         : '',
            'buttonLabel' => isset($data['cta_button_label']) ? $data['cta_button_label'] : '',
            'buttonUrl'   => isset($data['cta_button_url'])   ? $data['cta_button_url']   : '',
        ];
    }

    return array_merge($base, [
        'content'    => apply_filters('the_content', $post->post_content), // HTML fallback for old posts
        'date'       => isset($data['date'])       ? $data['date']       : '',
        'category'   => isset($data['category'])   ? $data['category']   : '',
        'readTime'   => isset($data['read_time'])  ? $data['read_time']  : '',
        'intro'      => isset($data['intro'])      ? $data['intro']      : '',
        'sections'   => $sections,
        'cta'        => $cta,
        'conclusion' => isset($data['conclusion']) ? $data['conclusion'] : '',
    ]);
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
        $data[] = yww_build_blog_data($post);
    }

    return rest_ensure_response($data);
}

function yww_get_blog_by_slug($request) {
    $slug = $request->get_param('slug');

    $posts = get_posts([
        'post_type'      => 'yww_blog',
        'name'           => $slug,
        'posts_per_page' => 1,
        'post_status'    => 'publish',
    ]);

    if (empty($posts)) {
        return new WP_Error('not_found', 'Blog not found', ['status' => 404]);
    }

    return rest_ensure_response(yww_build_blog_data($posts[0]));
}

function yww_get_options() {
    $options = [
        'site' => [
            'logo' => get_option('yww_site_logo', '/Logo-Young-Wise-Women.png'),
        ],
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

function yww_get_page_content($request) {
    $slug = $request->get_param('slug');

    // Resolve local/code slugs to production WP page slugs (inverse of admin-ui.php aliases)
    $aliases = [
        'retreats'          => 'groepstrainingen',
        'weekenden'         => 'persoonlijke-ontwikkeling-weekend-training',
        'weekend-intensive' => 'weekend-intensive-juni-2026',
        'workshops'         => 'ontwikkeling-workshops',
        'voor-organisaties' => 'in-company',
        'kalender'          => 'evenementen',
    ];
    $slug = $aliases[$slug] ?? $slug;

    $pages = get_posts([
        'post_type'      => 'page',
        'name'           => $slug,
        'posts_per_page' => 1,
        'post_status'    => 'publish',
    ]);

    if (empty($pages)) {
        return rest_ensure_response([]);
    }

    $page = $pages[0];
    $json = get_post_meta($page->ID, 'yww_page_content', true);
    $data = $json ? json_decode($json, true) : [];

    if (!is_array($data)) {
        $data = [];
    }

    return rest_ensure_response($data);
}

function yww_get_workshops() {
    $posts = get_posts([
        'post_type'      => 'yww_workshop',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_key'       => 'yww_workshop_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $program_raw = get_post_meta($post->ID, 'yww_workshop_program', true);
        $program = $program_raw ? array_filter(array_map('trim', explode("\n", $program_raw))) : [];

        $data[] = [
            'id'          => $post->ID,
            'title'       => $post->post_title,
            'subtitle'    => get_post_meta($post->ID, 'yww_workshop_subtitle', true),
            'description' => get_post_meta($post->ID, 'yww_workshop_description', true),
            'nextDate'    => get_post_meta($post->ID, 'yww_workshop_next_date', true),
            'fromPrice'   => get_post_meta($post->ID, 'yww_workshop_from_price', true),
            'duration'    => get_post_meta($post->ID, 'yww_workshop_duration', true),
            'location'    => get_post_meta($post->ID, 'yww_workshop_location', true),
            'audience'    => get_post_meta($post->ID, 'yww_workshop_audience', true),
            'goal'        => get_post_meta($post->ID, 'yww_workshop_goal', true),
            'program'     => array_values($program),
            'investment'  => get_post_meta($post->ID, 'yww_workshop_investment', true),
            'order'       => (int) get_post_meta($post->ID, 'yww_workshop_order', true),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_faqs($request) {
    $page_slug = $request->get_param('page');

    $args = [
        'post_type'      => 'yww_faq',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_key'       => 'yww_faq_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ];

    if ($page_slug) {
        $args['meta_query'] = [
            [
                'key'   => 'yww_faq_page',
                'value' => $page_slug,
            ],
        ];
    }

    $posts = get_posts($args);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'       => $post->ID,
            'question' => $post->post_title,
            'answer'   => get_post_meta($post->ID, 'yww_faq_answer', true),
            'page'     => get_post_meta($post->ID, 'yww_faq_page', true),
            'order'    => (int) get_post_meta($post->ID, 'yww_faq_order', true),
        ];
    }

    return rest_ensure_response($data);
}

function yww_get_nav() {
    // Nav config with stable 'key' per page (unchanged even if WP slug changes)
    $nav_config = [
        ['key' => 'in-company', 'children' => [
            ['key' => 'jaarprogrammas', 'prefix_key' => 'in-company'],
            ['key' => 'workshops-op-maat', 'prefix_key' => 'in-company'],
        ]],
        ['key' => 'groepstrainingen', 'children' => [
            ['key' => 'persoonlijke-ontwikkeling-weekend-training', 'prefix_key' => 'groepstrainingen'],
            ['key' => 'ontwikkeling-workshops', 'prefix_key' => 'groepstrainingen'],
        ]],
        ['key' => 'inspiratie', 'children' => [
            ['key' => 'evenementen', 'prefix_key' => 'inspiratie'],
            ['key' => 'tools-en-handvatten', 'prefix_key' => 'inspiratie'],
            ['key' => 'podcasts', 'prefix_key' => 'inspiratie'],
        ]],
        ['key' => 'ons-verhaal', 'children' => [
            ['key' => 'over-ella', 'prefix_key' => 'ons-verhaal'],
        ]],
    ];

    $footer_config = [
        ['key' => 'home'],
        ['key' => 'in-company'],
        ['key' => 'groepstrainingen'],
        ['key' => 'inspiratie'],
        ['key' => 'ons-verhaal'],
        ['key' => 'lid-worden'],
    ];

    // Collect all keys
    $all_keys = ['home', 'lid-worden'];
    foreach ($nav_config as $item) {
        $all_keys[] = $item['key'];
        foreach ($item['children'] ?? [] as $child) {
            $all_keys[] = $child['key'];
        }
    }
    $all_keys = array_unique($all_keys);

    // Read stored page IDs (stable across slug changes)
    $stored_ids = json_decode(get_option('yww_nav_page_ids', '{}'), true) ?: [];

    // Find keys with no stored ID yet — look them up by slug and save
    $missing_keys = array_values(array_filter($all_keys, fn($k) => !isset($stored_ids[$k])));
    if (!empty($missing_keys)) {
        $found = get_posts([
            'post_type'      => 'page',
            'post_name__in'  => $missing_keys,
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        ]);
        foreach ($found as $page) {
            if (in_array($page->post_name, $missing_keys)) {
                $stored_ids[$page->post_name] = $page->ID;
            }
        }
        update_option('yww_nav_page_ids', wp_json_encode($stored_ids));
    }

    // Fetch all pages via stable IDs
    $ids = array_values(array_filter($stored_ids));
    $pages = empty($ids) ? [] : get_posts([
        'post_type'      => 'page',
        'post__in'       => $ids,
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ]);

    // Build key → { title, slug } map via ID
    $id_map = [];
    foreach ($pages as $page) { $id_map[$page->ID] = $page; }

    $page_map = [];
    foreach ($stored_ids as $key => $id) {
        if (isset($id_map[$id])) {
            $page_map[$key] = [
                'title' => $id_map[$id]->post_title,
                'slug'  => $id_map[$id]->post_name,
            ];
        }
    }

    // Build href from key(s)
    $make_href = function($key, $prefix_key = null) use ($page_map) {
        if ($key === 'home') return '/';
        $slug = $page_map[$key]['slug'] ?? $key;
        if ($prefix_key) {
            $parent = $page_map[$prefix_key]['slug'] ?? $prefix_key;
            return '/' . $parent . '/' . $slug;
        }
        return '/' . $slug;
    };

    $get_label = fn($key) => $page_map[$key]['title'] ?? $key;

    // Build main nav
    $nav = [];
    foreach ($nav_config as $item) {
        $nav_item = [
            'href'  => $make_href($item['key']),
            'label' => $get_label($item['key']),
        ];
        if (!empty($item['children'])) {
            $nav_item['children'] = [];
            foreach ($item['children'] as $child) {
                $nav_item['children'][] = [
                    'href'  => $make_href($child['key'], $child['prefix_key'] ?? null),
                    'label' => $get_label($child['key']),
                ];
            }
        }
        $nav[] = $nav_item;
    }

    // Build footer nav
    $footer = [];
    foreach ($footer_config as $item) {
        $footer[] = [
            'href'  => $make_href($item['key']),
            'label' => $get_label($item['key']),
        ];
    }

    return rest_ensure_response(['nav' => $nav, 'footer' => $footer]);
}

function yww_get_seo($request) {
    $slug = $request->get_param('slug');
    $site_name = 'Young Wise Women';
    $site_url  = 'https://youngwisewomen.nl';

    // Try to find a page with this slug
    $pages = get_posts([
        'post_type'      => 'page',
        'name'           => $slug,
        'posts_per_page' => 1,
        'post_status'    => 'publish',
    ]);

    if (empty($pages)) {
        return new WP_REST_Response(['message' => 'Page not found'], 404);
    }

    $post = $pages[0];
    $post_id = $post->ID;

    // Read Yoast meta fields directly (custom titles/descriptions set by user)
    $custom_title = get_post_meta($post_id, '_yoast_wpseo_title', true);
    $custom_desc  = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
    $og_image     = get_post_meta($post_id, '_yoast_wpseo_opengraph-image', true);
    $canonical    = get_post_meta($post_id, '_yoast_wpseo_canonical', true);
    $robots_meta  = get_post_meta($post_id, '_yoast_wpseo_meta-robots-noindex', true);

    // Use custom Yoast title, or fallback to page title + site name
    $title = $custom_title ?: ($post->post_title . ' | ' . $site_name);
    $description = $custom_desc ?: '';

    // Get schema from Yoast API if available
    $schema = null;
    if (defined('WPSEO_VERSION')) {
        try {
            $yoast_meta = YoastSEO()->meta->for_post($post_id);
            if ($yoast_meta && $yoast_meta->schema) {
                $schema = $yoast_meta->schema;
            }
        } catch (Exception $e) {
            // Yoast API not available, skip schema
        }
    }

    // Build canonical from frontend URL if not custom set
    if (!$canonical) {
        $canonical = $site_url . '/' . $slug . '/';
    }
    $canonical = str_replace('https://cms.youngwisewomen.nl', $site_url, $canonical);

    // Replace CMS URLs in schema
    if ($schema) {
        $schema_json = wp_json_encode($schema);
        $schema_json = str_replace('cms.youngwisewomen.nl', 'youngwisewomen.nl', $schema_json);
        $schema_json = str_replace('YWW Headless CMS', $site_name, $schema_json);
        $schema = json_decode($schema_json, true);
    }

    $robots_str = $robots_meta === '1' ? 'noindex' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    return rest_ensure_response([
        'title'          => $title,
        'description'    => $description,
        'canonical'      => $canonical,
        'og_title'       => $title,
        'og_description' => $description,
        'og_image'       => $og_image ?: '',
        'og_type'        => 'website',
        'schema'         => $schema,
        'robots'         => $robots_str,
    ]);
}

// ─────────────────────────────────────────────
// 5. AUTO-SYNC BLOG DRAFT PAGES → yww_blog
// ─────────────────────────────────────────────

add_action('transition_post_status', 'yww_sync_blog_page_to_yww_blog', 10, 3);

function yww_sync_blog_page_to_yww_blog($new_status, $old_status, $post) {
    static $is_syncing = false;
    if ($is_syncing) return;

    // Only act when a page is published for the first time (or re-published)
    if ($new_status !== 'publish' || $post->post_type !== 'page') {
        return;
    }

    // Only act on pages that have blog content JSON
    $json = get_post_meta($post->ID, 'yww_blog_content', true);
    if (!$json) {
        return;
    }

    $data = json_decode($json, true);
    if (!is_array($data)) {
        return;
    }

    $is_syncing = true;

    $slug    = $post->post_name;
    $title   = $post->post_title;
    $excerpt = !empty($data['excerpt']) ? $data['excerpt'] : $post->post_excerpt;
    $image   = !empty($data['image'])   ? $data['image']   : '';

    // Check if a yww_blog post with the same slug already exists
    $existing = get_posts([
        'post_type'      => 'yww_blog',
        'name'           => $slug,
        'posts_per_page' => 1,
        'post_status'    => 'any',
    ]);

    if (!empty($existing)) {
        $blog_id = $existing[0]->ID;
        wp_update_post([
            'ID'           => $blog_id,
            'post_title'   => $title,
            'post_excerpt' => $excerpt,
            'post_name'    => $slug,
            'post_status'  => 'publish',
        ]);
    } else {
        $blog_id = wp_insert_post([
            'post_type'    => 'yww_blog',
            'post_title'   => $title,
            'post_excerpt' => $excerpt,
            'post_name'    => $slug,
            'post_status'  => 'publish',
            'post_content' => $post->post_content,
        ]);
    }

    if ($blog_id && !is_wp_error($blog_id)) {
        update_post_meta($blog_id, 'yww_blog_content', $json);
        if ($image) {
            update_post_meta($blog_id, 'yww_blog_featured_image', $image);
        }
    }

    $is_syncing = false;
}
