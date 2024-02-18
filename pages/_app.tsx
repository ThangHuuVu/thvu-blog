import "@/css/tailwind.css";
import "@/css/prism.css";
import "@/css/font.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import LayoutWrapper from "@/components/LayoutWrapper";

import type { AppProps } from "next/app";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const { session, ...rest } = pageProps;

  return (
    <>
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <LayoutWrapper>
            <Component {...rest} />
          </LayoutWrapper>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
