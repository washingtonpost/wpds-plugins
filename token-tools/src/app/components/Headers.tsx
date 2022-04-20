import { theme } from "@washingtonpost/wpds-ui-kit";
import { styled } from "@stitches/react";

const Header = styled("h1", {
	fontFamily: "sans-serif",
	marginBottom: 0,
	paddingBottom: 0,
	fontSize: theme.sizes[125],

	variants: {
		as: {
			h2: {
				fontSize: theme.sizes["087"],
				fontWeight: theme.fontWeights.bold,
			},
			h3: {
				fontSize: theme.sizes["075"],
				fontWeight: theme.fontWeights.bold,
			},
			h4: {
				fontSize: theme.sizes["087"],
				fontWeight: "normal",
			},
		},
	},
});

export default Header;
