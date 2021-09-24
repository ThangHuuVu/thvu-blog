import Image from "next/image";
import { getMDXComponent } from "mdx-bundler/client";
import CustomLink from "./Link";
import TOCInline from "./TOCInline";
import Pre from "./Pre";
import { CodePen } from "mdx-embed";
import { useMemo } from "react";

const wrapper = ({ components, layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
};

export const MDXComponents: any = {
  Image,
  CodePen,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper,
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
