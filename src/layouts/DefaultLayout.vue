<template>
  <a-layout class="layout">
    <a-layout-sider :theme="theme" v-model:value="collapse" :trigger="null" collapsible breakpoint="lg">
      <l-logo :mini="collapse" class="logo"></l-logo>
      <l-sider :menus="menus" :theme="theme" v-model:collapse="collapse" :open-keys="openeds" :selected-keys="curtMenuKey"></l-sider>
    </a-layout-sider>
    <a-layout class="layout-main">
      <l-header v-model:collapse="collapse" :bread-crumb="parentMenus" />
      <div class="app-scroll-wrap">
        <l-bread-crumb :data="parentMenus" v-model:collapse="collapse" />
        <div class="app-main">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
      <l-footer></l-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutMinxin from '@/mixins/layout.mixin';
export default {
  name: 'default-layout',
  mixins: [LayoutMinxin()]
};
</script>
<style lang="less" scoped>
@import '../assets/style/layout.less';
.logo {
  background-color: #1b90ff;
  font-size: 14px;
}
</style>
