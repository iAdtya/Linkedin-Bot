// App.tsx
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [count, setCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMessage = (message: any) => {
      console.log("Received message:", message);

      if (message.action === "connectionSent" && isRunning) {
        setCount((prev) => prev + 1);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setCount(0); 
      chrome.runtime.sendMessage({ action: "start" });
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (countRef.current) {
      clearTimeout(countRef.current);
    }
    chrome.runtime.sendMessage({ action: "stop" });
  };

  // Format number to always show two digits
  const formatCount = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <>
      <div className="container">
        <h1>LinkedIn Auto Connector</h1>
        <div id="countdown-root" className="relative">
          <div
            className="absolute flex items-center justify-center text-4xl font-bold"
            style={{
              color: "#4caf50",
              zIndex: 4,
              fontSize: "10rem",
            }}
          >
            {formatCount(count)}
          </div>
        </div>
        <div className="buttons">
          <button className="start" onClick={handleStart} disabled={isRunning}>
            Start
          </button>
          <button className="stop" onClick={handleStop} disabled={!isRunning}>
            Stop
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
