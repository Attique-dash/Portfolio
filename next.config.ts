import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
