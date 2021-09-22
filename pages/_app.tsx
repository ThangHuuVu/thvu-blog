import "@/css/tailwind.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { Provider } from "next-auth/client";
import { SEO } from "@/components/SEO";
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
  return (
    <ThemeProvider attribute="class">
      <Provider session={pageProps.session}>
        <MDXProvider components={MDXComponents}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <DefaultSeo {...SEO} />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </MDXProvider>
      </Provider>
    </ThemeProvider>
  );
}
