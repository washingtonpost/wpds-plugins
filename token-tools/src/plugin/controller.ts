import Tokens from "@washingtonpost/wpds-theme/src/wpds.tokens.json";

//Initialize Plugin
figma.showUI(__html__, { width: 380, height: 700 });

//Display Project name
GetProjectInfo();

//Enables and disable map buttons
figma.on("selectionchange", async () => {
	if (figma.currentPage.selection.length === 0) {
		return;
	} else {
		let nodes = SelectNodes(false);
		nodes.forEach((node: FrameNode) => {
			if (node.fills) {
				console.log(node.fills[0]);
			}
		});
		// InspectElements(nodes);
	}
});

//Handles input from plugin interface
figma.ui.onmessage = async (msg) => {
	let nodes;
	switch (msg.type) {
		case "set-theme":
			nodes = SelectNodes(false);
			ToggleTheme(nodes, msg.token);
			break;
		case "set-font-size":
			nodes = SelectNodes(false);
			SetFontSize(nodes, msg.token);
			break;
		case "set-line-height":
			nodes = SelectNodes(false);
			SetLineHeight(nodes, msg.token);
			break;
		case "set-border-radius":
			nodes = SelectNodes(false);
			SetBorderRadius(nodes, msg.token);
		default:
			break;
	}
};

function SelectNodes(EnablePageSelection: boolean) {
	//if the user selected something
	if (figma.currentPage.selection.length > 0) {
		return figma.currentPage.selection;
	}
	//if the user did not select but there are elements on the page and page
	//selection is allowed
	else if (
		figma.currentPage.children &&
		figma.currentPage.selection.length == 0 &&
		EnablePageSelection
	) {
		return figma.currentPage.children;
	}
	//if nothing please notify the user to make a selection
	else {
		Notify("🙏  Please make a selection", false);
		return null; //Stop the plugin
	}
}

//set font size
function SetFontSize(nodes, token) {
	try {
		nodes.forEach(async (child) => {
			if (child.type === "TEXT") {
				const node: TextNode = child as TextNode;
				if (
					node.fontSize != figma.mixed &&
					node.fontName != figma.mixed
				) {
					await figma.loadFontAsync(node.fontName);
					node.fontSize = token;
				} else {
					Notify(
						"⚠️ 1 or more element had mixed font styles and was not changed.",
						false
					);
					// const fonts = child.getRangeAllFontNames(0, node.characters.length);
					// for (const font of fonts) {
					//   await figma.loadFontAsync(font);
					// }
				}
			} else {
				throw Error;
			}
		});
	} catch (error) {
		Notify(
			"⛔️ Error occured 1 or more items is not a Text item. Please Try Again ",
			true
		);
	}
}
//set Line height
function SetLineHeight(nodes, token) {
	try {
		nodes.forEach(async (child) => {
			if (child.type === "TEXT") {
				const node: TextNode = child as TextNode;
				if (
					node.lineHeight != figma.mixed &&
					node.fontSize != figma.mixed &&
					node.fontName != figma.mixed
				) {
					await figma.loadFontAsync(node.fontName);
					node.lineHeight = { unit: "PERCENT", value: token * 100 };
				} else {
					Notify(
						"⚠️ One or more items have mixed font styles and was not set",
						false
					);
				}
			} else {
				throw Error;
			}
		});
	} catch (error) {
		Notify(
			"⛔️ Error occured 1 or more items is not a Text item. Please Try Again ",
			true
		);
	}
}

//Sets border radius
function SetBorderRadius(nodes, token) {
	let success = false;
	nodes.forEach((child) => {
		if (child.type === "FRAME" || "RECTANGLE") {
			const node: FrameNode = child as FrameNode;
			if (node.cornerRadius !== figma.mixed) {
				node.cornerRadius = token;
				success = true;
			} else {
				success = true;
				figma.notify(
					"🧐 This element has multiple radius and was not set"
				);
			}
		}
	});
	if (!success)
		Notify(
			"🙏 Please select a Rectangle or a Frame and tying again",
			false
		);
}

//Toggles the theme by cycling through the nodes
function ToggleTheme(nodes, mode: boolean) {
	nodes.forEach((node) => {
		applyColor(node, mode);
	});
}

