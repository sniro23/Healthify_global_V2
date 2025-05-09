/** @type {import('next').NextConfig} */
const path = require('path'); // Import the path module

const nextConfig = {
  transpilePackages: ['@healthify/ui-kit', '@healthify/fhir-types'],
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    
    // Handle workspace packages
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      'node_modules',
      path.resolve(__dirname, '../../node_modules'),
    ];

    // Ensure proper handling of external packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
