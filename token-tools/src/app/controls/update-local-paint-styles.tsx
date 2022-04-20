import React from "react";
import Header from "../components/Headers";
import { StyledLink } from "../components/link";
import Paragraph from "../components/paragraph";
import Layout from "./layout";

export default function UpdateLocalStyles() {
	return (
		<Layout>
			<Header as="h2" css={{ gridColumn: "span 2" }}>
				Sync local color styles
			</Header>
			<Paragraph>
				Syncing will be update or create to match the color styles found
				in the{" "}
				<StyledLink
					target="_blank"
					href="https://build.washingtonpost.com/foundations/color"
				>
					WPDS color tokens
				</StyledLink>
				. It will not delete any color styles.
			</Paragraph>
		</Layout>
	);
}
