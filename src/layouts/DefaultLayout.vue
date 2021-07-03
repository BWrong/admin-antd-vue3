<template>
  <a-layout class="layout">
    <a-layout-sider :theme="theme" v-model:collapsed="collapse" :trigger="null" collapsible breakpoint="lg" class="sider">
      <l-logo :mini="collapse" class="logo"></l-logo>
      <l-sider :menus="menus" :theme="theme" v-model:collapse="collapse"></l-sider>
    </a-layout-sider>
    <a-layout class="layout-main">
      <l-header v-model:collapse="collapse" />
      <div class="app-scroll-wrap">
        <l-bread-crumb v-model:collapse="collapse" />
        <div class="app-main">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <l-footer></l-footer>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import LSider from '@/layouts/components/LSider.vue';
import LLogo from '@/layouts/components/LLogo.vue';
import LFooter from '@/layouts/components/LFooter.vue';
import LHeader from '@/layouts/components/LHeader.vue';
import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';
import { convertToTree } from '@/utils';
import { getStorage } from '@/utils/storage';
import type { IMenu } from 'types/interface/common';
const store = useStore();
const theme = computed(() => store.state.theme);
// const { push } = useRouter();
// let userInfo = getStorage('userinfo');
// if (userInfo) {
//   store.commit('user/SET_USERINFO', userInfo);
// } else {
//   push('/login');
// }
let menus: IMenu[] = getStorage('menus') || [];
menus = menus.filter((item) => item.type === 0);
menus = convertToTree({ data: menus, pid: 0 });
let collapse = ref(false);
</script>
<style lang="less" scoped>
@import '../assets/styles/layout.less';

.logo {
  font-size: 14px;
  color: #777;
}
</style>
