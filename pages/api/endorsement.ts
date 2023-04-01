import prisma from "@/lib/prisma";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).send("Unauthenticated");
    }
    const { skillId } = req.body;
    await prisma.endorsement.create({
      data: {
        skill_id: Number(skillId),
        userId: session.id as string,
      },
    });
    return res.status(200).json(true);
  }

  return res.send("Method not allowed.");
}

export default withSentry(handler);
