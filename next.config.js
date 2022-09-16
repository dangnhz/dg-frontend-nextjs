/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.digitalgarden.com.au", "api.dev-54ta5gq-gr52polju7uks.au.platformsh.site", "api.2022-services-update-mhelslq-gr52polju7uks.au.platformsh.site"],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles.scss";`
  }

};

module.exports = nextConfig;

