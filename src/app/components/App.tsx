import React, { useEffect, useState } from "react";
import Btn from "./btn";
import { copyImageToClipboard } from "copy-image-clipboard";
import "../styles/ui.css";
import LinkIcon from "./LinkIcon";
import WP from "./WP";
declare function require(path: string): any;

export default function App() {
  const [ArticleLink, setArticleLink] = useState(null);
  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  const onFetch = async () => {
    try {
      setLoading(true);
      const html = await fetch(
        `https://twp-web-scraper.herokuapp.com/api/fetch?canonical_link=${
          ArticleLink.split("https://www.washingtonpost.com/")[1]
        }`
      );
      const Json = await html.json();
      setData(Json);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
    // parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*');
  };
  const mapToObject = (text) => {
    parent.postMessage({ pluginMessage: { type: "setText", text } }, "*");
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };
  const onReset = () => {
    setData(null);
    setLoading(false);
    setError(false);
  };
  return (
    <div>
      <h2 className="title ">
        <WP />
        <span className="ml-sm font-light">Data Mapper</span>
      </h2>
      {!Loading && !Data && (
        <div className="flex">
          <div className="flex w-100 items-center">
            <LinkIcon className="mr-xs" />{" "}
            <input
              className="w-100"
              onChange={(e) => setArticleLink(e.target.value)}
              type="text"
              placeholder="Article Link"
            />
          </div>
          <button disabled={ArticleLink == null} id="create" onClick={onFetch}>
            Fetch
          </button>
        </div>
      )}
      {Loading && (
        <img
          width="150px"
          height="auto"
          src="https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif"
        />
      )}
      {Data && (
        <>
          <div className="grid items-center">
            <div>
              <h3 className="font-bold">Kicker:</h3>
              <div className="font-light dataText">{Data.kicker}</div>
            </div>
            <Btn onClick={() => mapToObject(Data.kicker)}>Map to object</Btn>
          </div>
          <div className="divider" />
          <div className="grid">
            <div>
              <h3 className="font-bold">Headline:</h3>
              <div className="font-light dataText">{Data.headline}</div>
            </div>
          </div>
          <div className="divider" />
          <div className="grid">
            <div>
              <h3 className="font-bold">LedeArt:</h3>
              <img
                onClick={() =>
                  copyImageToClipboard(
                    Data.ledeArt ? Data.ledeArt.split(",")[0] : Data.ledeArt
                  )
                }
                width="150px"
                height="auto"
                src={Data.ledeArt ? Data.ledeArt.split(",")[0] : Data.ledeArt}
              />
            </div>
          </div>
          <div className="divider" />
          <div className="grid">
            <div>
              <h3 className="font-bold">LedeArt Caption:</h3>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(Data.ledeArtCaption);
                }}
                className="font-light dataText"
              >
                {Data.ledeArtCaption}
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="grid">
            <div>
              <h3 className="font-bold">Author(s):</h3>
              <ul>
                {Data.authors.map((i: number, element: number) => {
                  console.log(element);
                  return (
                    <li key={i} className="font-light dataText">
                      {Data.authors[element]}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
      {Error && <>Oh man got an error</>}
      <div className="stick-to-bottom">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
