import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-undef": "off", // 🔹 Solución: Desactiva el error de `console`
    },
    ignores: ["node_modules", "dist"],
  },
];
