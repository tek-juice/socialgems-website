import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, //Disable Eslint during builds
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gpvhonuvumxdfvegiwrz.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  }
};

export default nextConfig;
