import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const electron = (window as any).myAPI;
  const handleClick = () => {
    console.log(electron?.text1);
    electron.send()
  };

  useEffect(() => {
    const handleUpdateCounter = (_event: Electron.IpcRendererEvent, value: number) => {
      setCounter((prevCounter) => prevCounter + value);
    };

    (window as any).myAPI.onUpdateCounter('update-counter', handleUpdateCounter);
  }, []);

  return (
    <div>
      <p className="p-2 m-4 font-bold">Hello darkness my old friend</p>
      <p>Counter: {counter}</p>
      <button className="p-2 m-4 border rounded" onClick={handleClick}>
        Print
      </button>
    </div>
  );
};

export default App;
