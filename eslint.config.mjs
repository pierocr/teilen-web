import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    ".vercel/output/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
