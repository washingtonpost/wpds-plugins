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
  fonts,
} from "@washingtonpost/ui-theme/dist/esm/dist/tokens";
const intBase = parseInt(base.split("px")[0]);
function layer(context, selectedLayer) {
  // console.log(selectedLayer);
  let borderRadius;
  let shadow;
  let fontSize;
  let font;
  let lineHeight;
  let fontWeight;

  if (selectedLayer.type == "shape" || selectedLayer.type == "group") {
    borderRadius = handleBorderRadius(selectedLayer);
  }
  if (selectedLayer.type == "text") {
    fontSize = handleFontSize(selectedLayer);
    font = handleFont(selectedLayer);
    lineHeight = handleLineHeight(selectedLayer);
    fontWeight = handleFontWeight(selectedLayer);
  }

  shadow = handleShadow(selectedLayer);

  let data = {
    borderRadius: borderRadius,
    boxShadow: shadow,
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
  let valueToReturn = "Unsupported Token";
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
  let valueToReturn = "Unsupported Token";
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
  console.log(checkValue);
  let valueToReturn = "Unsupported Token";
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
  let valueToReturn = "Unsupported Token";
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
  let valueToReturn = "Unsupported Token";
  for (var token in lineHeights) {
    if (lineHeights[token] == checkValue.toFixed(2)) {
      valueToReturn = `$${token}`;
    }
  }
  return valueToReturn;
}

function screen(context, selectedVersion, selectedScreen) {}

function component(context, selectedVersion, selectedComponent) {}

function colors(context) {}

function textStyles(context) {}

function spacing(context) {}

function exportColors(context) {}

function exportTextStyles(context) {}

function exportSpacing(context) {}

/**
 * The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
 * See Zeplin Extensions migration guide for details:
 * https://zpl.io/shared-styleguides-extensions-migration-guide
 */

function styleguideColors(context, colors) {}

function styleguideTextStyles(context, textStyles) {}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {}

function comment(context, text) {}

export default {
  layer,
  screen,
  component,
  colors,
  textStyles,
  spacing,
  exportColors,
  exportTextStyles,
  exportSpacing,
  styleguideColors,
  styleguideTextStyles,
  exportStyleguideColors,
  exportStyleguideTextStyles,
  comment,
};
