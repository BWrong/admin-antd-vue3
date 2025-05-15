// 每条记录基础属性
export interface IRecordBase {
  createTime?: string;
  createUser?: string;
  updateTime?: string;
  updateUser?: string;
  id?: string;
}

// 定义一个泛型接口 IPageResponse，用于表示分页查询的响应数据结构
export interface IPageResponse<T> {
  // 总记录数
  total: number;
  // 当前页的数据列表，类型为泛型 T 的数组
  list: T[];
  // 每页显示的记录数
  pageSize: number;
  // 当前页码
  current: number;
}
