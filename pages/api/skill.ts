import prisma from "@/lib/prisma";
import { Skill } from "@/lib/types/skill";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Skill[] | string>) {
  if (req.method === "GET") {
    const skills = await prisma.skill.findMany({
      include: {
        endorsements: {
          include: {
            skill: true,
            user: true,
          },
        },
      },
    });
    return res.status(200).json(
      skills.map<Skill>((skill) => ({
        id: skill.id.toString(),
        name: skill.name,
        users: [
          ...new Set(
            skill.endorsements.map((en) => ({
              id: en.user.id,
              name: en.user.name,
              image: en.user.image,
            }))
          ),
        ],
      }))
    );
  }
  return res.send("Method not allowed.");
}

export default withSentry(handler);
