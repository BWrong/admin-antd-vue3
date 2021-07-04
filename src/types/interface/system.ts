import { IRecordBase } from 'types/interface/common';

export interface IParamConfig extends IRecordBase {
  name: string;
  paramCode: string;
  paramType: string;
  paramValue: string;
  description: string;
}
// 配置
export interface IConfig extends IRecordBase {
  code: string;
  title: string;
  value: string;
  type: number;
  describe: string;
}
export interface IConfigComponent {
  value: number;
  title: string;
  component?: any;
}

// 部门
export interface IDepartment extends IRecordBase {
  title: string;
  code: string;
  describe: string;
}
// 日志
export interface ILog extends IRecordBase {
  name: string;
  type: number;
  username: string;
  path: string;
  parameters: string;
  result: string;
}
// 消息
export interface IMessage extends IRecordBase {
  sender: string;
  type: number;
  content: string;
  dataIndex: number;
}
// 角色
export interface IRole extends IRecordBase {
  title: string;
  code: string;
  deptCode: number;
  deptId: number;
  deptName: string;
  describe: string;
}
// 用户
export interface IUser extends IRecordBase {
  username: string;
  name: string;
  nickname: string;
  email: string;
  idCard: string;
  deptId: string;
  deptCode?: string;
  tel: string;
  describe: string;
}
