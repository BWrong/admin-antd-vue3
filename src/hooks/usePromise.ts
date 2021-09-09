import { reactive, toRefs } from 'vue';
interface _IOptions {
  autoRun?: boolean;
  params?: unknown;
  initData?: unknown;
}
export default <T = unknown>(promiseFn: (runParams?: unknown) => Promise<any>, options: _IOptions = {}) => {
  const { autoRun = false, params = null, initData = [] } = options as _IOptions;
  const state = reactive({
    loading: false,
    data: initData as T,
    error: null
  });
  const run = (runParams?: unknown) => {
    state.loading = true;
    return promiseFn(runParams)
      .then((res) => {
        state.data = res;
      })
      .catch((error) => {
        console.error(error);
        state.error = error;
      })
      .finally(() => {
        state.loading = false;
      });
  };
  autoRun && run(params);
  return {
    run,
    ...toRefs(state)
  };
};
