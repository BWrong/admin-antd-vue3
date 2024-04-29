import Dialog, { type IProps } from '@/components/Dialog/index.vue';
import { type Component, type DefineComponent } from 'vue';

interface ICreateOptions<T> extends Omit<IProps, 'component'> {
  onConfirm?: (data: T) => void;
  onClosed?: () => void;
  onCancel?: () => void;
  defaultOpen?: boolean;
  component: Component;
}
export default () => {
  const currentInstance = getCurrentInstance();
  const appContext = currentInstance?.appContext;
  // TODO: 类型推导失效了
  function createDialog<
    T extends abstract new (...args: any) => any = DefineComponent,
    U = Awaited<ReturnType<InstanceType<T>['submit']>>
  >(options?: ICreateOptions<U>) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const openValue = ref(options?.defaultOpen ?? true);
    const instance = createApp(Dialog, {
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
      instance.mixin({
        ...appContext.mixins,
        components: appContext.components,
        directives: appContext.directives,
        provide: appContext.provides
      });
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

export interface DialogExpose<T = any> {
  submit?(): Promise<T>;
}
