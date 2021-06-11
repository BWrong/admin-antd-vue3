// 接口返回数据
export interface IResponseData {
  code: number;
  msg: string;
  data: IPageData;
}
// 分页接口返回数据
export interface IPageData<T = any> {
  current: number;
  list: T[];
  size: number;
  total: number;
  [key: string]: any;
}

// 接口参数
export interface IParams {
  pageQuery?: {
    page: number;
    size?: number;
  };
  query?: {
    [key: string]: any;
  };
}

// 分页设置
export interface IPagination {
  current: number;
  pageSize: number;
  total: number;
  defaultPageSize?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  pageSizeOptions?: string[];
  showLessItems?: boolean;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  showTotal?: (total: number) => string;
  simple?: boolean;
  size?: 'default' | 'small';
}
// 每条记录基础属性
export interface IRecordBase {
  createTime?: string;
  createUser?: string;
  updateTime?: string;
  updateUser?: string;
  id?: string;
}
// 菜单
export interface IMenu {
  title: string;
  path: string;
  url?: string;
  id?: number;
  icon?: string;
  type?: number;
  hide?: boolean;
  children?: IMenu[];
  [K: string]: any;
}
