import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";

const MAX_DISPLAY = 2;

export const getStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("blog");
  const viewCountBySlug = (await prisma.view.findMany()).reduce((obj, view) => {
    obj[view.slug] = view.count.toString();
    return obj;
  }, {});

  posts.forEach((post) => (post.viewCount = viewCountBySlug[post.slug] || "0"));

  return { props: { recentPosts: posts.slice(0, MAX_DISPLAY) } };
};

export default function Home({ recentPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Hero />
      {recentPosts.length == 0 && (
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 prose dark:prose-dark xl:text-xl">
          No posts yet.
        </p>
      )}
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        Latest blog posts
      </h1>
      {recentPosts.length > 0 && (
        <div className="py-12 grid grid-cols-1 grid-rows-2 grid-flow-row sm:grid-rows-1 sm:grid-cols-2 justify-between gap-8">
          {recentPosts.map((frontMatter) => {
            const { slug, title, viewCount } = frontMatter;
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className=" w-full flex flex-col justify-between row-span-1 p-4 border-4 border-solid rounded-lg border-black dark:border-white transform hover:scale-[1.02] hover:border-primary-600 dark:hover:border-primary-400"
              >
                <h4 className="text-lg font-bold leading-4 tracking-tight">{title}</h4>
                <div className="pt-4 text-sm prose text-gray-500 max-w-none dark:text-gray-400">
                  {viewCount} views
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <div className="text-base font-medium leading-6">
        <Link
          href="/blog"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="all posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </>
  );
}
