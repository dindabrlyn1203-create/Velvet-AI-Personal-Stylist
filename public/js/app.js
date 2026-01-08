const API_URL = 'http://localhost:8000/api';

// State
let chatHistory = [];

async function handleChatSubmit(e) {
    e.preventDefault();
    const inputEl = document.getElementById('chat-input');
    const message = inputEl.value.trim();
    if (!message) return;

    // Add User Message
    addMessageToUI('user', message);
    inputEl.value = '';
    
    // Disable input
    const btn = document.getElementById('send-btn');
    btn.disabled = true;
    btn.classList.add('opacity-50');

    // Add loading state
    const loadingId = addLoadingToUI();

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'You are a helpful academic assistant. Answer strictly, professionally, and concisely.' },
                    ...chatHistory,
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();
        
        // Remove loading
        removeLoadingFromUI(loadingId);

        if (data.error) throw new Error(data.error);
        if (!data.choices || !data.choices[0]) throw new Error('Invalid response from AI');

        const aiText = data.choices[0].message.content;
        
        // Add AI Message
        addMessageToUI('assistant', aiText);
        
        // Update history
        chatHistory.push({ role: 'user', content: message });
        chatHistory.push({ role: 'assistant', content: aiText });

    } catch (err) {
        removeLoadingFromUI(loadingId);
        addMessageToUI('error', `Error: ${err.message}. Please check if the backend is running and API Key is set.`);
    } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50');
        document.getElementById('chat-input').focus();
    }
}

async function handleSummarize() {
    const text = document.getElementById('summary-input').value;
    const outDiv = document.getElementById('summary-output');
    const btn = document.getElementById('summarize-btn');

    if (!text.trim()) return;

    outDiv.innerHTML = '<div class="animate-pulse flex space-x-4"><div class="h-2 bg-slate-600 rounded col-span-2 w-full"></div></div>';
    btn.disabled = true;
    btn.classList.add('opacity-50');

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'You are an expert summarizer. Summarize the following academic text concisely in bullet points.' },
                    { role: 'user', content: text }
                ]
            })
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        const summary = data.choices[0].message.content;
        // Simple markdown parsing
        outDiv.innerHTML = summary.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        
    } catch (err) {
        outDiv.innerHTML = `<span class="text-red-400">Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50');
    }
}

// UI Helpers
function elementFromHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

function addMessageToUI(role, text) {
    const container = document.getElementById('chat-messages');
    let html = '';
    
    // Formatting text (Basic Markdown support for code blocks)
    let formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-1 rounded text-pink-300 font-mono text-sm">$1</code>');

    if (role === 'user') {
        html = `
        <div class="flex gap-4 flex-row-reverse fade-in">
            <div class="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">ME</div>
            <div class="flex-1 flex justify-end">
                <div class="bg-primary p-4 rounded-2xl rounded-tr-none inline-block max-w-[80%] text-white shadow-lg">
                    ${formattedText}
                </div>
            </div>
        </div>`;
    } else if (role === 'error') {
        html = `
        <div class="flex gap-4 fade-in">
             <div class="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-xs font-bold">!</div>
            <div class="flex-1">
                <div class="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-200 inline-block max-w-[80%]">
                    ${formattedText}
                </div>
            </div>
        </div>`;
    } else {
        html = `
        <div class="flex gap-4 fade-in">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold">AI</div>
            <div class="flex-1">
                <div class="glass p-4 rounded-2xl rounded-tl-none inline-block max-w-[80%] text-gray-200 border border-white/5 shadow-lg">
                    ${formattedText}
                </div>
            </div>
        </div>`;
    }
    
    container.appendChild(elementFromHtml(html));
    container.scrollTop = container.scrollHeight;
}

function addLoadingToUI() {
    const id = 'loading-' + Date.now();
    const container = document.getElementById('chat-messages');
    const html = `
    <div id="${id}" class="flex gap-4 fade-in">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold animate-pulse">...</div>
        <div class="flex-1">
            <div class="glass p-4 rounded-2xl rounded-tl-none inline-block text-gray-400 italic">
                Thinking...
            </div>
        </div>
    </div>`;
    container.appendChild(elementFromHtml(html));
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeLoadingFromUI(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function switchView(viewName) {
    // Hide all
    document.getElementById('view-chat').classList.add('hidden');
    document.getElementById('view-summarize').classList.add('hidden');
    
    // Reset Nav
    document.getElementById('nav-chat').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 text-gray-400 hover:text-white border border-transparent";
    document.getElementById('nav-summarize').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 text-gray-400 hover:text-white border border-transparent";

    // Show One
    document.getElementById('view-' + viewName).classList.remove('hidden');
    document.getElementById('view-' + viewName).classList.add('flex'); // Restore flex layout
    
    // Highlight Nav
    if (viewName === 'chat') {
        document.getElementById('nav-chat').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 bg-white/10 text-white shadow-lg border border-white/5";
    } else {
        document.getElementById('nav-summarize').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 bg-white/10 text-white shadow-lg border border-white/5";
    }
}
