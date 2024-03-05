**[Design Pattern 1: Renderer to main (one-way):](https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-1-renderer-to-main-one-way)**
For this mode of communication b/w processes (from my react_page.tsx to main.js), we use two utility functions provided by electron js

**Step 1:** The communication works by emitting an event from the frontend file (namely react_page.tsx) using `ipcRenderer.send(”event_name”,data)`;

**Step 2:** Now we make an event listener for said event name in main.js using `ipcMain.on(”event_name”, handlerFunction)`

<!-- ----------------------------------------------------------------------------------------- -->
<!-- In this code design pattern is implemented in Mock.js -->

**[Design Pattern 2: Renderer to main to Renderer (two-way):](https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way)**

In this pattern, the general application is calling a main process module from your renderer (Frontend code) and waiting for a result back from main js (backend)

For this we utilize two utility functions provided to us by electron js:

1. `ipcRenderer.invoke`
2. `ipcRenderer.handle`

**Step 1:** We need to expose `ipcRenderer.invoke` in the main.js via preload using context isolation. `ipcRenderer.invoke` sends a msg via a given channel name like this : `ipcRenderer.invoker(”channel_name”)` from the renderer file

**Step 2:** In the main js attach a handler function that fires up when we receive a message from said `“channel_name”` like below:

`ipcRenderer.handle(”channel_name”, handlerFunction)`


<!-- In this process design pattern 3 is implemented in the counter using menu bar -->**Design Pattern 3: Main to Renderer (one-way):**

When sending a message from the main process to renderer we need to specify which renderer is receiving the message. To send messages to renderer we use its `WebContenets` instance. The `WebContents` instance contains `send` method. 

**Step 1:** We send a message from main to renderer using `mainWindow.Webcontents.send(”channel_name”, value)`

**Step 2:** Now, in our Renderer (React page), we attach an event listener for `“channel name”`   using `ipcRenderer.on(”channel_name”, handlerFunc)`

**Step 3:** Given we can’t access node js features directly in frontend in electron, we will not be able to use `ipcRenderer.on(”channel_name”, handlerFunc)` directly in frontend react code. So we use context isolation and add it to renderer by exposing it in main using contextBridge like this: 

```
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  text1: "hello",
  onUpdateCounter: (channel, func) => {
    ipcRenderer.on(channel, func);
  },
});
```

**Step 4:** Now in our react page, we can use this onUpdateCounter like this veto attach the event listener:

```
 useEffect(() => {
    const handleUpdateCounter = (_event: Electron.IpcRendererEvent, value: number) => {
      setCounter((prevCounter) => prevCounter + value);
    };

    (window as any).myAPI.onUpdateCounter('update-counter', handleUpdateCounter);
  }, []);
```