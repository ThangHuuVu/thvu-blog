import { auth } from "auth";
import Badge from "./Badge";
import { getAllSkillsByCategory } from "@/lib/db";

export default async function Skills() {
  const skillsByCategory = await getAllSkillsByCategory();
  const session = await auth();

  return (
    <div>
      {skillsByCategory && (
        <div className="mb-10">
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">Skills</h2>
            <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
              {skillsByCategory.map((category) => (
                <div key={category.name}>
                  <h4>{category.name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row auto-rows-auto gap-2">
                    {category?.skills?.map((skill) => (
                      <Badge
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
      )}
    </div>
  );
}
