const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {

    const { createNodeField } = actions;

    if (node.internal.type === "Mdx") {
      let slug = createFilePath({ node, getNode, basePath: `pages` });

      const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
      const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

      const newSlug = `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`;

      createNodeField({
        node,
        name: `slug`,
        value: newSlug,
      });
    }

}

exports.createPages = async ({ graphql, actions, reporter }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMdx {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `)
    if (result.errors) {
      reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }
    // Create blog post pages.
    const items = result.data.allMdx.edges
    // you'll call `createPage` for each result
    items.forEach(({ node }, index) => {
      createPage({
        // This is the slug you created before
        // (or `node.frontmatter.slug`)
        path: node.fields.slug,
        // This component will wrap our MDX content
        component: path.resolve(`./src/components/Layout/Layout--common.js`),
        // You can use the values in this context in
        // our page layout component
        context: { id: node.id },
      })
    })
  }
