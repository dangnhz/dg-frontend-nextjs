/** @type {import('next').NextConfig} */

const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

async function fetchRedirects() {
  return fetch(`${BASE_API_URL}/redirects`)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
}

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'api.digitalgarden.com.au',
      'api.dev-54ta5gq-gr52polju7uks.au.platformsh.site',
    ],
    unoptimized: true,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles.scss";`,
  },

  async redirects() {
    const siteRedirects = await fetchRedirects()

    return siteRedirects
  },
})

module.exports = nextConfig
