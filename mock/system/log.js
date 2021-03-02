const list = ({ query }) => ({
  code: 200,
  msg: '',
  data: {
    total: 200,
    current: Number(query.pageNow),
    size: Number(query.pageSize),
    'list|10': [
      {
        id: '@guid',
        name: '@ctitle',
        type: '@pick(LOGIN,OPERATION,SUBSCRIBE,PUSH,OTHER)',
        username: '@cname',
        path: '@url',
        result: '{"code":200,"message":"操作成功.","body":true}',
        parameters: 'PluginConfigAddDTO(apiId=859, pluginList=[PluginKVDTO(id=152, code=JiangSuYanChengShareAuth)])',
        createTime: '@datetime(yyyy-MM-dd HH:mm:ss)'
      }
    ]
  }
});

module.exports = [
  {
    url: '/system/log',
    response: list
  }
];
