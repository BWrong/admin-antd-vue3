<template>
  <span class="icon-font" :style="computedStyle">
    <svg aria-hidden="true" width="1em" height="1em" focusable="false" fill="currentColor">
      <use :xlink:href="'#' + type" />
    </svg>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
  type: string;
  // type: Iconfont; // 如果不使用iconify，可以设置成此项，可以自动补全
  fontSize?: string | number;
  size?: string | number;
  color?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  fontSize: '',
  size: '',
  color: ''
});
const computedStyle = computed(() => {
  const fontSize = props.fontSize || props.size || '14px';
  return {
    color: props.color,
    fontSize: String(fontSize).endsWith('px') ? fontSize : `${fontSize}px`
  };
});
</script>

<style scoped>
.icon-font {
  width: 1em;
  height: 1em;
  line-height: 1 !important;
  display: inline-block;
  color: inherit;
  vertical-align: -0.125em;
}
</style>
