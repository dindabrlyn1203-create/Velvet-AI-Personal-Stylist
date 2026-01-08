<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Velvet AI | Personal Stylist</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="brand">VELVET</div>
        
        <div class="info-text" style="color: #666; font-size: 0.9em; margin-bottom: 20px;">
            Your personal digital fashion curator.
        </div>

        <div class="settings-panel">
            <div class="input-group">
                <label for="api-key">OpenRouter API Key</label>
                <input type="password" id="api-key" class="input-field" placeholder="sk-or-...">
            </div>
            <button id="save-key-btn" class="btn-primary">Connect System</button>
        </div>
    </aside>

    <!-- Main Chat Area -->
    <main class="chat-container">
        <header class="chat-header">
            <h2>The Atwood Collection</h2> 
            <!-- Just a fancy name for the current session context or season -->
        </header>

        <div id="chat-history" class="chat-history">
            <!-- Messages will appear here -->
            <div class="message ai">
                <div class="ai-avatar">Velvet AI</div>
                <div>Bonjour. I am Velvet. How can I elevate your style today?</div>
            </div>
        </div>

        <div class="chat-input-area">
            <textarea id="message-input" class="chat-input" placeholder="Ask about trends, outfits, or style advice..."></textarea>
            <button id="send-btn" class="send-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    </main>

    <script src="assets/script.js"></script>
</body>
</html>
