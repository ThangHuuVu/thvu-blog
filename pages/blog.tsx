import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import { InferGetStaticPropsType } from "next";
import { getAllBlogPosts } from "@/lib/db";

export async function getStaticProps() {
  const posts = await getAllBlogPosts();

  return { props: { posts }, revalidate: 60 };
}

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} title="All Posts" />
    </>
  );
}
