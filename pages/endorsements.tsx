import { PageSEO } from "@/components/SEO";
import React from "react";
import siteMetadata from "@/data/siteMetadata";
import PageTitle from "@/components/PageTitle";
import Skills from "@/components/skills/Skills";
import { InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";
import { Skill } from "@/lib/types/skill";

export async function getStaticProps() {
  const skills = await prisma.skills.findMany({
    include: {
      endorsements: true,
    },
  });

  return {
    props: {
      fallbackData: skills.map<Skill>((skill) => ({
        id: skill.id.toString(),
        name: skill.name,
        people: [...new Set(skill.endorsements.map((en) => en.endorsed_by))],
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
        url={"https://thvu.dev/endorsements"}
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
