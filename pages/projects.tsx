import siteMetadata from "@/data/siteMetadata";
import Card from "@/components/Card";
import { PageSEO } from "@/components/SEO";
import { getAllProjects } from "@/lib/cms/datocms";
import { InferGetStaticPropsType } from "next";
import PageTitle from "@/components/PageTitle";

export default function Projects({ allProjects }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Projects</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl">
          Products I helped launch and projects I built for my hobbies or personal needs.
        </p>
      </div>
      <div className="container py-12">
        <div className="flex flex-wrap -m-4">
          {allProjects.map(({ title, description, cover, url }) => (
            <Card
              key={title}
              title={title}
              description={description}
              imgSrc={cover.url}
              href={url}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const allProjects = (await getAllProjects(preview)) || [];

  return {
    props: { allProjects },
    revalidate: 60,
  };
};
