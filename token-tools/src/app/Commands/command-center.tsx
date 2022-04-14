import Tokens from "@washingtonpost/wpds-theme/src/wpds.tokens.json";
const BaseSizeToken = Tokens.baseSize.value;
export const BaseSize = parseFloat(
	BaseSizeToken.substring(0, BaseSizeToken.length - 2)
);

function CommandCenter(command, tokenName) {
	let _token;
	switch (command) {
		case "set-theme":
			parent.postMessage(
				{ pluginMessage: { type: "set-theme", token: tokenName } },
				"*"
			);
			break;
		case "set-border-radius":
			_token = LookUpToken("radii", tokenName);
			parent.postMessage(
				{
					pluginMessage: {
						type: "set-border-radius",
						token: _token.value,
					},
				},
				"*"
			);
			break;
		case "set-font-size":
			_token = LookUpToken("fontSize", tokenName);
			parent.postMessage(
				{
					pluginMessage: {
						type: "set-font-size",
						token: _token.value,
					},
				},
				"*"
			);
			break;
		case "set-line-height":
			_token = LookUpToken("lineHeight", tokenName);
			parent.postMessage(
				{
					pluginMessage: {
						type: "set-line-height",
						token: _token.value,
					},
				},
				"*"
			);
			break;
		default:
			break;
	}
}

export function LookUpToken(_tokenPath, _tokenName) {
	let _value = Tokens[_tokenPath][`${_tokenName}`].value;
	if (typeof _value === "string") {
		if (_value.substring(0, 1) == "{") {
			_value = FindReference(_value.substring(1, _value.length - 1));
		}
		if (_value.includes("rem")) {
			_value = _value.substring(0, _value.length - 3);
			_value = BaseSize * parseFloat(_value);
		}
	}
	return { name: _tokenName, value: _value };
}

export function FindReference(lookUpToken) {
	const path = lookUpToken.split(".");
	let value;
	switch (path.length) {
		case 1:
			value = Tokens[path[0]].value;
			break;
		case 2:
			value = Tokens[path[0]][path[1]].value;
			break;
		case 3:
			value = Tokens[path[0]][path[1]][path[2]].value;
			break;
		default:
			break;
	}
	return value;
}

export default CommandCenter;
