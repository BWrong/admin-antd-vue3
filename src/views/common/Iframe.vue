<script setup lang="ts">
const route = useRoute();
const url = computed(() => route?.meta?.url);
const loading = ref(true);
function finishLoading() {
  loading.value = false;
}
</script>

<template>
  <div class="ant-pro-iframe-wrap h-full w-full flex flex-1 flex-col of-hidden b-rd-8px bg-[var(--bg-color)]">
    <a-spin :spinning="loading" wrapper-class-name="b-rd-8px of-hidden w-full h-full flex flex-col flex-1">
      <iframe class="h-full w-full flex flex-1 flex-col" :src="url" style="border: none" @load="finishLoading" />
    </a-spin>
  </div>
</template>

<style>
.ant-pro-iframe-wrap {
  .ant-spin-container {
    height: 100% !important;
    width: 100% !important;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
