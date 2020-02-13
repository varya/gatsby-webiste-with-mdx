import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx"

import TextBlock from "../TextBlock";

const Post = props => {
  const {
    post,
    post: {
      frontmatter: { title },
      fields: { readingTime }
    },
  } = props;

  return (
    <div>
      <TextBlock
        title={title}
        readingTime={readingTime}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </TextBlock>
    </div>
  );
};

export default Post;
