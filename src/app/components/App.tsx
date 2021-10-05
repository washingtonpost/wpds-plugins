import React, { useEffect, useState, useRef } from "react";
import Btn from "./btn";
import axios from "axios";
axios.defaults.timeout = 30 * 1000;
import "../styles/ui.css";
import LinkIcon from "./LinkIcon";
import WP from "./WP";
import { copyImageToClipboard } from "copy-image-clipboard";

export default function App() {
  const [ArticleLink, setArticleLink] = useState(null);
  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [CanMap, setCanMap] = useState(true);
  const imageElem = useRef();
  // const [dataArray, setdataArray] = useState(null);
  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
      if (type === "ReadyToMap") {
        console.log(`Setting buttons to ${message}`);
        setCanMap(message);
      }
      if (type === "ReadyToMap") {
        console.log(`Setting buttons to ${message}`);
        setCanMap(message);
      }
      if (type === "ImageArray") {
        console.log(`${message}`);
      }
    };
  }, []);

  // useEffect(() => {
  //     async function getImageData(){
  //         if(Data!=null){
  //             try {
  //                 const imageURL=new URL(Data.ledeArt ? Data.ledeArt.split(",")[0] : "");
  //                 const data = await axios.get(`https://twp-web-scraper.herokuapp.com/api/convert?url=${imageURL}`);
  //                 setdataArray(data);
  //             } catch (error) {
  //                 console.log(error);
  //             }
  //         }
  //     }
  //     getImageData();
  // }, [Data])

  // const mapImage = async ()=> {
  //     try {
  //         const data=new Uint8Array (dataArray.buffer);
  //         parent.postMessage({ pluginMessage: { type: "setImage", data } }, "*");
  //     } catch (error) {
  //         console.log(error);
  //     }
  //   };

  async function copyImage() {
    const imageURL = new URL(Data.ledeArt ? Data.ledeArt.split(",")[0] : "");
    const src = imageURL.searchParams.get("src").split("&")[0];
    try {
      copyImageToClipboard(
        "https://www.washingtonpost.com/resizer/BjxDvcyi2_mxFUu8WWqI_bjsA10=/1344x756/filters:quality(80)/posttv-thumbnails-prod.s3.amazonaws.com/01-07-2021/t_811d0d28e559444594ac5a5088fe8bde_name_e3257eb6_507f_11eb_a1f5_fdaf28cfca90.jpg"
      );
      console.log("Copied");
    } catch (error) {
      console.log(error);
    }
  }
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
  };
  const mapToObject = (text) => {
    parent.postMessage({ pluginMessage: { type: "setText", text } }, "*");
  };
  const onReset = () => {
    setData(null);
    setLoading(false);
    setError(false);
  };
  return (
    <div>
      <div className="grid items-center">
        <h2 className="title ">
          <WP />
          <span className="ml-sm font-light">Data Mapper</span>
        </h2>
        {Data && <button onClick={onReset}>Reset</button>}
      </div>
      <div className="divider" />
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
        <div className="w-100 h-100 flex flex-col items-center justify-center">
          <img
            width="150px"
            height="auto"
            src="https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif"
          />
          <p>Fetching content..</p>
        </div>
      )}
      {Data && (
        <>
          <div className="grid items-center">
            <div>
              <h3 className="font-bold">Kicker:</h3>
              <div className="font-light dataText">{Data.kicker}</div>
            </div>
            <Btn disabled={CanMap} onClick={() => mapToObject(Data.kicker)}>
              Map to object
            </Btn>
          </div>
          <div className="divider" />
          <div className="grid items-center">
            <div>
              <h3 className="font-bold">Headline:</h3>
              <div className="font-light dataText">{Data.headline}</div>
            </div>
            <Btn disabled={CanMap} onClick={() => mapToObject(Data.headline)}>
              Map to object
            </Btn>
          </div>
          <div className="divider" />
          <div className="grid items-center">
            <div className="w-100">
              <h3 className="font-bold">LedeArt:</h3>
              <img
                id="myImage"
                ref={imageElem}
                width="100%"
                height="auto"
                src={Data.ledeArt ? Data.ledeArt.split(",")[0] : ""}
              />
            </div>
            {
              <Btn disabled={CanMap} onClick={() => copyImage()}>
                Copy to clipboard
              </Btn>
            }
          </div>
          <div className="divider" />
          <div className="grid items-center">
            <div>
              <h3 className="font-bold">LedeArt Caption:</h3>
              <div className="font-light dataText">{Data.ledeArtCaption}</div>
            </div>
            <Btn
              disabled={CanMap}
              onClick={() => mapToObject(Data.ledeArtCaption)}
            >
              Map to object
            </Btn>
          </div>
          <div className="divider" />
          <div className="flex w-100">
            <div className="w-100">
              <h3 className="font-bold">Author(s):</h3>

              {Data.authors.map((i: number, element: number) => {
                console.log(element);
                return (
                  <div
                    key={i}
                    className="font-light w-100 grid items-center dataText"
                  >
                    <p>{Data.authors[element]}</p>
                    <Btn
                      disabled={CanMap}
                      onClick={() => mapToObject(Data.authors[element])}
                    >
                      Map to object
                    </Btn>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-100">
            <div className="w-100">
              <h3 className="font-bold">Body content:</h3>

              {Data.articleBody.map((i: number, element: number) => {
                console.log(element);
                return (
                  <div
                    key={i}
                    className="font-light w-100 grid items-center dataText"
                  >
                    <p>{Data.articleBody[element]}</p>
                    <Btn
                      disabled={CanMap}
                      onClick={() => mapToObject(Data.articleBody[element])}
                    >
                      Map to object
                    </Btn>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {Error && (
        <>
          Oh man got an error
          <div>
            <button onClick={onReset}>Reset</button>
          </div>
        </>
      )}
      {Error && Data && (
        <>
          Oh man got an error
          <div>
            <button onClick={onReset}>Reset</button>
          </div>
        </>
      )}
      {Error && !Data && !Loading && (
        <>
          Lame the server timed out try again
          <div>
            <button onClick={onReset}>Reset</button>
          </div>
        </>
      )}
      {Error && !Loading && (
        <>
          Lame the server timed out try again
          <div>
            <button onClick={onReset}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
}
