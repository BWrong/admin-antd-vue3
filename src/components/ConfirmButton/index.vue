<template>
  <span @click.stop="handleClick" class="cursor-pointer">
    <slot>
      <a-button size="small" v-bind="$attrs"> 操作 </a-button>
    </slot>
  </span>
</template>

<script lang="ts" setup>
import { type ButtonProps, Modal } from 'ant-design-vue';

export interface ConfirmProps extends ButtonProps {
  title?: string;
  text?: string;
  before?: () => boolean;
}
const { title = '是否执行该操作？', text = '', before = () => true } = defineProps<ConfirmProps>();
const emit = defineEmits(['confirm']);
function handleClick() {
  if (!before?.()) return;
  Modal.confirm({
    title: title,
    content: text,
    onOk() {
      emit('confirm');
    }
  });
}
</script>
