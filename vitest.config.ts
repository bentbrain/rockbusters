import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    exclude: ["**/node_modules/**", "tests/e2e/**", "tests/components/**"],
    globals: true,
    include: ["app/**/*.test.ts", "lib/**/*.test.ts"],
  },
});
