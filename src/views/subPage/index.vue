
<template>
  <header class="flex justify-between items-center w-full bg-white">
    <div id="logo-container" class="flex items-center">
      <a-image id="logo-image" src="https://picsum.photos/40/40" alt="Logo" class="w-[40px] h-[40px]"></a-image>
      <span class="text-lg font-bold ml-2">甘肃电信能力中台</span>
    </div>
    <nav id="navigation" class="flex space-x-6">
      <span class="text-blue-600 cursor-pointer">首页</span>
      <span class="cursor-pointer">研发一体化</span>
      <span class="cursor-pointer">统一项目管理</span>
      <span class="cursor-pointer">统一资源管理</span>
      <span class="cursor-pointer">学习课程</span>
      <span class="cursor-pointer">研发规范</span>
      <span class="cursor-pointer">大模型专区</span>
      <span class="cursor-pointer">科创专区</span>
      <a-dropdown id="platform-dropdown">
        <span class="cursor-pointer">
          应用平台
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item key="1">平台1</a-menu-item>
          <a-menu-item key="2">平台2</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown id="user-dropdown">
        <span class="flex items-center cursor-pointer">
          <a-avatar src="https://picsum.photos/32/32" class="mr-2" />
          张珂
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item key="1">个人信息</a-menu-item>
          <a-menu-item key="2">退出登录</a-menu-item>
        </a-menu>
      </a-dropdown>
    </nav>
  </header>
</template>

<script setup>
</script>

<style>
</style>
