import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import getAllFilesRecursively from "./utils/files";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkCodeTitles from "./remark/code-title";
import remarkTocHeadings from "./remark/toc-headings";
import remarkImgToJsx from "./remark/img-to-jsx";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import { TocHeading } from "@/components/TOCInline";
const root = process.cwd();

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
  date: string | null;
  url: string;
  tags: string[];
  images: string[];
  lastModified: string;
  draft: boolean;
  slug: string | null;
  viewCount?: string;
  layout: string;
}

export interface EnhancedFrontMatter extends FrontMatter {
  readingMinutes: number;
  fileName: string;
}

type FileBySlug = {
  mdxSource: string;
  toc: TocHeading[];
  frontMatter: EnhancedFrontMatter;
};

export async function getFileBySlug(type, slug): Promise<FileBySlug> {
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  let toc = [];

  const { frontmatter, code } = await bundleMDX(source, {
    // mdx imports can be automatically source from the components directory
    cwd: path.join(process.cwd(), "components"),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkImgToJsx,
      ] as any;
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true }],
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
        ".ts": "tsx",
      };
      return options;
    },
  });

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingMinutes: readingTime(code).minutes,
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...(frontmatter as FrontMatter),
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  };
}

export async function getAllFilesFrontMatter(folder: string): Promise<FrontMatter[]> {
  const prefixPaths = path.join(root, "data", folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter = [];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data } = matter(source);
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(fileName) });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}
