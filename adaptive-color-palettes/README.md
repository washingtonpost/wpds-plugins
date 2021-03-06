# Adaptive color generator

This code can be used to generate color themes from a base palette defined in the `ColorPalette.json` and using the configuration file you can modify base background color contextualize Leonardo when measuring the contrast, lightness and saturation of the palette.

## Getting started

To start run `npm i` and modify the `ColorPalette.json` file with the color palette you like to modify. Please keep in mind you must follow the token format of

```
Name_of_token:{value:"hex_or_rgb_value"}
```

Modify the `Config.js` to set up the values of the output of the new color theme. Once all is set and done run `npm run build` and it will generate a new `new_theme.json` and `index.html` to see the color output of the new colors.

You can then use that file to add it to your color token file as a new theme.

**Example of Html file**
![Screen Shot 2022-05-18 at 7 32 33 PM](https://user-images.githubusercontent.com/6046591/169171994-6540f157-0382-4975-b15e-c79586299d70.png)

### More information

Adobe leonardo helps power this tool. While definitely possible to just use their site it takes a bit longer when dealing with colors not originally generated by the tool. We built this tool to unlock creating themes with Leonardo without having to use the interface to generate a given palette. For more information though on Adobe Leonardo read their [ReadMe](https://github.com/adobe/leonardo).
