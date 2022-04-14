import React, { useEffect } from "react";
import Main from "./Main";
import Layout from "../components/Layout";
import View from "../components/view";

export default function App() {
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
    </Layout>
  );
}
