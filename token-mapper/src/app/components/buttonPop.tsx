import React, { useState } from "react";
import { styled } from "../../stitches.config";
import IconButton from "./IconButton";
import { Title } from "./titles";
import PopOverSearch from "./popOverSearch";
export default function ButtonPop(props) {
  const { title, label, tokens, setInFigma, hideSearch, command } = props;
  const [Active, setActive] = useState(false);
  const [CurrentSelection, setCurrentSelection] = useState("-");

  const Flex = styled("div", {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  });

  const Value = styled("div", {
    position: "relative",
    height: 30,
    width: 120,
    fontSize: 11,
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 0,
    display: "grid",
    gridTemplateColumns: "1fr 30px",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inter",
    backgroundColor: "White",
    border: "1px solid #F0F0F0",
    borderRadius: "2px",
  });

  function SetAndPass(command, token) {
    console.log(token);
    setInFigma(command, tokens[token].value);
    setCurrentSelection(`${token}`);
  }
  return (
    <Flex>
      {label && <Title as="h3">{label}</Title>}
      <Value>
        <span onClick={() => setActive(!Active)}>{CurrentSelection}</span>
        <IconButton isActive={Active} onClick={() => setActive(!Active)} />
        <PopOverSearch
          hideSearch={hideSearch}
          command={command}
          setInFigma={SetAndPass}
          tokens={tokens}
          setActive={() => setActive(!Active)}
          isActive={Active}
          title={title}
        />
      </Value>
    </Flex>
  );
}
