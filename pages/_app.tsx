import "@/css/tailwind.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import LayoutWrapper from "@/components/LayoutWrapper";
import MDXComponents from "@/components/MDXComponents";
import { pageView } from "@/lib/gtag";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageView(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const { session, ...rest } = pageProps;

  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <MDXProvider components={MDXComponents}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <LayoutWrapper>
            <Component {...rest} />
          </LayoutWrapper>
        </MDXProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
