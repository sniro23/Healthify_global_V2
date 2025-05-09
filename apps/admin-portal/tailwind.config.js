/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend the base configuration from ui-kit
  presets: [require('../../packages/ui-kit/tailwind.config.js')],
  // Add admin-portal specific content paths
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui-kit/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // admin-portal specific theme extensions can go here
    }
  }
};
