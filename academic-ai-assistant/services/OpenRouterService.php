<?php
// services/OpenRouterService.php

class OpenRouterService {
    private $apiKey;
    private $baseUrl;

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
        $this->baseUrl = 'https://openrouter.ai/api/v1';
    }

    /**
     * Send a chat completion request to OpenRouter.
     * 
     * @param array $messages The history of messages for context.
     * @param string $model The model model to use.
     * @return array|string The response or error message.
     */
    public function getChatCompletion($messages, $model = 'openai/gpt-oss-safeguard-20b') {
        $url = $this->baseUrl . '/chat/completions';

        $data = [
            'model' => $model,
            'messages' => $messages,
            // 'temperature' => 0.7, // Creative but relevant
        ];

        $headers = [
            "Authorization: Bearer " . $this->apiKey,
            "Content-Type: application/json",
            "HTTP-Referer: http://localhost:8000", // Required by OpenRouter
            "X-Title: Velvet AI"
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For local dev environment

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if (curl_errno($ch)) {
            return ['error' => 'Curl Error: ' . curl_error($ch)];
        }

        curl_close($ch);

        if ($httpCode >= 400) {
            return ['error' => 'API Error (' . $httpCode . '): ' . $response];
        }

        return json_decode($response, true);
    }
}
