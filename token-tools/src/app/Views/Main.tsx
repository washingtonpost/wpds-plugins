import React, { useState } from "react";
import { styled } from "@stitches/react";
import Header from "../components/Headers";
import { QuestionMarkCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import Paragraph from "../components/paragraph";
import ThemeControl from "../controls/theme";
import BorderControl from "../controls/border";
import FontSizeControl from "../controls/font-size";
import LineHeightControl from "../controls/line-height";

import Divider from "../components/divider";
import { StyledLink } from "../components/link";
export default function Main() {
	const [HelpShown, setHelpShown] = useState(false);
	const IconButton = styled(Popover.Trigger, {
		all: "unset",
		position: "absolute",
		top: 16,
		right: 16,
		fontFamily: "inherit",
		borderRadius: "100%",
		height: 32,
		width: 32,
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		color: "$primary",
		transition: "all .25s",
		variants: {
			Active: {
				true: {
					color: "white",
					backgroundColor: "#1F1F1F",
					border: "1px solid black",
					"&:hover": { backgroundColor: "#111111" },
				},
				false: {
					backgroundColor: "white",
					"&:hover": {
						backgroundColor: "$subtle",
					},
				},
			},
		},
	});
	const Content = styled(Popover.Content, {
		backgroundColor: "#1F1F1F",
		color: "white",
		width: 260,
		cursor: "intial",
		padding: "16px",
		borderRadius: "4px",
		overflow: "hidden",
		border: "1px solid #666666",
		boxShadow: "0px 2px 4px 0px rgba(0,0,0,.15)",
	});
	return (
		<>
			<Header>Token Tools</Header>
			<Popover.Root onOpenChange={() => setHelpShown(!HelpShown)}>
				<IconButton Active={HelpShown ? "true" : "false"}>
					{HelpShown ? <Cross2Icon /> : <QuestionMarkCircledIcon />}
				</IconButton>
				<Content sideOffset={5}>
					<Paragraph css={{ color: "white", cursor: "default" }}>
						Select 1 or more elements on the figma canvas to edit
						the token property. Please keep in mind the more
						elements that are selected the longer it will take to
						apply the token. For more information please{" "}
						<StyledLink
							target="_blank"
							href="https://build.washingtonpost.com/resources/guides/figma-guide#Using%20our%20tokens"
						>
							read our guide
						</StyledLink>
						.
					</Paragraph>
				</Content>
			</Popover.Root>
			<ThemeControl />
			<Divider />
			<BorderControl />
			<Divider />
			<FontSizeControl />
			<Divider />
			<LineHeightControl />
			<Divider />

			{/* <Header as="h2">
        Design lint
      </Header>
      <Paragraph css={{ marginTop: "8px", marginBottom: "$100" }}>
        🚧 Feature coming soon.
      </Paragraph> */}
		</>
	);
}
