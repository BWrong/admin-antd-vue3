<template>
  <a-switch checked-children="开" un-checked-children="关" :default-checked="value === 1" @change="onChange" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return {
      onChange(value: string) {
        emit('update:value', value);
      }
    };
  }
});
</script>
