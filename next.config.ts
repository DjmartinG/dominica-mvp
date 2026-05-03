import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Indica explícitamente la raíz del proyecto (silencia warning de multiple lockfiles)
  outputFileTracingRoot: path.join(__dirname),
  
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
