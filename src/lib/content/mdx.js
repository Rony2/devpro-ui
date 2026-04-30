import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function compileMdx(source, components = {}) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
    components,
  });

  return content;
}

export function extractHeadings(source) {
  const lines = source.split("\n");
  return lines
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      return { id, text };
    });
}
