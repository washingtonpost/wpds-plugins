/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */
import {
  base,
  radii,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
} from "@washingtonpost/wpds-theme/src/tokens.ts";
const intBase = parseInt(base.split("px")[0]);

function layer(context, selectedLayer) {
  // if first item in array has "Icon" in it then next layer should have icon name
  // infer the name of the icon
  // import Asset from "@washingtonpost/wpds-assets/chevron-right";
  // <Asset />
  if (selectedLayer.type == "text") {
    return handleTextType(selectedLayer);
  } else {
    if (selectedLayer) {
      if (selectedLayer?.version?.componentNames[0].includes("Icon")) {
        return handleIconType(selectedLayer);
      } else {
        return handleShapeType(selectedLayer);
      }
    } else {
      return "Select a layer to see the tokens";
    }
  }
}

function handleIconType(selectedLayer) {
  const iconName = selectedLayer.version.componentNames[1];
  const size = selectedLayer.version.componentNames[0].split("Icon / ")[1];

  return {
    code: `import Asset from "@washingtonpost/wpds-assets/asset/${iconName}";
import { Icon } from "@washingtonpost/wpds-ui-kit";

function Asset() {
  return (
    <Icon size={"${size}"}>
      <Asset />
    </Icon>
  );
}`,
    language: "javascript",
  };
}

//Handles shape and group layers
function handleShapeType(selectedLayer) {
  let borderRadius;
  let shadow;
  borderRadius = handleBorderRadius(selectedLayer);
  shadow = handleShadow(selectedLayer);
  let data = {
    borderRadius: borderRadius,
    boxShadow: shadow,
  };
  return { code: JSON.stringify(data, null, 2), language: "json" };
}

//Handles text layers
function handleTextType(selectedLayer) {
  let fontSize;
  let font;
  let lineHeight;
  let fontWeight;
  fontSize = handleFontSize(selectedLayer);
  font = handleFont(selectedLayer);
  lineHeight = handleLineHeight(selectedLayer);
  fontWeight = handleFontWeight(selectedLayer);

  let data = {
    fontFamily: font,
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
  };

  return { code: JSON.stringify(data, null, 2), language: "json" };
}

function handleBorderRadius(selectedLayer) {
  if (selectedLayer.borderRadius == 0) return;
  let checkValue = selectedLayer.borderRadius / intBase;
  let valueToReturn = "Unsupported Token";
  for (var token in radii) {
    if (radii[token] == `${checkValue}rem`) {
      valueToReturn = `$${token}`;
    }
  }
  return valueToReturn;
}

function handleFontSize(selectedLayer) {
  if (selectedLayer.textStyles.length == 0) return;
  let checkValue = selectedLayer.textStyles[0].textStyle.fontSize / intBase;
  let valueToReturn = `${checkValue}px`;
  for (var token in fontSizes) {
    if (fontSizes[token] == `${checkValue}rem`) {
      valueToReturn = `$${token}`;
    }
  }
  return valueToReturn;
}

// Manully coded due to the face our token font face name is not the same as the font actual name.
function handleFont(selectedLayer) {
  if (selectedLayer.textStyles.length == 0) return;
  let checkValue = selectedLayer.textStyles[0].textStyle.fontFamily;
  let valueToReturn = checkValue;
  if (checkValue.includes("Postoni")) {
    valueToReturn = "$headline";
  } else if (checkValue.includes("georgia")) {
    valueToReturn = "$body";
  } else if (checkValue.includes("Franklin")) {
    valueToReturn = "$meta";
  }
  return valueToReturn;
}

function handleShadow(selectedLayer) {
  if (selectedLayer.shadows.length == 0) return;
  const shadow = selectedLayer.shadows[0];
  let checkValue = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spread}px`;
  let valueToReturn = checkValue;
  for (var token in shadows) {
    if (shadows[token].includes(`${checkValue}`)) {
      valueToReturn = `$${token}`;
    }
  }
  return valueToReturn;
}
function handleFontWeight(selectedLayer) {
  if (selectedLayer.textStyles.length == 0) return;
  let checkValue = selectedLayer.textStyles[0].textStyle.fontWeight;
  let valueToReturn = checkValue;
  for (var token in fontWeights) {
    if (fontWeights[token] == checkValue) {
      valueToReturn = `$${token}`;
    }
  }
  return valueToReturn;
}

// Currently supports 2 decimal points
function handleLineHeight(selectedLayer) {
  if (selectedLayer.textStyles.length == 0) return;
  let checkValue =
    selectedLayer.textStyles[0].textStyle.lineHeight /
    selectedLayer.textStyles[0].textStyle.fontSize;
  let valueToReturn = checkValue.toFixed(2);
  for (var token in lineHeights) {
    if (lineHeights[token] == checkValue.toFixed(2)) {
      valueToReturn = `$${token}`;
    }
  }
  if (
    valueToReturn == undefined ||
    valueToReturn == "NaN" ||
    valueToReturn == NaN
  ) {
    return;
  }
  return valueToReturn;
}
/**
 * The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
 * See Zeplin Extensions migration guide for details:
 * https://zpl.io/shared-styleguides-extensions-migration-guide
 */

export default {
  layer,
};
