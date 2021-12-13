import React, { useEffect } from "react";
// import Toggle from "./toggle";
import "../styles/ui.css";
// import tokenData from "../../wpds.tokens.json";

export default function App() {
  //Toggles theme
  function ToggleTheme(mode: boolean) {
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
    <div className="grid">
      <button onClick={() => ToggleTheme(true)}>Light Mode</button>
      <button onClick={() => ToggleTheme(false)}>Dark Mode</button>
      <hr className="span-2" />
    </div>
  );
}
