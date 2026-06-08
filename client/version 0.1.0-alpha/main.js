const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

const expressApp = express();
const port = 3000;

expressApp.use(express.static(path.join(__dirname, 'static')));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icons/logo.ico')
  });

  mainWindow.loadURL(`http://localhost:${port}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const server = expressApp.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  createWindow();
});

app.on('ready', () => {
  // App already started via server.listen
});

app.on('window-all-closed', () => {
  server.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
