import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const files = ["**/*.js", "**/*.mjs", "**/*.ts", "**/*.tsx"];

const eslintConfig = defineConfig(
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
  {
    files,
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eslint.config.mjs",
            "next.config.mjs",
            "postcss.config.mjs",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "separate-type-imports", prefer: "type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat["jsx-runtime"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ...reactPlugin.configs.flat["jsx-runtime"].languageOptions,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eslint.config.mjs",
            "next.config.mjs",
            "postcss.config.mjs",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  reactHooks.configs.flat["recommended-latest"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-duplicate-head": "off",
    },
  },
  {
    ignores: ["**/env.ts"],
  },
  {
    files,
    rules: {
      "no-restricted-imports": [
        "error",
        {
          importNames: ["env"],
          message:
            "Use the validated env export from '@/lib/env' instead of process.env.",
          name: "process",
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          message:
            "Use the validated env export from '@/lib/env' instead of process.env.",
          object: "process",
          property: "env",
        },
      ],
    },
  },
  {
    files: ["app/og/route.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["app/actions.ts"],
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
);

export default eslintConfig;
