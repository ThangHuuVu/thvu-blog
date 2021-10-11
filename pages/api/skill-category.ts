import prisma from "@/lib/prisma";
import { Skill, SkillCategory } from "@/lib/types/skill";
import { User } from "@/lib/types/user";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<SkillCategory[] | string>) {
  if (req.method === "GET") {
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
    return res.status(200).json(
      skillsByCategory.map<SkillCategory>((category) => ({
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
      }))
    );
  }
  return res.send("Method not allowed.");
}

export default withSentry(handler);
