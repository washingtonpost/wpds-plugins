import React from "react";
import Header from "../components/Headers";
import Paragraph from "../components/paragraph";
import ThemeControl from "../controls/theme";
import Divider from "../components/divider";
export default function Main() {
  return (
    <>
      <Header>Project page</Header>
      <Paragraph css={{ marginTop: "8px", marginBottom: "$100" }}>
        Select 1 or more elements to begin editing the the token properties of
        the your selection.
      </Paragraph>
      <ThemeControl />
      <Divider />
    </>
  );
}
