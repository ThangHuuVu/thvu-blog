import NextAuth from "@auth/nextjs";

declare module "@auth/nextjs" {
  interface Session {
    id: string;
  }
}
