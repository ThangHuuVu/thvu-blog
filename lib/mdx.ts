import MDXComponents from "@/components/MDXComponents";
import fs from "fs";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import path from "path";
import readingTime from "reading-time";
import visit from "unist-util-visit";
import imgToJsx from "./img-to-jsx";
import getAllFilesRecursively from "./utils/files";

const root = process.cwd();

const tokenClassNames = {
  tag: "text-code-red",
  "attr-name": "text-code-yellow",
  "attr-value": "text-code-green",
  deleted: "text-code-red",
  inserted: "text-code-green",
  punctuation: "text-code-white",
  keyword: "text-code-purple",
  string: "text-code-green",
  function: "text-code-blue",
  boolean: "text-code-red",
  comment: "text-gray-400 italic",
};

export function getFiles(type: string) {
  const prefixPaths = path.join(root, "data", type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root
  return files.map((file) => file.slice(prefixPaths.length + 1));
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export interface FrontMatter {
  title: string;
  summary: string;
  date: string;
  url: string;
  tags: string[];
  images: string[];
  lastModified: string;
  draft: boolean;
}

export interface EnhancedFrontMatter extends FrontMatter {
  wordCount: number;
  readingMinutes: number;
  slug: string | null;
  fileName: string;
}

type FileBySlug = {
  mdxSource: MdxRemote.Source;
  frontMatter: EnhancedFrontMatter;
};

export async function getFileBySlug(type, slug): Promise<FileBySlug> {
  const mdxPath = path.join(root, "data", type, `${slug.join("/")}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug.join("/")}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        require("remark-autolink-headings"),
        require("remark-code-titles"),
        require("remark-math"),
        imgToJsx,
      ],
      rehypePlugins: [
        require("rehype-katex"),
        require("@mapbox/rehype-prism"),
        () => {
          return (tree) => {
            visit(tree, "element", (node, index, parent) => {
              let [token, type] = (node.properties as any).className || [];
              if (token === "token") {
                (node.properties as any).className = [tokenClassNames[type]];
              }
            });
          };
        },
      ],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingMinutes: readingTime(content).minutes,
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...(data as FrontMatter),
    },
  };
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, "data", folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter = [];

  files.forEach((file) => {
    const fileName = file.slice(prefixPaths.length + 1);
    const source = fs.readFileSync(file, "utf8");
    const { data } = matter(source);
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(fileName) });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}
