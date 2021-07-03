<template>
  <a-button v-bind="$attrs" v-if="hasAuth">
    <slot></slot>
  </a-button>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { getStorage } from '@/utils/storage';
const props = defineProps({
  auth: {
    type: String,
    default: ''
  }
});
let permissions = Object.freeze(getStorage('permissions')) || [];
let hasAuth = computed(() => {
  return !props.auth || permissions.includes(props.auth);
});
</script>
