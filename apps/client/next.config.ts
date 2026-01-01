import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  images: {
    domains: ["i.pravatar.cc","res.cloudinary.com"],
  },
  transpilePackages: ["@workspace/ui"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
