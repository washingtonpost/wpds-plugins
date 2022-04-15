import React, { useEffect } from "react";
import Main from "./Main";
import Layout from "../components/Layout";
import View from "../components/view";
import CommandCenter from "../Commands/command-center";

export default function App() {
	useEffect(() => {
		window.onmessage = (event) => {
			const { type, message } = event.data.pluginMessage;
			switch (type) {
				case "Error":
					return message;
					break;
				default:
					break;
			}
		};
	}, []);

	return (
		<Layout>
			<View data-name="Starting-View" active={true}>
				<Main />
			</View>
			{/* <button onClick={() => CommandCenter("create-color-tokens", null)} >Create Local Styles</button>
			<button onClick={() => CommandCenter("update-color-tokens", null)}>Update Local Styles</button> */}
		</Layout>
	);
}
