import prisma from "@/lib/prisma";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { skillId, endorseBy, email } = req.body;
    await prisma.endorsements.create({
      data: {
        skillId: Number(skillId),
        endorsed_by: endorseBy,
        email,
      },
    });
    return res.status(200).json(true);
  }

  return res.send("Method not allowed.");
}

export default withSentry(handler);
