/* assets/script.js */

const chatHistory = document.getElementById('chat-history');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const apiKeyInput = document.getElementById('api-key');
const saveKeyBtn = document.getElementById('save-key-btn');

let conversationHistory = [];

// Load API Key from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem('openrouter_key');
    if (savedKey) {
        apiKeyInput.value = savedKey;
    }
});

// Save API Key
saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('openrouter_key', key);
        alert('API Key Saved Successfully!');
    }
});

// Send Message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = messageInput.value.trim();
    const apiKey = localStorage.getItem('openrouter_key');

    if (!message) return;

    if (!apiKey) {
        alert('Please enter your OpenRouter API Key in the settings first.');
        return;
    }

    // Append User Message
    appendMessage('user', message);
    messageInput.value = '';

    // Add to history
    conversationHistory.push({ role: 'user', content: message });

    // Show Loading
    const loadingId = showLoading();

    try {
        const response = await fetch('api/router.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'chat',
                apiKey: apiKey,
                history: conversationHistory
            })
        });

        const data = await response.json();

        // Remove loading
        removeLoading(loadingId);

        if (data.error) {
            appendMessage('system', 'Error: ' + data.error);
        } else {
            const aiText = data.response;
            appendMessage('ai', aiText);
            conversationHistory.push({ role: 'assistant', content: aiText });
        }

    } catch (error) {
        removeLoading(loadingId);
        appendMessage('system', 'Network Error. Please check your connection.');
        console.error(error);
    }
}

function appendMessage(role, text) {
    const div = document.createElement('div');
    div.classList.add('message', role);

    if (role === 'ai') {
        const avatar = document.createElement('div');
        avatar.classList.add('ai-avatar');
        avatar.textContent = 'Velvet AI';
        div.appendChild(avatar);

        // Simple line break parsing
        const content = document.createElement('div');
        content.innerHTML = text.replace(/\n/g, '<br>'); // Very basic replacement
        div.appendChild(content);
    } else {
        div.textContent = text;
    }

    chatHistory.appendChild(div);
    scrollToBottom();
}

function showLoading() {
    const id = 'loader-' + Date.now();
    const div = document.createElement('div');
    div.classList.add('message', 'ai');
    div.id = id;
    div.innerHTML = '<div class="ai-avatar">Velvet AI</div><div class="loader"></div>';
    chatHistory.appendChild(div);
    scrollToBottom();
    return id;
}

function removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function scrollToBottom() {
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
