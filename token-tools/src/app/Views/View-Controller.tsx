import React, { useEffect } from "react";
import Main from "./Main";
import Layout from "../components/Layout";
import View from "../components/view";

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
		</Layout>
	);
}
