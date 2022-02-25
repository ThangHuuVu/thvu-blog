import { GA_TRACKING_ID } from "@/lib/gtag";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { v4 as uuidv4 } from "uuid";

interface DocumentProps {
  nonce: string;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const nonce = uuidv4();
    const isDev = process.env.NODE_ENV === "development";
    const csp = `
      default-src 'self';
      script-src ${
        isDev
          ? `'self' *.twitter.com 'unsafe-eval' 'unsafe-inline' data:`
          : `'strict-dynamic' 'nonce-${nonce}'`
      };
      child-src *.youtube.com *.google.com *.twitter.com https://cdpn.io https://codepen.io https://dbdiagram.io;
      style-src 'self' *.googleapis.com 'unsafe-inline' 'unsafe-eval';
      img-src 'self' data: https: blob: https://www.googletagmanager.com;
      worker-src 'self' *.youtube.com *.google.com *.twitter.com;
      connect-src *;
      object-src 'none';
      form-action 'self';
      frame-ancestors 'none';
      base-uri 'none';
    `;

    ctx.res.setHeader("Content-Security-Policy", csp.replace(/\n/g, ""));

    const initialProps = await ctx.defaultGetInitialProps(ctx);
    if (isDev) return initialProps;

    ctx.res.setHeader("CSP-Nonce", nonce);

    return { ...initialProps, nonce };
  }

  render() {
    const { nonce } = this.props;
    const headTags = (
      <>
        {/* font */}
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-regular.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-100.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-200.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-300.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-500.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-700.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-700italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-800italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-800.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/be-vietnam-pro-v2-vietnamese_latin-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/static/favicons/favicon.svg" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon.png" />
        <link rel="manifest" href="manifest.json" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/static/favicons/favicon.svg" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        {/* rss */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </>
    );

    if (!nonce) {
      return (
        <Html lang="en">
          <Head>{headTags}</Head>
          <body className="antialiased text-black bg-white dark:bg-black dark:text-white">
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
    return (
      <Html lang="en">
        <Head nonce={nonce}>{headTags}</Head>
        <body className="antialiased text-black bg-white dark:bg-black dark:text-white">
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
