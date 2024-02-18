import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      /** The user's DB ID. */
      id: string;
    } & DefaultSession["user"];
  }
}
