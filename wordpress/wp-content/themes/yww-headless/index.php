<?php
/**
 * Headless theme - redirects all frontend requests to the React app.
 * WordPress is used only as a CMS via the REST API.
 */

$frontend_url = defined('YWW_FRONTEND_URL') ? YWW_FRONTEND_URL : 'http://localhost:8080';

// If this is a REST API request, don't redirect
if (defined('REST_REQUEST') && REST_REQUEST) {
    return;
}

// Redirect all frontend requests to the React app
wp_redirect($frontend_url . $_SERVER['REQUEST_URI']);
exit;
