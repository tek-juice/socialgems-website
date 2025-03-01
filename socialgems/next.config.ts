import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, //Disable Eslint during builds
  }
};

export default nextConfig;
