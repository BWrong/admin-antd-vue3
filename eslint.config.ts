import unocssFlat from '@unocss/eslint-config/flat';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

import autoImport from './.eslintrc-auto-import.json' assert { type: 'json' };

configureVueProject({
  scriptLangs: ['ts', 'tsx']
});
export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,js,mjs,jsx,vue}']
  },
  globalIgnores(['**/dist/**', 'public/**', '**/dist-ssr/**', '**/coverage/**']),
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
  pluginVue.configs['flat/strongly-recommended'],
  vueTsConfigs.recommended,
  unocssFlat,
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': ['warn', { groups: [['^node:'], ['^@?\\w'], ['^'], ['^\\.'], ['^\\u0000']] }],
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-floating-promises': 0,
      'vue/no-setup-props-destructure': 0,
      'vue/no-dupe-keys': 0,
      'vue/multi-word-component-names': 0,
      'vue/first-attribute-linebreak': [
        'warn',
        {
          singleline: 'ignore',
          multiline: 'ignore'
        }
      ]
    }
  },
  // 某些文件对import自动排序会有问题，所以关闭
  {
    files: ['**/main.ts'],
    rules: {
      'simple-import-sort/imports': 'off'
    }
  },
  skipFormatting
);
