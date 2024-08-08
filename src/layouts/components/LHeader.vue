<template>
  <a-layout-header class="layout-header">
    <div class="header-left">
      <slot name="logo" />
    </div>
    <div class="header-right">
      <a-dropdown>
        <div style="margin-left: 10px; cursor: pointer">
          <a-avatar size="default">
            <template #icon>
              <icon-font type="icon-user" />
            </template>
          </a-avatar>
          <span style="margin-left: 10px; vertical-align: middle; color: #fff">
            {{ userInfo.username }}
            <icon-font type="icon-down" style="margin-left: 5px; font-size: 10px" />
          </span>
        </div>
        <template #overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="person">
              <icon-font type="icon-user" />
              修改密码
            </a-menu-item>
            <a-menu-item key="theme">
              <icon-font type="icon-bg-colors" />
              主题设置
            </a-menu-item>
            <a-menu-item key="logout">
              <icon-font type="icon-logout" />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <LPersonalEdit v-model:open="state.openPsd" />
    <LThemeSetting v-model:open="state.openTheme" />
  </a-layout-header>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import type { MenuClickEventHandler } from 'ant-design-vue/lib/menu/src/interface';
import { computed, reactive } from 'vue';

import { useRootStore } from '@/store';
import { logout } from '@/utils/auth';

import LPersonalEdit from './LPersonalEdit.vue';
import LThemeSetting from './LThemeSetting.vue';
interface IProps {
  collapse?: boolean;
}
withDefaults(defineProps<IProps>(), { collapse: false });
defineEmits(['update:collapse']);
const rootStore = useRootStore();
const state = reactive({
  count: 12,
  openPsd: false,
  openTheme: false
});

const userInfo = computed(() => rootStore.userinfo);
const handleClick: MenuClickEventHandler = ({ key }) => {
  switch (key) {
    case 'person':
      state.openPsd = true;
      break;
    case 'logout':
      Modal.confirm({
        title: () => '提示',
        content: () => '您确定要退出吗？',
        onOk: () => {
          logout();
        }
      });
      break;
    case 'theme':
      state.openTheme = true;
      break;
  }
};
</script>

<style lang="less" scoped>
.layout-header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: var(--colorPrimary);
  z-index: 11;
}
.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  .quick {
    margin-right: 20px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
}
.nav-menu {
  position: relative;
  margin-right: 30px;
  cursor: pointer;
  width: 100px;
  height: 100%;
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  background-color: rgba(#fff, 0.2);
  .arrow {
    transition: all 0.8s ease 0s;
  }
  .rotate {
    transform: rotate(180deg);
  }
}
.drawer {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(rgb(39, 30, 30), 0.6);
}
</style>
