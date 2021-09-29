import { getAllFilesFrontMatter } from "@/lib/mdx";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import { InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");
  const viewCountBySlug = (await prisma.view.findMany()).reduce((obj, view) => {
    obj[view.slug] = view.count.toString();
    return obj;
  }, {});

  posts.forEach((post) => (post.viewCount = viewCountBySlug[post.slug]));

  return { props: { posts } };
}

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} title="All Posts" />
    </>
  );
}
