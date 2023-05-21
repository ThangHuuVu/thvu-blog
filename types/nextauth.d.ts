import NextAuth from "@auth/core/types";

declare module "@auth/core/types" {
  interface Session {
    id: string;
    user: {
      /** The user's DB ID. */
      id: string;
    } & DefaultSession["user"];
  }
}
