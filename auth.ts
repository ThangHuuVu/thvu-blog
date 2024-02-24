import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Line from "next-auth/providers/line";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV !== "production",
  providers: [
    Google,
    GitHub,
    Line,
    // TODO: Enable this again when SendGrid allows me to send emails
    // {
    //   id: "sendgrid",
    //   type: "email",
    //   async sendVerificationRequest({ identifier: email, url }) {
    //     // Call the cloud Email provider API for sending emails
    //     // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
    //     const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    //       // The body format will vary depending on provider, please see their documentation
    //       // for further details.
    //       body: JSON.stringify({
    //         personalizations: [{ to: [{ email }] }],
    //         from: { email: "noreply@thvu.dev" },
    //         subject: "Sign in to thvu.dev",
    //         content: [
    //           {
    //             type: "text/plain",
    //             value: `Please click here to authenticate - ${url}`,
    //           },
    //         ],
    //       }),
    //       headers: {
    //         // Authentication will also vary from provider to provider, please see their docs.
    //         Authorization: `Bearer ${process.env.SENDGRID_API}`,
    //         "Content-Type": "application/json",
    //       },
    //       method: "POST",
    //     });

    //     if (!response.ok) {
    //       const { errors } = await response.json();
    //       throw new Error(JSON.stringify(errors));
    //     }
    //   },
    // },
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
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
