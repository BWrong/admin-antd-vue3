<template>
  <a-button type="danger" size="small" v-bind="$attrs" @click="handleClick">
    <slot>删除</slot>
  </a-button>
</template>

<script>
import { createVNode, defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
export default defineComponent({
  name: 'delete-button',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    return {
      handleClick() {
        Modal.confirm({
          title: '提示',
          content: props.title ? createVNode(<span>您确定要删除【{<span class="text-primary">{props.title}</span>}】吗？</span>) : '您确定要删除该数据吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => emit('confirm')
        });
      }
    };
  }
});
</script>
