import React from "react"
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint'

import Typography from "../Typography";
import Header from "../Header";
import Footer from "../Footer/";
import { Container, LeftSide, Content, RightSide } from "./Layout--elements";
import Prompt from "../Prompt";

export const SiteContainer = styled.div`
  ${breakpoint('desktop') `
    max-width: 1200px;
    margin: 0 auto;
  `}
`

const googleAnalytics = `
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-128056453-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-128056453-1');
</script>
`;

export default function LayoutCommon({
    content,
    right,
    left,
    location,
  }) {
  left = left || <Prompt/>
  return (<StaticQuery
    query={graphql`
  query LayoutQuery {
    pages: allMdx(
      filter: { fileAbsolutePath: { regex: "//pages//" } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
            level
          }
          frontmatter {
            title
            menuTitle
          }
        }
      }
    }
  }
    `}
    render={(data) => {
      const {
        pages: { edges: pages }
      } = data;
      return (
        <>
          <SiteContainer>
            <Header path={location.pathname} pages={pages}/>
            <main>
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
            </main>
            <Footer />
          </SiteContainer>
          <div dangerouslySetInnerHTML={{ __html: googleAnalytics }} />
        </>
      )
    }}
    />
  )
}
