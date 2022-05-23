import CustomLink from "@/components/CustomLink";
import { PageSEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import InternalCard from "@/components/InternalCard";
import siteMetadata from "@/data/siteMetadata";
import { InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";
import { getAllProjects } from "@/lib/cms/datocms";
import { getAllBlogPosts } from "@/lib/db";

const MAX_DISPLAY = 2;

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getAllBlogPosts();
  let projectCount = 0;
  let endorsementCount = 0;
  let guestbookEntryCount = 0;

  try {
    const allProjects = (await getAllProjects(preview)) || [];
    projectCount = allProjects.length;
    endorsementCount = await prisma.endorsement.count();
    guestbookEntryCount = await prisma.guestbook.count();
  } catch (error) {
    console.error("Error getting stats: ", error);
  }

  return {
    props: {
      recentPosts: posts.slice(0, MAX_DISPLAY),
      endorsementCount,
      guestbookEntryCount,
      projectCount,
    },
    revalidate: 60,
  };
};

export default function Home({
  recentPosts,
  guestbookEntryCount,
  endorsementCount,
  projectCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <h2 className="text-xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9">
        Showcase
      </h2>
      <div className="py-8 grid grid-cols-1 grid-rows-3 grid-flow-row sm:grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
        <InternalCard href={`/endorsements`} title="Endorsements">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 inline-block fill-current"
          >
            <g data-name="Layer 2">
              <g data-name="award">
                <rect width="24" height="24" opacity="0" />
                <path d="M19 20.75l-2.31-9A5.94 5.94 0 0 0 18 8 6 6 0 0 0 6 8a5.94 5.94 0 0 0 1.34 3.77L5 20.75a1 1 0 0 0 1.48 1.11l5.33-3.13 5.68 3.14A.91.91 0 0 0 18 22a1 1 0 0 0 1-1.25zM12 4a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm.31 12.71a1 1 0 0 0-1 0l-3.75 2.2L9 13.21a5.94 5.94 0 0 0 5.92 0L16.45 19z" />
              </g>
            </g>
          </svg>
          {endorsementCount} endorsements
        </InternalCard>
        <InternalCard href={`/guestbook`} title="Guestbook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 inline-block fill-current"
          >
            <g data-name="Layer 2">
              <g data-name="book-open">
                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                <path d="M20.62 4.22a1 1 0 0 0-.84-.2L12 5.77 4.22 4A1 1 0 0 0 3 5v12.2a1 1 0 0 0 .78 1l8 1.8h.44l8-1.8a1 1 0 0 0 .78-1V5a1 1 0 0 0-.38-.78zM5 6.25l6 1.35v10.15L5 16.4zM19 16.4l-6 1.35V7.6l6-1.35z" />
              </g>
            </g>
          </svg>
          {guestbookEntryCount} entries
        </InternalCard>
        <InternalCard href={`/projects`} title="Projects">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 inline-block fill-current"
          >
            <g data-name="Layer 2">
              <g data-name="cube">
                <rect width="24" height="24" opacity="0" />
                <path d="M20.66 7.26c0-.07-.1-.14-.15-.21l-.09-.1a2.5 2.5 0 0 0-.86-.68l-6.4-3a2.7 2.7 0 0 0-2.26 0l-6.4 3a2.6 2.6 0 0 0-.86.68L3.52 7a1 1 0 0 0-.15.2A2.39 2.39 0 0 0 3 8.46v7.06a2.49 2.49 0 0 0 1.46 2.26l6.4 3a2.7 2.7 0 0 0 2.27 0l6.4-3A2.49 2.49 0 0 0 21 15.54V8.46a2.39 2.39 0 0 0-.34-1.2zm-8.95-2.2a.73.73 0 0 1 .58 0l5.33 2.48L12 10.15 6.38 7.54zM5.3 16a.47.47 0 0 1-.3-.43V9.1l6 2.79v6.72zm13.39 0L13 18.61v-6.72l6-2.79v6.44a.48.48 0 0 1-.31.46z" />
              </g>
            </g>
          </svg>
          {projectCount} projects
        </InternalCard>
      </div>
    </>
  );
}
