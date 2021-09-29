import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ total?: string; message?: string }>
) {
  const slug = req.query.slug.toString();
  try {
    if (req.method === "POST") {
      const newOrUpdatedViews = await prisma.view.upsert({
        where: { slug },
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString(),
      });
    }

    if (req.method === "GET") {
      const view = await prisma.view.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ total: view.count.toString() });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
