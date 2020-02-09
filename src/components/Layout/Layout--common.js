import React from "react"

import { Container, LeftSide, Content, RightSide } from "./Layout--elements";
import Prompt from "../Prompt";

export default function LayoutCommon({
    content,
    right,
    left
  }) {
  left = left || <Prompt/>
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
