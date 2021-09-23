import prisma from "@/lib/prisma";
import { Skill } from "@/lib/types/skill";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Skill[] | string>) {
  const skills = await prisma.skills.findMany({
    include: {
      endorsements: true,
    },
  });
  if (req.method === "GET") {
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
