import fetcher from "@/lib/fetcher";
import { useDarkTheme } from "@/lib/hooks/useDarkTheme";
import { Skill } from "@/lib/types/skill";
import { useSession } from "next-auth/client";
import React from "react";
import SkillCard from "./SkillCard";
import useSWR from "swr";
import LoginView from "../LoginView";
import ErrorMessage from "../ErrorMessage";

interface Props {
  fallbackData: Skill[];
}

export default function Skills({ fallbackData }: Props) {
  const [session] = useSession();
  const [isDark] = useDarkTheme();
  const { data: skills, error } = useSWR<Skill[]>("/api/skill", fetcher, { fallbackData });

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      <LoginView message="Login to give endorsements." />
      <div className="mb-10">
        <p>Click on a skill you think I'm good at!</p>
        {error && (
          <ErrorMessage>
            An unexpected error occurred. The entries are not available for now. Please try again
            later
          </ErrorMessage>
        )}
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} user={session?.user} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}
