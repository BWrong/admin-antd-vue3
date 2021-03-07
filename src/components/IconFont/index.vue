<template>
  <span class="icon-font anticon" :style="computedStyle">
    <svg aria-hidden="true" width="1em" height="1em" focusable="false" fill="currentColor">
      <use :xlink:href="'#' + type"></use>
    </svg>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, StyleHTMLAttributes } from 'vue';
export default defineComponent({
  name: 'IconFont',
  props: {
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
    },
    style: {
      type: Object as PropType<StyleHTMLAttributes>,
      default: {}
    }
  },
  setup(props) {
    const computedStyle = computed(() => {
      return {
        color: props.color,
        fontSize: props.fontSize,
        ...props.style
      };
    });
    return {
      computedStyle
    };
  }
});
</script>

<style scoped>
.icon-font {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  overflow: hidden;
  box-sizing: border-box;
}
</style>
