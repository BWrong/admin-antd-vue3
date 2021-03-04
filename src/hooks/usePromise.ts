import { reactive, toRefs } from 'vue';
interface _IOptions {
  autoRun?: boolean;
  params?: any;
}

export default (promiseFn: (runParams?: any) => Promise<any>, options: _IOptions = {}) => {
  let { autoRun = false, params = null } = options as _IOptions;
  let state = reactive({
    loading: false,
    data: null,
    error: null
  });
  const run = (runParams?: any) => {
    state.loading = true;
    return promiseFn(runParams)
      .then((res) => {
        state.data = res;
      })
      .catch((error) => {
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
