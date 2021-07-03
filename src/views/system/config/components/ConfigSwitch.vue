<template>
  <a-switch checked-children="开" un-checked-children="关" :default-checked="value === 1" @change="hanldeChange" v-bind="attrs" />
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
function hanldeChange(value: string) {
  emit('update:value', value);
}
</script>
