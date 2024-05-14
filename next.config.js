/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  env: {
    captcha_site_key: process.env.CAPTCHA_SITE_KEY || '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ',
    google_client_id:
      process.env.GOOGLE_CLIENT_ID ||
      '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com',
    // '535513477329-0m3nj9m45g3r0sm8kdh5i8c5jkjs88f0.apps.googleusercontent.com',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        port: '',
        pathname: '/users-inctagram/**',
      },
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/trainee-instagram-api/**',
      },
    ],
  },
}

module.exports = nextConfig
