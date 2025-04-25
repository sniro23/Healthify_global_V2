/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@healthify/ui-kit",
    "@healthify/db",
    "@healthify/fhir-server"
  ],
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 