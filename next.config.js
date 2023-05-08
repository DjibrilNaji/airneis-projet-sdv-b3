/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "airness-matd.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
}

module.exports = nextConfig
