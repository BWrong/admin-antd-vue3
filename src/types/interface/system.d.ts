import { IRecordBase } from 'types/interface/common';

export interface IParamConfig extends IRecordBase {
  name: string;
  paramCode: string;
  paramType: string;
  paramValue: string;
  description: string;
}
