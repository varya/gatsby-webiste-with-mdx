import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Container, LeftSide, Content, RightSide } from "./Layout--elements";

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Container>
      <Content>
        <h1>{mdx.frontmatter.title}</h1>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Content>
      <RightSide>1</RightSide>
      <LeftSide>2</LeftSide>
    </Container>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
