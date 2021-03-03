<template>
  <a-button v-bind="$attrs" v-if="hasAuth">
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getStorage } from '@/utils/storage';
export default defineComponent({
  name: 'AuthButton',
  props: {
    auth: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let permissions = Object.freeze(getStorage('permissions')) || [];
    let hasAuth = computed(() => {
      return !props.auth || permissions.includes(props.auth);
    });
    return {
      hasAuth
    };
  }
});
</script>
