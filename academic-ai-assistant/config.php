<?php
// Config.php
// Stores application settings and constants.

// Enable error reporting for debugging (Academic requirement: Transparency)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Application Constants
define('APP_NAME', 'Velvet AI - Personal Fashion Stylist');
define('APP_VERSION', '1.0.0');

// API Configuration
// Ideally, this should be in an .env file, but for a simple academic desktop app, 
// we will store it here or allow the user to input it in the UI.
// leaving it empty initially.
define('OPENROUTER_API_KEY', ''); // User will input this in the UI
define('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1');

// Setup default timezone
date_default_timezone_set('Asia/Jakarta');
