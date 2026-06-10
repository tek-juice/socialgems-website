import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, //Disable Eslint during builds
  },
  images: {
    domains: ['gpvhonuvumxdfvegiwrz.supabase.co', 'lh3.googleusercontent.com'],
  }
};

export default nextConfig;
