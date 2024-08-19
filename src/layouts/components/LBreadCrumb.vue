<template>
  <div class="breadcrumb-bar">
    <span class="trigger" @click="handleCollapse" v-if="layout === 'side'">
      <icon-font :type="!collapse ? 'icon-outdent' : 'icon-indent'" />
    </span>
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item v-for="item in parentChain" :key="item.url" :href="item.url">
        <router-link :to="item.url">
          {{ item.title }}
        </router-link>
        <template v-if="item.children?.length" #overlay>
          <a-menu>
            <template v-for="subitem in item.children" :key="subitem.url">
              <a-menu-item class="breadcrumb-menu-item">
                <router-link :to="subitem.url">
                  <icon-font v-if="subitem.icon" :type="subitem.icon" style="margin-right: 5px" />
                  {{ subitem.title }}
                </router-link>
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { IMenu } from '@/api/auth';

const layout = window.__APP_CONFIG__.VITE_GLOBAL_LAYOUT;
interface IProps {
  collapse?: boolean;
  menus: IMenu[];
}
const props = withDefaults(defineProps<IProps>(), { collapse: false });
const route = useRoute();
const emit = defineEmits(['update:collapse']);
const { matchedParentChain } = useMenuState(props.menus);
const parentChain = computed(() => {
  const _parentChain = matchedParentChain.value.filter((item) => !!item.title && !item.hideBreadcrumb);
  return route.meta?.activeMenu
    ? [
        ..._parentChain,
        {
          ...route.meta,
          url: route.path
        }
      ]
    : _parentChain;
});
function handleCollapse() {
  emit('update:collapse', !props.collapse);
}
</script>
<style lang="less" scoped>
.breadcrumb-bar {
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  padding-left: 16px;
}
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  color: #666;
  width: 20px;
  margin-right: 10px;
}
.trigger:hover {
  color: @colorPrimary;
}
.home-ico {
  color: #d1e9ff;
  margin-right: 8px;
}
.breadcrumb-menu-item a.router-link-active {
  color: @colorPrimary;
}
</style>
