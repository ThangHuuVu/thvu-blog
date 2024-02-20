import CustomLink from "@/components/CustomLink";
import { PageSEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import InternalCard from "@/components/InternalCard";
import siteMetadata from "@/data/siteMetadata";
import { InferGetStaticPropsType } from "next";
import { getAllBlogPosts } from "@/lib/db";

const MAX_DISPLAY = 2;

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  return {
    props: {
      recentPosts: posts.slice(0, MAX_DISPLAY),
    },
    revalidate: 60,
  };
};

export default function Home({ recentPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Hero />
      <h2 className="text-xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9">
        Latest blog posts
      </h2>
      {recentPosts.length === 0 ? (
        <p className="pt-8 text-lg leading-7 text-gray-500 dark:text-gray-400 prose dark:prose-dark xl:text-xl">
          No recent posts.
        </p>
      ) : (
        <>
          <div className="py-8 grid grid-cols-1 grid-rows-2 grid-flow-row sm:grid-rows-1 sm:grid-cols-2 justify-between gap-4">
            {recentPosts.map((frontMatter) => {
              const { slug, title, viewCount } = frontMatter;
              return (
                <InternalCard key={slug} href={`/blog/${slug}`} title={title}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 inline-block fill-current"
                  >
                    <g data-name="Layer 2">
                      <g data-name="eye">
                        <rect width="24" height="24" opacity="0" />
                        <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z" />
                        <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z" />
                      </g>
                    </g>
                  </svg>
                  {viewCount}
                </InternalCard>
              );
            })}
          </div>
        </>
      )}
      <div className="text-base font-medium leading-6 mb-8">
        <CustomLink
          href="/blog"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="all posts"
          title="All posts"
        >
          All Posts &rarr;
        </CustomLink>
      </div>
    </>
  );
}
