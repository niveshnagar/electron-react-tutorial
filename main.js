const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  });
  const startURL = url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
  });

  win.loadURL(startURL);
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
