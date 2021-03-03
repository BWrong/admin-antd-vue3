<template>
  <a-space>
    <a-input v-model:value="searchKey" @change="onChange" :placeholder="placeholder" allowClear style="width: 300px" />
    <a-button type="primary" @click="handleSearch" :loading="loading">搜索</a-button>
    <a-button type="primary" ghost @click="handleReset">重置</a-button>
  </a-space>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'search-button',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    value: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    let searchKey = ref(props.value);
    return {
      searchKey,
      onChange({ target }) {
        emit('update:value', target.value);
      },
      handleSearch() {
        emit('search', searchKey.value);
      },
      handleReset() {
        searchKey.value = '';
        emit('update:value', '');
        emit('reset');
      }
    };
  }
});
</script>
