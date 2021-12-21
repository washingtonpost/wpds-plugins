import React, { useEffect } from "react";
// import Toggle from "./toggle";
import "../styles/ui.css";
import tokenData from "../../wpds.tokens.json";
import Section from "./section";
import { Divider } from "./divider";
import { theme } from "../../stitches.config";
const Base = parseFloat(tokenData.baseSize.value);
const ThemeSwitchTokens = {
  light: {
    value: true,
  },
  dark: {
    value: false,
  },
};

export default function App() {
  function SetThemeInFigma(type: string, value: boolean) {
    console.log("Setting value to " + value);
    parent.postMessage({ pluginMessage: { type, token: value } }, "*");
  }
  function SetValueInFigma(type: string, value: string) {
    value = processString(value);
    console.log("Setting value to " + value);
    parent.postMessage({ pluginMessage: { type, token: value } }, "*");
  }
  function SetDirectValue(type: string, value: number) {
    console.log("Setting value to " + value);
    parent.postMessage({ pluginMessage: { type, token: value } }, "*");
  }

  function processString(value) {
    value = value as string;
    if (value[0] == "{") {
      value = value.substring(1, value.length - 1);
      value = lookupValue(value);
    }
    if (value.includes("px")) {
      value = value.substring(0, value.length - 2);
      console.log(value);
    }
    if (value.includes("rem")) {
      value = parseFloat(value.substring(0, value.length - 3));
      value = Base * value;
      return value;
    } else {
      return parseFloat(value);
    }
  }
  /** Looks up the value of a token alias path depth supported up to 3 token[1][2][3]*/
  function lookupValue(lookUpToken) {
    const path = lookUpToken.split(".");
    let value;
    switch (path.length) {
      case 1:
        value = tokenData[path[0]].value;
        break;
      case 2:
        value = tokenData[path[0]][path[1]].value;
        break;
      case 3:
        value = tokenData[path[0]][path[1]][path[2]].value;
        break;
      default:
        break;
    }
    return value;
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
    <>
      <Section
        title="Theme"
        tokens={ThemeSwitchTokens}
        command="theme-toggle"
        setInFigma={SetThemeInFigma}
      >
        Selecting dark or light will change all of the colors on the page to
        correct context.
      </Section>
      <Divider css={{ margin: `${theme.space[100]} 0` }} />
      <Section
        title="Border radius"
        tokens={tokenData.radii}
        command="set-border-radius"
        setInFigma={SetValueInFigma}
      >
        Selecting a border radius token will apply the value to all corners.
      </Section>
      <Divider css={{ margin: `${theme.space[100]} 0` }} />
      <Section
        title="Font size"
        tokens={tokenData.fontSize}
        command="set-font-size"
        setInFigma={SetValueInFigma}
      >
        Selecting a border radius token will apply the value to all corners.
      </Section>
      <Divider css={{ margin: `${theme.space[100]} 0` }} />
      <Section
        title="Line Height"
        tokens={tokenData.lineHeight}
        command="set-line-height"
        setInFigma={SetDirectValue}
      >
        Selecting a border radius token will apply the value to all corners.
      </Section>
    </>
  );
}
