import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { Button } from "../components/button";
import Header from "../components/Headers";
import { StyledLink } from "../components/link";
import Paragraph from "../components/paragraph";
import Layout from "./layout";
import CommandCenter from "../Commands/command-center";

export default function UpdateLocalStyles() {
	const [ConfirmAction, setConfirmAction] = useState(false);
	const ChoiceContainer = styled("div", {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: "8px",
	});
	function HandleConfirm() {
		CommandCenter("update-color-tokens", null);
		setConfirmAction(false);
	}
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
			{ConfirmAction ? (
				<ChoiceContainer>
					<Button
						variant={"destructive"}
						onClick={() => setConfirmAction(false)}
					>
						Cancel
					</Button>
					<Button
						variant={"default"}
						css={{ width: "100%" }}
						onClick={HandleConfirm}
					>
						Confirm
					</Button>
				</ChoiceContainer>
			) : (
				<Button
					variant={"default"}
					onClick={() => setConfirmAction(!ConfirmAction)}
				>
					Sync color styles
				</Button>
			)}
		</Layout>
	);
}
