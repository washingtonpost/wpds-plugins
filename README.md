# wpds-plugins

Welcome to our mono-repo of plugin and extension mantain by the WPDS team.

## Adaptive color example

[Read more](/adaptive-color-palettes/README.md) about our adaptive color generator for color tokens. [Link to color palette html](./adaptive-color-palettes/index.html).

## Publish ZEM extensions

1. Add `ZEM_ACCESS_TOKEN` to your node environment variables using this config

```bash
export ZEM_ACCESS_TOKEN=<your-token>
```

## Set up local environment

We are using Node `14.18.2` and NPM `8.3.0`. We use an `./nvmrc` file to set the version of Node to use.

```bash
npm install
```

To build the packages

```bash
npm run build --workspaces
```

To build for development with Figma

```bash
npm run build:watch --workspaces
```
