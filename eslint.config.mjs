import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      "coverage/**",
      "node_modules/**",
      "playwright/.cache/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default eslintConfig;
