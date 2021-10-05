# TWP Data mapper for (figma)

[Install Plugin](https://www.figma.com/community/plugin/1027021863605535783/TWP-Data-Mapper)

This tool is a plugin made for designers using figma. It allows the designer to pull data from an article using [Cheerio](https://www.npmjs.com/package/cheerio) to scrape the article looking for data attributes to map data to. The webscraping server lives on heroku 

[See sample api resonse](https://twp-web-scraper.herokuapp.com/api/fetch?canonical_link=us-policy/2021/09/30/house-democrats-infrastructure-vote/) 

Api fetch code on server looks like
```import axios from "axios";
axios.defaults.timeout = 20 * 1000;
import cheerio from "cheerio";
export default async function handler(req, res) {
  try {
    const html = await axios.get(
      `https://www.washingtonpost.com/${req.query.canonical_link}`
    );

    const $ = cheerio.load(html.data);
    const Kicker = $("[data-qa=kicker]").find("a").text();
    const headline =$("[data-qa=headline]").text()
    const LedeArt = $("[data-qa=lede-art]").find("img").attr("srcset");

    const LedeArtCaption = $("[data-qa=lede-art]").find("figcaption").text();
    const AuthorsData = $("[data-qa=author-name]");
    const Authors = [];
    AuthorsData.each((i, elem) => {
      if (!Authors.includes($(elem).text())) {
        Authors.push($(elem).text());
      }
    });
    const BodyText = $("[data-el=text]");
    const Paragraphs = [];

    BodyText.each((i, elem) => {
      Paragraphs.push($(elem).text());
    });
    res.status(200).json({
      kicker: Kicker,
      headline: headline,
      ledeArt: LedeArt,
      ledeArtCaption: LedeArtCaption,
      authors: Authors,
      articleBody: Paragraphs,
    });
  } catch (error) {
    res.status(408).json({ htmlData: "Error", error: error });
  }
}

```

## Quickstart
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.
* Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings
This repo is using:
* React + Webpack
* TypeScript
* Prettier precommit hook
