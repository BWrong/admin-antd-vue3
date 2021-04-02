import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/enums/message';
import { SEX } from '@/enums/user';
// 性别
export function formatSex<T extends keyof typeof SEX>(value: T) {
  return SEX[value] || '未知';
}

// 消息状态
export function messageStatus<T extends keyof typeof MESSAGE_STATUS>(value: T) {
  return MESSAGE_STATUS[value] || '';
}

// 消息类型
export function messageType<T extends keyof typeof MESSAGE_TYPE>(value: T) {
  return MESSAGE_TYPE[value] || '';
}
