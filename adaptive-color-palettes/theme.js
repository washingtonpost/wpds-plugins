const {
  Theme,
  Color,
  BackgroundColor,
} = require("@adobe/leonardo-contrast-colors");

const tsv = `Token	0	20	40	60	80	100	200	300	400	500	600	700
gray	#000000	#111111	#2a2a2a	#494949	#666666	#737373	#aaaaaa	#d5d5d5	#e9e9e9	#f0f0f0	#f7f7f7	#ffffff
blue	-	-	#0a3258	#0f4b84	#1366b3	#166dfc	#5784c5	#84a4d7	#acc5e8	#d3e7fa	#e8f1ff	-
red	-	-	#63100e	#8e1f1b	#be2c25	#ea0017	#d35f4f	#e58a7c	#f2b4ab	#fbdedc	#ffe8e8	-
pink	-	-	#690b2c	#951940	#c32755	#ff4f83	#d55e77	#e48a9b	#f0b4c0	#f9dee7	#ffebf1	-
purple	-	-	#5d1254	#881b79	#b623a1	#d138bf	#c95cb6	#da89ca	#eab3df	#f8ddf4	#fbeffa	-
teal	-	-	#0b3940	#0e545f	#0f7180	#03afca	#4a8e9b	#75acb6	#9fcbd3	#c8ebf0	#ebfcff	-
orange	-	-	#763500	#a64a00	#d86100	#f3750e	#e6823d	#f1a26a	#f9c296	#fde2c4	#ffefe0	-
green	-	-	#285115	#38711e	#499327	#36a75c	#6ea951	#91c078	#b2d6a0	#d4edc9	#effaeb	-
gold	-	-	#6D4508	#9e6105	#c2882f	#e5a036	#d39e4c	#deb57e	#eacca5	#f3e4cd	#faf0e1	-
yellow	-	-	-	-	-	#ffec44	-	-	-	-	#fffbda	-
mustard	-	-	#644801	#916800	#c18b00	#e2a31f	#d99e20	#ebb347	#f8cb70	#ffe49d	#fbf1dd	-`;

let ColorPalette = []; //Holds colors for Leonardo
FormatData();

// Takes TSV
function FormatData() {
  const items = tsv.split("\n");
  const headerRow = items[0].split("\t");
  const tokenValue = headerRow.splice(1, headerRow.length);
  const data = items.splice(1, items.length);

  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      let row = data[i].split("\t");
      let colorName = row[0];
      let colorValues = row.splice(1, row.length);
      for (let v = 0; v < colorValues.length; v++) {
        if (colorValues[v] != "-") {
          let tokenNumber = tokenValue[v];
          const _Color = new Color({
            name: `${colorName + tokenNumber}`,
            colorKeys: [`${colorValues[v]}`],
            ratios: [contrast([255, 255, 255], hexToRgbA(colorValues[v]))],
          });
          ColorPalette.push(_Color);
        }
      }
    }
  }

  SetUpTheme();
}

function SetUpTheme() {
  if (!ColorPalette.length) return;
  let context = new BackgroundColor({
    name: "context",
    colorKeys: ["#FFFFFF"],
    ratios: [21],
  });

  let theme = new Theme({
    colors: [...ColorPalette],
    backgroundColor: context,
    lightness: 5,
  });
  let NewTheme = {};
  theme.contrastColors.map((c) => {
    if (c.values) {
      NewTheme[c.name] = {
        value: c.values[0].value,
      };
    }
  });
  console.log(NewTheme);
}

//Converts hex to RGBA
function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    let r = (c >> 16) & 255;
    let g = (c >> 8) & 255;
    let b = c & 255;

    return [r, g, b];
  } else {
    throw err;
  }
}

//Calculate luminance
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

//Calculate contrast
function contrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
