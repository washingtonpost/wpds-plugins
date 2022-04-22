import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { Button } from "../components/button";
import Header from "../components/Headers";
import { StyledLink } from "../components/link";
import Paragraph from "../components/paragraph";
import Layout from "./layout";
import CommandCenter from "../Commands/command-center";

export default function ExportStyleIDs({ exportedData }) {
	const [ConfirmAction, setConfirmAction] = useState("default");
	const ChoiceContainer = styled("div", {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: "8px",
	});
	const TextArea = styled("div", {
		gridColumn: "1 / span 2",
		fontFamily: "sans-serif",
		marginTop: "4px",
		resize: "none",
		padding: "8px",
		fontSize: "11px",
		border: "solid 1px $subtle",
		borderRadius: "4px",
		height: 190,
		width: "100%",
		overflowY: "auto",
		overflowX: "hidden",
		whiteSpace: "pre-wrap",
	});
	function HandleConfirm() {
		CommandCenter("export-local-color-tokens", null);
		setConfirmAction("copy");
	}

	function CopyToClipBoard() {
		try {
			navigator.clipboard.writeText(exportedData);
		} catch (error) {}
	}
	return (
		<>
			<Layout>
				<Header as="h2" css={{ gridColumn: "span 2" }}>
					Export Local Color style IDs
				</Header>
				<Paragraph>
					Figma requires all style ids to be hard coded{" "}
					<StyledLink
						target="_blank"
						href="https://www.figma.com/plugin-docs/api/figma/#team-library"
					>
						Read more here.
					</StyledLink>{" "}
					After exporting you will need to update the
					localPaintStyleIDs.json file found and publish the plugin
					with the new values you paste in.
				</Paragraph>
				{ConfirmAction == "submit" && (
					<ChoiceContainer>
						<Button
							variant={"destructive"}
							onClick={() => setConfirmAction("default")}
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
				)}
				{ConfirmAction == "default" && (
					<Button
						variant={"default"}
						onClick={() => setConfirmAction("submit")}
					>
						Export color styles
					</Button>
				)}
				{ConfirmAction == "copy" && (
					<Button variant={"default"} onClick={() => CopyToClipBoard}>
						Copy To Clipboard
					</Button>
				)}
				<TextArea>
					{exportedData
						? exportedData
						: "Exported Data will appear here"}
				</TextArea>
			</Layout>
		</>
	);
}
