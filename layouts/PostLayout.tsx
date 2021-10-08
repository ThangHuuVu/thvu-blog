import CustomLink from "@/components/CustomLink";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import Image from "next/image";
import useViewCounter from "@/lib/hooks/useViewCounter";
import { EnhancedFrontMatter } from "@/lib/mdx";
import { Container } from "@/lib/types/common";

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`;

interface PostLayoutProps extends Container {
  frontMatter: EnhancedFrontMatter;
  next: any;
  prev: any;
}

export default function PostLayout({ children, frontMatter, next, prev }: PostLayoutProps) {
  const { slug, fileName, date, title, tags, readingMinutes } = frontMatter;
  const roundedReadingMinutes = Math.round(readingMinutes);
  const viewCount = useViewCounter(slug);

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <span className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                {roundedReadingMinutes}{" "}
                {roundedReadingMinutes == 1 ? " minute " : " minutes " + " read - "}
                {viewCount}
              </span>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <Image
                      src={siteMetadata.image}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{siteMetadata.author}</dd>
                      <dt className="sr-only">Twitter</dt>
                      <dd>
                        <CustomLink
                          href={siteMetadata.twitter}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {siteMetadata.twitter.replace("https://twitter.com/", "@")}
                        </CustomLink>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">{children}</div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <CustomLink href={discussUrl(slug)} rel="nofollow">
                  {"Discuss on Twitter"}
                </CustomLink>
                {` • `}
                <CustomLink href={editUrl(fileName)}>{"View on GitHub"}</CustomLink>
              </div>
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <CustomLink href={`/blog/${prev.slug}`}>{prev.title}</CustomLink>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <CustomLink href={`/blog/${next.slug}`}>{next.title}</CustomLink>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <CustomLink
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back
                </CustomLink>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
