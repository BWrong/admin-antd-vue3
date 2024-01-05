<template>
  <a-config-provider :locale="zhCN" :theme="customTheme">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>
<script lang="ts" setup>
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
const { themeOptions, initTheme, antAlgorithm } = useTheme();

const customTheme = computed<ThemeConfig>(() => ({
  token: themeOptions.themeToken,
  algorithm: antAlgorithm.value
}));
initTheme();
</script>
