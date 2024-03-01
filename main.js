const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // webSecurity: false,
      // preload: path.join(__dirname, 'preload.js')
    },
  });
  const startURL = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });

  win.webContents.openDevTools();

  win.loadURL(startURL);

  // win.loadURL("http://localhost:3000");
  // win.loadFile("./app/public/index.html");
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
