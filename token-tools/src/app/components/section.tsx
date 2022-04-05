import React from "react";
import { styled, theme } from "../../stitches.config";
import ButtonPop from "./buttonPop";
import { Title } from "./titles";
export default function Section(props) {
  const { title, children, tokens, setInFigma, hideSearch, command } = props;
  const Container = styled("div", {
    display: "grid",
    columnGap: theme.space[25],
    color: theme.colors.primary,

    gridTemplateColumns: "1fr 130px",
  });
  const P = styled("p", {
    fontSize: 11,
    margin: 0,
    color: theme.colors.accessible,
  });

  return (
    <>
      <Title
        as="h2"
        css={{ color: theme.colors.primary, marginBottom: theme.space[25] }}
      >
        {title}
      </Title>
      <Container className="content-start">
        <P>{children}</P>
        <ButtonPop
          hideSearch={hideSearch}
          setInFigma={setInFigma}
          command={command}
          tokens={tokens}
        />
      </Container>
    </>
  );
}
