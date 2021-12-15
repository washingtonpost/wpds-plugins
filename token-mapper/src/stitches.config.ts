import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: "#111111",
      subtle: "#F0F0F0",
      accessible: "#666666",
      blue: "#18A0FB",
    },
    space: {
      50: "8px",
      100: "16px",
      200: "32px",
    },
    shadows: {
      popOver: "0px 4px 8px 0px rgba(102, 102, 102, 0.25)",
    },
  },
});
