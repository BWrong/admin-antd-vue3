<template>
  <a-button v-bind="$attrs" v-if="hasAuth">
    <slot></slot>
  </a-button>
</template>

<script>
import { getStorage } from '@/utils/storage';
export default {
  // inheritAttrs:false,
  data() {
    return {
      permissions: Object.freeze(getStorage('permissions'))
    };
  },
  props: {
    auth: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasAuth() {
      const permissions = this.permissions || [];
      return !this.auth || permissions.includes(this.auth);
    }
  }
};
</script>

<style lang="less" scoped></style>
