import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the home folder confuses root detection; pin it here.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
};

export default nextConfig;
