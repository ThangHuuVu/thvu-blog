import PageTitle from "@/components/PageTitle";
import generateRss from "@/lib/generate-rss";
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from "@/lib/mdx";
import fs from "fs";
import { InferGetStaticPropsType } from "next";
import { MDXLayoutRenderer } from "@/components/MDXComponents";

export async function getStaticPaths() {
  const posts = getFiles("blog");
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join("/"));
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", params.slug);

  // rss
  const rss = generateRss(allPosts);
  fs.writeFileSync("./public/feed.xml", rss);

  return { props: { post, prev, next } };
}
const DEFAULT_LAYOUT = "PostLayout";

export default function Blog({ post, prev, next }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = post;
  return (
    <>
      {!frontMatter.draft ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
