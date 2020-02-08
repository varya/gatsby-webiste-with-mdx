const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`);

const REPO_URL = 'https://github.com/varya/varya.github.com';
const REPO_BRANCH = 'develop';``

exports.onCreateNode = ({ node, getNode, actions }) => {

    const { createNodeField } = actions;

    if (node.internal.type === "Mdx") {
      const fileNode = getNode(node.parent);
      let slug = createFilePath({ node, getNode, basePath: `pages` });

      const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
      const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

      const newSlug = `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`;

      createNodeField({
        node,
        name: `slug`,
        value: newSlug,
      });

      createNodeField({
        node,
        name: 'fileRelativePath',
        value: fileNode.relativePath,
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
              fileAbsolutePath
              fields {
                slug
                fileRelativePath
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

    const pages = items.filter(item => /pages/.test(item.node.fileAbsolutePath));

    // you'll call `createPage` for each result
    pages.forEach(({ node }, index) => {
      const slug = node.fields.slug;

      let breadCrumbs = [];
      /* making bread crumbs */
      if (node.fields.level > 1) {
        const slugItems = node.fields.slug.split('/').filter(item => item !== '');
        slugItems.reduce((acc, val) => {
          /* find parent page */
          const p = pages.find(item => item.node.fields.slug === acc) || {
            node: {
              fields: {
              slug: '/'
              },
            frontmatter: {
              title: 'Home'
              }
            }
          }
          breadCrumbs.push(p);
          return acc + val + '/';
        }, '/')
        breadCrumbs.push({node, last: true});
      }

      const fileSourceUrl = `${REPO_URL}/edit/${REPO_BRANCH}/content/pages/${node.fields.fileRelativePath}`;

      createPage({
        // This is the slug you created before
        // (or `node.frontmatter.slug`)
        path: node.fields.slug,
        // This component will wrap our MDX content
        component: path.resolve(`./src/components/Layout/Layout--common.js`),
        // You can use the values in this context in
        // our page layout component
        context: {
          id: node.id,
          slug,
          breadCrumbs,
          fileSourceUrl,
        },
      })
    })
  }
