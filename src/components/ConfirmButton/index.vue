<template>
  <span @click.stop="handleClick" class="cursor-pointer">
    <slot>
      <a-button size="small" v-bind="$attrs"> 操作 </a-button>
    </slot>
  </span>
</template>

<script lang="tsx" setup>
import { Modal, type ButtonProps } from 'ant-design-vue';

export interface ConfirmProps extends ButtonProps {
  title?: string;
  text?: string;
}
const { title = '是否执行该操作？', text = '' } = defineProps<ConfirmProps>();
const emit = defineEmits(['confirm']);
function handleClick() {
  Modal.confirm({
    title: title,
    content: text,
    onOk() {
      emit('confirm');
    }
  });
}
</script>
