import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  render() {
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
}

export default MyDocument;
