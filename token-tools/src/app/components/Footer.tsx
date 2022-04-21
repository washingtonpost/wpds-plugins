import React from "react";
import { styled } from "../../stitches.config";
import Settings from "@washingtonpost/wpds-assets/asset/settings";
import ArrowLeft from "@washingtonpost/wpds-assets/asset/arrow-left";
import { Icon } from "@washingtonpost/wpds-ui-kit";
import Header from "./Headers";
Icon;
export default function Footer({ setCurrentView, currentView }) {
	const Footer = styled("footer", {
		position: "absolute",
		bottom: 0,
		left: 0,
		height: "60px",
		width: "100%",
		display: "flex",
		alignItems: "center",
		boxShadow: "0px -2px 14px 0px rgba(0,0,0,0.15)",
	});
	const LeftCell = styled("div", {
		justifySelf: "flex-end",
		display: "flex",
		alignItems: "center",
		width: "100%",
		padding: "0px 16px",
	});
	const RightCell = styled("div", {
		justifySelf: "flex-end",
		display: "flex",
		alignItems: "center",
		justifyContent: "end",
		width: "100%",
		padding: "0px 16px",
	});
	const Button = styled("button", {
		backgroundColor: "transparent",
		borderStyle: "none",
		display: "flex",
		gap: "8px",
		borderRadius: "4px",
		alignItems: "center",
		justifyContent: "center",
		padding: "8px",
		transition: "background-color .25s",
		"&:hover": {
			backgroundColor: "$subtle",
		},
	});
	return (
		<Footer>
			<LeftCell>
				{currentView != "settings" ? (
					<Button onClick={() => setCurrentView("settings")}>
						{/* @ts-ignore */}
						<Icon size="100" label="settings">
							{/* @ts-ignore */}
							<Settings />
						</Icon>
						<Header css={{ padding: 0, margin: 0 }} as={"h4"}>
							Settings
						</Header>
					</Button>
				) : (
					<Button onClick={() => setCurrentView("main")}>
						{/* @ts-ignore */}
						<Icon size="100" label="settings">
							{/* @ts-ignore */}
							<ArrowLeft />
						</Icon>
						<Header css={{ padding: 0, margin: 0 }} as={"h4"}>
							Back
						</Header>
					</Button>
				)}
			</LeftCell>
			<RightCell></RightCell>
		</Footer>
	);
}
