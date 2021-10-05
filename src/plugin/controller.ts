figma.showUI(__html__, { width: 365, height: 634 });

//Enables and disable map buttons
figma.on("selectionchange", () => {
  if (figma.currentPage.selection.length === 0) {
    console.log("Disabled buttons");
    var message = {
      type: "ReadyToMap",
      message: true,
    };
    figma.ui.postMessage(message);
  } else {
    var message = {
      type: "ReadyToMap",
      message: false,
    };
    figma.ui.postMessage(message);
    console.log("Enable buttons");
  }
});
figma.ui.onmessage = async (msg) => {
  if (figma.currentPage.selection.length === 0) {
    SendError("You need to at least 1 item selected");
  }
  switch (msg.type) {
    case "setText":
      setText(msg);
      break;
    case "Close":
      figma.closePlugin();
      break;
    case "setImage":
      setImage(msg);
      break;
    default:
      break;
  }
};

async function setImage(msg) {
  var imgSelection = filterData(
    figma.currentPage.selection,
    (i) => i.type == "RECTANGLE" || i.type == "FRAME"
  );
  console.log(imgSelection.length);
  const data = msg.data as Uint8Array;
  console.log(data);

  try {
    const imageHash = figma.createImage(data).hash;
    // If there's a selection, add the image data to each
    for (let i = 0; i < imgSelection.length; i++) {
      imgSelection[i].fills = [
        { type: "SOLID", color: { r: 1, g: 0, b: 0 } },
        { type: "IMAGE", scaleMode: "FILL", imageHash },
      ];
    }
  } catch (error) {
    console.log(error);
  }
}

/* Sets the of all selected text elements */
async function setText(msg) {
  var textSelection = filterData(
    figma.currentPage.selection,
    (i) => i.type == "TEXT"
  );
  if (!textSelection.length) {
    SendError("Your selection needs include at least 1 text element");
  } else {
    for (const text of textSelection) {
      try {
        await figma.loadFontAsync(text.fontName as FontName);
      } catch (error) {
        console.log(error);
      }

      if (text.type === "TEXT" && text.characters) {
        text.characters = msg.text;
      }
    }
  }
}
// async function setImage(msg) {}

function SendError(Error: String) {
  var message = {
    type: "Error",
    message: Error,
  };
  figma.ui.postMessage(message);
}
/*Filters selection based on node type*/
function filterData(data, predicate) {
  return !!!data
    ? null
    : data.reduce((list, entry) => {
        let clone = null;
        if (predicate(entry)) {
          clone = entry;
          list.push(clone);
        } else if (entry.children != null) {
          let children = filterData(entry.children, predicate);
          if (children.length > 0) {
            list.push(...children);
          }
        }
        return list;
      }, []);
}
