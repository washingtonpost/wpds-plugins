# TOKEN TOOLS

Token tools is a tool created by WPDS (The Washington Post Design System) team. Token tools plugin is used to apply tokens that are not yet supported by Figma as of today. These tokens include border-radius, font-size (as an individual token), line-height(as an individual token) ,and the ability to switch between themes. 

 ## Folder structure
The plugin interface is located under `src/app` and all of the plugin controls are found under `src/app/controls`. Each control sends a command to the `command-center.tsx` found in `src/app/commands`

The `controller. tsx` is the file that interacts with Figma program. It applies the command using Figma's api. 

Learn more about WPDS [@build.washingtonpost.com](https://build.washingtonpost.com)



## Getting started
Clone the repo and run `npm install` (NPM is required and yarn will not work)

Go to Figma (desktop app) > Plugins > Development > Import from manifest and link to the manifest found in this repo. You will need to provide your own ID if you are going to publish changes. 

<br/>

### To update color tokens (or update the plugin -- just swap out step #4 and test accordingly in step #6)
1. Follow the 'Getting started' steps above to import the plugin from the manifest. You should clone the repo first if you haven't already.
2. Build the development plugin with `npm run build:watch --workspaces`
3. Launch the in-development plugin in Figma.
4. In the plugin, click 'Settings' > 'Export local color styles'. This will generate the new color styles tokens, which you must copy and paste into the `src/localPaintStyleIDs.json` file.
5. Rebuild the plugin `npm run build`
6. Test in Figma to ensure colors switch themes.
7. Publish by going to your profile > plugins > publish new plugin. ** CAVEAT: only the original owner of the plugin can publish, which in this case is Brian!
