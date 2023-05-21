import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { GuestBookEntry } from "@/lib/types/guestbook";
import { auth } from "auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GuestBookEntry[] | { error: string } | GuestBookEntry>
) => {
  if (req.method === "GET") {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: "desc",
      },
      select: { id: true, body: true, updated_at: true, user: true },
    });

    return res.json(
      entries.map<GuestBookEntry>((entry) => ({
        id: entry.id.toString(),
        body: entry.body,
        updated_at: entry.updated_at.toString(),
        user: {
          id: entry.user!.id,
          name: entry.user!.name!,
          image: entry.user!.image!,
        },
      }))
    );
  }
  if (req.method === "POST") {
    const session = await auth(req, res);
    if (!session) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const { user } = session;

    if (!user?.id) {
      return res.status(403).send({ error: "Unauthorized" });
    }

    const body = (req.body.body || "").slice(0, 500);
    const newEntry = await prisma.guestbook.create({
      data: {
        body,
        userId: user.id,
      },
    });
    const guestbookEntry: GuestBookEntry = {
      id: newEntry.id.toString(),
      body: newEntry.body,
      updated_at: newEntry.updated_at.toString(),
      user: {
        id: user.id,
        name: user.name!,
        image: user.image!,
      },
    };

    return res.status(200).json(guestbookEntry);
  }

  return res.send({ error: "Method not allowed." });
};

export default withSentry(handler);
