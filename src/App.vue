<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      zhCN
    };
  }
});
</script>
