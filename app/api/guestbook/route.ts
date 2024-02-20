import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { GuestBookEntry } from "@/lib/types/guestbook";

export const GET = async (_: NextRequest) => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: "desc",
    },
    select: { id: true, body: true, updated_at: true, user: true },
  });

  return Response.json(
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
};
