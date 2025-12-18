import type { NextConfig } from "next";

const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
