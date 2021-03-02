<template>
  <a-layout class="layout">
    <l-header v-model:collapse="collapse" :bread-crumb="parentMenus" class="layout-header__fixed">
      <template #logo>
        <l-logo style="margin: 0 20px 0 0"></l-logo>
      </template>
    </l-header>
    <a-layout class="layout-main" style="padding-top: 64px">
      <a-layout-sider :theme="theme" v-model:collapsed="collapse" :trigger="null" collapsible breakpoint="lg">
        <l-sider :menus="menus" :theme="theme" v-model:collapse="collapse" :open-keys="openeds" :selected-keys="curtMenuKey"></l-sider>
      </a-layout-sider>
      <a-layout-content class="app-scroll-wrap">
        <l-bread-crumb :data="parentMenus" v-model:collapse="collapse" />
        <div class="app-main">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <l-footer></l-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutMinxin from '@/mixins/layout.mixin.js';
export default {
  name: 'vertical-layout',
  mixins: [LayoutMinxin()]
};
</script>
<style lang="less" scoped>
@import '../assets/styles/layout.less';
</style>
