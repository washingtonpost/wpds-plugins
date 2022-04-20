import React from "react";
import { theme } from "@washingtonpost/wpds-ui-kit";
import { styled } from "../../stitches.config";
import Footer from "./Footer";
export default function Layout({ children, setCurrentView }) {
	const Grid = styled("div", {
		display: "flex",
		flexDirection: "column",
		padding: theme.space["025"],
	});

	return (
		<>
			<Grid>{children}</Grid>
			<Footer setCurrentView={setCurrentView} />
		</>
	);
}
