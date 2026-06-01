import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./tests/components",
  fullyParallel: true,
  reporter: "list",
  use: {
    ctPort: 3100,
    ctViteConfig: {
      resolve: {
        alias: {
          "@": process.cwd(),
        },
      },
    },
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
