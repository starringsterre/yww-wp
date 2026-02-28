<?php
/**
 * Headless theme - redirects all frontend requests to the React app.
 * WordPress is used only as a CMS via the REST API.
 */

$frontend_url = defined('YWW_FRONTEND_URL') ? YWW_FRONTEND_URL : 'http://localhost:8080';

// Don't redirect REST API requests or admin pages
if (defined('REST_REQUEST') && REST_REQUEST) {
    return;
}
if (is_admin()) {
    return;
}

// Redirect all frontend requests to the React app
wp_redirect($frontend_url . $_SERVER['REQUEST_URI']);
exit;
