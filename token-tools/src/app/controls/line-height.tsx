import React from "react";
import Header from "../components/Headers";
import Paragraph from "../components/paragraph";
import Selector from "../components/selector";
import Layout from "./layout";

export default function Theme() {
	return (
		<Layout>
			<Header as="h2" css={{ gridColumn: "span 2" }}>
				Line Height
			</Header>
			<Paragraph>
				Selecting a line-height token will set the line-height as a
				equivalent percentage that is relative to the font-size.
			</Paragraph>
			<Selector
				useSearch
				state={"Default"}
				tokenPath={"lineHeight"}
				command={"set-line-height"}
			/>
		</Layout>
	);
}
