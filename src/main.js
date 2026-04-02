const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'), // Optional: Add an icon
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    title: 'Todoodle',
    show: false
  });

  // Load the app
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  // Global shortcuts
  globalShortcut.register('CommandOrControl+N', () => {
    mainWindow.webContents.send('new-todo');
  });

  globalShortcut.register('CommandOrControl+D', () => {
    mainWindow.webContents.send('toggle-dark-mode');
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC handlers
ipcMain.handle('get-todos', () => {
  // In a real app, this would read from a file or database
  return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
});

ipcMain.handle('save-todos', (event, todos) => {
  // In a real app, this would save to a file or database
  localStorage.setItem('todos', JSON.stringify(todos));
  return true;
});
