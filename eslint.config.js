import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  { ignores: ["dist/"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  unicorn.configs["flat/recommended"],
  ...astro.configs["flat/recommended"],
  prettier,
  {
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/filename-case": [
        "error",
        {
          cases: { kebabCase: true, pascalCase: true },
          ignore: [/^\[.*\]/],
        },
      ],
    },
  },
);
