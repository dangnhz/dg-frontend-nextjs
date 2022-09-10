/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.digitalgarden.com.au", "api.2022-services-update-mhelslq-gr52polju7uks.au.platformsh.site"],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles.scss";`
  }

};

module.exports = nextConfig;

