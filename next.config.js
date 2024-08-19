/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */

// const { i18n } = require("./next-i18next.config")

const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "pbs.twimg.com", "login.aiana.io", "aiana.ams3.digitaloceanspaces.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  reactStrictMode: true,
  trailingSlash: true,
  // i18n,
}

module.exports = nextConfig