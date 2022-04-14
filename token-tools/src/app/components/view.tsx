import { styled } from "@stitches/react";
import React from "react";

export default function View({ active, children }) {
	const View = styled("section", {
		display: `${active ? "block" : "none"}`,
	});
	return <View>{children}</View>;
}
