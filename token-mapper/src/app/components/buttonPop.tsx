import React from "react";
import { styled } from "../../stitches.config";
import IconButton from "./IconButton";
import { Title } from "./titles";
export default function ButtonPop(props) {
  const { children, onClick, title } = props;
  const Flex = styled("div", {
    display: "flex",
    flexDirection: "column",
  });
  const Value = styled("div", {
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
    textAlign: "left",
  });
  return (
    <Flex>
      {title && <Title as="h3">Title</Title>}
      <Value>
        <span>{children}</span>
        <IconButton onClick={onClick} />
      </Value>
    </Flex>
  );
}
