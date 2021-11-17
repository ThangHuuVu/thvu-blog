import siteMetadata from "@/data/siteMetadata";
import Link from "next/link";
import PageTitle from "./PageTitle";

export default function Hero() {
  return (
    <div className="flex flex-col justify-around w-full h-content sm:h-content-sm">
      <h1 className="my-28 sm:my-10 text-center select-none text-6xl sm:text-8.5xl leading-none tracking-tightest font-extrabold">
        <span
          data-content="Blog."
          className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-black dark:before:text-white before:animate-gradient-background-1"
        >
          <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1">
            Blog.
          </span>
        </span>
        <span
          data-content="Showcase."
          className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-black dark:before:text-white before:animate-gradient-background-2"
        >
          <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2">
            Showcase.
          </span>
        </span>
        <span
          data-content="Portfolio."
          className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-black dark:before:text-white before:animate-gradient-background-3"
        >
          <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3">
            Portfolio.
          </span>
        </span>
      </h1>
      <div className="space-y-2 md:space-y-5">
        <PageTitle>
          Xin chào! I'm Thắng{" "}
          <span role="img" aria-label="waving hand" className="wave">
            👋
          </span>
        </PageTitle>
        <p className="text-lg leading-7 prose text-gray-500 max-w-none dark:text-gray-400">
          I am a full stack software engineer with a strong focus in front-end and system design.{" "}
          <Link href={`mailto:${siteMetadata.email}`}>
            <a
              className="font-medium leading-6 "
              aria-label={`Email to ${siteMetadata.email}`}
              title={`Email to ${siteMetadata.email}`}
            >
              Get in touch &rarr;
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
