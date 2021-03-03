<template>
  <a-input :value="value" v-if="isEdit" @input="handleInput" v-bind="$attrs" />
  <span v-else>{{ value }}</span>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value'],
  methods: {
    handleInput(value) {
      this.$emit('update:value', value);
    }
  }
});
</script>
