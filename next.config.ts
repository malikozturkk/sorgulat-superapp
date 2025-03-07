import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/rss",
      },
    ];
  },
  swcMinify: true,
};

export default nextConfig;
