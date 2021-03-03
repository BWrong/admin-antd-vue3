<template>
  <a-space>
    <slot></slot>
    <a-input v-model:value="searchWord" @change="onChange" :placeholder="placeholder" allowClear :style="{ width: inputWidth }" />
    <slot name="suffix"></slot>
    <a-button type="primary" @click="handleSearch" :loading="loading">搜索</a-button>
    <a-button type="primary" ghost @click="handleReset">重置</a-button>
  </a-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'SearchButton',
  props: {
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
  },
  emits: ['update:modelValue', 'search', 'reset'],
  setup(props, { emit }) {
    let searchWord = ref(props.modelValue);
    return {
      searchWord,
      onChange({ target }: any) {
        emit('update:modelValue', target.value);
      },
      handleSearch() {
        emit('search', searchWord.value);
      },
      handleReset() {
        searchWord.value = '';
        emit('update:modelValue', '');
        emit('reset');
      }
    };
  }
});
</script>
