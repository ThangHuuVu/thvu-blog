import Image from "next/image";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
import CustomLink from "./CustomLink";
import TOCInline from "./TOCInline";
import Pre from "./Pre";
import { CodePen, Tweet } from "mdx-embed";
import { useMemo } from "react";
import PostLayout from "@/layouts/PostLayout";

export const MDXComponents: ComponentMap = {
  Image,
  CodePen,
  Tweet,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: PostLayout,
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
