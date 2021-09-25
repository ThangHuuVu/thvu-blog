import fetcher from "@/lib/fetcher";
import { Skill } from "@/lib/types/skill";
import { useSession } from "next-auth/react";
import React from "react";
import SkillCard from "./SkillCard";
import useSWR from "swr";
import LoginView from "../LoginView";
import ErrorMessage from "../ErrorMessage";

interface Props {
  fallbackData: Skill[];
}

export default function Skills({ fallbackData }: Props) {
  const { data: session } = useSession();
  const { data: skills, error } = useSWR<Skill[]>("/api/skill", fetcher, { fallbackData });

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      <LoginView message="Login to give endorsements." />
      <div className="mb-10">
        {error && (
          <ErrorMessage>
            An unexpected error occurred. The entries are not available for now. Please try again
            later
          </ErrorMessage>
        )}
        <div className="mt-10">
          <h5 className="text-2xl font-bold leading-8 tracking-tight">Skills</h5>
          {Boolean(session) && <p>Click on a skill you think I'm good at!</p>}
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} user={session?.user} />
          ))}
        </div>
      </div>
    </div>
  );
}
