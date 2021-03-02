// TODO: 考虑使用常量枚举
// export const enum Sex{
//   '男'=1,
//   '女'=2
// }
// 性别
export const SEX = {
  1: '男',
  2: '女'
};
// 资源类型
export const RESOURCE_TYPE = {
  0: '菜单',
  1: '按钮'
};
// 消息类型
export const MESSAGE_TYPE = {
  SYSTEM: '系统消息',
  WARNING: '预警消息',
  OTHER: '其它'
};
// 消息状态
export const MESSAGE_STATUS = {
  0: '未读',
  1: '已读'
};
// 日志类型
export const LOG_TYPE = {
  LOGIN: '登录日志',
  OPERATION: '操作日志',
  SUBSCRIBE: '订阅日志',
  PUSH: '推送日志',
  OTHER: '其他'
};
// 用户状态
export const USER_STATUS = {
  0: '正常',
  1: '已锁定',
  2: '已删除'
};
