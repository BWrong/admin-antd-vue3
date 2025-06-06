import { getStorage, setStorage } from '@bwrong/storage';
import { theme } from 'ant-design-vue';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import cssVars from 'css-vars-ponyfill';

import { themeToken as defaultThemeToken } from '@/config/theme';
export type ColorScheme = 'light' | 'dark' | 'auto';
export type ThemeOptions = {
  colorScheme: ColorScheme;
  themeToken: ThemeConfig['token'];
  isCompact: boolean;
};
// 默认主题配置
const defaultThemeOptions: ThemeOptions = {
  colorScheme: (window.__APP_CONFIG__.VITE_GLOBAL_COLOR_SCHEME as ColorScheme) || 'auto',
  themeToken: defaultThemeToken || {},
  isCompact: false
};
// 从缓存读取配置
const cacheThemeData = getStorage<ThemeOptions>('theme') || defaultThemeOptions;
const themeOptions = reactive(cacheThemeData);
function initTheme() {
  const variables = Object.entries(themeOptions.themeToken || {}).reduce(
    (temp, [key, value]) => {
      temp[`--${key}`] = value as string;
      return temp;
    },
    {} as Record<string, string>
  );
  cssVars({ variables });
}
// 配置theme
function setTheme(newOptions: Partial<ThemeOptions>) {
  Object.assign(themeOptions, newOptions);
  setStorage('theme', themeOptions);
  newOptions['themeToken'] && initTheme();
}
// antd配置
const antAlgorithm = computed(() => {
  let colorScheme = themeOptions.colorScheme;
  if (colorScheme === 'auto') {
    colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  const algorithm = colorScheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;
  return themeOptions.isCompact ? [algorithm, theme.compactAlgorithm] : [algorithm];
});
export const useTheme = () => {
  return {
    themeOptions,
    initTheme,
    setTheme,
    antAlgorithm
  };
};
