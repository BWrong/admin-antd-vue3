import { usePagination, type Service, type PaginationOptions } from 'vue-request';
import { paginationConfig } from '@/config/pagination';
import type { PaginationProps, TablePaginationConfig } from 'ant-design-vue';

export default (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: Service<any, any[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: PaginationOptions<any, any[]>,
  paginationOpts: Partial<PaginationProps> = {}
) => {
  const { changePagination: onChange, current, pageSize, total, ...res } = usePagination(service, options);
  const pagination = reactive({
    ...paginationConfig,
    pageSize,
    current,
    total,
    onChange(page, pageSize) {
      onChange?.(page || 1, pageSize);
    },
    ...paginationOpts
  });

  return {
    ...res,
    pagination: pagination as TablePaginationConfig
  };
};
