import Link from "@/components/Link";
import { PageSeo } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata.json";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { InferGetStaticPropsType } from "next";

const MAX_DISPLAY = 5;

export const getStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
};

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className=" mt-16 pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Hey, I'm Thắng{" "}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 prose dark:prose-dark xl:text-xl">
          I'm a software engineer located in HCMC, Vietnam{" "}
          <span role="img" aria-label="waving hand">
            🇻🇳
          </span>
          . My specialties are Front-end engineering and{" "}
          <Link href="https://certificate.algoexpert.io/SystemsExpert%20Certificate%20SE-6cf6929239">
            system designs
          </Link>
          . While you're here, you can <Link href="/about">get acquainted</Link>, or{" "}
          <Link href="/guestbook">sign my guestbook</Link>!
        </p>
        {posts.length == 0 && (
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 prose dark:prose-dark xl:text-xl">
            No posts yet. While you're here, you can <Link href="/about">get acquainted</Link>, or{" "}
            <Link href="/guestbook">sign my guestbook</Link>!
          </p>
        )}
      </div>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Latest blog-posts
      </h1>
      {posts.length > 0 && (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(siteMetadata.locale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
