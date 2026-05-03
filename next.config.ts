import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cgconstructora.com",
      },
      {
        protocol: "https",
        hostname: "www.cgconstructora.com",
      },
      {
        protocol: "https",
        hostname: "kuula.co",
      },
    ],
  },
};

export default nextConfig;
