import prisma from "@/lib/prisma";
import { Skill } from "@/lib/types/skill";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Skill[] | string>) {
  if (req.method === "GET") {
    const skills = await prisma.skill.findMany({
      include: {
        endorsements: true,
      },
    });
    return res.status(200).json(
      skills.map<Skill>((skill) => ({
        id: skill.id.toString(),
        name: skill.name,
        people: [...new Set(skill.endorsements.map((en) => en.endorsed_by))],
      }))
    );
  }
  return res.send("Method not allowed.");
}

export default withSentry(handler);
