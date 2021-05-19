<template>
  <div class="page-wrap">
    <a-card>
      <h3>首页</h3>
      <a-space>
        <auth-button auth="testAuth">auth-button</auth-button>
        <a-button v-auth="'testAuth'">v-auth</a-button>
      </a-space>
      <h3>Hooks</h3>
      <div>
        <a-button :loading="loading" @click="handleClick">usePromise</a-button>
        <p>测试结果</p>
        <p>data:{{ data }}</p>
        <p>err:{{ error }}</p>
      </div>
      <h3>表格</h3>
      <basis-table show-index :columns="columns" :loading="loading" :data-source="data.list" :pagination="pagination">
        <template #action>
          <a-space class="table-action">
            <span class="text-primary"> <icon-font type="icon-form"></icon-font></span>
            <delete-button type="icon"></delete-button>
          </a-space>
        </template>
      </basis-table>
      <h3>图标</h3>
      <p style="color: red"><icon-font type="icon-stepforward" :style="{ color: 'blue' }"></icon-font><icon-font type="icon-user"></icon-font></p>
      <h3>按钮</h3>
      <a-space>
        <a-button type="primary" size="large">常规</a-button>
        <a-button disabled size="large">禁用</a-button>
        <a-button type="primary" ghost size="large">常规</a-button>
        <a-button disabled ghost size="large">禁用</a-button>
        <a-button type="primary" shape="round" size="large"> 常 规 </a-button>
        <a-button disabled shape="round" size="large"> 禁 用 </a-button>
      </a-space>
      <h3>颜色</h3>
      <p class="text-primary">主色 #006DFF</p>
      <p class="text-heading">标题 #152C4B</p>
      <p class="text-normal">内容 #4B617F</p>
      <p class="text-secondary">辅助 #5F7498</p>
      <p class="text-success">成功 #4B617F</p>
      <p class="text-disabled">禁用 #D2DAE8</p>
      <p class="text-error">错误 #FF2528</p>
      <h3>字体</h3>
      <p class="text-mini">辅助文本 12px</p>
      <p class="text-normal">内容文本 14px</p>
      <p class="text-medium">标题文本 16px</p>
      <p class="text-large">大标题文本 18px</p>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, readonly } from 'vue';
import usePromise from '@/hooks/usePromise';
import configApi from '@/api/system/config';
import { IPagination } from 'types/interface/common';
const columns = readonly([
  {
    title: 'title',
    dataIndex: 'title'
  },
  {
    title: 'code',
    dataIndex: 'code'
  },
  {
    title: 'type',
    dataIndex: 'type'
  },
  {
    title: 'describe',
    dataIndex: 'describe'
  },
  {
    title: 'updateTime',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    align: 'center',
    slots: { customRender: 'action' }
  }
]);
export default defineComponent({
  setup() {
    let testApi = () => configApi.list({ a: 123 });
    let { loading, data, error, run } = usePromise(testApi);
    return {
      columns,
      pagination: {
        ...inject<IPagination>('$pagination'),
        pageSize: 5
      },
      loading,
      data,
      error,
      handleClick: run
    };
  }
});
</script>
<style scoped>
h3 {
  margin: 20px 0;
}
</style>