//Applies color according to the type
async function applyColor(node, mode) {
	//iterate through children if the node has them
	if (node.children) {
		node.children.forEach((child) => {
			applyColor(child, mode);
		});
	}

	//check to see if fillstyle or strokestyle can be applied
	if (
		node.type === "COMPONENT" ||
		"INSTANCE" ||
		"FRAME" ||
		"GROUP" ||
		"ELLIPSE" ||
		"POLYGON" ||
		"RECTANGLE" ||
		"STAR" ||
		"LINE" ||
		"TEXT" ||
		"VECTOR" ||
		"INSTANCE"
	) {
		if (node.fillStyleId) {
			let style = node.fillStyleId.split(":")[1];
			let styleID;
			if (style.includes(",")) {
				let styleSub = style.split(",")[0];
				styleID = styleSub;
			} else {
				styleID = style;
			}

			if (styleID) {
				const currentStyle: BaseStyle =
					await figma.importStyleByKeyAsync(styleID); //fetch current style
				if (currentStyle) {
					let currentStyleName = currentStyle.name; //get current style name
					let tokenName = currentStyleName.split("/")[1]; //TODO set to capture last word in sequence

					//if dark mode look in light colors if light look in dark
					const _matchingStyles = mode
						? Tokens["color"]["light"]
						: Tokens["color"]["dark"];

					//Look for matching style based on matching style id
					const _matchingStyleID =
						_matchingStyles[tokenName].split(":")[1];
					const _matchedStyle: BaseStyle =
						await figma.importStyleByKeyAsync(_matchingStyleID);
					if (_matchedStyle) {
						node.fillStyleId = _matchedStyle.id;
					} else {
					}
				}
			}
		}
		if (node.strokeStyleId) {
			let style = node.strokeStyleId.split(":")[1];
			let styleID;
			if (style.includes(",")) {
				let styleSub = style.split(",")[0];
				styleID = styleSub;
			} else {
				styleID = style;
			}

			if (styleID) {
				const currentStyle: BaseStyle =
					await figma.importStyleByKeyAsync(styleID);
				//fetch current style
				if (currentStyle) {
					let currentStyleName = currentStyle.name; //get current style name
					let tokenName = currentStyleName.split("/")[1]; //split name from dark/ or light/

					//if dark mode look in light colors if light look in dark
					const _matchingStyles = mode
						? Tokens["color"]["light"]
						: Tokens["color"]["dark"];

					//Look for matching style based on matching style id
					let _matchingStyleID =
						_matchingStyles[tokenName].split(":")[1];

					const _matchedStyle: BaseStyle =
						await figma.importStyleByKeyAsync(_matchingStyleID);
					if (_matchedStyle) {
						node.strokeStyleId = _matchedStyle.id;
					} else {
					}
				}
			}
		}
	}
}

function Notify(Message: String, Error: boolean) {
	//@ts-ignore
	const Options: NotificationOptions = { error: Error };
	figma.notify(`${Message}`, Options);
}

function GetProjectInfo() {
	var message = {
		type: "ProjectInfo",
		message: figma.currentPage.name,
	};
	figma.ui.postMessage(message);
}

//Retrieve local Styles for reference
ExportLocalColorStyles();

function ExportLocalColorStyles() {
	let Formatted_LocalColorStyles = {};
	var LocalColorStyles = figma.getLocalPaintStyles();
	if (!LocalColorStyles) {
		Notify("🚨 No local color styles found", true);
		return;
	}
	LocalColorStyles.forEach((style) => {
		if (!style.id) return;
		Formatted_LocalColorStyles[style.id] = style;
	});
}

//Retrieve local Styles for reference
// ImportColorTokens();

function ImportColorTokens() {
	var TokenColors = Tokens["color"];
	if (!TokenColors) {
		Notify("🚨 No Colors tokens found", true);
		return;
	}
	for (var ColorGroup in TokenColors) {
		for (var tokenName in TokenColors[ColorGroup]) {
			const Token = TokenColors[ColorGroup][tokenName];
			if (Token.hasOwnProperty("value")) {
				let Value = Token.value;
				if (Value.substring(0, 1).includes("{")) {
					const reference = Value.substring(1, Value.length - 1);
					Value = FindReference(reference);
					console.log(Value);
				}

				const RGB = GetRGB(Value);
				const Paint: SolidPaint = {
					type: "SOLID",
					blendMode: "NORMAL",
					color: RGB,
					opacity: 1,
				};
				//@ts-ignore
				const NewPaintStyle: PaintStyle = {
					type: `PAINT`,
					name: `${ColorGroup}/${tokenName}`,
					paints: [Paint],
					id: tokenName,
					description: Token.description,
					key: `${ColorGroup}/${tokenName}`,
				};
				const style = figma.createPaintStyle();
				style.name = `${ColorGroup}/${tokenName}`;
				style.paints = [Paint];
			}
		}
	}
}

function FindReference(alias) {
	if (alias.includes("-static")) {
		console.log(Tokens.color.static[alias].value);
		return Tokens.color.static[alias].value;
	} else {
		console.log(Tokens.color.light[alias].value);
		return Tokens.color.light[alias].value;
	}
}
function GetRGB(rgba) {
	if (rgba.substring(0, 4).includes("rgba")) {
		const formatString = rgba
			.substring(0, rgba.length - 1)
			.split("rgba(")[1];
		const Values = formatString.split(",");

		return {
			b: parseFloat(Values[2]) / 255,
			g: parseFloat(Values[1]) / 255,
			r: parseFloat(Values[0]) / 255,
		};
	}
}
