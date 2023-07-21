/** @type {import('next').NextConfig} */
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
    ],
  },
  reactStrictMode: true,

}

module.exports = nextConfig
