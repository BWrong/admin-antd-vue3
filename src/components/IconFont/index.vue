<template>
  <span class="icon-font anticon" :style="computedStyle">
    <svg aria-hidden="true" width="1em" height="1em" focusable="false" fill="currentColor">
      <use :xlink:href="'#' + type"></use>
    </svg>
  </span>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  fontSize: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
});
const computedStyle = computed(() => {
  return {
    color: props.color,
    fontSize: props.fontSize
  };
});
</script>

<style scoped>
.icon-font {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  overflow: hidden;
  box-sizing: border-box;
  line-height: 1 !important;
}
</style>
