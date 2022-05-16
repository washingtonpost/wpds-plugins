import React, { useEffect, useState } from "react";
import Main from "./Main";
import Layout from "../components/Layout";
import View from "../components/view";
import Settings from "./Settings";

export default function App() {
	const [currentView, setCurrentView] = useState("main");

	useEffect(() => {
		window.onmessage = (event) => {
			const { type, message } = event.data.pluginMessage;
			switch (type) {
				case "Error":
					return message;
				case "exported-styled-ids":
					break;
				default:
					break;
			}
		};
	}, []);

	return (
		<>
			<Layout currentView={currentView} setCurrentView={setCurrentView}>
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
				</View>
			</Layout>
		</>
	);
}
