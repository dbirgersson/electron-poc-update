const { app, BrowserWindow, Notification } = require('electron')
require('electron-reload')(__dirname);
const autoUpdater = require("electron-updater").autoUpdater
var log = require('electron-log')
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = "info"
autoUpdater.on("checking-for-update", function (_arg1) {
  return log.info("Checking for update...");
});
autoUpdater.on("update-available", function (_arg2) {
  return log.info("Update available.");
});
autoUpdater.on("update-not-available", function (_arg3) {
  return log.info("Update not available.");
});
autoUpdater.on("error", function (err) {
  return log.info("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", function (progressObj) {
  return log.info("downloading update");
});
autoUpdater.on("update-downloaded", function (_arg4) {
  log.info("Update downloaded");
});

app.setAppUserModelId("se.sverigesakassor.electron-poc-update")
app.setAsDefaultProtocolClient('https')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})