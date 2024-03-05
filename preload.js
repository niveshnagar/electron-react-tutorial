const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  text1: "hello",
  send: (channel, data) => ipcRenderer.send(channel, data),
  multiply: async (num) => {
    try {
      // Call the context isolated IPC handler in the main process
      const result = await ipcRenderer.invoke("multiply", num);

      // Handle the result in the renderer process
      console.log("Result from main process:", result);
      return result;
    } catch (error) {
      console.error("Error invoking IPC handler:", error);
    }
  },
  onUpdateCounter: (channel, func) => {
    ipcRenderer.on(channel, func);
  },
});

// window.addEventListener('DOMContentLoaded', () => {
//   const counter = document.getElementById('counter')
//   ipcRenderer.on('update-counter', (_event, value) => {
//     const oldValue = Number(counter.innerText)
//     const newValue = oldValue + value
//     counter.innerText = newValue
//   })
// })

console.log("from preload.js");
