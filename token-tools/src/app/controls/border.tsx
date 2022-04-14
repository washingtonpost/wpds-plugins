import React from "react";
import Header from "../components/Headers";
import Paragraph from "../components/paragraph";
import Selector from "../components/selector";
import Layout from "./layout";

export default function Theme() {
	return (
		<Layout>
			<Header as="h2" css={{ gridColumn: "span 2" }}>
				Border Radius
			</Header>
			<Paragraph>
				Selecting a border radius token will apply the value to all
				corners.
			</Paragraph>
			<Selector
				useSearch
				state={"Default"}
				tokenPath={"radii"}
				command={"set-border-radius"}
			/>
		</Layout>
	);
}
