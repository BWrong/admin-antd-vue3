import { type Component } from 'vue';

import Dialog, { type IProps } from '@/components/Dialog/index.vue';

interface ICreateOptions<D> extends Omit<IProps, 'component' | 'onOk'> {
  onConfirm?: (data: D) => void;
  onClosed?: () => void;
  onCancel?: () => void;
  defaultOpen?: boolean;
  component: Component;
}
export default (DialogComponent: Component = Dialog) => {
  const currentInstance = getCurrentInstance();
  const appContext = currentInstance?.appContext;
  function createDialog<
    C extends abstract new (...args: any) => any,
    D = Awaited<ReturnType<InstanceType<C>['submit']>>
  >(options?: ICreateOptions<D>, withContext = true) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const openValue = ref(options?.defaultOpen ?? true);
    const instance = createApp(DialogComponent, {
      // footer: undefined,
      ...options,
      open: openValue,
      onConfirm(data: D) {
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
    if (withContext && appContext) {
      instance.config.globalProperties = appContext.config.globalProperties;
      Object.entries(appContext.components).forEach(([key, component]) => instance.component(key, component));
      Object.entries(appContext.directives).forEach(([key, directive]) => instance.directive(key, directive));
      const provideKeys = getAllProperties(appContext.provides);
      provideKeys.forEach((key) => instance.provide(key, appContext.provides[key]));
      // instance.mixin(appContext.mixins);
      // instance.config.errorHandler = appContext.config.errorHandler;
      // instance.config.warnHandler = appContext.config.warnHandler;
      // instance.config.performance = appContext.config.performance;
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
function getAllProperties(obj: Record<string | symbol, any>) {
  const props = Object.getOwnPropertyNames(obj);
  const symbols = Object.getOwnPropertySymbols(obj);
  return [...props, ...symbols];
}
