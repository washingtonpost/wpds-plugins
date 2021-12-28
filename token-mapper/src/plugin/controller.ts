import tokenData from "../wpds.tokens.json";

figma.showUI(__html__, { width: 365, height: 634 });

//Enables and disable map buttons
figma.on("selectionchange", async () => {
  if (figma.currentPage.selection.length === 0) {
    return;
  } else {
  }
});

//Handles input from plugin interface
figma.ui.onmessage = async (msg) => {
  let nodes;

  //if the user selected something
  if (figma.currentPage.selection.length > 0) {
    nodes = figma.currentPage.selection;
  }
  //if the user did not select but there are elements on the page
  else if (
    figma.currentPage.children &&
    figma.currentPage.selection.length == 0
  ) {
    nodes = figma.currentPage.children;
  }
  //if nothing please notify the user to make a selection
  else {
    figma.notify("🙏  Please make a selection");
    return; //Stop the plugin
  }

  switch (msg.type) {
    case "toggle":
      ToggleTheme(nodes, msg.mode);
      break;
    case "set-font-size":
      SetFontSize(nodes, msg.token);
      break;
    case "set-line-height":
      SetLineHeight(nodes, msg.token);
      break;
    case "set-border-radius":
      SetBorderRadius(nodes, msg.token);
    default:
      break;
  }
};

//set font size
function SetFontSize(nodes, token) {
  try {
    nodes.forEach(async (child) => {
      const node: TextNode = child as TextNode;
      if (child.type === "TEXT") {
        if (node.fontSize != figma.mixed && node.fontName != figma.mixed) {
          await figma.loadFontAsync(node.fontName);
          node.fontSize = token;
          SendMessage(`Font size Set to ${token}`);
        } else {
          figma.notify(
            "⚠️ 1 or more element had mixed font styles and was not changed."
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
    figma.notify(
      "⛔️ Error occured 1 or more items is not a Text item. Please Try Again "
    );
  }
}
//set font size
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
          node.lineHeight = { unit: "PIXELS", value: token * node.fontSize };
          SendMessage(`Font size Set to ${token}`);
        } else {
          figma.notify(
            "⚠️ One or more items have mixed font styles and was not set"
          );
        }
      } else {
        throw Error;
      }
    });
  } catch (error) {
    figma.notify(
      "⛔️ Error occured 1 or more items is not a Text item. Please Try Again "
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
        SendMessage(`Border Set to ${token}`);
      } else {
        success = true;
        figma.notify("🧐 This element has multiple radius and was not set");
      }
    }
  });
  if (!success)
    figma.notify("🙏 Please select a Rectangle or a Frame and tying again");
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
      let styleSub = style.split(",")[0];
      let styleID = styleSub;
      SendMessage(styleID);
      if (styleID) {
        const currentStyle: BaseStyle = await figma.importStyleByKeyAsync(
          styleID
        ); //fetch current style
        if (currentStyle) {
          let currentStyleName = currentStyle.name; //get current style name
          let tokenName = currentStyleName.split("/")[1]; //split name from dark/ or light/

          //if dark mode look in light colors if light look in dark
          const _matchingStyles = mode
            ? tokenData["color"]["light"]
            : tokenData["color"]["dark"];

          //Look for matching style based on matching style id
          const _matchingStyleID = _matchingStyles[tokenName].split(":")[1];
          const _matchedStyle: BaseStyle = await figma.importStyleByKeyAsync(
            _matchingStyleID
          );
          if (_matchedStyle) {
            node.fillStyleId = _matchedStyle.id;
          }
        }
      }
    }
    if (node.strokeStyleId) {
      let styleID = node.strokeStyleId.split(":")[1];

      SendMessage(styleID);
      if (styleID) {
        const currentStyle: BaseStyle = await figma.importStyleByKeyAsync(
          styleID
        ); //fetch current style
        if (currentStyle) {
          let currentStyleName = currentStyle.name; //get current style name
          let tokenName = currentStyleName.split("/")[1]; //split name from dark/ or light/

          //if dark mode look in light colors if light look in dark
          const _matchingStyles = mode
            ? tokenData["color"]["light"]
            : tokenData["color"]["dark"];

          //Look for matching style based on matching style id
          const _matchingStyleID = _matchingStyles[tokenName].split(":")[1];
          const _matchedStyle: BaseStyle = await figma.importStyleByKeyAsync(
            _matchingStyleID
          );
          if (_matchedStyle) {
            node.strokeStyleId = _matchedStyle.id;
          }
        }
      }
    }
  }
}

//@ts-ignore
function SendError(Error: String) {
  var message = {
    type: "Error",
    message: Error,
  };
  figma.ui.postMessage(message);
}

function SendMessage(Error: String) {
  var message = {
    type: "Debug",
    message: Error,
  };
  figma.ui.postMessage(message);
}

/**
 * Below will console log the local color IDs needed to be added to wpds.tokens.json.
 * Figma requires you hard code the color ids. The format of color IDs use S:[uid] this is needed
 * when replacing the tokens in wpds.tokens.json.
 */

BuildTheme();
// build theme
function BuildTheme() {
  let collectedStyleDataLight = [];
  let collectedStyleDataDark = [];
  var colorStyles = figma.getLocalPaintStyles();
  if (colorStyles) {
    colorStyles.forEach(function (color) {
      let name = styleName(color.name);
      let key = color.key;
      if (name && key) {
        if (themeName(color.name).includes("light")) {
          collectedStyleDataLight.push({ [name]: `S:${key}` });
        } else if (themeName(color.name).includes("dark")) {
          collectedStyleDataDark.push({ [name]: `S:${key}` });
        }
      } else {
        figma.notify("Error adding theme");
        throw new Error("Error adding theme");
      }
    });
    SendMessage("Light Color Ids:" + JSON.stringify(collectedStyleDataLight));
    SendMessage("Dark Color Ids:" + JSON.stringify(collectedStyleDataDark));
  } else {
    figma.notify("There are no color styles in the document");
  }
}
// For building out theme
function themeName(name) {
  if (name.includes("/")) {
    var prefix = name.split("/");
    return prefix[0];
  } else {
    figma.notify("Styles names must be prefixed. Ex: themeName/colorName");
  }
}
//for building out style name
function styleName(name) {
  if (name.includes("/")) {
    var styleName_1 = name.split("/").slice(1).join(".");
    return styleName_1;
  } else {
    figma.notify("Styles names must be prefixed. Ex: themeName/colorName");
  }
}
