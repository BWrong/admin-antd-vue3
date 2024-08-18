import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import autoImport from './.eslintrc-auto-import.json' assert { type: 'json' };
import unocssFlat from '@unocss/eslint-config/flat';
import pluginSimpleImport from 'eslint-plugin-simple-import-sort';
// import nodePlugin from "eslint-plugin-n"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    files: [
      'src/**/*.vue',
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.cjs',
      'src/**/*.mjs',
      'src/**/*.ts',
      'src/**/*.tsx',
      'src/**/*.cts',
      'src/**/*.mts'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...autoImport.globals,
        Iconfont: true,
        __APP_CONFIG__: true
      }
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        jsx: true
        // vueFeatures: {}
      }
    }
  },
  ...compat.extends('@vue/eslint-config-prettier'),
  unocssFlat,
  {
    plugins: {
      // 'nodePlugin':nodePlugin,
      'simple-import-sort': pluginSimpleImport
    },
    rules: {
      'simple-import-sort/imports': ['warn', { groups: [['^node:'], ['^@?\\w'], ['^'], ['^\\.'], ['^\\u0000']] }],
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unused-expressions': 0,
      'vue/no-setup-props-destructure': 0,
      'vue/no-dupe-keys': 0,
      'vue/multi-word-component-names': 0
    },
    ignores: [
      'vite.config.*',
      'vue.config.*',
      'rollup.config.*',
      'nuxt.config.*',
      'jest.config.*',
      'tailwind.config.*',
      'unocss.config.*',
      'vitest.config.*',
      'vetur.config.*',
      'windi.config.*',
      'jsconfig.*',
      'tsconfig.*',
      'tsdoc.*',
      '.babelrc.*',
      'babel.config.*',
      '.postcssrc.*',
      'postcss.config.*',
      '.prettierrc.*',
      'prettier.config.*',
      '.stylelintrc.*',
      'stylelint.config.*',
      '.eslintrc.*',
      'eslint.config.*',
      '.cz-config.js',
      '.browserslist*',
      '.editorconfig',
      '*.d.ts',
      '.vscode/*',
      '.git/*',
      '.env*',
      '*.config.*',
      'Dockerfile',
      '*.conf',
      '*.yaml',
      '*.md',
      '*.png',
      '*.jpg',
      '*.gif',
      '*.pdf',
      '*.doc',
      'node_modules',
      'node_modules/*',
      'public/*',
      'dist/*',
      'mock/*',
      'docs/*',
      'bower_components/*',
      'vender/*',
      'external/*',
      'src/config/theme.ts'
    ]
  }
];
