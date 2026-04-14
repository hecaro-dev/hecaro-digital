import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["*.replit.dev", "*.replit.app", "*.janeway.replit.dev"],
};

export default nextConfig;
