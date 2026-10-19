import type { NextConfig } from "next";
import { TAILOR_BRANDS_TRACKING_URL } from "./lib/affiliates";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/go/tailorbrands",
        destination: TAILOR_BRANDS_TRACKING_URL,
        permanent: false,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/downloads/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: "attachment; filename=\"recon-vault-v1.0.zip\"",
          },
          {
            key: "Content-Type",
            value: "application/zip",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
