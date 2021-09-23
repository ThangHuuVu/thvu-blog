import fetcher from "@/lib/fetcher";
import { Skill } from "@/lib/types/skill";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import CustomLink from "../Link";
import SkillCard from "./SkillCard";

export default function Skills({ fallbackData }: { fallbackData: Skill[] }) {
  const [session] = useSession();
  const router = useRouter();
  const { data: entries } = useSWR<Skill[]>("/api/skill", fetcher, { fallbackData });

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      {Boolean(session) || (
        <div className="mb-10 border-2 border-blue-200 dark:border-blue-800 rounded-md p-6 prose dark:prose-dark lg:prose-xl">
          <p>Please login first to leave endorsements.</p>
          <button
            className="px-4 py-2 flex items-center justify-center my-4 font-semibold text-base bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
            onClick={() => {
              router.push("/auth/signin");
            }}
          >
            Login
          </button>
          <p>I only use your name to display here.</p>
        </div>
      )}
      <div className="mb-10">
        {Boolean(session) && (
          <p>
            Endorsing as <strong>{session.user.name}.</strong>{" "}
            <CustomLink
              className="font-semibold"
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Log out
            </CustomLink>
          </p>
        )}
        <p>Click on a skill you think I'm good at!</p>
        {entries.map((skill) => (
          <SkillCard key={skill.id} skill={skill} user={session?.user} />
        ))}
      </div>
    </div>
  );
}
