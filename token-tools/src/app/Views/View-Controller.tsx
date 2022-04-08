import React, { useEffect } from "react";
import Tokens from "@washingtonpost/wpds-theme/src/wpds.tokens.json";
import Main from "./Main";
import Layout from "../components/Layout";
import View from "../components/view";
// const Base = parseFloat(tokenData.baseSize.value);

export default function App() {
  // function SetThemeInFigma(type: string, value: boolean) {
  //   console.log("Setting value to " + value);
  //   parent.postMessage({ pluginMessage: { type, token: value } }, "*");
  // }
  // function SetValueInFigma(type: string, value: string) {
  //   value = processString(value);
  //   console.log("Setting value to " + value);
  //   parent.postMessage({ pluginMessage: { type, token: value } }, "*");
  // }
  // function SetDirectValue(type: string, value: number) {
  //   console.log("Setting value to " + value);
  //   parent.postMessage({ pluginMessage: { type, token: value } }, "*");
  // }

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      switch (type) {
        case "Error":
          break;
        default:
          break;
      }
      if (type === "Debug") {
        console.log(`Figma Says: ${message}`);
      }
      if (type === "Error") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <Layout>
      <View data-name="Starting-View" active={true}>
        <Main />
      </View>

      {Tokens.baseSize.value}
    </Layout>
  );
}
