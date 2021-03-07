<template>
  <div class="breadcrumb-bar">
    <span class="trigger" @click="handleCollapse"><icon-font :type="!collapse ? 'icon-menu-unfold' : 'icon-menu-fold'" /></span>
    <!-- <a-breadcrumb :routes="parentRoutes" class="breadcrumb">
      <template #itemRender="{ route, routes }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.meta.title }}
        </span>
        <router-link v-else :to="route.path">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb> -->
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item v-for="item in parentRoutes" :key="item.path" :href="item.path">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
        <template #overlay v-if="item.children?.length">
          <a-menu mode="inline">
            <template v-for="subitem in item.children">
              <a-menu-item :key="subitem.path" v-if="subitem.meta && subitem.meta && !subitem.meta.activeMenu">
                <router-link :to="subitem.path"><icon-font :type="subitem.meta.icon" v-if="subitem.meta.icon" style="margin-right: 5px" />{{ subitem.meta.title }}</router-link>
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import useMenuState from '@/hooks/useMenuState';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:collapse'],
  setup(props, { emit }) {
    const { matchedRoutes } = useMenuState((item) => !!item.meta?.title && !item.meta?.hideBreadcrumb);
    return {
      parentRoutes: matchedRoutes,
      handleCollapse() {
        emit('update:collapse', !props.collapse);
      }
    };
  }
});
</script>
<style lang="less" scoped>
.breadcrumb-bar {
  display: flex;
  width: 100%;
  background-color: #fff;
  align-items: center;
}
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  color: #666;
  padding: 0 10px;
  &:hover {
    color: @primary-color;
  }
}
.breadcrumb {
  padding: 0 10px;
  line-height: 48px;
  .home-ico {
    color: #d1e9ff;
    margin-right: 8px;
  }
}
</style>
