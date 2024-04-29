<template>
  <a-sub-menu :key="antKey">
    <template #icon v-if="item.icon">
      <icon-font :type="item.icon" />
    </template>
    <template #title>
      {{ item.title }}
    </template>
    <template v-for="subItem in item.children">
      <template v-if="!subItem.hide">
        <l-sub-menu
          v-if="Array.isArray(subItem.children) && subItem.children.length >= 1"
          :key="`${subItem.url}-if`"
          :level="level + 1"
          :item="subItem"
          :ant-key="subItem.url"
          :collapse="collapse"
        />
        <a-menu-item v-else :key="subItem.url" @click="handleLink(subItem.url)">
          <template #icon v-if="subItem.icon">
            <icon-font :type="subItem.icon" />
          </template>
          {{ subItem.title }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" setup>
import type { IMenu } from '@/api/auth';

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
const router = useRouter();
const handleLink = (url?: string) => {
  url && router.push(url);
};
</script>
