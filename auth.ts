import NextAuth from "@auth/nextjs";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Line from "@auth/core/providers/line";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV !== "production",
  providers: [
    // @ts-expect-error
    Google,
    // @ts-expect-error
    GitHub,
    // @ts-expect-error
    Line,
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.id = user?.id;
      return session;
    },
  },
});
