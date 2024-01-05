/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2021-03-01 11:28:48
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-04-02 10:53:15
 */
/**
 * 电话号
 */
export const PHONE = {
  regex: /^(((\+\d{2}-)?0\d{2,3}-\d{7,8})|((\+\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/,
  des: '手机号位数满足11位并以1开头；座机需满足XXX-XXXXXXXX的格式'
};

/**
 * 邮箱
 */
export const EMAIL = {
  regex: /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/,
  des: '邮箱地址格式错误'
};

/**
 * 密码校验
 */
export const PASSWORD = {
  regex: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,14}$/,
  des: '请输入8-14位的数字与字母组合'
};
