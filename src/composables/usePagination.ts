import { useRequest } from 'vue-hooks-plus';
import { type PaginationProps } from 'ant-design-vue';
import type {
  UseRequestOptions,
  UseRequestPlugin,
  UseRequestService,
  useRequestResult
} from 'vue-hooks-plus/lib/useRequest/types';

const defaultPaginationOptions = {
  currentKey: 'current',
  pageSizeKey: 'pageSize',
  totalKey: 'total',
  totalPageKey: 'totalPage'
};
const defaultPageCurrent = 1;
const defaultPageSize = 10;
interface PaginationType {
  currentKey: string;
  pageSizeKey: string;
  totalKey: string;
  totalPageKey: string;
}
export type PaginationOptions<TData, TParams extends unknown[], TPlugin> = UseRequestOptions<
  TData,
  TParams,
  TPlugin
> & {
  paginationKeys?: Partial<PaginationType>;
  paginationExtConfig?: Partial<PaginationProps>;
};
export interface PaginationResult<TData, TParams extends unknown[]> extends useRequestResult<TData, TParams> {
  current: WritableComputedRef<number>;
  pageSize: WritableComputedRef<number>;
  total: ComputedRef<number>;
  totalPage: ComputedRef<number>;
  pagination: PaginationProps;
  changeCurrent: (current: number) => void;
  changePageSize: (pageSize: number) => void;
  changePagination: (current: number, pageSize: number) => void;
}

function usePagination<TData = any, TParams extends any[] = any[]>(
  service: UseRequestService<TData, TParams>,
  options: PaginationOptions<TData, TParams, any> = {},
  plugins: UseRequestPlugin<TData, TParams>[] = []
): PaginationResult<TData, TParams> {
  // 处理分页入参
  const { paginationKeys = {}, paginationExtConfig = {}, defaultParams = [], ...restOptions } = options;
  const { currentKey, pageSizeKey, totalKey, totalPageKey } = {
    ...defaultPaginationOptions,
    ...paginationKeys
  } as PaginationType;
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

  // changeCurrent	change current page	(current: number) => void
  const changeCurrent = (current: number) => {
    paging({ [currentKey]: current });
  };

  // changePageSize	change pageSize	(pageSize: number) => void
  const changePageSize = (pageSize: number) => {
    paging({ [pageSizeKey]: pageSize });
  };

  // changePagination	change current and pageSize	(current: number, pageSize: number) => void
  const changePagination = (current: number, pageSize: number) => {
    paging({ [currentKey]: current, [pageSizeKey]: pageSize });
  };

  const total = computed<number>(() => get(data.value!, totalKey, 0));
  const current = computed({
    get: () =>
      // @ts-ignore
      params.value?.[0]?.[currentKey] ?? defaultParams[0][currentKey],
    set: (val: number) => {
      changeCurrent(val);
    }
  });
  const pageSize = computed<number>({
    get: () =>
      // @ts-ignore
      params.value?.[0]?.[pageSizeKey] ?? defaultParams[0][pageSizeKey],
    set: (val: number) => {
      changePageSize(val);
    }
  });
  const totalPage = computed<number>(() => get(data.value!, totalPageKey, Math.ceil(total.value / pageSize.value)));
  const pagination = reactive({
    ...paginationExtConfig,
    pageSize,
    current,
    total,
    onChange(page, pageSize) {
      paginationExtConfig?.onChange?.(page, pageSize);
      changePagination?.(page || 1, pageSize);
    }
  });
  return {
    data,
    params,
    current,
    pageSize,
    total,
    totalPage,
    run,
    pagination,
    changeCurrent,
    changePageSize,
    changePagination,
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
