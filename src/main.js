try {
    require('electron-reloader')(module);
  } catch (_) {}
  
const { app, BrowserWindow, globalShortcut } = require('electron');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Important for integrating preload scripts and other content
            enableRemoteModule: true, // If you intend to use the remote module in the renderer
          }
    });

    mainWindow.loadFile('src/index.html');
}

app.whenReady().then(() => {
    createWindow();

    globalShortcut.register('F4', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(true); // Ensure overlay is on top after showing
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {  // This ensures that the app quits on platforms other than macOS.
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {  // On macOS, re-create the window if the user clicks the dock icon with no other windows open.
        createWindow();
    }
});

app.on('will-quit', () => {
    // Ensure that the shortcut is unregistered before the app quits
    globalShortcut.unregisterAll();
});
