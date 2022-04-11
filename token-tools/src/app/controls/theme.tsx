import React from "react";
import Header from "../components/Headers";
import Paragraph from "../components/paragraph";
import TokenSelector from "../components/tokenSelector";
import Tokens from "@washingtonpost/wpds-theme/src/wpds.tokens.json";
import Layout from "./layout";
export default function Theme() {
  return (
    <Layout>
      <Header as="h2" css={{ gridColumn: "span 2" }}>
        Theme
      </Header>
      <Paragraph>
        Selecting dark or light will change all of the colors on the page to
        correct context.
      </Paragraph>
      <TokenSelector tokenData={Tokens.lineHeight} />
    </Layout>
  );
}
