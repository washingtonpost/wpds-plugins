const {
	Theme,
	Color,
	BackgroundColor,
} = require("@adobe/leonardo-contrast-colors");
const CurrentPalette = require("./ColorPalette");
const Config = require("./Config");
const fs = require("fs");
const { config } = require("process");
let LeonardoPalette = []; //Holds colors for Leonardo

//Start of script
PrepareData();

/**Prepares Current Palette data to be added into Leonardo Palette */
function PrepareData() {
	for (token in CurrentPalette) {
		if (CurrentPalette[token].hasOwnProperty("value")) {
			let _value = CurrentPalette[token].value;
			//if Color token value is a hex value
			if (CurrentPalette[token].value[0] == "#") {
				_value = hexToRgbA(_value);
			}
			//Generate Leonardo Color palette
			const _Color = new Color({
				name: token,
				colorKeys: [CurrentPalette[token].value],
				ratios: [contrast([255, 255, 255], _value)],
			});
			//Add to Color Palette
			LeonardoPalette.push(_Color);
		}
	}
	SetUpTheme();
}

/**Sets up Leonardo color palette if you like to adjust the lightness, contrast, and saturation modify the global variables found int eh Config.js. */
function SetUpTheme() {
	if (!LeonardoPalette.length) return;
	let context = new BackgroundColor({
		name: "context",
		colorKeys: ["#FFFFFF"],
		ratios: [21],
	});

	let theme = new Theme({
		colors: [...LeonardoPalette],
		backgroundColor: context,
		lightness: Config.lightness,
		contrast: Config.contrast,
		saturation: Config.saturation,
	});
	let NewTheme = {};
	theme.contrastColors.map((c) => {
		if (c.values) {
			NewTheme[c.name] = {
				value: c.values[0].value,
			};
		}
	});
	CreateFiles(JSON.stringify(NewTheme));
}
/**
 * This function creates new_theme.html and new_theme.json
 * @param {Stringify JSON data} content
 */

function CreateFiles(content) {
	try {
		fs.writeFile("./new_theme.json", content, (err) => {
			fs.writeFile(
				"./new_theme.html",
				HTMLContent(NewTheme),
				(err) => {}
			);
		});
	} catch (error) {
		console.log(error);
	}
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

//HTML template
const HTMLContent = (NewTheme) => {
	return `<!DOCTYPE html>
	<html lang="en">
	<style>
		body{
			display: grid;
			grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
			background-color:${Config.backgroundColorHTML}
		}
		div{
			height:150px;
			width:150px;
		   display: flex;
		   align-items: center;
		   justify-content: center;

		}
		p{
			background-color: rgba(255,255,255,.5);
			color:black;
			display: flex;
			padding:4px;
			font-family:sans-serif;
		}

	</style>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>

	</body>
	<script>
		const colors=${JSON.stringify(NewTheme)}
		for(token in colors){
			let node=document.createElement("div");
			let p=document.createElement("p");
			node.style.backgroundColor=colors[token].value;
			p.innerText=token;
			node.appendChild(p);
		   document.body.appendChild(node);
		}
	</script>
	</html>`;
};
