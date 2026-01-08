<?php
// api/router.php
// Simple router to handle AJAX requests

header('Content-Type: application/json');
require_once '../config.php';
require_once '../services/OpenRouterService.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$action = $input['action'] ?? '';

switch ($action) {
    case 'chat':
        handleChat($input);
        break;
    
    default:
        echo json_encode(['error' => 'Invalid action']);
        break;
}

function handleChat($input) {
    $apiKey = $input['apiKey'] ?? '';
    // $userMessage = $input['message'] ?? '';
    $history = $input['history'] ?? [];

    if (empty($apiKey)) {
        echo json_encode(['error' => 'API Key is missing. Please set it in Settings.']);
        return;
    }

    if (empty($history)) {
        echo json_encode(['error' => 'No conversation history provided.']);
        return;
    }

    // System Prompt to define the AI Persona
    $systemPrompt = [
        "role" => "system", 
        "content" => "You are 'Velvet', an elite high-fashion AI stylist. 
        Your goal is to provide sophisticated, trendy, and personalized fashion advice.
        Tone: Professional, chic, encouraging, and knowledgeable about current global fashion trends.
        If the user asks about something unrelated to fashion/lifestyle, politely steer them back to fashion.
        Keep answers concise but stylish."
    ];

    // Prepend system prompt to history
    array_unshift($history, $systemPrompt);

    $service = new OpenRouterService($apiKey);
    $response = $service->getChatCompletion($history);

    if (isset($response['error'])) {
        echo json_encode(['error' => $response['error']]);
    } else {
        // Extract the actual message content
        $aiMessage = $response['choices'][0]['message']['content'] ?? 'Fashion silence... (No response)';
        echo json_encode(['response' => $aiMessage]);
    }
}
