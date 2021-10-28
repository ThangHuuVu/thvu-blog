import { getAllSkillsByCategory } from "@/lib/db";
import { SkillCategory } from "@/lib/types/skill";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<SkillCategory[] | string>) {
  if (req.method === "GET") {
    const skillsByCategory = await getAllSkillsByCategory();
    return res.status(200).json(skillsByCategory);
  }
  return res.send("Method not allowed.");
}

export default withSentry(handler);
