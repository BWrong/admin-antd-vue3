<template>
  <div>编辑{{ demo }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  setup(){
    const demo =ref('demo');
    return {
      demo
    };
  }
});
</script>

<style scoped></style>
