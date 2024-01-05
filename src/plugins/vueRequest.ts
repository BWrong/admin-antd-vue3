import { setGlobalOptions } from 'vue-request';

export default () => {
  // 配置请查看https://next.cn.attojs.org/api/global-options.html#%E5%85%AC%E5%85%B1%E9%80%89%E9%A1%B9
  setGlobalOptions({
    // 分页配置，根据后端返回数据格式配置
    pagination: {
      currentKey: 'current',
      pageSizeKey: 'pageSize',
      totalKey: 'total',
      totalPageKey: 'totalPage'
    }
  });
};
