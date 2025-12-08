import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  reactStrictMode: true,

  allowedDevOrigins: ["*.csb.app"],

  experimental: {
    cssChunking: true,
    webVitalsAttribution: ["CLS", "LCP"],
    globalNotFound: true,
  },

  compiler: {
    styledComponents: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  transpilePackages: ["@repo/ui"],
} satisfies NextConfig;

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
