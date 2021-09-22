import Image from "next/image";
import CustomLink from "./Link";
import { CodePen } from "mdx-embed";

const MDXComponents = {
  Image,
  CodePen,
  a: CustomLink,
};

export default MDXComponents;
