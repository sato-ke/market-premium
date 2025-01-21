import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/market-premium",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
