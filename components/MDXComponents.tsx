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
  // @ts-expect-error
  CodePen,
  // @ts-expect-error
  Tweet,
  TOCInline,
  // @ts-expect-error
  a: CustomLink,
  // @ts-expect-error
  pre: Pre,
  wrapper: PostLayout,
};

export const MDXLayoutRenderer = ({
  layout,
  mdxSource,
  ...rest
}: {
  layout: any;
  mdxSource: string;
  [key: string]: any;
}) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
