/** @type {import('next').NextConfig} */
const nextConfig = {}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

// module.exports = withPWA(nextConfig)

module.exports = {
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/users/:username'
      },
      {
        source: '/~:publication',
        destination: '/publication/:publication'
      }
    ]
  }
}
