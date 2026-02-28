<?php
/**
 * YWW Headless Theme - functions.php
 *
 * Configures WordPress as a headless CMS:
 * - CORS headers for REST API
 * - Disable unnecessary frontend features
 * - Define frontend URL constant
 */

// Frontend URL (React app)
if (!defined('YWW_FRONTEND_URL')) {
    define('YWW_FRONTEND_URL', 'http://localhost:8080');
}

/**
 * Add CORS headers to REST API responses
 */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            'http://localhost:8080',
            'http://localhost:5173',
            'https://youngwisewomen.nl',
            'https://www.youngwisewomen.nl',
        ];

        if ($origin && in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        } else {
            header('Access-Control-Allow-Origin: ' . YWW_FRONTEND_URL);
        }

        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');

        return $value;
    });
});

/**
 * Handle CORS preflight requests
 */
add_action('init', function () {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Max-Age: 86400');
        status_header(200);
        exit;
    }
});

/**
 * Disable unnecessary frontend features for headless setup
 */
add_action('after_setup_theme', function () {
    // Remove emoji support
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');

    // Remove REST API link from head (not needed in headless)
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');

    // Remove WordPress version
    remove_action('wp_head', 'wp_generator');

    // Add post thumbnail support
    add_theme_support('post-thumbnails');
});

/**
 * Allow Application Passwords over HTTP for local development
 */
add_filter('wp_is_application_passwords_available', '__return_true');

/**
 * Disable XML-RPC for security
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Increase REST API default per_page limit
 */
add_filter('rest_endpoints', function ($endpoints) {
    return $endpoints;
});
