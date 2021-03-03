<template>
  <a-switch checked-children="开" un-checked-children="关" :default-checked="value === '1'" @change="onChange" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    value: {
      type: String,
      default: '0'
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value'],
  methods: {
    onChange(value: string) {
      this.$emit('update:value', value);
    }
  }
});
</script>
