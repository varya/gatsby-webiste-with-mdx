import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Container, LeftSide, Content, RightSide } from "./Layout--elements";
import Prompt from "../Prompt";
import Article from "../Article";
import TextBlock from "../TextBlock";

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Container>
      <Content>
        <Article>
          <TextBlock title={mdx.frontmatter.title} subTitle={mdx.frontmatter.subTitle} readingTime={mdx.fields.readingTime}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </TextBlock>
        </Article>
      </Content>
      <RightSide>1</RightSide>
      <LeftSide>
        <Prompt />
      </LeftSide>
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
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
  }
`
