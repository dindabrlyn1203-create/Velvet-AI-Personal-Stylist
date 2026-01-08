<?php

namespace App\Services;

class OpenRouterService
{
    private $apiKey;
    private $baseUrl = 'https://openrouter.ai/api/v1';

    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function sendMessage($messages, $model = 'google/gemini-2.0-flash-001')
    {
        $url = $this->baseUrl . '/chat/completions';
        
        $headers = [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json',
            'HTTP-Referer: http://localhost:8000', // Required by OpenRouter
            'X-Title: Academic AI Assistant'
        ];

        $data = [
            'model' => $model,
            'messages' => $messages
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        // Disable SSL verification for development/local env if needed (Optional)
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new \Exception("Curl Error: " . $error);
        }
        
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new \Exception("API Error ($httpCode): " . $response);
        }

        return json_decode($response, true);
    }
}
