<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
// import type { ModalFuncProps } from 'ant-design-vue';
import { getDefaultFromProps } from '@/utils';
import { modalProps, type ModalProps } from 'ant-design-vue/es/modal/Modal';
import type { Component } from 'vue';
// import type { VueNode } from 'ant-design-vue/es/_util/type';
export interface IProps extends Omit<ModalProps, 'open'> {
  // title?: string | (() => VueNode) | VueNode;
  // footer?: null | string | (() => VueNode) | VueNode;
  component?: Component;
  open?: boolean | Ref<boolean>;
}
const props = withDefaults(defineProps<IProps>(), {
  ...getDefaultFromProps(modalProps(), {
    // title: '标题',
    // footer: undefined,
    component: undefined,
    open: false
  })
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const componentRef = ref<any>();
const emit = defineEmits(['cancel', 'confirm']);
const localProps = computed(() => {
  return {
    ...props,
    open: unref(props.open),
    onCancel: handleCancel
  };
});
function handleCancel() {
  emit('cancel');
}
function handleConfirm() {
  const submit: () => Promise<any> = componentRef.value?.submit || (() => Promise.resolve(true));
  submit().then((data) => emit('confirm', data));
}
const loading = ref(false);
function handleLoading(val = false) {
  loading.value = val;
}
</script>

<template>
  <AModal v-bind="localProps">
    <template #title>
      <slot name="title">{{ title }} </slot>
    </template>
    <template #default>
      <slot>
        <component
          :is="component"
          ref="componentRef"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          @loading="handleLoading"
        ></component>
      </slot>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="modal-footer" v-if="footer === undefined">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleConfirm" :loading="loading">确认</a-button>
        </div>
        <template v-else>
          {{ footer }}
        </template>
      </slot>
    </template>
  </AModal>
</template>
<style scoped>
.modal-footer {
  display: flex;
  justify-content: center;
}
</style>
