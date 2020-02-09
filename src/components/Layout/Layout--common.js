import React from "react"

import { Container, LeftSide, Content, RightSide } from "./Layout--elements";

export default function LayoutCommon({
    content,
    right,
    left
  }) {
  return (
    <Container>
      <Content>
        {content}
      </Content>
      <RightSide>
        {right}
      </RightSide>
      <LeftSide>
        {left}
      </LeftSide>
    </Container>
  )
}
