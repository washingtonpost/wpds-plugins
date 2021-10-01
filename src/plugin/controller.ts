figma.showUI(__html__, { width: 365, height: 634 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "setText") {
    // This is how figma responds back to the ui
    const selection = figma.currentPage.selection[0] as TextNode;
    if (selection) {
      selection.characters = msg.text;
    }
    figma.ui.postMessage({
      type: "create-rectangles",
      message: `Created ${msg.count} Rectangles`,
    });
  }

  figma.closePlugin();
};
