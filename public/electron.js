const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 可选
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 加载 React 应用
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// 当 Electron 准备好时创建窗口
app.on('ready', createWindow);

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});