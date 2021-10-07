import Image from "next/image";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
import CustomLink from "./CustomLink";
import TOCInline from "./TOCInline";
import Pre from "./Pre";
import { CodePen, Tweet } from "mdx-embed";
import { useMemo } from "react";
import { Container } from "@/lib/types/common";

interface WrapperProps extends Container {
  layout: string;
}

const wrapper = ({ layout, ...rest }: WrapperProps) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
};

export const MDXComponents: ComponentMap = {
  Image,
  CodePen,
  Tweet,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper,
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
