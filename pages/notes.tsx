import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import { getPublishedNotes } from "@/lib/notion";
import ExternalCard from "@/components/ExternalCard";
import { InferGetStaticPropsType } from "next";
import PageTitle from "@/components/PageTitle";

interface NotionPublish {
  title: string;
  description: string;
  cover: string;
  url: string;
  tags: string[];
}

export default function Notes({ notionPublishes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Notes from Notion - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Notes from Notion</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl prose dark:prose-dark">
          My most recent Notion notes & templates.
        </p>
      </div>
      <div className="container py-12">
        <div className="flex flex-wrap -m-4">
          {notionPublishes.map((publish) => (
            <ExternalCard
              key={publish.title}
              title={publish.title}
              description={publish.description}
              imgSrc={publish.cover}
              href={publish.url}
              tags={publish.tags}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const results = (await getPublishedNotes()) || [];
  const notionPublishes = results.map<NotionPublish>((publish) => ({
    title: publish.properties.Name["title"][0].text.content,
    description: publish.properties.Description["rich_text"][0].text.content,
    cover: publish.properties.Cover["rich_text"][0].href,
    url: publish.properties.Page["rich_text"][0].href,
    tags: publish.properties.Tags["multi_select"].map((tag) => tag.name),
  }));
  return {
    props: { notionPublishes },
    revalidate: 10,
  };
};
