/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack(c) {
  //   c.module.rules.push({
  //     test: [
  //       /(assets|components|configs|context|hooks|ssr-data|types|utls)\/index.ts/i
  //     ],
  //     sideEffects: false
  //   });

  //   return c;
  // },
  reactStrictMode: false,
  generateEtags: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  // // output: 'standalone',
  productionBrowserSourceMaps: true,
  swcMinify: true,
  experimental: {
    nextScriptWorkers: false,
    browsersListForSwc: true,
    legacyBrowsers: false,
    newNextLinkBehavior: true,
    serverComponents: false,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}'
      }
    },
    images: {
      allowFutureImage: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.arageek.com'
        },
        {
          protocol: 'https',
          hostname: '**.googleusercontent.com'
        },
        {
          protocol: 'https',
          hostname: '**.gravatar.com'
        }
      ]
    }
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: true,
    emotion: true
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async headers() {
    return [
      {
        source: '/assets/fonts/(.*)',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000'
          }
        ]
      }
    ];
  }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
module.exports = withBundleAnalyzer(nextConfig);
