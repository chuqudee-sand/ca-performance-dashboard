// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Ensures static assets are included
  experimental: {
    // Optional: improve static generation
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;
