<template>
  <div class="l-sider" :class="mode">
    <AMenu v-model:open-keys="localOpeneds" class="menu-box" :mode="mode" :selected-keys="selectedKeys">
      <template v-for="item in menus">
        <template v-if="!item.hide">
          <LSubMenu
            v-if="item.children && item.children.length"
            :key="`${item.url}-if`"
            :ant-key="item.url"
            :collapse="collapse"
            :item="item"
          />
          <LMenuItem v-else :key="item.url" :menu="item" :is-link="item.isLink">
            <template #icon v-if="item.icon">
              <IconFont :type="item.icon" />
            </template>
            {{ item.title }}
          </LMenuItem>
        </template>
      </template>
    </AMenu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import type { IMenu } from '@/api/auth';

import LMenuItem from './LMenuItem.vue';
import LSubMenu from './LSubMenu.vue';
interface IProps {
  collapse?: boolean;
  menus: IMenu[];
}
const layout = window.__APP_CONFIG__.VITE_GLOBAL_LAYOUT;
const mode = layout === 'top' ? 'horizontal' : 'inline';
const props = withDefaults(defineProps<IProps>(), { collapse: false });
const route = useRoute();
const localOpeneds = ref<string[]>([]);
const { matchedParentChain, activeMenu } = useMenuState(props.menus);
const selectedKeys = computed(() => (activeMenu.value ? [activeMenu.value, route.path] : [route.path]));
watchEffect(() => {
  localOpeneds.value = (props.collapse ? [] : matchedParentChain.value).map((item) => item.url);
});
</script>

<style lang="less" scoped>
.l-sider {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
  &.inline {
    display: block;
  }
  &.horizontal {
    padding-left: 100px;
  }
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
<style lang="less">
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
  line-height: 1;
}
.ant-menu-horizontal {
  &.ant-menu-light {
    background: transparent;
    color: #eee;
    .ant-menu-submenu-selected {
      & > .ant-menu-submenu-title {
        color: #ffffff;
      }
      &::after {
        border-bottom-color: #fff;
      }
    }
    .ant-menu-item-selected {
      color: #ffffff;
      &::after {
        border-bottom-color: #fff;
      }
    }
  }
}
</style>
