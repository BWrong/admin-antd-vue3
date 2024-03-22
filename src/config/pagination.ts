import type { PaginationConfig } from 'ant-design-vue/es/pagination';

export const paginationConfig: Partial<PaginationConfig> = {
  showSizeChanger: false,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  defaultPageSize: 10,
  size: 'small',
  hideOnSinglePage: true
};
// 传给后台分页参数名称设置
export const defaultPaginationOptions = {
  currentKey: 'current',
  pageSizeKey: 'pageSize',
  totalKey: 'total',
  totalPageKey: 'totalPage'
};
