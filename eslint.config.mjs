import unocssFlat from '@unocss/eslint-config/flat';
import prettierConfig from '@vue/eslint-config-prettier';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginSimpleImport from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

import autoImport from './.eslintrc-auto-import.json' assert { type: 'json' };

export default [
  {
    name: 'app/filesAndIgores',
    files: ['**/*.{ts,mts,tsx,js,mjs,jsx,vue}'],
    ignores: ['**/dist/**', 'public/**', '**/dist-ssr/**', '**/coverage/**']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...autoImport.globals,
        Iconfont: true,
        __APP_CONFIG__: true
      }
    }
  },
  ...pluginVue.configs['flat/strongly-recommended'],
  ...vueTsEslintConfig({
    supportedScriptLangs: { ts: true, tsx: true }
  }),
  {
    plugins: {
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
    }
  },
  unocssFlat,
  prettierConfig
];
