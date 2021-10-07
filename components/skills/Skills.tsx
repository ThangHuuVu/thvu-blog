import fetcher from "@/lib/fetcher";
import { SkillCategory } from "@/lib/types/skill";
import { useSession } from "next-auth/react";
import SkillBadge from "./SkillBadge";
import useSWR from "swr";
import LoginView from "../LoginView";
import ErrorMessage from "../ErrorMessage";

interface Props {
  fallbackData: SkillCategory[];
}

export default function Skills({ fallbackData }: Props) {
  const { data: session } = useSession();
  const { data: categories, error } = useSWR<SkillCategory[]>("/api/skill-category", fetcher, {
    fallbackData,
  });

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
        <div className="mt-10 space-y-4">
          <h5 className="text-2xl font-bold leading-8 tracking-tight">Skills</h5>
          <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
            {categories.map((category) => (
              <div key={category.name}>
                <h4>{category.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row auto-rows-auto gap-2">
                  {category?.skills?.map((skill) => (
                    <SkillBadge
                      key={skill.id}
                      skill={skill}
                      user={session?.user}
                      currentUserId={session?.id as string}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
