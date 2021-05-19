module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16, // 根元素字体大小
      unitPrecisio: 16, // 转换单位
      propList: ['*', '!border', '!box-shadow'], // 需要转换的规则
      blackList: /^global-.+/ // 忽略的选择器
      // exclude: /node_modules/i // 排除的文件
    }
  }
};
