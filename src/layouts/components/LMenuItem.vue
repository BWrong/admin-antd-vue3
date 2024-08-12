<template>
  <AMenuItem v-if="!isLink" :key="menu.url" @click="handleLink(menu.url)">
    <template v-for="item in slotsKeys" #[item]>
      <slot :name="item" />
    </template>
  </AMenuItem>
  <AMenuItem v-else>
    <a :href="menu.url" target="_blank">
      <slot name="icon"></slot>
      <slot></slot>
    </a>
  </AMenuItem>
</template>

<script setup lang="ts">
import type { IMenu } from '@/api/auth';

interface IProps {
  menu: IMenu;
  isLink?: boolean;
}
type SlotKey = 'icon' | 'title' | 'default';
const slots = useSlots();
const slotsKeys = computed(() => Object.keys(slots) as SlotKey[]);
withDefaults(defineProps<IProps>(), {
  isLink: false
});
const router = useRouter();
const handleLink = (url?: string) => {
  url && router.push(url);
};
</script>

<style scoped lang="less"></style>
