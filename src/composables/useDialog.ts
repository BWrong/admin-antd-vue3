import { type Component } from 'vue';

import Dialog, { type IProps } from '@/components/Dialog/index.vue';

interface ICreateOptions<T> extends Omit<IProps, 'component'> {
  onConfirm?: (data: T) => void;
  onClosed?: () => void;
  onCancel?: () => void;
  defaultOpen?: boolean;
  component: Component;
}
export default (DialogComponent: Component = Dialog) => {
  const currentInstance = getCurrentInstance();
  const appContext = currentInstance?.appContext;
  function createDialog<
    T extends abstract new (...args: any) => any,
    U = Awaited<ReturnType<InstanceType<T>['submit']>>
  >(options?: ICreateOptions<U>) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const openValue = ref(options?.defaultOpen ?? true);
    const instance = createApp(DialogComponent, {
      // footer: undefined,
      ...options,
      open: openValue,
      onConfirm(data: any) {
        options?.onConfirm?.(data);
        openValue.value = false;
      },
      onCancel() {
        options?.onCancel?.();
        openValue.value = false;
      },
      afterClose() {
        options?.onClosed?.();
        unmount();
      }
    });
    // 注入应用的上下文
    if (appContext) {
      instance.config.globalProperties = appContext.config.globalProperties;
      const mixins: any = {
        ...appContext.mixins,
        components: appContext.components,
        directives: appContext.directives,
        provide: appContext.provides
      };
      // 修复多层打开弹窗，上下文丢失
      mixins['0'] && Object.assign(mixins, mixins['0']);
      delete mixins['0'];
      instance.mixin(mixins);
    }
    function unmount() {
      openValue.value = false;
      instance.unmount();
      container.parentNode?.removeChild(container);
    }
    function open() {
      openValue.value = true;
      instance.mount(container);
    }
    function close() {
      openValue.value = false;
    }
    options?.defaultOpen !== false && open();
    return {
      open,
      close
    };
  }
  return { createDialog };
};
