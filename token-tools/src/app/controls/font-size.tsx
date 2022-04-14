import React from "react";
import Header from "../components/Headers";
import Paragraph from "../components/paragraph";
import Selector from "../components/selector";
import Layout from "./layout";

export default function Theme() {
	return (
		<Layout>
			<Header as="h2" css={{ gridColumn: "span 2" }}>
				Font size
			</Header>
			<Paragraph>
				Selecting a font-size token will set the font-size in pixel of
				the selected text element(s).
			</Paragraph>
			<Selector
				useSearch
				state={"Default"}
				tokenPath={"fontSize"}
				command={"set-font-size"}
			/>
		</Layout>
	);
}
