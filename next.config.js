/** @type {import('next').NextConfig} */

const path = require('path')

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

async function fetchRedirects() {
  return fetch(`${BASE_API_URL}/redirects`)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'api.digitalgarden.com.au',
      'api.dev-54ta5gq-gr52polju7uks.au.platformsh.site',
      'api.2022-services-update-mhelslq-gr52polju7uks.au.platformsh.site',
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles.scss";`,
  },

  async redirects() {
    const siteRedirects = await fetchRedirects()

    return siteRedirects
  },
}

module.exports = nextConfig
