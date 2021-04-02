/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-04-07 10:30:49
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-04-02 10:51:31
 */
import dayjs from '@/plugins/dayjs';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

/**
 * 格式化时间
 * @param {*} value
 * @param {*} type
 */
export function formatTime(time: number | string | Date = new Date(), type = 'YYYY-MM-DD HH:mm:ss') {
  return time ? dayjs(Number(time)).format(type) : '';
}

// 转换成浮点数
export function toFixed(val: number | string, dig = 2) {
  return Number(val).toFixed(dig);
}

/**
 * 获取URL中的参数名及参数值的集合
 * @param {[string]} url [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */
export function getQuery(url: string) {
  if (url.indexOf('?') === -1) return {};
  let query = {};
  let str = url.split('?')[1];
  let strs = str.split('&');
  for (let i = 0; i < strs.length; i++) {
    (query as any)[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
  }
  return query;
}

/**
 * 密码加密加盐
 * @param {*} password 要加密的密码
 * @param {*} cryptoKey 盐
 */
export function cryptoPassword(password: string, cryptoKey?: string) {
  return Base64.stringify(Utf8.parse(`${cryptoKey}${password}`));
}

/**
 * 检查上传文件大小
 * @param size
 * @param limit 单位M
 */
export function checkFileSize(size: number, limit: number) {
  return size > 1024 * 1024 * limit ? `上传文件大小不能超过${limit}MB` : '';
}
/**
 * 检查上传文件是否是图片
 * @param mime
 * @param types
 */
export function checkIsImage(mime: string, types = ['image/gif', 'image/x-png', 'image/png', 'image/pjpeg', 'image/jpeg', 'image/bmp'], msg = '上传文件格式不正确') {
  return types.includes(mime) ? '' : msg;
}
/**
 * 检查上传文件是否是视频
 * @param mime
 * @param types
 */
export function checkIsVideo(mime: string, types = ['video/mp4'], msg = '上传文件格式不正确') {
  return types.includes(mime) ? '' : msg;
}
/********** 工具函数 ************/
/**
 * 将一维数组格式转换成树结构
 * TODO: 考虑使用尾递归优化算法
 * @param {*} data  需要转换的数据
 * @param {*} pid   顶级节点的id
 * @param {*} children   子集标识key
 * @param {*} pidName    父级标识key
 * @param {*} idName     id标识key
 */
interface _ITreeData {
  data: any[];
  pid?: number | string;
  children?: string;
  pidName?: string;
  idName?: string;
}
export function convertToTree({ data, pid = 0, children = 'children', pidName = 'parentId', idName = 'id' }: _ITreeData) {
  let arr: any[] = [];
  data.map((item: any) => {
    if (item[pidName] === pid) {
      let child = item[children] || [];
      let temp = child.concat(convertToTree({ data, pid: item[idName], children, pidName, idName }));
      temp.length && (item[children] = temp);
      return arr.push(item);
    }
  });
  return arr;
}
/**
 * 生成表格序号
 * @param {*} pageNow
 * @param {*} pageSize
 * @param {*} index
 */
export function ganerTableIndex(pageNow = 1, pageSize = 10, index = 0) {
  return (pageNow - 1) * pageSize + index + 1;
}

/**
 * 根据后缀名获取文件类型
 * @param filePath
 * @returns
 */
const fileTypeMap: Record<string, string[]> = {
  excel: ['.xls', '.xlsx', '.csv'],
  word: ['.doc', '.docx', '.dot', '.dotx'],
  ppt: ['.ppt', '.pptx', '.pps', '.pot', '.potx'],
  code: ['.java', '.js', '.html', '.py', '.go']
};
export function getFileType(filePath: string) {
  const suffixMatch = filePath.match(/\.[^.]+$/);
  const suffix = String(suffixMatch).toLowerCase();
  for (const key in fileTypeMap) {
    if (fileTypeMap[key].includes(suffix)) return key;
  }
  return 'other';
}
/**
 * 下载文件
 * @param content
 * @param filename
 */
export function downloadFile(content: BlobPart, filename: string) {
  const a = document.createElement('a');
  const blob = content instanceof Blob ? content : new Blob([content]);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
/**
 * 将数组转换成对象
 * @param arraryData
 * @param key
 * @param value
 * @returns
 */
export function arrayToObj<T extends Record<string, any> = any, K extends keyof T = string>(arraryData: T[], key: K, value?: K) {
  return arraryData.reduce((temp, item) => ((temp[item[key]] = value ? item[value] : item), temp), {} as Record<T[K], T[K] | T>);
}
