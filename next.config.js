
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Define environment variables
  env: {
    // Add any environment variables needed by Next.js here
  },
  // Configure webpack
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/src',
    };
    return config;
  },
};

module.exports = nextConfig;
