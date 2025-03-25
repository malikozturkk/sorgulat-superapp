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
  images: {
    domains: ['ipapi.co', 'localhost', 'dashboard.sorgulat.com'],
  },
  swcMinify: true,
};

export default nextConfig;
