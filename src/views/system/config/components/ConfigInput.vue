<template>
  <a-input :value="value" v-if="isEdit" @input="handleInput" v-bind="attrs" />
  <span v-else>{{ value }}</span>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, useAttrs } from 'vue';
const props = defineProps({
  value: {
    type: [Number, String],
    default: ''
  },
  isEdit: {
    type: Boolean,
    default: true
  }
});
const attrs = useAttrs();
const emit = defineEmits(['update:value']);
function handleInput(value: string) {
  emit('update:value', value);
}
</script>
