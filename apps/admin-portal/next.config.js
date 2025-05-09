/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@healthify/ui-kit", "@healthify/db", "@healthify/fhir-server"],
  reactStrictMode: true,
};

module.exports = nextConfig;
