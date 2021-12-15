import React, { useState, useRef } from "react";
import { styled, theme } from "../../stitches.config";
import { Divider } from "./divider";
import { Title } from "./titles";
export default function popOverSearch(props) {
  const { tokens, title, isActive, setActive } = props;
  const [Value, setValue] = useState("");
  const Input = useRef();

  function handleKey(e) {
    const key = e.key;
    if (key == "Enter") {
      setActive(false);
    }
    if (key == "Escape") {
      setActive(false);
    }
  }
  const Wrapper = styled("div", {
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: theme.space[50],
    paddingTop: theme.space[50],
    paddingBottom: theme.space[50],
  });
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

  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <>
      {isActive && (
        <div onKeyDown={handleKey} tabIndex={0} className="containerSearch">
          <Wrapper>
            {" "}
            <Title
              as="h2"
              css={{ color: theme.colors.primary, fontWeight: "bold" }}
            >
              {title}
            </Title>
          </Wrapper>
          <Divider />
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
              onChangeCapture={handleChange}
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

          {tokens}
        </div>
      )}
    </>
  );
}
