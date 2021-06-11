<template>
  <a-input :value="value" v-if="isEdit" @input="handleInput" v-bind="$attrs" />
  <span v-else>{{ value }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return {
      handleInput(value: string) {
        emit('update:value', value);
      }
    };
  }
});
</script>
