<template>
  <ConfirmButton @confirm="emit('confirm')" :before="before" :title="title" :text="tipsText">
    <slot>
      <a-button danger size="small" v-bind="$attrs"> 删除 </a-button>
    </slot>
  </ConfirmButton>
</template>

<script lang="ts" setup>
import type { ConfirmProps } from './index.vue';

interface DeleteProps extends ConfirmProps {
  title?: string;
  text?: string;
  actionTitle?: string;
  before?: () => boolean;
}
const {
  title = '是否确定删除已选数据？',
  actionTitle = '',
  text = '删除后选择数据将彻底删除，请知悉'
} = defineProps<DeleteProps>();
const tipsText = computed(() => (actionTitle ? `删除后[ ${actionTitle} ]将彻底删除,请知悉` : text));
const emit = defineEmits(['confirm']);
</script>
