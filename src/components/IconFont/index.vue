<template>
  <!-- <svg class="icon-font" aria-hidden="true" :style="computedStyle">
    <use :xlink:href="'#' + type"></use></svg
  > -->
  <a-icon-font class="icon-font" :style="computedStyle" :type="type" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, StyleHTMLAttributes } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import config from '@/config';
const AIconFont = createFromIconfontCN({
  scriptUrl: config.iconUrl
});
export default defineComponent({
  name: 'IconFont',
  components: {
    AIconFont
  },
  props: {
    type: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: 'inherit'
    },
    color: {
      type: String,
      default: 'inherit'
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
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
