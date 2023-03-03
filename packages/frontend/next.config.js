/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'picsum.photos',
      'pbs.twimg.com',
      'powered.by.dustlabs.com',
      'img-cdn.magiceden.dev',
      'thumbs2.imgbox.com',
      'localhost',
      'droppinprotocol.com',
      'stingray-app-elafw.ondigitalocean.app',
      'api-staging.polygonid.com',
    ],
  },
}

// eslint-disable-next-line
const withTM = require('next-transpile-modules')(['@bluebirdswap/contracts']) // TODO

module.exports = withTM(nextConfig)
