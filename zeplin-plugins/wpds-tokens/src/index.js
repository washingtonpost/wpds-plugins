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
  light as lightTheme,
  defaultTheme,
} from "@washingtonpost/wpds-theme/src/tokens.ts";

const intBase = parseInt(base.split("px")[0]);

function layer(context, selectedLayer) {
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
    <Icon size="${size}">
      <Asset />
    </Icon>
  );
}`,
    language: "javascript",
  };
}

//Handles shape and group layers
function handleShapeType(selectedLayer) {
  const borderRadius = handleBorderRadius(selectedLayer);
  const shadow = handleShadow(selectedLayer);
  const backgroundColor = handleBackgroundColor(selectedLayer);
  const data = {
    borderRadius,
    boxShadow: shadow,
    backgroundColor,
  };
  return { code: JSON.stringify(data, null, 2), language: "json" };
}

function handleBackgroundColor(selectedLayer) {
  // use fills to get the background color
  // if there are no fills, then return transparent
  if (selectedLayer.fills.length == 0) return "transparent";
  const colorObject = selectedLayer.fills[0].color;
  const value = `rgba(${colorObject.r},${colorObject.g},${colorObject.b},${colorObject.a})`;
  
  // lightTheme is an object of key value pairs like "alpha25":"rgba(215,215,215,.25)"
  // find the matching value in the object and return the key
  // if no match, return the rgba value
  const lookup = Object.keys(lightTheme).find((key) => lightTheme[key] === value);

  if (lookup) {
    // defaultTheme={"primary":"$gray20","secondary":"$gray600","cta":"$vividBlue100","disabled":"$alpha25","accessible":"$gray80","subtle":"$gray300","error":"$red100","success":"$green100","warning":"$orange100","signal":"$blue200","onPrimary":"$gray600","onSecondary":"$gray20","onCta":"$gray600-static","onDisabled":"$alpha50","onMessage":"$gray600-static"}

    // if gray20 is value then return $primary
    const defaultThemeLookup = Object.entries(defaultTheme).find(
      ([key, value]) => {
        return value === `$${lookup}`;
      }
    );

    if (defaultThemeLookup) {
      return `$${defaultThemeLookup[0]}`;
    }

    return `$${lookup}`;
  }

  return value;
}

function handleTextColor(selectedLayer) {
  if (selectedLayer.textStyles.length == 0) return;
  const colorObject = selectedLayer.textStyles[0].textStyle.color;
  const value = `rgba(${colorObject.r},${colorObject.g},${colorObject.b},${colorObject.a})`;

  // lightTheme is an object of key value pairs like "alpha25":"rgba(215,215,215,.25)"
  // find the matching value in the object and return the key
  // if no match, return the rgba value
  const lookup = Object.keys(lightTheme).find((key) => lightTheme[key] === value);

  if (lookup) {
    // defaultTheme={"primary":"$gray20","secondary":"$gray600","cta":"$vividBlue100","disabled":"$alpha25","accessible":"$gray80","subtle":"$gray300","error":"$red100","success":"$green100","warning":"$orange100","signal":"$blue200","onPrimary":"$gray600","onSecondary":"$gray20","onCta":"$gray600-static","onDisabled":"$alpha50","onMessage":"$gray600-static"}

    // if gray20 is value then return $primary
    const defaultThemeLookup = Object.entries(defaultTheme).find(
      ([key, value]) => {
        return value === `$${lookup}`;
      }
    );

    if (defaultThemeLookup) {
      return `$${defaultThemeLookup[0]}`;
    }

    return `$${lookup}`;
  }

  return value;
}

//Handles text layers
function handleTextType(selectedLayer) {
  const fontSize = handleFontSize(selectedLayer);
  const font = handleFont(selectedLayer);
  const lineHeight = handleLineHeight(selectedLayer);
  const fontWeight = handleFontWeight(selectedLayer);
  const color = handleTextColor(selectedLayer);

  const data = {
    fontFamily: font,
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
    color: color,
  };

  return { code: JSON.stringify(data, null, 2), language: "json" };
}

function handleBorderRadius(selectedLayer) {
  if (selectedLayer.borderRadius == 0) return;
  if (selectedLayer.borderRadius === 9999) {
    return `$round`;
  }
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
