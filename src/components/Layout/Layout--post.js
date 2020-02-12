import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Container, LeftSide, Content, RightSide } from "./Layout--elements";
import Prompt from "../Prompt";
import Article from "../Article";
import TextBlock from "../TextBlock";
import GithubEdit from "../GithubEdit";

import LayoutCommon from './Layout--common'

export default function PostTemplate({
    data: {
      mdx,
    },
    pageContext: {
      breadCrumbs,
      fileSourceUrl,
    },
    location,
  }) {
  return (
    <LayoutCommon
      content={(
        <>
        <Article>
          <TextBlock title={mdx.frontmatter.title} subTitle={mdx.frontmatter.subTitle} readingTime={mdx.fields.readingTime}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </TextBlock>
        </Article>
        <GithubEdit link={fileSourceUrl} />
        </>
      )}
      right=""
      left={(
        <Prompt />
      )}
      location={location}
      />
  )
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
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
