import { getSession } from "next-auth/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { GuestBookEntry } from "@/lib/types/guestbook";

const guestbookEntries = async (
  req: NextApiRequest,
  res: NextApiResponse<GuestBookEntry | string | {}>
) => {
  const { user } = await getSession({ req });
  const { id } = req.query;

  const entry = await prisma.guestbook.findUnique({
    where: {
      id: Number(id),
    },
    select: { id: true, body: true, created_by: true, updated_at: true },
  });

  if (!user || user.name !== entry.created_by) {
    return res.status(403).send("Unauthorized");
  }
  if (req.method === "GET") {
    return res.json({
      id: entry.id.toString(),
      body: entry.body,
      created_by: entry.created_by,
      updated_at: entry.updated_at,
    });
  }

  if (req.method === "DELETE") {
    await prisma.guestbook.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).json({});
  }

  if (req.method === "PUT") {
    const body = (req.body.body || "").slice(0, 500);
    await prisma.guestbook.update({
      where: {
        id: Number(id),
      },
      data: {
        body,
        updated_at: new Date().toISOString(),
      },
    });

    return res.status(201).json({
      ...entry,
      body,
    });
  }

  return res.send("Method not allowed.");
};

export default withSentry(guestbookEntries);
