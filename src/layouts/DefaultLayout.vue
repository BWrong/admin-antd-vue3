<template>
  <a-layout class="layout">
    <LHeader v-model:collapse="collapse" class="layout-header-fixed">
      <template #logo>
        <LLogo style="margin: 0 20px 0 0" />
      </template>
    </LHeader>
    <a-layout class="layout-main">
      <a-layout-sider
        v-model:collapsed="collapse"
        :collapsed-width="50"
        theme="light"
        :trigger="null"
        collapsible
        breakpoint="lg"
      >
        <LSider v-model:collapse="collapse" :menus="menus" />
      </a-layout-sider>
      <a-layout-content class="app-scroll-wrap">
        <LBreadCrumb v-model:collapse="collapse" :menus="menus" />
        <div class="app-main">
          <router-view v-slot="{ Component, route }">
            <transition mode="out-in" name="slide">
              <div :key="route.path">
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';
import LHeader from '@/layouts/components/LHeader.vue';
import LLogo from '@/layouts/components/LLogo.vue';
import LSider from '@/layouts/components/LSider.vue';
import { useRootStore } from '@/store';
import { convertToTree } from '@/utils';
import { getStorage } from '@bwrong/storage';
import type { IMenu, IUser } from '@/api/auth';
import { getPermissionsData } from '@bwrong/auth-tool';

const rootStore = useRootStore();
const { push } = useRouter();
const userInfo = getStorage<IUser>('userinfo');
if (userInfo) {
  rootStore.setUserinfo(userInfo);
} else {
  push('/login');
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
</script>
<style scoped>
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
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
