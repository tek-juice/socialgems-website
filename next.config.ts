import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, //Disable Eslint during builds
  },
  images: {
    domains: ['gpvhonuvumxdfvegiwrz.supabase.co', 'lh3.googleusercontent.com'],
  }
};

export default nextConfig;
