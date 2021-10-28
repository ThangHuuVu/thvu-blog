const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const { withSentryConfig } = require("@sentry/nextjs");

const SentryWebpackPluginOptions = {
  silent: true,
};

// https://securityheaders.com
// https://csp-evaluator.withgoogle.com/
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.twitter.com https://www.googletagmanager.com https://www.google-analytics.com https://dbdiagram.io;
  child-src *.youtube.com *.google.com *.twitter.com  https://codepen.io https://dbdiagram.io;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data: www.googletagmanager.com;
  media-src 'self';
  connect-src *;
  font-src 'self';
  object-src 'none';
  worker-src 'self' *.youtube.com *.google.com *.twitter.com;
`;
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "interest-cohort=()",
  },
];

const isDevelopment = process.env.NODE_ENV === "development";

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    domains: [
      // project hero
      "images.unsplash.com",
      // cms assets
      "www.datocms-assets.com",
      // twitter profile picture
      "pbs.twimg.com",
      // google avatar
      "lh3.googleusercontent.com",
      // github avatar
      "avatars.githubusercontent.com",
      // notion file url
      "s3.us-west-2.amazonaws.com",
    ],
  },
  webpack5: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: isDevelopment,
    mode: "production",
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
};

module.exports = isDevelopment
  ? nextConfig
  : withSentryConfig(withPWA(withBundleAnalyzer(nextConfig)), SentryWebpackPluginOptions);
