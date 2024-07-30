const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  env: {
    _next_intl_trailing_slash: 'true', // 添加此行
  },
  reactStrictMode: process.env.NODE_ENV === 'development',
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'weijunext.com',
      'quotegenerator.cc',
    ],
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://quotegenerator.cc',
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
