import { styled } from "../../stitches.config";

export const StyledLink = styled("a", {
	textDecoration: "underline",
	color: "currentColor",
	transition: "all .25s",
	"&:hover": {
		textDecoration: "none",
		opacity: 0.75,
	},
});
