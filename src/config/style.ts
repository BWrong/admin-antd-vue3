// 样式相关配置
export default {
  theme: 'light',
  // lang: 'zh_CN',
  pagination: {
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
    size: 'small',
    current: 1,
    defaultPageSize: 10,
    pageSize: 10,
    total: 0
  }
};
