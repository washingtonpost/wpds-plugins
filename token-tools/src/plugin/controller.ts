import tokenData from "../wpds.tokens.json";

//Initialize Plugin
figma.showUI(__html__, { width: 380, height: 700 });

//Display Project name
GetProjectInfo();

//Enables and disable map buttons
figma.on("selectionchange", async () => {
  if (figma.currentPage.selection.length === 0) {
    return;
  } else {
    // let nodes = SelectNodes(false);
    // InspectElements(nodes);
  }
});

//Handles input from plugin interface
figma.ui.onmessage = async (msg) => {
  let nodes;
  console.log(msg);
  switch (msg.type) {
    case "set-theme":
      nodes = SelectNodes(true);
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
    figma.notify("🙏  Please make a selection");
    return null; //Stop the plugin
  }
}

//set font size
function SetFontSize(nodes, token) {
  try {
    nodes.forEach(async (child) => {
      if (child.type === "TEXT") {
        const node: TextNode = child as TextNode;
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
      let styleID;
      if (style.includes(",")) {
        let styleSub = style.split(",")[0];
        styleID = styleSub;
      } else {
        styleID = style;
      }

      if (styleID) {
        const currentStyle: BaseStyle = await figma.importStyleByKeyAsync(
          styleID
        ); //fetch current style
        if (currentStyle) {
          let currentStyleName = currentStyle.name; //get current style name
          let tokenName = currentStyleName.split("/")[1]; //TODO set to capture last word in sequence
          SendMessage(tokenName);
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
            SendMessage(_matchedStyle.id);
            node.fillStyleId = _matchedStyle.id;
          } else {
            SendError(`No match found for ${_matchedStyle.id}`);
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
        const currentStyle: BaseStyle = await figma.importStyleByKeyAsync(
          styleID
        );
        //fetch current style
        if (currentStyle) {
          let currentStyleName = currentStyle.name; //get current style name
          let tokenName = currentStyleName.split("/")[1]; //split name from dark/ or light/
          SendMessage(tokenName);
          //if dark mode look in light colors if light look in dark
          const _matchingStyles = mode
            ? tokenData["color"]["light"]
            : tokenData["color"]["dark"];

          //Look for matching style based on matching style id
          let _matchingStyleID = _matchingStyles[tokenName].split(":")[1];

          const _matchedStyle: BaseStyle = await figma.importStyleByKeyAsync(
            _matchingStyleID
          );
          if (_matchedStyle) {
            SendMessage(_matchedStyle.id);
            node.strokeStyleId = _matchedStyle.id;
          } else {
            SendError(`No match found for ${_matchedStyle.id}`);
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

function GetProjectInfo() {
  var message = {
    type: "ProjectInfo",
    message: figma.currentPage.name,
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

// BuildTheme();
// build theme
// function BuildTheme() {
//   let collectedStyleDataLight = [];
//   let collectedStyleDataDark = [];
//   var colorStyles = figma.getLocalPaintStyles();
//   if (colorStyles) {
//     colorStyles.forEach(function (color) {
//       let name = styleName(color.name);
//       let key = color.key;
//       if (name && key) {
//         if (themeName(color.name).includes("light")) {
//           collectedStyleDataLight.push({ [name]: `S:${key}` });
//         } else if (themeName(color.name).includes("dark")) {
//           collectedStyleDataDark.push({ [name]: `S:${key}` });
//         }
//       } else {
//         figma.notify("Error adding theme");
//         throw new Error("Error adding theme");
//       }
//     });
//     // SendMessage("Light Color Ids:" + JSON.stringify(collectedStyleDataLight));
//     // SendMessage("Dark Color Ids:" + JSON.stringify(collectedStyleDataDark));
//   } else {
//     figma.notify("There are no color styles in the document");
//   }
// }
// For building out theme
// function themeName(name) {
//   if (name.includes("/")) {
//     var prefix = name.split("/");
//     return prefix[0];
//   } else {
//     figma.notify("Styles names must be prefixed. Ex: themeName/colorName");
//   }
// }
// //for building out style name
// function styleName(name) {
//   if (name.includes("/")) {
//     var styleName_1 = name.split("/").slice(1).join(".");
//     return styleName_1;
//   } else {
//     figma.notify("Styles names must be prefixed. Ex: themeName/colorName");
//   }
// }
