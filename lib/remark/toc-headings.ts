import { visit } from "unist-util-visit";
import GitHubSlugger from "github-slugger";
import { toString } from "hast-util-to-string";
import { Pluggable } from "unified";

export default function remarkTocHeadings(options: any): Pluggable {
  return (tree: any) =>
    visit(tree, "heading", (node) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: "#" + GitHubSlugger.slug(textContent),
        depth: (node as any).depth,
      });
    });
}
