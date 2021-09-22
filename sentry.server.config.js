import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || "https://88092e8a40ad4d44aafc689d5681a09e@o993759.ingest.sentry.io/5951862",
  tracesSampleRate: 0.2,
});
