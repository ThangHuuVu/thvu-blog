import { getSession } from "next-auth/react";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { GuestBookEntry } from "@/lib/types/guestbook";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GuestBookEntry[] | string | GuestBookEntry>
) => {
  if (req.method === "GET") {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: "desc",
      },
      select: { id: true, body: true, created_by: true, updated_at: true },
    });

    return res.json(
      entries.map<GuestBookEntry>((entry) => ({
        id: entry.id.toString(),
        body: entry.body,
        created_by: entry.created_by,
        updated_at: entry.updated_at.toString(),
      }))
    );
  }
  const { user } = await getSession({ req });
  if (!user) {
    return res.status(403).send("Unauthorized");
  }

  if (req.method === "POST") {
    const body = (req.body.body || "").slice(0, 500);
    const newEntry = await prisma.guestbook.create({
      data: {
        email: user.email || "not@provided.com",
        body,
        created_by: user.name,
      },
    });

    return res.status(200).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      created_by: newEntry.created_by,
      updated_at: newEntry.updated_at.toString(),
    });
  }

  return res.send("Method not allowed.");
};

export default withSentry(handler);
