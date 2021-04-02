<template>
  <a-layout-header class="layout-header">
    <div class="header-left">
      <slot name="logo"></slot>
      <slot name="breadCrumb"></slot>
    </div>
    <div class="header-right r-nw-fe-c">
      <a-tooltip @click="$router.push('/home')" title="首页">
        <icon-font type="icon-home" class="quick" />
      </a-tooltip>
      <a-tooltip @click="goToApi" title="API文档">
        <icon-font type="icon-file1" class="quick" />
      </a-tooltip>
      <a-tooltip @click="$router.push('/system/message')" :title="`${count}未读消息`">
        <a-badge :count="count" class="quick">
          <icon-font type="icon-bells" style="font-size: 22px" />
        </a-badge>
      </a-tooltip>
      <a-dropdown>
        <div style="margin-left: 10px; cursor: pointer">
          <a-avatar size="default" style="backgroundcolor: #b7d4ff">
            <template #icon><icon-font type="icon-user" /></template>
          </a-avatar>
          <span style="margin-left: 10px; vertical-align: middle; color: #fff">
            {{ userInfo.username }}
            <icon-font type="icon-down" style="margin-left: 5px; font-size: 10px" />
          </span>
        </div>
        <template #overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="person"> <icon-font type="icon-user" />修改密码 </a-menu-item>
            <a-menu-item key="logout"> <icon-font type="icon-logout" />退出登录 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <l-personal-edit v-model:visible="visiblePsd"></l-personal-edit>
  </a-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { logout } from '@/router';
import LPersonalEdit from './LPersonalEdit.vue';
export default defineComponent({
  components: {
    LPersonalEdit
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:collapse'],
  setup() {
    let store = useStore();
    let state = reactive({
      count: 12,
      visiblePsd: false
    });
    let userInfo = computed(() => store.state.user.userinfo);
    function handleClick({ key }: { key: string }) {
      switch (key) {
        case 'person':
          state.visiblePsd = true;
          break;
        case 'logout':
          Modal.confirm({
            title: '提示',
            content: '您确定要退出吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              logout();
            }
          });
          break;
      }
    }
    function goToApi() {
      alert('开发中!');
    }
    return {
      ...toRefs(state),
      userInfo,
      handleClick,
      goToApi
    };
  }
});
</script>

<style lang="less" scoped>
.layout-header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: linear-gradient(to right, @primary-color, lighten(@primary-color, 10));
  z-index: 11;
}
.header-left {
  display: flex;
  align-items: center;
}

.header-right {
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
