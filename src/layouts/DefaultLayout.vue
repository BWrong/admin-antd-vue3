<template>
  <a-layout class="layout">
    <LHeader v-model:collapse="collapse" class="layout-header-fixed">
      <template #logo>
        <LLogo style="margin: 0 20px 0 0" />
      </template>
      <template #nav v-if="layout === 'top'">
        <LSider v-model:collapse="collapse" :menus="menus" />
      </template>
    </LHeader>
    <a-layout class="layout-main">
      <a-layout-sider
v-model:collapsed="collapse" :collapsed-width="50" theme="light" :trigger="null" collapsible
        breakpoint="lg" v-if="layout === 'side'">
        <LSider v-model:collapse="collapse" :menus="menus" />
      </a-layout-sider>
      <a-layout-content class="app-scroll-wrap" id="app-main-scroller">
        <LBreadCrumb v-model:collapse="collapse" :menus="menus" />
        <div class="app-main" :class="{ showMultiTab }">
          <LTabs v-if="showMultiTab" />
          <router-view v-slot="{ Component, route }">
            <transition mode="out-in" name="slide">
              <keep-alive :include="[...caches]" v-if="showMultiTab">
                <component :is="Component" :key="route.fullPath + routeKey" />
              </keep-alive>
              <component :is="Component" v-else :key="route.fullPath" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { getPermissionsData } from '@bwrong/auth-tool';
import { getStorage } from '@bwrong/storage';
import { useRouter } from 'vue-router';

import type { IMenu, IUser } from '@/api/auth';
import useRouteCache from '@/composables/useRouteCache';
import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';
import LHeader from '@/layouts/components/LHeader.vue';
import LLogo from '@/layouts/components/LLogo.vue';
import LSider from '@/layouts/components/LSider.vue';
import LTabs from '@/layouts/components/LTabs.vue';
import { useRootStore } from '@/store';
import { convertToTree } from '@/utils';
const layout = window.__APP_CONFIG__.VITE_GLOBAL_LAYOUT;
const { caches, routeKey } = useRouteCache();

const rootStore = useRootStore();
const router = useRouter();
const userInfo = getStorage<IUser>('userinfo');
if (userInfo) {
  rootStore.setUserinfo(userInfo);
} else {
  router.push('/login');
}
let menus: IMenu[] = getPermissionsData() || [];
menus = menus.filter((item) => item.type === 0);
menus = convertToTree({
  data: menus,
  pid: 0
});
const collapse = ref(false);

const { themeOptions } = useTheme();
const headerHeight = computed(() => (themeOptions.isCompact ? '56px' : '64px'));
const showMultiTab = import.meta.env.VITE_MULTI_TAB ?? true;
</script>
<style scoped lang="less">
.layout {
  min-width: 1200px;
  height: 100vh;
  background: #f0f2f5;
}

.layout-header-fixed {
  position: fixed;
  width: 100%;
}

.app-scroll-wrap {
  width: 100%;
  height: calc(100vh - v-bind(headerHeight));
  overflow-y: auto;
}

.layout-main {
  padding-top: v-bind(headerHeight);
}

.app-main {
  width: 100%;
  padding: 16px;
  // border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;

  &.showMultiTab :deep(.page-wrap > .ant-card) {
    border-radius: 0 0 5px 5px;
    border-top: none;
  }
}
</style>
