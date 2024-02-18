import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import PageTitle from "@/components/PageTitle";
import Skills from "@/components/Skills";
import { getAllSkillsByCategory, getGuestbookEntries } from "@/lib/db";
import CustomLink from "@/components/CustomLink";
import Guestbook from "@/components/Guestbook";
import LoginView from "@/components/LoginView";
import { auth } from "auth";

export default async function EndorsementsPage() {
  const skillsByCategory = await getAllSkillsByCategory();
  const entries = await getGuestbookEntries();
  const session = await auth();

  return (
    <>
      <PageSEO
        title={`Endorsements – ${siteMetadata.author}`}
        description={"THVu's Endorsements"}
      />

      <div className="flex flex-col items-start justify-center max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Endorsements</PageTitle>
        <div className="prose dark:prose-dark">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl">
            Since you're here, I invite you to give me endorsement(s) based on the experience you
            had with me in tech. You could also leave a comment ✍️ below.
          </p>
        </div>
      </div>
      <div className="space-y-16 prose dark:prose-dark">
        <LoginView />
        <Skills fallbackData={skillsByCategory} session={session} />
        <Guestbook fallbackData={entries} session={session} />
      </div>
      <div className="mt-16">
        <p className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-dark">
          This page is inspired by{" "}
          <CustomLink href="https://leerob.io/guestbook">Lee Robinson's guestbook.</CustomLink>
        </p>
      </div>
    </>
  );
}