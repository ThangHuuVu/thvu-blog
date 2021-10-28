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
      // notion file url
      "s3.us-west-2.amazonaws.com",
    ],
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
