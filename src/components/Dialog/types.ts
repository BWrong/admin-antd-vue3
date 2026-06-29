import type { ModalProps } from "ant-design-vue/es/modal/Modal";
import type { Component, Ref } from "vue";

export interface IProps extends Omit<ModalProps, "open"> {
  component?: Component;
  open?: boolean | Ref<boolean>;
}
