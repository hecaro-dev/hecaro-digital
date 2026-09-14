import type { NextConfig } from "next";

const replitDevOrigins = [
  process.env.REPLIT_DEV_DOMAIN,
  ...(process.env.REPLIT_DOMAINS?.split(",") ?? []),
].filter((origin): origin is string => Boolean(origin));

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.replit.dev",
    "*.replit.app",
    "*.janeway.replit.dev",
    ...replitDevOrigins,
  ],
};

export default nextConfig;
