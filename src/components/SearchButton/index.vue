<template>
  <a-space>
    <slot></slot>
    <a-input v-model:value="searchWord" @change="onChange" :placeholder="placeholder" allowClear :style="{ width: inputWidth }" />
    <slot name="suffix"></slot>
    <a-button type="primary" @click="handleSearch" :loading="loading">搜索</a-button>
    <a-button type="primary" ghost @click="handleReset">重置</a-button>
  </a-space>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  modelValue: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  inputWidth: {
    type: String,
    default: '200px'
  }
});
const emit = defineEmits(['update:modelValue', 'search', 'reset']);
let searchWord = ref(props.modelValue);
function onChange({ target }: any) {
  emit('update:modelValue', target.value);
}
function handleSearch() {
  emit('search', searchWord.value);
}
function handleReset() {
  searchWord.value = '';
  emit('update:modelValue', '');
  emit('reset');
}
</script>
