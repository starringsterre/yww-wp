<?php
// Router script for PHP built-in server with WordPress
$root = $_SERVER['DOCUMENT_ROOT'];
$path = '/'.ltrim(parse_url($_SERVER['REQUEST_URI'])['path'],'/' );

if ($path !== '/' && file_exists($root.$path)) {
    // Serve static files directly
    return false;
}

// Route everything else through WordPress
$_SERVER['SCRIPT_FILENAME'] = $root.'/index.php';
chdir($root);
require 'index.php';
