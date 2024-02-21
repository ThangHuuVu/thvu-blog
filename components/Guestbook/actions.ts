"use server";

import { auth } from "auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteEntry = async (
  prevState: {
    message: string;
  },
  formData: FormData
) => {
  try {
    const id = formData.get("id");
    const entry = await prisma.guestbook.findUnique({
      where: {
        id: Number(id),
      },
      select: { id: true, body: true, updated_at: true, user: true, userId: true },
    });
    if (!entry) {
      return {
        message: "The entry could not be found",
      };
    }

    const session = await auth();

    if (!session?.user) {
      return {
        message: "Unauthenticated",
      };
    }
    const { user } = session;
    if (!user || user.id !== entry?.userId) {
      return {
        message: "Unauthorized",
      };
    }

    await prisma.guestbook.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/endorsements");

    return {
      message: "Success! The entry has been deleted.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Failed to delete the entry.`,
    };
  }
};

export const addEntry = async (
  prevState: {
    message: string;
  },
  formData: FormData
) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        message: "Unauthorized",
      };
    }

    const { user } = session;

    if (!user?.id) {
      return {
        message: "Unauthorized",
      };
    }

    const body = (formData.get("body") || "").slice(0, 500);
    const newEntry = await prisma.guestbook.create({
      data: {
        body: body.toString(),
        userId: user.id,
      },
    });

    console.debug("New entry created: ", newEntry);

    revalidatePath("/endorsements");

    return {
      message: "Success! The entry has been added.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add the entry.",
    };
  }
};
