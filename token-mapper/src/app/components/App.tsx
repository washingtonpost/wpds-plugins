import React, { useEffect, useState } from "react";
// import Toggle from "./toggle";
import "../styles/ui.css";
// import tokenData from "../../wpds.tokens.json";

export default function App() {
  const [Mode, setMode] = useState(false);

  //Toggles theme
  function ToggleTheme(mode: boolean) {
    setMode(mode);
    parent.postMessage({ pluginMessage: { type: "toggle", mode: mode } }, "*");
  }
  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "Debug") {
        console.log(`Figma Says: ${message}`);
      }
      if (type === "Error") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <button
        className={`${Mode ? "active" : ""}`}
        onClick={() => ToggleTheme(!Mode)}
      >
        Change Mode
      </button>
      {/* <Toggle/> */}
    </div>
  );
}
