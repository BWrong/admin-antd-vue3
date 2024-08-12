<template>
  <ASubMenu :key="antKey">
    <template #icon v-if="item.icon">
      <IconFont :type="item.icon" />
    </template>
    <template #title>
      {{ item.title }}
    </template>
    <template v-for="subItem in item.children">
      <template v-if="!subItem.hide">
        <LSubMenu
          v-if="Array.isArray(subItem.children) && subItem.children.length >= 1"
          :key="`${subItem.url}-if`"
          :level="level + 1"
          :item="subItem"
          :ant-key="subItem.url"
          :collapse="collapse"
        />
        <LMenuItem v-else :key="subItem.url" :menu="subItem" :is-link="subItem.isLink">
          <template #icon v-if="subItem.icon">
            <IconFont :type="subItem.icon" />
          </template>
          {{ item.title }}
        </LMenuItem>
      </template>
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
import type { IMenu } from '@/api/auth';

import LMenuItem from './LMenuItem.vue';

interface IProps {
  level?: number;
  antKey?: string;
  item: IMenu;
  collapse?: boolean;
}
withDefaults(defineProps<IProps>(), {
  level: 0,
  antKey: '',
  collapse: false
});
</script>
