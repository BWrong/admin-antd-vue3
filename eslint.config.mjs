import path from "path";
import { fileURLToPath } from "url";
import pluginVue from "eslint-plugin-vue";
// import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import autoImport from './.eslintrc-auto-import.json' assert { type: "json" }
import unocssFlat from '@unocss/eslint-config/flat'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default [
  ...pluginVue.configs["flat/strongly-recommended"],
  ...compat.extends("@vanwei/eslint-config/typescript"),
  ...compat.extends("@vanwei/eslint-config/vue3"),
  ...compat.extends('@vue/eslint-config-typescript'),
  ...compat.extends("@vue/eslint-config-prettier"),
  unocssFlat,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        // ...globals.browser,
        ...autoImport.globals,
        Iconfont: true,
        __APP_CONFIG__: true
      }
    },
    files: [
      "src/**/*.vue",
      "src/**/*.js",
      "src/**/*.jsx",
      "src/**/*.cjs",
      "src/**/*.mjs",
      "src/**/*.ts",
      "src/**/*.tsx",
      "src/**/*.cts",
      "src/**/*.mts",
    ],
    rules: {
      'vue/no-setup-props-destructure': 0,
      'vue/no-dupe-keys': 0,
      'vue/multi-word-component-names': 0,
      // '@typescript-eslint/ban-ts-comment': 0,
      // '@typescript-eslint/no-explicit-any': 1,
      // // name命名规则interface\typeAlias\class\enum需用大驼峰，属性用小驼峰
      // '@typescript-eslint/naming-convention': [
      //   'error',
      //   {
      //     selector: ['interface', 'typeAlias', 'class', 'enum'],
      //     format: ['PascalCase']
      //   }
      // ]
    },
    ignores: [
      "vite.config.*",
      "vue.config.*",
      "rollup.config.*",
      "nuxt.config.*",
      "jest.config.*",
      "tailwind.config.*",
      "unocss.config.*",
      "vitest.config.*",
      "vetur.config.*",
      "windi.config.*",
      "jsconfig.*",
      "tsconfig.*",
      "tsdoc.*",
      ".babelrc.*",
      "babel.config.*",
      ".postcssrc.*",
      "postcss.config.*",
      ".prettierrc.*",
      "prettier.config.*",
      ".stylelintrc.*",
      "stylelint.config.*",
      ".eslintrc.*",
      "eslint.config.*",
      ".cz-config.js",
      ".browserslist*",
      ".editorconfig",
      "*.d.ts",
      ".vscode/*",
      ".git/*",
      ".env*",
      "*.config.*",
      "Dockerfile",
      "*.conf",
      "*.yaml",
      "*.md",
      "*.png",
      "*.jpg",
      "*.gif",
      "*.pdf",
      "*.doc",
      "node_modules",
      "node_modules/*",
      "public/*",
      "dist/*",
      "mock/*",
      "docs/*",
      "bower_components/*",
      "vender/*",
      "external/*",
      "src/config/theme.ts"

    ]
  }
]
