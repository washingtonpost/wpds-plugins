import React, { useState } from "react";
import { styled } from "../../stitches.config";
import CommandCenter from "../Commands/command-center";
import Button from "../components/button";
import Header from "../components/Headers";
import { StyledLink } from "../components/link";
import Paragraph from "../components/paragraph";
import Layout from "./layout";

export default function CreateLocalStyles() {
	const [ConfirmAction, setConfirmAction] = useState(false);
	const ChoiceContainer = styled("div", {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: "8px",
	});

	function HandleConfirm() {
		CommandCenter("create-color-tokens", null);
		setConfirmAction(false);
	}
	return (
		<Layout>
			<Header as="h2" css={{ gridColumn: "span 2" }}>
				Generate WPDS color tokens
			</Header>
			<Paragraph>
				By selecting generate tokens all of the tokens found in{" "}
				<StyledLink
					target="_blank"
					href="https://build.washingtonpost.com/foundations/color"
				>
					WPDS color tokens
				</StyledLink>
				{` `} will be generated as a color style. Use update token if
				you do not want create all tokens.
			</Paragraph>
			{ConfirmAction ? (
				<ChoiceContainer>
					<Button
						variant="destructive"
						onClick={() => setConfirmAction(false)}
					>
						Cancel
					</Button>
					<Button
						variant="default"
						css={{ width: "100%" }}
						onClick={HandleConfirm}
					>
						Confirm
					</Button>
				</ChoiceContainer>
			) : (
				<Button
					variant="default"
					onClick={() => setConfirmAction(!ConfirmAction)}
				>
					Generate Tokens
				</Button>
			)}
		</Layout>
	);
}
