import { theme } from "@washingtonpost/wpds-ui-kit";
import { styled } from "@stitches/react";

const Header = styled("h1", {
  fontFamily: "sans-serif",
  marginBottom: 0,
  paddingBottom: 0,
  fontSize: theme.sizes[150],
  fontWeight: theme.fontWeights.bold,
  variants: {
    as: {
      h2: {
        fontSize: theme.sizes[100],
      },
      h3: {
        fontSize: theme.sizes["075"],
      },
    },
  },
});

export default Header;
