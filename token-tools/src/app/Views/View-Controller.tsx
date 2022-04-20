import React, { useEffect, useState } from "react";
import Main from "./Main";
import Layout from "../components/Layout";
import View from "../components/view";
import CommandCenter from "../Commands/command-center";
import Settings from "./Settings";
export default function App() {
	const [currentView, setCurrentView] = useState("main");

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
		<Layout setCurrentView={setCurrentView}>
			<View
				data-name="Starting-View"
				active={currentView == "main" ? true : false}
			>
				<Main />
			</View>
			<View
				data-name="Settings-View"
				active={currentView == "settings" ? true : false}
			>
				<Settings />
				<button onClick={() => setCurrentView("main")}>go back</button>
			</View>
			<button onClick={() => CommandCenter("create-color-tokens", null)}>
				Create Local Styles
			</button>
			<button onClick={() => CommandCenter("update-color-tokens", null)}>
				Update Local Styles
			</button>
		</Layout>
	);
}
