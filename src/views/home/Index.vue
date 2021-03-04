<template>
  <div class="page-wrap">
    <a-card>
      <h3>首页</h3>
      <a-space>
        <auth-button auth="testAuth">auth-button按钮测试</auth-button>
        <a-button v-auth="'testAuth'">v-auth指令测试</a-button>
        <a-button :loading="loading" @click="handleClick">usePromise测试</a-button>
      </a-space>
      <div>
        <p>测试结果</p>
        <p>data:{{ data }}</p>
        <p>err:{{ error }}</p>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import usePromise from '@/hooks/usePromise';
import configApi from '@/api/system/config';
export default defineComponent({
  setup() {
    let testApi = () => configApi.list({ a: 123 });
    let { loading, data, error, run } = usePromise(testApi, { autoRun: true });
    return {
      loading,
      data,
      error,
      handleClick: run
    };
  }
});
</script>
