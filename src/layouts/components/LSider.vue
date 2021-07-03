<template>
  <div class="x-sider">
    <a-menu class="menu-box" :theme="theme" mode="inline" :selected-keys="selectedKeys" v-model:open-keys="localOpeneds">
      <template v-for="item in menus">
        <template v-if="!item.hide">
          <a-sub-menu :key="item.path" v-if="item.children && item.children.length">
            <template #title>
              <icon-font :type="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <a-menu-item :key="subItem.path" v-if="!subItem.hide">
                <router-link :to="subItem.path">
                  <icon-font :type="subItem.icon" v-if="subItem.icon" />
                  <span>{{ subItem.title }}</span>
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item :key="item.path" v-else>
            <router-link :to="item.path">
              <icon-font :type="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watchEffect } from 'vue';
import type { PropType } from 'vue';
import { useRoute } from 'vue-router';
import type { IMenu } from 'types/interface/common';
import useMenuState from '@/hooks/useMenuState';
const emit = defineEmits(['update:collapse']);
const props = defineProps({
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
});
const route = useRoute();
let localOpeneds = ref<string[]>([]);
const { matchedRoutes, activeMenu } = useMenuState((item) => !!item.meta?.title);
let selectedKeys = computed(() => (activeMenu.value ? [activeMenu.value, route.path] : [route.path]));
watchEffect(() => {
  localOpeneds.value = props.collapse ? [] : matchedRoutes.value.map((item) => item.path);
});
function handleCollapse() {
  emit('update:collapse', !props.collapse);
}
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
  color: @primary-color;
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
