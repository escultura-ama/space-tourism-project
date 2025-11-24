import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spacexpatchlist.space',
      },
      {
        protocol: 'http',
        hostname: 'spacexpatchlist.space',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'http',
        hostname: 'i.imgur.com',
      },
    ],
  },
};

export default nextConfig;
