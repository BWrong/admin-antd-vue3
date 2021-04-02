import { reactive, toRefs } from 'vue';
interface _IOptions {
  autoRun?: boolean;
  params?: any;
  initData?: [];
}
export default <T = any>(promiseFn: (runParams?: any) => Promise<any>, options: _IOptions = {}) => {
  let { autoRun = false, params = null, initData = [] } = options as _IOptions;
  let state = reactive({
    loading: false,
    data: (initData as unknown) as T,
    error: null
  });
  const run = (runParams?: any) => {
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
// TODO:
// 1. 取消请求
// 2. 监听
// 3. 泛型指定data类型
