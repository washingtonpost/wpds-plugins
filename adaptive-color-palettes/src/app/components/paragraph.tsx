import { theme } from "@washingtonpost/wpds-ui-kit";
import { styled } from "../../stitches.config";

const Paragraph = styled("p", {
	fontFamily: "sans-serif",
	marginTop: "0px",
	marginBottom: "0px",
	fontSize: theme.sizes["075"],
	fontWeight: theme.fontWeights.light,
	lineHeight: theme.lineHeights[125],
	color: theme.colors.accessible,
	variants: {
		as: {
			meta: {
				fontSize: theme.sizes["087"],
			},
		},
	},
});

export default Paragraph;
