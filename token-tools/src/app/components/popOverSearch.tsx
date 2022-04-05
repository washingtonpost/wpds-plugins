import React, { useState, useRef } from "react";
import { styled, theme } from "../../stitches.config";
import { Divider } from "./divider";
import tokenData from "../../wpds.tokens.json";
export default function popOverSearch(props) {
  const { tokens, calculateValue, isActive, setActive, setInFigma, hideSearch, command } =
    props;
  const [Value, setValue] = useState("");
  const Input = useRef();
  const ScrollContainer = useRef();

  const Span = styled("span", {
    fontSize: 10,
    color: "#AAAAAA"
  })
  const Icon = styled("div", {
    width: 16,
    height: 30,
    paddingLeft: "$50",
    display: "flex",
    alignItems: "center",
    fill: "$accessible",
    justifyContent: "center",
    transition: "background-color .25s",
    borderStyle: "none",
    backgroundColor: "transparent",
    margin: 0,
  });
  const ClearButton = styled("div", {
    width: 16,
    height: 30,
    paddingRight: "$50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color .25s",
    borderStyle: "none",
    backgroundColor: "transparent",
    fill: "$accessible",
    margin: 0,
    "&:hover": {
      fill: "$primary",
    },
  });
  const OptionHolder = styled("div", {
    overflowY: "auto",
    overflowX: "hidden",
  });
  const Option = styled("div", {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingLeft: theme.space[100],
    borderStyle: "none",
    color: theme.colors.accessible,
    transition: "background-color .25s",
    textAlign: "left",
    height: 32,
    "&:hover": {
      backgroundColor: theme.colors.subtle,
      color: theme.colors.primary,
    },
  });
  function lookupValue(lookUpToken) {
    const path = lookUpToken.split(".");
    let value;
    switch (path.length) {
      case 1:
        value = tokenData[path[0]].value;
        break;
      case 2:
        value = tokenData[path[0]][path[1]].value;
        break;
      case 3:
        value = tokenData[path[0]][path[1]][path[2]].value;
        break;
      default:
        break;
    }
    return value;
  }
  const GetOptions = () => {
    if (!tokens) return;
    let newOptions = [];
    for (var token in tokens) {
      if (tokens[token].hasOwnProperty("value")) {
        if (token.substring(0, Value.length).includes(Value)) {
          let helperValue = tokens[token].value;
          if (typeof helperValue.includes === 'function') {
            if (helperValue.includes('{')) {
              let _helperValue = helperValue.substring(1, helperValue.length - 1);
              helperValue = lookupValue(_helperValue);
              if (calculateValue) {
                let baseSize = parseInt(tokenData['baseSize'].value.split("px")[0]);
                helperValue = helperValue * baseSize;
              }
            }
            newOptions.push({ name: token, value: helperValue });
          } else {
            if (typeof helperValue === 'number') {
              newOptions.push({ name: token, value: helperValue });
            } else {
              newOptions.push({ name: token });
            }

          }

        }
      }
    }
    newOptions.sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (b.name > a.name) {
        return -1
      } else {
        return 0
      }
    });
    if (newOptions.length > 0) {
      return (
        <>
          {newOptions.map((item, i) => {
            return (
              <Option onClick={() => CloseAndSet(item.name)} key={i}>
                {item.name}
                {item.value &&
                  <Span>
                    /
                    {item.value}
                  </Span>
                }


              </Option>
            );
          })}
        </>
      );
    } else {
      return <Option>Sorry no matches.</Option>;
    }
  };
  function CloseAndSet(value) {
    console.log("trying to set");
    setInFigma(command, value);
    setActive(false);
  }
  function handleChange(event) {
    setValue(event.target.value);
  }
  function handleKey(e) {
    const key = e.key;
    if (key == "Escape") {
      setActive(false);
    }
  }
  return (
    <>
      {isActive && (
        <div onKeyDown={handleKey} tabIndex={0} className="containerSearch">
          {!hideSearch && (
            <>
              <div className="flex">
                <Icon>
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      id="search"
                      d="M13.26,12.78,9.68,9.21a4,4,0,1,0-.77.65l3.63,3.63ZM3.76,6.5a3,3,0,1,1,.88,2.12A3,3,0,0,1,3.76,6.5Z"
                    />
                  </svg>
                </Icon>
                <input
                  onKeyDown={handleKey}
                  autoFocus
                  ref={Input}
                  className="search"
                  onChange={handleChange}
                  value={Value}
                  placeholder="Search"
                  type="text"
                />
                {Value.length > 0 && (
                  <ClearButton onClick={() => setValue("")}>
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        id="close"
                        d="M13,3.65,12.35,3,8,7.34,3.65,3,3,3.65,7.34,8,3,12.35l.65.65L8,8.66,12.35,13l.65-.65L8.66,8Z"
                      />
                    </svg>
                  </ClearButton>
                )}
              </div>
              <Divider css={{ marginBottom: "$50" }} />
            </>
          )}

          <OptionHolder ref={ScrollContainer}>
            <GetOptions />
          </OptionHolder>
        </div>
      )}
    </>
  );
}
