import React from "react";
import { styled } from "../../stitches.config";
export default function layout({ children }) {
	const Grid = styled("div", {
		display: "grid",
		gridTemplateColumns: "1fr 120px",
		gap: "8px",
	});
	return <Grid>{children}</Grid>;
}
