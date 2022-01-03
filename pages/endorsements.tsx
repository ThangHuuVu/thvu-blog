import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import PageTitle from "@/components/PageTitle";
import Skills from "@/components/skills/Skills";
import { InferGetStaticPropsType } from "next";
import { getAllSkillsByCategory } from "@/lib/db";

export async function getStaticProps() {
  const skillsByCategory = await getAllSkillsByCategory();

  return {
    props: {
      fallbackData: skillsByCategory,
    },
    revalidate: 60,
  };
}
export default function EndorsementsPage({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Endorsements – ${siteMetadata.author}`}
        description={"THVu's Endorsements"}
      />

      <div className="flex flex-col items-start justify-center max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Endorsements</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl">
          Since you're here, I invite you to give me endorsement(s) based on the experience you had
          with me in tech.
        </p>
      </div>
      <Skills fallbackData={fallbackData} />
    </>
  );
}
