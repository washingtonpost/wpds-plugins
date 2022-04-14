import React from "react";
import { styled } from "../../stitches.config";

export default function Footer() {
	const Footer = styled("footer", {
		position: "absolute",
		bottom: 0,
		left: 0,
		height: "60px",
		width: "100%",
		display: "flex",
		alignItems: "center",
		boxShadow: "0px -2px 14px 0px rgba(0,0,0,0.15)",
	});
	const LeftCell = styled("div", {
		width: "100%",
		padding: "0px 16px",
	});
	const RightCell = styled("div", {
		justifySelf: "flex-end",
		width: "100%",
		padding: "0px 16px",
	});
	return (
		<Footer>
			<LeftCell>Left</LeftCell>
			<RightCell>Right</RightCell>
		</Footer>
	);
}
