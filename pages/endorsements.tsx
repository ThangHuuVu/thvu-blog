import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import PageTitle from "@/components/PageTitle";
import Skills from "@/components/skills/Skills";
import { InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";
import { Skill, SkillCategory } from "@/lib/types/skill";
import { User } from "@/lib/types/User";

export async function getStaticProps() {
  const skillsByCategory = await prisma.skillCategory.findMany({
    include: {
      skills_in_category: {
        include: {
          endorsements: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      fallbackData: skillsByCategory.map<SkillCategory>((category) => ({
        name: category.name,
        skills: category.skills_in_category.map<Skill>((skill) => ({
          id: skill.id.toString(),
          name: skill.name,
          users: skill.endorsements
            .filter((en) => en.userId)
            .map<User>((en) => ({
              id: en.user.id,
              name: en.user.name,
              image: en.user.image,
            })),
        })),
      })),
    },
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

      <div className="flex flex-col justify-center items-start max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
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
