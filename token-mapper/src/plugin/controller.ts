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
    default:
      break;
  }
};

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
      let style = node.strokeStyleId.split(":")[1];
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

// /*Filters selection based on node type*/
// function filterData(data, predicate) {
//   return !!!data
//     ? null
//     : data.reduce((list, entry) => {
//         let clone = null;
//         if (predicate(entry)) {
//           clone = entry;
//           list.push(clone);
//         } else if (entry.children != null) {
//           let children = filterData(entry.children, predicate);
//           if (children.length > 0) {
//             list.push(...children);
//           }
//         }
//         return list;
//       }, []);
// }

/**Only uncomment below if you are rebuilding wpds.tokens.json file
 * The following will export the local color styles into the inspector to be copy and
 * pasted into the wpds.tokens.json. Figma requires all shared library styleIDs to be hard coded
 */

// BuildTheme();
//build theme
// function BuildTheme(){
//   const collectedStyleDataLight = [];
//   const collectedStyleDataDark=[];
//   var colorStyles = figma.getLocalPaintStyles();
//   if (colorStyles) {
//       colorStyles.forEach(function (color) {
//           let name=styleName(color.name);
//           let key=color.key;
//           if (name && key) {
//              if(themeName(color.name).includes("light")){
//                collectedStyleDataLight.push({name:name,key:key});
//              }else if(themeName(color.name).includes("dark")){
//                collectedStyleDataDark.push({name:name,key:key});
//              }
//           }
//           else {
//               figma.notify('Error adding theme');
//               throw new Error("Error adding theme");
//           }
//       });
// SendMessage(JSON.stringify(collectedStyleDataLight));
// SendMessage(JSON.stringify(collectedStyleDataDark));
//   }
//   else {
//       figma.notify('There are no color styles in the document');
//   }
// }
//For building out theme
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
//       if (name.includes('/')) {
//           var styleName_1 = name.split('/').slice(1).join('.');
//           return styleName_1;
//       }
//       else {
//           figma.notify('Styles names must be prefixed. Ex: themeName/colorName');
//       }
// }
