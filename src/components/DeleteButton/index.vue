<template>
  <span v-if="type === 'icon'" class="delete-button-icon" v-bind="$attrs" @click.stop="handleClick">
    <icon-font type="icon-shanchu" title="删除"></icon-font>
    <slot></slot>
  </span>
  <a-button type="danger" size="small" v-bind="$attrs" @click.stop="handleClick" v-if="type === 'button'">
    <slot>删除</slot>
  </a-button>
</template>

<script lang="tsx" setup>
import { createVNode, defineEmits, defineProps } from 'vue';
import { Modal } from 'ant-design-vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  }
});
const emit = defineEmits(['confirm']);
function handleClick() {
  Modal.confirm({
    title: '提示',
    content: props.title ? createVNode(<span>您确定要删除【{<span class="text-primary">{props.title}</span>}】吗？</span>) : '您确定要删除该数据吗？',
    okText: '确认',
    okButtonProps: {
      type: 'danger'
    },
    cancelText: '取消',
    onOk: () => {
      emit('confirm');
    }
  });
}
</script>
<style lang="less" scoped>
.delete-button-icon {
  color: @error-color;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
</style>
