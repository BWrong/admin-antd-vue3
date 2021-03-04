/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-04-07 10:30:49
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-03-04 00:18:08
 */

const Storage = localStorage; // 配置使用的存储器
export function setStorage(key: string, value: string | number | object): void {
  if (typeof value === 'object') {
    Storage.setItem(key, JSON.stringify(value));
  } else {
    Storage.setItem(key, value as string);
  }
}
export function getStorage(key: string): any {
  let value = Storage.getItem(key) || '';
  return value.match(/(^\[[\s\S]*\]$|^\{[\s\S]*\}$)/) ? JSON.parse(value) : value;
}
export function removeStorage(...keys: string[]): any[] {
  return keys.map((item) => Storage.removeItem(item));
}
export function clearStorage() {
  return Storage.clear();
}
export function keyStorage(index: number) {
  return Storage.key(index);
}
export default {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  keyStorage
};
