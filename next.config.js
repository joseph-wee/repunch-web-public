/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'punch-image.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1hatg1wharzcs.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'djywcis5bfuua.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nona-source.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,

}

module.exports = withVideos(nextConfig)