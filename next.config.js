/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.digitalgarden.com.au"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

