const globals = require("globals");
const pluginTs = require("@typescript-eslint/eslint-plugin");
const parserTs = require("@typescript-eslint/parser");
const pluginPrettier = require("eslint-plugin-prettier");
const configPrettier = require("eslint-config-prettier");
const eslintJs = require("@eslint/js");

module.exports = [
  {
    files: ["**/*.ts"],
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      prettier: pluginPrettier,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
];
