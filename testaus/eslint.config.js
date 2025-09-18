import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "warn",
    },
  },
]);