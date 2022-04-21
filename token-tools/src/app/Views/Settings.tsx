import React from "react";
import Header from "../components/Headers";
import Divider from "../components/divider";
import UpdateLocalStyles from "../controls/update-local-paint-styles";
import CreateLocalStyles from "../controls/create-local-paint-styles";

export default function Main() {
	return (
		<>
			<Header>Plugin Settings</Header>
			<UpdateLocalStyles />
			<Divider />
			<CreateLocalStyles />
			<Divider />
		</>
	);
}
