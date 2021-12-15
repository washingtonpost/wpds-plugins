import { styled } from "@stitches/react";

export const Title = styled("h1", {
  fontFamily: "inter",
  fontSize: "24px",
  margin: 0,
  padding: 0,
  color: "#666666",
  fontWeight: "bold",
  variants: {
    as: {
      h2: {
        fontSize: 12,
        fontWeight: "bold",
      },
      h3: {
        fontSize: 11,
        fontWeight: "normal",
      },
    },
  },
});
