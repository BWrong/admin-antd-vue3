import { useRequest } from 'vue-hooks-plus';
import type {
  UseRequestOptions,
  UseRequestPlugin,
  useRequestResult,
  UseRequestService
} from 'vue-hooks-plus/lib/useRequest/types';
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

export type PaginationOptions<TData, TParams extends unknown[], TPlugin> = UseRequestOptions<
  TData,
  TParams,
  TPlugin
> & {
  paginationExtConfig?: Partial<PaginationExtConfig>;
};
export interface PaginationResult<TData, TParams extends unknown[]> extends useRequestResult<TData, TParams> {
  pagination: PaginationExtConfig;
}

function usePagination<TData = any, TParams extends any[] = any[]>(
  service: UseRequestService<TData, TParams>,
  options: PaginationOptions<TData, TParams, any> = {},
  plugins: UseRequestPlugin<TData, TParams>[] = []
): PaginationResult<TData, TParams> {
  // 处理分页入参
  const { paginationExtConfig = {}, defaultParams = [], ...restOptions } = options;
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

  const { data, params, run, ...rest } = useRequest<TData, TParams>(service, finallyOptions, plugins);

  const paging = (paginationParams: Record<string, number>) => {
    const [oldPaginationParams, ...restParams] = (params.value as TParams[]) || [];
    const newPaginationParams = {
      ...oldPaginationParams,
      ...paginationParams
    };
    const mergerParams = [newPaginationParams, ...restParams] as any;
    run(...mergerParams);
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

  const total = computed<number>(() => get(data.value!, totalKey, 0));
  const current = computed({
    get: () => get(data.value!, currentKey, params.value?.[0]?.[currentKey] ?? defaultParams[0][currentKey]),
    set: (val: number) => {
      changeCurrent(val);
    }
  });
  const pageSize = computed<number>({
    get: () => get(data.value!, pageSizeKey, params.value?.[0]?.[pageSizeKey] ?? defaultParams[0][pageSizeKey]),
    set: (val: number) => {
      changePageSize(val);
    }
  });
  const totalPage = computed<number>(() => get(data.value!, totalPageKey, Math.ceil(total.value / pageSize.value)));
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
    data,
    params,
    run,
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
