<template>
  <div class="min-h-screen w-full">
    <div class="flex flex-col w-full">
      <div class="flex flex-col ">
        <subPage class="w-full"/>
      </div>
      <div class="flex flex-col ">
        <subPage1 class="w-full"/>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import subPage from './subPage/index.vue';
import subPage1 from './subPage1/index.vue';

</script>
<style scoped lang="scss"></style>
