"use server";

import { auth } from "auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const giveEndorsement = async (
  prevState: {
    message: string;
  },
  formData: FormData
) => {
  try {
    const skillId = formData.get("skillId");
    const session = await auth();
    if (!session) {
      return {
        message: "Unauthorized",
      };
    }

    await prisma.endorsement.create({
      data: {
        skill_id: Number(skillId),
        userId: session.id as string,
      },
    });

    revalidatePath("/endorsements");

    return {
      message: `You have successfully endorsed the skill with ID: ${skillId}`,
    };
  } catch {
    return {
      message: "Failed to endorse the skill.",
    };
  }
};
