import db from "@/lib/planetscale";
import { getSession } from "next-auth/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Type this with Prisma
const guestbookIndex = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method === "GET") {
    const [rows] = await db.query(
      `
    SELECT id, body, created_by, updated_at FROM guestbook
    ORDER BY updated_at DESC;
  `,
      []
    );

    return res.json(rows);
  }

  if (req.method === "POST") {
    const { user } = session;
    if (!user) {
      return res.status(403).send("Unauthorized");
    }

    const body = (req.body.body || "").slice(0, 500);
    const [insert] = await db.query(
      `
      INSERT INTO guestbook (email, body, created_by)
      VALUES (?, ?, ?);
    `,
      [user.email || "not@provided.com", body, user.name]
    );

    const [rows] = await db.query(
      `
      SELECT id, body, created_by, updated_at FROM guestbook
      WHERE id = ?;
    `,
      [insert.insertId]
    );

    return res.status(200).json(rows[0]);
  }

  return res.send("Method not allowed.");
};

export default withSentry(guestbookIndex);
