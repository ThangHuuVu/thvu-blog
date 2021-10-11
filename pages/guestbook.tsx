import Guestbook from "@/components/guestbook/Guestbook";
import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import PageViews from "@/components/metric/PageViews";
import { InferGetStaticPropsType } from "next";
import PageTitle from "@/components/PageTitle";
import CustomLink from "@/components/CustomLink";
import { getGuestbookEntries } from "@/lib/db";

export default function GuestbookPage({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Guestbook – ${siteMetadata.author}`}
        description={"Share some wisdom with my future visitors."}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Guestbook</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl">
          An artifact of the 90's webs. Leave a comment below for my future visitors. Feel free to
          write anything!
        </p>
      </div>
      <div className="flex flex-col item-center gap-4 pb-8">
        <Guestbook fallbackData={fallbackData} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-dark">
        This page is inspired by{" "}
        <CustomLink href="https://leerob.io/guestbook">Lee Robinson's guestbook.</CustomLink>
      </p>
      <PageViews />
    </>
  );
}

export const getStaticProps = async () => {
  const entries = await getGuestbookEntries();

  return {
    props: {
      fallbackData: entries,
    },
    revalidate: 60,
  };
};
