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
    ],
  },
};

export default nextConfig;
