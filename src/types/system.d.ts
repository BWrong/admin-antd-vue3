export declare interface IMenu {
  title: string;
  url: string;
  id?: number;
  type?: number;
  hide?: boolean;
  path: string;
  children?: IMenu[];
  [K: string]: string;
}
