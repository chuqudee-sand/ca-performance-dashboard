// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Remove invalid experimental flag
  // experimental: { isrMemoryCacheSize: 0 } ← DELETE THIS LINE
};

module.exports = nextConfig;
