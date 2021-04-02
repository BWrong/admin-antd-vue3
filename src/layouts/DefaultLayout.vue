<template>
  <a-layout class="layout">
    <a-layout-sider :theme="theme" v-model:collapsed="collapse" :trigger="null" collapsible breakpoint="lg" class="sider">
      <l-logo :mini="collapse" class="logo"></l-logo>
      <l-sider :menus="menus" :theme="theme" v-model:collapse="collapse"></l-sider>
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
        <l-footer></l-footer>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import LSider from '@/layouts/components/LSider.vue';
import LLogo from '@/layouts/components/LLogo.vue';
import LFooter from '@/layouts/components/LFooter.vue';
import LHeader from '@/layouts/components/LHeader.vue';
import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';
import { convertToTree } from '@/utils';
import { getStorage } from '@/utils/storage';
import { IMenu } from '@/types/interface/common';
export default {
  name: 'default-layout',
  components: {
    LSider,
    LFooter,
    LHeader,
    LLogo,
    LBreadCrumb
  },
  setup() {
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
    return {
      theme,
      menus,
      collapse
    };
  }
};
</script>
<style lang="less" scoped>
@import '../assets/styles/layout.less';

.logo {
  font-size: 14px;
  color: #777;
}
</style>
