<template>
  <div class="x-sider">
    <a-menu class="menu-box" :theme="theme" mode="inline" :inline-collapsed="collapse" :selected-keys="selectedKeys" v-model:open-keys="localOpeneds">
      <template v-for="item in menus">
        <template v-if="!item.hide">
          <a-sub-menu :key="item.path" v-if="item.children && item.children.length">
            <template #title>
              <SettingOutlined />
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <a-menu-item :key="subItem.path" v-if="!subItem.hide">
                <router-link :to="subItem.path">
                  <!-- <a-icon :type="subItem.icon" class="menu-ico" v-if="subItem.icon" /> -->
                  <span>{{ subItem.title }}</span>
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item :key="item.path" v-else>
            <router-link :to="item.path">
              <SettingOutlined />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';

import { IMenu } from '@/types/system';
import useMenuState from '@/hooks/useMenuState';
export default defineComponent({
  components: {
    SettingOutlined
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array as PropType<IMenu[]>,
      required: true
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  emits: ['update:collapse'],
  setup(props, { emit }) {
    const route = useRoute();
    let localOpeneds = ref<string[]>([]);
    const { matchedRoutes, activeMenu } = useMenuState((item) => !!item.meta?.title);
    let selectedKeys = computed(() => (activeMenu.value ? [activeMenu.value] : [route.path]));
    watchEffect(() => {
      localOpeneds.value = props.collapse ? [] : matchedRoutes.value.map((item) => item.path);
    });
    return {
      localOpeneds,
      selectedKeys,
      handleCollapse() {
        emit('update:collapse', !props.collapse);
      }
    };
  }
});
</script>

<style lang="less" scoped>
.x-sider {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
}

.menu-box {
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: calc(100vh - 64px);
  width: calc(100% + 17px);
  // transition: width 0.5s ease;
}
// .menu-ico:not(:empty) {
//   color: $primary-color;
//   border: 1px solid $primary-color;
//   padding: 2px;
//   border-radius: 0 4px 4px 4px;
// }
.sider-trigger {
  position: absolute;
  width: 16px;
  height: 68px;
  line-height: 68px;
  right: -16px;
  top: 50%;
  color: @primary-color;
  background: #e6f7ff;
  cursor: pointer;
  z-index: 1;
}
</style>
<style>
.ant-menu-sub .ant-menu-item:before {
  content: '';
  display: block;
  width: 4px;
  height: 4px;
  background: #00479d;
  position: absolute;
  top: 50%;
  margin-left: -16px;
  margin-top: -2px;
}
.ant-menu-submenu-popup .ant-menu-item:before {
  display: none;
}
</style>
