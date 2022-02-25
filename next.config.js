const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const { withSentryConfig } = require("@sentry/nextjs");

const SentryWebpackPluginOptions = {
  silent: true,
};

const isDevelopment = process.env.NODE_ENV === "development";

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
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
      // line avatar
      "profile.line-scdn.net",
    ],
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: isDevelopment,
    mode: "production",
    buildExcludes: [
      /middleware-manifest\.json$/,
      /middleware-runtime\.js$/,
      /middleware-runtime\.js.map$/,
      /middleware\.js$/,
      /middleware\.js.map$/,
    ],
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
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
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
