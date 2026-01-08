const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let phpServer;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // Security best practice
            contextIsolation: true
        },
        titleBarStyle: 'hiddenInset', // Mac-like title bar
        backgroundColor: '#0f172a'
    });

    // Wait for PHP to start (simple 1s delay, can be better with retry)
    setTimeout(() => {
        mainWindow.loadURL('http://localhost:8000');
    }, 1000);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function startPhpServer() {
    // Spawn PHP built-in server
    phpServer = spawn('php', ['-S', 'localhost:8000', '-t', 'public', 'backend/server.php']);

    phpServer.stdout.on('data', (data) => {
        console.log(`PHP: ${data}`);
    });

    phpServer.stderr.on('data', (data) => {
        console.error(`PHP Error: ${data}`);
    });

    phpServer.on('close', (code) => {
        console.log(`PHP server exited with code ${code}`);
    });
}

app.on('ready', () => {
    startPhpServer();
    createWindow();
});

app.on('window-all-closed', () => {
    // Kill PHP server
    if (phpServer) phpServer.kill();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
