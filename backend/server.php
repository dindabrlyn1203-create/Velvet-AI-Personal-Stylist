<?php

// Simple Router for Local PHP Server
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/Services/OpenRouterService.php';

use App\Services\OpenRouterService;

// Load Env (Simple parser since we don't have vlucas/phpdotenv)
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && substr($line, 0, 1) !== '#') {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Router Logic
if ($uri === '/api/chat' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    handleChat();
} elseif ($uri === '/api/status') {
    echo json_encode(['status' => 'running', 'php_version' => phpversion()]);
} else {
    // Serve Static Files for anything else
    return false; // Standard PHP built-in server behavior to serve static files
}

function handleChat() {
    header('Content-Type: application/json');
    
    $apiKey = $_ENV['OPENROUTER_API_KEY'] ?? null;
    if (!$apiKey) {
        http_response_code(500);
        echo json_encode(['error' => 'API Key not configured']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $messages = $input['messages'] ?? [];

    if (empty($messages)) {
        http_response_code(400);
        echo json_encode(['error' => 'No messages provided']);
        return;
    }

    try {
        $service = new OpenRouterService($apiKey);
        $response = $service->sendMessage($messages);
        echo json_encode($response);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
