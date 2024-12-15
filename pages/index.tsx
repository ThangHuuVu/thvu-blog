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
              const { slug, title } = frontMatter;
              return <InternalCard key={slug} href={`/blog/${slug}`} title={title} />;
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
