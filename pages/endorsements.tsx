import { PageSeo } from "@/components/SEO";
import React from "react";
import siteMetadata from "@/data/siteMetadata.json";
import PageTitle from "@/components/PageTitle";
import Endorsements from "@/components/Endorsements";
import { InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";

export async function getStaticProps() {
  const fallbackData = await prisma.skills.findMany();
  return {
    props: {
      fallbackData,
    },
  };
}
export default function EndorsementsPage({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSeo
        title={`Endorsements – ${siteMetadata.author}`}
        description={"THVu's Endorsements"}
        url={"https://thvu.dev/endorsements"}
      />

      <div className="flex flex-col justify-center items-start max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Endorsements</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl">
          Thank you for visiting! Since you're here, I invite you to consider giving me an
          endorsement based on the experience you had with me in tech.
        </p>
      </div>
      <Endorsements fallbackData={fallbackData} />
    </>
  );
}
