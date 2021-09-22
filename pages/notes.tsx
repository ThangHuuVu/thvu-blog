import siteMetadata from '@/data/siteMetadata.json';
import { PageSeo } from '@/components/SEO';
import { getPublishedNotes } from '@/lib/notion';
import Card from '@/components/Card';
import Link from '@/components/Link';
import { InferGetStaticPropsType } from 'next';

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
      <PageSeo
        title={`Notes from Notion - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/notes`}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Notes from Notion
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl prose dark:prose-dark">
          My most recent <Link href={siteMetadata.notion}>Notion</Link> notes & templates.
        </p>
      </div>
      <div className="container py-12">
        <div className="flex flex-wrap -m-4">
          {notionPublishes.map((publish) => (
            <Card
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
    title: publish.properties.Name['title'][0].text.content,
    description: publish.properties.Description['rich_text'][0].text.content,
    cover: publish.cover['external'].url,
    url: publish.properties.Page['rich_text'][0].href,
    tags: publish.properties.Tags['multi_select'].map((tag) => tag.name),
  }));
  return {
    props: { notionPublishes },
    revalidate: 10,
  };
};
