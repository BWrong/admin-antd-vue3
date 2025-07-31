import { useAsyncState, type UseAsyncStateOptions, type UseAsyncStateReturn } from '@vueuse/core';
// 默认分页配置
const defaultPaginationConfig = {
  currentKey: 'current',
  pageSizeKey: 'pageSize',
  totalKey: 'total',
  totalPageKey: 'totalPage',
  paginationExtConfig: {} as Partial<PaginationExtConfig>
};
// 分页扩展配置
type PaginationExtConfig = {
  pageSize: number;
  current: number;
  total: number;
  totalPage: number;
  onChange(page: number, pageSize?: number): void;
  [key: string]: any;
};
// 设置分页配置
export function setPaginationConfig(config: Partial<typeof defaultPaginationConfig>) {
  Object.assign(defaultPaginationConfig, config);
}
// 分页请求配置
export type PaginationOptions<TShallow extends boolean, TData, TParams extends any[] = any[]> = UseAsyncStateOptions<
  TShallow,
  TData
> & {
  paginationExtConfig?: Partial<PaginationExtConfig>;
  initialState?: TData;
  defaultParams?: TParams;
};
// 分页请求结果
export interface PaginationResult<TData, TParams extends any[], TShallow extends boolean>
  extends UseAsyncStateReturn<TData, TParams, TShallow> {
  pagination: PaginationExtConfig;
}

function usePagination<TData = any, TParams extends any[] = any[], TShallow extends boolean = true>(
  service: Promise<TData> | ((...args: TParams) => Promise<TData>),
  options?: PaginationOptions<TShallow, TData>
): PaginationResult<TData, TParams, TShallow> {
  // 处理分页入参
  const paginationExtConfig = options?.paginationExtConfig || {};
  const initialState = options?.initialState || {};
  const defaultParams = options?.defaultParams || [];
  const paginationConfig = {
    ...defaultPaginationConfig,
    paginationExtConfig: {
      ...defaultPaginationConfig.paginationExtConfig,
      ...paginationExtConfig
    }
  };
  const { currentKey, pageSizeKey, totalKey, totalPageKey } = paginationConfig;
  console.log(1111, service);
  const action = (params, ...args: TParams) => {
    console.log(2222, params, args);

    return service(
      {
        ...params
      },
      ...args
    );
  };
  const { state, execute, executeImmediate, ...rest } = useAsyncState<TData, TParams, TShallow>(
    action,
    initialState,
    options
  );

  const paging = (paginationParams: Record<string, number>) => {
    executeImmediate({ ...paginationParams });
  };

  // changeCurrent change current page (current: number) => void
  const changeCurrent = (current: number) => {
    paging({ [currentKey]: current });
  };

  // changePageSize change pageSize (pageSize: number) => void
  const changePageSize = (pageSize: number) => {
    paging({ [pageSizeKey]: pageSize });
  };

  // changePagination change current and pageSize (current: number, pageSize: number) => void
  const changePagination = (current: number, pageSize: number) => {
    paging({
      [currentKey]: current,
      [pageSizeKey]: pageSize
    });
  };

  const total = computed<number>(() => get(state.value!, totalKey, 0));
  const current = computed({
    get: () => get(state.value!, currentKey, 1),
    set: (val: number) => {
      changeCurrent(val);
    }
  });
  const pageSize = computed<number>({
    get: () => get(state.value!, pageSizeKey, 10),
    set: (val: number) => {
      changePageSize(val);
    }
  });
  const totalPage = computed<number>(() => get(state.value!, totalPageKey, Math.ceil(total.value / pageSize.value)));
  const pagination = reactive({
    ...paginationConfig.paginationExtConfig,
    pageSize,
    current,
    total,
    totalPage,
    onChange(page: number, pageSize: number) {
      paginationExtConfig?.onChange?.(page, pageSize);
      changePagination?.(page || 1, pageSize);
    }
  });
  return {
    state,
    execute,
    pagination,
    ...rest
  };
}
export default usePagination;
function get(source: Record<string, any>, path: string, defaultValue: any = undefined) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  for (const p of paths) {
    result = Object(result)[p];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}
