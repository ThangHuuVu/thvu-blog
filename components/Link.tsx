import Link from "next/link";
import React from "react";

const CustomLink = ({ href, ...rest }: React.LinkHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink || isAnchorLink) {
    return (
      <Link href={href}>
        <a {...rest}></a>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <a target="_blank" rel="noopener noreferrer" {...rest}></a>
    </Link>
  );
};

export default CustomLink;
