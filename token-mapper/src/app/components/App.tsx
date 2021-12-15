import React, { useEffect, useState } from "react";
// import Toggle from "./toggle";
import "../styles/ui.css";
import Button from "./buttonPop";
import PopOverSearch from "./popOverSearch";
// import tokenData from "../../wpds.tokens.json";

export default function App() {
  const [Active, setActive] = useState(false);

  // function ToggleTheme(mode: boolean) {
  //   parent.postMessage({ pluginMessage: { type: "toggle", mode: mode } }, "*");
  // }
  // function SetBorderRadius(token: number) {
  //   parent.postMessage(
  //     { pluginMessage: { type: "set-border-radius", token: token } },
  //     "*"
  //   );
  // }
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
    <div style={{ position: "relative" }}>
      <Button onClick={() => setActive(true)}>Mixed</Button>
      <PopOverSearch setActive={setActive} isActive={Active} title="Title" />
    </div>
  );
}
