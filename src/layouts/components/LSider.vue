<template>
  <div class="l-sider">
    <a-menu v-model:open-keys="localOpeneds" class="menu-box" mode="inline" :selected-keys="selectedKeys">
      <template v-for="item in menus">
        <template v-if="!item.hide">
          <LSubMenu
            v-if="item.children && item.children.length"
            :key="`${item.url}-if`"
            :ant-key="item.url"
            :collapse="collapse"
            :item="item"
          ></LSubMenu>
          <a-menu-item v-else :key="item.url" @click="handleLink(item.url)">
            <template #icon v-if="item.icon"><icon-font :type="item.icon" /></template>
            {{ item.title }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import LSubMenu from './LSubMenu.vue';

import type { IMenu } from '@/api/auth';
interface IProps {
  collapse?: boolean;
  menus: IMenu[];
}
const props = withDefaults(defineProps<IProps>(), {
  collapse: false
});
const route = useRoute();
const localOpeneds = ref<string[]>([]);
const { matchedParentChain, activeMenu } = useMenuState(props.menus);
const selectedKeys = computed(() => (activeMenu.value ? [activeMenu.value, route.path] : [route.path]));
watchEffect(() => {
  localOpeneds.value = (props.collapse ? [] : matchedParentChain.value).map((item) => item.url);
});
const router = useRouter();
const handleLink = (url?: string) => {
  url && router.push(url);
};
</script>

<style lang="less" scoped>
.l-sider {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
}

.menu-box {
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: calc(100vh - 64px);
  width: calc(100% + 17px) !important;
  // transition: width 0.5s ease;
}
.sider-trigger {
  position: absolute;
  width: 16px;
  height: 68px;
  line-height: 68px;
  right: -16px;
  top: 50%;
  color: @colorPrimary;
  background: #e6f7ff;
  cursor: pointer;
  z-index: 1;
}
</style>
<style>
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
  line-height: 1;
}
</style>
