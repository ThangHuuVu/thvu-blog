import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Line from "@auth/core/providers/line";
import type { NextAuthConfig } from "@auth/nextjs";

const NextAuth: NextAuthConfig = {
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
      // @ts-expect-error
      session.id = user?.id;
      return session;
    },
  },
};

export default NextAuth;
