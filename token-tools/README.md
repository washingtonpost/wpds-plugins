# TOKEN TOOLS

Token tools is a tool created by WPDS (The Washington Post Design System) team. Token tools plugin is used to apply tokens that are not yet supported by Figma as of today. These tokens include border-radius, font-size (as an individual token), line-height(as an individual token) ,and the ability to switch between themes. 

 ## Folder structure
The plugin interface is located under `src/app` and all of the plugin controls are found under `src/app/controls`. Each control sends a command to the `command-center.tsx` found in `src/app/commands`

The `controller. tsx` is the file that interacts with Figma program. It applies the command using Figma's api. 

Learn more about WPDS [@build.washingtonpost.com](https://build.washingtonpost.com)


