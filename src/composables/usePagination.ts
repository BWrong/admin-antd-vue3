import { useAsyncState, type UseAsyncStateOptions, type UseAsyncStateReturn } from '@vueuse/core';
// 默认分页配置
const defaultPaginationConfig = {
  defaultPageCurrent: 1,
  defaultPageSize: 10,
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
  refresh: () => void;
}

function usePagination<TData = any, TParams extends any[] = any[], TShallow extends boolean = true>(
  service: (...args: TParams) => Promise<TData>,
  options: PaginationOptions<TShallow, TData, TParams> = {}
): PaginationResult<TData, TParams, TShallow> {
  // 处理分页入参
  const {
    paginationExtConfig = {},
    defaultParams = [] as unknown as TParams,
    initialState = {} as TData,
    ...restOptions
  } = options;
  const paginationConfig = {
    ...defaultPaginationConfig,
    paginationExtConfig: {
      ...defaultPaginationConfig.paginationExtConfig,
      ...paginationExtConfig
    }
  };
  const { currentKey, pageSizeKey, totalKey, totalPageKey, defaultPageCurrent, defaultPageSize } = paginationConfig;

  // 处理默认参数
  if (defaultParams[0]) {
    defaultParams[0][currentKey] = defaultParams[0][currentKey] || defaultPageCurrent;
    defaultParams[0][pageSizeKey] = defaultParams[0][pageSizeKey] || defaultPageSize;
  } else {
    defaultParams[0] = {
      [currentKey]: defaultPageCurrent,
      [pageSizeKey]: defaultPageSize
    };
  }
  const finallyOptions = {
    ...(restOptions || {}),
    defaultParams: defaultParams as TParams
  };
  const action = (...args: TParams) => {
    const [firstParams] = args;
    args[0] = {
      ...defaultParams[0],
      ...firstParams
    };
    return service(...args);
  };
  const { state, executeImmediate, ...rest } = useAsyncState<TData, TParams, TShallow>(
    action,
    initialState,
    finallyOptions
  );

  const paging = (paginationParams: Record<string, number>) => {
    const [oldPaginationParams, ...restParams] = defaultParams || [];
    const newPaginationParams = {
      ...oldPaginationParams,
      ...paginationParams
    };
    const mergerParams = [newPaginationParams, ...restParams] as any;
    executeImmediate(...mergerParams);
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
  const refresh = () => {
    executeImmediate(...defaultParams);
  };
  return {
    state,
    executeImmediate,
    refresh,
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
