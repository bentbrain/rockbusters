import { defineConfig, devices } from "@playwright/test";

const port = 3219;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `pnpm dev --hostname 127.0.0.1 --port ${port}`,
    env: {
      FETCH_SELF_URL: `http://127.0.0.1:${port}`,
      NEXT_PUBLIC_POSTHOG_HOST: "https://example.com",
      NEXT_PUBLIC_POSTHOG_KEY: "test-posthog-key",
      VERCEL_ENV: "preview",
    },
    reuseExistingServer: false,
    timeout: 120_000,
    url: `http://127.0.0.1:${port}`,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
