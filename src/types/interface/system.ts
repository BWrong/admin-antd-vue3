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
