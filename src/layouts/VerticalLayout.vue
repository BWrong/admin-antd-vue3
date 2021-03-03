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
          <router-view #default="{ Component }">
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
import { mapState } from 'vuex';
import LSider from '@/layouts/components/LSider.vue';
import LLogo from '@/layouts/components/LLogo.vue';
import LFooter from '@/layouts/components/LFooter.vue';
import LHeader from '@/layouts/components/LHeader.vue';
import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';
import { convertToTree } from '@/utils';
import { getStorage } from '@/utils/storage';
import router from '@/router';
export default {
  name: 'vertical-layout',
  components: {
    LSider,
    LFooter,
    LHeader,
    LLogo,
    LBreadCrumb
  },
  data() {
    return {
      menus: [],
      collapse: false
    };
  },

  computed: {
    ...mapState({
      theme: (state) => state.theme
    }),
    curtRoute() {
      return this.$route;
    },
    curtMenuKey() {
      return this.curtRoute.path ? [this.curtRoute.path] : [];
    },
    parentMenus() {
      return this.curtRoute.matched
        .filter((item) => item.meta?.name)
        .map((item) => ({
          icon: item.meta.icon,
          title: item.meta.name,
          url: item.path
        }));
    },
    openeds() {
      return this.collapse ? [] : this.parentMenus.map((item) => item.url);
    }
  },
  created() {
    let userInfo = getStorage('userinfo');
    if (userInfo) {
      this.$store.commit('user/SET_USERINFO', userInfo);
    } else {
      router.push('/login');
    }
    let menus = getStorage('menus') || [];
    this.menus = convertToTree({ data: menus, pid: 0 });
  }
};
</script>
<style lang="less" scoped>
@import '../assets/styles/layout.less';
</style>
