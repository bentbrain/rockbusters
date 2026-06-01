import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./lib/env");

const posthogIngestHost = "https://us.i.posthog.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   reactCompiler: false,
  // },
  rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: `${posthogIngestHost}/:path*`,
      },
    ];
  },
};

export default nextConfig;
