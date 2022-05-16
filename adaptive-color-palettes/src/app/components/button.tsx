import { styled } from "@stitches/react";
import { theme } from "../../stitches.config";
export const Button = styled("button", {
	width: 120,
	height: 30,
	borderStyle: "solid",
	borderColor: theme.colors.primary,
	borderRadius: 6,
	borderWidth: 1,
	backgroundColor: "transparent",
	fontSize: 11,
	fontWeight: "normal",
	transition: "background-color .25s",
	variants: {
		variant: {
			default: {
				"&:hover": {
					backgroundColor: theme.colors.subtle,
				},
			},
			destructive: {
				background: theme.colors.error,
				color: "white",
				borderColor: "transparent",
				width: "100%",
				"&:hover": {
					opacity: 0.75,
				},
			},
		},
	},
});
