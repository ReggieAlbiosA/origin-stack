import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  reactStrictMode: true,
  cacheComponents: true,

  experimental: {
    cssChunking: true,
    webVitalsAttribution: ["CLS", "LCP"],
    globalNotFound: true,
  },

  compiler: {
    styledComponents: true,
  },

  typescript: {
    ignoreBuildErrors: true, // Remove after migration verified
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
