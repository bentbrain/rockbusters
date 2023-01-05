/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async redirects() {
    return [
      {
        source: "/fortune",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
