import { isRef, toRefs, reactive, onMounted } from 'vue';
interface Options {
  url: string;
  manual: boolean;
  params: {
    [key: string]: any;
  };
}
export default (options: Options) => {
  const { url, manual = false, params = {} } = options;

  const state = reactive({
    data: {},
    error: false,
    loading: false
  });

  const run = async () => {
    // 拼接查询参数
    let query = '';
    Object.keys(params).forEach((key) => {
      const val = params[key];
      // 如果去 ref 对象，需要取 .value 属性
      const value = isRef(val) ? val.value : val;
      query += `${key}=${value}&`;
    });
    state.error = false;
    state.loading = true;
    try {
      const result = await fetch(`${url}?${query}`).then((res) => res.json());
      state.data = result;
    } catch (e) {
      state.error = true;
    }
    state.loading = false;
  };

  onMounted(() => {
    // 第一次是否需要手动调用
    !manual && run();
  });

  return {
    run,
    ...toRefs(state)
  };
};
