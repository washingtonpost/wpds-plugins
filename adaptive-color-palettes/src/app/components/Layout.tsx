import React from "react";
import { theme } from "@washingtonpost/wpds-ui-kit";
import { styled } from "../../stitches.config";
import Footer from "./Footer";
export default function Layout({ children, setCurrentView, currentView }) {
	const Grid = styled("div", {
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		padding: theme.space["025"],
	});

	return (
		<>
			<Grid>{children}</Grid>
			<Footer currentView={currentView} setCurrentView={setCurrentView} />
		</>
	);
}
