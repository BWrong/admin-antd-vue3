<template>
  <div class="page-wrap">
    <a-space>
      <auth-button auth="testAuth">auth-button按钮测试</auth-button>
      <a-button v-auth="'testAuth'">v-auth指令测试</a-button>
    </a-space>
  </div>
</template>
