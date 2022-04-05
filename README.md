# wpds-plugins

Takes in the url of an article and stores data to map to objects in figma. Such as headline, subhead, image, caption, body, etc.

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
