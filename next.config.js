const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

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

module.exports = withPWA(nextConfig);
