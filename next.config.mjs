import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./lib/env");

const posthogProxyHost = "https://us.i.posthog.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   reactCompiler: false,
  // },
  rewrites() {
    return [
      {
        source: "/rbx/:path*",
        destination: `${posthogProxyHost}/:path*`,
      },
    ];
  },
};

export default nextConfig;
