
<template>
  <div id="navbar" class="flex justify-between items-center w-full bg-white py-2 px-4">
    <div id="logo" class="flex items-center">
      <a-image src="https://picsum.photos/40/40" width="40" height="40" />
      <span class="ml-2 text-lg font-bold">甘肃电信能⼒中台</span>
    </div>
    <div id="menu" class="flex space-x-6">
      <a href="#" class="text-blue-500">首页</a>
      <a href="#" class="text-gray-800">研发⼀体化</a>
      <a href="#" class="text-gray-800">统⼀项⽬管理</a>
      <a href="#" class="text-gray-800">统⼀资源管理</a>
      <a href="#" class="text-gray-800">学习课程</a>
      <a href="#" class="text-gray-800">研发规范</a>
      <a href="#" class="text-gray-800">⼤模型专区</a>
      <a href="#" class="text-gray-800">科创专区</a>
      <a-dropdown>
        <a class="text-gray-800">应⽤平台</a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">平台1</a-menu-item>
            <a-menu-item key="2">平台2</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div id="user" class="flex items-center space-x-2">
      <a-avatar src="https://picsum.photos/30/30" />
      <a-dropdown>
        <a class="text-gray-800">张珂</a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">个人中心</a-menu-item>
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
